---
name: shotcowboystyle
description: Personal portfolio for Curtis Blanton — a kinetic monograph where motion is the language.
colors:
  canvas-black: 'oklch(0% 0 0deg)'
  card-off-white: 'oklch(91% 0 0deg)'
  signal-mint: 'oklch(77% 0.17 159.37deg)'
  signal-mint-deep: 'oklch(48% 0.13 159.37deg)'
  cobalt-draft: 'oklch(61% 0.2 261.29deg)'
  lavender-wash: 'oklch(76% 0.07 282.78deg)'
  slate-ink: 'oklch(36% 0.03 262.99deg)'
  primary-ink: 'oklch(25% 0.08 160deg)'
  meta-info: 'oklch(45% 0.26 269.6deg)'
  meta-success: 'oklch(77% 0.15 163.1deg)'
  meta-warning: 'oklch(86% 0.17 88.01deg)'
  meta-error: 'oklch(64% 0.21 11.45deg)'
typography:
  display:
    fontFamily: 'Thunder, system-ui, ui-serif, Georgia, serif'
    fontSize: 'clamp(3.2473rem, calc(2.4046rem + 4.21vw), 6.4497rem)'
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: '-0.01em'
  headline:
    fontFamily: 'Thunder, system-ui, ui-serif, Georgia, serif'
    fontSize: 'clamp(2.5658rem, calc(2.0623rem + 2.52vw), 4.479rem)'
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: '-0.01em'
  title:
    fontFamily: 'Thunder, system-ui, ui-serif, Georgia, serif'
    fontSize: 'clamp(2.0273rem, calc(1.7423rem + 1.43vw), 3.1104rem)'
    fontWeight: 700
    lineHeight: 1
    letterSpacing: 'normal'
  body:
    fontFamily: 'General Sans, Arial, ui-sans-serif, system-ui, sans-serif'
    fontSize: 'clamp(1.125rem, calc(1.0921rem + 0.16vw), 1.25rem)'
    fontWeight: 500
    lineHeight: 1.6
    letterSpacing: 'normal'
  label:
    fontFamily: 'General Sans, Arial, ui-sans-serif, system-ui, sans-serif'
    fontSize: 'clamp(0.8681rem, calc(0.8626rem + 0.03vw), 0.8889rem)'
    fontWeight: 500
    lineHeight: 1.6
    letterSpacing: '0.02em'
rounded:
  card: '16px'
  card-lg: '24px'
  pill: '9999px'
spacing:
  sm: '0.5rem'
  md: '1rem'
  lg: '2rem'
  xl: '2.5rem'
  section: '5rem'
components:
  action-primary:
    role: 'Contact / talk — the single most important CTA.'
    shape: 'circle'
    backgroundColor: '{colors.canvas-black}'
    textColor: '{colors.card-off-white}'
    typography: '{typography.body}'
    size: 'min(20vw, 8rem) mobile / 8rem sm+'
    hover: 'background-color scale-150 (radial expansion)'
  action-secondary:
    role: 'Utility / download.'
    shape: 'pill'
    backgroundColor: 'transparent'
    textColor: '{colors.canvas-black}'
    border: '1px solid {colors.canvas-black}'
    typography: '{typography.body}'
    rounded: '{rounded.pill}'
    padding: '0 0.75rem'
    height: '2rem'
    hover: 'signature bubble-particle keyframes'
  action-tertiary:
    role: 'Inline supporting nav (About Me anchor, section jumps).'
    shape: 'text link'
    backgroundColor: 'transparent'
    textColor: 'inherit'
    typography: '{typography.label} uppercase'
    hover: 'underline-offset-4'
  action-project:
    role: 'Project-card affordance only. Not a general action tier.'
    shape: 'circle w/ rotating textPath ring + plane orbit'
    backgroundColor: 'transparent'
    textColor: '{colors.card-off-white}'
    border: '2px solid {colors.card-off-white}'
    animation: '8s spin (motion-safe only)'
  action-panel:
    role: 'Peak-end closing CTA (Contact tile at About end).'
    backgroundColor: '{colors.signal-mint}'
    textColor: '{colors.primary-ink}'
    typography: '{typography.headline}'
    rounded: '{rounded.card-lg}'
  card-primary:
    backgroundColor: '{colors.signal-mint}'
    textColor: '{colors.primary-ink}'
    rounded: '{rounded.card-lg}'
    padding: '3rem'
  card-neutral:
    backgroundColor: '{colors.card-off-white}'
    textColor: '{colors.canvas-black}'
    rounded: '{rounded.card-lg}'
    padding: '3rem'
