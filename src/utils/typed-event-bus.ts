/**
 * Event map defining all application events with their payload types.
 * Uses discriminated unions to ensure type safety across the event bus.
 */
export interface EventMap {
	loaderStarted: { isLoaded: false };
	loaderFinished: { isLoaded: true };
	landingLoaded: Record<string, never>;
}

/**
 * Extract event names from the EventMap
 */
export type EventName = keyof EventMap;

/**
 * Get the payload type for a specific event
 */
export type EventPayload<T extends EventName> = EventMap[T];

/**
 * Type-safe event listener callback
 */
export type TypedEventListener<T extends EventName> = (payload: EventPayload<T>) => void;

/**
 * Internal custom event interface extending native Event
 */
interface ICustomEvent<T extends EventName> extends Event {
	detail: EventPayload<T>;
}

/**
 * Type-safe event bus implementation using discriminated unions.
 * Provides compile-time type checking for event names and payloads.
 *
 * @example
 * ```typescript
 * // Subscribe to typed events
 * eventBus.on('loaderFinished', (payload) => {
 *   console.log(payload.isLoaded); // TypeScript knows this is boolean
 * });
 *
 * // Dispatch with type checking
 * eventBus.dispatch('loaderStarted', { isLoaded: false }); // OK
 * eventBus.dispatch('loaderStarted', { isLoaded: true }); // Type error!
 * ```
 */
export class TypedEventBus {
	private readonly target: EventTarget;

	constructor(target: EventTarget = document) {
		this.target = target;
	}

	/**
	 * Subscribe to an event with a typed callback.
	 *
	 * @param event - The event name from EventMap
	 * @param callback - Type-safe callback receiving the event payload
	 */
	on<T extends EventName>(event: T, callback: TypedEventListener<T>): void {
		this.target.addEventListener(event, (e) => {
			const customEvent = e as ICustomEvent<T>;
			callback(customEvent.detail);
		});
	}

	/**
	 * Subscribe to an event that will only fire once, then auto-unsubscribe.
	 *
	 * @param event - The event name from EventMap
	 * @param callback - Type-safe callback receiving the event payload
	 */
	once<T extends EventName>(event: T, callback: TypedEventListener<T>): void {
		const wrappedCallback = (e: Event) => {
			const customEvent = e as ICustomEvent<T>;
			callback(customEvent.detail);
			this.target.removeEventListener(event, wrappedCallback);
		};
		this.target.addEventListener(event, wrappedCallback);
	}

	/**
	 * Dispatch an event with a typed payload.
	 *
	 * @param event - The event name from EventMap
	 * @param payload - Type-safe payload matching the event's expected type
	 */
	dispatch<T extends EventName>(event: T, payload: EventPayload<T>): void {
		this.target.dispatchEvent(new CustomEvent(event, { detail: payload }));
	}

	/**
	 * Unsubscribe from an event.
	 *
	 * @param event - The event name from EventMap
	 * @param callback - The exact callback function that was registered
	 */
	remove<T extends EventName>(event: T, callback: TypedEventListener<T>): void {
		// Cast through unknown to satisfy removeEventListener signature
		// This is safe because we're removing the exact listener we added
		this.target.removeEventListener(
			event,
			callback as unknown as EventListenerOrEventListenerObject,
		);
	}
}

/**
 * Singleton instance of the typed event bus
 */
export const typedEventBus = new TypedEventBus();
