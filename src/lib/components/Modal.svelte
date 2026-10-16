<script>
	/**
	 * Shared modal chrome.
	 *
	 * Every full-screen modal in the recovered page was built the same way:
	 *
	 *   <div class="fixed cursor-pointer top-0 left-0 z-[60] bg-Deep-blue/80 backdrop-blur-3xl w-screen h-screen"
	 *        transition:fade={{ delay: 0, duration: 300, easing: quintOut }} />
	 *   <div class="fixed top-1/2 z-[70] left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center"
	 *        transition:scale={{ delay: 0, duration: 300, easing: quintOut }} />
	 *
	 * (`create_if_block_18`, `create_if_block_17` and `create_if_block_16` in
	 * `_page.svelte-e11325da.js`.)
	 */
	import { fade, scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { MODAL_OVERLAY, MODAL_POSITION } from '$lib/classes.js';

	export let positionClass = MODAL_POSITION;
	export let onclose = () => {};
</script>

<div
	class={MODAL_OVERLAY}
	role="presentation"
	on:click={onclose}
	on:keypress={onclose}
	transition:fade={{ delay: 0, duration: 300, easing: quintOut }}
></div>
<div class={positionClass} transition:scale={{ delay: 0, duration: 300, easing: quintOut }}>
	<slot />
</div>
