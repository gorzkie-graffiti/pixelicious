/**
 * End-to-end verification of the conversion pipeline on *real* image bytes.
 *
 * The browser path (canvas -> worker -> data URL -> download) cannot be executed
 * without a browser, so this script exercises everything below that boundary:
 *
 *   1. decode a real PNG (by default the original site's own sample image,
 *      `static/assets/base-f8a74a87.png`, 512x512 RGB — the exact shape the original
 *      normalised every upload to),
 *   2. run the shipped `computePixelArt()` from `src/lib/pixelate.js`,
 *   3. encode the result as PNG (this is the file the Download button produces),
 *   4. assert the output is a valid, non-empty PNG that genuinely differs from the
 *      input, is bounded by the palette, and is built from crisp uniform blocks,
 *   5. repeat for the "Reduce size" export width.
 *
 * The PNG codec below is intentionally minimal (8-bit RGB/RGBA, non-interlaced) and
 * uses only `node:zlib`, so no extra dependency is needed to reproduce the check.
 *
 *   node scripts/verify-pipeline.mjs
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { deflateSync, inflateSync } from 'node:zlib';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { REDIM_CONSTANT, computePixelArt, downsampleBox } from '../src/lib/pixelate.js';
import { DEFAULT_PALETTES, DEFAULT_PALETTE_INDEX } from '../src/lib/palettes.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'recovery', 'verification');
mkdirSync(outDir, { recursive: true });

// ── minimal PNG codec ───────────────────────────────────────────────────────────

const CRC_TABLE = (() => {
	const table = new Int32Array(256);
	for (let n = 0; n < 256; n++) {
		let c = n;
		for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
		table[n] = c;
	}
	return table;
})();

function crc32(buffer) {
	let c = 0xffffffff;
	for (const byte of buffer) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8);
	return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
	const length = Buffer.alloc(4);
	length.writeUInt32BE(data.length);
	const body = Buffer.concat([Buffer.from(type, 'latin1'), data]);
	const crc = Buffer.alloc(4);
	crc.writeUInt32BE(crc32(body));
	return Buffer.concat([length, body, crc]);
}

/**
 * @param {string} file
 * @returns {{data: Uint8ClampedArray, width: number, height: number}}
 */
function decodePng(file) {
	const buffer = readFileSync(file);
	if (buffer.subarray(0, 8).toString('latin1') !== '\x89PNG\r\n\x1a\n') {
		throw new Error(`${file} is not a PNG`);
	}
	let offset = 8;
	let width = 0;
	let height = 0;
	let colorType = -1;
	let bitDepth = 0;
	let interlace = 0;
	const idat = [];
	while (offset < buffer.length) {
		const length = buffer.readUInt32BE(offset);
		const type = buffer.subarray(offset + 4, offset + 8).toString('latin1');
		const data = buffer.subarray(offset + 8, offset + 8 + length);
		if (type === 'IHDR') {
			width = data.readUInt32BE(0);
			height = data.readUInt32BE(4);
			bitDepth = data[8];
			colorType = data[9];
			interlace = data[12];
		} else if (type === 'IDAT') {
			idat.push(data);
		} else if (type === 'IEND') {
			break;
		}
		offset += 12 + length;
	}
	if (bitDepth !== 8) throw new Error(`unsupported bit depth ${bitDepth}`);
	if (interlace !== 0) throw new Error('interlaced PNGs are not supported by this verifier');
	const channels = colorType === 2 ? 3 : colorType === 6 ? 4 : 0;
	if (!channels) throw new Error(`unsupported colour type ${colorType}`);

	const raw = inflateSync(Buffer.concat(idat));
	const stride = width * channels;
	const out = new Uint8ClampedArray(width * height * 4);
	let previous = Buffer.alloc(stride);

	for (let y = 0; y < height; y++) {
		const filter = raw[y * (stride + 1)];
		const line = Buffer.from(raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1)));
		for (let x = 0; x < stride; x++) {
			const a = x >= channels ? line[x - channels] : 0;
			const b = previous[x];
			const c = x >= channels ? previous[x - channels] : 0;
			switch (filter) {
				case 0:
					break;
				case 1:
					line[x] = (line[x] + a) & 0xff;
					break;
				case 2:
					line[x] = (line[x] + b) & 0xff;
					break;
				case 3:
					line[x] = (line[x] + ((a + b) >> 1)) & 0xff;
					break;
				case 4: {
					const p = a + b - c;
					const pa = Math.abs(p - a);
					const pb = Math.abs(p - b);
					const pc = Math.abs(p - c);
					const predictor = pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
					line[x] = (line[x] + predictor) & 0xff;
					break;
				}
				default:
					throw new Error(`unknown PNG filter ${filter}`);
			}
		}
		for (let x = 0; x < width; x++) {
			const s = x * channels;
			const d = (y * width + x) * 4;
			out[d] = line[s];
			out[d + 1] = line[s + 1];
			out[d + 2] = line[s + 2];
			out[d + 3] = channels === 4 ? line[s + 3] : 255;
		}
		previous = line;
	}
	return { data: out, width, height };
}

