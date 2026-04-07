import js from '@eslint/js';
import markdown from '@eslint/markdown';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import astro from 'eslint-plugin-astro';
import globals from 'globals';

/** @type {import("eslint").Linter.Config[]} */
export default [
	{
		ignores: ['node_modules/', 'dist/', '.astro/', 'public/sw.js'],
	},
	{
		...js.configs.recommended,
		files: ['**/*.{js,mjs,cjs,ts,tsx,astro}'],
	},
	...astro.configs.recommended,
	...astro.configs['jsx-a11y-recommended'],
	{
		files: ['**/*.md'],
		plugins: { markdown },
		language: 'markdown/commonmark',
	},
	{
		files: ['**/*.{js,mjs,cjs,ts,tsx,astro}'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.node,
				...globals.es2022,
			},
		},
	},
	{
		files: ['**/*.ts', '**/*.tsx'],
		plugins: {
			'@typescript-eslint': ts,
		},
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				tsconfigRootDir: import.meta.dirname,
				sourceType: 'module',
				ecmaVersion: 'latest',
			},
		},
		rules: {
			...ts.configs.recommended.rules,
			'no-undef': 'off', // TypeScript already handles this
			'@typescript-eslint/no-var-requires': 'off',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{ varsIgnorePattern: 'Props', ignoreRestSiblings: true },
			],
		},
	},
	{
		files: ['**/*.astro'],
		languageOptions: {
			parser: astro.parser,
			parserOptions: {
				parser: tsParser,
				extraFileExtensions: ['.astro'],
				sourceType: 'module',
			},
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
];
