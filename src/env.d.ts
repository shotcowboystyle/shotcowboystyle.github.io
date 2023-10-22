// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type ImportMetaEnv = {
	readonly PUBLIC_MAPLIBRE_TILES_API_KEY: string;
	readonly PUBLIC_GOOGLE_SITE_VERIFICATION_ID: string;
};

type ImportMeta = {
	readonly env: ImportMetaEnv;
};

// TODO replace if added to lib.dom.d.ts
declare let ScrollTimeline: {
	prototype: AnimationTimeline;
	new (opts: {
		source: Element;
		axis?: 'block' | 'inline' | 'y' | 'x' | undefined;
	}): AnimationTimeline;
};

// TODO replace if added to lib.dom.d.ts
declare let ViewTimeline: {
	prototype: AnimationTimeline;
	new (opts: {
		subject: Element;
		axis?: 'block' | 'inline' | 'y' | 'x' | undefined;
		inset?: 'auto' | (string & object) | undefined;
	}): AnimationTimeline;
};
