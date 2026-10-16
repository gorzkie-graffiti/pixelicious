<script>
	/**
	 * Pro pricing modal — recovered from `create_fragment$2` / `instance$2`.
	 *
	 * Recovered content: "Pro" pill, "Get all your asset ready to use with pixel-perfect
	 * background removal!", "~~$12~~ $8/month", the `bgRemovalExample2-478a9fc9.png`
	 * example, a "200 background removal/month" checklist row and a "Get Pro" submit
	 * button inside `<form action="/api/stripe/payment" method="POST">`.
	 *
	 * In the original this modal only appeared when `/api/computeImage` answered
	 * `"Non authorized without a premium account"`, and the form handed off to a Stripe
	 * Checkout session created server-side. Neither endpoint exists here, so the form is
	 * kept for its visuals but intercepts submit and emits `unavailable` instead of
	 * pretending a payment flow works (see docs/TECHNICAL-NOTES.md §5).
	 */
	import { createEventDispatcher } from 'svelte';
	import { slide, scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { bgRemovalExample2, checkIcon } from '$lib/assets.js';

	const dispatch = createEventDispatcher();
</script>

<div class="flex flex-col items-center w-full justify-center px-4">
	<div
		class="bg-Medium-Blue w-full p-6 space-y-6 overflow-hidden max-w-[450px] border border-Light-Blue font-calistoga text-center text-Grey-White rounded-md justify-center items-center flex flex-col z-[100]"
		transition:scale={{ delay: 0, duration: 300, easing: quintOut }}
	>
		<div class="flex flex-col justify-center items-center space-y-4 max-w-xs text-center">
			<p class="px-4 py-2 rounded-md border border-Orange">Pro</p>
			<p class="text-Grey">Get all your asset ready to use with pixel-perfect background removal!</p>
		</div>
		<p class="text-4xl">
			<span class="line-through mr-2 text-Grey text-xl">$12</span>$8<span class="text-sm">/month</span>
		</p>
		<div class="flex flex-col space-y-6 items-center justify-center max-w-lg w-full">
			<div class="flex flex-col space-y-4 items-center justify-center">
				<img src={bgRemovalExample2} alt="Example of background removal" height="24" width="24" class="w-full" />
			</div>
			<div
				class="flex flex-col space-y-2 font-merriweather w-full"
				transition:slide={{ delay: 200, duration: 500, easing: quintOut }}
			>
				<div class="flex flex-row justify-start items-center space-x-2">
					<img src={checkIcon} alt="Check icon" />
					<p class="text-Grey text-sm">200 background removal/month</p>
				</div>
			</div>
		</div>
		<form
			class="w-full"
			action="/api/stripe/payment"
			method="POST"
			on:submit|preventDefault={() => dispatch('unavailable')}
		>
			<button
				type="submit"
				class="shadow-[0px_4px_0px_rgba(167,26,1,1)] w-full disabled:cursor-not-allowed hover:bg-[#EC5B41] active:shadow-[0px_0px_0px_rgba(167,26,1,1)] active:translate-y-1 transition-all duration-200 flex flex-col justify-center items-center px-10 py-3 z-10 bg-Orange rounded-md"
			>
				<p>Get Pro</p>
			</button>
		</form>
	</div>
</div>
