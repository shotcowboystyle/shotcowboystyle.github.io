import { EXPERIMENTS_FEED_URL } from '@/constants';
import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projectCollection = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/project' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			screenshotImage: image(),
			/**
			 * Where the folio sends you — the live site, or the repository for the
			 * projects that ship as source. `linkText` is that link's label and says
			 * which it is ("View Site" / "View Source" / "Join the Beta"). Omit `url` for a
			 * project with nowhere public to go yet; the folio then shows no link.
			 */
			url: z.url().optional(),
			linkText: z.string(),
			/** Folio facts. Only what can be checked: leave a field out rather than guess. */
			year: z.string().optional(),
			role: z.string().optional(),
			/**
			 * The folio's plates beyond the card screenshot. `device` decides the
			 * frame: desktop captures run wide, phone captures cluster in threes.
			 */
			gallery: z
				.array(
					z.object({
						image: image(),
						alt: z.string(),
						device: z.enum(['desktop', 'phone']).default('desktop'),
					}),
				)
				.default([]),
			/**
			 * The markdown body is the project's story. It renders on the folio only
			 * once this is true, so a draft can live beside the facts without
			 * shipping.
			 */
			storyReady: z.boolean().default(false),
			tags: z.array(z.string()),
			variant: z.enum(['feature', 'split']).default('feature'),
			/**
			 * The project's brand ground: the folio plate, the next-project plate,
			 * and the base fill of `cardBg`, so the card shows no seam while the art
			 * loads. Constrained to a 6-digit hex so it is safe to interpolate into
			 * an inline `style` attribute.
			 */
			cardColor: z
				.string()
				.regex(/^#[0-9a-f]{6}$/i, 'cardColor must be a 6-digit hex color, e.g. #1b3a2a'),
			/**
			 * Text color on `cardColor`: title, tags, description and buttons. Must
			 * clear WCAG AA (4.5:1) against it. Hex-only for the same inline `style`
			 * safety reason as `cardColor`.
			 */
			cardInk: z
				.string()
				.regex(/^#[0-9a-f]{6}$/i, 'cardInk must be a 6-digit hex color, e.g. #1b1a17')
				.default('#ffffff'),
			/**
			 * The landing card's art: brand-derived shapes on `cardColor`, drawn at
			 * 1856×889. `cardBgMobile` is the same art recomposed at 768×1300 for
			 * phones. The copy sits bottom-left (feature) or top-right (split), and
			 * in the bottom half on a phone, so the art keeps out of those zones.
			 */
			cardBg: image().optional(),
			cardBgMobile: image().optional(),
			/**
			 * Optional two-bloom radial "aurora" over `cardColor`, for projects whose
			 * own ground is a gradient (Clean Break). Hex-only for the same inline
			 * `style` safety reason as `cardColor`.
			 */
			cardAurora: z
				.tuple([z.string().regex(/^#[0-9a-f]{6}$/i), z.string().regex(/^#[0-9a-f]{6}$/i)])
				.optional(),
			/**
			 * The project's own logo, filling the folio's cover band in place of the
			 * screenshot. Pick the variant that reads on `cardColor`.
			 */
			logo: image().optional(),
			/**
			 * Brand art for the cover band, shown edge to edge. Takes precedence
			 * over `logo`, for a brand whose mark lives in a full illustration.
			 */
			cover: image().optional(),
			/**
			 * The cover band's ground, behind `cover` or `logo`: the art's own
			 * background so it reads edge to edge, or a brand color that sets the
			 * mark apart from the plate. Hex-only, as `cardColor`.
			 */
			coverColor: z
				.string()
				.regex(/^#[0-9a-f]{6}$/i, 'coverColor must be a 6-digit hex color')
				.optional(),
			/**
			 * The brand's color tokens, shown as swatches on the folio. `token` is
			 * the name as the brand ships it; `hex` is its value, converted to hex
			 * where the brand defines it in another space. Hex-only for the same
			 * inline `style` safety reason as `cardColor`.
			 */
			brandColors: z
				.array(
					z.object({
						token: z.string(),
						hex: z.string().regex(/^#[0-9a-f]{6}$/i, 'hex must be a 6-digit hex color'),
					}),
				)
				.default([]),
		}),
});

/** Work history, from `public/downloads/Resume.pdf`. Months are `YYYY-MM`. */
const cvCollection = defineCollection({
	loader: file('src/content/cv.json'),
	schema: z.object({
		company: z.string(),
		role: z.string(),
		start: z.string().regex(/^\d{4}-\d{2}$/),
		/** Absent while the role is current. */
		end: z
			.string()
			.regex(/^\d{4}-\d{2}$/)
			.optional(),
	}),
});

/**
 * The experiments site's feed, read at build time. It lives in its own
 * repository and deploys to /experiments/ on this origin. An unreachable feed
 * fails the build rather than shipping an empty Experiments plate.
 */
const experimentCollection = defineCollection({
	loader: async () => {
		const response = await fetch(EXPERIMENTS_FEED_URL);
		if (!response.ok) {
			throw new Error(
				`Experiments feed returned ${response.status} from ${EXPERIMENTS_FEED_URL}. Deploy the experiments site first.`,
			);
		}
		const entries: { slug: string }[] = await response.json();
		return entries.map((entry) => ({ id: entry.slug, ...entry }));
	},
	schema: z.object({
		slug: z.string(),
		title: z.string(),
		description: z.string(),
		poster: z.url(),
		pubDate: z.coerce.date(),
	}),
});

const socialCollection = defineCollection({
	loader: glob({ pattern: '**/*.json', base: './src/content/social' }),
	schema: z.object({
		name: z.string(),
		link: z.string(),
		icon: z.string(),
	}),
});

export const collections = {
	project: projectCollection,
	social: socialCollection,
	cv: cvCollection,
	experiment: experimentCollection,
};
