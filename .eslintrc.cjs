/** @type {import("@types/eslint").Linter.Config} */
module.exports = {
	root: true,
	ignorePatterns: ['node_modules', 'dist'],
	// env: {
	// 	node: true,
	// 	es2022: true,
	// 	browser: true,
	// },
	reportUnusedDisableDirectives: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		tsconfigRootDir: __dirname,
		sourceType: 'module',
		ecmaVersion: 'latest',
	},
	plugins: ['@typescript-eslint'],
	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:astro/recommended',
		'plugin:astro/jsx-a11y-recommended',
		'plugin:markdown/recommended',
	],
	rules: {
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{ varsIgnorePattern: 'Props', ignoreRestSiblings: true },
		],
	},
	overrides: [
		{
			files: ['*.astro'],
			parser: 'astro-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
				extraFileExtensions: ['.astro'],
				sourceType: 'module',
			},
			rules: {
				'astro/jsx-a11y/no-redundant-roles': [
					'error',
					{
						ul: ['list'],
					},
				],
			},
		},
	],
};
