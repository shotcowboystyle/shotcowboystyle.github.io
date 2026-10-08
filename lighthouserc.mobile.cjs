/**
 * Lighthouse CI, mobile (throttled): reported, never blocking.
 *
 * Mobile performance sits well below the desktop gate (about 0.5 when this was
 * added), so every threshold here is a warning. Promote to `error` once mobile
 * catches up. Same server and build expectations as lighthouserc.cjs.
 */
const { execFileSync } = require('node:child_process');

// `serve:lhci` runs the preview behind portless as `lhci.shotcowboystyle`;
// `portless get` resolves the URL the proxy routes it to.
const url = execFileSync('portless', ['get', 'lhci.shotcowboystyle'], { encoding: 'utf8' }).trim();

module.exports = {
	ci: {
		collect: {
			url: [url],
			// The server comes from the `serve:lhci` package script, passed by the
			// `lighthouse:*` scripts as `--collect.startServerCommand`. `astro
			// preview` prints its `Local` address once it is listening.
			startServerReadyPattern: 'Local',
			numberOfRuns: 3,
		},
		assert: {
			assertions: {
				'categories:performance': ['warn', { minScore: 0.9 }],
				'categories:accessibility': ['warn', { minScore: 0.9 }],
				'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
				'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
				'total-blocking-time': ['warn', { maxNumericValue: 300 }],
			},
		},
		upload: {
			target: 'temporary-public-storage',
		},
	},
};
