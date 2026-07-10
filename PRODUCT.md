# Product

## Register

brand

## Users

Primary audience is **agency and studio decision-makers** evaluating Curtis ("shotcowboystyle") for project work — creative directors, producers, freelance leads, and tech leads at design-led studios. They are visually literate, skim fast, and judge taste in the first few seconds. The implicit question they bring to the site is _"can this person ship something that looks and feels considered?"_ — so the site itself is the work sample. Secondary audience: hiring managers and peer engineers who arrive via referral, plus recruiters who need a fast read on seniority.

## Product Purpose

A personal portfolio for Curtis Blanton that functions as a demonstration piece: the site's craft, motion, and composition are the evidence of the work. Success means a visitor lands, feels a considered point of view within the first scroll, and comes away willing to start a conversation about a project.

## Brand Personality

Three words, in priority order:

1. **Energetic / motion-forward** — animation is the language, not the garnish. Scroll-driven sticky cards, kinetic type reveals, the spinning "open for projects" badge. The site should feel _alive_.
2. **Crafted / refined** — every detail intentional. Pairing a condensed display face (Thunder) with a humanist body (General Sans) is already a craft signal; spacing, easing, and timing should match that bar.
3. **Confident / authoritative** — senior posture. Large h1 ("Full Stack Senior Developer."), all-caps display hierarchy, generous whitespace. No apologetic copy, no over-explaining.

Voice: direct, understated, no hedging. Speaks like someone who has shipped, not someone selling.

## Anti-references

Explicit "do not become this":

- **Corporate / templated SaaS portfolio** — no framework-default layout, no "Hero → Features → CTA" arrangement, no card grids of identical services.
- **Old-school / dated portfolio tropes** — no parallax-for-parallax, no 2018-era portfolio patterns, no tired reveal animations that everyone shipped once.
- **AI-slop marketing lanes** — no cream/sand/beige body backgrounds, no tiny uppercase tracked eyebrows above every section, no numbered `01 / 02 / 03` section markers as scaffolding, no gradient text, no side-stripe borders, no glass cards as decoration.

## Design Principles

1. **Motion has to mean something.** Every animation must convey state, hierarchy, or progression. Decorative motion is forbidden. If we can't say what an animation _does for the user_, cut it.
2. **Confident reduction over decoration.** Strip until only the signal remains. Whitespace is a tool, not a leftover. Avoid filler patterns.
3. **Editorial pacing.** Scroll is a page-turn. Each project gets room to land before the next one arrives. Density is calibrated, never crowded.
4. **Craft peeks through.** Micro-interactions, easing curves, hover states, and timing reveal engineering depth — but they don't perform it. The visitor should feel "this is considered," not "this is showing off."
5. **Nothing templated.** Asymmetry over symmetry. Intentional weight over even distribution. If a layout could appear on any portfolio in 2025, it's wrong here.

## Accessibility & Inclusion

Target: **WCAG 2.1 AA**, with `prefers-reduced-motion` treated as a first-class design mode rather than a fallback.

- Every scroll-driven, GSAP, Lottie, or Three.js animation must have a reduced-motion alternative — typically a crossfade or an instant state change — not just "no animation".
- Because the site's language is motion, the reduced-motion experience must still communicate hierarchy and pacing through typography, spacing, and static composition. It cannot ship as a blank page waiting for a class trigger.
- Body text must meet ≥4.5:1 contrast against its actual background (light cards on the black canvas, black text on the light cards). Placeholder and muted text held to the same 4.5:1 standard.
- Keyboard navigation and visible focus states on every interactive element (project cards, resume button, contact links, availability badge). Focus rings honor the brand, but they must be visible.
- Alt text and semantic landmarks throughout; the axe-core suite in `e2e/tests/accessibility` is the enforcement mechanism.
