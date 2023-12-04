import { debounce } from '@/utils/debounce';

export class Viewport {
	constructor() {
		this.resize();

		window.addEventListener('resize', () => debounce(this.setMobileVhUnit, 200));
	}

	resize() {
		this.setMobileVhUnit();
	}

	setMobileVhUnit() {
		/* Alternative to 100 vh on mobile devices */
		/* https://css-tricks.com/the-trick-to-viewport-units-on-mobile/ */
		/* https://chanind.github.io/javascript/2019/09/28/avoid-100vh-on-mobile-web.html */
		const vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--100vh', `${vh}px`);
	}
}
