/**
 * Browser-side image I/O.
 *
 * These functions mirror the recovered client code from the original page bundle:
 *
 *   webpToPngBase64()          -> exact copy of the recovered helper
 *   prepareImageData()         -> the recovered `Image.load(f).resize({width: 512})`
 *   nearestResizeDataURL()     -> the recovered download-time `resize({width: 512 / X})`
 *   downloadDataURL()          -> the recovered `<a download>` click dance
 *
 * `docs/TECHNICAL-NOTES.md` §3.4 documents where this deviates from the original.
 */

import { REDIM_CONSTANT } from './pixelate.js';

/** Accepted upload MIME types — recovered from the page's `Ue()` validation. */
export const ACCEPTED_TYPES = ['image/png', 'image/webp', 'image/jpeg'];

/** Sensible guard rails for a browser tool (the original had none — see notes §3.6). */
export const MAX_FILE_BYTES = 25 * 1024 * 1024;
export const MAX_PIXELS = 40_000_000;

/**
 * Recovered verbatim from the original bundle: draw a WebP onto a canvas and hand
 * back a PNG data URL, because the server pipeline expected PNG.
 *
 * @param {string} dataURL
 * @returns {Promise<string>}
 */
export function webpToPngBase64(dataURL) {
	return new Promise((resolve) => {
		const image = document.createElement('img');
		image.src = dataURL;
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');
		image.onload = function () {
			canvas.width = image.width;
			canvas.height = image.height;
			context?.drawImage(image, 0, 0);
			const png = canvas.toDataURL('image/png');
			resolve(png);
		};
	});
}

/**
 * @param {Blob|File} file
 * @returns {Promise<string>} data URL
 */
export function readAsDataURL(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = (event) => resolve(/** @type {string} */ (event.target?.result));
		reader.onerror = () => reject(reader.error ?? new Error('Could not read the file'));
		reader.readAsDataURL(file);
	});
}

/**
 * @param {string} source data URL or URL
 * @returns {Promise<HTMLImageElement>}
 */
export function loadImageElement(source) {
	return new Promise((resolve, reject) => {
		const image = new Image();
		image.onload = () => resolve(image);
		image.onerror = () => reject(new Error(`Could not load ${source.slice(0, 64)}`));
		image.src = source;
	});
}

/**
 * The recovered normalisation step: scale the uploaded image to `REDIM_CONSTANT`
 * (512) pixels wide, leaving the height proportional. Returns raw RGBA bytes.
 *
 * @param {string} source data URL or URL
 * @returns {Promise<{data: Uint8ClampedArray, width: number, height: number, canvas: HTMLCanvasElement}>}
 */
export async function prepareImageData(source) {
	const image = await loadImageElement(source);
	const width = REDIM_CONSTANT;
	const height = Math.max(1, Math.round((image.naturalHeight * width) / image.naturalWidth));

	const canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	const context = canvas.getContext('2d', { willReadFrequently: true });
	if (!context) throw new Error('2D canvas is unavailable in this browser');

	context.imageSmoothingEnabled = true;
	context.imageSmoothingQuality = 'high';
	context.drawImage(image, 0, 0, width, height);

	const { data } = context.getImageData(0, 0, width, height);
	return { data, width, height, canvas };
}

/**
 * Encode an RGBA buffer as a PNG data URL.
 *
 * @param {{data: Uint8ClampedArray, width: number, height: number}} buffer
 * @returns {string}
 */
export function bufferToDataURL(buffer) {
	const canvas = document.createElement('canvas');
	canvas.width = buffer.width;
	canvas.height = buffer.height;
	const context = canvas.getContext('2d');
	if (!context) throw new Error('2D canvas is unavailable in this browser');
	context.putImageData(new ImageData(new Uint8ClampedArray(buffer.data), buffer.width, buffer.height), 0, 0);
	return canvas.toDataURL('image/png');
}

/**
 * Decode a PNG data URL into an RGBA buffer.
 *
 * @param {string} dataURL
 * @returns {Promise<{data: Uint8ClampedArray, width: number, height: number}>}
 */
export async function dataURLToBuffer(dataURL) {
	const image = await loadImageElement(dataURL);
	const canvas = document.createElement('canvas');
	canvas.width = image.naturalWidth;
	canvas.height = image.naturalHeight;
	const context = canvas.getContext('2d', { willReadFrequently: true });
	if (!context) throw new Error('2D canvas is unavailable in this browser');
	context.drawImage(image, 0, 0);
	const { data } = context.getImageData(0, 0, canvas.width, canvas.height);
	return { data, width: canvas.width, height: canvas.height };
}

/**
 * Nearest-neighbour resize of an encoded image, reproducing the original download
 * path (`Image.load(result).resize({ width: redimConstant / pixelSize })`, whose
 * default image-js interpolation is `nearestNeighbor`).
 *
 * @param {string} dataURL
 * @param {number} width target width in pixels
 * @returns {Promise<string>}
 */
export async function nearestResizeDataURL(dataURL, width) {
	const image = await loadImageElement(dataURL);
	const targetWidth = Math.max(1, Math.round(width));
	const targetHeight = Math.max(1, Math.round((image.naturalHeight * targetWidth) / image.naturalWidth));
	const canvas = document.createElement('canvas');
	canvas.width = targetWidth;
	canvas.height = targetHeight;
	const context = canvas.getContext('2d');
	if (!context) throw new Error('2D canvas is unavailable in this browser');
	context.imageSmoothingEnabled = false;
	context.drawImage(image, 0, 0, targetWidth, targetHeight);
	return canvas.toDataURL('image/png');
}

/**
 * Recovered download helper: build an `<a download>` pointing at the result and
 * click it.
 *
 * @param {string} href data URL or object URL
 * @param {string} filename
 */
export function downloadDataURL(href, filename) {
	const anchor = document.createElement('a');
	anchor.href = href;
	anchor.download = filename;
	document.body.appendChild(anchor);
	anchor.click();
	document.body.removeChild(anchor);
}

/**
 * Validate an upload before doing any decoding work.
 *
 * @param {File} file
 * @returns {string|null} an error message, or null when the file is acceptable
 */
export function validateFile(file) {
	if (!ACCEPTED_TYPES.includes(file.type)) {
		return 'Please upload a PNG, WEBP, or JPG image 👺';
	}
	if (file.size > MAX_FILE_BYTES) {
		return `That image is ${(file.size / (1024 * 1024)).toFixed(1)}MB — please use one under ${MAX_FILE_BYTES / (1024 * 1024)}MB`;
	}
	if (file.size === 0) {
		return 'That file appears to be empty 👺';
	}
	return null;
}

/**
 * @param {HTMLImageElement|{naturalWidth: number, naturalHeight: number}} image
 * @returns {boolean}
 */
export function isTooLarge(image) {
	return image.naturalWidth * image.naturalHeight > MAX_PIXELS;
}
