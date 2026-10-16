<script>
	/**
	 * Background-removal modal — recovered verbatim from `create_fragment$1` /
	 * `instance$1` in the page bundle.
	 *
	 * Content: "Remove the background on [Scenario logo] Scenario" / "Background removal
	 * is only available on the Scenario app." / the `bgremovedSample-a34c9af1.png`
	 * before-after example / "Go to Scenario" / close.
	 */
	import { createEventDispatcher } from 'svelte';
	import { scenarioLogo, bgremovedSample, closeIcon } from '$lib/assets.js';
	import { BTN_ORANGE, MODAL_PANEL, MODAL_CLOSE_BUTTON } from '$lib/classes.js';

	const dispatch = createEventDispatcher();
</script>

<div class={`${MODAL_PANEL} sm:min-w-[356px]`}>
	<div class="w-full space-y-8">
		<div class="flex flex-col justify-center items-center space-y-4">
			<div class="flex flex-col sm:flex-row justify-center items-center space-x-1">
				<p>Remove the background on</p>
				<span class="flex flex-row justify-center items-center space-x-1 w-fit">
					<img src={scenarioLogo} alt="Scenario logo" height="24" width="24" class="w-4 h-4" />
					<p>Scenario</p>
				</span>
			</div>
			<p class="text-sm font-merriweather text-Grey">
				Background removal is only available on the
				<a
					href="https://www.scenario.com/"
					target="_blank"
					rel="noreferrer"
					class="underline">Scenario</a
				> app.
			</p>
		</div>
		<img
			src={bgremovedSample}
			alt="BG removed sample example"
			height="64"
			width="64"
			class="w-full h-auto rounded-md"
		/>
	</div>
	<div class="w-full mt-6 space-y-3">
		<a
			href="https://www.scenario.com/"
			target="_blank"
			rel="noreferrer"
			class={BTN_ORANGE}><p>Go to Scenario</p></a
		>
	</div>
	<button class={MODAL_CLOSE_BUTTON} on:click={() => dispatch('close')} aria-label="Close">
		<img src={closeIcon} alt="Close" height="32" width="32" />
	</button>
</div>
