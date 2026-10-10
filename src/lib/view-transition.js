// @ts-check
/**
 * Cross-document view transitions: which choreography a navigation gets.
 *
 * Every page opts in with `@view-transition { navigation: auto }` (base.css),
 * and so does the experiments site, which shares this origin. The motion
 * itself is CSS keyed off `:active-view-transition-type()`; this script only
 * names the type and picks the element whose title travels.
 *
 * - `turn-open`: a project plate turns over into its folio. The plate-turn
 *   hover, completed.
 * - `turn-close`: the folio closes back onto the stack.
 * - `wipe`: stepping out of the portfolio into a side room, or back. A clicked
 *   link to or from one of this site's side rooms gets the striped curtain
 *   (`page-curtain.astro`) instead, which also runs where view transitions don't.
 *
 * This is a classic script inlined into <head> by base.astro, not a module:
 * `pagereveal` fires at the new page's first rendering opportunity, which can
 * come before deferred module scripts run. Browsers without cross-document
 * view transitions never fire either event, and simply navigate.
 */
(() => {
	const WORK_PATH = /^\/work\/([^/]+)\/?$/;
	const SIDE_ROOM_PATH = /^\/(experiments|immature|tower-blocks)(\/|$)/;

	/** @param {URL} url */
	const workSlug = (url) => WORK_PATH.exec(url.pathname)?.[1] ?? null;

	/**
	 * @param {URL} from
	 * @param {URL} to
	 * @returns {'turn-open' | 'turn-close' | 'wipe' | null}
	 */
	const transitionType = (from, to) => {
		if (from.origin !== to.origin || from.pathname === to.pathname) return null;

		const fromWork = workSlug(from) !== null;
		const toWork = workSlug(to) !== null;

		if (toWork && (fromWork || from.pathname === '/')) return 'turn-open';
		if (fromWork && to.pathname === '/') return 'turn-close';
		if (SIDE_ROOM_PATH.test(from.pathname) !== SIDE_ROOM_PATH.test(to.pathname)) return 'wipe';

		return null;
	};

	/**
	 * Only one element may carry `folio-title` per snapshot, and a page restored
	 * from the back-forward cache still has whatever was set before it was
	 * frozen, so the previous name is always cleared first.
	 *
	 * @type {HTMLElement | null}
	 */
	let named = null;

	/** @param {string | null} slug */
	const nameTitle = (slug) => {
		if (named) named.style.viewTransitionName = '';
		named = null;
		if (!slug) return;

		/** @type {HTMLElement | null} */
		const title = document.querySelector(
			`[data-folio-slug="${CSS.escape(slug)}"] [data-folio-title]`,
		);
		if (!title) return;

		// A title outside the viewport would morph in from wherever it sits in the
		// document and read as a glitch. The page still turns; the title stays.
		const { top, bottom } = title.getBoundingClientRect();
		if (bottom <= 0 || top >= window.innerHeight) return;

		title.style.viewTransitionName = 'folio-title';
		named = title;
	};

	/*
	 * The curtain: seven striped bars that close over a step into or out of a
	 * side room, and open again on the page that arrives. The wipe above only
	 * exists where cross-document view transitions do; the curtain runs in every
	 * browser, so a clicked side-room link gets the curtain and the wipe is left
	 * for Back and Forward. `/experiments` is a separate site that never
	 * renders the bars, so it keeps the wipe.
	 */
	const EXPERIMENTS_PATH = /^\/experiments(\/|$)/;
	const CURTAIN_KEY = 'curtain';
	const CURTAIN_ITEM = '.js-curtain-item';

	/**
	 * @param {URL} from
	 * @param {URL} to
	 */
	const curtained = (from, to) =>
		transitionType(from, to) === 'wipe' &&
		!EXPERIMENTS_PATH.test(from.pathname) &&
		!EXPERIMENTS_PATH.test(to.pathname);

	/**
	 * @param {Keyframe[]} keyframes
	 * @param {{ duration: number, delay: number, origin: string }} timing
	 */
	const animateCurtain = (keyframes, { duration, delay, origin }) => {
		const items = [...document.querySelectorAll(CURTAIN_ITEM)];
		const animations = items.map((item, index) => {
			/** @type {HTMLElement} */ (item).style.transformOrigin = origin;
			return item.animate(keyframes, {
				duration,
				delay: delay + index * 200,
				easing: 'cubic-bezier(0.32, 0.72, 0, 1)',
				fill: 'forwards',
			});
		});
		return Promise.all(animations.map((animation) => animation.finished));
	};

	// Set before first paint, so the arriving page is already behind the bars.
	if (sessionStorage.getItem(CURTAIN_KEY)) {
		document.documentElement.classList.add('is-curtained');

		document.addEventListener(
			'DOMContentLoaded',
			() => {
				void animateCurtain([{ transform: 'scaleY(1)' }, { transform: 'scaleY(0)' }], {
					duration: 1000,
					delay: 300,
					origin: 'top right',
				}).then(() => {
					document.documentElement.classList.remove('is-curtained');
					sessionStorage.removeItem(CURTAIN_KEY);
				});
			},
			{ once: true },
		);
	}

	document.addEventListener('click', (event) => {
		if (
			event.defaultPrevented ||
			event.button !== 0 ||
			event.metaKey ||
			event.ctrlKey ||
			event.shiftKey ||
			event.altKey ||
			// Reduced motion: a plain navigation, with the short crossfade.
			!document.documentElement.classList.contains('has-motion')
		) {
			return;
		}

		const link = /** @type {Element | null} */ (event.target)?.closest?.('a[href]');
		if (
			!(link instanceof HTMLAnchorElement) ||
			(link.target && link.target !== '_self') ||
			link.hasAttribute('download')
		) {
			return;
		}

		const to = new URL(link.href);
		if (!curtained(new URL(window.location.href), to)) return;

		event.preventDefault();
		void animateCurtain([{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }], {
			duration: 600,
			delay: 0,
			origin: 'bottom left',
		}).then(() => {
			sessionStorage.setItem(CURTAIN_KEY, '1');
			window.location.assign(to.href);
		});
	});

	// Back to a page that closed the curtain: the back-forward cache restores it
	// with the bars still drawn across it.
	window.addEventListener('pageshow', (event) => {
		if (!event.persisted) return;
		for (const item of document.querySelectorAll(CURTAIN_ITEM)) {
			for (const animation of item.getAnimations()) animation.cancel();
		}
	});

	/**
	 * @param {ViewTransition} viewTransition
	 * @param {URL} from
	 * @param {URL} to
	 */
	const prepare = (viewTransition, from, to) => {
		// The curtain is already covering this navigation.
		if (sessionStorage.getItem(CURTAIN_KEY)) {
			nameTitle(null);
			viewTransition.skipTransition();
			return;
		}

		const type = transitionType(from, to);

		// Opening, the title that travels is the destination's; closing, it is the
		// folio being left. Both pages mark it with the same `data-folio-slug`.
		if (type === 'turn-open') nameTitle(workSlug(to));
		else if (type === 'turn-close') nameTitle(workSlug(from));
		else nameTitle(null);

		if (type) viewTransition.types.add(type);
	};

	window.addEventListener('pageswap', (event) => {
		const destination = event.activation?.entry.url;
		if (!event.viewTransition || !destination) return;

		prepare(event.viewTransition, new URL(window.location.href), new URL(destination));
	});

	window.addEventListener('pagereveal', (event) => {
		// The Navigation API is how the new page learns where it came from.
		// Without it (older Safari), the default crossfade runs instead.
		const origin = 'navigation' in window ? navigation.activation?.from?.url : undefined;
		if (!event.viewTransition || !origin) {
			nameTitle(null);
			return;
		}

		prepare(event.viewTransition, new URL(origin), new URL(window.location.href));
	});
})();
