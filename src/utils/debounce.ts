/**
 * Creates a debounced function that delays the execution of the provided function until after a delay.
 *
 * @param func The function to be debounced.
 * @param wait The delay in milliseconds before `func` is executed.
 *
 * @returns A new function that, when invoked, delays the execution of `func` until after `wait` milliseconds from the last invocation of the returned function.
 */
export function debounce(func: () => void, wait: number) {
	let timeout: NodeJS.Timeout;

	return function executedFunction() {
		const later = () => {
			clearTimeout(timeout);
			func();
		};

		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}