/**
 * @param {{data: Uint8ClampedArray, width: number, height: number}} image
 * @returns {Buffer}
 */
function encodePng(image) {
	const { data, width, height } = image;
	const stride = width * 4;
	const raw = Buffer.alloc((stride + 1) * height);
	for (let y = 0; y < height; y++) {
		raw[y * (stride + 1)] = 0; // filter: none
		for (let x = 0; x < stride; x++) raw[y * (stride + 1) + 1 + x] = data[y * stride + x];
	}
	const ihdr = Buffer.alloc(13);
	ihdr.writeUInt32BE(width, 0);
	ihdr.writeUInt32BE(height, 4);
	ihdr[8] = 8;
	ihdr[9] = 6; // RGBA
	return Buffer.concat([
		Buffer.from('\x89PNG\r\n\x1a\n', 'latin1'),
		chunk('IHDR', ihdr),
		chunk('IDAT', deflateSync(raw, { level: 9 })),
		chunk('IEND', Buffer.alloc(0))
	]);
}

// ── checks ──────────────────────────────────────────────────────────────────────

let failures = 0;

/** @param {string} label @param {boolean} condition @param {string} [detail] */
function check(label, condition, detail = '') {
	const status = condition ? 'PASS' : 'FAIL';
	if (!condition) failures++;
	console.log(`  [${status}] ${label}${detail ? ` — ${detail}` : ''}`);
}

/**
 * @param {number[][]} palette
 * @param {number} r
 * @param {number} g
 * @param {number} b
 */
const inPalette = (palette, r, g, b) => palette.some((c) => c[0] === r && c[1] === g && c[2] === b);

function uniformBlocks(result, gridWidth) {
	const cell = REDIM_CONSTANT / gridWidth;
	for (let by = 0; by < gridWidth; by++) {
		for (let bx = 0; bx < gridWidth; bx++) {
			const first = (by * cell * REDIM_CONSTANT + bx * cell) * 4;
			for (let dy = 0; dy < cell; dy++) {
				for (let dx = 0; dx < cell; dx++) {
					const i = ((by * cell + dy) * REDIM_CONSTANT + bx * cell + dx) * 4;
					for (let c = 0; c < 4; c++) {
						if (result.data[i + c] !== result.data[first + c]) return { bx, by };
					}
				}
			}
		}
	}
	return null;
}

console.log('Pixelicious reconstruction — end-to-end pipeline verification\n');

const samplePath = join(root, 'static', 'assets', 'base-f8a74a87.png');
const source = decodePng(samplePath);
console.log(`source: ${samplePath.replace(root + '/', '')} (${source.width}x${source.height})`);
check('decoded source is the recovered 512px working width', source.width === REDIM_CONSTANT);
check('decoded source is non-empty', source.data.length === source.width * source.height * 4);

const palette = DEFAULT_PALETTES[DEFAULT_PALETTE_INDEX];
console.log(`palette: defaultPalettes[${DEFAULT_PALETTE_INDEX}] (${palette.length} colours)\n`);

