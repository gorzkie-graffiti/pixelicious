<script>
	/**
	 * Toast container.
	 *
	 * The original's DOM had exactly `<div class="toaster svelte-jyff3d"></div>` (recovered
	 * from the 2024-10-14 HTML snapshot) and `svelte-french-toast` injected the stack into
	 * it. The container class comes from `_layout-1ebb0720.css`; the per-toast styling is
	 * the inline `style` string the page passed to `toast.error(…)`.
	 */
	import { toasts, dismiss } from '$lib/toast.js';

	/** @param {Record<string, string>} style */
	function css(style) {
		return Object.entries(style)
			.map(([key, value]) => `${key}: ${value}`)
			.join('; ');
	}
</script>

<div class="toaster">
	{#each $toasts as toast (toast.id)}
		<div data-toast data-visible={toast.visible} role="status" aria-live="polite">
			<div
				class="toast-bar cursor-pointer"
				role="button"
				tabindex="0"
				style={css(toast.style)}
				on:click={() => dismiss(toast.id)}
				on:keydown|preventDefault={() => dismiss(toast.id)}
				title="Dismiss"
			>
				{toast.message}
			</div>
		</div>
	{/each}
</div>
