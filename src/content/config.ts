import { defineCollection, z } from 'astro:content';

const projectCollection = defineCollection({
	type: 'content',
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			bgImage: image(),
			screenshotImage: image(),
			url: z.string(),
			linkText: z.string(),
			tags: z.array(z.string()),
		}),
});

const testimonialCollection = defineCollection({
	type: 'content',
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
	type: 'data',
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
