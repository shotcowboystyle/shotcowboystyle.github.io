// import ScrubControlledAnimation from '@/lib/scrub-controlled-lottie';
import LoaderAnimation from '@/lib/loader.animation';
import SmoothScroll from '@/lib/smooth-scroll';
// import TextLinesReveal from '@/lib/text-lines-reveal';
import { Viewport } from '@/lib/viewport';
import { delay } from '@/utils/delay';
import {
	isTransitionBeforePreparationEvent,
	TRANSITION_AFTER_PREPARATION,
	TRANSITION_AFTER_SWAP,
	TRANSITION_BEFORE_PREPARATION,
	type TransitionBeforePreparationEvent,
} from 'astro:transitions/client';

export default class App {
	viewport: Viewport;
	smoothScroll: SmoothScroll | null;
	loaderAnimation: LoaderAnimation | null;
	// textLinesReveal: TextLinesReveal | null;
	// scrubControlledAnimation: ScrubControlledAnimation | null;

	body: HTMLElement | null;
	time: number;

	constructor() {
		this.body = document.querySelector('body');
		this.viewport = new Viewport();
		this.time = 0;

		this.smoothScroll = null;
		this.loaderAnimation = null;
		// this.textLinesReveal = null;
		// this.scrubControlledAnimation = null;

		this.init();
	}

	init() {
		this.smoothScroll = new SmoothScroll();
		this.loaderAnimation = new LoaderAnimation();
		// this.textLinesReveal = new TextLinesReveal();
		// this.scrubControlledAnimation = new ScrubControlledAnimation();

		this.render();
		this.initEvents();
	}

	initEvents() {
		new ResizeObserver((entry) => this.resize(entry[0])).observe(this.body!);
		document.addEventListener(TRANSITION_BEFORE_PREPARATION, (event: Event) =>
			this.handlePreparationEvent(event),
		);
		document.addEventListener(TRANSITION_AFTER_PREPARATION, () => this.handleOnPreparationEnd());
		document.addEventListener(TRANSITION_AFTER_SWAP, () => this.handleOnSwapEnd());
	}

	// resize({ contentRect }) {
	resize({ contentRect }: ResizeObserverEntry) {
		this.viewport?.resize();
	}

	render() {
		this.smoothScroll?.init();
		// this.textLinesReveal?.init();
		// this.scrubControlledAnimation?.init();

		// window.requestAnimationFrame(this.render.bind(this));
	}

	handleOnTransitionStart(ev: TransitionBeforePreparationEvent) {
		const originalLoader = ev.loader;
		document.body.classList.add('is-loading');
		ev.loader = async () => {
			await this.loaderAnimation?.showLoader();
			await originalLoader();
		};
	}

	handleOnPreparationEnd() {
		this.smoothScroll?.stop();
	}

	handleOnSwapEnd() {
		this.loaderAnimation?.hideLoader().then(() => {
			this.smoothScroll?.start();
			document.body.classList.remove('is-loading');
		});
	}

	handlePreparationEvent(preparationEvent: Event) {
		if (isTransitionBeforePreparationEvent(preparationEvent)) {
			this.handleOnTransitionStart(preparationEvent);
		}
	}
}
