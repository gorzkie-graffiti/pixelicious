<script>
	/**
	 * The dashed upload zone, reproduced from the 2024-10-14 HTML snapshot:
	 *
	 *   <div class="flex text-center relative flex-col justify-center items-center mt-14 w-full max-w-[656px] h-60">
	 *     <input id="file" type="file" aria-hidden="true" placeholder="Upload an image" class="hidden" />
	 *     <label class="cursor-pointer …border-dashed border-Light-Blue rounded-md" for="file"></label>
	 *     <div class="absolute … pointer-events-none">addImageIcon + "Click here or drag your image to start!"</div>
	 *     <img src={snowyDirectionIllustrationPixelArt} class="absolute -top-[40px] right-2" />
	 *
	 * The recovered drop handlers toggled `bg-Medium-Blue` -> `bg-[#251849]` by mutating
	 * `event.target.classList` directly. The reconstruction applies the same two class
	 * strings through a `dragging` flag, which is behaviourally identical but survives
	 * Svelte re-renders (the original could lose the highlight when a child element
	 * became the event target).
	 */
	import { createEventDispatcher } from 'svelte';
	import { addImageIcon } from '$lib/assets.js';
	import { snowyDirectionIllustrationPixelArt } from '$lib/inline-images.js';
	import { UPLOAD_IDLE, UPLOAD_DRAG } from '$lib/classes.js';

	const dispatch = createEventDispatcher();
	/** @type {HTMLInputElement} */
	let input;
	let dragging = false;

	/**
	 * @param {DragEvent} event
	 */
	function onDrop(event) {
		dragging = false;
		const file = event.dataTransfer?.files?.[0];
		if (file) dispatch('file', file);
	}

	/** @param {Event} event */
	function onChange(event) {
		const file = /** @type {HTMLInputElement} */ (event.currentTarget).files?.[0];
		if (file) dispatch('file', file);
		// Reset so re-selecting the same file still fires `change`.
		input.value = '';
	}

	/** @param {DragEvent} event */
	function onDragOver(event) {
		if (event.dataTransfer) event.dataTransfer.dropEffect = 'copy';
	}
</script>

<div
	class="flex text-center relative flex-col justify-center items-center mt-14 w-full max-w-[656px] h-60"
	role="group"
	aria-label="Image drop zone"
	on:dragleave={() => (dragging = false)}
	on:dragenter|preventDefault={() => (dragging = true)}
	on:dragover|preventDefault={onDragOver}
	on:drop|preventDefault|stopPropagation={onDrop}
>
	<input
		bind:this={input}
		id="file"
		type="file"
		accept="image/png,image/webp,image/jpeg"
		aria-hidden="true"
		placeholder="Upload an image"
		class="hidden"
		on:change={onChange}
	/>
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label class={dragging ? UPLOAD_DRAG : UPLOAD_IDLE} for="file"></label>
	<div
		class="absolute top-1/2 left-1/2 -translate-x-1/2 sm:space-x-2 space-x-0 space-y-2 sm:space-y-0 flex flex-col sm:flex-row justify-center items-center -translate-y-1/2 text-Grey pointer-events-none"
	>
		<img src={addImageIcon} alt="Add file" height="24" width="24" />
		<p>Click here or drag your image to start!</p>
	</div>
	<img
		src={snowyDirectionIllustrationPixelArt}
		class="absolute -top-[40px] right-2"
		height="48"
		width="48"
		alt="Snowy direction!"
	/>
</div>
