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
    role: 'Project-card affordance only. Opens the project folio at /work/[slug]; the folio links out.'
    shape: 'circle w/ rotating textPath ring + plane orbit'
    backgroundColor: 'transparent'
    textColor: '{colors.card-off-white}'
    border: '2px solid {colors.card-off-white}'
    animation: '8s spin (motion-safe only)'
    hover: 'plate-turn — rotate3d(0,1,0.05,-2.4deg)'
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

The palette is currently DaisyUI-derived: a mint-forward primary, a saturated cobalt secondary, and a pale lavender accent, all sitting on a **pure black canvas** with **off-white cards**.

### Primary

- **Signal Mint** (`oklch(77% 0.17 159.37deg)`): The primary voice. Used as the fill for the largest bio card in the About grid and as the deep-mint (`oklch(48% 0.13 159.37deg)`) emphasis on the resume button's underlined "ME". It carries confidence; it does not decorate.

### Secondary

- **Cobalt Draft** (`oklch(61% 0.2 261.29deg)`): **Play.** The Experiments plate, the one cobalt surface on the page. Mint is the person (hero, contact); cobalt is the side work. White on cobalt measures 3.9:1, so text set directly on it must be large (20px bold, or 24px and up); small copy sits on off-white tiles.

### Tertiary

- **Lavender Wash** (`oklch(76% 0.07 282.78deg)`): The CV ledger cell in the About grid — low-chroma so the work history doesn't compete with the mint. A quiet third color, not a headline.

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

**The One-Voice-Per-Section Rule.** Each card commits to one accent. Signal Mint OR Cobalt Draft OR off-white — never two competing on the same surface. The hero is an off-white plate on the black canvas; each project plate takes its project's own ground; the Experiments plate is cobalt; the About grid gives each cell one voice (mint Bio, lavender CV, yellow back-to-top, info-blue Contact). Every surface sits on the black canvas.

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

| Tier          | Purpose                                                                    | Visual language                                                                                                                                                      | Hover signature (reserved per tier)                                                                                                                                                                                                                                                 | Where it lives                                                                            |
| ------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **Primary**   | Contact / talk — the single most important CTA.                            | Black circle, off-white text.                                                                                                                                        | **Radial expansion.** Inner span `scale-150`. The reserved gesture — no other tier may share it.                                                                                                                                                                                    | Hero "Let's Talk" (`header-content.astro`). Reserved.                                     |
| **Secondary** | Utility / download.                                                        | Transparent pill, 1px black border, deep-mint underlined emphasis on partial letters ("RESU**ME**").                                                                 | **Signature bubble-particle keyframes.** Radial-gradient bubbles ping up and down.                                                                                                                                                                                                  | Hero Resume button. Reserved.                                                             |
| **Tertiary**  | Inline supporting nav (section jumps, in-flow anchors).                    | Uppercase label text.                                                                                                                                                | **Underline reveal.** `underline-offset-4 hover:underline`.                                                                                                                                                                                                                         | Hero "About Me" and "Index", the Index links, the CV's PDF link and References.           |
| **Project**   | Project-card affordance only. Opens the project's folio at `/work/[slug]`. | Circle with rotating textPath ring + plane orbit, 8s spin (motion-safe). Ring phrase is "View Project" on the card, the entry's `linkText` on the folio's live link. | **Plate-Turn.** The card catches light like a page being lifted: `rotate3d(0, 1, 0.05, -2.4deg)` around a right-center pivot with `perspective: 1500px`. Reads as "the plate is tipping toward you," distinct from Primary's outward radial expansion. Reduced-motion: no rotation. | Every project card, and the folio's next-project plate. Never outside the project domain. |
| **Panel**     | Peak-end closing CTA.                                                      | Full info-blue tile, giant Thunder headline, underlined email.                                                                                                       | **Email underline weight shift.** `text-decoration-thickness: 1px → 2px` on the email row.                                                                                                                                                                                          | Contact tile at the end of the About grid. Only one Panel per page.                       |

The **Mystery Box** footer easter-egg uses its own **playful physics** hover — `scale(1.25) rotate(3deg)` plus an internal fill reveal (dot fills with black background, icon fills white). Distinct from all five action tiers by design: the mystery box is a discovery moment, not an action, and its off-system signature-motion palette (see Section 2) matches the off-tier gesture language.

### Named Rules

**The Single-Primary Rule.** Exactly one Primary tier action per page. If you find yourself wanting a second black-circle CTA, redesign the flow instead — a Primary that repeats is a Primary that's stopped meaning anything.

**The Panel-Mirrors-Primary Rule.** The Panel closing CTA (Contact tile) is the compositional mirror of the Primary "Let's Talk" hero circle. They open and close the page. The Panel does not compete for visual weight with the Primary; it _echoes_ it at a different scale. If you're changing one, consider changing the other.

