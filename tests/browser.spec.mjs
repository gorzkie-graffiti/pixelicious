/**
 * Browser verification of the running reconstruction.
 *
 * Playwright is intentionally **not** a project dependency — it is only needed to run
 * this check:
 *
 *   npm install --no-save playwright && npx playwright install chromium
 *   PREVIEW_HOST=<host> npm run dev            # in another shell, listening on :3000
 *   node tests/browser.spec.mjs
 *
 * A headless container may also need system libraries and a fontconfig; see
 * docs/TECHNICAL-NOTES.md §6 for the exact setup used to run this.
 *
 * The test drives the real UI in a real browser: it picks a file through the hidden
 * `<input type="file">`, drops a file onto the dashed zone, converts, changes the grid
 * size and palette, opens the modals, downloads the result and inspects the PNG.
 */

import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { inflateSync } from 'node:zlib';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = process.env.BASE_URL ?? 'http://127.0.0.1:3000';
const SAMPLE = join(root, 'static', 'assets', 'base-f8a74a87.png');

let failures = 0;
/** @param {string} label @param {boolean} condition @param {string} [detail] */
function check(label, condition, detail = '') {
	if (!condition) failures++;
	console.log(`  [${condition ? 'PASS' : 'FAIL'}] ${label}${detail ? ` — ${detail}` : ''}`);
}

/** Decode a PNG header and return its geometry. */
function pngInfo(buffer) {
	const signature = buffer.subarray(0, 8).toString('latin1') === '\x89PNG\r\n\x1a\n';
	const width = buffer.readUInt32BE(16);
	const height = buffer.readUInt32BE(20);
	const bitDepth = buffer[24];
	const colorType = buffer[25];
	let offset = 8;
	const idat = [];
	while (offset < buffer.length) {
		const length = buffer.readUInt32BE(offset);
		const type = buffer.subarray(offset + 4, offset + 8).toString('latin1');
		if (type === 'IDAT') idat.push(buffer.subarray(offset + 8, offset + 8 + length));
		if (type === 'IEND') break;
		offset += 12 + length;
	}
	return {
		signature,
		width,
		height,
		bitDepth,
		colorType,
		inflatedBytes: inflateSync(Buffer.concat(idat)).length
	};
}

/** Runs inside the page. */
const resultSrc = () => document.querySelector('img[alt="Result"]')?.src ?? '';
/** Runs inside the page. */
const uploadedSrc = () => document.querySelector('img[alt="Uploaded"]')?.src ?? '';
/** Runs inside the page. */
const headingWidth = () => document.querySelector('h1')?.getBoundingClientRect().width ?? 0;
/** Runs inside the page. */
function currentResultSrc() {
	return document.querySelector('img[alt="Result"]')?.src ?? '';
}
/**
 * Runs inside the page: decode a data URL and report grid statistics.
 * @param {{dataUrl: string, gridWidth: number}} input
 */
function gridStats(input) {
	return (async () => {
		const image = new Image();
		image.src = input.dataUrl;
		await image.decode();
		const canvas = document.createElement('canvas');
		canvas.width = image.naturalWidth;
		canvas.height = image.naturalHeight;
		const context = canvas.getContext('2d');
		context.drawImage(image, 0, 0);
		const { data, width, height } = context.getImageData(0, 0, canvas.width, canvas.height);
		const colours = new Set();
		for (let i = 0; i < data.length; i += 4) {
			if (data[i + 3] === 0) continue;
			colours.add((data[i] << 16) | (data[i + 1] << 8) | data[i + 2]);
		}
		const cell = width / input.gridWidth;
		let nonUniform = 0;
		for (let by = 0; by < input.gridWidth; by++) {
			for (let bx = 0; bx < input.gridWidth; bx++) {
				const first = (by * cell * width + bx * cell) * 4;
				for (let dy = 0; dy < cell; dy++) {
					for (let dx = 0; dx < cell; dx++) {
						const i = ((by * cell + dy) * width + bx * cell + dx) * 4;
						if (
							data[i] !== data[first] ||
							data[i + 1] !== data[first + 1] ||
							data[i + 2] !== data[first + 2]
						) {
							nonUniform++;
						}
					}
				}
			}
		}
		return { width, height, colours: colours.size, cell, nonUniform };
	})();
}

