import { expect, test } from '@playwright/test';

test.describe('Landing', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('has the correct title tag', async ({ page }) => {
		await expect(page).toHaveTitle('Curtis Blanton Portfolio');
	});

	test('has the correct meta tags', async ({ page }) => {
		const canonicalLink = page.locator('link[rel="canonical"]');
		await expect(canonicalLink).toHaveAttribute('href', 'https://shotcowboystyle.github.io/');

		const description = page.locator('meta[name="description"]');
		await expect(description).toHaveAttribute(
			'content',
			"I'm a software engineer that specializes in building fun and useful applications.",
		);

		const ogSiteName = page.locator('meta[property="og:title"]');
		await expect(ogSiteName).toHaveAttribute('content', 'Curtis Blanton Portfolio');
	});

	// test("scrolls to the #about section after clicking the about button", async ({ page }) => {
	// 	await page.locator("#about-button").click();

	// 	await expect(page).toHaveURL(/.*#about/);
	// });

	// test("scrolls to the top of the page after clicking the back to top button", async ({ page }) => {
	// 	await page.locator("#back-to-top-button").click();

	// 	await expect(page).toHaveURL("/");
	// });

	// test("navigates to the Immature page after clicking its mystery box button", async ({ page }) => {
	// 	await page.locator("#immature-page-link").click();

	// 	await expect(page).toHaveURL(/.*\/immature\//);
	// });

	// test("navigates to the tower blocks page after clicking its mystery box button", async ({
	// 	page,
	// }) => {
	// 	await page.locator("#tower-blocks-page-link").click();

	// 	await expect(page).toHaveURL(/.*\/tower-blocks\//);
	// });
});
