/**
 * Pure (DOM-free) core of the Pixelicious image-to-pixel-art conversion.
 *
 * Everything here operates on plain RGBA byte buffers so it can run in a Web Worker
 * and be unit-tested under Node.
 *
 * ── What was recovered ────────────────────────────────────────────────────────────
 * `_app/immutable/components/pages/_page.svelte-e11325da.js` (the bundle referenced
 * by the 2024-10-14 HTML snapshot) shows the browser side of the original pipeline:
 *
 *   redimConstant = 512
 *   // normalise the source to 512px wide, flatten alpha, then POST to the server
 *   image = (await Image.load(file)).resize({ width: 512 }).toDataURL()
 *   body  = { image, gridSize, colorPalette, removeNoise, removeBackground }
 *   const { result } = await (await fetch('/api/computeImage', {…})).json()
 *
 * `gridSize` is the *pixel grid width* selected in the UI (32 / 64 / 128 / 256 px)
 * and the download path resizes the 512px-wide result back down to that width:
 *
 *   (await Image.load(result)).resize({ width: redimConstant / pixelSize })
 *
 * The server-side `/api/computeImage` handler was **not** archived (it only ever
 * accepted POST bodies, so no crawler captured it). The steps below are therefore a
 * faithful reconstruction of the *observed contract* — same inputs, same grid
 * semantics, same 512px-wide output — using a standard, deterministic pixel-art
 * pipeline. See docs/TECHNICAL-NOTES.md §3 for exactly which parts are evidence and
 * which are inference.
 */

/** The original's `redimConstant`: the working resolution all server I/O used. */
export const REDIM_CONSTANT = 512;

/** The four grid widths exposed by the "Pixel grid size" buttons (recovered labels: 32px…256px). */
export const GRID_SIZES = [32, 64, 128, 256];

/** Largest grid width accepted, to reject absurd payloads. */
export const MAX_GRID_SIZE = 256;

/** Colour count used when the user turns the palette off (the default palette has 16 colours). */
export const DEFAULT_COLOR_COUNT = 16;

/** Alpha at or below this value is snapped to fully transparent. */
const ALPHA_FLOOR = 8;

/**
 * Recovered `ue()` from the page component: choose the default grid width from the
 * source image area. Area <= 65536px² (e.g. 256×256) starts at 256px, otherwise 128px.
 *
 * @param {number} width
 * @param {number} height
 * @returns {number} one of GRID_SIZES
 */
export function defaultGridSize(width, height) {
	return width * height <= 65536 ? 256 : 128;
}

/**
 * Recovered `pe()`: the download scale factor is always `512 / gridSize`.
 *
 * @param {number} gridSize
 * @returns {number}
 */
export function pixelSizeMultiplier(gridSize) {
	return REDIM_CONSTANT / gridSize;
}

/**
 * Nearest-neighbour resample of an RGBA buffer.
 *
 * @param {{data: Uint8ClampedArray, width: number, height: number}} src
 * @param {number} outWidth
 * @param {number} outHeight
 * @returns {{data: Uint8ClampedArray, width: number, height: number}}
 */
export function resizeNearest(src, outWidth, outHeight) {
	const out = new Uint8ClampedArray(outWidth * outHeight * 4);
	const { data, width: srcWidth, height: srcHeight } = src;
	for (let y = 0; y < outHeight; y++) {
		const sy = Math.min(srcHeight - 1, Math.floor((y * srcHeight) / outHeight));
		for (let x = 0; x < outWidth; x++) {
			const sx = Math.min(srcWidth - 1, Math.floor((x * srcWidth) / outWidth));
			const s = (sy * srcWidth + sx) * 4;
			const d = (y * outWidth + x) * 4;
			out[d] = data[s];
			out[d + 1] = data[s + 1];
			out[d + 2] = data[s + 2];
			out[d + 3] = data[s + 3];
		}
	}
	return { data: out, width: outWidth, height: outHeight };
}

/**
 * Box-average (area) downsample of an RGBA buffer.
 *
 * Colour channels are averaged with **premultiplied alpha** so that transparent
 * regions cannot bleed dark halos into the visible pixels, and alpha is averaged
 * independently so transparency survives the downsample (an important requirement
 * for sprite work — see docs/TECHNICAL-NOTES.md §3.4).
 *
 * @param {{data: Uint8ClampedArray, width: number, height: number}} src
 * @param {number} outWidth
 * @param {number} outHeight
 * @returns {{data: Uint8ClampedArray, width: number, height: number}}
 */
