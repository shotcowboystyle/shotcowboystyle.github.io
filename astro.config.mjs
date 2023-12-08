import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import qwikdev from '@qwikdev/astro';
import compress from 'astro-compress';
import critters from 'astro-critters';
import purgecss from 'astro-purgecss';
import svgSprite from 'astro-svg-sprite';
import serviceWorker from 'astro-sw';
import { defineConfig } from 'astro/config';
import analyze from 'rollup-plugin-analyzer';
import { visualizer } from 'rollup-plugin-visualizer';

const IS_PROD = process.env.NODE_ENV === 'production';

// https://astro.build/config
export default defineConfig({
	trailingSlash: 'always',
	site: IS_PROD ? 'https://shotcowboystyle.github.io' : 'http://localhost:4321',
	integrations: [
		svgSprite(),
		serviceWorker(),
		qwikdev(),
		tailwind({
			applyBaseStyles: false,
		}),
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
			sourcemap: true,
			rollupOptions: {
				treeshake: true,
				output: {
					manualChunks: (id) => {
						if (id.includes('maplibre-gl')) {
							return 'maplibre-gl';
						}
						if (id.includes('lottie-web')) {
							return 'lottie-web';
						}
						if (id.includes('swiper')) {
							return 'swiper';
						}
						if (id.includes('gsap')) {
							return 'gsap';
						}
					},
				},
			},
		},
		optimizeDeps: { exclude: ['fsevents'] },
		// To test on other devices with IP address
		// Server: {
		//   host: true,
		// },
		ssr: {
			noExternal: ['swiper/css'],
		},
	},
});
