<script>
	/**
	 * "Real size preview" modal — recovered in full from `create_fragment$4` / `instance$4`.
	 *
	 * The original computed the preview by loading the result and resizing it to the
	 * selected grid width with image-js' default nearest-neighbour interpolation:
	 *
	 *   const F = (await Image.load(resultImage)).resize({ width: gridSize });
	 *   preview = F.toDataURL();
	 *
	 * The reconstruction does the same through a canvas with smoothing disabled.
	 */
	import { onMount, createEventDispatcher } from 'svelte';
	import { slide, scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { closeIcon } from '$lib/assets.js';
	import { nearestResizeDataURL } from '$lib/image.js';
	import { MODAL_PANEL, MODAL_CLOSE_BUTTON } from '$lib/classes.js';

	export let resultImage = '';
	export let gridSize = 256;

	const dispatch = createEventDispatcher();
	let preview = '';

	/** @param {number} width */
	async function buildPreview(width) {
		if (!resultImage) return;
		preview = await nearestResizeDataURL(resultImage, width);
	}

	onMount(() => {
		buildPreview(gridSize);
	});

	$: if (resultImage) buildPreview(gridSize);
</script>

<div class={MODAL_PANEL}>
	<div class="w-full space-y-6">
		<p>Real size preview</p>
		<p class="text-sm font-merriweather text-Grey" transition:slide={{ delay: 400, duration: 300, easing: quintOut }}>
			{gridSize} px width
		</p>
	</div>
	<div
		class="w-fit mt-2 space-y-3"
		transition:scale={{ delay: 200, duration: 300, easing: quintOut }}
	>
		<div class="flex flex-row w-full items-center justify-between">
			<div class="h-3 w-[2px] rounded-md flex bg-Grey-Dark"></div>
			<div class="h-[2px] w-full flex bg-Grey-Dark"></div>
			<div class="h-3 w-[2px] rounded-md flex bg-Grey-Dark"></div>
		</div>
		<img src={preview} alt="Preview" width="24" height="24" class="flex flex-col w-fit max-w-5xl pixelated" />
	</div>
	<button class={MODAL_CLOSE_BUTTON} on:click={() => dispatch('close')} aria-label="Close preview">
		<img src={closeIcon} alt="Close" height="32" width="32" />
	</button>
</div>
