import InjectContactInfo from '@/lib/inject-contact-info';
import ScrubControlledAnimation from '@/lib/scrub-controlled-lottie';
import SmoothScroll from '@/lib/smooth-scroll';
// import { Viewport } from '@/lib/viewport';
import { typedEventBus as eventBus } from '@/utils/typed-event-bus';

export default class Landing {
	// viewport: Viewport;
	scrubControlledAnimation: ScrubControlledAnimation | null;
	injectContactInfo: InjectContactInfo | null;
	smoothScroll: SmoothScroll | null;

	// body: HTMLElement | null;
	// time: number;

	constructor() {
		// this.body = document.querySelector('body');
		// this.viewport = new Viewport();
		// this.time = 0;

		this.scrubControlledAnimation = null;
		this.injectContactInfo = null;

		this.smoothScroll = null;

		this.init();
		this.initEvents();
	}

	async init() {
		this.render();
	}

	initEvents() {
		// new ResizeObserver((entry) => this.resize(entry[0])).observe(this.body!);
		document.addEventListener('astro:after-preparation', () => this.handleOnPreparationEnd());
		document.addEventListener('astro:after-swap', () => this.handleOnSwapEnd());
		eventBus.on('loaderFinished', () => {
			eventBus.dispatch('landingLoaded', {});
		});
	}

	// resize({ contentRect }) {
	// resize({ contentRect }: ResizeObserverEntry) {
	// 	this.viewport?.resize();
	// }

	render() {
		this.scrubControlledAnimation = new ScrubControlledAnimation();
		this.injectContactInfo = new InjectContactInfo();
		this.smoothScroll = new SmoothScroll();
		// window.requestAnimationFrame(this.render.bind(this));
	}

	handleOnPreparationEnd() {
		this.smoothScroll?.kill();
		this.scrubControlledAnimation?.destroy();
		// eventBus.remove(this.smoothScroll.loaderFinished, () => this.textReveal?.animate());
		// document.removeEventListener(TRANSITION_AFTER_PREPARATION, () => this.handleOnPreparationEnd());
	}

	handleOnSwapEnd() {
		this.render();
	}
}
