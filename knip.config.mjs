/** @type {import('knip.config.mjs').KnipConfig} */
export default {
	rules: {
		binaries: 'off',
	},
	entry: [
		'src/**/*.{ts,tsx,astro,css}!',
		'astro.config.mjs',
		'postcss.config.cjs',
		'public/js/*.js',
	],
	project: ['src/**/*.{ts,tsx,js,jsx,astro,css}', 'public/js/*.js'],
	compilers: {
		astro: (text) => [...text.matchAll(/import[^;]+/g)].join('\n'),
		css: (text) => [...text.matchAll(/(?<=@)import[^;]+/g)].join('\n'),
	},
	ignoreDependencies: [
		'sharp',
		'@astrojs/check',
		'conventional-changelog-conventionalcommits',
		'lighthouse',
		'cz-conventional-changelog',
		'eslint-import-resolver-typescript',
		'eslint-plugin-import',
		'eslint-plugin-jsx-a11y',
		'sass',
	],
	ignore: ['src/sw/**/*'],
	paths: {
		'@/*': ['./src/*'],
	},
	postcss: {
		config: ['postcss.config.cjs'],
	},
	tailwind: {
		config: ['tailwind.config.{js,cjs,mjs,ts}'],
	},
	'semantic-release': {
		config: ['release.config.cjs', 'release.main.config.cjs'],
	},
	commitlint: {
		config: ['commitlint.config.cjs'],
	},
};
