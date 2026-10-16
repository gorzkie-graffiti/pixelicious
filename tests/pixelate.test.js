/**
 * Unit tests for the pure conversion core and the upload validation rules.
 *
 * Run with `npm test` (node --test). These cover the parts of the workflow that do not
 * need a DOM; the canvas/worker/download paths are exercised in the browser (see
 * docs/TECHNICAL-NOTES.md §6).
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import {
	DEFAULT_COLOR_COUNT,
	GRID_SIZES,
	REDIM_CONSTANT,
	computePixelArt,
	defaultGridSize,
	downsampleBox,
	medianCut,
	medianFilter3x3,
	pixelSizeMultiplier,
	quantizeToPalette,
	resizeNearest
} from '../src/lib/pixelate.js';
import { DEFAULT_PALETTES, DEFAULT_PALETTE_INDEX } from '../src/lib/palettes.js';
import { ACCEPTED_TYPES, validateFile } from '../src/lib/image.js';

const PALETTE = [
	[0, 0, 0],
	[255, 255, 255],
	[200, 30, 30],
	[30, 60, 200]
];

/**
 * @param {number} width
 * @param {number} height
 * @param {(x: number, y: number) => [number, number, number, number]} fn
 */
function makeImage(width, height, fn) {
	const data = new Uint8ClampedArray(width * height * 4);
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const [r, g, b, a] = fn(x, y);
			const i = (y * width + x) * 4;
			data[i] = r;
			data[i + 1] = g;
			data[i + 2] = b;
			data[i + 3] = a;
		}
	}
	return { data, width, height };
}

/** A gradient with a hard red block, so quantisation has something to do. */
function sampleSource(width = REDIM_CONSTANT, height = REDIM_CONSTANT / 2) {
	return makeImage(width, height, (x, y) => {
		if (x > width / 4 && x < width / 2 && y > height / 4 && y < height / 2) return [230, 20, 20, 255];
		const v = Math.round((x / width) * 255);
		const w = Math.round((y / height) * 255);
		return [v, w, (v + w) >> 1, 255];
	});
}

// ── recovered constants ─────────────────────────────────────────────────────────

test('REDIM_CONSTANT matches the recovered 512px working resolution', () => {
	assert.equal(REDIM_CONSTANT, 512);
});

test('GRID_SIZES matches the four recovered buttons (32/64/128/256 px)', () => {
	assert.deepEqual(GRID_SIZES, [32, 64, 128, 256]);
});

test('defaultGridSize reproduces the recovered ue() area threshold', () => {
	// area <= 65536 -> 256, otherwise 128
	assert.equal(defaultGridSize(256, 256), 256);
	assert.equal(defaultGridSize(128, 512), 256);
	assert.equal(defaultGridSize(512, 512), 128);
	assert.equal(defaultGridSize(257, 256), 128);
});

test('pixelSizeMultiplier reproduces redimConstant / gridSize', () => {
	assert.equal(pixelSizeMultiplier(256), 2);
	assert.equal(pixelSizeMultiplier(128), 4);
	assert.equal(pixelSizeMultiplier(64), 8);
	assert.equal(pixelSizeMultiplier(32), 16);
});

test('the recovered default palette is a 16-colour palette', () => {
	assert.equal(DEFAULT_PALETTES.length, 20);
	assert.equal(DEFAULT_PALETTE_INDEX, 4);
	assert.equal(DEFAULT_PALETTES[DEFAULT_PALETTE_INDEX].length, 16);
});

// ── primitives ──────────────────────────────────────────────────────────────────

test('downsampleBox keeps a flat colour exactly', () => {
	const src = makeImage(64, 64, () => [12, 34, 56, 255]);
	const out = downsampleBox(src, 8, 8);
	assert.equal(out.width, 8);
	assert.equal(out.height, 8);
	for (let i = 0; i < out.data.length; i += 4) {
		assert.equal(out.data[i], 12);
		assert.equal(out.data[i + 1], 34);
		assert.equal(out.data[i + 2], 56);
		assert.equal(out.data[i + 3], 255);
	}
});

test('downsampleBox averages a checkerboard toward the midpoint', () => {
	const src = makeImage(4, 4, (x, y) => ((x + y) % 2 ? [255, 255, 255, 255] : [0, 0, 0, 255]));
	const out = downsampleBox(src, 1, 1);
	assert.deepEqual([...out.data], [128, 128, 128, 255]);
});

