import { getCollection, type CollectionEntry } from 'astro:content';

type Project = CollectionEntry<'project'>;

/** Project slugs in display order. A project not listed here sorts last. */
const ORDER = ['charleston-bonsai', 'isla-suds', 'kalmia-woods', 'clean-break', 'holy-city-live'];

const rank = (id: string) => (ORDER.includes(id) ? ORDER.indexOf(id) : ORDER.length);

/**
 * The one project order, shared by the landing stack, the folios and the
 * Index.
 */
export async function getProjects(): Promise<Project[]> {
	const projects = await getCollection('project');
	return projects.sort((a, b) => rank(a.id) - rank(b.id) || a.id.localeCompare(b.id));
}

/** The plate after this one, wrapping from the last back to the first. */
export function nextProject<T>(projects: readonly T[], index: number): T {
	return projects[(index + 1) % projects.length];
}

/**
 * A plate's ground and ink as inline style: the flat `cardColor`, the
 * `cardInk` text color (exposed with the ground as `--card-ink` and
 * `--card-ground`, for buttons that invert them), plus the two-bloom aurora for
 * projects whose own ground is a gradient. Longhands rather than the
 * `background` shorthand, so a page can still size the blooms (the folio pins
 * them to its first screen). Every value is schema-validated hex, which is what
 * makes them safe to interpolate here.
 */
export function plateBackground(data: Project['data']): string {
	const color = `background-color: ${data.cardColor}; color: ${data.cardInk}; --card-ink: ${data.cardInk}; --card-ground: ${data.cardColor};`;
	if (!data.cardAurora) return color;

	const [first, second] = data.cardAurora;
	return `${color} background-image: radial-gradient(105% 56% at 8% -4%, ${first} 0%, transparent 60%), radial-gradient(88% 44% at 98% 14%, ${second} 0%, transparent 56%);`;
}
