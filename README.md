# shotcowboystyle.github.io

Personal portfolio site for **Curtis Blanton** — a statically generated Astro site with
interactive 3D, scroll-driven motion, and a strict quality gate.

**Live:** <https://shotcowboystyle.github.io>

---

## Overview

The site is built with Astro's islands architecture: pages ship as static HTML, and only the
interactive pieces (3D scenes, scroll animation, maps, Lottie) hydrate on the client. Content
(projects, testimonials, social links) lives in typed Astro content collections, so adding work
means adding Markdown — not templates.

Priorities, in order: accessibility (WCAG 2.1 AA), performance (Lighthouse 90+), then visual
polish. Motion respects `prefers-reduced-motion` throughout.

### Stack

| Area      | Tools                                                                      |
| --------- | -------------------------------------------------------------------------- |
| Framework | Astro 6, TypeScript 6 (strict)                                             |
| Styling   | Tailwind CSS 4, DaisyUI, PostCSS                                           |
| Motion    | GSAP, Three.js, Cannon.js, Lottie Web, SplitType, Lenis (smooth scroll)    |
| Maps      | MapLibre GL                                                                |
| Testing   | Vitest, happy-dom, Playwright, @axe-core/playwright, playwright-lighthouse |
| Tooling   | ESLint 10, Prettier 3, Stylelint 17, cSpell, Knip, Lefthook                |
| Build     | Sharp, astro-compress, astro-critters, astro-purgecss, rollup-visualizer   |
| Runtime   | Node 24 (via mise), pnpm                                                   |

---

## Quick start

```bash
mise install          # Node 24 + corepack/pnpm
pnpm install          # installs deps, runs `lefthook install`
cp .env.example .env  # fill in the public keys below
pnpm dev              # http://localhost:4321
```

### Environment

No secrets — everything is build-time and `PUBLIC_`-prefixed. In CI these come from repository
secrets.

| Variable                             | Used by                                 |
| ------------------------------------ | --------------------------------------- |
| `PUBLIC_MAPLIBRE_TILES_API_KEY`      | MapLibre tile requests (location block) |
| `PUBLIC_GOOGLE_SITE_VERIFICATION_ID` | Search Console verification meta tag    |

---

## Repository layout

```
src/
├── assets/            images, photos, favicons, SVG sprite source
├── components/        .astro UI components (about/, common/, testimonials/)
├── config/            animation tokens, their unit tests and usage notes
├── content/           content collections: project/, testimonial/, social/
├── content.config.ts  zod schemas for the collections above
├── layouts/           base.astro, game.astro
├── lib/               client behavior: landing, smooth-scroll, text-reveal,
│                      loader/scroll animations, map/, text-split/
├── pages/             file-based routes (index, 404, work/[slug], one-offs)
├── styles/            global CSS
├── sw/                service worker modules (cache, fetch, push, ...)
├── types/             shared type declarations
└── utils/             color, date, dom, debounce, detect, event bus, ...

e2e/                   Playwright suites: accessibility, performance, pages
public/                static passthrough: fonts, icons, geojson, downloads
lighthouse/            generated Lighthouse reports
.github/               CI workflow, CodeQL, composite prepare action
.impeccable/           design system sidecar (tokens, motion, snippets)
```

Import with the `@/` alias, which resolves to `src/`.

The service worker is assembled from `src/sw/` by the `astro-sw` integration and emitted straight
to `dist/sw.js` at build time — it is generated output, not a checked-in file.

### Adding a project case study

Drop a Markdown file into `src/content/project/`. The schema in `src/content.config.ts` requires
`title`, `description`, `bgImage`, `screenshotImage`, `url`, `linkText`, `tags`, `role`,
`timeline`, `stack`, `problem`, `approach[]`, and `nextSlug`; `variant` (`feature` | `split` |
`poster`), `motionMoments[]`, and `credits[]` are optional. The route
`src/pages/work/[slug].astro` renders it — no other wiring needed.

---

## Scripts

```bash
pnpm dev             # dev server
pnpm build           # production build to ./dist
pnpm preview         # serve the built site

pnpm format:check    # Prettier
pnpm format:fix
pnpm lint:check      # all linters in parallel (see below)
pnpm lint:fix
pnpm types:check     # astro sync + tsc --noEmit + astro check

pnpm test            # unit suite, then every Playwright suite
pnpm test:unit       # unit suite only (fast)
pnpm validate        # format + lint + types + tests
pnpm clean           # nuke .astro, dist, lighthouse, node_modules, caches
```

