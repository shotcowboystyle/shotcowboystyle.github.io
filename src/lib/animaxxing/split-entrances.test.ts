import { charsRiseIn, linesMaskIn, wordsSlideIn } from '@/lib/animaxxing/split-entrances';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const TEXT = 'Full Stack Senior Developer.';

function heading(): HTMLElement {
	const element = document.createElement('h1');
	element.className = 'c-animated-text';
	element.textContent = TEXT;
	document.body.append(element);
	return element;
}

/*
 * `prefersReducedMotion()` reads the absence of `has-motion` on `<html>`, so a
 * bare document is already the reduced-motion case. The entrance still has to
 * land on its settled state: the target is invisible until an entrance reveals
 * it, so a builder that quietly did nothing here would ship blank headings.
 */
describe.each([
	['charsRiseIn', charsRiseIn],
	['linesMaskIn', linesMaskIn],
	['wordsSlideIn', wordsSlideIn],
])('%s under reduced motion', (_name, runner) => {
	beforeEach(() => {
		document.body.innerHTML = '';
		document.documentElement.className = '';
	});

	it('reveals the target without splitting it', () => {
		const element = heading();

		runner(element).progress(1);

		expect(element.children).toHaveLength(0);
		expect(element.textContent).toBe(TEXT);
		expect(element.style.opacity).toBe('1');
		expect(element.style.visibility).not.toBe('hidden');
	});

	it('still fires onComplete so the controller can advance', () => {
		const onComplete = vi.fn();

		runner(heading(), { onComplete }).progress(1);

		expect(onComplete).toHaveBeenCalledOnce();
	});

	it('returns an empty timeline for a missing target', () => {
		expect(() => runner(null).progress(1)).not.toThrow();
	});
});
