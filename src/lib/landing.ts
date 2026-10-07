import InjectContactInfo from '@/lib/inject-contact-info';
import ScrubControlledAnimation from '@/lib/scrub-controlled-lottie';
import SmoothScroll from '@/lib/smooth-scroll';
import { prefersReducedMotion } from '@/utils/motion';

export default class Landing {
	scrubControlledAnimation: ScrubControlledAnimation;
	injectContactInfo: InjectContactInfo;
	smoothScroll: SmoothScroll | null;

	constructor() {
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
}