Commits go through plain `git commit` — the `prepare-commit-msg` hook opens the Commitizen prompt.

`lint:check` fans out over: `lint:code` (ESLint), `lint:styles` (Stylelint), `lint:spelling`
(cSpell), `lint:knip` (dead code and unused deps), `lint:manifest` (npm-package-json-lint), and
`lint:packages` (`pnpm dedupe --check`).

---

## Testing

`pnpm test` runs the unit suite first, then every Playwright suite — the fast one fails before a
preview server is started.

### Unit — Vitest

```bash
pnpm test:unit            # single run
pnpm test:unit:watch      # watch mode
pnpm test:unit:coverage   # v8 coverage report, no enforced threshold
```

Tests live beside their subject as `src/**/*.test.ts` and run in a `happy-dom` environment, since
most of `src/utils/` touches `window`, `document` or `navigator`. `vitest.config.ts` declares the
`@/` alias directly rather than going through `getViteConfig`, which would load every Astro
integration — including `astro-sw`, which regenerates `public/sw.js` as a side effect.

Two patterns worth knowing before adding tests:

- `src/utils/detect.ts` reads `navigator.userAgent` into a module-level constant at import time, so
  its tests stub the global and then `vi.resetModules()` + dynamic `import()` per user agent.
- `TypedEventBus` takes an `EventTarget` in its constructor; pass `new EventTarget()` to keep tests
  isolated from `document`.

### End-to-end — Playwright

Three suites under `e2e/tests/`, runnable individually:

```bash
pnpm test:e2e:accessibility   # axe-core WCAG checks, every route
pnpm test:e2e:performance     # Lighthouse: perf 90, a11y 95, best-practices 90, SEO 95
pnpm test:e2e:pages           # routing and meta tags
pnpm test:playwright:ui       # interactive debugging
pnpm test:playwright:debug
```

The accessibility suite iterates every route — `/`, `/404`, `/immature`, `/tower-blocks` and one
per entry in the `project` content collection — so a new case study is covered without editing the
spec.

Playwright starts `pnpm preview` automatically unless `PLAYWRIGHT_TEST_BASE_URL` is set. Five
projects run: `chromium`, `firefox`, `mobile-chrome` (Pixel 5), `tablet-safari` (iPad gen 6), and
`desktop-chrome` — the last owns the Lighthouse spec exclusively, and the others exclude it.
Viewport-specific tests are selected with `@mobile` / `@tablet` / `@desktop` tags. HTML reports land
in `e2e/output/html/`.

There is no visual-regression suite. The previous one was fully `test.skip`ed with golden images
that no longer matched the UI; reintroducing it needs golden images generated on the CI platform
rather than a contributor's machine.

---

## Quality gates

**Lefthook** (installed by `pnpm install`) runs checks at three points:

- `prepare-commit-msg` — Commitizen prompt
- `commit-msg` — commitlint, conventional-commits config
- `pre-commit` — Prettier, ESLint, Stylelint, cSpell, package-json lint on staged files (fixes are re-staged)
- `pre-push` — unit tests, typecheck, Knip, `pnpm dedupe --check`

Hooks call binaries directly from `node_modules/.bin/` rather than through `pnpm exec`. Full-repo
spell checking lives in CI only, so each check runs at exactly one stage.

**CI** (`.github/workflows/ci.yml`) has two jobs. `verify` runs on every pull request and push to
`main`: format, lint, typecheck, unit tests, build, e2e — unit tests run before the browser
download and build so they fail cheaply. `deploy` runs only on push and publishes `dist/` to
GitHub Pages. CodeQL analysis runs separately; Renovate keeps dependencies current.

---

## Build notes

Production builds apply Critters (critical CSS inlining), PurgeCSS (with a safelist for
dynamically generated class names), astro-compress (CSS/JS/SVG), Sharp image optimization, and a
sitemap. `maplibre-gl`, `lottie-web`, and `gsap` are split into manual chunks on the client build
only — applying them to the SSR prerender pass breaks chunk resolution. `rollup-plugin-visualizer`
writes a bundle report to `stats.html`.

---

## Further reading

- [`CLAUDE.md`](./CLAUDE.md) — working conventions and workflows for AI-assisted development
- [`PRODUCT.md`](./PRODUCT.md) — brand register, audience, design principles, accessibility stance
- [`DESIGN.md`](./DESIGN.md) — visual specification and the "Kinetic Monograph" north star
- [`e2e/NOTES.md`](./e2e/NOTES.md) — testing notes

## License

MIT
