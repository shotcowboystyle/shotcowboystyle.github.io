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
 * - `wipe`: stepping out of the portfolio into a side room, or back.
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

	/**
	 * @param {ViewTransition} viewTransition
	 * @param {URL} from
	 * @param {URL} to
	 */
	const prepare = (viewTransition, from, to) => {
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
