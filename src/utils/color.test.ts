import { afterEach, describe, expect, it, vi } from 'vitest';
import { getRandomColor } from './color';

describe('getRandomColor', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('returns a six-digit uppercase hex color', () => {
		for (let i = 0; i < 50; i++) {
			expect(getRandomColor()).toMatch(/^#[0-9A-F]{6}$/);
		}
	});

	it('maps the lowest random value to black', () => {
		vi.spyOn(crypto, 'getRandomValues').mockImplementation(((array: Uint8Array) => {
			for (let i = 0; i < array.length; i++) {
				array[i] = 0;
			}
			return array;
		}) as unknown as typeof crypto.getRandomValues);

		expect(getRandomColor()).toBe('#000000');
	});

	it('maps the highest random value to white', () => {
		vi.spyOn(crypto, 'getRandomValues').mockImplementation(((array: Uint8Array) => {
			for (let i = 0; i < array.length; i++) {
				array[i] = 255;
			}
			return array;
		}) as unknown as typeof crypto.getRandomValues);

		expect(getRandomColor()).toBe('#FFFFFF');
	});

	it('consumes one random draw per call', () => {
		const random = vi.spyOn(crypto, 'getRandomValues');

		getRandomColor();

		expect(random).toHaveBeenCalledTimes(1);
	});

	it('varies across calls', () => {
		const colors = new Set(Array.from({ length: 100 }, () => getRandomColor()));

		expect(colors.size).toBeGreaterThan(1);
	});
});