/** Runs inside the page: dispatch a real drag-and-drop of a File built from a data URL. */
function dropImage(dataUrl) {
	return (async () => {
		const response = await fetch(dataUrl);
		const blob = await response.blob();
		const file = new File([blob], 'dropped.png', { type: 'image/png' });
		const transfer = new DataTransfer();
		transfer.items.add(file);
		const zone = document.querySelector('label[for="file"]').parentElement;
		const classes = () => document.querySelector('label[for="file"]').className;
		const idle = classes();
		zone.dispatchEvent(new DragEvent('dragenter', { bubbles: true, dataTransfer: transfer }));
		// Svelte flushes the class change asynchronously, so let a frame pass.
		await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
		const highlighted = classes().includes('bg-[#251849]');
		// leaving the zone must restore the recovered idle background
		zone.dispatchEvent(new DragEvent('dragleave', { bubbles: true, dataTransfer: transfer }));
		await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
		const restored = classes().includes('bg-Medium-Blue');
		zone.dispatchEvent(new DragEvent('dragover', { bubbles: true, dataTransfer: transfer }));
		zone.dispatchEvent(new DragEvent('drop', { bubbles: true, dataTransfer: transfer }));
		return { highlighted, restored, idle, name: file.name };
	})();
}

/** Runs inside the page: horizontal overflow check. */
function hasOverflow() {
	return document.documentElement.scrollWidth > window.innerWidth + 1;
}

/** Runs inside the page. */
function previewImageInfo() {
	const image = document.querySelector('img[alt="Preview"]');
	return { isDataUrl: !!image && image.src.startsWith('data:'), width: image?.naturalWidth ?? 0 };
}

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1280, height: 1000 }, acceptDownloads: true });
const page = await context.newPage();

/** @type {string[]} */
const consoleErrors = [];
page.on('console', (message) => {
	if (message.type() === 'error') consoleErrors.push(message.text());
});
page.on('pageerror', (error) => consoleErrors.push(`pageerror: ${error.message}`));

console.log(`Pixelicious reconstruction — browser verification\n\n── load (${BASE}) ──`);
await page.goto(BASE, { waitUntil: 'networkidle' });

// Guard against a headless container with no fontconfig: Chromium then measures every
// glyph as zero-width, which looks like a layout failure in this product rather than
// the environment problem it actually is.
if ((await page.evaluate(headingWidth)) === 0) {
	console.error(
		'Environment problem: the browser cannot measure text (no usable fontconfig).\n' +
			'Point FONTCONFIG_FILE at a config with at least one font and re-run. See docs/TECHNICAL-NOTES.md §6.'
	);
	await browser.close();
	process.exit(2);
}

check('page title is "Pixelicious"', (await page.title()) === 'Pixelicious');
check('heading renders', (await page.locator('h1').innerText()).trim() === 'Pixel Art Converter');
check(
	'description renders',
	(await page.locator('main p.font-merriweather.font-bold').innerText()).includes('Image-to-Pixel Art Converter')
);
check('announcement banner renders', await page.locator('text=Pixelicious is joining Scenario').isVisible());
check('upload zone renders', await page.getByText('Click here or drag your image to start!').isVisible());
check('download button is present', (await page.locator('button:has-text("Download")').count()) === 1);
check('download is disabled with no image', await page.locator('button:has-text("Download")').isDisabled());
check(
	'archived sample previews show before upload',
	(await page.evaluate(resultSrc)).includes('pixelart-a3439003'),
	await page.evaluate(resultSrc)
);
check('controls are hidden until an image is loaded', (await page.getByText('Pixel grid size').count()) === 0);
check('no runtime errors on load', consoleErrors.length === 0, consoleErrors.slice(0, 3).join(' | '));

console.log('\n── unsupported file is rejected ──');
await page.setInputFiles('#file', {
	name: 'notes.txt',
	mimeType: 'text/plain',
	buffer: Buffer.from('not an image')
});
const toast = page.locator('[data-toast]');
await toast.first().waitFor({ state: 'visible', timeout: 5000 });
check(
	'recovered error toast shown',
	(await toast.first().innerText()).includes('Please upload a PNG, WEBP, or JPG image'),
	await toast.first().innerText()
);
check('upload zone keeps the archived sample', (await page.evaluate(resultSrc)).includes('pixelart-a3439003'));
await page.waitForTimeout(4300); // let it auto-dismiss

console.log('\n── upload via the file picker ──');
const before = await page.evaluate(resultSrc);
await page.setInputFiles('#file', SAMPLE);
await page.waitForFunction(
	(prev) => {
		const img = document.querySelector('img[alt="Result"]');
		return !!img && img.src.startsWith('data:image/png') && img.src !== prev;
	},
	before,
	{ timeout: 20000 }
);
const uploaded = await page.evaluate(uploadedSrc);
const resultAt256 = await page.evaluate(resultSrc);
check('uploaded preview switched to the selected file', uploaded.startsWith('data:image/png'));
check('result preview is a converted image, not the archived sample', !resultAt256.includes('pixelart-a3439003'));
check('download is enabled after conversion', await page.locator('button:has-text("Download")').isEnabled());
check('controls panel appeared', await page.getByText('Pixel grid size').isVisible());
check('remove-background row appeared', await page.locator('#removeBackgroudSetting').isVisible());

