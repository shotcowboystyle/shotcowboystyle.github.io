/** @type {import("prettier").Config} */
module.exports = {
	printWidth: 100,
	tabWidth: 2,
	useTabs: true,
	semi: true,
	singleQuote: true,
	jsxSingleQuote: false,
	trailingComma: 'all',
	bracketSpacing: true,
	bracketSameLine: false,
	arrowParens: 'always',
	plugins: [
		require.resolve(
			'prettier-plugin-tailwindcss',
			'prettier-plugin-astro',
			'@ianvs/prettier-plugin-sort-imports',
		),
	],
	tailwindConfig: './tailwind.config.cjs',
	overrides: [
		{
			files: '*.astro',
			options: {
				parser: 'astro',
			},
		},
	],
};
