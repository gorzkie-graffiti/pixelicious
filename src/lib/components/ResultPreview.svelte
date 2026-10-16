<script>
	/**
	 * The side-by-side original / pixel-art previews.
	 *
	 * Recovered structure (`create_if_block_12` in the page bundle):
	 *
	 *   <div class="relative rounded-md overflow-hidden"><img alt="Uploaded" /></div>
	 *   <div class="relative rounded-md">
	 *     <img alt="Result" class="… z-10" />
	 *     <img alt="Result" class="… blur-lg sm:opacity-[0.12]" />      <!-- glow behind the result -->
	 *     <div class="grid grid-cols-6 grid-rows-6 …"></div>            <!-- checkerboard -->
	 *   </div>
	 *
	 * The checkerboard is filled by the recovered `se()` helper, which painted 36 cells
	 * alternating `bg-[#483E61]` / `bg-[#3A3053]`. `se()` is called from the page's
	 * `onMount`, so the checkerboard is present from the first paint — confirmed by
	 * rendering the archived snapshot in a browser, where it already sits behind the
	 * bundled sample pixel art. The result `<img>` carries `z-10`, so the checkerboard
	 * shows only through transparent pixels.
	 *
	 * (The original also re-ran `se()` after a background-removal conversion, which
	 * stacked another 36 cells. That is not reproduced.)
	 */
	import { fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { sampleImage, samplePixelArt, loadingIcon } from '$lib/assets.js';

	/** Source image data URL, or null to show the archived sample. */
	export let uploadedImage = /** @type {string|null} */ (null);
	/** Pixel-art result data URL, or null to show the archived sample. */
	export let resultImage = /** @type {string|null} */ (null);
	export let loading = false;

	$: uploadedSrc = uploadedImage ?? sampleImage;
	$: resultSrc = resultImage ?? samplePixelArt;
	$: cells = Array.from({ length: 36 }, (_, index) => index);
</script>

<div
	class="flex sm:flex-row flex-col space-y-6 sm:space-y-0 justify-center items-center sm:space-x-4 space-x-0 w-full"
>
	<div class="relative rounded-md overflow-hidden">
		<img src={uploadedSrc} alt="Uploaded" class="h-auto sm:w-[320px] w-full rounded-md" height="24" width="24" />
	</div>

	<div class="relative rounded-md">
		<img
			src={resultSrc}
			alt="Result"
			class="h-auto sm:w-[320px] w-full relative rounded-md z-10"
			height="24"
			width="24"
		/>
		<img
			src={resultSrc}
			alt="Result"
			class="h-auto sm:w-[320px] hidden sm:flex w-full absolute top-0 left-0 scale-110 sm:blur-xl blur-lg sm:opacity-[0.12] opacity-10"
			height="24"
			width="24"
		/>

		<div class="grid grid-cols-6 grid-rows-6 w-full h-full absolute top-0 left-0 rounded-md overflow-hidden">
			{#each cells as cell}
				<div class={cell % 2 === 0 ? 'bg-[#3A3053]' : 'bg-[#483E61]'}></div>
			{/each}
		</div>

		{#if loading}
			<div
				class="z-40 w-full h-full absolute top-0 left-0 bg-Deep-blue/50 backdrop-blur-xl rounded-md flex flex-col justify-center items-center"
				transition:fade={{ delay: 0, duration: 300, easing: quintOut }}
				data-testid="loading-overlay"
			>
				<img src={loadingIcon} height="24" width="24" class="animate-spin" alt="Loading icon" />
			</div>
		{/if}
	</div>
</div>
