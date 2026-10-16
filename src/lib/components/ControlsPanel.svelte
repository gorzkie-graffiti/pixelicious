<script>
	/**
	 * The controls column that appears once an image is loaded.
	 *
	 * Recovered from `create_if_block_3`, `create_if_block_10`, `create_if_block_5`,
	 * `create_if_block_9/8/7/6`, `create_if_block_4` and `create_if_block_11` in
	 * `_page.svelte-e11325da.js`. Section headings and copy are verbatim:
	 *
	 *   "Remove background ✨"   (Switch -> removeBackground)
	 *   "Color palette"          (collapsible; swatches + edit/palette/trash + "Use this palette")
	 *   "Pixel grid size"        (collapsible; 32px / 64px / 128px / 256px)
	 *   "Advanced settings"      (collapsible; "Denoising (For 128px and lower grid size)")
	 *   "Generate"
	 *
	 * Every collapsible body animated with `slide(200ms, quintOut)` in the original and
	 * the selected grid button keeps its inset glow, which is reproduced here.
	 */
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import Switch from './Switch.svelte';
	import { chevronIcon, editIcon, paletteIcon, trashIcon } from '$lib/assets.js';
	import { rgbString } from '$lib/palettes.js';
	import { BTN_LIGHT, BTN_LIGHT_ACTIVE, BTN_LIGHT_LABEL, CHEVRON_CLOSED, CHEVRON_OPEN } from '$lib/classes.js';

	/** Selected pixel-grid width. */
	export let gridSize = 256;
	/** Advanced setting: 3x3 median denoise on the grid. */
	export let removeNoise = true;
	/** Requests background removal (opens the Scenario upsell on Generate). */
	export let removeBackground = false;
	/** "Use this palette" checkbox. */
	export let usePalette = true;
	/** Active palette colours. */
	export let palette = /** @type {number[][]} */ ([]);
	/** While a conversion is running every control is disabled (recovered: E[3]). */
	export let loading = false;

	const dispatch = createEventDispatcher();
	const GRID_SIZES = [32, 64, 128, 256];

	let paletteOpen = false;
	let gridOpen = false;
	let advancedOpen = false;
</script>