for (const gridSize of [32, 64, 128, 256]) {
	console.log(`gridSize=${gridSize}px`);
	const started = process.hrtime.bigint();
	const result = computePixelArt({
		data: source.data,
		width: source.width,
		height: source.height,
		gridSize,
		colorPalette: palette,
		removeNoise: true
	});
	const elapsed = Number(process.hrtime.bigint() - started) / 1e6;

	const png = encodePng(result);
	const outFile = join(outDir, `result-grid${gridSize}.png`);
	writeFileSync(outFile, png);

	// Is the written file a valid PNG we can read back?
	const roundTrip = decodePng(outFile);
	check('output PNG decodes again', roundTrip.width === REDIM_CONSTANT && roundTrip.height === source.height);
	check('output PNG is non-empty', png.length > 1000, `${(png.length / 1024).toFixed(1)} KB`);
	check('output keeps the 512px working width', result.width === REDIM_CONSTANT);
	check('output keeps the source aspect ratio', result.height === source.height);

	// Colour reduction
	const distinct = new Set();
	let opaque = 0;
	let offPalette = 0;
	for (let i = 0; i < result.data.length; i += 4) {
		if (result.data[i + 3] === 0) continue;
		opaque++;
		distinct.add(`${result.data[i]},${result.data[i + 1]},${result.data[i + 2]}`);
		if (!inPalette(palette, result.data[i], result.data[i + 1], result.data[i + 2])) offPalette++;
	}
	const sourceDistinct = new Set();
	for (let i = 0; i < source.data.length; i += 4) {
		sourceDistinct.add(`${source.data[i]},${source.data[i + 1]},${source.data[i + 2]}`);
	}
	check('every opaque pixel is a palette colour', offPalette === 0, `${offPalette} off-palette`);
	check(
		'colour count collapsed dramatically',
		distinct.size <= palette.length && distinct.size < sourceDistinct.size / 10,
		`${sourceDistinct.size} source colours -> ${distinct.size}`
	);

	// Genuinely pixelated: uniform square blocks of 512/gridSize pixels
	const broken = uniformBlocks(result, gridSize);
	check(
		'output is built from uniform blocks',
		broken === null,
		broken ? `block ${broken.bx},${broken.by} is not uniform` : `block size ${REDIM_CONSTANT / gridSize}px`
	);

	// Different from the input
	let differing = 0;
	for (let i = 0; i < source.data.length; i += 4) {
		if (
			source.data[i] !== result.data[i] ||
			source.data[i + 1] !== result.data[i + 1] ||
			source.data[i + 2] !== result.data[i + 2]
		) {
			differing++;
		}
	}
	const ratio = differing / opaque;
	check('output differs from the uploaded image', ratio > 0.5, `${(ratio * 100).toFixed(1)}% of pixels changed`);

	// "Reduce size" export path: the same art at the selected px width
	const reduced = downsampleBox(result, gridSize, Math.round((source.height * gridSize) / REDIM_CONSTANT));
	const reducedPng = encodePng(reduced);
	writeFileSync(join(outDir, `result-grid${gridSize}-reduced.png`), reducedPng);
	check(
		'"Reduce size" export is exactly gridSize px wide',
		reduced.width === gridSize,
		`${reduced.width}x${reduced.height}`
	);
	check('"Reduce size" export is non-empty', reducedPng.length > 200, `${(reducedPng.length / 1024).toFixed(1)} KB`);

	console.log(`  (conversion took ${elapsed.toFixed(1)} ms)\n`);
}

// Transparency must survive the whole pipeline (sprites rely on it).
console.log('transparency handling');
const alphaSource = new Uint8ClampedArray(source.data);
for (let y = 0; y < source.height; y++) {
	for (let x = 0; x < source.width / 4; x++) alphaSource[(y * source.width + x) * 4 + 3] = 0;
}
const withAlpha = computePixelArt({
	data: alphaSource,
	width: source.width,
	height: source.height,
	gridSize: 64,
	colorPalette: palette,
	removeNoise: true
});
let leftOpaque = 0;
let rightTransparent = 0;
for (let y = 0; y < withAlpha.height; y++) {
	for (let x = 0; x < 32; x++) if (withAlpha.data[(y * withAlpha.width + x) * 4 + 3] !== 0) leftOpaque++;
	for (let x = 256; x < withAlpha.width; x++)
		if (withAlpha.data[(y * withAlpha.width + x) * 4 + 3] === 0) rightTransparent++;
}
check('transparent region stays transparent', leftOpaque === 0, `${leftOpaque} opaque pixels in the cleared region`);
check('opaque region stays opaque', rightTransparent === 0, `${rightTransparent} transparent pixels on the right`);
writeFileSync(join(outDir, 'result-transparency.png'), encodePng(withAlpha));

console.log(`\nArtifacts written to recovery/verification/`);
if (failures > 0) {
	console.error(`\n${failures} check(s) FAILED`);
	process.exitCode = 1;
} else {
	console.log('All pipeline checks passed.');
}
