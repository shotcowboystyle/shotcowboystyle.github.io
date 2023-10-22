import { defineConfig, devices } from '@playwright/test';
import { isCI } from 'ci-info';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: './e2e/tests',
	outputDir: 'e2e/output/artifacts/',
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: isCI,
	/* Retry on CI only */
	retries: isCI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: isCI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: isCI
		? [['blob'], ['github']]
		: [['line'], ['html', { outputFolder: './e2e/output/html/', open: 'never' }]],
	snapshotPathTemplate: '{testDir}/__screenshots__/{testFilePath}/{arg}--{projectName}{ext}',
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
		actionTimeout: 0,
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:4321',

		// Disable tracing when running locally,
		// as it breaks the "Show & Reuse Browser" feature.
		trace: isCI ? 'retain-on-failure' : 'on-first-retry',

		acceptDownloads: true,
		ignoreHTTPSErrors: true,
		video: isCI ? 'on' : 'off',
		screenshot: isCI ? 'only-on-failure' : 'off',
	},

	projects: [
		{
			name: 'chromium',
			grepInvert: /(@mobile|@mobile-and-tablet|@tablet)(\s|$)/,
			testIgnore: /.*\/performance\/index.spec.ts/,
			use: {
				...devices['Desktop Chrome'],
			},
		},
		{
			name: 'firefox',
			grepInvert: /(@mobile|@mobile-and-tablet|@tablet)(\s|$)/,
			testIgnore: /.*\/performance\/index.spec.ts/,
			use: {
				...devices['Desktop Firefox'],
			},
		},
		{
			name: 'mobile-chrome',
			grepInvert: /(@tablet|@tablet-and-desktop|@desktop)(\s|$)/,
			testIgnore: /.*\/performance\/index.spec.ts/,
			use: {
				...devices['Pixel 5'],
			},
		},
		{
			name: 'desktop-chrome',
			testMatch: /.*\/performance\/index.spec.ts/,
			use: {
				...devices['Desktop Chrome'],
			},
		},
		{
			name: 'tablet-safari',
			grepInvert: /(@mobile|@desktop)(\s|$)/,
			testIgnore: /.*\/performance\/index.spec.ts/,
			use: {
				...devices['iPad (gen 6)'],
			},
		},
	],

	timeout: 30 * 1000,

	expect: {
		timeout: 5000,
	},

	/* Run your local dev server before starting the tests */
	...(!process.env.PLAYWRIGHT_TEST_BASE_URL && {
		webServer: {
			command: 'pnpm preview',
			url: 'http://localhost:4321/',
			timeout: (isCI ? 300 : 60) * 1000,
			reuseExistingServer: !isCI,
		},
	}),
});
