import { gsap } from 'gsap';

export default class TextReveal {
	DOM: {
		revealTextWrapper: string;
		revealText: string;
	};

	animationDefaults: {
		y: number;
		duration: number;
		ease: string;
		stagger: number;
	} = {
		y: 0,
		duration: 0.5,
		ease: 'power1.out',
		stagger: 0.08,
	};

	constructor() {
		this.DOM = {
			revealTextWrapper: '.js-animation-reveal-text-wrapper',
			revealText: '.js-animation-reveal-text',
		};
	}

	animate() {
		const revealTextEls: HTMLElement[] = gsap.utils.toArray(this.DOM.revealText);
		if (revealTextEls?.length) {
			gsap.set(this.DOM.revealTextWrapper, {
				opacity: '100%',
			});

			revealTextEls.forEach(($textEl) => {
				gsap.to($textEl, this.animationDefaults);
			});
		}
	}
}
