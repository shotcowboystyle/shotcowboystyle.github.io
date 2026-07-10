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

	private tweens: gsap.core.Tween[] = [];

	constructor() {
		this.DOM = {
			revealTextWrapper: '.js-animation-reveal-text-wrapper',
			revealText: '.js-animation-reveal-text',
		};
	}

	animate() {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		gsap.set(this.DOM.revealTextWrapper, { opacity: '100%' });

		if (prefersReducedMotion) {
			gsap.set(this.DOM.revealText, { y: 0, clearProps: 'transform' });
			return;
		}

		const revealTextEls: HTMLElement[] = gsap.utils.toArray(this.DOM.revealText);
		if (revealTextEls?.length) {
			revealTextEls.forEach(($textEl) => {
				this.tweens.push(gsap.to($textEl, this.animationDefaults));
			});
		}
	}

	destroy() {
		this.tweens.forEach((tween) => tween.kill());
		this.tweens = [];
	}
}
