import { readdirSync } from 'node:fs';
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const WCAG_AA_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

/**
 * Case-study routes come from the `project` content collection, so a new
 * markdown file is covered without editing this list.
 */
const caseStudyRoutes = readdirSync(new URL('../../../src/content/project', import.meta.url))
	.filter((fileName) => fileName.endsWith('.md'))
	.map((fileName) => `/work/${fileName.replace(/\.md$/, '')}`);

const routes = ['/', '/404', '/immature', '/tower-blocks', ...caseStudyRoutes];

for (const route of routes) {
	test.describe(`accessibility checks for ${route}`, () => {
		test.beforeEach(async ({ page }) => {
			await page.goto(route);
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
