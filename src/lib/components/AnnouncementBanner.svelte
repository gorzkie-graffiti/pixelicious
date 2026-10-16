<script>
	/**
	 * The top announcement banner, reproduced from the 2024-10-14 HTML snapshot:
	 *
	 *   <div class="font-calistoga border-b-Light-Blue border-b text-base w-full bg-[#0A041B] …">
	 *     <div class="flex flex-row justify-between items-center w-full max-w-5xl px-4 sm:px-12">
	 *       <a href="https://www.scenario.com/" target="_blank">…logo…</a>
	 *       <a href="https://www.scenario.com/" target="_blank">Pixelicious is joining Scenario …</a>
	 *
	 * Both links were tagged `data-splitbee-event="Click Scenario"` in the original; the
	 * analytics attribute is dropped (notes §5).
	 */
	import { scenarioLogo, rightArrow } from '$lib/assets.js';
</script>

<div
	class="font-calistoga border-b-Light-Blue border-b text-base w-full bg-[#0A041B] text-Grey-White flex flex-col items-center justify-center py-4"
>
	<div class="flex flex-row justify-between items-center w-full max-w-5xl px-4 sm:px-12">
		<a
			href="https://www.scenario.com/"
			class="flex flex-row justify-center items-center"
			target="_blank"
			rel="noreferrer"
		>
			<img src={scenarioLogo} alt="Scenario logo" height="32" width="32" />
		</a>
		<a href="https://www.scenario.com/" class="flex flex-row" target="_blank" rel="noreferrer">
			Pixelicious is joining Scenario
			<img src={rightArrow} alt="Right arrow" height="16" width="16" class="flex" />
		</a>
	</div>
</div>
