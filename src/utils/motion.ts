/**
 * Single source of truth for the site's motion contract.
 *
 * `base.astro` adds `has-motion` to `<html>` in an inline script before first
 * paint, but only when the user has *not* asked for reduced motion. CSS reads
 * that class directly; this helper lets the JS motion modules read the same
 * signal instead of each calling `matchMedia` on their own.
 */
export const prefersReducedMotion = (): boolean =>
	!document.documentElement.classList.contains('has-motion');
