---
target: home
total_score: 27
p0_count: 1
p1_count: 3
timestamp: 2026-07-10T18-22-03Z
slug: src-pages-index-astro
---

Method: dual-agent (A: general-purpose · B: general-purpose)

## Design Health Score

| #         | Heuristic                       | Score     | Key Issue                                                                                                    |
| --------- | ------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------ |
| 1         | Visibility of System Status     | 3         | Availability now semantic (`role="status"`); Location tile has no map failure state                          |
| 2         | Match System / Real World       | 2         | Hero copy is voice-first, not audience-first; "biz-ops integrations" is jargon in a creative bio             |
| 3         | User Control and Freedom        | 3         | Skip-to-content added; dropdowns still hover-only at lg                                                      |
| 4         | Consistency and Standards       | 3         | Action-tier system holds; hero circle + mystery-box + project-card mobile all share the same scale-1.5 hover |
| 5         | Error Prevention                | 3         | Static site with `mailto:` — clean                                                                           |
| 6         | Recognition Rather Than Recall  | 2         | Bio dropdowns hide the entire stack behind underlined words; no visible tech grid                            |
| 7         | Flexibility and Efficiency      | 3         | Focus visible globally, skip link works                                                                      |
| 8         | Aesthetic and Minimalist Design | 3         | Genuinely restrained; loses points to fake testimonial + decorative-first footer                             |
| 9         | Error Recovery                  | 3         | Little surface; mailto fallback exists                                                                       |
| 10        | Help and Documentation          | 2         | No "what I do / how I work"; assumes visitor knows full-stack senior domain                                  |
| **Total** |                                 | **27/40** | **Acceptable (high end). +3 vs prior 24.**                                                                   |

## Anti-Patterns Verdict

**LLM assessment.** Not slop at the code level — the kinetic silhouette + three project variants + Signal Mint palette + Thunder/General Sans pairing all sit well outside the saturated 2026 lanes. **But one line of data sabotages the read:** the featured testimonial in Bio is Jar Jar Binks (`bio.astro:6` sorts by `order` asc, picks `jar-jar-binks.md` order:1). Single biggest tone-break on the page.

Second-order lane check: the outer container is still "big rounded slab that scales up on scroll." Variant system (feature/split/poster) is the strongest departure — poster in particular blows the doors off. A CD who's seen four Awwwards portfolios this year files this as "well-crafted example of the kinetic-portfolio lane," not "how did they make this?"

**Deterministic scan** (`detect.mjs --json`, exit 2): 16 findings (down from 17), all `design-system-color`. 15 are documented in DESIGN.md's `signatureMotionPalette` frontmatter as intentional; one new leak at `location-navigation.astro:101` (bare `rgb(255 255 255)` on maplibre control). All shared absolute bans remain **clean**.

**Detector caught, LLM missed:**

- Availability pulse animation lacks reduced-motion gate (`availability.astro:18` — `animate-pulse` without `motion-safe:`).
- Bio dropdown ARIA connective tissue missing (`bio.astro:23-28, 48-54` — `aria-haspopup` present but no `aria-expanded` state or `aria-controls`).
- H1 mobile-narrow overflow risk unresolved (`header-content.astro:60` — `max-w-[8ch]` + `text-9xl` at 320-400px).
- Bio dropdown popover still risks clipping by `overflow-hidden` on `#about-box-bio`.
- 1.0MB shared JS chunk on home route.

**LLM caught, detector can't see:** Jar Jar P0, hero copy audience mismatch, off-white hero vs mint brand promise, hover-scale gesture collision across tiers, dropdowns hide stack.

**False positives:** 15/16 detector findings are documented signature-motion palette values; token gaps a reviewer can justify.

## Overall Impression

Nine follow-up commands moved the technical craft floor from Acceptable to high-Acceptable. Variant system is the peak of the whole page. Bio ships a fake-quote in the highest-visibility About tile, and hero copy still answers a poem question instead of a producer question. Score moved 24 → 27; ceiling without touching content is ~30. To break into 32+, interventions are content and register, not code.

## What's Working

1. **Three project-card variants earn their complexity.** feature/split/poster rotation across the four projects. Poster variant with `.poster-scrim` + text-shadow (`project-card.astro:257-261`) is confident craft.
2. **Reveal-hardening properly done.** `.c-animated-text { opacity: 100% }` default with `html.has-motion` gate + reduced-motion escape hatch. Zero blank-flash risk. All contrast pairs ≥6.3:1 AA passing.
3. **Palette pre-commitment coherent.** Canvas Black `<html>` + off-white base-100 hero + Signal Mint Bio/Contact tiles. `color-scheme: dark` + DaisyUI `light` is correct split. Focus rings use `--color-primary` — on-brand mint on black.

