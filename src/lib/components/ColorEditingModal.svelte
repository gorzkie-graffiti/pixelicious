<script>
	/**
	 * Palette colour editing modal.
	 *
	 * ── Recovered ────────────────────────────────────────────────────────────────────
	 * `instance$6` (the `ColorEditingModal` instance in the page bundle) subscribes to
	 * `colorPalette` and `currentColorPick`, keeps a `{ r, g, b }` object for the colour
	 * being edited, pushes it into `currentColorPick` whenever it changes, and dispatches
	 * `closeModal`. The modal is opened by clicking a swatch in the "Color palette"
	 * section, and by the `editIcon` button there.
	 *
	 * ── Substitution ─────────────────────────────────────────────────────────────────
	 * The colour surface itself came from the third-party `svelte-awesome-color-picker`
	 * package, whose ~30 scoped CSS rules live in the recovered `_page-d0ed6e48.css`.
	 * Re-vendoring that library would add a dependency purely for its UI, so the picker is
	 * replaced by the platform `<input type="color">` plus the recovered palette swatch
	 * grid. The state contract (`colorPalette` / `currentColorPick`, edit + close) is
	 * unchanged. See docs/TECHNICAL-NOTES.md §4.
	 */
	import { createEventDispatcher } from 'svelte';
	import { colorPalette, currentColorPick } from '$lib/stores.js';
	import { rgbToHex, hexToRgb, rgbString } from '$lib/palettes.js';
	import { BTN_LIGHT } from '$lib/classes.js';

	const dispatch = createEventDispatcher();

	/** Index of the swatch being edited. */
	let selected = 0;

	$: palette = $colorPalette;
	$: active = palette[selected] ?? [0, 0, 0];
	$: currentColorPick.set([active[0], active[1], active[2]]);

	/** @param {Event} event */
	function onColorInput(event) {
		if (palette.length === 0) return;
		const rgb = hexToRgb(/** @type {HTMLInputElement} */ (event.currentTarget).value);
		const next = palette.map((color, index) => (index === selected ? rgb : color));
		colorPalette.set(next);
	}
</script>

<div
	id="modal"
	class="flex flex-col pb-32 sm:pb-0 w-full pt-8 sm:pt-0 sm:w-auto justify-center items-center space-y-6"
>
	<p class="w-full text-center text-xl">Edit palette</p>

	{#if palette.length === 0}
		<p class="text-sm font-merriweather text-Grey max-w-xs text-center">
			There is no active palette. Pick one from the community palettes first.
		</p>
	{:else}
		<div class="flex flex-row flex-wrap justify-center items-center gap-2 max-w-[320px]">
			{#each palette as color, index}
				<button
					type="button"
					class="w-6 h-6 rounded-md border transition-all duration-200 {index === selected
						? 'border-Grey-White scale-110'
						: 'border-Light-Blue'}"
					style={`background-color: ${rgbString(color)}`}
					aria-label={`Edit colour ${index + 1}`}
					on:click={() => (selected = index)}
				></button>
			{/each}
		</div>

		<label class="flex flex-row justify-center items-center space-x-3 text-sm">
			<span>Colour {selected + 1}</span>
			<input
				class="swatch-input"
				type="color"
				value={rgbToHex(active)}
				on:input={onColorInput}
				aria-label="Pick colour"
			/>
		</label>
	{/if}

	<button class={BTN_LIGHT} on:click={() => dispatch('closeModal')}><p>Close</p></button>
</div>
