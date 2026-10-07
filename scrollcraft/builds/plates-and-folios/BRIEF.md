# BRIEF: shotcowboystyle, "Plates and Folios"

<!-- cspell:ignore expirments -->

**Authority: interviewed.** This is an extension of the shipped landing page, not a new build. The
user is happy with the page's design and scroll concept and asked for three problems to be solved,
inviting a better version where it earns it. Decisions below are the user's answers to the
interview (2026-10-07); anything else is labelled as authored.

## The user's words, verbatim

> 1. the project cards are too simple, they can only really provide a simple title, description,
>    link, and single screenshot. Ideally a project should have more screenshots and overall more
>    information available. This can be handled by the link navigating to an inner page with the
>    projects details, but that transitions is neither implemented nor designed or conceptualized,
>    that's inline with the pages overall theme/concept.
> 2. The landing page has no details from my CV like work history. This could potentially replace
>    the testimonials card in the footer bento grid since the testimonials are "joke" testimonials,
>    which I do like.
> 3. I also have another "experiments" repository of small code expirments and widgets that I'd
>    like to include, either as a full section, or teaser section. [...] where does it go in this
>    landing pages content?

## Decisions (interview answers)

| Question                 | Answer                                                                         |
| ------------------------ | ------------------------------------------------------------------------------ |
| Where experiments live   | GitHub Pages at `/experiments/`, same origin as the portfolio                  |
| CV and the jokes         | CV ledger replaces the testimonials cell; the jokes become its References line |
| Navigation               | Index pill plus a plate overlay                                                |
| Card → detail transition | Page-turn: finish the plate-turn                                               |
| Experiments on the page  | A cobalt plate after the projects                                              |
| Folio screenshots        | Captured from the live sites, culled by the user                               |
| Folio copy               | Facts and gallery ship now; drafted stories stay hidden behind `storyReady`    |
| Experiments content      | Include everything except the starter "Hello World" entry (deleted)            |

## Feeling curve

| Act               | Feeling    | Caused by                                                                                 |
| ----------------- | ---------- | ----------------------------------------------------------------------------------------- |
| Hero              | Confidence | The off-white plate, the headline rising character by character, the wave                 |
| Project plates ×5 | Absorption | Each plate lands whole and holds; the slowest cadence on the page (unchanged, by request) |
| Experiments       | Delight    | The tempo flips: cobalt, and the tiles travel sideways under a vertical scroll            |
| About grid        | Warmth     | Bio, the CV ledger in plain facts, then the References joke landing as the laugh          |
| Contact           | Resolve    | The panel, the email, the page stops                                                      |

## The peak

> "You hover a project and the page lifts at the corner. Click, and it turns over into the case
> study. Hit Back and it swings shut right where you were."

It lives on the project plates, as an interaction rather than a scroll act. That is a deliberate
deviation from the skill's "the peak gets the most scroll room": the user is happy with the plate
pacing, so the peak was moved out of the act stack (uniqueness.md §2.8, general form) into the
transition the plates already gesture at.

**Tell-someone sentence:** it's the site where the project card turns like a page into its case
study, and Back turns it shut right where you left it.

## Grammar

The shipped page's own: a **plate stack**. Each section is a flat plate that sticks, holds, and
recedes as the next slides up over it. It sits closest to gallery/catalog (objects one at a time),
with a hero and a close the catalog grammar would not allow. The other seven were not considered as
replacements because the brief was to extend this page, not rebuild it.

## Signature move

**The page-turn.** The Project tier's hover tips the plate 2.4° on a right-edge hinge. The click
completes that gesture as a cross-document view transition: the page swings away on the same hinge,
the folio is underneath in the project's own plate color, and the title holds still and settles
into the folio masthead. Back plays it in reverse and the back-forward cache returns the stack at
the exact plate, mid-scroll, with nothing re-initialized.

## Score

| Beat        | Device                          | Why                                                                   |
| ----------- | ------------------------------- | --------------------------------------------------------------------- |
| Hero        | pin (CSS sticky) + kinetic      | Unchanged                                                             |
| Projects    | pin + exit scrub, ×5            | Unchanged                                                             |
| Experiments | pin + pan                       | Lateral travel reads as "range", and breaks five vertical holds       |
| About       | flow                            | Information, compressed: CV facts, References, contact                |
| Folio       | flow + CSS `view()` reveals     | A document to read, not a scene to watch                              |
| Navigation  | cross-document view transitions | Page-turn into folios, mint wipe into side rooms, crossfade otherwise |

## Feel check (cold, from the contact sheets)

| Act         | Intended   | Felt                                                   |
| ----------- | ---------- | ------------------------------------------------------ |
| Hero        | Confidence | Confidence                                             |
| Plates      | Absorption | Absorption, sliding toward patience by the fifth plate |
| Experiments | Delight    | Delight: the only lateral motion on the page           |
| About       | Warmth     | Warmth                                                 |
| Contact     | Resolve    | Resolve                                                |

Diff: the plates are five equal holds of 3.5 viewports each, so the middle of the page reads as
tempo rather than pacing (the same finding as the July critique). Left unchanged because the user
is happy with it; it is the first thing to revisit (vary the holds by variant, or give the hold a
job such as leafing through the gallery).

## Authored silence

None. The page has no empty viewports by design.

## Not verified here

- A real iPhone (Safari 18.2+ cross-document view transitions, rail touch).
- Browsers without cross-document view transitions get a plain navigation. The e2e suite covers
  that path in Firefox; which Firefox version (if any) runs the page-turn was not checked.
