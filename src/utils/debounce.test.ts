import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { debounce } from './debounce';

describe('debounce', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('does not invoke the callback synchronously', () => {
		const fn = vi.fn();

		debounce(fn, 100)();

		expect(fn).not.toHaveBeenCalled();
	});

	it('invokes the callback once the wait elapses', () => {
		const fn = vi.fn();
		const debounced = debounce(fn, 100);

		debounced();
		vi.advanceTimersByTime(100);

		expect(fn).toHaveBeenCalledTimes(1);
	});

	it('collapses rapid calls into a single invocation', () => {
		const fn = vi.fn();
		const debounced = debounce(fn, 100);

		debounced();
		debounced();
		debounced();
		vi.advanceTimersByTime(100);

		expect(fn).toHaveBeenCalledTimes(1);
	});

	it('restarts the timer on every call', () => {
		const fn = vi.fn();
		const debounced = debounce(fn, 100);

		debounced();
		vi.advanceTimersByTime(90);
		debounced();
		vi.advanceTimersByTime(90);

		expect(fn).not.toHaveBeenCalled();

		vi.advanceTimersByTime(10);

		expect(fn).toHaveBeenCalledTimes(1);
	});

	it('fires again for a new burst after settling', () => {
		const fn = vi.fn();
		const debounced = debounce(fn, 100);

		debounced();
		vi.advanceTimersByTime(100);
		debounced();
		vi.advanceTimersByTime(100);

		expect(fn).toHaveBeenCalledTimes(2);
	});

	it('keeps separate debounced functions independent', () => {
		const first = vi.fn();
		const second = vi.fn();
		const debouncedFirst = debounce(first, 100);
		const debouncedSecond = debounce(second, 200);

		debouncedFirst();
		debouncedSecond();
		vi.advanceTimersByTime(100);

		expect(first).toHaveBeenCalledTimes(1);
		expect(second).not.toHaveBeenCalled();

		vi.advanceTimersByTime(100);

		expect(second).toHaveBeenCalledTimes(1);
	});
});
