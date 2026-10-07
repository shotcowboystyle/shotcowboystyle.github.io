# Fingerprints

One row per shipped build. A new build must differ from **every** existing row
on at least 4 of the 6 dimensions, checked against each row individually.

If a planned build fails the gate, change the plan, not this file. It records
what exists, not what would be convenient.

| #   | Build                                     | Grammar                                                        | Nav treatment                                                                                                  | Hero device                                                                                                 | Act-sequence shape                                                                                                                                                                    | Close pattern                                                                                                             | Signature move                                                                                                                                                                                                                                      | World                                                                               | Port                                                                      |
| --- | ----------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| 1   | `shotcowboystyle` — The Kinetic Monograph | Chaptered editorial                                            | No bar. Sticky per-chapter folio rotated into the left margin (name, no number) + fixed 2px progress hairline  | Title page: type on a paper ground, no media above the fold, one hairline draws itself, masthead line-split | 6 chapters, ~12.5vh total: reveal/kinetic → flow+in → parallax-in-figure → in-per-object ×4 → bespoke+count (2.6vh peak) → flow. One empty screen of authored silence before the peak | Colophon on a mint field at the smallest type on the site; ask as an underlined email inside a sentence, no button island | **The Specimen Lathe** — a surface of revolution whose profile is the reader's own scroll, projected to SVG strokes in the margin all page, resolved and dimensioned at the peak, captioned with their measured session and downloadable as a plate | Technical drawing, computed at runtime (no generated assets, no 3D engine)          | Astro + GSAP/ScrollTrigger + Lenis, in-repo (not the scroll-craft engine) |
| 2   | `shotcowboystyle` — Plates and Folios     | Plate stack (sticky plates that hold and recede), shipped page | Index pill top right, hidden over the hero, opening a native modal dialog that slides up as an off-white plate | Off-white plate on black: char-rise headline + ambient letter wave, Primary circle, no media                | ~29vh: hero pin → 5 project pins (3.5vh holds, exit scrub) → cobalt pin with lateral pan → flow bento. Peak moved out of the stack (see notes)                                        | About bento ending on an info-blue Contact panel, CV ledger with joke References beside it                                | **The page-turn** — the plate-turn hover completed as a cross-document view transition on the same right-edge hinge into a folio page; the title stays put; Back swings it shut at the exact plate                                                  | Real project screenshots (captured from the live sites) on per-project plate colors | Astro + GSAP/ScrollTrigger + Lenis + native view transitions              |

## Row 1 notes

Gate result: registry was empty, so nothing to clear.

What the next build has to avoid sharing with this row: the chaptered-editorial
grammar, a marginal-folio chrome, a type-only title page, a six-chapter shape
with a bespoke peak in position five, and a quiet small-type close. Any two of
those are fine; four is a repeat.

The world is the one to watch. "Computed at runtime" is very reusable and will
read as a house style fast if the next build also draws its own geometry.

## Row 2 notes

Gate result against row 1: differs on all six (grammar, nav, hero, act shape, close, signature).

This row extends the shipped page rather than replacing it, which is why its act shape breaks the
8 to 14 viewport-height budget: the plate holds are the user's, kept on purpose. What the next
build should avoid sharing: a plate stack, a pill-plus-modal index, and a transition-as-peak.
