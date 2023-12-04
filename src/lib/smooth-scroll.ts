import { isMacOS } from '@/utils/detect';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

export default class SmoothScroll extends Lenis {
	isActive: boolean;
	callbacks: (() => void)[];

	constructor() {
		super({
			duration: 1.2,
			smoothWheel: true,
			// https://www.desmos.com/calculator/brs54l4xou
			easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
			orientation: 'vertical',
			smoothTouch: false,
			touchMultiplier: 2,
			lerp: isMacOS ? 0.4 : 0.1,
		});

		this.isActive = true;
		this.callbacks = [];
	}

	init() {
		const raf = (time: number) => {
			this.raf(time);
			requestAnimationFrame(raf);
		};
		requestAnimationFrame(raf);

		this.on('scroll', () => {
			ScrollTrigger.update();
			this.callbackRaf();
		});

		gsap.ticker.add((time: number) => {
			this.raf(1e3 * time);
		});

		gsap.ticker.lagSmoothing(0);

		document.querySelectorAll<HTMLAnchorElement>('a[href*="#"]').forEach(($linkEl) => {
			if ($linkEl.hash && $linkEl.hash !== '') {
				$linkEl.addEventListener('click', (event: Event) => {
					event.preventDefault();
					const $target = (event.target as HTMLElement).getAttribute('href');
					if ($target) {
						this.to($target);

						if ($target === '#header') {
							history.pushState(
								'',
								document.title,
								window.location.pathname + window.location.search,
							);
						} else {
							window.location.hash = $target;
						}
					}
				});
			}
		});
	}

	scrollLock() {
		this.stop();
	}

	unlockScroll() {
		this.start();
	}

	kill() {
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
		setTimeout(() => this.scrollTo(0, { immediate: true }), 5);
	}

	// resize() {}

	render(time?: number) {
		if (!this.isActive) {
			return;
		}

		this.raf(time);
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
