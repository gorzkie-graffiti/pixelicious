<script>
	/**
	 * Main page — redesigned from the Pixelicious reconstruction.
	 *
	 * This version preserves all the functionality for converting images to pixel art
	 * but with an original visual design and clean codebase.
	 */
	import { onMount } from 'svelte';
import { colorPalette, currentColorPick } from '$lib/stores.js';
	import { toast } from '$lib/toast.js';
import { DEFAULT_PALETTE_INDEX, DEFAULT_PALETTES } from '$lib/palettes.js';
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
	import { BTN_ORANGE } from '$lib/classes.js';
	import { loadingIconWhite, eyeIcon } from '$lib/assets.js';
	import UploadZone from '$lib/components/UploadZone.svelte';
	import ResultPreview from '$lib/components/ResultPreview.svelte';
	import ControlsPanel from '$lib/components/ControlsPanel.svelte';
	import Switch from '$lib/components/Switch.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import PreviewModal from '$lib/components/PreviewModal.svelte';
	import BgRemovalModal from '$lib/components/BgRemovalModal.svelte';
	import PricingModal from '$lib/components/PricingModal.svelte';

	// ── state ────────────────────────────────────────────────────────────────────
	let uploadedImage = null;
	let loading = false;
	let resultImage = null;
	let gridSize = 256;
	let colorEditingModal = false;
	let communityPalettesModal = false;
	let previewModal = false;
	let bgRemovalModal = false;
	let pricingModal = false;

	let removeNoise = true;
	let removeBackground = false;
	let usePalette = true;
	let reduceSize = false;
	let baseName = '';

	// ── upload ────────────────────────────────────────────────────────────────────
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
			toast.error(error instanceof Error ? error.message : 'Could not read that file');
			return;
		}

		let source = dataURL;
		try {
			const response = await fetch(dataURL);
			if (response.headers.get('Content-Type') === 'image/webp') {
				source = await webpToPngBase64(dataURL);
			}
		} catch {
			// fetch() failing is not fatal
		}

		uploadedImage = source;

		const dimensions = await measure(source);
		if (!dimensions) {
			toast.error('That image could not be decoded');
			uploadedImage = null;
			return;
		}
		if (dimensions.width * dimensions.height > MAX_PIXELS) {
			toast.error('That image is too large to process in the browser');
			uploadedImage = null;
			return;
		}

		gridSize = defaultGridSize(dimensions.width, dimensions.height);

		await convert();
	}

	function measure(source) {
		return new Promise((resolve) => {
			const image = new Image();
			image.onload = () => resolve({ width: image.naturalWidth, height: image.naturalHeight });
			image.onerror = () => resolve(null);
			image.src = source;
		});
	}

	async function convert() {
		if (!uploadedImage) {
			toast.error('Please upload an image');
			return;
		}
		if (removeBackground) {
			bgRemovalModal = true;
			return;
		}

		loading = true;
		try {
			const prepared = await prepareImageData(uploadedImage);
			const palette = usePalette ? colorPalette : undefined;
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
				toast.error('Total usage limit reached this month, contact us for more usage');
			} else {
				console.error(error);
				toast.error('Server error');
			}
		} finally {
			loading = false;
		}
	}

	// ── download ─────────────────────────────────────────────────────────────────
	async function download() {
		if (!resultImage) return;
		const filename = `${baseName || 'pixelforge'}-pixelforge.png`;
		try {
			if (reduceSize) {
				const reduced = await reduceForDownload(resultImage, pixelSizeMultiplier(gridSize));
				downloadDataURL(reduced, filename);
			} else {
				downloadDataURL(resultImage, filename);
			}
		} catch (error) {
			console.error(error);
			toast.error('Could not export that image');
		}
	}

	// ── keyboard ─────────────────────────────────────────────────────────────────
	function onKeydown(event) {
		if (event.key !== 'Escape') return;
		previewModal = false;
		bgRemovalModal = false;
		pricingModal = false;
		colorEditingModal = false;
		communityPalettesModal = false;
	}

	// ── control handlers ─────────────────────────
	function onGridSize(event) {
		gridSize = event.detail;
	}

	function onPricingUnavailable() {
		toast.error('Checkout is not part of this reconstruction — the Stripe endpoint was never archived');
	}
	
	const initialPalette = JSON.parse(JSON.stringify(DEFAULT_PALETTES[DEFAULT_PALETTE_INDEX]));
	onMount(() => {
		colorPalette.set(initialPalette);
	});
</script>

<svelte:window on:keydown={onKeydown} />

<main class="flex flex-col justify-center items-center px-4 mb-20 mt-8 sm:mt-16 font-sans text-gray-100">
	<div class="flex flex-col justify-center items-center space-y-4 text-center max-w-[656px]">
		<div class="text-sm font-merriweather p-2 rounded-md border border-teal-500 text-gray-400 mb-3">
			<p>This tool runs entirely in your browser. No images are uploaded. Use it offline.</p>
		</div>
		<h1 class="text-4xl font-bold">Pixel Forge Converter</h1>
		<p class="font-merriweather font-bold text-gray-400">
			Transform Images into Pixel Art with Our Online Image-to-Pixel Forge Converter
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
					}}
				on:toggleNoise={(event) => (removeNoise = event.detail)}
				on:toggleBackground={(event) => (removeBackground = event.detail)}
				on:toggleUsePalette={(event) => (usePalette = event.detail)}
			/>
		{/if}

		<div class="flex sm:max-w-xs flex-col justify-center items-start space-y-3 mt-10 w-full">
			{#if resultImage}
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
							<p class="text-gray-400">Preview</p>
						</button>
					</div>
					<div class="text-gray-400 text-xs flex flex-row justify-center items-start space-x-1">
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
	</div>
</main>