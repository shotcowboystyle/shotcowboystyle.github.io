import { getCollection, type CollectionEntry } from 'astro:content';

type Project = CollectionEntry<'project'>;

/**
 * The one project order, shared by the landing stack, the folios and the
 * Index. Filename order, which is what the stack has always used.
 */
export async function getProjects(): Promise<Project[]> {
	const projects = await getCollection('project');
	return projects.sort((a, b) => a.id.localeCompare(b.id));
}

/** The plate after this one, wrapping from the last back to the first. */
export function nextProject<T>(projects: readonly T[], index: number): T {
	return projects[(index + 1) % projects.length];
}

/**
 * A plate's ground as inline style: the flat `cardColor`, plus the two-bloom
 * aurora for projects whose own ground is a gradient. Longhands rather than the
 * `background` shorthand, so a page can still size the blooms (the folio pins
 * them to its first screen). Both values are schema-validated hex, which is
 * what makes them safe to interpolate here.
 */
export function plateBackground(data: Project['data']): string {
	const color = `background-color: ${data.cardColor};`;
	if (!data.cardAurora) return color;

	const [first, second] = data.cardAurora;
	return `${color} background-image: radial-gradient(105% 56% at 8% -4%, ${first} 0%, transparent 60%), radial-gradient(88% 44% at 98% 14%, ${second} 0%, transparent 56%);`;
}
