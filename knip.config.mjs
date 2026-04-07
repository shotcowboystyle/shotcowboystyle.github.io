/** @type {import('knip.config.mjs').KnipConfig} */
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
	ignoreDependencies: [
		'@commitlint/cli',
		'@types/eslint',
		'conventional-changelog-conventionalcommits',
		'@semantic-release/commit-analyzer',
		'@semantic-release/github',
		'@semantic-release/release-notes-generator',
		'astro-eslint-parser',
		'daisyui',
		'eslint-plugin-jsx-a11y',
	],
	ignore: ['src/sw/**/*'],
	paths: {
		'@/*': ['./src/*'],
	},
	postcss: {
		config: ['postcss.config.cjs'],
	},
	'semantic-release': {
		config: ['release.config.cjs', 'release.main.config.cjs'],
	},
	commitlint: {
		config: ['commitlint.config.cjs'],
	},
};
