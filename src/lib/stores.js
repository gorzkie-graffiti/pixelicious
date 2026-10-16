/**
 * Svelte stores that mirror the app-level writables recovered from the original page
 * bundle:
 *
 *   const colorPalette      = writable([])
 *   const selectedColor     = writable([0, 0, 0])
 *   const currentColorPick  = writable([0, 0, 0])
 *   const userProfile       = writable()          // from chunks/checkIcon-aa2334e1.js
 *
 * `userProfile` is populated by a Supabase `profiles` query in the original
 * (`ke()`/`fe()` in the page instance). Supabase is not reachable — the public anon
 * key it shipped with belongs to a project we must not touch (notes §5) — so the
 * store keeps its recovered default of `undefined` and the account-dependent UI
 * behaves exactly as the original's signed-out state.
 */

import { writable, readable } from 'svelte/store';
import { DEFAULT_PALETTES } from './palettes.js';

/** The palette currently applied to the conversion. */
export const colorPalette = writable(/** @type {number[][]} */ ([]));

/** Recovered app-level store; kept for parity even though only `currentColorPick` is read. */
export const selectedColor = writable([0, 0, 0]);

/** Colour highlighted in the colour-editing modal. */
export const currentColorPick = writable([0, 0, 0]);

/** The 20 built-in palettes (readable, exactly as in the original). */
export const defaultPalettes = readable(DEFAULT_PALETTES);

/**
 * @typedef {object} UserProfile
 * @property {number} freeBgRemovals
 * @property {boolean} isPremium
 */

/** @type {import('svelte/store').Writable<UserProfile|undefined>} */
export const userProfile = writable(undefined);
