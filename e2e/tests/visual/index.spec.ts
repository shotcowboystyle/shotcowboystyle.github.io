import { expect, test } from '@playwright/test';

test.describe('visual comparison test', () => {
	test.skip('compare landing page header with golden screenshot', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('#header')).toHaveScreenshot('header.png', { maxDiffPixels: 1 });
	});

	test.skip('compare landing page project card 1 with golden screenshot', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('#project-card_1')).toHaveScreenshot('project-card-1.png', {
			maxDiffPixels: 1,
		});
	});

	test.skip('compare landing page project card 2 with golden screenshot', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('#project-card_2')).toHaveScreenshot('project-card-2.png', {
			maxDiffPixels: 1,
		});
	});

	test.skip('compare landing page footer with golden screenshot', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('#about')).toHaveScreenshot('footer.png', { maxDiffPixels: 1 });
	});
});
