/**
 * Animaxxing wave — the one ambient effect on the home page.
 *
 * Splits a heading into letters and, every few seconds, ripples a small move
 * across them left to right the way a crowd does the wave. Each pass picks a
 * different move and every letter ends exactly where it started, so the line
 * never drifts.
 *
 * Transform moves only. The recipe's weight moves are omitted: the hero is
 * painted with `background-clip: text`, and animating the weight axis reflows
 * glyph advances underneath that gradient.
 */
import { prefersReducedMotion } from '@/utils/motion';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/all';

gsap.registerPlugin(SplitText);

/** Delay between neighboring letters starting their move. */
const RIPPLE = 0.03;
/** Each letter is back at rest this many seconds after it starts. */
const LETTER_TIME = 0.25;

const rnd = gsap.utils.random;

type Move = (chars: HTMLElement[]) => gsap.core.Timeline;

/**
 * One out-and-back tween per letter, staggered along the line. The repeat and
 * yoyo live inside the stagger so each letter turns around on its own
 * schedule; at the top level they would send the wave back in reverse.
 */
function ripple(chars: HTMLElement[], vars: gsap.TweenVars, ease = 'sine.inOut') {
	return gsap
		.timeline()
		.to(chars, {
			...vars,
			duration: LETTER_TIME / 2,
			ease,
			stagger: { each: RIPPLE, yoyo: true, repeat: 1 },
		})
		.set(chars, { clearProps: 'transform,opacity' });
}

/** A one-way tween per letter, for moves that end where they began anyway. */
function sweep(chars: HTMLElement[], vars: gsap.TweenVars, ease = 'power2.inOut') {
	return gsap
		.timeline()
		.to(chars, { ...vars, duration: LETTER_TIME, ease, stagger: RIPPLE })
		.set(chars, { clearProps: 'transform,opacity' });
}

const MOVES: Move[] = [
	// Hop: each letter lifts and lands.
	(chars) => ripple(chars, { y: -14 }, 'power2.out'),
	// Breathe: a swell from the baseline.
	(chars) => ripple(chars, { scale: 1.07, transformOrigin: '50% 100%' }),
	// Lean: a nod to the right and back.
	(chars) => ripple(chars, { rotation: 7, transformOrigin: '50% 100%' }),
	// Flip: a full turn about the vertical axis, no perspective, so the letter
	// folds to a line and back.
	(chars) => sweep(chars, { rotationY: 360, transformOrigin: '50% 50%' }),
	// Shear: a quick italic slant.
	(chars) => ripple(chars, { skewX: 12 }, 'power2.inOut'),
	// Squash: pressed flat and released.
	(chars) => ripple(chars, { scaleY: 0.82, transformOrigin: '50% 100%' }, 'power2.inOut'),
	// Twist: each letter swells with its own small turn, then back.
	(chars) => ripple(chars, { scale: 1.1, rotation: () => rnd(-12, 12) }, 'power2.inOut'),
];

export type WaveOptions = {
	/** Seconds from the start of one wave to the start of the next. */
	period?: number;
};

/**
 * Starts waving the heading's letters. Returns an idempotent stop function
 * that kills the scheduled cycle, the running move, and the split.
 */
export function startWave(heading: HTMLElement, { period = 5 }: WaveOptions = {}): () => void {
	if (prefersReducedMotion()) {
		return () => {};
	}

	const split = SplitText.create(heading, { type: 'chars,words', aria: 'auto' });
	const chars = split.chars as HTMLElement[];

	let clock: gsap.core.Tween | undefined;
	let current: gsap.core.Timeline | undefined;
	let stopped = false;

	const stop = () => {
		if (stopped) {
			return;
		}
		stopped = true;
		clock?.kill();
		current?.kill();
		gsap.set(chars, { clearProps: 'willChange' });
		split.revert();
	};

	try {
		chars.sort((a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left);
		gsap.set(chars, { willChange: 'transform' });

		// Shuffled so each cycle plays in a fresh order, never repeating one
		// move across the seam between decks.
		let deck = gsap.utils.shuffle([...MOVES]);
		let index = 0;

		const wave = () => {
			const move = deck[index];
			index++;

			if (index >= deck.length) {
				deck = gsap.utils.shuffle([...MOVES]);
				if (deck[0] === move && deck.length > 1) {
					deck.push(deck.shift() as Move);
				}
				index = 0;
			}

			current?.kill();
			current = move ? move(chars) : undefined;
		};

		clock = gsap.delayedCall(period, () => {
			wave();
			clock?.restart(true);
		});
	} catch (error) {
		stop();
		throw error;
	}

	return stop;
}