test('downsampleBox preserves a hard transparency edge without halos', () => {
	// left half fully transparent, right half opaque red
	const src = makeImage(8, 4, (x) => (x < 4 ? [0, 0, 0, 0] : [255, 0, 0, 255]));
	const out = downsampleBox(src, 2, 1);
	assert.equal(out.data[3], 0, 'left cell should stay fully transparent');
	assert.equal(out.data[7], 255, 'right cell should stay fully opaque');
	// The opaque cell must be pure red, not darkened toward black by the transparent neighbour.
	assert.deepEqual([out.data[4], out.data[5], out.data[6]], [255, 0, 0]);
});

test('resizeNearest expands blocks without interpolating', () => {
	const src = makeImage(2, 1, (x) => (x === 0 ? [10, 10, 10, 255] : [250, 250, 250, 255]));
	const out = resizeNearest(src, 8, 1);
	const values = [];
	for (let x = 0; x < 8; x++) values.push(out.data[x * 4]);
	assert.deepEqual(values, [10, 10, 10, 10, 250, 250, 250, 250]);
	// no intermediate grey: nearest neighbour only
	assert.ok(!values.includes(130));
});

test('medianFilter3x3 removes an isolated speckle', () => {
	const src = makeImage(7, 7, (x, y) => (x === 3 && y === 3 ? [255, 0, 0, 255] : [10, 10, 10, 255]));
	const out = medianFilter3x3(src);
	const center = (3 * 7 + 3) * 4;
	assert.deepEqual([out.data[center], out.data[center + 1], out.data[center + 2]], [10, 10, 10]);
});

test('quantizeToPalette maps every opaque pixel onto the palette', () => {
	const src = makeImage(16, 16, (x, y) => [x * 16, y * 16, 128, 255]);
	const out = quantizeToPalette(src, PALETTE);
	for (let i = 0; i < out.data.length; i += 4) {
		const match = PALETTE.some(
			(c) => c[0] === out.data[i] && c[1] === out.data[i + 1] && c[2] === out.data[i + 2]
		);
		assert.ok(match, `pixel ${i / 4} is not a palette colour`);
	}
});

test('quantizeToPalette leaves fully transparent pixels untouched', () => {
	const src = makeImage(4, 1, (x) => (x === 0 ? [11, 22, 33, 0] : [11, 22, 33, 255]));
	const out = quantizeToPalette(src, PALETTE);
	assert.deepEqual([out.data[0], out.data[1], out.data[2], out.data[3]], [11, 22, 33, 0]);
});

test('medianCut never exceeds the requested colour count and covers the range', () => {
	const src = makeImage(64, 64, (x, y) => [x * 4, y * 4, 255 - x * 4, 255]);
	const palette = medianCut(src, 8);
	assert.ok(palette.length <= 8 && palette.length > 1);
	for (const color of palette) {
		assert.equal(color.length, 3);
		for (const channel of color) assert.ok(channel >= 0 && channel <= 255);
	}
});

test('medianCut falls back to a single colour for an empty image', () => {
	const src = makeImage(4, 4, () => [0, 0, 0, 0]);
	assert.deepEqual(medianCut(src, 8), [[0, 0, 0]]);
});

// ── the full conversion ─────────────────────────────────────────────────────────

for (const gridSize of GRID_SIZES) {
	test(`computePixelArt at ${gridSize}px produces crisp uniform blocks at 512px wide`, () => {
		const src = sampleSource();
		const result = computePixelArt({ ...src, gridSize, colorPalette: PALETTE, removeNoise: false });

		assert.equal(result.width, REDIM_CONSTANT, 'output stays at the recovered working width');
		assert.equal(result.height, src.height);

		// every opaque output pixel is a palette colour
		for (let i = 0; i < result.data.length; i += 4) {
			if (result.data[i + 3] === 0) continue;
			const match = PALETTE.some(
				(c) => c[0] === result.data[i] && c[1] === result.data[i + 1] && c[2] === result.data[i + 2]
			);
			assert.ok(match, 'output contains a colour outside the palette');
		}

		// each cell of the grid is a single flat block -> nearest-neighbour upscale
		const cell = REDIM_CONSTANT / gridSize;
		for (let by = 0; by < gridSize; by++) {
			for (let bx = 0; bx < gridSize; bx++) {
				const first = ((by * cell) * REDIM_CONSTANT + bx * cell) * 4;
				for (let dy = 0; dy < cell; dy++) {
					for (let dx = 0; dx < cell; dx++) {
						const i = ((by * cell + dy) * REDIM_CONSTANT + bx * cell + dx) * 4;
						assert.equal(result.data[i], result.data[first]);
						assert.equal(result.data[i + 1], result.data[first + 1]);
						assert.equal(result.data[i + 2], result.data[first + 2]);
						assert.equal(result.data[i + 3], result.data[first + 3]);
					}
				}
			}
		}
	});
}

