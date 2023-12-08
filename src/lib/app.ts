import LoaderAnimation from '@/lib/loader.animation';
import { eventBus } from '@/utils/event-bus';
import {
	isTransitionBeforePreparationEvent,
	TRANSITION_AFTER_SWAP,
	TRANSITION_BEFORE_PREPARATION,
	type TransitionBeforePreparationEvent,
} from 'astro:transitions/client';

export default class App {
	loaderAnimation: LoaderAnimation | null;

	constructor() {
		this.loaderAnimation = null;
		this.init();
	}

	init() {
		this.loaderAnimation = new LoaderAnimation();
		this.initEvents();
	}

	initEvents() {
		document.addEventListener(TRANSITION_BEFORE_PREPARATION, (event: Event) =>
			this.handlePreparationEvent(event),
		);
		document.addEventListener(TRANSITION_AFTER_SWAP, () => this.handleOnSwapEnd());
	}

	handleOnTransitionStart(ev: TransitionBeforePreparationEvent) {
		const originalLoader = ev.loader;
		ev.loader = async () => {
			eventBus.dispatch('loaderStarted', { isLoaded: false });
			await this.loaderAnimation?.showLoader();
			document.body.classList.add('is-loading');
			await originalLoader();
		};
	}

	async handleOnSwapEnd() {
		await this.loaderAnimation?.hideLoader();
		document.body.classList.remove('is-loading');
		eventBus.dispatch('loaderFinished', { isLoaded: true });
	}

	handlePreparationEvent(preparationEvent: Event) {
		if (isTransitionBeforePreparationEvent(preparationEvent)) {
			this.handleOnTransitionStart(preparationEvent);
		}
	}
}
