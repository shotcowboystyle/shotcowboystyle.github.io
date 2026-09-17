import LoaderAnimation from '@/lib/loader.animation';
import { typedEventBus as eventBus } from '@/utils/typed-event-bus';
import { type TransitionBeforePreparationEvent } from 'astro:transitions/client';

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
		document.addEventListener('astro:before-preparation', (event: Event) =>
			this.handlePreparationEvent(event),
		);
		document.addEventListener('astro:after-swap', () => this.handleOnSwapEnd());
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

	/**
	 * `is-loading` is dropped *before* the curtain retracts, not after: it hides
	 * `#main`'s children, so clearing it afterwards would slide the bars off a
	 * blank page. The new page is already swapped in and sitting behind them.
	 */
	async handleOnSwapEnd() {
		document.body.classList.remove('is-loading');
		await this.loaderAnimation?.hideLoader();
		eventBus.dispatch('loaderFinished', { isLoaded: true });
	}

	handlePreparationEvent(preparationEvent: Event) {
		if (preparationEvent.type === 'astro:before-preparation') {
			this.handleOnTransitionStart(preparationEvent as TransitionBeforePreparationEvent);
		}
	}
}
