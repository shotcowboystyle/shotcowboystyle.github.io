module.exports = {
	plugins: [
		require('postcss-import'),
		require('postcss-url'),
		require('@tailwindcss/nesting')(require('postcss-nesting')),
		require('tailwindcss'),
		require('postcss-preset-env')({
			features: { 'nesting-rules': false },
		}),
		require('postcss-custom-selectors'),
		require('postcss-logical')({
			dir: 'ltr',
		}),
		require('postcss-combine-media-query'),
		require('postcss-combine-duplicated-selectors')({
			removeDuplicatedProperties: true,
			removeDuplicatedValues: false,
		}),
		require('autoprefixer'),
		process.env.NODE_ENV === 'production'
			? require('cssnano')({
					preset: 'default',
					discardComments: { removeAll: true },
					zindex: false,
			  })
			: null,
		require('postcss-reporter'),
	].filter(Boolean),
};
