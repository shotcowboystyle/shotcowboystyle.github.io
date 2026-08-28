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

| Area      | Tools                                                                    |
| --------- | ------------------------------------------------------------------------ |
| Framework | Astro 6, TypeScript 6 (strict)                                           |
| Styling   | Tailwind CSS 4, DaisyUI, PostCSS                                         |
| Motion    | GSAP, Three.js, Cannon.js, Lottie Web, SplitType, Lenis (smooth scroll)  |
| Maps      | MapLibre GL                                                              |
| Testing   | Playwright, @axe-core/playwright, playwright-lighthouse                  |
| Tooling   | ESLint 10, Prettier 3, Stylelint 17, cSpell, Knip, Lefthook              |
| Build     | Sharp, astro-compress, astro-critters, astro-purgecss, rollup-visualizer |
| Runtime   | Node 24 (via mise), pnpm                                                 |

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
├── config/            animation tokens, compile-time type assertions, usage notes
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

e2e/                   Playwright suites + committed visual snapshots
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

pnpm test            # every Playwright suite
pnpm validate        # format + lint + types + tests
pnpm clean           # nuke .astro, dist, lighthouse, node_modules, caches
```

Commits go through plain `git commit` — the `prepare-commit-msg` hook opens the Commitizen prompt.

`lint:check` fans out over: `lint:code` (ESLint), `lint:styles` (Stylelint), `lint:spelling`
(cSpell), `lint:knip` (dead code and unused deps), `lint:manifest` (npm-package-json-lint), and
`lint:packages` (`pnpm dedupe --check`).

---

## Testing

Four suites under `e2e/tests/`, runnable individually:

```bash
pnpm test:e2e:accessibility   # axe-core WCAG checks
pnpm test:e2e:pages           # routing and interaction
pnpm test:e2e:performance     # Lighthouse audit, performance threshold 90
pnpm test:e2e:visual          # screenshot comparison
pnpm test:playwright:ui       # interactive debugging
pnpm test:playwright:debug
```

Playwright starts `pnpm preview` automatically unless `PLAYWRIGHT_TEST_BASE_URL` is set. Five
projects run: `chromium`, `firefox`, `mobile-chrome` (Pixel 5), `tablet-safari` (iPad gen 6), and
`desktop-chrome` — the last owns the Lighthouse spec exclusively, and the others exclude it.
Viewport-specific tests are selected with `@mobile` / `@tablet` / `@desktop` tags. Snapshots live in
`e2e/tests/__screenshots__/` and are keyed by project name; HTML reports land in `e2e/output/html/`.

---

## Quality gates

**Lefthook** (installed by `pnpm install`) runs checks at three points:

- `prepare-commit-msg` — Commitizen prompt
- `commit-msg` — commitlint, conventional-commits config
- `pre-commit` — Prettier, ESLint, Stylelint, cSpell, package-json lint on staged files (fixes are re-staged)
- `pre-push` — typecheck, Knip, `pnpm dedupe --check`

Hooks call binaries directly from `node_modules/.bin/` rather than through `pnpm exec`. Full-repo
spell checking lives in CI only, so each check runs at exactly one stage.

**CI** (`.github/workflows/ci.yml`) has two jobs. `verify` runs on every pull request and push to
`main`: format, lint, typecheck, build, e2e. `deploy` runs only on push and publishes `dist/` to
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
