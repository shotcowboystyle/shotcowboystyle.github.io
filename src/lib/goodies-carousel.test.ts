import { nextIndex, rotateFor } from '@/lib/goodies-carousel';
import { describe, expect, it } from 'vitest';

describe('nextIndex', () => {
	it('advances on a leftward drag and goes back on a rightward one', () => {
		expect(nextIndex(1, -40, 0, 3)).toBe(2);
		expect(nextIndex(1, 40, 0, 3)).toBe(0);
	});

	it('turns on a fast flick even with no net offset', () => {
		expect(nextIndex(1, 0, -600, 3)).toBe(2);
		expect(nextIndex(1, 0, 600, 3)).toBe(0);
		expect(nextIndex(1, 0, 400, 3)).toBe(1);
	});

	it('clamps at both ends', () => {
		expect(nextIndex(0, 40, 0, 3)).toBe(0);
		expect(nextIndex(2, -40, 0, 3)).toBe(2);
	});
});

describe('rotateFor', () => {
	const offset = 300;

	it('is flat for the slide in view', () => {
		expect(rotateFor(-offset, 1, offset)).toBeCloseTo(0);
	});

	it('swings ±90° one slide away', () => {
		expect(rotateFor(-2 * offset, 1, offset)).toBe(90);
		expect(rotateFor(0, 1, offset)).toBe(-90);
	});

	it('stays flat before the track has been measured', () => {
		expect(rotateFor(-120, 1, 0)).toBe(0);
	});
});
