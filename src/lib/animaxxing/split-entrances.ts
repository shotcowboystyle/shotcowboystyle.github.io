/**
 * Animaxxing split entrances.
 *
 * Builders only: they split a target, choreograph the pieces, and put the
 * element back together. They never decide *when* to run — `heading-motion.ts`
 * owns that, and Astro's router owns the page lifecycle around it.
 *
 * Targets need the persistent typography in `.c-animated-text` (kerning off,
 * `text-wrap: normal`) so the split and its revert measure the same.
 */
import { prefersReducedMotion } from '@/utils/motion';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/all';

gsap.registerPlugin(SplitText);

const DURATION = { page: 0.28 } as const;
const EASE = { entrance: 'power2.out' } as const;
const STAGGER = { tight: 0.03, loose: 0.05 } as const;

export type MotionOptions = {
	delay?: number;
	onComplete?: () => void;
};

export type SplitRunner = (
	target: HTMLElement | null,
	options?: MotionOptions,
) => gsap.core.Timeline;

function build(options: MotionOptions): gsap.core.Timeline {
	const timeline = gsap.timeline({ delay: options.delay ?? 0, defaults: { overwrite: 'auto' } });
	if (options.onComplete) {
		timeline.eventCallback('onComplete', options.onComplete);
	}
	return timeline;
}

/**
 * Splits, runs `choreograph`, and reverts afterwards.
 *
 * The settled state is applied first under reduced motion so an element can
 * never be stranded mid-flight.
 *
 * `aria` is left to each runner. Only character splits need `'auto'` — it
 * relabels the element so a screen reader hears the sentence instead of a pile
 * of letters, and it does that with `aria-label`, which axe rightly rejects on
 * a role that cannot carry a name from the author (a bare `<p>`). Word and line
 * pieces read contiguously without it.
 */
function withSplit(
	element: HTMLElement | null,
	options: MotionOptions,
	config: SplitText.Vars,
	choreograph: (split: SplitText, timeline: gsap.core.Timeline) => void,
	settled: gsap.TweenVars = { autoAlpha: 1 },
): gsap.core.Timeline {
	const timeline = build(options);

	if (!element) {
		return timeline;
	}

	if (prefersReducedMotion()) {
		return timeline.set(element, settled);
	}

	const split = SplitText.create(element, config);

	try {
		timeline.set(element, { autoAlpha: 1 });
		choreograph(split, timeline);
	} catch (error) {
		/*
		 * The split exists before the tween that throws, so undoing it here is
		 * the only chance: `onComplete` will never run on a timeline that was
		 * never built, and the heading would stay a pile of wrapper spans.
		 */
		split.revert();
		timeline.kill();
		throw error;
	}

	timeline.eventCallback('onComplete', () => {
		split.revert();
		options.onComplete?.();
	});

	return timeline;
}

/** Characters rise behind per-character masks. Display type only. */
export const charsRiseIn: SplitRunner = (element, options = {}) =>
	withSplit(
		element,
		options,
		{ type: 'chars', mask: 'chars', smartWrap: true, aria: 'auto' },
		(split, timeline) => {
			timeline.from(split.chars, {
				yPercent: 115,
				duration: 0.5,
				ease: 'power3.out',
				stagger: STAGGER.tight,
			});
		},
	);

/**
 * Words swing in from alternating sides, each behind its own mask.
 *
 * The recipe fades the words in as they travel. Masking instead of fading keeps
 * every word at full opacity for its whole trip: text caught part-way through a
 * fade measures as low-contrast grey, which is a real AA failure for however
 * long it lasts, and an automated audit will catch it mid-flight.
 */
export const wordsSlideIn: SplitRunner = (element, options = {}) =>
	withSplit(element, options, { type: 'words', mask: 'words', aria: 'none' }, (split, timeline) => {
		timeline.from(split.words, {
			xPercent: (index: number) => (index % 2 === 0 ? -110 : 110),
			duration: DURATION.page,
			ease: EASE.entrance,
			stagger: STAGGER.loose,
		});
	});

/** Whole lines wiped up behind masks. The most editorial of the family. */
export const linesMaskIn: SplitRunner = (element, options = {}) =>
	withSplit(element, options, { type: 'lines', mask: 'lines', aria: 'none' }, (split, timeline) => {
		timeline.from(split.lines, {
			yPercent: 110,
			duration: DURATION.page,
			ease: 'power3.out',
			stagger: STAGGER.loose,
		});
	});