signatureMotionPalette:
  mystery-box-gradient-blue: 'rgb(1 132 255)'
  mystery-box-gradient-magenta: 'rgb(198 5 91)'
  mystery-box-dot-white: 'rgb(255 255 255)'
  resume-hover-purple: 'rgb(124 41 232)'
  resume-hover-blue: 'rgb(84 95 252)'
  resume-hover-cyan: 'rgb(13 200 237)'
---

# Design System: shotcowboystyle

## 1. Overview

**Creative North Star: "The Kinetic Monograph"**

A portfolio built as an editorial art book, but every page moves. The **black canvas** is the gallery wall — it is not decoration, it is negative space with authority. **Light cards** sit on that wall like plates in a monograph, each carrying one idea, each with room to breathe. Scroll is the page-turn; GSAP + Lenis choreograph the reveal, and every animation must earn its place by conveying state, hierarchy, or progression.

The pairing of a condensed variable display face (**Thunder**) with a humanist body sans (**General Sans**) is the type signature. Display type is set enormous, tight, uppercase — a masthead voice. Body copy is set at a confident weight (medium, not regular) so it reads as a considered point of view, not a hedge. The system treats motion as material: micro-interactions, blur, spring easing and orchestrated stagger are part of the palette, not garnish.

This system explicitly rejects: SaaS-templated hero → features → CTA layouts, dated 2018 parallax-portfolio tropes, and the current AI-slop marketing lanes (cream / sand / beige body backgrounds, tiny tracked eyebrows over every section, numbered `01 / 02 / 03` scaffolding, gradient text, side-stripe borders, decorative glassmorphism).

**Key Characteristics:**

- Dark canvas, light plates. Black is the gallery wall; cards are the work.
- Motion is the language. Every animation has a job.
- Editorial pacing. Density is calibrated; each section lands before the next arrives.
- Asymmetry over symmetry. Nothing that could appear on any other portfolio in 2025.
- Reduced-motion is a first-class mode, not a fallback.

## 2. Colors

The palette is currently DaisyUI-derived: a mint-forward primary, a saturated cobalt secondary, and a pale lavender accent, all sitting on a **pure black canvas** with **off-white cards**. It is functional but under review — a future `/impeccable colorize` pass may replace the accent trio with a more committed color strategy.

### Primary

- **Signal Mint** (`oklch(77% 0.17 159.37deg)`): The primary voice. Used as the fill for the largest bio card in the About grid and as the deep-mint (`oklch(48% 0.13 159.37deg)`) emphasis on the resume button's underlined "ME". It carries confidence; it does not decorate.

### Secondary

- **Cobalt Draft** (`oklch(61% 0.2 261.29deg)`): Reserved for secondary emphasis and future work callouts. Currently under-used; treat as a placeholder until a `colorize` pass locks its role.

### Tertiary

- **Lavender Wash** (`oklch(76% 0.07 282.78deg)`): The soft testimonial card fill in the About grid — low-chroma so quoted voices don't compete with the mint. A quiet third color, not a headline.

### Neutral

- **Canvas Black** (`oklch(0% 0 0deg)`): The `html` background. The gallery wall. Never a surface for body text; text always lives on a card.
- **Card Off-White** (`oklch(91% 0 0deg)`): The default light card surface. Body copy contrast target: ≥4.5:1 against this and against Signal Mint.
- **Slate Ink** (`oklch(36% 0.03 262.99deg)`): Neutral text and border ink for dense content on light cards.
- **Primary Ink** (`oklch(25% 0.08 160deg)`): The high-contrast body ink used on the mint bio card — chroma leans into the mint's hue so the text feels of-a-piece rather than dropped on.

### Signature-motion palette

A handful of RGB literals live inside signature-motion components and are outside the OKLCH system by design. They are documented here so the detector stops flagging them as drift; they are permitted **only** inside the specific components named below and must not appear anywhere else in the site.