test('computePixelArt changes the image substantially (it is a real conversion)', () => {
	const src = sampleSource();
	const result = computePixelArt({ ...src, gridSize: 64, colorPalette: PALETTE, removeNoise: false });
	let differing = 0;
	for (let i = 0; i < src.data.length; i += 4) {
		if (src.data[i] !== result.data[i] || src.data[i + 1] !== result.data[i + 1]) differing++;
	}
	const ratio = differing / (src.data.length / 4);
	assert.ok(ratio > 0.5, `expected most pixels to change, got ${(ratio * 100).toFixed(1)}%`);
});

test('computePixelArt preserves transparency and aspect ratio', () => {
	const src = makeImage(512, 256, (x, y) => (x < 128 ? [0, 0, 0, 0] : [x % 256, y % 256, 90, 255]));
	const result = computePixelArt({ ...src, gridSize: 64, colorPalette: PALETTE, removeNoise: true });

	assert.equal(result.width, 512);
	assert.equal(result.height, 256);

	// A quarter of the width on the left is transparent, on the right it is opaque.
	/** @param {number} x @param {number} y */
	const alphaAt = (x, y) => result.data[(y * 512 + x) * 4 + 3];
	for (let y = 0; y < 256; y += 16) {
		for (let x = 0; x < 64; x++) assert.equal(alphaAt(x, y), 0, `expected transparency at ${x},${y}`);
		for (let x = 192; x < 512; x += 7) assert.equal(alphaAt(x, y), 255, `expected opacity at ${x},${y}`);
	}
});

test('computePixelArt generates a palette when none is supplied', () => {
	const src = sampleSource();
	const result = computePixelArt({ ...src, gridSize: 64, colorPalette: undefined, removeNoise: false });
	assert.ok(result.palette.length > 1 && result.palette.length <= DEFAULT_COLOR_COUNT);
	const distinct = new Set();
	for (let i = 0; i < result.data.length; i += 4) {
		if (result.data[i + 3] === 0) continue;
		distinct.add(`${result.data[i]},${result.data[i + 1]},${result.data[i + 2]}`);
	}
	assert.ok(distinct.size <= DEFAULT_COLOR_COUNT, 'generated palette must bound the colour count');
});

test('computePixelArt clamps an out-of-range grid size', () => {
	const src = sampleSource(512, 128);
	const result = computePixelArt({ ...src, gridSize: 100000, colorPalette: PALETTE, removeNoise: false });
	assert.equal(result.grid.width, 256, 'grid width is clamped to the largest recovered option');
});

test('computePixelArt keeps the recovered output shape for a tall image', () => {
	const src = makeImage(512, 1024, (x, y) => [x % 256, y % 256, 40, 255]);
	const result = computePixelArt({ ...src, gridSize: 32, colorPalette: PALETTE, removeNoise: false });
	assert.equal(result.width, 512);
	assert.equal(result.height, 1024);
	assert.equal(result.grid.height, 64);
});

// ── upload validation ───────────────────────────────────────────────────────────

test('ACCEPTED_TYPES matches the recovered png/webp/jpeg check', () => {
	assert.deepEqual([...ACCEPTED_TYPES].sort(), ['image/jpeg', 'image/png', 'image/webp']);
});

test('validateFile accepts supported types and rejects everything else', () => {
	const ok = new File([new Uint8Array(64)], 'sprite.png', { type: 'image/png' });
	assert.equal(validateFile(ok), null);

	const webp = new File([new Uint8Array(64)], 'sprite.webp', { type: 'image/webp' });
	assert.equal(validateFile(webp), null);

	const gif = new File([new Uint8Array(64)], 'sprite.gif', { type: 'image/gif' });
	assert.match(String(validateFile(gif)), /PNG, WEBP, or JPG/);

	const empty = new File([], 'sprite.png', { type: 'image/png' });
	assert.match(String(validateFile(empty)), /empty/);

	const huge = new File([new Uint8Array(26 * 1024 * 1024)], 'sprite.png', { type: 'image/png' });
	assert.match(String(validateFile(huge)), /under 25MB/);
});
