import { afterEach, describe, expect, it } from 'vitest';
import { prefersReducedMotion } from './motion';

afterEach(() => {
	document.documentElement.classList.remove('has-motion');
});

describe('prefersReducedMotion', () => {
	it('reports reduced motion when the has-motion gate is absent', () => {
		expect(prefersReducedMotion()).toBe(true);
	});

	it('reports full motion once base.astro has set has-motion', () => {
		document.documentElement.classList.add('has-motion');

		expect(prefersReducedMotion()).toBe(false);
	});

	/**
	 * `base.astro` only adds `has-motion` when the reduce query does *not*
	 * match, so an unrelated class on <html> must not be mistaken for the gate.
	 * Regression guard for the motion modules that used to run unconditionally.
	 */
	it('does not treat an unrelated class on the root element as the gate', () => {
		document.documentElement.classList.add('is-loading');

		expect(prefersReducedMotion()).toBe(true);

		document.documentElement.classList.remove('is-loading');
	});
});
