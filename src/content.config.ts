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
			 * which of the two it is ("View Site" / "View Source"). Omit `url` for a
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
			variant: z.enum(['feature', 'split', 'poster']).default('feature'),
			/**
			 * Flat plate color of the card, and its only background. The
			 * gradient-mesh `bgImage` SVGs that used to sit on top of it are gone,
			 * so this carries the corners, the plate-turn rotation gap, and any
			 * image-load gap. Constrained to a 6-digit hex so it is safe to
			 * interpolate into an inline `style` attribute.
			 */
			cardColor: z
				.string()
				.regex(/^#[0-9a-f]{6}$/i, 'cardColor must be a 6-digit hex color, e.g. #1b3a2a'),
			/**
			 * Optional two-bloom radial "aurora" over `cardColor`, for projects whose
			 * own ground is a gradient (Clean Break). Hex-only for the same inline
			 * `style` safety reason as `cardColor`.
			 */
			cardAurora: z
				.tuple([z.string().regex(/^#[0-9a-f]{6}$/i), z.string().regex(/^#[0-9a-f]{6}$/i)])
				.optional(),
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
