import { EventHandlerRegistry } from '@/utils/disposable';
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
	scrollTrigger?: ScrollTrigger;
	domLoadedHandler?: () => void;
}

export default class ScrubControlledAnimation {
	DOM: {
		module: string;
	};
	modules: NodeListOf<HTMLElement>;
	animations: Map<string, AnimationComponent>;
	eventRegistry: EventHandlerRegistry;

	constructor() {
		this.DOM = {
			module: '.js-lottie-animation',
		};

		this.modules = document.querySelectorAll(this.DOM.module);
		this.animations = new Map<string, AnimationComponent>();
		this.eventRegistry = new EventHandlerRegistry();

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

		const controlledAnimation: AnimationComponent = {
			animationItem: animation,
			initialState,
			playControl,
			animationCompleted: true,
			triggerTarget,
		};

		if (playControl !== 'autoplay') {
			// Store handler reference for proper cleanup
			const domLoadedHandler = () => this.initEvents(name, controlledAnimation, animation);
			controlledAnimation.domLoadedHandler = domLoadedHandler;
			animation.addEventListener('DOMLoaded', domLoadedHandler);
		}

		this.animations.set(name, controlledAnimation);
	}

	initEvents(
		animationName: string,
		animationComponent: AnimationComponent,
		animationItem: AnimationItem,
	) {
		// Remove DOMLoaded handler after it fires
		if (animationComponent.domLoadedHandler) {
			animationItem.removeEventListener('DOMLoaded', animationComponent.domLoadedHandler);
			animationComponent.domLoadedHandler = undefined;
		}

		if (animationComponent.initialState > 0) {
			const { totalFrames } = animationComponent.animationItem;
			animationComponent.animationItem.goToAndStop(
				Math.floor(totalFrames * (animationComponent.initialState / 100)),
				true,
			);
		}

		if (animationComponent.triggerTarget) {
			if (animationComponent.playControl === 'hover') {
				// Use EventHandlerRegistry for proper cleanup
				const completeHandler = () => this.onComplete(animationName);
				const mouseenterHandler = () => this.hoverAnimation(animationName);

				this.eventRegistry.register(
					animationComponent.animationItem as unknown as EventTarget,
					'complete',
					completeHandler as EventListener,
				);
				this.eventRegistry.register(
					animationComponent.triggerTarget,
					'mouseenter',
					mouseenterHandler as EventListener,
				);
			} else if (animationComponent.playControl === 'scroll') {
				this.scrubAnimation(animationName);
			}
		}
	}

	scrubAnimation(animationName: string) {
		const animationComponent = this.animations.get(animationName);
		if (animationComponent) {
			// Store ScrollTrigger reference for proper cleanup
			const scrollTrigger = ScrollTrigger.create({
				trigger: animationComponent.triggerTarget,
				start: 'top center',
				end: 'bottom top',
				toggleActions: 'play none none reset',
				onEnter: () => animationComponent.animationItem.play(),
				onLeave: () => animationComponent.animationItem.stop(),
			});

			animationComponent.scrollTrigger = scrollTrigger;
			this.animations.set(animationName, animationComponent);
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
		// Clean up all event listeners using EventHandlerRegistry
		this.eventRegistry.dispose();

		// Clean up animations and ScrollTriggers
		for (const [, animationComponent] of this.animations) {
			// Remove DOMLoaded handler if it hasn't fired yet
			if (animationComponent.domLoadedHandler) {
				animationComponent.animationItem.removeEventListener(
					'DOMLoaded',
					animationComponent.domLoadedHandler,
				);
			}

			// Kill ScrollTrigger instances
			if (animationComponent.scrollTrigger) {
				animationComponent.scrollTrigger.kill();
			}

			// Destroy Lottie animation instances
			animationComponent.animationItem.destroy();
		}

		// Clear animations map
		this.animations.clear();
	}
}
