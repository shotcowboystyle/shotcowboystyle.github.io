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

		/** Allow `tailwind` directive. */
		'at-rule-no-unknown': [true, { ignoreAtRules: ['tailwind', 'apply', 'layer', 'config'] }],
		/** Allow `tailwind` media query functions. */
		'media-query-no-invalid': null,

		/** Allow underscore prefix on custom properties. */
		'custom-property-pattern': [
			'^_?([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
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
		'value-keyword-case': ['lower', { camelCaseSvgKeywords: true, ignoreFunctions: ['theme'] }],
	},
	overrides: [
		{
			files: ['.astro'].flatMap((ext) => [`*${ext}`, `**/*${ext}`]),
			customSyntax: 'postcss-html',
		},
	],
};

module.exports = config;
