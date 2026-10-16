/**
 * Web Worker around `pixelate.js`.
 *
 * The original offloaded this work to a SvelteKit server route (`POST /api/computeImage`).
 * That endpoint was never archived, so the reconstruction runs the same contract
 * locally — in a worker rather than on the main thread, which keeps the loading
 * overlay animation smooth exactly as the network round-trip used to.
 *
 * Message in:  { __id, data: Uint8ClampedArray, width, height, gridSize, colorPalette, removeNoise }
 * Message out: { __id, data: Uint8ClampedArray, width, height, palette }
 *              { __id, error: string }
 *
 * `__id` is echoed back so `processor.js` can match a reply to its request.
 */

import { computePixelArt } from './pixelate.js';

/**
 * The project's `lib` is the DOM set (SvelteKit's default) rather than the WebWorker
 * set, so `self` is typed as `Window` here. This narrow view of the dedicated worker
 * scope documents the two members actually used and keeps `postMessage` on its
 * `(message, transfer)` overload.
 *
 * @typedef {object} DedicatedScope
 * @property {(event: MessageEvent) => void} onmessage
 * @property {(message: unknown, transfer?: Transferable[]) => void} postMessage
 */

const scope = /** @type {DedicatedScope} */ (/** @type {unknown} */ (self));

scope.onmessage = (/** @type {MessageEvent} */ event) => {
	const { __id, data, width, height, gridSize, colorPalette, removeNoise } = event.data ?? {};
	try {
		const result = computePixelArt({ data, width, height, gridSize, colorPalette, removeNoise });
		scope.postMessage(
			{
				__id,
				data: result.data,
				width: result.width,
				height: result.height,
				palette: result.palette
			},
			// `result.data` is a freshly allocated buffer owned by this worker.
			[result.data.buffer]
		);
	} catch (error) {
		scope.postMessage({ __id, error: error instanceof Error ? error.message : String(error) });
	}
};
