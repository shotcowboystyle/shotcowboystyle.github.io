import { expect, test } from '@playwright/test';

/*
 * `cache.addAll` rejects the whole install if any URL fails. The list went
 * stale once already: `serviceWorker()` ran before purgecss rewrote the CSS
 * hashes, so the worker tried to cache files that never shipped.
 *
 * Fetched from the page, not the `request` fixture: Node can't resolve the
 * portless `*.localhost` host the preview runs on.
 */
test('every asset cached on install is served', async ({ page }) => {
	await page.goto('/');

	const failed = await page.evaluate(async () => {
		const source = await (await fetch('/sw.js')).text();
		const list = source.match(/=(\["\/"[^\]]*\])/)?.[1];
		if (!list) {
			return ['precache list not found in sw.js'];
		}

		const assets: string[] = JSON.parse(list);
		const responses = await Promise.all(assets.map((asset) => fetch(asset, { cache: 'no-store' })));
		return responses.filter((r) => !r.ok).map((r) => `${r.status} ${r.url}`);
	});

	expect(failed).toEqual([]);
});
