import { gsap } from 'gsap';

export default class LoaderAnimation {
	DOM: {
		loaderItem: string;
	};

	// afterLoader: Event;

	constructor() {
		this.DOM = {
			loaderItem: '.transition-container-list-item',
		};

		// this.afterLoader = new Event('afterLoader');
	}

	showLoader() {
		return new Promise((resolve) =>
			gsap.to(this.DOM.loaderItem, {
				duration: 0.6,
				scaleY: 1,
				transformOrigin: 'bottom left',
				stagger: 0.2,
				onComplete: resolve,
			}),
		);
	}

	hideLoader() {
		return new Promise((resolve) =>
			gsap.to('.transition-container li', {
				duration: 1,
				scaleY: 0,
				transformOrigin: 'top right',
				stagger: 0.2,
				delay: 0.3,
				onComplete: resolve,
			}),
		);
	}
}
