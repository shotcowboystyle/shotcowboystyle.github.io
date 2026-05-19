import { Swiper } from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';

export default class Slider {
	DOM: {
		container: string;
	};

	constructor() {
		this.DOM = {
			container: '.js-animation-swiper',
		};

		this.init();
	}

	init() {
		const swiperWrapper = document.querySelector(this.DOM.container);
		if (swiperWrapper) {
			new Swiper(this.DOM.container, {
				modules: [Navigation],
				loop: true,
				slidesPerView: 1,
				navigation: {
					nextEl: '#next',
					prevEl: '#prev',
				},
			});
		}
	}
}
