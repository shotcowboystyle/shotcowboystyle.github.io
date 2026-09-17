/**
 * Controller for the Animaxxing text motion.
 *
 * Owns *when* each builder in `lib/animaxxing/` runs: the above-the-fold
 * headings animate on load as one staggered intro, everything marked
 * `js-reveal-on-scroll` waits for its own ScrollTrigger, and the hero headline
 * picks up the ambient wave once the intro has settled.
 *
 * Targets are hidden before first paint by `.c-animated-text` (see base.css),
 * so any failure in here has to put them back — otherwise the page ships
 * blank text.
 */
import {
	charsRiseIn,
	linesMaskIn,
	wordsSlideIn,
	type SplitRunner,
} from '@/lib/animaxxing/split-entrances';
import { startWave } from '@/lib/animaxxing/wave';
import { debounce } from '@/utils/debounce';
import { prefersReducedMotion } from '@/utils/motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const HIDDEN = '.c-animated-text';
const ON_SCROLL = 'js-reveal-on-scroll';
/** Carries the one ambient effect on the page. */
const HERO_HEADLINE = '#header-headline';

const RUNNERS: ReadonlyArray<readonly [string, SplitRunner]> = [
	['js-split-chars', charsRiseIn],
	['js-split-lines', linesMaskIn],
	['js-split-words', wordsSlideIn],
];

/** Every split class in one selector, so `querySelectorAll` returns DOM order. */
const ALL_SPLITS = RUNNERS.map(([className]) => `.${className}`).join(', ');

/** Seconds between the start of one heading's entrance and the next. */
const INTRO_STAGGER = 0.08;
/** Seconds between ambient wave passes over the hero headline. */
const WAVE_PERIOD = 5;
/** How far up the viewport a scroll-revealed element travels before it plays. */
const REVEAL_START = 'top 85%';

export default class HeadingMotion {
	private intro: gsap.core.Timeline | null = null;
	private triggers: ScrollTrigger[] = [];
	private heading: HTMLElement | null = null;
	private stopWave: (() => void) | null = null;
	private onResize: (() => void) | null = null;
	/** The intro and the wave both split the hero headline; only one may hold it. */
	private introSettled = false;
	private headingInView = false;

	constructor() {
		try {
			this.init();
		} catch (error) {
			/*
			 * `.c-animated-text` is invisible until its entrance runs. If setup
			 * threw, no entrance is coming, so reveal the text and let the error
			 * surface rather than shipping a page of empty headings.
			 */
			this.destroy();
			gsap.set(HIDDEN, { autoAlpha: 1 });
			throw error;
		}
	}

	private init(): void {
		this.heading = document.querySelector<HTMLElement>(HERO_HEADLINE);

		const targets = gsap.utils.toArray<HTMLElement>(ALL_SPLITS);
		const intro = gsap.timeline();
		let introIndex = 0;

		for (const element of targets) {
			const runner = runnerFor(element);

			if (!runner) {
				continue;
			}

			if (element.classList.contains(ON_SCROLL)) {
				this.revealOnScroll(element, runner);
				continue;
			}

			intro.add(runner(element), introIndex * INTRO_STAGGER);
			introIndex++;
		}

		this.intro = intro;
		this.initAmbient(intro);
	}

	private revealOnScroll(element: HTMLElement, runner: SplitRunner): void {
		this.triggers.push(
			ScrollTrigger.create({
				trigger: element,
				start: REVEAL_START,
				once: true,
				onEnter: () => runner(element),
			}),
		);
	}

	/**
	 * The wave is the page's only ambient motion, so it runs on one element and
	 * only while that element is on screen.
	 *
	 * It waits for the intro because both effects split the same heading: a wave
	 * started early is torn out from under itself when the entrance reverts its
	 * own split and restores the heading's original markup.
	 */
	private initAmbient(intro: gsap.core.Timeline): void {
		if (!this.heading || prefersReducedMotion()) {
			return;
		}

		intro.eventCallback('onComplete', () => {
			this.introSettled = true;
			this.setWave(this.headingInView);
		});

		const inView = ScrollTrigger.create({
			trigger: this.heading,
			start: 'top bottom',
			end: 'bottom top',
			onToggle: (self) => {
				this.headingInView = self.isActive;
				this.setWave(this.introSettled && self.isActive);
			},
		});

		// `onToggle` only reports *changes*, and the hero is already on screen on
		// first load, so the opening state has to be read off the trigger.
		this.headingInView = inView.isActive;
		this.triggers.push(inView);

		/*
		 * Width only: the split is measured against the current line breaks, and
		 * mobile browsers fire `resize` on every URL-bar show and hide.
		 */
		let lastWidth = window.innerWidth;

		this.onResize = debounce(() => {
			if (window.innerWidth === lastWidth) {
				return;
			}

			lastWidth = window.innerWidth;

			if (this.stopWave) {
				this.setWave(false);
				this.setWave(true);
			}
		}, 200);

		window.addEventListener('resize', this.onResize);
	}

	private setWave(running: boolean): void {
		if (running === Boolean(this.stopWave) || !this.heading) {
			return;
		}

		if (running) {
			this.stopWave = startWave(this.heading, { period: WAVE_PERIOD });
			return;
		}

		this.stopWave?.();
		this.stopWave = null;
	}

	destroy(): void {
		if (this.onResize) {
			window.removeEventListener('resize', this.onResize);
			this.onResize = null;
		}

		this.setWave(false);

		this.intro?.kill();
		this.intro = null;

		this.triggers.forEach((trigger) => trigger.kill());
		this.triggers = [];
	}
}

function runnerFor(element: HTMLElement): SplitRunner | undefined {
	return RUNNERS.find(([className]) => element.classList.contains(className))?.[1];
}
