import js from '@eslint/js';
import markdown from '@eslint/markdown';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import astro from 'eslint-plugin-astro';
import globals from 'globals';

/** @type {import("eslint").Linter.Config[]} */
export default [
	{
		// ESLint does not read .gitignore, so gitignored paths must be repeated
		// here. Without this, `eslint .` fails locally on vendored tooling that
		// CI never checks out — `.claude/skills/` in particular.
		ignores: [
			'node_modules/',
			'dist/',
			'.astro/',
			'public/sw.js',
			'.claude/',
			'.impeccable/',
			'lighthouse/',
			'e2e/output/',
			'coverage/',
			'stats.html',
		],
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
			// A `separator` is non-interactive until it is focusable, at which
			// point the ARIA window-splitter pattern requires `tabindex="0"`
			// plus arrow-key handling. That is what the resize handles in
			// `resizer-container.astro` implement.
			'astro/jsx-a11y/no-noninteractive-tabindex': [
				'error',
				{
					tags: [],
					roles: ['tabpanel', 'separator'],
					allowExpressionValues: true,
				},
			],
		},
	},
];
