import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

/**
 * Vite 6 reads `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS`, but this project is pinned to
 * Vite 5 (so it can use Svelte 4, matching the original Svelte/SvelteKit generation), so
 * the same thing is done here from an environment variable.
 *
 *   PREVIEW_HOST=pv-xxxx.style.dev npm run dev
 *
 * No hostname is committed, and the allowlist is never a blanket wildcard — only the
 * single host explicitly handed to the process.
 */
const previewHost = process.env.PREVIEW_HOST;

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		host: '0.0.0.0',
		port: 5173,
		allowedHosts: previewHost ? [previewHost] : undefined
	},
	preview: {
		host: '0.0.0.0',
		port: 4173,
		allowedHosts: previewHost ? [previewHost] : undefined
	}
});
