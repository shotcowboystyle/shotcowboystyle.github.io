import { expect, test, type Page } from '@playwright/test';

/**
 * The mystery-box links sit inside a scroll-driven section that is off-screen
 * until the about sequence runs, so a real click can't reach them. Dispatching
 * the click on the anchor itself still bubbles to the ClientRouter's document
 * listener, which is the only part this suite cares about.
 *
 * The href carries a trailing slash — match it exactly or the locator finds
 * nothing and the failure reads as a transition bug rather than a bad selector.
 */
async function navigateToInternalPage(page: Page) {
	await page
		.locator('a[href="/immature/"]')
		.first()
		.evaluate((el) => el.click());
	await page.waitForURL('**/immature/');
}

/**
 * Regression cover for the curtain that pops off instead of sliding out.
 *
 * `has-motion` is added to `<html>` at runtime by an inline script, but the
 * ClientRouter replaces `<html>`'s attributes with the incoming document's on
 * every swap. When the class was not re-applied, `prefersReducedMotion()`
 * reported `true` after the first client-side navigation, so `hideLoader()`
 * took its instant branch — and every other motion path on the site died with
 * it.
 */
test.describe('Page transition curtain', () => {
	test('keeps the motion class across a client-side navigation', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('html')).toHaveClass(/has-motion/);

		await navigateToInternalPage(page);

		await expect(page.locator('html')).toHaveClass(/has-motion/);
	});

	test('animates the curtain out instead of snapping it away', async ({ page }) => {
		await page.goto('/');

		await navigateToInternalPage(page);

		const bar = page.locator('.js-loader-item').first();

		// Covering the page, and `#main` already revealed behind it so the bars
		// slide off the new page rather than off a blank one.
		await expect
			.poll(() => bar.evaluate((el) => getComputedStyle(el).transform))
			.toBe('matrix(1, 0, 0, 1, 0, 0)');
		await expect(page.locator('body')).not.toHaveClass(/is-loading/);

		// Mid-retract: a partial scale is only observable if the tween ran.
		await expect
			.poll(
				() =>
					bar.evaluate((el) => {
						const scaleY = new DOMMatrixReadOnly(getComputedStyle(el).transform).d;
						return scaleY > 0 && scaleY < 1;
					}),
				{ timeout: 2000 },
			)
			.toBe(true);

		await expect
			.poll(() => bar.evaluate((el) => getComputedStyle(el).transform), { timeout: 4000 })
			.toBe('matrix(1, 0, 0, 0, 0, 0)');
	});
});