export function downsampleBox(src, outWidth, outHeight) {
	const { data, width: srcWidth, height: srcHeight } = src;
	const out = new Uint8ClampedArray(outWidth * outHeight * 4);
	const xRatio = srcWidth / outWidth;
	const yRatio = srcHeight / outHeight;

	for (let y = 0; y < outHeight; y++) {
		const y0 = Math.floor(y * yRatio);
		const y1 = Math.max(y0 + 1, Math.min(srcHeight, Math.round((y + 1) * yRatio)));
		for (let x = 0; x < outWidth; x++) {
			const x0 = Math.floor(x * xRatio);
			const x1 = Math.max(x0 + 1, Math.min(srcWidth, Math.round((x + 1) * xRatio)));

			let sr = 0;
			let sg = 0;
			let sb = 0;
			let sa = 0;
			let n = 0;
			for (let sy = y0; sy < y1; sy++) {
				for (let sx = x0; sx < x1; sx++) {
					const i = (sy * srcWidth + sx) * 4;
					const a = data[i + 3];
					sr += data[i] * a;
					sg += data[i + 1] * a;
					sb += data[i + 2] * a;
					sa += a;
					n++;
				}
			}
			const d = (y * outWidth + x) * 4;
			const alpha = sa / n;
			if (sa > 0) {
				out[d] = sr / sa;
				out[d + 1] = sg / sa;
				out[d + 2] = sb / sa;
			}
			out[d + 3] = alpha <= ALPHA_FLOOR ? 0 : alpha;
		}
	}
	return { data: out, width: outWidth, height: outHeight };
}

/**
 * 3×3 median filter (per channel) used by the "Denoising" advanced setting.
 * The original sent `removeNoise` to the server and labelled the control
 * "Denoising (For 128px and lower grid size)" — a speckle remover on the grid.
 *
 * @param {{data: Uint8ClampedArray, width: number, height: number}} grid
 * @returns {{data: Uint8ClampedArray, width: number, height: number}}
 */
export function medianFilter3x3(grid) {
	const { data, width, height } = grid;
	const out = new Uint8ClampedArray(data.length);
	const window = new Uint8Array(9);
	const mid = 4;

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			for (let c = 0; c < 4; c++) {
				let k = 0;
				for (let dy = -1; dy <= 1; dy++) {
					const sy = Math.min(height - 1, Math.max(0, y + dy));
					for (let dx = -1; dx <= 1; dx++) {
						const sx = Math.min(width - 1, Math.max(0, x + dx));
						window[k++] = data[(sy * width + sx) * 4 + c];
					}
				}
				// 9 samples → the median is the element at index 4 of a sorted window.
				window.sort();
				out[(y * width + x) * 4 + c] = window[mid];
			}
		}
	}
	return { data: out, width, height };
}

/**
 * Map every pixel of a grid onto its nearest palette entry (Euclidean distance in
 * RGB). Fully transparent pixels are left untouched.
 *
 * @param {{data: Uint8ClampedArray, width: number, height: number}} grid
 * @param {number[][]} palette array of [r, g, b]
 * @returns {{data: Uint8ClampedArray, width: number, height: number}}
 */
export function quantizeToPalette(grid, palette) {
	if (!palette || palette.length === 0) return grid;
	const { data, width, height } = grid;
	const out = new Uint8ClampedArray(data);
	/** @type {Map<number, number>} packed rgb -> palette index */
	const cache = new Map();
	const count = palette.length;

	for (let p = 0; p < width * height; p++) {
		const i = p * 4;
		if (data[i + 3] === 0) continue;
		const r = data[i];
		const g = data[i + 1];
		const b = data[i + 2];
		const key = (r << 16) | (g << 8) | b;

		let best = cache.get(key);
		if (best === undefined) {
			let bestDistance = Infinity;
			best = 0;
			for (let c = 0; c < count; c++) {
				const dr = r - palette[c][0];
				const dg = g - palette[c][1];
				const db = b - palette[c][2];
				const distance = dr * dr + dg * dg + db * db;
				if (distance < bestDistance) {
					bestDistance = distance;
					best = c;
				}
			}
			cache.set(key, best);
		}
		out[i] = palette[best][0];
		out[i + 1] = palette[best][1];
		out[i + 2] = palette[best][2];
	}
	return { data: out, width, height };
}

