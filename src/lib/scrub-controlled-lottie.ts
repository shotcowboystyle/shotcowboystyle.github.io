import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import type { AnimationItem } from 'lottie-web';
import lottie from 'lottie-web';

gsap.registerPlugin(ScrollTrigger);

export default class ScrubControlledAnimation {
	DOM: {
		animationWrapper: string;
		animation: string;
	};
	modules: NodeListOf<HTMLElement>;

	constructor() {
		this.DOM = {
			animationWrapper: '.js-scrub-controlled-animation-wrapper',
			animation: '.js-scrub-controlled-animation',
		};

		this.modules = document.querySelectorAll<HTMLElement>(this.DOM.animationWrapper);
	}

	init() {
		console.log('ScrubControlledAnimation init()');
		if (this.modules?.length) {
			this.modules.forEach(($module) => {
				this.setup($module);
			});
		}
	}

	setup($moduleEl: HTMLElement) {
		const animationEl = $moduleEl.querySelector<HTMLElement>(this.DOM.animation);
		if (animationEl) {
			const autoplay = animationEl.getAttribute('data-animation-autoplay') != null ? true : false;
			const loop = animationEl.getAttribute('data-animation-loop') != null ? true : false;
			const path = animationEl.getAttribute('data-animation-source');

			const lottieAnimationOptions = {
				container: animationEl,
				loop,
				autoplay,
				path,
				rendererSettings: {
					progressiveLoad: true,
				},
			};

			/**
			 *
			 */
			const lottieAnimation: AnimationItem = lottie.loadAnimation(lottieAnimationOptions);
			if (!autoplay) {
				lottieAnimation.addEventListener('DOMLoaded', () => {
					this.playAnimation(lottieAnimation, $moduleEl);
				});
			}
		}
	}

	playAnimation(animation: AnimationItem, animationWrapper: HTMLElement) {
		ScrollTrigger.create({
			trigger: animationWrapper,
			start: 'top center',
			end: 'bottom top',
			toggleActions: 'play none none reset',
			onEnter: () => animation.play(),
			onLeave: () => animation.stop(),
		});
	}
}
