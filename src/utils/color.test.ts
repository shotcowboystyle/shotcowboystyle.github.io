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
		vi.spyOn(Math, 'random').mockReturnValue(0);

		expect(getRandomColor()).toBe('#000000');
	});

	it('maps the highest random value to white', () => {
		// 0.999... * 16 floors to 15, which indexes 'F'.
		vi.spyOn(Math, 'random').mockReturnValue(0.9999);

		expect(getRandomColor()).toBe('#FFFFFF');
	});

	it('consumes one random draw per hex digit', () => {
		const random = vi.spyOn(Math, 'random').mockReturnValue(0.5);

		getRandomColor();

		expect(random).toHaveBeenCalledTimes(6);
	});

	it('varies across calls', () => {
		const colors = new Set(Array.from({ length: 100 }, () => getRandomColor()));

		expect(colors.size).toBeGreaterThan(1);
	});
});
