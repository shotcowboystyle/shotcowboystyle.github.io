import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { formatDateMonthYear, timeSince } from './date';

describe('formatDateMonthYear', () => {
	it('renders the full month name and year', () => {
		expect(formatDateMonthYear(new Date('2024-03-15T12:00:00Z'))).toBe('March 2024');
	});

	it('is stable across the whole year', () => {
		const january = formatDateMonthYear(new Date('2020-01-01T12:00:00Z'));
		const december = formatDateMonthYear(new Date('2020-12-31T12:00:00Z'));

		expect(january).toBe('January 2020');
		expect(december).toBe('December 2020');
	});
});

describe('timeSince', () => {
	const NOW = new Date('2024-06-15T12:00:00Z');
	const ago = (ms: number) => new Date(NOW.getTime() - ms);

	const SECOND = 1000;
	const MINUTE = 60 * SECOND;
	const HOUR = 60 * MINUTE;
	const DAY = 24 * HOUR;
	const MONTH = 30 * DAY;
	const YEAR = 365 * DAY;

	beforeEach(() => {
		vi.useFakeTimers();
		vi.setSystemTime(NOW);
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it.each([
		['2 minutes ago', 2 * MINUTE],
		['3 hours ago', 3 * HOUR],
		['5 days ago', 5 * DAY],
		['2 months ago', 2 * MONTH],
		['3 years ago', 3 * YEAR],
	])('returns %s', (expected, elapsed) => {
		expect(timeSince(ago(elapsed))).toBe(expected);
	});

	it.each([
		['1 year ago', YEAR + DAY],
		['1 month ago', MONTH + DAY],
		['1 day ago', DAY + HOUR],
		['1 hour ago', HOUR + MINUTE],
		['1 minute ago', MINUTE + SECOND],
	])('singularizes the unit: %s', (expected, elapsed) => {
		expect(timeSince(ago(elapsed))).toBe(expected);
	});

	it('reports "Just now" for anything under a minute', () => {
		expect(timeSince(ago(0))).toBe('Just now');
		expect(timeSince(ago(30 * SECOND))).toBe('Just now');
		expect(timeSince(ago(59 * SECOND))).toBe('Just now');
	});

	// Documents current behavior, not desired behavior: the "N seconds ago"
	// branch in date.ts is unreachable. Anything over 60s is caught by the
	// minutes branch above it, so the final ternary only ever yields 'Just now'.
	it('never returns a "seconds ago" string', () => {
		const results = Array.from({ length: 120 }, (_, i) => timeSince(ago(i * SECOND)));

		expect(results.some((result) => result.includes('seconds ago'))).toBe(false);
	});
});
