import { describe, expect, it } from 'vitest';
import { layoutQuestionMark } from './question-mark';

describe('layoutQuestionMark', () => {
	const dots = layoutQuestionMark();

	it('is deterministic across builds', () => {
		expect(layoutQuestionMark()).toEqual(dots);
	});

	it('keeps the swarm counts and indexes each link once', () => {
		const count = (kind: string) => dots.filter((d) => d.kind === kind).length;
		expect([count('small'), count('medium'), count('large'), count('link')]).toEqual([
			47, 12, 5, 4,
		]);
		expect(
			dots
				.filter((d) => d.kind === 'link')
				.map((d) => d.link)
				.toSorted(),
		).toEqual([0, 1, 2, 3]);
	});

	it('keeps every formed block on the stage and every scattered block on the card', () => {
		for (const d of dots) {
			expect(d.x - d.size / 2).toBeGreaterThanOrEqual(0);
			expect(d.x + d.size / 2).toBeLessThanOrEqual(100);
			expect(d.y - d.size / 2).toBeGreaterThanOrEqual(0);
			expect(d.y + d.size / 2).toBeLessThanOrEqual(100);
			expect(d.sx).toBeGreaterThanOrEqual(5);
			expect(d.sx).toBeLessThanOrEqual(95);
			expect(d.sy).toBeGreaterThanOrEqual(5);
			expect(d.sy).toBeLessThanOrEqual(95);
		}
	});

	it('never overlaps two formed blocks', () => {
		for (let i = 0; i < dots.length; i += 1) {
			for (let j = i + 1; j < dots.length; j += 1) {
				const a = dots[i];
				const b = dots[j];
				expect(Math.hypot(a.x - b.x, a.y - b.y)).toBeGreaterThanOrEqual((a.size + b.size) / 2);
			}
		}
	});

	it('sets the period apart from the stem', () => {
		const period = dots.at(-1)!;
		expect(period).toMatchObject({ kind: 'link', x: 50 });
		const stemFoot = Math.max(...dots.slice(0, -1).map((d) => d.y + d.size / 2));
		expect(period.y - period.size / 2 - stemFoot).toBeGreaterThan(period.size);
	});
});
