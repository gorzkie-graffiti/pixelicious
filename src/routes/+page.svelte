<script>
	/**
	 * Main page — the reconstruction of `pages/_page.svelte`.
	 *
	 * The recovered component kept all state in one instance and drove everything from
	 * it; this page does the same. The state variables below keep the original's letter
	 * for letter mapping (from `instance()` in `_page.svelte-e11325da.js`) so the two can
	 * be read side by side:
	 *
	 *   F  colorEditingModal        K  removeBackground      B  uploadedImage
	 *   P  loading                  O  resultImage           L  communityPalettesModal
	 *   U  previewModal             z  bgRemovalModal         V  pricingModal
	 *   X  pixelSize (512/gridSize) G  gridSize              q  usePalette
	 *   Q  reduceSize               J  removeNoise           Z  baseName
	 *
	 * Two behaviours are deliberately different from the original and are called out in
	 * docs/TECHNICAL-NOTES.md §4: the Download button is disabled when there is no result
	 * (the original silently downloaded the bundled sample image), and the banner uses a
	 * CSS keyframe animation instead of `anime.js`.
	 */
	import { onMount } from 'svelte';
	import { colorPalette, currentColorPick, defaultPalettes } from '$lib/stores.js';
	import { toast } from '$lib/toast.js';
	import { DEFAULT_PALETTE_INDEX } from '$lib/palettes.js';
	import { bannerColors } from '$lib/palettes.js';
	import {
		downloadDataURL,
		prepareImageData,
		readAsDataURL,
		validateFile,
		webpToPngBase64,
		MAX_PIXELS
	} from '$lib/image.js';
	import { computeImageRemote, reduceForDownload } from '$lib/processor.js';
	import { defaultGridSize, pixelSizeMultiplier } from '$lib/pixelate.js';
	import { discordIcon, loadingIconWhite, eyeIcon } from '$lib/assets.js';
	import { BTN_ORANGE, DRAWER_CLOSED, DRAWER_OPEN } from '$lib/classes.js';
	import UploadZone from '$lib/components/UploadZone.svelte';
	import ResultPreview from '$lib/components/ResultPreview.svelte';
	import ControlsPanel from '$lib/components/ControlsPanel.svelte';
	import Switch from '$lib/components/Switch.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import PreviewModal from '$lib/components/PreviewModal.svelte';
	import BgRemovalModal from '$lib/components/BgRemovalModal.svelte';
	import PricingModal from '$lib/components/PricingModal.svelte';
	import ColorEditingModal from '$lib/components/ColorEditingModal.svelte';
	import CommunityPalettesModal from '$lib/components/CommunityPalettesModal.svelte';

	/** Recovered banner letters, each with its own `char-N` class. */
	const bannerChars = ['b', 'a', 'c', 'k', 'g', 'r', 'o', 'u', 'n', 'd'];

	// ── state ────────────────────────────────────────────────────────────────────
	let colorEditingModal = false;
	let removeBackground = false;
	let uploadedImage = /** @type {string|null} */ (null);
	let loading = false;
	let resultImage = /** @type {string|null} */ (null);
	let communityPalettesModal = false;
	let previewModal = false;
	let bgRemovalModal = false;
	let pricingModal = false;
	let gridSize = 256;
	let usePalette = true;
	let reduceSize = false;
	let removeNoise = true;
	let baseName = '';

	/** The palette applied on upload — a deep copy of `defaultPalettes[4]`, as recovered. */
	const initialPalette = JSON.parse(JSON.stringify($defaultPalettes[DEFAULT_PALETTE_INDEX]));

	/** Inline toast style the recovered code used for the two "server" toasts (Calistoga). */
	const CALISTOGA_TOAST = {
		border: '1px solid #483E66',
		'font-size': '14px',
		padding: '16px',
		color: '#F9F9FB',
		'background-color': '#1F143D',
		'border-radius': '16px',
		"font-family": "'calistoga', sans-serif"
	};

	$: pixelSize = pixelSizeMultiplier(gridSize);

	// ── mount-time work (recovered `onMount`) ────────────────────────────────────
	onMount(() => {
		colorPalette.set(JSON.parse(JSON.stringify(initialPalette)));
		animateBanner();
	});

	/**
	 * The original used anime.js to give each banner letter a random light colour from
	 * `defaultPalettes[7]` and a looping translate/rotate wobble with a 200ms stagger.
	 * The same effect is produced here with a CSS keyframe animation.
	 */
	function animateBanner() {
		const palette = bannerColors();
		if (palette.length === 0) return;
		bannerChars.forEach((_, index) => {
			const element = document.querySelector(`.char-${index}`);
			if (!element || !(element instanceof HTMLElement)) return;
			const color = palette[Math.floor(Math.random() * palette.length)];
			element.style.color = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
			element.classList.add('char-anim');
			element.style.animationDelay = `${index * 200}ms`;
		});
	}

	/** Recovered `scrollOnTop()`. */
	function scrollOnTop() {
		const element = document.getElementById('modal');
		if (element) element.scrollTop = 0;
	}

	// ── upload ───────────────────────────────────────────────────────────────────
	/**
	 * Recovered `Ue(file)`: validate, reset the per-image settings, decode, pick a
	 * default grid size and immediately run a first conversion with the default palette.
	 *
	 * @param {File} file
	 */
	async function handleFile(file) {
		const problem = validateFile(file);
		if (problem) {
			toast.error(problem);
			return;
		}

		removeNoise = true;
		removeBackground = false;
		usePalette = true;
		resultImage = null;

		baseName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;

		let dataURL;
		try {
			dataURL = await readAsDataURL(file);
		} catch (error) {
			toast.error(error instanceof Error ? error.message : 'Could not read that file 👺');
			return;
		}

		let source = dataURL;
		try {
			const response = await fetch(dataURL);
			if (response.headers.get('Content-Type') === 'image/webp') {
				source = await webpToPngBase64(dataURL);
			}
		} catch {
			// `fetch()` failing on a huge data URL is not fatal — fall through with the original.
		}

		uploadedImage = source;

		const dimensions = await measure(source);
		if (!dimensions) {
			toast.error('That image could not be decoded 👺');
			uploadedImage = null;
			return;
		}
		if (dimensions.width * dimensions.height > MAX_PIXELS) {
			toast.error('That image is too large to process in the browser 👺');
			uploadedImage = null;
			return;
		}

		// Recovered `ue()`: pick the default grid width from the image area.
		gridSize = defaultGridSize(dimensions.width, dimensions.height);

		// Recovered: the first conversion runs automatically with the default palette.
		await convert(JSON.parse(JSON.stringify(initialPalette)));
	}

	/**
	 * @param {string} source
	 * @returns {Promise<{width: number, height: number}|null>}
	 */
	function measure(source) {
		return new Promise((resolve) => {
			const image = new Image();
			image.onload = () => resolve({ width: image.naturalWidth, height: image.naturalHeight });
			image.onerror = () => resolve(null);
			image.src = source;
		});
	}

	/**
	 * Recovered `Ce()` + `ke()`.
	 *
	 * @param {number[][]|undefined} [paletteOverride] palette to use instead of the store
	 */
	async function convert(paletteOverride) {
		if (!uploadedImage) {
			toast.error('Please upload an image 👺');
			return;
		}
		if (removeBackground) {
			bgRemovalModal = true;
			return;
		}

		loading = true;
		try {
			const prepared = await prepareImageData(uploadedImage);
			// Recovered: `colorPalette: q ? it : void 0` (q = "Use this palette")
			const palette = usePalette ? (paletteOverride ?? $colorPalette) : undefined;
			const { result } = await computeImageRemote({
				image: prepared.canvas.toDataURL('image/png'),
				gridSize,
				colorPalette: palette,
				removeNoise,
				removeBackground
			});
			resultImage = result;
		} catch (error) {
			if (error instanceof Error && error.message === 'Non authorized without a premium account') {
				pricingModal = true;
			} else if (error instanceof Error && error.message === 'Total usage limit reached') {
				toast.error('Total usage limit reached this month, contact us for more usage', {
					style: CALISTOGA_TOAST
				});
			} else {
				console.error(error);
				toast.error('Server error :/', { style: CALISTOGA_TOAST });
			}
		} finally {
			loading = false;
		}
	}

	// ── download ─────────────────────────────────────────────────────────────────
	/**
	 * Recovered `ve()` + `Se()`: always `${baseName}-pixelicious.png`, downscaled to the
	 * selected grid width when "Reduce size" is on.
	 */
	async function download() {
		if (!resultImage) return;
		const filename = `${baseName || 'pixelicious'}-pixelicious.png`;
		try {
			if (reduceSize) {
				const reduced = await reduceForDownload(resultImage, pixelSizeMultiplier(gridSize));
				downloadDataURL(reduced, filename);
			} else {
				downloadDataURL(resultImage, filename);
			}
		} catch (error) {
			console.error(error);
			toast.error('Could not export that image :/', { style: CALISTOGA_TOAST });
		}
	}

	// ── keyboard ─────────────────────────────────────────────────────────────────
	/** @param {KeyboardEvent} event */
	function onKeydown(event) {
		if (event.key !== 'Escape') return;
		previewModal = false;
		bgRemovalModal = false;
		pricingModal = false;
		colorEditingModal = false;
		communityPalettesModal = false;
	}

	// ── control handlers (recovered indices in brackets) ─────────────────────────
	/** [23] `pe()` — set the grid width; pixelSize follows as `512 / gridSize`. */
	function onGridSize(/** @type {CustomEvent<number>} */ event) {
		gridSize = event.detail;
	}

	/** [8] Reached only via the recovered premium-account error, which needs a backend. */
	function onPricingUnavailable() {
		toast.error('Checkout is not part of this reconstruction — the Stripe endpoint was never archived', {
			style: CALISTOGA_TOAST
		});
	}
