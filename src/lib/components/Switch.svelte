<script>
	/**
	 * Recovered `Switch.svelte`.
	 *
	 * Compiled markup (from `_page.svelte-e11325da.js`, `create_fragment$3`):
	 *   <label class="switch"><input type="checkbox" /><span class="slider" /></label>
	 * and the matching rules live in `src/app.css` (originally `_page-d0ed6e48.css`,
	 * scoped as `.svelte-1fs3d2i`).
	 *
	 * The original only exposed `checked` (used with `bind:checked` from the parent
	 * component); a `change` event is added here so the control panel can stay
	 * one-directional.
	 */
	import { createEventDispatcher } from 'svelte';

	export let checked = false;

	const dispatch = createEventDispatcher();

	/** @param {Event} event */
	function onChange(event) {
		checked = /** @type {HTMLInputElement} */ (event.currentTarget).checked;
		dispatch('change', checked);
	}
</script>

<label class="switch">
	<input type="checkbox" {checked} on:change={onChange} />
	<span class="slider" />
</label>
