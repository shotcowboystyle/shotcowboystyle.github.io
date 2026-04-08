import { isMacOS } from '@/utils/detect';
import { EventHandlerRegistry } from '@/utils/disposable';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export default class SmoothScroll extends Lenis {
	DOM: {
		scrollLink: string;
	};
	isActive: boolean;
	callbacks: (() => void)[];
	scrollLinks: NodeListOf<HTMLAnchorElement>;
	private eventRegistry: EventHandlerRegistry;
	private gsapTickerCallback: ((time: number) => void) | null = null;

	constructor() {
		super({
			duration: 1.2,
			smoothWheel: true,
			// https://www.desmos.com/calculator/brs54l4xou
			easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
			orientation: 'vertical',
			touchMultiplier: 2,
			lerp: isMacOS ? 0.4 : 0.1,
		});

		this.DOM = {
			scrollLink: '.scroll-link',
		};

		this.isActive = true;
		this.time = 0;

		this.callbacks = [];
		this.scrollLinks = document.querySelectorAll<HTMLAnchorElement>(this.DOM.scrollLink);

		this.eventRegistry = new EventHandlerRegistry();

		this.init();
	}

	init() {
		// Single driver: GSAP ticker drives Lenis (removes redundant manual RAF loop)
		this.gsapTickerCallback = (time: number) => {
			this.raf(1e3 * time);
		};
		gsap.ticker.add(this.gsapTickerCallback);
		gsap.ticker.lagSmoothing(0);

		this.on('scroll', () => {
			ScrollTrigger.update();
			this.callbackRaf();
		});

		this.initEvents();
	}

	initEvents() {
		if (this.scrollLinks?.length) {
			this.scrollLinks.forEach(($link) => {
				const handler = (event: Event) => this.onLinkClick(event);
				this.eventRegistry.register($link, 'click', handler);
			});
		}
	}

	removeEvents() {
		this.eventRegistry.dispose();
	}

	onLinkClick(event: Event) {
		event.preventDefault();

		const $target = (event.target as HTMLElement).getAttribute('href');
		if ($target) {
			this.to($target);

			if ($target === '#header') {
				history.pushState('', document.title, window.location.pathname + window.location.search);
			} else {
				window.location.hash = $target;
			}
		}
	}

	scrollLock() {
		this.stop();
	}

	unlockScroll() {
		this.start();
	}

	kill() {
		// Stop Lenis scrolling before cleanup
		this.stop();

		// Remove GSAP ticker callback
		if (this.gsapTickerCallback) {
			gsap.ticker.remove(this.gsapTickerCallback);
			this.gsapTickerCallback = null;
		}

		// Remove all event listeners
		this.removeEvents();

		// Destroy Lenis instance
		this.destroy();
	}

	to($target: string) {
		this.scrollTo($target, {
			offset: 0,
			duration: 3,
			// https://easings.net
			easing: (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2),
			immediate: false,
		});
	}

	scrollZero() {
		// Allow microtask/DOM update to complete before forcing immediate scroll to top
		setTimeout(() => this.scrollTo(0, { immediate: true }), 5);
	}

	// resize() {}

	render(time?: number) {
		if (!this.isActive) {
			return;
		}

		this.raf(time ?? 0);
	}

	set active(value: boolean) {
		this.isActive = value;
	}

	callbackRaf() {
		// call this in scroll method
		this.callbacks.forEach((cb) => cb());
	}

	subscribe(callback: () => unknown) {
		this.callbacks.push(callback);
	}

	unsubscribe(callback: () => unknown) {
		this.callbacks = this.callbacks.filter((cb) => cb !== callback);
	}

	unsubscribeAll() {
		this.callbacks = [];
	}
}
