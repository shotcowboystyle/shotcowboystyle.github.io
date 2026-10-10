import { describe, expect, it } from 'vitest';
import { ancestorAt } from './dom';

describe('ancestorAt', () => {
	const build = () => {
		document.body.innerHTML =
			'<section id="outer"><div id="middle"><span id="leaf"></span></div></section>';
		return document.querySelector('#leaf')!;
	};

	it('returns the parent one level up', () => {
		expect(ancestorAt(build(), 1)?.id).toBe('middle');
	});

	// Regression: the lottie trigger lookup re-read `container.parentElement`
	// every pass, so any depth above 1 still landed on the direct parent.
	it('walks more than one level', () => {
		expect(ancestorAt(build(), 2)?.id).toBe('outer');
	});

	it('returns null for zero levels or past the root', () => {
		const leaf = build();
		expect(ancestorAt(leaf, 0)).toBeNull();
		expect(ancestorAt(leaf, 10)).toBeNull();
	});
});
