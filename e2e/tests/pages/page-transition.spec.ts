import { expect, test } from '@playwright/test';

/**
 * Navigation is a document navigation now: the ClientRouter and its curtain are
 * gone, and cross-document view transitions choreograph the move where the
 * browser supports them. These cover what has to hold everywhere, with or
 * without the transition: where each link goes, what arrives, and that the
 * stack comes back where the reader left it.
 */
test.describe('Project folios', () => {
	test('a project plate opens its folio, and Back returns to the same plate', async ({ page }) => {
		await page.goto('/#work-isla-suds');
		await expect(page.locator('html')).toHaveClass(/has-motion/);
		const scrolled = await page.evaluate(() => window.scrollY);

		await page.locator('#work-isla-suds a[href="/work/isla-suds/"]:visible').first().click();
		await page.waitForURL('**/work/isla-suds/');

		await expect(page.getByRole('heading', { level: 1 })).toHaveText('Isla Suds');
		await expect(page.locator('.folio-gallery figure').first()).toBeAttached();

		await page.goBack();
		await page.waitForURL(/\/#work-isla-suds$/);
		await expect
			.poll(() => page.evaluate(() => window.scrollY))
			.toBeGreaterThanOrEqual(scrolled - 2);
	});

	test('the folio closes on the next project in the stack', async ({ page }) => {
		await page.goto('/work/isla-suds/');

		await page.getByRole('navigation', { name: 'Next project' }).getByRole('link').click();
		await page.waitForURL('**/work/kalmia-woods/');

		await expect(page.getByRole('heading', { level: 1 })).toHaveText('Kalmia Woods');
	});

	test('a folio with nowhere public to go shows no live link', async ({ page }) => {
		await page.goto('/work/clean-break/');

		await expect(page.getByRole('link', { name: /^View Site/ })).toHaveCount(0);
	});
});

test.describe('Index', () => {
	test('opens as a modal, holds focus, and gives it back on Escape', async ({ page }) => {
		await page.goto('/work/holy-city-live/');
		const pill = page.locator('.index-pill');

		// From the keyboard: Safari never focuses a clicked button, so a mouse open
		// there has no focus to hand back.
		await pill.focus();
		await page.keyboard.press('Enter');
		const index = page.getByRole('dialog', { name: 'Index' });
		await expect(index).toBeVisible();
		await expect(index.getByRole('link', { name: 'Experiments' })).toHaveAttribute(
			'href',
			'/experiments/',
		);
		expect(await page.evaluate(() => document.activeElement?.closest('dialog')?.id)).toBe(
			'site-index',
		);

		await page.keyboard.press('Escape');
		await expect(index).toBeHidden();
		await expect(pill).toBeFocused();
	});

	test('waits out the landing hero, which has its own Index link', async ({ page }) => {
		await page.goto('/');

		await expect(page.locator('.index-pill')).toBeHidden();
		await page.getByRole('button', { name: 'Index' }).click();
		await expect(page.getByRole('dialog', { name: 'Index' })).toBeVisible();
	});
});

test.describe('CV', () => {
	test('lists the work history and keeps the references to hand', async ({ page }) => {
		await page.goto('/#cv');
		const cv = page.locator('#cv');

		await expect(cv.locator('ol > li')).toHaveCount(6);
		await expect(cv.getByRole('link', { name: 'Full CV (PDF)' })).toHaveAttribute(
			'href',
			'/downloads/Resume.pdf',
		);

		const reference = cv.getByRole('button', { name: 'Jar Jar Binks' });
		await reference.focus();
		await page.keyboard.press('Enter');
		await expect(page.locator('#reference-jar-jar-binks')).toBeVisible();

		await page.keyboard.press('Escape');
		await expect(page.locator('#reference-jar-jar-binks')).toBeHidden();
	});
});

test.describe('Experiments plate', () => {
	test('every tile leads into the experiments site', async ({ page }) => {
		await page.goto('/');
		const links = page.locator('#experiments a');

		await expect(links).not.toHaveCount(0);
		for (const href of await links.evaluateAll((all) => all.map((a) => a.getAttribute('href')))) {
			expect(href).toMatch(/^\/experiments\//);
		}
	});
});
