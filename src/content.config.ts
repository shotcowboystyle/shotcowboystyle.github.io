import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projectCollection = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/project' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			bgImage: image(),
			screenshotImage: image(),
			url: z.string(),
			linkText: z.string(),
			tags: z.array(z.string()),
			variant: z.enum(['feature', 'split', 'poster']).default('feature'),
			role: z.string(),
			timeline: z.string(),
			stack: z.array(z.string()),
			problem: z.string(),
			approach: z.array(
				z.object({
					name: z.string(),
					body: z.string(),
				}),
			),
			motionMoments: z
				.array(
					z.object({
						name: z.string(),
						description: z.string(),
					}),
				)
				.default([]),
			credits: z.array(z.string()).default([]),
			nextSlug: z.string(),
		}),
});

const testimonialCollection = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/testimonial' }),
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			testimonial: z.string(),
			avatar: image(),
			designation: z.string(),
			companyName: z.string(),
			order: z.number(),
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
	testimonial: testimonialCollection,
	social: socialCollection,
};
