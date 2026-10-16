<script>
	/**
	 * Recovered header row from the 2024-10-14 HTML snapshot:
	 *
	 *   <div class="flex w-full max-w-5xl flex-row px-4 sm:px-12 items-center justify-center pt-6 pb-6">
	 *     <a href="/" class="… text-[#FFF1E3] font-calistoga">
	 *       <img src="data:image/png;base64,…" alt="Logo" /> <p>Pixelicious</p>
	 *
	 * The logo stays an inline data URI, exactly as in the original.
	 */
	import { logo } from '$lib/inline-images.js';
</script>

<div class="flex w-full max-w-5xl flex-row px-4 sm:px-12 items-center justify-center pt-6 pb-6">
	<a href="/" class="flex flex-row justify-center items-center space-x-1 text-[#FFF1E3] font-calistoga">
		<img src={logo} alt="Logo" height="32" width="32" />
		<p>Pixelicious</p>
	</a>
</div>