<div class="flex flex-col space-y-6 w-full items-center sm:max-w-xs justify-center mt-10">
	<!-- Remove background ✨ -->
	<div class="flex flex-col justify-center items-start w-full space-y-2">
		<div id="removeBackgroudSetting" class="flex flex-row justify-between w-full items-center">
			<p>Remove background ✨</p>
			<div class="flex flex-row justify-center items-center space-x-2">
				<Switch
					checked={removeBackground}
					on:change={(event) => dispatch('toggleBackground', event.detail)}
				/>
			</div>
		</div>
	</div>

	<!-- Color palette -->
	<div class="flex flex-col justify-center w-full items-start space-y-4">
		<div
			class="flex cursor-pointer w-full flex-row justify-between items-center"
			role="button"
			tabindex="0"
			on:click={() => (paletteOpen = !paletteOpen)}
			on:keydown|preventDefault={() => (paletteOpen = !paletteOpen)}
		>
			<p>Color palette</p>
			<img src={chevronIcon} alt="Chevron" class={paletteOpen ? CHEVRON_OPEN : CHEVRON_CLOSED} />
		</div>

		{#if paletteOpen}
			<div
				class="flex flex-col justify-center p-3 border border-Light-Blue bg-Medium-Blue rounded-md items-center w-full space-y-2"
				transition:slide={{ delay: 0, duration: 200, easing: quintOut }}
			>
				<div class="flex flex-col justify-center space-y-4 items-start w-full">
					<div class="flex flex-row justify-between items-start w-full">
						<div class="grid grid-cols-8 gap-0 items-center justify-center">
							{#each palette as color, index (index)}
								<button
									type="button"
									class="h-5 w-5 sm:hover:scale-125 sm:hover:z-40 transition-all duration-200 relative flex flex-col justify-center items-center cursor-pointer"
									style={`background-color: rgba(${color[0]},${color[1]},${color[2]},1)`}
									aria-label={`Edit colour ${index + 1}`}
									on:click={() => dispatch('swatchClick', index)}
								></button>
							{/each}
						</div>
						<div class="flex flex-row justify-center items-center space-x-2">
							<button type="button" on:click={() => dispatch('editPalette')} aria-label="Edit palette">
								<img src={editIcon} alt="Edit" height="24" width="24" />
							</button>
							<button
								type="button"
								on:click={() => dispatch('communityPalettes')}
								aria-label="Community palettes"
							>
								<img src={paletteIcon} alt="Palette" height="24" width="24" />
							</button>
							<button type="button" on:click={() => dispatch('clearPalette')} aria-label="Clear palette">
								<img src={trashIcon} alt="Trash" height="24" width="24" />
							</button>
						</div>
					</div>
				</div>

				{#if palette.length > 0}
					<div class="flex flex-col justify-center items-start w-full">
						<label class="flex flex-row text-sm justify-center items-center space-x-2">
							<input
								type="checkbox"
								checked={usePalette}
								on:change={(event) => dispatch('toggleUsePalette', event.currentTarget.checked)}
							/>
							<p>Use this palette</p>
						</label>
					</div>
				{/if}
			</div>
		{/if}
	</div>

	<!-- Pixel grid size -->
	<div class="flex flex-col justify-center items-center w-full space-y-4">
		<div
			class="flex cursor-pointer w-full flex-row justify-between items-center"
			role="button"
			tabindex="0"
			on:click={() => (gridOpen = !gridOpen)}
			on:keydown|preventDefault={() => (gridOpen = !gridOpen)}
		>
			<p>Pixel grid size</p>
			<img src={chevronIcon} alt="Chevron" class={gridOpen ? CHEVRON_OPEN : CHEVRON_CLOSED} />
		</div>

		{#if gridOpen}
			<div
				class="grid grid-cols-2 gap-3 justify-center items-center w-full"
				transition:slide={{ delay: 0, duration: 200, easing: quintOut }}
			>
				{#each GRID_SIZES as size}
					<button
						type="button"
						class={gridSize === size ? BTN_LIGHT_ACTIVE : BTN_LIGHT}
						disabled={loading}
						on:click={() => dispatch('gridsize', size)}
					>
						<p class={gridSize === size ? 'z-10' : BTN_LIGHT_LABEL}>{size}px</p>
						{#if gridSize === size}
							<div
								class="w-16 h-6 rounded-[50%] blur-lg bg-[#7E6AB3] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
							></div>
						{/if}
					</button>
				{/each}
			</div>
		{/if}
	</div>

	<!-- Advanced settings -->
	<div class="flex flex-col justify-center items-center w-full space-y-4">
		<div
			class="flex cursor-pointer w-full flex-row justify-between items-center"
			role="button"
			tabindex="0"
			on:click={() => (advancedOpen = !advancedOpen)}
			on:keydown|preventDefault={() => (advancedOpen = !advancedOpen)}
		>
			<p>Advanced settings</p>
			<img src={chevronIcon} alt="Chevron" class={advancedOpen ? CHEVRON_OPEN : CHEVRON_CLOSED} />
		</div>

		{#if advancedOpen}
			<div
				class="flex flex-col justify-center items-start w-full"
				transition:slide={{ delay: 0, duration: 200, easing: quintOut }}
			>
				<div
					class="flex flex-row text-Grey text-sm justify-between w-full items-center space-x-2"
				>
					<p>Denoising (For 128px and lower grid size)</p>
					<Switch checked={removeNoise} on:change={(event) => dispatch('toggleNoise', event.detail)} />
				</div>
			</div>
		{/if}
	</div>
</div>

<div class="flex flex-col justify-center items-center w-full space-y-3">
	<button
		type="button"
		class={`${BTN_LIGHT} mt-8 sm:max-w-xs`}
		disabled={loading}
		on:click={() => dispatch('generate')}><p>Generate</p></button
	>
</div>
