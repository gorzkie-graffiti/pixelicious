import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// The reconstruction performs all image processing in the browser, so the whole
		// site can be prerendered to static files (the original served SvelteKit SSR +
		// a `POST /api/computeImage` endpoint that is not recoverable).
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: false,
			strict: true
		})
	}
};

export default config;
