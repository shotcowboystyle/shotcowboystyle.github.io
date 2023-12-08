// import { eventBus } from '@/utils/event-bus';
import { gsap } from 'gsap';

export default class LoaderAnimation {
	DOM: {
		loaderWrapper: string;
		loader: string;
	};

	loaderFinished: string = 'loaderFinished';

	constructor() {
		this.DOM = {
			loaderWrapper: '.js-loader-wrapper',
			loader: '.js-loader-item',
		};

		this.init();
	}

	init() {
		gsap.set(this.DOM.loader, { scaleY: 0, opacity: 1 });
		// const loaderWrapper = document.querySelector(this.DOM.loaderWrapper);
		// if (loaderWrapper) {
		// 	loaderWrapper.classList.remove('opacity-0');
		// }
	}

	showLoader() {
		return new Promise((resolve) =>
			gsap.to(this.DOM.loader, {
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
			gsap.to(this.DOM.loader, {
				duration: 1,
				scaleY: 0,
				transformOrigin: 'top right',
				stagger: 0.2,
				delay: 0.3,
				onComplete: resolve,
				// onComplete: () => {
				// 	eventBus.dispatch(this.loaderFinished, { isLoaded: true });
				// 	resolve(true);
				// },
			}),
		);
	}
}