- **Mystery Box gradient** — `rgb(1 132 255)` (blue) and `rgb(198 5 91)` (magenta) as the corner-to-corner base gradient behind the animated dots. Dot borders and hover fills use `rgb(255 255 255)`. These colors are the box's identity; the tile below is intentionally _not_ palette-consistent with the rest of the site — that mismatch is the joke.
- **Resume-button hover bubbles** — `rgb(124 41 232)` (purple), `rgb(84 95 252)` (blue), `rgb(13 200 237)` (cyan), stacked into the `resumeButtonTopBubbles` / `resumeButtonBottomBubbles` radial-gradient keyframes. Signature engineering-craft moment on hover; never used outside the resume-button component.

### Named Rules

**The Gallery-Wall Rule.** The black canvas is never a text surface. Every piece of body copy sits on a card. If you find yourself setting readable text directly on black, you are decorating the wall — stop.

**The One-Voice-Per-Section Rule.** Each card commits to one accent. Signal Mint OR Cobalt Draft OR off-white — never two competing on the same surface. The hero fold and the About section both commit to Signal Mint — hero as a drenched field with an off-white card floating on it (see Cards / Containers → Field vs. plate below), About as mint plates (Bio + Contact) with a neutral map. The mint field bookends the page; projects and the mystery-box footer sit on the black canvas between. Lavender Wash is now unused after the testimonials tile was folded into Bio — leave it in the token file for future use rather than the current site.

**The Signature-Motion Isolation Rule.** The signature-motion palette (Mystery-Box gradient, Resume-button hover bubbles) is component-scoped. Do not pull those RGB literals into new components. If you need a new signature moment, propose a new named literal for it and add it here.

## 3. Typography

**Display Font:** Thunder Variable (fallback: system-ui → ui-serif → Georgia → serif)
**Body Font:** General Sans Variable (fallback: Arial → ui-sans-serif → system-ui → sans-serif)

**Character:** Thunder is a condensed variable display face — narrow, tall, editorial. General Sans is a humanist sans with warmth in the terminals. The pairing is contrast-axis (condensed display + humanist body), not similar-but-not-identical. Display is always set uppercase, tight tracking, extra-bold weight; body is set at medium weight, generous leading, mixed case. The gap between them is the point.

### Hierarchy

