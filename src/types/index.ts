export type PageMetaData = {
	title?: string;
	description?: string;
	/** `article` for case studies, `website` everywhere else. */
	type?: 'website' | 'article';
	/**
	 * Root-relative path to the share image for this page (e.g. the processed
	 * `src` of an Astro image asset). Resolved against the site origin before it
	 * is emitted, because Open Graph consumers do not follow relative URLs.
	 */
	image?: string;
};
