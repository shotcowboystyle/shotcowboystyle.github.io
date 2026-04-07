import { typedEventBus as eventBus } from '@/utils/typed-event-bus';
import { TRANSITION_AFTER_PREPARATION } from 'astro:transitions/client';

/**
 * Callback function type for module loaders.
 * Can be async or sync, returns void or a cleanup function.
 */
type ModuleLoader = () => void | Promise<void> | (() => void) | Promise<() => void>;

/**
 * Registers a module loader that runs on page load and landingLoaded events.
 *
 * This utility handles the common pattern of initializing modules when the page loads
 * and re-initializing them when the landing page loads in SPA navigation scenarios.
 *
 * @param loader - Function to load and initialize the module
 *
 * @example
 * ```typescript
 * registerPageModule(async () => {
 *   await import('../lib/section-card-scroll-animation.ts')
 *     .then((module) => new module.default());
 * });
 * ```
 */
export function registerPageModule(loader: ModuleLoader): void {
	document.addEventListener(
		'astro:page-load',
		() => {
			loader();
			eventBus.on('landingLoaded', loader);
		},
		{ once: true },
	);
}

/**
 * Registers a module loader with automatic cleanup on page transitions.
 *
 * This utility handles the common pattern of initializing modules on page load,
 * re-initializing on landingLoaded events, and cleaning up resources before
 * page transitions to prevent memory leaks.
 *
 * The loader function can optionally return a cleanup function that will be
 * called automatically during page transitions.
 *
 * @param loader - Function to load and initialize the module, optionally returns cleanup function
 *
 * @example
 * With cleanup: return a destroy function from the loader.
 * Without cleanup: the module handles its own lifecycle.
 */
export function registerTransitionModule(loader: ModuleLoader): void {
	let cleanup: (() => void) | undefined;

	const wrappedLoader = async () => {
		const result = await loader();
		if (typeof result === 'function') {
			cleanup = result;
		}
	};

	document.addEventListener(
		'astro:page-load',
		() => {
			wrappedLoader();
			eventBus.on('landingLoaded', wrappedLoader);

			document.addEventListener(TRANSITION_AFTER_PREPARATION, () => {
				if (cleanup) {
					cleanup();
					cleanup = undefined;
				}
			});
		},
		{ once: true },
	);
}
