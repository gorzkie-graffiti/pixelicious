/**
 * Client-side replacement for the original `POST /api/computeImage` call.
 *
 * The original page did:
 *
 *   const response = await fetch('/api/computeImage', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({ image, gridSize, colorPalette, removeNoise, removeBackground })
 *   });
 *   const { result } = await response.json();     // a 512px-wide PNG data URL
 *
 * `removeBackground` never reached the computation: the page short-circuited and
 * opened the background-removal modal instead (see `+page.svelte`). It is accepted
 * here and ignored, so the call site stays identical to the recovered code.
 */

import { REDIM_CONSTANT } from './pixelate.js';
import { bufferToDataURL, dataURLToBuffer, nearestResizeDataURL } from './image.js';

/**
 * @typedef {object} ComputeRequest
 * @property {string} image PNG data URL, 512px wide
 * @property {number} gridSize target pixel-grid width
 * @property {number[][]|undefined} [colorPalette]
 * @property {boolean} [removeNoise]
 * @property {boolean} [removeBackground] accepted for contract parity, never used
 */

/**
 * @typedef {object} ComputeOk
 * @property {string} result 512px-wide PNG data URL of the pixel art
 * @property {number[][]} palette the palette actually used
 */

export class ComputeError extends Error {
	/**
	 * @param {string} message
	 * @param {number} status mirrors the HTTP status the original API would have used
	 */
	constructor(message, status = 500) {
		super(message);
		this.name = 'ComputeError';
		this.status = status;
	}
}

/** @type {Worker|null} */
let worker = null;
let requestId = 0;
/** @type {Map<number, {resolve: (value: any) => void, reject: (reason: any) => void}>} */
const pending = new Map();

/** @returns {Worker} */
function getWorker() {
	if (worker) return worker;
	const instance = new Worker(new URL('./pixelate.worker.js', import.meta.url), { type: 'module' });
	instance.onmessage = (event) => {
		const { __id, ...payload } = event.data;
		const entry = pending.get(__id);
		if (!entry) return;
		pending.delete(__id);
		if (payload.error) entry.reject(new ComputeError(payload.error, 400));
		else entry.resolve(payload);
	};
	instance.onerror = (event) => {
		const error = new ComputeError(event.message || 'Image processing worker failed', 500);
		for (const entry of pending.values()) entry.reject(error);
		pending.clear();
		instance.terminate();
		worker = null;
	};
	worker = instance;
	return instance;
}

/**
 * Run the conversion off the main thread.
 *
 * @param {ComputeRequest} request
 * @returns {Promise<ComputeOk>}
 */
export async function computeImageRemote(request) {
	if (typeof Worker === 'undefined') {
		return computeImageInline(request);
	}
	const source = await dataURLToBuffer(request.image);
	if (source.width !== REDIM_CONSTANT) {
		throw new ComputeError('Image must be normalised to 512px before processing', 400);
	}

	const id = ++requestId;
	const instance = getWorker();
	return new Promise((resolve, reject) => {
		pending.set(id, { resolve, reject });
		instance.postMessage(
			{
				__id: id,
				data: source.data,
				width: source.width,
				height: source.height,
				gridSize: request.gridSize,
				colorPalette: request.colorPalette,
				removeNoise: request.removeNoise !== false
			},
			[source.data.buffer]
		);
	}).then((/** @type {any} */ payload) => ({
		result: bufferToDataURL({ data: payload.data, width: payload.width, height: payload.height }),
		palette: payload.palette
	}));
}

/**
 * Fallback for environments without Web Workers.
 *
 * @param {ComputeRequest} request
 * @returns {Promise<ComputeOk>}
 */
async function computeImageInline(request) {
	const { computePixelArt } = await import('./pixelate.js');
	const source = await dataURLToBuffer(request.image);
	const result = computePixelArt({
		data: source.data,
		width: source.width,
		height: source.height,
		gridSize: request.gridSize,
		colorPalette: request.colorPalette,
		removeNoise: request.removeNoise !== false
	});
	return { result: bufferToDataURL(result), palette: result.palette };
}

/**
 * Download-time downscale, reproducing `Image.load(result).resize({ width: 512 / pixelSize })`
 * from the recovered "Reduce size" branch.
 *
 * @param {string} resultDataURL
 * @param {number} pixelSizeMultiplier
 * @returns {Promise<string>}
 */
export function reduceForDownload(resultDataURL, pixelSizeMultiplier) {
	return nearestResizeDataURL(resultDataURL, REDIM_CONSTANT / pixelSizeMultiplier);
}
