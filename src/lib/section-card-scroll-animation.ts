import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

/*
 * The exit and the background drift are lifted from the reference site's scroll
 * interactions, over a 250vh plate wrapper. The plate holds for half a
 * viewport, then shrinks and fades across 1.125 viewports, linearly, as the
 * next plate slides up over it. The blur trails, starting a quarter viewport
 * into the shrink.
 */
const EXIT_LENGTH = 1.125;
const BLUR_START = 0.25 / EXIT_LENGTH;

/*
 * ponytail: blur only where the plate-turn tilt runs (hover-capable, fine
 * pointer). A scrubbed filter on a full-screen layer is the kind of compositing
 * load that blacked iOS Safari out at the Experiments plate (ce2f96e), so touch
 * devices get the shrink and fade without it.
 */
const canBlur = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/*
 * The art and the screenshot settle as the plate rises into place: the art
 * eases out of a zoom, the screenshot turns upright. Only the entering half of
 * the reference's drift is played: once the plate sticks it stays put, and by
 * the time it scrolls on it is under the next plate.
 */
const ENTRANCES: [selector: string, from: gsap.TweenVars, to: gsap.TweenVars][] = [
	['.js-card-bg', { scale: 1.3, yPercent: -15 }, { scale: 1.2, yPercent: 0 }],
	['.js-card-shot', { rotation: -15, yPercent: -10 }, { rotation: 0, yPercent: 5 }],
];

export default class SectionCardScrollAnimation {
	DOM: {
		sectionCardWrapper: string;
		sectionCard: string;
	};

	modules: NodeListOf<HTMLElement>;

	private tweens: gsap.core.Animation[] = [];

	constructor() {
		this.DOM = {
			sectionCardWrapper: '.js-section-card-wrapper',
			sectionCard: '.js-section-card',
		};

		this.modules = document.querySelectorAll<HTMLElement>(this.DOM.sectionCardWrapper);

		this.init();
	}

	init() {
		if (this.modules.length) {
			for (const $el of this.modules) {
				this.setup($el);
			}
		}
	}

	setup($el: HTMLElement) {
		const $card = $el.querySelector<HTMLElement>(this.DOM.sectionCard);
		if ($card) {
			const blur = canBlur();
			const willChange = blur ? 'transform, opacity, filter' : 'transform, opacity';

			const timeline = gsap.timeline({
				defaults: { ease: 'none' },
				scrollTrigger: {
					trigger: $el,
					start: () => `bottom bottom+=${window.innerHeight}`,
					end: () => `+=${window.innerHeight * EXIT_LENGTH}`,
					scrub: true,
					invalidateOnRefresh: true,
					onToggle: (self) => {
						$card.style.willChange = self.isActive ? willChange : 'auto';
					},
				},
			});

			timeline.to($card, { scale: 0.5, autoAlpha: 0, duration: 1 }, 0);
			if (blur) {
				timeline.fromTo(
					$card,
					{ filter: 'blur(0px)' },
					{ filter: 'blur(20px)', duration: 1 - BLUR_START },
					BLUR_START,
				);
			}
			this.tweens.push(timeline);
		}

		for (const [selector, from, to] of ENTRANCES) {
			const $target = $el.querySelector<HTMLElement>(selector);
			if ($target) {
				this.tweens.push(
					gsap.fromTo($target, from, {
						...to,
						ease: 'none',
						scrollTrigger: { trigger: $el, start: 'top bottom', end: 'top top', scrub: true },
					}),
				);
			}
		}
	}

	destroy() {
		this.tweens.forEach((tween) => {
			tween.scrollTrigger?.kill();
			tween.kill();
		});
		this.tweens = [];
	}
}
