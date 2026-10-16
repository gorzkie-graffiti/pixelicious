/**
 * Toast notifications.
 *
 * The original used `svelte-french-toast` (`chunks/toast-e4c2af5c.js`) and called
 * `toast.error(message, { style })` with an inline style string. The toast store here
 * keeps the same public surface (`toast.error`) and the exact messages/styles
 * recovered from the page bundle, but swaps the library for ~40 lines of local state
 * to keep the dependency list minimal (notes §5).
 *
 * Recovered messages:
 *   'Please upload an image 👺'
 *   'Please upload a PNG, WEBP, or JPG image 👺'
 *   'Total usage limit reached this month, contact us for more usage'
 *   'Server error :/'
 */

import { writable } from 'svelte/store';

/** Dangerously-permissive inline style string, kept as an object so it can be applied directly. */
export const TOAST_STYLE = {
	border: '1px solid #483E66',
	'font-size': '14px',
	padding: '16px',
	color: '#F9F9FB',
	'background-color': '#1F143D',
	'border-radius': '16px',
	"font-family": "'merriweather', sans-serif"
};

/** Variant used by the two "server" toasts, which were set in Calistoga. */
export const TOAST_STYLE_CALISTOGA = {
	...TOAST_STYLE,
	"font-family": "'calistoga', sans-serif"
};

/** Recovered library default: 4000ms for error toasts. */
const ERROR_DURATION = 4000;

/**
 * @typedef {object} Toast
 * @property {string} id
 * @property {string} message
 * @property {Record<string, string>} style
 * @property {boolean} visible
 */

/** @type {import('svelte/store').Writable<Toast[]>} */
export const toasts = writable([]);

let counter = 0;

/**
 * @param {string} message
 * @param {{ style?: Record<string, string>, duration?: number }} [options]
 * @returns {string} the toast id
 */
function push(message, options = {}) {
	const id = `toast-${++counter}`;
	/** @type {Toast} */
	const toast = {
		id,
		message,
		style: options.style ?? TOAST_STYLE,
		visible: true
	};
	toasts.update((current) => [toast, ...current].slice(0, 20));
	const duration = options.duration ?? ERROR_DURATION;
	if (Number.isFinite(duration)) {
		setTimeout(() => dismiss(id), duration);
	}
	return id;
}

/** @param {string} id */
export function dismiss(id) {
	toasts.update((current) => current.map((t) => (t.id === id ? { ...t, visible: false } : t)));
	setTimeout(() => {
		toasts.update((current) => current.filter((t) => t.id !== id));
	}, 400);
}

export const toast = {
	error: push,
	blank: push,
	/**
	 * @param {string} message
	 * @param {{ style?: Record<string, string>, duration?: number }} [options]
	 */
	success: (message, options) => push(message, { duration: 2000, ...options }),
	dismiss
};
