/** @type {import('knip').KnipConfig} */
export default {
	rules: {
		binaries: 'off',
	},
	entry: ['src/**/*.{ts,tsx,astro,css}!'],
	project: ['src/**/*.{ts,tsx,js,jsx,astro,css}'],
	compilers: {
		astro: (text) => [...text.matchAll(/import[^;]+/g)].join('\n'),
		css: (text) => [...text.matchAll(/(?<=@)import[^;]+/g)].join('\n'),
	},
	// `commitizen` is invoked as `node_modules/.bin/cz` from lefthook.yml, which
	// knip does not scan.
	ignoreDependencies: ['@types/eslint', 'astro-eslint-parser', 'commitizen', 'daisyui'],
	ignore: ['src/sw/**/*'],
	paths: {
		'@/*': ['./src/*'],
	},
	postcss: {
		config: ['postcss.config.cjs'],
	},
	commitlint: {
		config: ['commitlint.config.cjs'],
	},
};
