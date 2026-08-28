import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { EventHandlerRegistry, RAFManager } from './disposable';

describe('EventHandlerRegistry', () => {
	let registry: EventHandlerRegistry;
	let target: EventTarget;

	beforeEach(() => {
		registry = new EventHandlerRegistry();
		target = new EventTarget();
	});

	it('starts empty', () => {
		expect(registry.count).toBe(0);
	});

	it('attaches the listener it registers', () => {
		const listener = vi.fn();

		registry.register(target, 'click', listener);
		target.dispatchEvent(new Event('click'));

		expect(listener).toHaveBeenCalledTimes(1);
		expect(registry.count).toBe(1);
	});

	it('tracks listeners across multiple targets', () => {
		const other = new EventTarget();

		registry.register(target, 'click', vi.fn());
		registry.register(other, 'resize', vi.fn());

		expect(registry.count).toBe(2);
	});

	describe('unregister', () => {
		it('detaches the listener and stops tracking it', () => {
			const listener = vi.fn();

			registry.register(target, 'click', listener);
			registry.unregister(target, 'click', listener);
			target.dispatchEvent(new Event('click'));

			expect(listener).not.toHaveBeenCalled();
			expect(registry.count).toBe(0);
		});

		it('leaves other listeners attached', () => {
			const removed = vi.fn();
			const kept = vi.fn();

			registry.register(target, 'click', removed);
			registry.register(target, 'click', kept);
			registry.unregister(target, 'click', removed);
			target.dispatchEvent(new Event('click'));

			expect(removed).not.toHaveBeenCalled();
			expect(kept).toHaveBeenCalledTimes(1);
			expect(registry.count).toBe(1);
		});

		it('is a no-op for a listener that was never registered', () => {
			registry.register(target, 'click', vi.fn());

			expect(() => registry.unregister(target, 'click', vi.fn())).not.toThrow();
			expect(registry.count).toBe(1);
		});
	});

	describe('dispose', () => {
		it('detaches every registered listener', () => {
			const first = vi.fn();
			const second = vi.fn();
			const other = new EventTarget();

			registry.register(target, 'click', first);
			registry.register(other, 'resize', second);
			registry.dispose();

			target.dispatchEvent(new Event('click'));
			other.dispatchEvent(new Event('resize'));

			expect(first).not.toHaveBeenCalled();
			expect(second).not.toHaveBeenCalled();
			expect(registry.count).toBe(0);
		});

		it('is safe to call twice', () => {
			registry.register(target, 'click', vi.fn());
			registry.dispose();

			expect(() => registry.dispose()).not.toThrow();
			expect(registry.count).toBe(0);
		});

		it('can be reused after disposal', () => {
			const listener = vi.fn();

			registry.register(target, 'click', vi.fn());
			registry.dispose();
			registry.register(target, 'click', listener);
			target.dispatchEvent(new Event('click'));

			expect(listener).toHaveBeenCalledTimes(1);
			expect(registry.count).toBe(1);
		});
	});
});

describe('RAFManager', () => {
	let manager: RAFManager;

	beforeEach(() => {
		vi.useFakeTimers();
		manager = new RAFManager();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('starts empty', () => {
		expect(manager.count).toBe(0);
	});

	it('runs the callback on the next frame', async () => {
		const callback = vi.fn();

		manager.register(callback);
		expect(manager.count).toBe(1);

		await vi.advanceTimersByTimeAsync(50);

		expect(callback).toHaveBeenCalledTimes(1);
	});

	it('stops tracking a frame once it has fired', async () => {
		manager.register(vi.fn());
		await vi.advanceTimersByTimeAsync(50);

		expect(manager.count).toBe(0);
	});

	it('supports recursive registration from inside the callback', async () => {
		const callback = vi.fn();
		let remaining = 3;

		const loop = () => {
			callback();
			if (--remaining > 0) manager.register(loop);
		};

		manager.register(loop);
		await vi.advanceTimersByTimeAsync(200);

		expect(callback).toHaveBeenCalledTimes(3);
		expect(manager.count).toBe(0);
	});

	describe('cancel', () => {
		it('prevents a pending frame from running', async () => {
			const callback = vi.fn();

			const id = manager.register(callback);
			manager.cancel(id);
			await vi.advanceTimersByTimeAsync(50);

			expect(callback).not.toHaveBeenCalled();
			expect(manager.count).toBe(0);
		});

		it('ignores an unknown id', () => {
			expect(() => manager.cancel(9999)).not.toThrow();
		});
	});

	describe('dispose', () => {
		it('cancels every pending frame', async () => {
			const first = vi.fn();
			const second = vi.fn();

			manager.register(first);
			manager.register(second);
			manager.dispose();
			await vi.advanceTimersByTimeAsync(50);

			expect(first).not.toHaveBeenCalled();
			expect(second).not.toHaveBeenCalled();
			expect(manager.count).toBe(0);
		});

		it('is safe to call twice', () => {
			manager.register(vi.fn());
			manager.dispose();

			expect(() => manager.dispose()).not.toThrow();
		});
	});
});
