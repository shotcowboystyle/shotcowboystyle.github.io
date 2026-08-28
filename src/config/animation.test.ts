import { describe, expect, it } from 'vitest';
import {
	ANIMATION_DURATION,
	ANIMATION_EASING,
	ANIMATION_STAGGER,
	CSS_CLASSES,
	CSS_TRANSITION_DURATION,
	DATA_ATTRIBUTES,
	DOM_SELECTORS,
	LOTTIE_CONFIG,
	OPACITY,
	SCALE,
	SCROLL_CONFIG,
	TRANSFORM_ORIGIN,
	type AnimationDuration,
	type AnimationStagger,
	type LottiePlayControl,
	type ScrollEndPosition,
	type ScrollStartPosition,
	type ScrollToggleAction,
	type TransformOrigin,
} from './animation';

/**
 * Compile-time assertions. These fail `tsc --noEmit` rather than the runner, so
 * they guard the exported types even though they produce no runtime output.
 */
void (ANIMATION_DURATION.DEFAULT satisfies AnimationDuration);
void (ANIMATION_EASING.EASE_OUT satisfies string);
void (ANIMATION_STAGGER.TEXT satisfies AnimationStagger);
void (SCROLL_CONFIG.START.TOP_CENTER satisfies ScrollStartPosition);
void (SCROLL_CONFIG.END.BOTTOM_TOP satisfies ScrollEndPosition);
void (SCROLL_CONFIG.TOGGLE_ACTIONS.PLAY_RESET satisfies ScrollToggleAction);
void (LOTTIE_CONFIG.PLAY_CONTROL.HOVER satisfies LottiePlayControl);
void (TRANSFORM_ORIGIN.CENTER satisfies TransformOrigin);

/** Collect every string leaf from a nested config object. */
const stringLeaves = (value: unknown): string[] => {
	if (typeof value === 'string') return [value];
	if (typeof value !== 'object' || value === null) return [];
	return Object.values(value).flatMap(stringLeaves);
};

describe('ANIMATION_DURATION', () => {
	it('increases monotonically from INSTANT to DRAMATIC', () => {
		const ordered = [
			ANIMATION_DURATION.INSTANT,
			ANIMATION_DURATION.FAST,
			ANIMATION_DURATION.QUICK,
			ANIMATION_DURATION.STANDARD,
			ANIMATION_DURATION.MEDIUM,
			ANIMATION_DURATION.DEFAULT,
			ANIMATION_DURATION.SLOW,
			ANIMATION_DURATION.REVEAL,
			ANIMATION_DURATION.DRAMATIC,
		];

		expect(ordered).toEqual([...ordered].sort((a, b) => a - b));
	});

	it('is expressed in positive seconds', () => {
		for (const duration of Object.values(ANIMATION_DURATION)) {
			expect(duration).toBeGreaterThan(0);
		}
	});
});

describe('ANIMATION_EASING', () => {
	it('exposes GSAP easings as strings', () => {
		expect(ANIMATION_EASING.LINEAR).toBe('none');
		expect(ANIMATION_EASING.EASE_OUT).toBe('power1.out');
		expect(ANIMATION_EASING.POWER2_OUT).toBe('power2.out');
	});

	it.each([
		['CUBIC', ANIMATION_EASING.CUBIC],
		['EXPO', ANIMATION_EASING.EXPO],
	])('%s is a normalized easing curve anchored at 0 and 1', (_name, ease) => {
		expect(ease(0)).toBeCloseTo(0);
		expect(ease(1)).toBeCloseTo(1);
	});

	it('CUBIC is symmetric about its midpoint', () => {
		expect(ANIMATION_EASING.CUBIC(0.5)).toBeCloseTo(0.5);
		expect(ANIMATION_EASING.CUBIC(0.25) + ANIMATION_EASING.CUBIC(0.75)).toBeCloseTo(1);
	});

	it('both curves increase monotonically', () => {
		for (const ease of [ANIMATION_EASING.CUBIC, ANIMATION_EASING.EXPO]) {
			const samples = Array.from({ length: 11 }, (_, i) => ease(i / 10));
			expect(samples).toEqual([...samples].sort((a, b) => a - b));
		}
	});
});

