module.exports = {
	plugins: {
		'postcss-import': {},
		'postcss-url': {},
		'tailwindcss/nesting': 'postcss-nesting',
		tailwindcss: {},
		'postcss-preset-env': {
			features: { 'nesting-rules': false },
		},
		'postcss-custom-selectors': {},
		'postcss-logical': {
			dir: 'ltr',
		},
		'postcss-combine-media-query': {},
		'postcss-combine-duplicated-selectors': {
			removeDuplicatedProperties: true,
			removeDuplicatedValues: false,
		},
		autoprefixer: {},
		cssnano: {
			preset: 'default',
			discardComments: { removeAll: true },
			zindex: false,
		},
		'postcss-reporter': {},
	},
};