## Priority Issues

### [P0] The featured testimonial is Jar Jar Binks

- **Where:** `src/components/about/bio.astro:5-6` picks `jar-jar-binks.md` (order:1). Trump is order:3.
- **Why:** Hero promised "teams that treat craft as evidence." Bio delivers a Star Wars gag. CD Casey scanning 60s files this as unserious or AI-placeholder-that-shipped. Highest-visibility About tile.
- **Fix:** Delete the testimonial `<figure>` from Bio until you have real client quotes. Empty > fake. Delete `donald-trump.md` from the collection.
- **Suggested command:** `/impeccable distill`.

### [P1] Hero intro copy tells a poem, not a value

- **Where:** `src/components/header-content.astro:87` — "Motion is the language. Fifteen years of shipping considered work..."
- **Why:** Audience answers "what does this person do, can they ship next Tuesday?" Current copy answers neither. "Motion is the language" is a CD's self-description, not a proof.
- **Fix:** Rewrite as one sentence of specificity + one of proof. E.g. "I build interface-forward product surfaces — GSAP, Three, real accessibility — for teams shipping under deadline. Fifteen years, mostly senior IC, mostly remote."
- **Suggested command:** `/impeccable clarify`.

### [P1] Bio dropdowns hide the stack from skimmers

- **Where:** `src/components/about/bio.astro:23-75` — `<button aria-haspopup>` triggers hidden behind `underline decoration-double` inline words.
- **Why:** CD skimming for stack won't hover/click. Stack is below the interaction floor for a 30-second visit. Also missing `aria-expanded`/`aria-controls` connective tissue.
- **Fix:** Replace both dropdowns with an inline `<ul>` of `.tech-badge` pills. Surface the substance.
- **Suggested command:** `/impeccable clarify`.

### [P1] Hero opens on off-white; the brand voice is Signal Mint

- **Where:** `src/components/header-content.astro:15` — hero card is `bg-base-100` (near-white). Signal Mint doesn't appear until About.
- **Why:** DESIGN.md declares palette IS voice. Opening neutral means first hero silhouette is quieter than brand promises.
- **Fix:** Flip hero card to Signal Mint OR move ONE mint element into the fold (Let's Talk circle, Availability badge). Don't stay neutral.
- **Suggested command:** `/impeccable colorize` or `/impeccable bolder`.

### [P2] Hover-scale gesture collision across tiers

- **Where:** `#lets-talk-button` (`header-content.astro:46`), mystery-box `.size-20:hover` (`mystery-box.astro:281`), mobile `.project-card-link` (`project-card.astro:66`) all use `scale-1.5` hover.
- **Why:** Action-tier system says primary hero, project entry, footer easter-egg should read as different tiers. Right now they share the same physical language.
- **Fix:** Reserve scale-1.5 for one tier. Differentiate the others (rotate+fill, ring pulse, internal fill).
- **Suggested command:** `/impeccable animate`.

## Persona Red Flags

**CD Casey.** Prior blank-hero risk resolved via has-motion gate. Remaining: fake testimonial, poem copy, invisible stack, mint absent from fold.

**Riley.** Prior unlabeled swiper resolved (deleted). Location tile has no map-failure timeout. Mystery-box tab order is source-order not visual-order. Bio dropdowns may overlap at 375px.

**Jordan.** Action tiers help. Bio dropdown affordance (`underline decoration-double`) reads as footnote/typo. Location tile has no caption. Mystery-box has zero framing.

## Minor Observations

- `donald-trump.md` still in the collection — future reordering exposes it. Delete.
- `header-content.astro:39-42` and `contact.astro:26` use `<br>` inside CTA labels — fragile at zoom/locale.
- `contact.astro:23-27` uses `!important` on every step of the responsive heading — code smell.
- `bio.astro:83` uses `border-t` above the quote — editorial "ruled separator + pull-quote" pattern, borderline against ban list.
- `header-content.astro:60` H1 has `max-sm:text-9xl` overriding new fluid clamp. Pick one system.
- `availability.astro:18` `animate-pulse` still animates through reduced-motion.
- `location-navigation.astro:101` bare `rgb(255 255 255)` — tokenize or document.
- `dist/_astro/index.B6r-ni63.js` 1.0MB shared chunk — worth per-route splitting.

## Questions to Consider

1. What is the testimonial _for_? Jokes belong in mystery-box footer; evidence must be real.
2. What if the hero card WERE Signal Mint? Palette-is-voice vs voice-is-quiet — which is the actual North Star?
3. Should the Bio paragraph even carry the stack? Rauno/Selikoff-style small stack block might do better.
4. What if one project shown four ways replaced four projects? Poster IS the peak.
