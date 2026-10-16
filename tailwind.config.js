/** @type {import('tailwindcss').Config} */
// Colour + font tokens recovered from the October 2024 deployment's compiled stylesheet
// `_app/immutable/assets/_layout-1ebb0720.css` (see docs/TECHNICAL-NOTES.md §2.3).
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'Deep-blue': '#140836',
				'Medium-Blue': '#1F143D',
				'Light-Blue': '#45376C',
				'Grey-White': '#F9F9FB',
				Grey: '#AFA6C9',
				'Grey-Dark': '#483E66',
				Orange: '#EA4D30'
			},
			fontFamily: {
				calistoga: ['Calistoga', 'Georgia', 'serif'],
				merriweather: ['Merriweather', 'Georgia', 'serif'],
				poppins: ['Poppins', 'system-ui', 'sans-serif']
			}
		}
	},
	plugins: []
};
