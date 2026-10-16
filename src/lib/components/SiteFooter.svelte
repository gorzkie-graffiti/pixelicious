<script>
	/**
	 * Footer, reproduced from the 2024-10-14 HTML snapshot:
	 *
	 *   Scenario  (Poppins, 16px, Scenario logo)
	 *   Made by Hugo   -> https://www.hugoduprez.com/
	 *   Terms & Conditions -> https://www.scenario.com/terms-and-conditions
	 */
	import { scenarioLogo } from '$lib/assets.js';
</script>

<div
	class="flex flex-col px-4 w-full pt-10 pb-6 text-Grey justify-center items-center space-y-6 text-sm font-merriweather"
>
	<div class="flex flex-col justify-center items-center space-y-6">
		<a
			href="https://www.scenario.com/"
			target="_blank"
			rel="noreferrer"
			style="font-family: Poppins;"
			class="flex flex-row justify-center text-base text-Grey-White font-medium items-center space-x-2"
		>
			<img src={scenarioLogo} alt="Svelte logo" height="24" width="24" />
			<p>Scenario</p>
		</a>
		<p>
			Made by <a class="underline" target="_blank" rel="noreferrer" href="https://www.hugoduprez.com/">Hugo</a>
		</p>
	</div>
	<p class="text-xs">
		<a href="https://www.scenario.com/terms-and-conditions" target="_blank" rel="noreferrer">
			Terms &amp; Conditions
		</a>
	</p>
</div>