/**
 * Median-cut colour quantiser, used when the user turns the palette off.
 * (The original delegated this branch to the unrecoverable server; see
 * docs/TECHNICAL-NOTES.md §3.5.)
 *
 * @param {{data: Uint8ClampedArray, width: number, height: number}} grid
 * @param {number} count target colour count
 * @returns {number[][]} palette of [r, g, b]
 */
export function medianCut(grid, count = DEFAULT_COLOR_COUNT) {
	const { data, width, height } = grid;
	/** @type {number[][]} */
	const pixels = [];
	for (let p = 0; p < width * height; p++) {
		const i = p * 4;
		if (data[i + 3] === 0) continue;
		pixels.push([data[i], data[i + 1], data[i + 2]]);
	}
	if (pixels.length === 0) return [[0, 0, 0]];

	/** @type {{pixels: number[][], min: number[], max: number[]}[]} */
	let boxes = [{ pixels, ...bounds(pixels) }];

	while (boxes.length < count) {
		let target = -1;
		let targetRange = -1;
		for (let i = 0; i < boxes.length; i++) {
			const box = boxes[i];
			if (box.pixels.length < 2) continue;
			const range = Math.max(box.max[0] - box.min[0], box.max[1] - box.min[1], box.max[2] - box.min[2]);
			if (range > targetRange) {
				targetRange = range;
				target = i;
			}
		}
		if (target === -1 || targetRange <= 0) break;

		const box = boxes[target];
		const ranges = [0, 1, 2].map((c) => box.max[c] - box.min[c]);
		const channel = ranges.indexOf(Math.max(...ranges));
		const sorted = box.pixels.slice().sort((a, b) => a[channel] - b[channel]);
		const half = sorted.length >> 1;
		const left = sorted.slice(0, half);
		const right = sorted.slice(half);
		if (left.length === 0 || right.length === 0) break;

		boxes.splice(target, 1, { pixels: left, ...bounds(left) }, { pixels: right, ...bounds(right) });
	}

	return boxes.map((box) => {
		let r = 0;
		let g = 0;
		let b = 0;
		for (const p of box.pixels) {
			r += p[0];
			g += p[1];
			b += p[2];
		}
		const n = box.pixels.length;
		return [Math.round(r / n), Math.round(g / n), Math.round(b / n)];
	});
}

/**
 * @param {number[][]} pixels
 */
function bounds(pixels) {
	const min = [255, 255, 255];
	const max = [0, 0, 0];
	for (const p of pixels) {
		for (let c = 0; c < 3; c++) {
			if (p[c] < min[c]) min[c] = p[c];
			if (p[c] > max[c]) max[c] = p[c];
		}
	}
	return { min, max };
}

/**
 * Full conversion. Input is the 512px-wide RGBA buffer produced by `prepareImage()`;
 * output is the 512px-wide RGBA buffer of the pixel-art result (the shape the
 * original's `/api/computeImage` returned as `result`).
 *
 * @param {object} input
 * @param {Uint8ClampedArray} input.data RGBA bytes of the 512px-wide source
 * @param {number} input.width always 512 in the original
 * @param {number} input.height
 * @param {number} input.gridSize target pixel-grid width (32/64/128/256)
 * @param {number[][]|undefined} input.colorPalette palette to snap to, if any
 * @param {boolean} [input.removeNoise] apply the 3×3 median denoise on the grid
 * @returns {{data: Uint8ClampedArray, width: number, height: number, grid: {data: Uint8ClampedArray, width: number, height: number}, palette: number[][]}}
 */
export function computePixelArt({ data, width, height, gridSize, colorPalette, removeNoise = true }) {
	const gridWidth = Math.max(1, Math.min(MAX_GRID_SIZE, Math.round(gridSize)));
	const gridHeight = Math.max(1, Math.round((height * gridWidth) / width));

	// 1. reduce the 512px source to the selected pixel grid
	let grid = downsampleBox({ data, width, height }, gridWidth, gridHeight);

	// 2. optional speckle removal, still on the grid
	if (removeNoise) grid = medianFilter3x3(grid);

	// 3. colour reduction: explicit palette, or a generated one when palette is off
	const palette = colorPalette && colorPalette.length ? colorPalette : medianCut(grid, DEFAULT_COLOR_COUNT);
	grid = quantizeToPalette(grid, palette);

	// 4. scale the grid back up to the 512px working resolution with nearest-neighbour
	//    interpolation so the blocks stay perfectly crisp
	const result = resizeNearest(grid, width, height);

	return { data: result.data, width: result.width, height: result.height, grid, palette };
}
