<script>
	/**
	 * "Community palettes" modal — recovered from `create_fragment$5` / `instance$5`.
	 *
	 * This is the modal the palette icon opens, and it is where all 20 recovered
	 * `defaultPalettes` are listed. The recovered instance subscribed to
	 * `defaultPalettes`, deep-cloned the array on mount, and on click did:
	 *
	 *   set_store_value(colorPalette, palette, palette);
	 *   dispatch('checkPalette');
	 *   if (window.innerWidth < 768) dispatch('closeModal');
	 *
	 * Structure note: the original nested a `<button>Use</button>` inside the card
	 * `<button>`, which is invalid HTML. The inner element is a `<div>` here so the
	 * markup validates; its classes (including `group-hover:bg-[#4E3E79]`) are unchanged.
	 */
	import { createEventDispatcher } from 'svelte';
	import { colorPalette } from '$lib/stores.js';
	import { rgbString } from '$lib/palettes.js';
	import { BTN_LIGHT } from '$lib/classes.js';

	/** @type {number[][][]} */
	export let palettes = [];

	const dispatch = createEventDispatcher();

	/** @param {number[][]} palette */
	function use(palette) {
		colorPalette.set(JSON.parse(JSON.stringify(palette)));
		dispatch('checkPalette');
		if (typeof window !== 'undefined' && window.innerWidth < 768) dispatch('closeModal');
	}
</script>

<div
	id="modal"
	class="flex flex-col pb-32 sm:pb-0 w-full pt-8 sm:pt-0 sm:w-auto justify-center items-center space-y-6"
>
	<p class="w-full text-center text-xl">Community palettes</p>
	<div class="flex flex-col space-y-6 w-full">
		{#each palettes as palette, index (index)}
			<button
				type="button"
				class="group cursor-pointer flex flex-col rounded-md overflow-hidden justify-center items-center sm:w-56 w-full shadow-[0px_4px_0px_rgba(47,30,92,1)] relative disabled:cursor-not-allowed active:shadow-[0px_0px_0px_rgba(47,30,92,1)] active:translate-y-1 transition-all duration-200 z-10"
				on:click={() => use(palette)}
				title={`Use palette ${index + 1} (${palette.length} colours)`}
			>
				<div class="flex flex-row w-full overflow-hidden">
					{#each palette as color}
						<div class="w-full h-10 flex flex-col" style={`background-color: ${rgbString(color)}`}></div>
					{/each}
				</div>
				<div
					class="w-full relative disabled:cursor-not-allowed hover:bg-[#4E3E79] group-hover:bg-[#4E3E79] transition-all duration-200 flex flex-row space-x-2 justify-center items-center px-6 py-3 z-10 bg-Light-Blue rounded-t-none"
				>
					<p>Use</p>
				</div>
			</button>
		{/each}
	</div>
	<button class={BTN_LIGHT} on:click={() => dispatch('closeModal')}><p>Close</p></button>
</div>
