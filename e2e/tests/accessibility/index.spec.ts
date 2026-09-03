import { readdirSync } from 'node:fs';
import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const WCAG_AA_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

/**
 * Case-study routes come from the `project` content collection, so a new
 * markdown file is covered without editing this list.
 */
const caseStudyRoutes = readdirSync(new URL('../../../src/content/project', import.meta.url))
	.filter((fileName) => fileName.endsWith('.md'))
	.map((fileName) => `/work/${fileName.replace(/\.md$/, '')}`);

const routes = ['/', '/404', '/immature', '/tower-blocks', ...caseStudyRoutes];

/**
 * Waits for every CSS transition to finish before scanning.
 *
 * `page.goto` resolves at load, which is while entrance transitions are still
 * running. Axe reads the *computed* color of a half-faded element — an
 * off-white plate at 5% opacity over the black canvas measures as `#0d0d0d` on
 * `#000` — and reports a contrast failure against a state that exists for a few
 * hundred milliseconds and is not what any reader sees.
 *
 * Only transitions are awaited. The looping animations on this site (the 404
 * marquee, the scroll cue, the motion-demo diagrams) never reach `finished`, so
 * waiting on `getAnimations()` wholesale would always time out.
 */
async function waitForTransitionsToSettle(page: Page) {
	await page.waitForFunction(
		() =>
			document
				.getAnimations()
				.every(
					(animation) => !(animation instanceof CSSTransition) || animation.playState !== 'running',
				),
		null,
		{ timeout: 5_000 },
	);
}

for (const route of routes) {
	test.describe(`accessibility checks for ${route}`, () => {
		test.beforeEach(async ({ page }) => {
			await page.goto(route);
			await waitForTransitionsToSettle(page);
		});

		test('should not have any automatically detectable accessibility issues', async ({ page }) => {
			const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

			expect(accessibilityScanResults.violations).toEqual([]);
		});

		test('should not have any automatically detectable WCAG A or AA violations', async ({
			page,
		}) => {
			const accessibilityScanResults = await new AxeBuilder({ page })
				.withTags(WCAG_AA_TAGS)
				.analyze();

			expect(accessibilityScanResults.violations).toEqual([]);
		});
	});
}
