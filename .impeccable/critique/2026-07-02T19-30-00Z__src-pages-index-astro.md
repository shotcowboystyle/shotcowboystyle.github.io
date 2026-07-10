---
target: home
total_score: 24
p0_count: 1
p1_count: 4
timestamp: 2026-07-02T19-30-00Z
slug: src-pages-index-astro
---

Method: dual-agent (A: general-purpose · B: general-purpose)

## Design Health Score

| #         | Heuristic                       | Score     | Key Issue                                                                                                                |
| --------- | ------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------ |
| 1         | Visibility of System Status     | 3         | Availability pulse, spinning badge, scroll lottie all signal "live"; no designed keyboard-focus system                   |
| 2         | Match System / Real World       | 3         | Copy is honest; "Mystery Box" tile has no signage of purpose                                                             |
| 3         | User Control and Freedom        | 2         | Lenis intercepts anchor jumps; no "back to top"; no `Skip to content`; no escape from entrance choreography              |
| 4         | Consistency and Standards       | 2         | Four button vocabularies (black circle · white circle · pill · underline · scale-tile) with no primary/secondary ranking |
| 5         | Error Prevention                | 2         | `.c-animated-text { opacity: 0% }` gates the entire hero on JS; no CSS fallback (P0)                                     |
| 6         | Recognition Rather Than Recall  | 3         | Header socials icon-only; Mystery-Box tiles icon-only with `lg:tooltip` only (touch users get nothing)                   |
| 7         | Flexibility and Efficiency      | 2         | No keyboard shortcuts; testimonial `<div id="prev">`/`<div id="next">` not keyboard-reachable                            |
| 8         | Aesthetic and Minimalist Design | 3         | Hero disciplined; About grid is the noise floor                                                                          |
| 9         | Error Recovery                  | 2         | Map loading state is `<div>Loading…</div>` with no failure/retry; testimonial dropdown has no dismiss                    |
| 10        | Help and Documentation          | 2         | Hero copy is generic; no orienting cue for what the four project slabs are                                               |
| **Total** |                                 | **24/40** | **Acceptable — significant improvements needed**                                                                         |

## Anti-Patterns Verdict

**LLM assessment.** Not slop at the detail level. The mystery-box physics, the `CircleButton` plane orbit + textPath, and the resume-button hover bubbles all show a real hand. But the composition-family is saturated: black canvas + off-white rounded slab + oversized uppercase headline + top-right circle CTA + sticky-scale project slabs = the Awwwards-2023 "kinetic-portfolio" family everyone shipped. DESIGN.md aims at a _Kinetic Monograph_; what's on screen is _Kinetic Portfolio_.

**Deterministic scan** (`detect.mjs --json`, exit 2): 17 findings, all `design-system-color`. All undocumented color literals — resume-button gradient purples/blues/cyans (`resume-button.astro:71-102`), mystery-box white borders (`:247, 287, 292, 299`), one blue in the mystery-box gradient (`:186`), a MapLibre control white (`location-navigation.astro:101`), a fallback gray in `social-card.astro:81`. All the bans DESIGN.md calls out are clean: no `background-clip: text`, no colored side-stripe borders >1px, no `backdrop-filter`, no `01/02/03` scaffolding, no tracked eyebrows.

**Detector caught, LLM missed:**

- Bio dropdown body copy is `.text-slate-500` on `.bg-base-100` ≈ **3.5:1** on non-large text (`bio.astro:28,33,35,42,56,58,62,66`). Fails WCAG AA (4.5:1).
- Testimonial swiper prev/next are `<div id="prev">` and `<div id="next">` — mouse-only, no role/tabindex/handler (`testimonials-swiper.astro:27,53`).
- SPA nav leaks: `section-card-scroll-animation.ts`, `text-split`, `text-reveal`, and Swiper all lack destroy paths.
- Fonts declared `font-display: swap` with no `<link rel="preload">` — hero FOUT/CLS risk.
- Heading overflow: H1 `max-w-[8ch]` + "Developer." (10 chars) + base `h1 { font-size: 10rem }` bleeds in the 640-1023px band.

