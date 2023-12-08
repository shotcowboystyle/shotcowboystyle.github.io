import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import type { AnimationItem } from 'lottie-web';
import lottie from 'lottie-web';

gsap.registerPlugin(ScrollTrigger);

type AnimationPlayControl = 'autoplay' | 'hover' | 'scroll';

interface AnimationComponent {
	animationItem: AnimationItem;
	playControl: AnimationPlayControl;
	animationCompleted: boolean;
	initialState: number;
	triggerTarget: HTMLElement | null;
}

export default class ScrubControlledAnimation {
	DOM: {
		module: string;
	};
	modules: NodeListOf<HTMLElement>;
	animations: Map<string, AnimationComponent>;

	constructor() {
		this.DOM = {
			module: '.js-lottie-animation',
		};

		this.modules = document.querySelectorAll(this.DOM.module);
		this.animations = new Map<string, AnimationComponent>();

		this.init();
	}

	init() {
		if (this.modules.length) {
			this.modules.forEach(($el) => {
				this.setup($el);
			});
		}
	}

	setup(container: HTMLElement) {
		const path = container.getAttribute('data-animation-source');
		if (!path) {
			throw new Error('A path to a lottie animation is required.');
		}

		const name = container.getAttribute('data-animation-name');
		if (!name) {
			throw new Error('A name for a lottie animation is required.');
		}

		const target = Number(container.getAttribute('data-animation-target') ?? 0);
		const loop = container.getAttribute('data-animation-loop') != null ? true : false;
		const initialState = Number(container.getAttribute('data-animation-initial-state') ?? 0);
		const playControl =
			(container.getAttribute('data-animation-play-control') as AnimationPlayControl | null) ??
			'autoplay';

		const lottieAnimationOptions = {
			name,
			container: container,
			loop,
			autoplay: playControl === 'autoplay',
			path,
			rendererSettings: {
				progressiveLoad: true,
			},
		};

		/**
		 *
		 */
		const animation = lottie.loadAnimation(lottieAnimationOptions);

		let triggerTarget = null;
		if (target > 0) {
			for (let i = target; i--; ) {
				triggerTarget = container.parentElement;
			}
		}

		const controlledAnimation = {
			animationItem: animation,
			initialState,
			playControl,
			animationCompleted: true,
			triggerTarget,
		};

		if (playControl !== 'autoplay') {
			animation.addEventListener('DOMLoaded', () =>
				this.initEvents(name, controlledAnimation, animation),
			);
		}

		this.animations.set(name, controlledAnimation);
	}

	initEvents(
		animationName: string,
		animationComponent: AnimationComponent,
		animationItem: AnimationItem,
	) {
		animationItem?.removeEventListener('DOMLoaded', () =>
			this.initEvents(animationName, animationComponent, animationItem),
		);

		if (animationComponent.initialState > 0) {
			const { totalFrames } = animationComponent.animationItem;
			animationComponent.animationItem.goToAndStop(
				Math.floor(totalFrames * (animationComponent.initialState / 100)),
				true,
			);
		}

		if (animationComponent.triggerTarget) {
			if (animationComponent.playControl === 'hover') {
				animationComponent.animationItem.addEventListener('complete', () =>
					this.onComplete(animationName),
				);
				animationComponent.triggerTarget.addEventListener('mouseenter', () =>
					this.hoverAnimation(animationName),
				);
			} else if (animationComponent.playControl === 'scroll') {
				this.scrubAnimation(animationName);
			}
		}
	}

	scrubAnimation(animationName: string) {
		const animationComponent = this.animations.get(animationName);
		if (animationComponent) {
			ScrollTrigger.create({
				trigger: animationComponent.triggerTarget,
				start: 'top center',
				end: 'bottom top',
				toggleActions: 'play none none reset',
				onEnter: () => animationComponent.animationItem.play(),
				onLeave: () => animationComponent.animationItem.stop(),
			});
		}
	}

	hoverAnimation(animationName: string) {
		const animationComponent = this.animations.get(animationName);
		if (animationComponent?.animationCompleted) {
			animationComponent.animationItem.playSegments(
				[0, animationComponent.animationItem.totalFrames],
				true,
			);
			this.animations.set(animationName, { ...animationComponent, animationCompleted: false });
		}
	}

	onComplete(componentName: string) {
		const animationComponent = this.animations.get(componentName);
		if (animationComponent) {
			this.animations.set(componentName, { ...animationComponent, animationCompleted: true });
		}
	}

	destroy() {
		for (const [componentName, animationComponent] of this.animations) {
			animationComponent.animationItem.removeEventListener('complete', () =>
				this.onComplete(componentName),
			);
			animationComponent.triggerTarget?.removeEventListener('mouseenter', () =>
				this.hoverAnimation(componentName),
			);
		}
	}
}