**The Project-Tier Isolation Rule.** The `CircleButton` orbital treatment is a project-card domain. Do not port it to other components; its rotating textPath and plane orbit belong to project affordances specifically, and using it elsewhere dilutes the project-card signature.

**The Reserved-Hover Rule.** Each tier owns its hover signature exclusively: Primary owns radial expansion (`scale-150`), Secondary owns the bubble-particle keyframes, Tertiary owns underline reveal, Project owns the plate-turn (3D page-catches-light rotation), Panel owns the underline weight shift. Mystery Box is the sixth voice — playful physics (`scale-1.25 rotate-3`) — and is not a tier. When you add a new interactive surface, choose a tier and inherit its hover; do not compose a new hover per-component.

The Project tier previously used a directional-lift (`translate-y-1 scale-105`) hover, retired in favour of the Plate-Turn. Cards open the project's folio, and the click **finishes the turn**: see Page transitions below. The folio carries the link out to the live project or its repository.

The **Experiments plate's tiles** borrow the Mystery Box's playful physics, scaled down (`scale(1.04) rotate(-1.5deg)`): experiments are discoveries, not actions.

### Cards / Containers

- **Corner Style:** `16px` on the card baseline, `24px` on the About-grid plates (larger surfaces earn a larger radius).
- **Background:** Card Off-White (hero plate, Index plate, tiles, default), each project's `cardColor` (project plates and folios), Cobalt Draft (Experiments), and one accent per About cell. Never body copy on black. See the One-Voice-Per-Section rule above.
- **Plates, not fields:** Every section is a flat plate on the black canvas, and the plates stack: each one sticks, holds, and recedes as the next slides up over it. The Index uses the same slide-up.
- **Shadow Strategy:** None at rest. See Elevation.
- **Border:** None. Contrast carries the edge.
- **Internal Padding:** `1rem` → `3rem` fluid; the plate breathes.

### Inputs / Fields

Not currently used in the site (no forms in the shipped surface). If added, follow: 1px slate-ink border, Card Off-White background, focus state = accent border color transition + no shadow.

### Navigation

- **Style:** No top bar. The page is still read by scrolling the stack; the one piece of persistent chrome is the **Index** (`site-index.astro`): a small black pill, top right, that opens a native modal `<dialog>`. The Index slides up as an off-white plate, the same motion as the stack, listing Work (each project's folio), Experiments, CV and Contact in Thunder. On the landing page the pill waits until the first plate has come halfway over the hero, which carries its own Index link in its nav row.
- **Experiments** live in their own repository and deploy to `/experiments/` on this origin, so the move between the two sites is a same-origin navigation and gets the wipe.
- **Skip link:** `.skip-to-content` styled anchor lives at the top of `<body>` in `BaseLayout`. Hidden until keyboard-focused; slides down with Signal Mint background + primary-ink text. Every page inherits it.
- **Focus system:** Global `:focus-visible` rule in `base.css` — 2px Signal Mint outline, 3px offset. Component-local overrides only when the surface contrast needs it.
- **Mobile:** Same model; touch-scroll replaces smooth-wheel, motion behaviors persist through prefers-reduced-motion crossfades.

### Signature Component: The Rotating Availability Badge

The `animate-spin-circle` badge that reads "OPEN FOR PROJECTS" around a rotating ring. Communicates state (availability), never decorates. Under `prefers-reduced-motion`, the rotation halts and the text ring is set static — the state is still readable.

### Page transitions

Every navigation is a document navigation with a cross-document view transition (`@view-transition` in `base.css`; `src/lib/view-transition.js` names the type). Browsers without them simply navigate.

- **Page-turn (`turn-open` / `turn-close`):** opening a project finishes the plate-turn. The page swings away on the same right-edge hinge the hover tipped it on, the folio is underneath, and the project title holds still and settles into the folio's masthead. Back swings the page shut, and the back-forward cache returns the stack at the exact plate. Folio to next folio is another `turn-open`.
- **Wipe (`wipe`):** stepping into a side room (Experiments, Immature, Tower Blocks) or back. The old diagonal curtain, as one Signal Mint band running bottom-left to top-right.
- **Reduced motion:** a 150ms crossfade. No hinge, no sweep, no travel.

### Project folio (`/work/[slug]`)

The back of the plate: one tall plate in the project's `cardColor` on black, with the stack's insets. The first screen opens the card's screenshot edge to edge as a band, with the title, tags and facts (year, role, only when verifiable) beneath it and the live link as a Project-tier circle. Then the lead, the story (only when `storyReady`), and the gallery: desktop captures wide or paired, phone captures clustered, each with a visible label. It ends on the next project's plate peeking up from the bottom edge.

### CV ledger and References

The About grid's lavender cell is the work history: years, company, role, newest first, from `src/content/cv.json`, with the PDF beneath. Its last line is the References, which are the old joke testimonials. Each name opens its quote in a native popover.

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
