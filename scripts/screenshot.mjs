/**
 * Visual comparison captures.
 *
 *   node scripts/screenshot.mjs
 *
 * Writes into recovery/verification/:
 *   1. shot-reconstruction-initial.png    this project, first paint
 *   2. shot-reconstruction-converted.png  this project, after converting the original
 *                                         site's own archived sample image
 *   3. shot-archived-original.png         the live Wayback snapshot of the original page,
 *                                         at the same viewport, for side-by-side comparison
 *
 * Requires Playwright (intentionally not a dependency — see README):
 *   npm install --no-save playwright && npx playwright install chromium
 *
 * The dev server must already be running; set BASE_URL if it is not on 127.0.0.1:3000.
 * The archived capture needs network access and is skipped, not fatal, if it fails.
 */
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const BASE_URL = process.env.BASE_URL ?? 'http://127.0.0.1:3000';
const ARCHIVE_URL = process.env.ARCHIVE_URL ?? 'https://web.archive.org/web/20241014165640/https://www.pixelicious.xyz/';
const OUT = 'recovery/verification';
const SAMPLE = 'static/assets/base-f8a74a87.png';
// The sample the original site shipped with: 512x512 RGB.
const VIEWPORT = { width: 1440, height: 1200 };

const shot = (page, name) => page.screenshot({ path: `${OUT}/${name}`, fullPage: true });

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 1 });

// 1 + 2 — the reconstruction.
const app = await context.newPage();
await app.goto(BASE_URL, { waitUntil: 'networkidle' });
await app.waitForTimeout(2500); // let the webfonts settle before capturing
await shot(app, 'shot-reconstruction-initial.png');

await app.setInputFiles('#file', SAMPLE);
await app.waitForFunction(
  () => document.querySelector('img[alt="Result"]')?.src.startsWith('data:image/png'),
  null,
  { timeout: 30000 }
);
// Open the advanced drawer so the controls are visible in the capture too.
await app.getByText('Pixel grid size').click();
await app.waitForTimeout(900);
await shot(app, 'shot-reconstruction-converted.png');
console.log('reconstruction captures written');

// 3 — the original, from the archive. Best effort: the Wayback Machine is not always up.
const archive = await context.newPage();
try {
  await archive.goto(ARCHIVE_URL, { waitUntil: 'domcontentloaded', timeout: 90_000 });
  // Hide Wayback's own injected toolbar so only the page itself is captured.
  await archive
    .addStyleTag({ content: '#wm-ipp-base,#wm-ipp-print,#donato{display:none !important}' })
    .catch(() => {});
  await archive.waitForTimeout(9000);
  await shot(archive, 'shot-archived-original.png');
  console.log('archived capture written');
} catch (error) {
  console.log(`archived capture failed (not fatal): ${String(error.message).slice(0, 200)}`);
}

await browser.close();
