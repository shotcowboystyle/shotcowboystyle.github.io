import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import source from './view-transition.js?raw';

/**
 * The script is a classic <head> script, not a module, so it is exercised the
 * way the browser does: evaluated once, then driven by `pageswap` and
 * `pagereveal` events carrying a stand-in `viewTransition`.
 */
beforeAll(() => {
	window.eval(source);
});

afterEach(() => {
	vi.unstubAllGlobals();
	document.body.innerHTML = '';
	window.history.replaceState(null, '', '/');
});

function swap(from: string, to: string) {
	window.history.replaceState(null, '', from);
	const types = new Set<string>();
	const event = Object.assign(new Event('pageswap'), {
		activation: { entry: { url: new URL(to, window.location.origin).href } },
		viewTransition: { types },
	});
	window.dispatchEvent(event);
	return types;
}

function reveal(from: string, to: string) {
	window.history.replaceState(null, '', to);
	vi.stubGlobal('navigation', {
		activation: { from: { url: new URL(from, window.location.origin).href } },
	});
	const types = new Set<string>();
	window.dispatchEvent(Object.assign(new Event('pagereveal'), { viewTransition: { types } }));
	return types;
}

describe('view transition types', () => {
	it.each([
		['/', '/work/isla-suds/', 'turn-open'],
		['/work/isla-suds/', '/work/kalmia-woods/', 'turn-open'],
		['/work/isla-suds/', '/', 'turn-close'],
		['/', '/experiments/carousel/', 'wipe'],
		['/experiments/', '/', 'wipe'],
		['/work/isla-suds/', '/tower-blocks/', 'wipe'],
		['/', '/immature/', 'wipe'],
	])('%s → %s is %s on both sides of the navigation', (from, to, type) => {
		expect([...swap(from, to)]).toEqual([type]);
		expect([...reveal(from, to)]).toEqual([type]);
	});

	it.each([
		['/immature/', '/tower-blocks/'],
		['/', '/404/'],
		['/work/isla-suds/', '/work/isla-suds/'],
	])('%s → %s keeps the default crossfade', (from, to) => {
		expect(swap(from, to).size).toBe(0);
		expect(reveal(from, to).size).toBe(0);
	});

	it('falls back to the crossfade when the new page cannot learn its origin', () => {
		window.history.replaceState(null, '', '/work/isla-suds/');
		const types = new Set<string>();
		window.dispatchEvent(Object.assign(new Event('pagereveal'), { viewTransition: { types } }));

		expect(types.size).toBe(0);
	});
});

describe('the traveling title', () => {
	function plate(slug: string) {
		document.body.insertAdjacentHTML(
			'beforeend',
			`<article data-folio-slug="${slug}"><h2 data-folio-title>${slug}</h2></article>`,
		);
		const title = document.querySelector<HTMLElement>(`[data-folio-slug="${slug}"] h2`)!;
		vi.spyOn(title, 'getBoundingClientRect').mockReturnValue({ top: 100, bottom: 200 } as DOMRect);
		return title;
	}

	it('names only the destination plate title when a folio opens', () => {
		const isla = plate('isla-suds');
		const kalmia = plate('kalmia-woods');

		swap('/', '/work/kalmia-woods/');

		expect(kalmia.style.viewTransitionName).toBe('folio-title');
		expect(isla.style.viewTransitionName).toBe('');
	});

	it('clears the previous name before naming the next title', () => {
		const isla = plate('isla-suds');
		const kalmia = plate('kalmia-woods');

		swap('/', '/work/isla-suds/');
		swap('/', '/work/kalmia-woods/');

		expect(isla.style.viewTransitionName).toBe('');
		expect(kalmia.style.viewTransitionName).toBe('folio-title');
	});

	it('leaves a title outside the viewport where it is', () => {
		const isla = plate('isla-suds');
		vi.spyOn(isla, 'getBoundingClientRect').mockReturnValue({ top: 5000, bottom: 5100 } as DOMRect);

		swap('/', '/work/isla-suds/');

		expect(isla.style.viewTransitionName).toBe('');
	});

	it('names the folio being left when it closes', () => {
		const isla = plate('isla-suds');

		reveal('/work/isla-suds/', '/');

		expect(isla.style.viewTransitionName).toBe('folio-title');
	});
});