describe('ANIMATION_STAGGER', () => {
	it('keeps stagger delays short and positive', () => {
		for (const stagger of Object.values(ANIMATION_STAGGER)) {
			expect(stagger).toBeGreaterThan(0);
			expect(stagger).toBeLessThan(1);
		}
	});

	it('orders MICRO below TEXT below DEFAULT below SLOW', () => {
		const { MICRO, TEXT, DEFAULT, SLOW } = ANIMATION_STAGGER;
		expect(MICRO).toBeLessThan(TEXT);
		expect(TEXT).toBeLessThan(DEFAULT);
		expect(DEFAULT).toBeLessThan(SLOW);
	});
});

describe('DOM_SELECTORS', () => {
	const selectors = stringLeaves(DOM_SELECTORS);

	it('is not empty', () => {
		expect(selectors.length).toBeGreaterThan(0);
	});

	it('every entry is a class selector', () => {
		for (const selector of selectors) {
			expect(selector).toMatch(/^\.[a-z][\w-]*$/);
		}
	});

	it('has no duplicate selectors', () => {
		expect(new Set(selectors).size).toBe(selectors.length);
	});
});

describe('CSS_CLASSES', () => {
	const classNames = stringLeaves(CSS_CLASSES);

	it('stores bare class names, never selectors', () => {
		for (const className of classNames) {
			expect(className.startsWith('.')).toBe(false);
			expect(className.startsWith('#')).toBe(false);
			expect(className.trim()).toBe(className);
			expect(className).not.toBe('');
		}
	});

	it('keeps the split-text children tagged for reveal animation', () => {
		expect(CSS_CLASSES.SPLIT.LINE_CHILD).toContain(CSS_CLASSES.ANIMATION.REVEAL_TEXT);
		expect(CSS_CLASSES.SPLIT.WORD_CHILD).toContain(CSS_CLASSES.ANIMATION.REVEAL_TEXT);
	});

	it('matches the reveal selectors in DOM_SELECTORS', () => {
		expect(DOM_SELECTORS.TEXT.REVEAL).toBe(`.${CSS_CLASSES.ANIMATION.REVEAL_TEXT}`);
		expect(DOM_SELECTORS.TEXT.REVEAL_WRAPPER).toBe(`.${CSS_CLASSES.ANIMATION.REVEAL_WRAPPER}`);
	});
});

describe('CSS_TRANSITION_DURATION', () => {
	it('expresses every value as CSS seconds', () => {
		for (const duration of Object.values(CSS_TRANSITION_DURATION)) {
			expect(duration).toMatch(/^\d+(\.\d+)?s$/);
		}
	});
});

describe('TRANSFORM_ORIGIN', () => {
	it('uses two-keyword CSS origins', () => {
		for (const origin of Object.values(TRANSFORM_ORIGIN)) {
			expect(origin).toMatch(/^(top|center|bottom) (left|center|right)$/);
		}
	});
});

describe('OPACITY and SCALE', () => {
	it('bounds numeric opacity between 0 and 1', () => {
		const numeric = Object.values(OPACITY).filter((value) => typeof value === 'number');

		expect(numeric.length).toBeGreaterThan(0);
		for (const value of numeric) {
			expect(value).toBeGreaterThanOrEqual(0);
			expect(value).toBeLessThanOrEqual(1);
		}
		expect(OPACITY.HIDDEN).toBe(0);
		expect(OPACITY.VISIBLE).toBe(1);
	});

	it('formats percentage opacity as CSS percentages', () => {
		expect(OPACITY.PERCENT_0).toBe('0%');
		expect(OPACITY.PERCENT_100).toBe('100%');
	});

	it('keeps scale non-negative with NORMAL as unity', () => {
		for (const value of Object.values(SCALE)) {
			expect(value).toBeGreaterThanOrEqual(0);
		}
		expect(SCALE.NORMAL).toBe(1);
	});
});

describe('DATA_ATTRIBUTES', () => {
	it('prefixes every attribute with data-', () => {
		for (const attribute of Object.values(DATA_ATTRIBUTES)) {
			expect(attribute).toMatch(/^data-[a-z-]+$/);
		}
	});
});
