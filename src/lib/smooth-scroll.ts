import { EventHandlerRegistry } from '@/utils/disposable';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export default class SmoothScroll extends Lenis {
	DOM: {
		scrollLink: string;
	};
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
			// No `lerp`: Lenis ignores it whenever `duration` and `easing` are set.
		});

		this.DOM = {
			scrollLink: '.scroll-link',
		};

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

		this.on('scroll', ScrollTrigger.update);

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
}
