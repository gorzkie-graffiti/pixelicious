<script>
	/**
	 * Layout shell.
	 *
	 * The recovered `_layout.svelte` rendered, in order: the Scenario announcement
	 * banner, the Pixelicious header row, the routed page, the footer, and the empty
	 * `.toaster` container — exactly the order present in the 2024-10-14 HTML snapshot.
	 */
	import '../app.css';
	import AnnouncementBanner from '$lib/components/AnnouncementBanner.svelte';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import Toaster from '$lib/components/Toaster.svelte';
</script>

<div class="w-full flex flex-col justify-center items-center">
	<AnnouncementBanner />
	<SiteHeader />
	<slot />
	<SiteFooter />
	<Toaster />
</div>
