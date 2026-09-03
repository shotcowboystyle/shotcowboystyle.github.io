---
# draft: placeholder case-study copy — replace with the real story before shipping.
title: Isla Suds
description: Isla Suds is a small-batch organic soap company with a custom Shopify Hydrogen storefront featuring 3D product animations and a seamless checkout experience.
screenshotImage: ../../assets/images/isla-suds-screenshot.png
cardColor: '#272727'
url: https://www.islasuds.com
linkText: View Site
tags:
  - Typescript
  - React
  - Shopify Hydrogen
  - GSAP
variant: poster
role: Design & Engineering
timeline: '2025'
stack:
  - Shopify Hydrogen
  - React
  - TypeScript
  - GSAP
  - Three.js
problem: |
  A three-woman soap company competing against Instagram-optimized aggregators. The storefront had to feel like the packaging — hand-cut edges, botanical stains, small-run care — and not like another square-frame product grid the algorithm rewards.
approach:
  - name: 3D as texture, not spectacle
    body: |
      Each bar has a low-poly WebGL turnaround weighing under 80KB, rigged to scroll. The rotation is slow enough to read as a slab of soap turning on a table, not a spinning trophy. Reduced-motion swaps in a hand-photographed silhouette.
  - name: One long scroll, not five pages
    body: |
      The whole storefront is a single vertical composition — story, catalog, ingredient index, checkout invitation. Navigation is a jump list, not a top nav. The reader always knows where they are because they haven't gone anywhere.
  - name: Checkout borrows nothing from Shopify's defaults
    body: |
      Hydrogen's default cart is invisible; the custom cart uses the site's typography, its own transitions, and a two-column layout that keeps the soap in view while the reader edits quantities. Checkout is a continuation of the storefront, not a hand-off to a foreign shell.
motionMoments:
  - name: Bar-tumble hero
    demo: rotate
    description: |
      The hero soap bars tumble into position on first paint with a weighted-object easing — one bar catches the corner and pivots slightly, so the composition doesn't land dead-square. It reads as three hands placing bars on a table.
  - name: Scent-note reveal on hover
    demo: stagger
    description: |
      Hovering a bar reveals its scent-note stack (top / heart / base) as three staggered lines rising from beneath the price. A tactile disclosure that never blocks the click.
nextSlug: kalmia-woods
---