</script>

<svelte:window on:keydown={onKeydown} />

<!-- drawer: palette colour editing (recovered `#modal` #1, state F) -->
<div id="modal" class={colorEditingModal ? DRAWER_OPEN : DRAWER_CLOSED}>
	{#if colorEditingModal}
		<ColorEditingModal on:closeModal={() => (colorEditingModal = false)} />
	{/if}
</div>

<!-- drawer: community palettes (recovered `#modal` #2, state L) -->
<div id="modal" class={communityPalettesModal ? DRAWER_OPEN : DRAWER_CLOSED}>
	{#if communityPalettesModal}
		<CommunityPalettesModal
			palettes={$defaultPalettes}
			on:closeModal={() => (communityPalettesModal = false)}
			on:checkPalette={() => (usePalette = true)}
		/>
	{/if}
</div>

<main class="flex flex-col justify-center items-center px-4 mb-20 mt-8 sm:mt-16 font-calistoga text-Grey-White">
	<div class="flex flex-col justify-center items-center space-y-4 text-center max-w-[656px]">
		<div class="text-sm font-merriweather p-2 rounded-md border border-Light-Blue text-Grey mb-3">
			<p>New: Remove {#each bannerChars as char, index}<span style="display: inline-block;" class={`char-${index}`}>{char}</span>{/each}</p>
		</div>
		<h1 class="text-4xl font-bold">Pixel Art Converter</h1>
		<p class="font-merriweather font-bold text-Grey">
			Convert Your Images into Pixel Art for Game Development with Our Online Image-to-Pixel Art Converter ⚔️
		</p>
	</div>

	<UploadZone on:file={(event) => handleFile(event.detail)} />

	<div class="flex flex-col justify-center items-center mt-10">
		<ResultPreview {uploadedImage} {resultImage} {loading} />

		{#if resultImage}
			<ControlsPanel
				{gridSize}
				{removeNoise}
				{removeBackground}
				{usePalette}
				{loading}
				palette={$colorPalette}
				on:gridsize={onGridSize}
				on:generate={() => convert()}
				on:editPalette={() => {
					colorEditingModal = true;
					scrollOnTop();
				}}
				on:communityPalettes={() => {
					communityPalettesModal = true;
				}}
				on:clearPalette={() => {
					colorPalette.set([]);
					usePalette = false;
				}}					on:swatchClick={(event) => {
						const color = $colorPalette[event.detail];
						if (color) currentColorPick.set([...color]);
						colorEditingModal = true;
						scrollOnTop();
					}}
				on:toggleNoise={(event) => (removeNoise = event.detail)}
				on:toggleBackground={(event) => (removeBackground = event.detail)}
				on:toggleUsePalette={(event) => (usePalette = event.detail)}
			/>
		{/if}

		<div class="flex sm:max-w-xs flex-col justify-center items-start space-y-3 mt-10 w-full">
			{#if resultImage}
				<!-- Reduce size + Preview (recovered `create_if_block_2`, state Q) -->
				<div class="flex flex-col justify-center items-start space-y-2 text-sm">
					<div class="flex flex-row w-full justify-between items-center">
						<div class="flex flex-row justify-start items-center space-x-2">
							<p>Reduce size</p>
							<Switch bind:checked={reduceSize} />
						</div>
						<button
							type="button"
							class="flex flex-row justify-center items-center space-x-2"
							on:click={() => (previewModal = true)}
						>
							<img src={eyeIcon} alt="Inspect" />
							<p class="text-Grey">Preview</p>
						</button>
					</div>
					<div class="text-Grey text-xs flex flex-row justify-center items-start space-x-1">
						<p class="font-merriweather">
							Enabling this option to download the image at the selected px size. (Ideal for sprites)
						</p>
					</div>
				</div>
			{/if}

			<button type="button" class={BTN_ORANGE} disabled={loading || !resultImage} on:click={download}>
				{#if loading}
					<img src={loadingIconWhite} height="16" width="16" class="animate-spin pt-1 pb-1" alt="Loading icon" />
				{:else}
					<p>Download</p>
				{/if}
			</button>
		</div>

		{#if resultImage}
			<a
				rel="noreferrer"
				href="https://discord.gg/scenario"
				target="_blank"
				class="flex flex-row mt-6 justify-center font-calistoga space-x-2 text-sm text-Grey w-full items-center"
			>
				<p class="">Share your results</p>
				<img src={discordIcon} alt="Discord" height="20" width="20" />
			</a>
		{/if}
	</div>
</main>

<!-- full-screen modals -->
{#if previewModal && resultImage}
	<Modal onclose={() => (previewModal = false)}>
		<PreviewModal {resultImage} {gridSize} on:close={() => (previewModal = false)} />
	</Modal>
{/if}

{#if bgRemovalModal}
	<Modal onclose={() => (bgRemovalModal = false)}>
		<BgRemovalModal on:close={() => (bgRemovalModal = false)} />
	</Modal>
{/if}

{#if pricingModal}
	<Modal onclose={() => (pricingModal = false)}>
		<PricingModal on:unavailable={onPricingUnavailable} />
	</Modal>
{/if}
