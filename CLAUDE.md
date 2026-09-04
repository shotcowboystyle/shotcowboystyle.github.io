# CLAUDE.md

Guidance for Claude Code in this repo. Personal portfolio for Curtis Blanton — Astro static site
with GSAP / Three.js / Lottie animation and Playwright E2E coverage.

Stack, scripts, directory layout and lint/format rules are all derivable from `package.json`,
`astro.config.mjs`, `tsconfig.json`, and the lint configs — read those rather than a copy here.
This file holds only what the codebase can't tell you.

## Git workflow

- **Lefthook**: pre-commit and pre-push hooks enforce quality checks.
- **Commitizen** is opened by the `prepare-commit-msg` hook — commit with plain `git commit`, not a
  wrapper script.
- **Conventional Commits** required, validated by commitlint at `commit-msg`.
- **Stage ownership**: each check runs at exactly one stage — staged-file lint at `pre-commit`,
  typecheck / Knip / dedupe at `pre-push`, full-repo lint in CI. Don't duplicate a check across stages.

## Unit testing (Vitest)

- **Colocation**: tests sit next to their subject as `src/**/*.test.ts`.
- **Explicit imports**: import `describe`/`it`/`expect`/`vi` from `vitest` — globals are NOT enabled.
- **Environment**: `happy-dom`, so `window`, `document` and `navigator` are available.
- **Module-level globals**: modules that read a global at import time (e.g. `src/utils/detect.ts`)
  need `vi.stubGlobal` + `vi.resetModules()` + a dynamic `import()` per case.
- **Injectable targets**: prefer passing an `EventTarget` over relying on `document`, as
  `TypedEventBus` allows.
- **Documenting defects**: when a test pins existing buggy behavior, say so in a comment and keep the
  fix in its own commit.

## Visual regression

There is no visual-regression suite. The previous one was fully `test.skip`ed with golden images that
no longer matched the UI, so it asserted nothing. Reintroducing it needs golden images generated on
the CI platform (ubuntu-latest), not on a contributor's machine — font rendering differs enough to
make macOS-generated snapshots fail in CI.

## Performance thresholds

Lighthouse audits must meet: Performance 90+, Accessibility 95+, Best Practices 90+, SEO 95+.
WCAG 2.1 AA compliance is required, not optional.

## Environment

No secrets in this static site project — all config is build-time. Create `.env` from `.env.example`.

## Troubleshooting

- **TypeScript errors**: run `pnpm astro sync` to regenerate `.astro` types.
- **Cache issues**: delete `.astro/`, `dist/`, `node_modules/` and reinstall.
- **Full gate**: `pnpm validate` (format:check + lint:check + types:check + test).

## Design context

Strategy and visual system live in root-level docs — read these before any design or UI work.

- **[`PRODUCT.md`](./PRODUCT.md)** — register (brand), users, brand personality, anti-references, 5
  design principles, accessibility (WCAG 2.1 AA + reduced-motion first-class).
- **[`DESIGN.md`](./DESIGN.md)** — visual spec (DESIGN.md format). Creative North Star: _"The Kinetic
  Monograph"_. Palette (Signal Mint / Cobalt Draft / Lavender Wash on Canvas Black + Card Off-White)
  is documented but marked **pre-decision**.
- **`.impeccable/design.json`** — sidecar with tonal ramps, motion tokens, and canonical component
  snippets consumed by the impeccable live panel.

The `impeccable` skill (`.claude/skills/impeccable/`) reads these on every invocation. Use
`/impeccable` sub-commands (`critique`, `audit`, `polish`, `colorize`, `live`, etc.) for
design-facing work.