console.log('\n── the result is genuinely pixel art ──');
// a 512x512 source makes the recovered ue() pick the 256px grid
const stats256 = await page.evaluate(gridStats, { dataUrl: resultAt256, gridWidth: 256 });
check('result is 512px wide', stats256.width === 512, `${stats256.width}x${stats256.height}`);
check('result is built from uniform 2px blocks', stats256.nonUniform === 0, `${stats256.nonUniform} stray pixels`);
check(
	'colours are reduced to the 16-colour default palette',
	stats256.colours <= 16 && stats256.colours > 1,
	`${stats256.colours} colours`
);

console.log('\n── grid size control changes the output ──');
await page.getByText('Pixel grid size').click();
await page.locator('button:has-text("64px")').click();
await page.locator('button:has-text("Generate")').click();
await page.waitForFunction(
	(prev) => {
		const img = document.querySelector('img[alt="Result"]');
		return !!img && img.src !== prev;
	},
	resultAt256,
	{ timeout: 20000 }
);
const result64 = await page.evaluate(resultSrc);
const stats64 = await page.evaluate(gridStats, { dataUrl: result64, gridWidth: 64 });
check('selecting 64px changed the result image', result64 !== resultAt256);
check('generate at 64px produces 8px blocks', stats64.cell === 8, `cell=${stats64.cell}`);
check('64px blocks are all uniform', stats64.nonUniform === 0, `${stats64.nonUniform} stray pixels`);
check('64px uses no more colours than the palette', stats64.colours <= 16, `${stats64.colours} colours`);

console.log('\n── palette can be changed from the community modal ──');
await page.getByText('Color palette').click();
await page.locator('button[aria-label="Community palettes"]').click();
await page.locator('text=Community palettes').first().waitFor({ state: 'visible', timeout: 5000 });
const paletteCards = await page.locator('button[title^="Use palette"]').count();
check('all 20 recovered palettes are offered', paletteCards === 20, `${paletteCards} cards`);
await page.locator('button[title^="Use palette"]').nth(19).click(); // the 16-colour PICO-8 palette
await page.waitForTimeout(400);
const closeDrawer = page.locator('#modal button:has-text("Close")').last();
if (await closeDrawer.isVisible()) await closeDrawer.click();
await page.locator('button:has-text("Generate")').click();
await page.waitForFunction(
	(prev) => {
		const img = document.querySelector('img[alt="Result"]');
		return !!img && img.src !== prev;
	},
	result64,
	{ timeout: 20000 }
);
const resultPico8 = await page.evaluate(resultSrc);
const statsPico8 = await page.evaluate(gridStats, { dataUrl: resultPico8, gridWidth: 64 });
check('a different palette changes the result', resultPico8 !== result64);
check('result is quantised to the selected palette', statsPico8.colours <= 16, `${statsPico8.colours} colours`);

console.log('\n── real-size preview modal ──');
await page.locator('button:has-text("Preview")').first().click();
await page.locator('text=Real size preview').waitFor({ state: 'visible', timeout: 5000 });
check('preview modal reports the grid width', (await page.locator('text=64 px width').count()) > 0);
const previewInfo = await page.evaluate(previewImageInfo);
check('preview renders a data URL', previewInfo.isDataUrl);
check('preview is rendered at grid resolution', previewInfo.width === 64, `${previewInfo.width}px wide`);
await page.locator('button[aria-label="Close preview"]').click();
await page.waitForTimeout(400);

// The recovered Switch CSS hides the real checkbox (`opacity: 0; width: 0; height: 0`),
// so the label is what a user actually clicks.
const reduceSizeSwitch = page.getByText('Reduce size').locator('..').locator('label.switch');
const reduceSizeInput = page.getByText('Reduce size').locator('..').locator('input[type="checkbox"]');
const removeBgSwitch = page.locator('#removeBackgroudSetting label.switch');
const removeBgInput = page.locator('#removeBackgroudSetting input[type="checkbox"]');