- **Display** (weight 800, `clamp(3.25rem → 6.45rem)`, line-height 0.9): Hero H1s only ("Full Stack Senior Developer."). Set uppercase, tight (-0.01em). The masthead voice.
- **Headline** (weight 800, `clamp(2.57rem → 4.48rem)`, line-height 0.9): Section titles inside projects and About grid.
- **Title** (weight 700, `clamp(2.03rem → 3.11rem)`, line-height 1): H3s and card titles.
- **Body** (weight 500, `clamp(1.125rem → 1.25rem)`, line-height 1.6): All prose. Cap line length ~65–75ch on cards. Medium weight, not regular — the site has a point of view.
- **Label** (weight 500, `clamp(0.87rem → 0.89rem)`, line-height 1.6, letter-spacing 0.02em): Meta and metadata. **Never** used as an uppercase-tracked eyebrow above section titles — that pattern is banned (see Don'ts).

### Named Rules

**The Masthead Rule.** Display and headline type is always uppercase, always extra-bold, always Thunder. No mixed-case display, no light-weight display, no substituting the body font for a "cleaner" hero. The masthead is a commitment; if it doesn't shout, choose a different composition.

**The No-Eyebrow Rule.** No small uppercase tracked "kicker" text above section titles ("ABOUT", "PROCESS", "PRICING"). The masthead itself carries the section identity; a tracked eyebrow is AI-grammar scaffolding, not voice.

## 4. Elevation

**Flat by default; depth is conveyed by contrast and motion, not shadow.** The system uses two elevation devices:

1. **Tonal contrast** — light cards on the black canvas. The contrast IS the elevation. There are no drop shadows on cards at rest.
2. **Motion-as-lift** — hover states and scroll-triggered reveals convey depth through transform and easing (spring, subtle scale, translate-Y), never through a heavier shadow.

### Named Rules

**The No-Shadow Rule.** Cards do not have drop shadows at rest. If a surface needs to feel lifted, the answer is contrast, spacing, or motion — never a blurred rectangle underneath. Glassmorphism (backdrop-blur decorative panels) is banned.

**The Motion-As-Depth Rule.** When a card must "come forward" on interaction, use `transform: translateY(-2px)` or a spring-easing scale, paired with an accent-color background transition. Depth is a verb, not a shadow token.

## 5. Components

### Action-tier system

Five tiers, ordered by weight. Every clickable element on the site belongs to exactly one tier; do not mix visual languages across tiers. The tier is chosen by the **purpose** of the action, not by aesthetic preference.

| Tier          | Purpose                                                 | Visual language                                                                                      | Hover signature (reserved per tier)                                                                                                                                                   | Where it lives                                                      |
| ------------- | ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **Primary**   | Contact / talk — the single most important CTA.         | Black circle, off-white text.                                                                        | **Radial expansion.** Inner span `scale-150`. The reserved gesture — no other tier may share it.                                                                                      | Hero "Let's Talk" (`header-content.astro`). Reserved.               |
| **Secondary** | Utility / download.                                     | Transparent pill, 1px black border, deep-mint underlined emphasis on partial letters ("RESU**ME**"). | **Signature bubble-particle keyframes.** Radial-gradient bubbles ping up and down.                                                                                                    | Hero Resume button. Reserved.                                       |
| **Tertiary**  | Inline supporting nav (section jumps, in-flow anchors). | Uppercase label text.                                                                                | **Underline reveal.** `underline-offset-4 hover:underline`.                                                                                                                           | Hero "About Me" anchor. Use for future in-flow anchors.             |
| **Project**   | Project-card affordance only.                           | Circle with rotating textPath ring + plane orbit, 8s spin (motion-safe).                             | **Directional lift** on the mobile-fallback anchor: `hover:-translate-y-1 hover:scale-105`. Reads as "come toward the destination," distinct from Primary's outward radial expansion. | Every project card. Never used outside the project-card domain.     |
| **Panel**     | Peak-end closing CTA.                                   | Full Signal Mint tile, giant Thunder headline, underlined email.                                     | **Email underline weight shift.** `text-decoration-thickness: 1px → 2px` on the email row.                                                                                            | Contact tile at the end of the About grid. Only one Panel per page. |

The **Mystery Box** footer easter-egg uses its own **playful physics** hover — `scale(1.25) rotate(3deg)` plus an internal fill reveal (dot fills with black background, icon fills white). Distinct from all five action tiers by design: the mystery box is a discovery moment, not an action, and its off-system signature-motion palette (see Section 2) matches the off-tier gesture language.

### Named Rules

**The Single-Primary Rule.** Exactly one Primary tier action per page. If you find yourself wanting a second black-circle CTA, redesign the flow instead — a Primary that repeats is a Primary that's stopped meaning anything.

**The Panel-Mirrors-Primary Rule.** The Panel closing CTA (Contact tile) is the compositional mirror of the Primary "Let's Talk" hero circle. They open and close the page. The Panel does not compete for visual weight with the Primary; it _echoes_ it at a different scale. If you're changing one, consider changing the other.

**The Project-Tier Isolation Rule.** The `CircleButton` orbital treatment is a project-card domain. Do not port it to other components; its rotating textPath and plane orbit belong to project affordances specifically, and using it elsewhere dilutes the project-card signature.

**The Reserved-Hover Rule.** Each tier owns its hover signature exclusively: Primary owns radial expansion (`scale-150`), Secondary owns the bubble-particle keyframes, Tertiary owns underline reveal, Project owns directional lift (`translate-y-1 scale-105`), Panel owns the underline weight shift. Mystery Box is the sixth voice — playful physics (`scale-1.25 rotate-3`) — and is not a tier. When you add a new interactive surface, choose a tier and inherit its hover; do not compose a new hover per-component.

### Cards / Containers

- **Corner Style:** `16px` on the card baseline, `24px` on the About-grid plates (larger surfaces earn a larger radius).
- **Background:** Signal Mint (Bio identity + Contact panel), Card Off-White (hero card, Location plate, default). Never on black. See the One-Voice-Per-Section rule above; About section commits to Signal Mint end-to-end.
- **Field vs. plate:** The hero section is _drenched_ — its section wrapper is Signal Mint so the fold opens on brand color, and the off-white hero card floats on the mint field. Card-on-mint framing lets the palette land in second 0 without abandoning the light-plate reading model. Only the hero fold uses this layering; project slabs and About tiles remain flat.
- **Shadow Strategy:** None at rest. See Elevation.
- **Border:** None. Contrast carries the edge.
- **Internal Padding:** `1rem` → `3rem` fluid; the plate breathes.

### Inputs / Fields

Not currently used in the site (no forms in the shipped surface). If added, follow: 1px slate-ink border, Card Off-White background, focus state = accent border color transition + no shadow.

### Navigation

- **Style:** No traditional top nav. Navigation is scroll-driven — the landing scene, projects, availability, and about are stacked full-height sections traversed by Lenis smooth-scroll. Contact and resume are inline affordances, not a persistent menu.
- **Skip link:** `.skip-to-content` styled anchor lives at the top of `<body>` in `BaseLayout`. Hidden until keyboard-focused; slides down with Signal Mint background + primary-ink text. Every page inherits it.
- **Focus system:** Global `:focus-visible` rule in `base.css` — 2px Signal Mint outline, 3px offset. Component-local overrides only when the surface contrast needs it.
- **Mobile:** Same model; touch-scroll replaces smooth-wheel, motion behaviors persist through prefers-reduced-motion crossfades.

### Signature Component: The Rotating Availability Badge

The `animate-spin-circle` badge that reads "OPEN FOR PROJECTS" around a rotating ring. Communicates state (availability), never decorates. Under `prefers-reduced-motion`, the rotation halts and the text ring is set static — the state is still readable.

### Footer Component: The Mystery Box

A small footer easter-egg after the About section — animated dots swirl into position on hover and reveal four secondary artifacts (Programming Motherfucker, Immature Responsive Design, Tower Blocks, Ecograder). Its palette is _intentionally_ off-system (see Signature-motion palette above); the mismatch is voice, not drift. Discoverable but not signposted; sighted users get the delight of finding it, screen-reader users get a `<h2 class="sr-only">Miscellany</h2>` inside the `<footer aria-label="Extras">` landmark.

## 6. Do's and Don'ts

### Do:

- **Do** treat the black canvas as the gallery wall — every text surface is a card sitting on it.
- **Do** use Thunder uppercase extra-bold for every display and headline, tight tracking, tight line-height.
- **Do** run body copy at weight 500 minimum — the site has a point of view, not a whisper.
- **Do** commit the About section to Signal Mint end-to-end: Bio (identity) and Contact (action) both mint, Location (map) neutral off-white. One voice per section.
- **Do** convey elevation through contrast and motion; use `translateY` on hover with spring easing.
- **Do** ship a real reduced-motion path for every animation — a static composition that still communicates hierarchy. Never a blank page waiting for a class trigger.
- **Do** honor axe-core: every focus state visible, alt text on every asset, ≥4.5:1 body contrast on both mint and off-white card backgrounds.

### Don't:

- **Don't** set body text directly on the black canvas. Text lives on cards. Always.
- **Don't** drop a shadow under a card at rest. Contrast is the elevation.
- **Don't** stack more than one accent color on a single card. The palette is under review; do not compound its ambiguity.
- **Don't** ship a small uppercase tracked "kicker" eyebrow above section titles ("ABOUT", "PROCESS", "PRICING") — AI-grammar scaffolding, not voice.
- **Don't** scaffold sections with `01 / 02 / 03` numbered markers unless the section is genuinely an ordered sequence carrying information the reader needs.
- **Don't** apply `background-clip: text` gradient fills to headlines. Solid ink only. Emphasis via weight or size, never chroma-drift.
- **Don't** use `border-left` > 1px as a colored accent stripe on cards, alerts, or list items. Ever.
- **Don't** deploy decorative glassmorphism / backdrop-blur panels — the site is flat-by-default.
- **Don't** compose a "Hero → Features → CTA → Testimonials" SaaS template. Asymmetry over symmetry; if it looks like every other portfolio in 2025, it is wrong here.
- **Don't** animate decoratively. If you can't say what an animation _does for the user_, cut it.
