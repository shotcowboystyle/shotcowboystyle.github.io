import InjectContactInfo from '@/lib/inject-contact-info';
import ScrubControlledAnimation from '@/lib/scrub-controlled-lottie';
import SmoothScroll from '@/lib/smooth-scroll';
import { prefersReducedMotion } from '@/utils/motion';
import { typedEventBus as eventBus } from '@/utils/typed-event-bus';

export default class Landing {
	scrubControlledAnimation: ScrubControlledAnimation | null;
	injectContactInfo: InjectContactInfo | null;
	smoothScroll: SmoothScroll | null;

	constructor() {
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
		document.addEventListener('astro:after-preparation', () => this.handleOnPreparationEnd());
		document.addEventListener('astro:after-swap', () => this.handleOnSwapEnd());
		eventBus.on('loaderFinished', () => {
			eventBus.dispatch('landingLoaded', {});
		});
	}

	render() {
		this.scrubControlledAnimation = new ScrubControlledAnimation();
		this.injectContactInfo = new InjectContactInfo();

		/**
		 * Lenis hijacks the wheel and animates anchor jumps over three seconds,
		 * which is exactly the kind of motion `prefers-reduced-motion` is for.
		 * Skipping construction leaves native scrolling and native in-page
		 * anchor navigation, both of which work without any of this.
		 */
		this.smoothScroll = prefersReducedMotion() ? null : new SmoothScroll();
	}

	handleOnPreparationEnd() {
		this.smoothScroll?.kill();
		this.scrubControlledAnimation?.destroy();
	}

	handleOnSwapEnd() {
		this.render();
	}
}