console.log('\n── download (reduce size ON) exports a valid PNG ──');
await reduceSizeSwitch.click();
check('"Reduce size" switch is on', await reduceSizeInput.isChecked());
const [download] = await Promise.all([
	page.waitForEvent('download', { timeout: 20000 }),
	page.locator('button:has-text("Download")').click()
]);
const downloaded = readFileSync(await download.path());
const info = pngInfo(downloaded);
check(
	'download filename follows the recovered pattern',
	/-pixelicious\.png$/.test(download.suggestedFilename()),
	download.suggestedFilename()
);
check('downloaded file is a valid PNG', info.signature && info.bitDepth === 8 && info.colorType >= 2);
check('downloaded file is non-empty', downloaded.length > 200, `${downloaded.length} bytes`);
check('"Reduce size" exports at the selected px size', info.width === 64, `${info.width}x${info.height}`);

console.log('\n── download (reduce size OFF) exports the 512px result ──');
await reduceSizeSwitch.click();
check('"Reduce size" switch is off again', !(await reduceSizeInput.isChecked()));
const [downloadFull] = await Promise.all([
	page.waitForEvent('download', { timeout: 20000 }),
	page.locator('button:has-text("Download")').click()
]);
const full = pngInfo(readFileSync(await downloadFull.path()));
check('full-size export is 512px wide', full.width === 512, `${full.width}x${full.height}`);

console.log('\n── drag and drop ──');
const dropped = await page.evaluate(dropImage, uploaded);
check('drop zone applies the recovered drag highlight', dropped.highlighted, dropped.idle.slice(0, 80));
check('drop zone returns to its idle background on dragleave', dropped.restored);
await page.waitForFunction(
	(prev) => {
		const img = document.querySelector('img[alt="Result"]');
		return !!img && img.src.startsWith('data:image/png') && img.src !== prev;
	},
	resultPico8,
	{ timeout: 20000 }
);
const droppedResult = await page.evaluate(resultSrc);
check('dropping an image re-runs the conversion', droppedResult !== resultPico8 && droppedResult.startsWith('data:image/png'));
// the recovered `Ue()` resets the palette to `defaultPalettes[4]` on every upload
await page.waitForTimeout(300);
const statsAfterDrop = await page.evaluate(gridStats, { dataUrl: droppedResult, gridWidth: 256 });
check(
	'drop resets the grid to 256px and the default palette',
	statsAfterDrop.cell === 2 && statsAfterDrop.colours <= 16,
	`cell=${statsAfterDrop.cell}, ${statsAfterDrop.colours} colours`
);

console.log('\n── swatch click opens the palette editor ──');
await page.getByText('Color palette').click();
await page.locator('button[aria-label="Edit colour 2"]').first().click();
await page.locator('text=Edit palette').waitFor({ state: 'visible', timeout: 5000 });
check('palette editor drawer opens', await page.locator('input[type="color"]').isVisible());
await page.locator('#modal button:has-text("Close")').last().click();

console.log('\n── background removal is routed to the Scenario modal, as recovered ──');
await removeBgSwitch.click(); // "Remove background ✨"
check('remove-background switch is on', await removeBgInput.isChecked());
await page.locator('button:has-text("Generate")').click();
await page.locator('text=Remove the background on').waitFor({ state: 'visible', timeout: 5000 });
check('bg-removal modal explains the Scenario limitation', await page.locator('text=only available on the').isVisible());
check('bg-removal modal links to Scenario', await page.locator('a:has-text("Go to Scenario")').isVisible());
await page.locator('button[aria-label="Close"]').click();
await page.waitForTimeout(400);

console.log('\n── Escape closes modals ──');
await page.locator('button:has-text("Generate")').click();
await page.locator('text=Remove the background on').waitFor({ state: 'visible', timeout: 5000 });
await page.keyboard.press('Escape');
await page.waitForTimeout(500);
check('Escape closes the modal', (await page.locator('text=Remove the background on').count()) === 0);
await removeBgSwitch.click();
check('remove-background switch is off again', !(await removeBgInput.isChecked()));

console.log('\n── responsive layout ──');
await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(400);
check('mobile viewport has no horizontal overflow', !(await page.evaluate(hasOverflow)));
check('upload zone is still usable on mobile', await page.locator('label[for="file"]').isVisible());
check('result preview is still visible on mobile', await page.locator('img[alt="Result"]').first().isVisible());
await page.setViewportSize({ width: 1280, height: 1000 });

console.log('\n── error handling ──');
check(
	'no uncaught runtime errors during the whole session',
	consoleErrors.length === 0,
	consoleErrors.slice(0, 5).join(' | ')
);

await browser.close();

console.log(`\n${failures === 0 ? 'All browser checks passed.' : `${failures} browser check(s) FAILED`}`);
process.exitCode = failures === 0 ? 0 : 1;
