import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

export default class SectionCardScrollAnimation {
	DOM: {
		sectionCardWrapper: string;
		sectionCard: string;
	};

	modules: NodeListOf<HTMLElement>;

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
			gsap.to($card, {
				scale: 0.5,
				autoAlpha: 0,
				filter: 'blur(20px)',
				scrollTrigger: {
					trigger: $el,
					start: `bottom bottom+=${$card?.offsetHeight}`,
					end: `+=${window.innerHeight}`,
					scrub: true,
					invalidateOnRefresh: true,
				},
			});
		}
	}
}
