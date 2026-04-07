/**
 * Registry for tracking and managing event listeners for proper cleanup.
 *
 * This class helps prevent memory leaks by keeping track of all registered
 * event listeners and providing a method to remove them all at once.
 *
 * @example
 * ```typescript
 * const registry = new EventHandlerRegistry();
 *
 * // Register event listeners
 * registry.register(element, 'click', handleClick);
 * registry.register(window, 'resize', handleResize);
 *
 * // Clean up all listeners when done
 * registry.dispose();
 * ```
 */
export class EventHandlerRegistry {
	private listeners: Array<{
		target: EventTarget;
		type: string;
		listener: EventListener;
		options?: boolean | AddEventListenerOptions;
	}> = [];

	/**
	 * Register an event listener to be tracked for cleanup.
	 *
	 * @param target The event target (element, window, document, etc.)
	 * @param type The event type (e.g., 'click', 'resize')
	 * @param listener The event listener function
	 * @param options Optional event listener options
	 */
	register(
		target: EventTarget,
		type: string,
		listener: EventListener,
		options?: boolean | AddEventListenerOptions,
	): void {
		target.addEventListener(type, listener, options);
		this.listeners.push({ target, type, listener, options });
	}

	/**
	 * Unregister a specific event listener.
	 *
	 * @param target The event target
	 * @param type The event type
	 * @param listener The event listener function
	 */
	unregister(target: EventTarget, type: string, listener: EventListener): void {
		const index = this.listeners.findIndex(
			(item) => item.target === target && item.type === type && item.listener === listener,
		);

		if (index !== -1) {
			const item = this.listeners[index];
			item.target.removeEventListener(item.type, item.listener, item.options);
			this.listeners.splice(index, 1);
		}
	}

	/**
	 * Remove all registered event listeners and clear the registry.
	 *
	 * This should be called when cleaning up a component or module to prevent
	 * memory leaks.
	 */
	dispose(): void {
		for (const { target, type, listener, options } of this.listeners) {
			target.removeEventListener(type, listener, options);
		}
		this.listeners = [];
	}

	/**
	 * Get the number of registered event listeners.
	 *
	 * @returns The count of active event listeners
	 */
	get count(): number {
		return this.listeners.length;
	}
}

/**
 * Manager for tracking and canceling requestAnimationFrame loops.
 *
 * This class helps prevent orphaned animation frames by keeping track of all
 * registered RAF IDs and providing a method to cancel them all at once.
 *
 * @example
 * ```typescript
 * const rafManager = new RAFManager();
 *
 * // Register animation frames
 * const id1 = rafManager.register(() => {
 *   // Animation logic
 *   rafManager.register(animationLoop);
 * });
 *
 * // Clean up all animation frames when done
 * rafManager.dispose();
 * ```
 */
export class RAFManager {
	private rafIds: Set<number> = new Set();

	/**
	 * Register a callback to be executed on the next animation frame.
	 *
	 * This method wraps requestAnimationFrame and automatically tracks the ID
	 * for cleanup.
	 *
	 * @param callback The function to execute on the next animation frame
	 * @returns The RAF ID (can be used with cancel() if needed)
	 */
	register(callback: FrameRequestCallback): number {
		const id = requestAnimationFrame((time) => {
			// Remove the ID before calling the callback so recursive calls work correctly
			this.rafIds.delete(id);
			callback(time);
		});
		this.rafIds.add(id);
		return id;
	}

	/**
	 * Cancel a specific animation frame by its ID.
	 *
	 * @param id The RAF ID returned from register()
	 */
	cancel(id: number): void {
		if (this.rafIds.has(id)) {
			cancelAnimationFrame(id);
			this.rafIds.delete(id);
		}
	}

	/**
	 * Cancel all registered animation frames and clear the manager.
	 *
	 * This should be called when cleaning up a component or module to prevent
	 * orphaned animation loops.
	 */
	dispose(): void {
		for (const id of this.rafIds) {
			cancelAnimationFrame(id);
		}
		this.rafIds.clear();
	}

	/**
	 * Get the number of active animation frames.
	 *
	 * @returns The count of registered RAF IDs
	 */
	get count(): number {
		return this.rafIds.size;
	}
}
