## Possibly useful functions

### Dynamically get all Pages

```sh
import { XMLParser } from "fast-xml-parser";
import fs from "fs";

export function getPages(): string[] {
	const sitemapFileName = fs
		.readdirSync("dist")
		.reduce((acc, fileName) => (fileName.includes("sitemap-0") ? fileName : acc), "");
	const sitemap = fs.readFileSync(`${process.cwd()}/dist/${sitemapFileName}`, "utf-8");
	const parser = new XMLParser();
	const sitemapJson = parser.parse(sitemap);
	const pages = sitemapJson.urlset.url.map(({ loc }: { loc: string }) => {
		const url = new URL(loc);
		return url.pathname;
	});
	return pages;
}
```

### Reusable "devices" config

```sh
import { devices as playwrightDevices } from "playwright";

export const devices: Record<"mobile" | "desktop", unknown> = {
	mobile: playwrightDevices["iPhone X"],
	desktop: {
		...playwrightDevices["Desktop Chrome"],
		viewport: {
			width: 1440,
			height: 900,
		},
	},
};
```

### Utils

```sh
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { port as defaultPort } from './config.js';

export const removeTrailingSlash = (url: string) =>
	url.endsWith('/') ? url.slice(0, url.length - 1) : url;

export const getUrl = (p: string, port = defaultPort) => (process.env.CI_BASEURL || `http://localhost:${port}`) + p;

export const customSnapshotIdentifier = (
	path: string,
	environmentName: string,
	extension: string,
) =>
	`pages${
		path === '/' ? '-index' : removeTrailingSlash(path).split('/').join('-')
	}-${environmentName}.${extension}`;

export const getFilename = fileURLToPath;
export const getDirname = (path: string) => dirname(getFilename(path));
```