**False positives** (documented, not silently dropped): resume-button gradient RGBs are the bubble-hover keyframes — intentional decoration matching a real motion signature. MapLibre control white is vendor UI. Mystery-box white borders are decorative on the box's own dark bg gradient. Token gaps to document, not bugs.

**Visual overlays.** None. No browser automation exposed; fallback signal is the detector JSON above.

## Overall Impression

Real hands, real POV — but the composition sits inside a saturated family and the surface is doing work the copy and IA don't back up. Biggest opportunity: exit the kinetic-portfolio family at the silhouette level and let case studies vary in composition instead of tempo. Biggest risk: the hero content is invisible until JS fires — a P0 render-integrity bug hiding in the design system.

## What's Working

1. **Sticky-scale project reveal** (`src/lib/section-card-scroll-animation.ts:33-51`) is a real editorial device.
2. **Bio dropdowns as inline jokes** (`src/components/about/bio.astro:18-72`). This is the one place "shotcowboystyle." earns itself.
3. **`CircleButton` orbit + textPath** (`src/components/circle-button.astro:22-100, 122-145`). Strongest single micro-interaction on the page.

## Priority Issues

### [P0] Hero content depends on JS to become visible

- **Where:** `src/styles/base.css:333-335` (`.c-animated-text { opacity: 0% }`) + `:351-354` (`.split-line-child/.split-word-child { transform: translateY(100%) }`). Applied to H1, wordmark, and intro paragraph in `src/components/header-content.astro:21, 60, 85`. Un-hiding depends on `TextReveal.animate()` (`src/lib/text-reveal.ts:31-33`).
- **Why it matters:** Module-loader delay, GSAP failure, ad-blocker interference, or headless render → empty rounded rectangle. Zero `prefers-reduced-motion` coverage — reduce-motion users see the same hidden default. DESIGN.md forbids this: _"Reveal animations must enhance an already-visible default."_
- **Fix:** Move opacity/transform gates behind a `.js-ready` class set at the top of `landing.ts` before GSAP registration. Add `<noscript>` override. Add `@media (prefers-reduced-motion: reduce) { .c-animated-text { opacity: 100% !important } .split-*-child { transform: none !important } }` block.
- **Suggested command:** `/impeccable harden`.

### [P1] Copy register undercuts the visual argument

- **Where:** `src/components/header-content.astro:62` ("Full Stack<br />Senior Developer.") and `:87` ("I help companies build robust, scalable and engaging experiences through motion and space.")
- **Why it matters:** PRODUCT.md audience is agency CDs judging craft in seconds. Visual argues "creative-technologist / motion-forward monograph"; copy argues "senior engineer for hire." CD files you under the wrong role. "Robust, scalable and engaging" is filler.
- **Fix:** One committed sentence with a POV. Steal the tone from the bio dropdowns.
- **Suggested command:** `/impeccable clarify`.

### [P1] Four button vocabularies, no primary/secondary ranking

- **Where:** Black-circle "Let's Talk" (`header-content.astro:34-48`), white-circle animated `CircleButton` (`circle-button.astro`), pill "Resume" (`resume-button.astro`), underlined "About Me" text link (`header-content.astro:124-129`), soft-scale Contact tile (`about/about.astro:51`).
- **Why it matters:** Nielsen consistency fails. Peak-end fails — the site's most confident CTA is at the top; the actual conversion tile is smaller than the Mystery Box.
- **Fix:** Commit to an action-tier system in DESIGN.md. Make the Contact tile a mirror of "Let's Talk."
- **Suggested command:** `/impeccable distill` then `/impeccable polish`.

### [P1] About bento grid violates confident reduction

- **Where:** `src/components/about/about.astro:10-55` — six tiles, four distinct interaction models, socials duplicated between hero and `social-card`.
- **Why it matters:** Principle 2 is confident reduction; this is the opposite. A CD who arrived here wants hire signal + contact.
- **Fix:** Cut to three tiles — Bio (with rotating testimonial quote embedded), Location (map is a strong flex), Contact (large, primary treatment). Delete Social Card; move Mystery Box to a footer easter-egg.
- **Suggested command:** `/impeccable distill`.

### [P1] Detector-caught accessibility + contrast failures

