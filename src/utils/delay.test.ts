import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { delay } from './delay';

describe('delay', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('stays pending until the interval elapses', async () => {
		const settled = vi.fn();

		void delay(100).then(settled);

		await vi.advanceTimersByTimeAsync(99);
		expect(settled).not.toHaveBeenCalled();

		await vi.advanceTimersByTimeAsync(1);
		expect(settled).toHaveBeenCalledTimes(1);
	});

	it('defaults to 2000ms', async () => {
		const settled = vi.fn();

		void delay().then(settled);

		await vi.advanceTimersByTimeAsync(1999);
		expect(settled).not.toHaveBeenCalled();

		await vi.advanceTimersByTimeAsync(1);
		expect(settled).toHaveBeenCalledTimes(1);
	});

	it('resolves immediately for a zero delay', async () => {
		const settled = vi.fn();

		void delay(0).then(settled);
		await vi.advanceTimersByTimeAsync(0);

		expect(settled).toHaveBeenCalledTimes(1);
	});
});
