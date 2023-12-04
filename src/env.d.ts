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
