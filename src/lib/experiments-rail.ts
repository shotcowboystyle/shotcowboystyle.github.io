import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

/**
 * The Experiments plate's rail travels sideways while the plate holds. The pan
 * runs from the moment the plate pins until the stack's own exit tween takes
 * over for the last viewport (see `section-card-scroll-animation.ts`), so the
 * last tile has fully arrived before the plate starts to recede.
 */
export default class ExperimentsRail {
	constructor() {
		const wrapper = document.querySelector<HTMLElement>('.js-experiments');
		const plate = wrapper?.querySelector<HTMLElement>('.js-section-card');
		const viewport = wrapper?.querySelector<HTMLElement>('.js-experiments-viewport');
		const rail = wrapper?.querySelector<HTMLElement>('.js-experiments-rail');
		if (!wrapper || !plate || !viewport || !rail) return;

		plate.classList.add('is-panning');

		const distance = () => Math.max(0, rail.scrollWidth - viewport.clientWidth);
		const holdLength = () => wrapper.offsetHeight - 2 * window.innerHeight;

		const tween = gsap.to(rail, {
			x: () => -distance(),
			ease: 'none',
			scrollTrigger: {
				trigger: wrapper,
				start: 'top top',
				end: () => `+=${holdLength()}`,
				scrub: true,
				invalidateOnRefresh: true,
			},
		});

		/*
		 * Keyboard: Tab moves through the tiles, so the page scrolls to the point
		 * in the pan where the focused tile sits in view. Instant, because the
		 * reader asked for that tile, not for a ride to it.
		 */
		rail.addEventListener('focusin', (event) => {
			const tile = (event.target as HTMLElement).closest('li');
			const trigger = tween.scrollTrigger;
			if (!tile || !trigger) return;

			const progress = distance() ? Math.min(1, tile.offsetLeft / distance()) : 0;
			window.scrollTo({
				top: trigger.start + progress * (trigger.end - trigger.start),
				behavior: 'instant',
			});
		});
	}
}
