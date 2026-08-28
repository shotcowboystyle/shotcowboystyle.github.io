import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

// Deliberately not using `getViteConfig` from 'astro/config'. It loads the full
// Astro config, which runs every integration's hooks on each test run -- the
// astro-sw integration regenerates public/sw.js as a side effect. The unit
// suite only needs the `@/` alias, so it is declared directly.
export default defineConfig({
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	test: {
		environment: 'happy-dom',
		include: ['src/**/*.test.ts'],
		coverage: {
			provider: 'v8',
			include: ['src/utils/**', 'src/config/**'],
			reporter: ['text', 'html'],
		},
	},
});
