/**
 * Build-time geometry for the mystery box: where each block sits when the
 * swarm forms a question mark, and where it idles when scattered.
 *
 * Formed coordinates (`x`, `y`, `size`) are percentages of a square stage
 * centred in the card; scattered coordinates (`sx`, `sy`) are percentages of
 * the card itself. Blocks are centre-anchored, so a block's size never pulls
 * the glyph off its line.
 */

export type DotKind = 'small' | 'medium' | 'large' | 'link';

export interface Dot {
	kind: DotKind;
	/** Edge length, % of the stage. */
	size: number;
	/** Formed centre, % of the stage. */
	x: number;
	y: number;
	/** Formed rotation in degrees, aligned to the stroke. */
	r: number;
	/** Scattered centre, % of the card. */
	sx: number;
	sy: number;
	/** Index into the link list, for `kind: 'link'`. */
	link?: number;
}

const COUNTS = { small: 47, medium: 12, large: 5, link: 4 } as const;
const UNIT: Record<DotKind, number> = { small: 1, medium: 2, large: 3, link: 4 };
/** Gap between neighboring blocks, in small-block units. */
const GAP = 0.4;
/** Where along the stroke the first three links sit; the fourth is the period. */
const LINK_STOPS = [0, 0.4, 0.75];
const PERIOD = { x: 50, y: 90 };
const SEED = 0x3f;

interface Point {
	x: number;
	y: number;
}

function mulberry32(seed: number) {
	let a = seed;
	return () => {
		a = (a + 0x6d2b79f5) | 0;
		let t = Math.imul(a ^ (a >>> 15), 1 | a);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

/** Hook arc, then a quadratic bend that lands vertical on the stem. */
function strokePoints(): Point[] {
	const cx = 50;
	const cy = 30;
	const r = 24;
	const end = (400 * Math.PI) / 180;
	const points: Point[] = [];

	for (let deg = 190; deg <= 400; deg += 1) {
		const a = (deg * Math.PI) / 180;
		points.push({ x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) });
	}

	const p = points.at(-1)!;
	const tangent = { x: -Math.sin(end), y: Math.cos(end) };
	const reach = (50 - p.x) / tangent.x;
	const c = { x: 50, y: p.y + reach * tangent.y };
	const s = { x: 50, y: 74 };

	for (let i = 1; i <= 60; i += 1) {
		const t = i / 60;
		const u = 1 - t;
		points.push({
			x: u * u * p.x + 2 * u * t * c.x + t * t * s.x,
			y: u * u * p.y + 2 * u * t * c.y + t * t * s.y,
		});
	}

	return points;
}

/** Arc-length lookup over a polyline: position and unit tangent at distance `d`. */
function walker(points: Point[]) {
	const lengths = [0];
	for (let i = 1; i < points.length; i += 1) {
		lengths.push(
			lengths[i - 1] + Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y),
		);
	}

	return {
		length: lengths.at(-1)!,
		at(d: number) {
			let i = lengths.findIndex((l) => l >= d);
			if (i <= 0) i = 1;
			const a = points[i - 1];
			const b = points[i];
			const span = lengths[i] - lengths[i - 1];
			const t = (d - lengths[i - 1]) / span;
			return {
				x: a.x + (b.x - a.x) * t,
				y: a.y + (b.y - a.y) * t,
				tx: (b.x - a.x) / span,
				ty: (b.y - a.y) / span,
			};
		},
	};
}

type Slot = 'pair' | DotKind;

const round = (n: number) => Math.round(n * 100) / 100;

export function layoutQuestionMark(): Dot[] {
	const random = mulberry32(SEED);

	// Small blocks travel two abreast so the stroke has some weight; one is
	// left over and rides alone. Everything else sits centred on the stroke.
	const slots: Slot[] = [
		...Array<Slot>(Math.floor(COUNTS.small / 2)).fill('pair'),
		...Array<Slot>(COUNTS.small % 2).fill('small'),
		...Array<Slot>(COUNTS.medium).fill('medium'),
		...Array<Slot>(COUNTS.large).fill('large'),
	];

	for (let i = slots.length - 1; i > 0; i -= 1) {
		const j = Math.floor(random() * (i + 1));
		[slots[i], slots[j]] = [slots[j], slots[i]];
	}

	const strokeLinks = COUNTS.link - 1;
	LINK_STOPS.slice(0, strokeLinks).forEach((stop, i) => {
		slots.splice(Math.round(stop * (slots.length + 1)) + i, 0, 'link');
	});

	// Scale every block and gap by one factor so the sequence exactly fills
	// the stroke: even spacing at any size, no hand-tuned offsets.
	const along = (slot: Slot) => (slot === 'pair' ? 1 : UNIT[slot]);
	let required = 0;
	for (let i = 1; i < slots.length; i += 1) {
		required += (along(slots[i - 1]) + along(slots[i])) / 2 + GAP;
	}

	const path = walker(strokePoints());
	const k = path.length / required;

	const dots: Omit<Dot, 'sx' | 'sy'>[] = [];
	let distance = 0;
	let linkIndex = 0;

	slots.forEach((slot, i) => {
		if (i > 0) distance += k * ((along(slots[i - 1]) + along(slot)) / 2 + GAP);

		const p = path.at(Math.min(distance, path.length));
		const r = round((Math.atan2(p.ty, p.tx) * 180) / Math.PI);

		if (slot === 'pair') {
			const offset = k * (0.5 + GAP / 2);
			for (const side of [-1, 1]) {
				dots.push({
					kind: 'small',
					size: round(k),
					x: round(p.x - p.ty * offset * side),
					y: round(p.y + p.tx * offset * side),
					r,
				});
			}
			return;
		}

		dots.push({
			kind: slot,
			size: round(k * UNIT[slot]),
			x: round(p.x),
			y: round(p.y),
			r,
			...(slot === 'link' ? { link: linkIndex++ } : {}),
		});
	});

	dots.push({
		kind: 'link',
		size: round(k * UNIT.link),
		x: PERIOD.x,
		y: PERIOD.y,
		r: 0,
		link: linkIndex,
	});

	return dots.map((dot) => ({
		...dot,
		sx: round(5 + random() * 90),
		sy: round(5 + random() * 90),
	}));
}
