module.exports = {
	plugins: {
		'postcss-for': {},
		'postcss-random': { round: true, noSeed: true },
		'postcss-import': {},
		'tailwindcss/nesting': 'postcss-nesting',
		tailwindcss: {},
		'postcss-preset-env': {
			features: { 'nesting-rules': false },
		},
		// 'postcss-combine-media-query': {},
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
