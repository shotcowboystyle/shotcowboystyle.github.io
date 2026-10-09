import { prefersReducedMotion } from '@/utils/motion';
import { gsap } from 'gsap';

/** A release this fast (px/s) turns the slide even when the drag barely moved. */
const VELOCITY_THRESHOLD = 500;
/** Pointer travel (px) before a press counts as a drag rather than a click. */
const CLICK_SLOP = 5;

/** The slide to settle on after a drag, one step at most, clamped to the ends. */
export const nextIndex = (
	index: number,
	offsetX: number,
	velocityX: number,
	count: number,
): number => {
	let direction = 0;
	if (offsetX < 0 || velocityX < -VELOCITY_THRESHOLD) direction = 1;
	else if (offsetX > 0 || velocityX > VELOCITY_THRESHOLD) direction = -1;
	return Math.max(0, Math.min(index + direction, count - 1));
};

/**
 * A slide's rotateY for a given track x: 0° when it sits in view, 90° one slide
 * to the left, -90° one slide to the right, linear and unclamped in between.
 */
export const rotateFor = (x: number, index: number, offset: number): number =>
	offset ? (-90 * (x + index * offset)) / offset : 0;

/**
 * Drag-to-swipe carousel ported from the experiments site's React/motion
 * Carousel: the track's x is the only animated value and each slide's swing is
 * derived from it. No loop or autoplay -- add them when there are enough
 * goodies to need them.
 */
export default class GoodiesCarousel {
	constructor(root: HTMLElement) {
		const track = root.querySelector<HTMLElement>('.js-goodies-track');
		const slides = [...root.querySelectorAll<HTMLElement>('.js-goodie')];
		const dots = [...root.querySelectorAll<HTMLButtonElement>('.js-goodies-dot')];
		if (!track || slides.length === 0) return;

		const reduced = prefersReducedMotion();
		let index = 0;
		let offset = 0;

		const trackX = () => Number(gsap.getProperty(track, 'x'));

		const render = () => {
			if (reduced) return;
			const x = trackX();
			slides.forEach((slide, i) => {
				gsap.set(slide, { rotateY: rotateFor(x, i, offset), transformPerspective: 1000 });
			});
		};

		const goTo = (next: number) => {
			index = next;
			// Only the slide in view is reachable by Tab and screen readers.
			slides.forEach((slide, i) => {
				slide.inert = i !== index;
			});
			dots.forEach((dot, i) => dot.setAttribute('aria-current', String(i === index)));
			gsap.to(track, {
				x: -index * offset,
				duration: reduced ? 0 : 0.5,
				ease: 'power3.out',
				overwrite: true,
				onUpdate: render,
			});
		};

		// The gap lives in CSS; read it rather than keeping a second copy here.
		new ResizeObserver(() => {
			offset = track.clientWidth + Number.parseFloat(getComputedStyle(track).columnGap);
			gsap.set(track, { x: -index * offset });
			render();
		}).observe(track);

		let dragging = false;
		let moved = false;
		let startX = 0;
		let startTrackX = 0;
		let lastX = 0;
		let lastTime = 0;
		let velocity = 0;

		track.addEventListener('pointerdown', (event) => {
			if (event.button !== 0) return;
			gsap.killTweensOf(track);
			dragging = true;
			moved = false;
			startX = lastX = event.clientX;
			lastTime = event.timeStamp;
			velocity = 0;
			startTrackX = trackX();
		});

		track.addEventListener('pointermove', (event) => {
			if (!dragging) return;
			const dx = event.clientX - startX;
			if (!moved && Math.abs(dx) < CLICK_SLOP) return;
			if (!moved) {
				moved = true;
				track.setPointerCapture(event.pointerId);
			}

			const dt = event.timeStamp - lastTime;
			if (dt > 0) velocity = ((event.clientX - lastX) / dt) * 1000;
			lastX = event.clientX;
			lastTime = event.timeStamp;

			// Half-strength rubber band past either end, like motion's dragElastic.
			const min = -(slides.length - 1) * offset;
			let x = startTrackX + dx;
			if (x > 0) x /= 2;
			else if (x < min) x = min + (x - min) / 2;
			gsap.set(track, { x });
			render();
		});

		const release = () => {
			if (!dragging) return;
			dragging = false;
			// A plain press still has to finish whatever tween it interrupted.
			goTo(moved ? nextIndex(index, trackX() - startTrackX, velocity, slides.length) : index);
		};
		track.addEventListener('pointerup', release);
		track.addEventListener('pointercancel', release);

		// A drag that ends over a link must not follow it.
		track.addEventListener(
			'click',
			(event) => {
				if (!moved) return;
				event.preventDefault();
				moved = false;
			},
			true,
		);
		// Links and images are natively draggable, which would steal the pointer.
		track.addEventListener('dragstart', (event) => event.preventDefault());

		root.addEventListener('keydown', (event) => {
			if (event.key === 'ArrowLeft') goTo(Math.max(0, index - 1));
			else if (event.key === 'ArrowRight') goTo(Math.min(slides.length - 1, index + 1));
		});

		dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

		goTo(0);
	}
}
