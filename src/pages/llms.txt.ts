import { getProjects } from '@/lib/projects';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

/**
 * Plain-markdown summary of the site for AI answer tools (https://llmstxt.org).
 * Built from the same collections as the pages, so it can't drift from them.
 */
export const GET: APIRoute = async ({ site }) => {
	const projects = await getProjects();
	const socials = await getCollection('social');
	const url = (path: string) => new URL(path, site).href;

	const body = [
		'# Curtis Blanton',
		'',
		'> Full-stack developer based in Charleston, SC. Fifteen-plus years shipping scalable web work: product UI, marketing sites, and interactive brand pieces.',
		'',
		'## Work',
		'',
		...projects.map(
			({ id, data }) =>
				`- [${data.title}](${url(`/work/${id}/`)}): ${data.description}${data.url ? ` Live: ${data.url}` : ''}`,
		),
		'',
		'## About',
		'',
		`- [Resume (PDF)](${url('/downloads/Resume.pdf')})`,
		...socials.map(({ data }) => `- [${data.name}](${data.link})`),
		'',
	].join('\n');

	return new Response(body);
};
