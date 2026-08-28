import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TypedEventBus, typedEventBus } from './typed-event-bus';

describe('TypedEventBus', () => {
	let bus: TypedEventBus;

	beforeEach(() => {
		// An injected target keeps each test isolated from `document`.
		bus = new TypedEventBus(new EventTarget());
	});

	describe('on / dispatch', () => {
		it('delivers the payload to a subscriber', () => {
			const listener = vi.fn();

			bus.on('loaderStarted', listener);
			bus.dispatch('loaderStarted', { isLoaded: false });

			expect(listener).toHaveBeenCalledTimes(1);
			expect(listener).toHaveBeenCalledWith({ isLoaded: false });
		});

		it('delivers to every subscriber of the same event', () => {
			const first = vi.fn();
			const second = vi.fn();

			bus.on('landingLoaded', first);
			bus.on('landingLoaded', second);
			bus.dispatch('landingLoaded', {});

			expect(first).toHaveBeenCalledTimes(1);
			expect(second).toHaveBeenCalledTimes(1);
		});

		it('does not cross-talk between event names', () => {
			const listener = vi.fn();

			bus.on('loaderStarted', listener);
			bus.dispatch('loaderFinished', { isLoaded: true });

			expect(listener).not.toHaveBeenCalled();
		});

		it('fires on each dispatch', () => {
			const listener = vi.fn();

			bus.on('landingLoaded', listener);
			bus.dispatch('landingLoaded', {});
			bus.dispatch('landingLoaded', {});

			expect(listener).toHaveBeenCalledTimes(2);
		});

		it('ignores a dispatch with no subscribers', () => {
			expect(() => bus.dispatch('landingLoaded', {})).not.toThrow();
		});
	});

	describe('once', () => {
		it('fires only for the first dispatch', () => {
			const listener = vi.fn();

			bus.once('loaderFinished', listener);
			bus.dispatch('loaderFinished', { isLoaded: true });
			bus.dispatch('loaderFinished', { isLoaded: true });

			expect(listener).toHaveBeenCalledTimes(1);
			expect(listener).toHaveBeenCalledWith({ isLoaded: true });
		});

		it('does not affect other subscribers when it unsubscribes', () => {
			const onceListener = vi.fn();
			const persistent = vi.fn();

			bus.once('landingLoaded', onceListener);
			bus.on('landingLoaded', persistent);
			bus.dispatch('landingLoaded', {});
			bus.dispatch('landingLoaded', {});

			expect(onceListener).toHaveBeenCalledTimes(1);
			expect(persistent).toHaveBeenCalledTimes(2);
		});
	});

	describe('remove', () => {
		// Documents current behavior, not desired behavior. `on()` registers an
		// anonymous arrow that closes over the callback, so the original function
		// reference was never added as a listener and `remove()` cannot match it.
		// Unsubscribing via `on()` + `remove()` is therefore a no-op today.
		it('fails to unsubscribe a listener registered through on()', () => {
			const listener = vi.fn();

			bus.on('landingLoaded', listener);
			bus.remove('landingLoaded', listener);
			bus.dispatch('landingLoaded', {});

			expect(listener).toHaveBeenCalledTimes(1);
		});

		it('does unsubscribe a listener added directly to the target', () => {
			const target = new EventTarget();
			const directBus = new TypedEventBus(target);
			const listener = vi.fn();

			target.addEventListener('landingLoaded', listener);
			directBus.remove('landingLoaded', listener);
			directBus.dispatch('landingLoaded', {});

			expect(listener).not.toHaveBeenCalled();
		});
	});

	describe('typedEventBus singleton', () => {
		it('is a TypedEventBus bound to document', () => {
			const listener = vi.fn();

			typedEventBus.once('landingLoaded', listener);
			document.dispatchEvent(new CustomEvent('landingLoaded', { detail: {} }));

			expect(listener).toHaveBeenCalledTimes(1);
		});
	});
});
