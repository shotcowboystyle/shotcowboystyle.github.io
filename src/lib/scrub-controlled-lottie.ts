import { EventHandlerRegistry } from '@/utils/disposable';
import { ancestorAt } from '@/utils/dom';
import { prefersReducedMotion } from '@/utils/motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import type { AnimationItem } from 'lottie-web';
/*
 * The light build is the SVG renderer without expression support, about half
 * the full player. None of the animations in `public/animation/` use
 * expressions; switch back to `lottie-web` if one ever does.
 */
import lottie from 'lottie-web/build/player/lottie_light';

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
	reducedMotion: boolean;

	constructor() {
		this.DOM = {
			module: '.js-lottie-animation',
		};

		this.modules = document.querySelectorAll(this.DOM.module);
		this.animations = new Map<string, AnimationComponent>();
		this.eventRegistry = new EventHandlerRegistry();
		this.reducedMotion = prefersReducedMotion();

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

		const autoplay = playControl === 'autoplay' && !this.reducedMotion;
		/*
		 * A looping autoplay mount renders every frame for as long as the page is
		 * open, so it plays only while its section is on screen.
		 */
		const playInView = autoplay && loop;

		const lottieAnimationOptions = {
			name,
			container: container,
			loop: loop && !this.reducedMotion,
			autoplay: autoplay && !playInView,
			path,
			rendererSettings: {
				progressiveLoad: true,
			},
		};

		/**
		 *
		 */
		const animation = lottie.loadAnimation(lottieAnimationOptions);

		const triggerTarget = ancestorAt(container, target);

		const controlledAnimation: AnimationComponent = {
			animationItem: animation,
			initialState,
			playControl,
			animationCompleted: true,
			triggerTarget,
		};

		/**
		 * Under reduced motion even the autoplay mounts need the DOMLoaded
		 * hook, so they can be parked on a static frame rather than left as an
		 * empty box where an illustration should be.
		 */
		if (playControl !== 'autoplay' || this.reducedMotion) {
			// Store handler reference for proper cleanup
			const domLoadedHandler = () => this.initEvents(name, controlledAnimation, animation);
			controlledAnimation.domLoadedHandler = domLoadedHandler;
			animation.addEventListener('DOMLoaded', domLoadedHandler);
		}

		/*
		 * The section, not the container: the hero's container sits in a sticky
		 * plate, whose own box is a poor measure of when it has scrolled away.
		 * `onToggle` only reports changes, so the opening state is read off the
		 * trigger. Calling `play()` before the JSON loads is fine; Lottie starts
		 * advancing once it has.
		 */
		if (playInView) {
			const inView = ScrollTrigger.create({
				trigger: container.closest('section') ?? container,
				start: 'top bottom',
				end: 'bottom top',
				onToggle: (self) => (self.isActive ? animation.play() : animation.pause()),
			});
			if (inView.isActive) {
				animation.play();
			}
			controlledAnimation.scrollTrigger = inView;
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

		/**
		 * Static frame rendered, no playback wired up: no autoplay loop, no
		 * scroll scrub and no hover replay.
		 */
		if (this.reducedMotion) {
			if (animationComponent.initialState === 0) {
				animationComponent.animationItem.goToAndStop(0, true);
			}
			return;
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
