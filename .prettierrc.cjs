/** @type {import("prettier").Config} */
module.exports = {
	printWidth: 100,
	tabWidth: 2,
	useTabs: true,
	semi: true,
	singleQuote: true,
	jsxSingleQuote: false,
	trailingComma: 'all',
	// bracketSpacing: true,
	// bracketSameLine: false,
	arrowParens: 'always',
	singleAttributePerLine: true,
	plugins: [
		require.resolve('prettier-plugin-astro'),
		require.resolve('@ianvs/prettier-plugin-sort-imports'),
		require.resolve('prettier-plugin-tailwindcss'),
	],
	overrides: [
		{
			files: '*.astro',
			options: {
				parser: 'astro',
			},
		},
	],
};