- **Where:** Bio `.text-slate-500` on `.bg-base-100` ≈ 3.5:1 body-text contrast (`bio.astro:28,33,35,42,56,58,62,66`). Testimonial swiper `<div id="prev">`/`<div id="next">` (`testimonials-swiper.astro:27,53`). Bio dropdowns are `dropdown-hover` with `<span role="link">`; `<div role="dialog">` has no `aria-modal`/`aria-labelledby`. Mystery-Box anchors wrap SVGs whose only accessible name is `title` attribute.
- **Why it matters:** PRODUCT.md targets WCAG 2.1 AA. These are the AA gaps axe will catch.
- **Fix:** Bump bio muted text to `slate-700` or the design-system `slate-ink`. Replace prev/next divs with `<button>` elements. Add `aria-expanded` on bio triggers. Add `aria-label` on Mystery-Box anchors; add `<title>` children to SVGs.
- **Suggested command:** `/impeccable audit` then `/impeccable harden`.

### [P2] Project slabs repeat instead of pacing

- **Where:** `src/components/landing.astro:26-40` — every project renders through the same `<ProjectCard>` at the same composition.
- **Why it matters:** Principle 3 says editorial pacing; four identical crescendos is _tempo_, not _pacing_. Biggest move that separates you from the kinetic-portfolio family.
- **Fix:** Two or three project-card variants selected via a `variant:` field on the content collection. Let at least one project break the pattern intentionally.
- **Suggested command:** `/impeccable layout` or `/impeccable overdrive`.

## Persona Red Flags

**Jordan (First-Timer).** Icon-only social row can't be parsed without hover. Mystery Box has zero signage. Bio dropdowns look decorative — the joke never fires. About anchor jumps into a bento grid with no "About Me" heading to confirm arrival.

**Riley (Stress Tester).** `.c-animated-text` opacity gate — throttle CPU or disable JS and the hero is blank. `availability.astro:9` shows `formatDateMonthYear(new Date())` — claims availability for whatever month is current, forever. Long project tags will overflow `whitespace-nowrap` pills.

**Casey (Distracted Mobile).** Primary CTA ("Let's Talk") sits top-right — outside the thumb zone. Header footer row crams socials + About Me + Resume + scroll-lottie together at mobile widths. Mystery Box interactions gated on `(hover: hover) and (pointer: fine)` — touch users see static dots.

**CD Casey (project-specific persona).** Files "Full Stack Senior Developer" as engineer, not creative partner. Project cards have no _process_ beat — pretty screenshots without narrative depth. Contact tile is smaller than the Mystery Box; she has to hunt for a way to email.

## Minor Observations

- `header-content.astro:15` uses `bg-gray-200`; DESIGN.md defines `card-off-white` at `oklch(91% 0 0deg)`. Token drift.
- `landing.astro:12` sets `h-[200vh]` on the header wrapper while project wrappers are `h-[250vh]` (line 30). Likely accidental.
- `project-card.astro:37-38` has `flex-wr` (Tailwind typo) plus inline `flex-flow: wrap` workaround.
- `availability.astro:9` renders current month dynamically — will drift into "always available."
- `base.css:246-256` sets `font-size: 1.1vw` at sm and `0.9vw` at md — root text shrinks as viewport widens. Caps zoom-friendliness.
- Every heavy chunk (maplibre-gl, lottie-web, swiper, gsap) is exercised on the home route despite being cleanly split in `astro.config.mjs`.
- Fonts declared `font-display: swap` with no `<link rel="preload">`.
- `section-card-scroll-animation.ts`, `text-split`, `text-reveal`, and Swiper all lack destroy paths — SPA nav leaks.
- `overflow-hidden` on `about-box-1` will clip bio dropdown popovers; on `mystery-box.astro:120` clips `data-tip` tooltips at `lg:` breakpoint.

## Questions to Consider

1. **What if the hero were a full-bleed image, not a slab?** A monograph opens on a plate, not a title card.
2. **Does this portfolio need four projects, or one great one shown four ways?** One project + four scroll folds is a monograph; four uniform slabs is a catalog.
3. **What is the Mystery Box actually for?** If it's playfulness signal, put it in the footer. If those are also portfolio pieces, give them slabs. Commit or cut.
4. **What would the reduce-motion version look like as a designed artifact?** DESIGN.md says it's first-class; right now it's an accident. Design it deliberately.
