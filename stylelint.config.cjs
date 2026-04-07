const config = {
	extends: [
		'stylelint-config-standard',
		'stylelint-config-hudochenkov/order',
		'stylelint-config-html',
		'stylelint-config-tailwindcss',
	],
	allowEmptyInput: true,
	reportNeedlessDisables: true,
	rules: {
		/** Vendor prefixes should be handled by postcss autoprefixer. */
		'at-rule-no-vendor-prefix': true,
		'media-feature-name-no-vendor-prefix': true,
		'property-no-vendor-prefix': true,
		'selector-no-vendor-prefix': true,
		'value-no-vendor-prefix': true,

		/** Limits. */
		'alpha-value-notation': 'percentage',
		'color-function-notation': 'modern',
		'color-named': 'never',
		'color-no-hex': [true, { severity: 'warning' }],
		'font-weight-notation': 'numeric',
		'hue-degree-notation': 'angle',

		/** Allow Tailwind CSS v4 directives. */
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: ['tailwind', 'apply', 'layer', 'config', 'reference', 'plugin', 'theme'],
			},
		],
		/** Allow `tailwind` media query functions. */
		'media-query-no-invalid': null,

		/** Allow underscore prefix and double-dash separators on custom properties (e.g. --text-xs--line-height). */
		'custom-property-pattern': [
			'^_?([a-z][a-z0-9]*)(-{1,2}[a-z0-9]+)*$',
			{
				message: (name) => `Expected custom property name "${name}" to be kebab-case`,
			},
		],

		/** Overwrite defaults from `stylelint-config-standard` to allow separate `grid-template-rows` and `grid-template-columns`. */
		'declaration-block-no-redundant-longhand-properties': [true, { ignoreShorthands: ['/grid/'] }],

		/** Allow `theme` function, used e.g. by tailwind. */
		'function-no-unknown': [true, { ignoreFunctions: ['theme'] }],

		/** Allow css modules `:global()` pseudo class. */
		'selector-pseudo-class-no-unknown': [
			true,
			{ ignorePseudoClasses: ['deep', 'global', 'slotted'] },
		],

		/** Don't error on `text-rendering` camel case values, use `currentColor`. */
		'value-keyword-case': [
			'lower',
			{
				camelCaseSvgKeywords: true,
				ignoreFunctions: ['theme'],
				ignoreProperties: [/^animation/, /^--animate-/, /^--font-/],
			},
		],

		/** Allow camelCase keyframe names (used by Tailwind theme animations). */
		'keyframes-name-pattern': null,

		/** Allow `from`/`to` in keyframes. */
		'keyframe-selector-notation': null,

		/** Disable empty line requirement inside keyframes blocks. */
		'rule-empty-line-before': [
			'always',
			{
				except: ['first-nested'],
				ignore: ['after-comment', 'inside-block'],
			},
		],

		/** Allow font family names in their original case. */
		'font-family-name-quotes': 'always-where-recommended',

		/** Disable empty line before custom properties in @plugin blocks. */
		'custom-property-empty-line-before': null,
	},
	overrides: [
		{
			files: ['.astro'].flatMap((ext) => [`*${ext}`, `**/*${ext}`]),
			customSyntax: 'postcss-html',
		},
	],
};

module.exports = config;
