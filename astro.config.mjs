import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';
import critters from 'astro-critters';
import purgecss from 'astro-purgecss';
import svgs from 'astro-svgs';
import serviceWorker from 'astro-sw';
import { defineConfig } from 'astro/config';
import analyze from 'rollup-plugin-analyzer';
import { visualizer } from 'rollup-plugin-visualizer';

const IS_PROD = process.env.NODE_ENV === 'production';

/**
 * Vite plugin: apply manualChunks only to the client build.
 * Prevents chunk resolution failures during Astro's SSR prerender phase.
 */
function clientManualChunks() {
	return {
		name: 'client-manual-chunks',
		enforce: 'pre',
		config(_, { isSsrBuild }) {
			if (isSsrBuild) return;
			return {
				build: {
					rollupOptions: {
						output: {
							manualChunks: (id) => {
								if (id.includes('maplibre-gl')) return 'maplibre-gl';
								if (id.includes('lottie-web')) return 'lottie-web';
								if (id.includes('swiper')) return 'swiper';
								if (id.includes('gsap')) return 'gsap';
							},
						},
					},
				},
			};
		},
	};
}

// https://astro.build/config
export default defineConfig({
	trailingSlash: 'always',
	site: IS_PROD ? 'https://shotcowboystyle.github.io' : 'http://localhost:4321',
	integrations: [
		svgs({ input: ['src/assets/images/sprite'] }),
		serviceWorker(),
		critters({ Logger: 2 }),
		purgecss({
			safelist: [/^dot\d/, /^four-/, /^glow-/, /^crater-/, 'github', 'linkedin', 'twitter'],
		}),
		compress({
			CSS: true,
			HTML: false,
			Image: false,
			JavaScript: true,
			SVG: true,
		}),
		sitemap(),
	],
	vite: {
		plugins: [
			clientManualChunks(),
			IS_PROD && analyze(),
			IS_PROD &&
				visualizer({
					open: false,
					filename: 'stats.html',
					gzipSize: true,
					brotliSize: true,
				}),
		],
		build: {
			sourcemap: !IS_PROD,
			rollupOptions: {
				treeshake: true,
			},
		},
		optimizeDeps: { exclude: ['fsevents'] },
		ssr: {
			noExternal: ['swiper'],
		},
	},
});
