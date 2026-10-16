/**
 * URLs for the static assets recovered from the Wayback Machine.
 *
 * Each file keeps the content hash of the original filename so it stays traceable to
 * `recovery/manifest-assets.tsv`. The original served them from
 * `/_app/immutable/assets/…`; here they live in `static/assets/…` because a fresh
 * SvelteKit build owns `_app/immutable` itself. The bytes are identical.
 *
 * The constants below mirror the asset bindings declared in the recovered page
 * bundle (`_page.svelte-e11325da.js`), which is where the original filenames came from.
 */

const base = '/assets';

export const sampleImage = `${base}/base-f8a74a87.png`;
export const samplePixelArt = `${base}/pixelart-a3439003.png`;
export const addImageIcon = `${base}/addImageIcon-e1dac575.svg`;
export const scenarioLogo = `${base}/scenarioLogo-c32c65e5.png`;
export const rightArrow = `${base}/rightArrow-2ccf02b7.svg`;
export const loadingIcon = `${base}/loadingIcon-094d3e8e.svg`;
export const loadingIconWhite = `${base}/loadingIconWhite-ef09b8f6.svg`;
export const chevronIcon = `${base}/chevronIcon-281e076b.svg`;
export const closeIcon = `${base}/closeIcon-0234a9bd.svg`;
export const discordIcon = `${base}/discordIcon-02da1f7c.svg`;
export const editIcon = `${base}/editIcon-f5978e3b.svg`;
export const eyeIcon = `${base}/eyeIcon-3322ed24.svg`;
export const paletteIcon = `${base}/paletteIcon-54f0b189.svg`;
export const trashIcon = `${base}/trashIcon-4cb27fbb.svg`;
export const trashIconWhite = `${base}/trashIconWhite-e5a01b6a.svg`;
export const checkIcon = `${base}/checkIcon-79b1ffb7.svg`;
export const plusIconWhite = `${base}/plusIconWhite-2b7dac96.svg`;
export const bgremovedSample = `${base}/bgremovedSample-a34c9af1.png`;
export const bgRemovalExample1 = `${base}/bgRemovalExample1-b9663ea3.png`;
export const bgRemovalExample2 = `${base}/bgRemovalExample2-478a9fc9.png`;
