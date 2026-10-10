---
title: Charleston Bonsai Co.
description: A Lowcountry bonsai nursery I co-own, and everything I built around it. The brand, the business plan, a sumi-e website that unrolls like a handscroll, the admin behind its catalog, an agent-run back office, and a WebGL studio for learning the art.
screenshotImage: ../../assets/images/charleston-bonsai-screenshot.png
cardColor: '#f2f1ec'
cardInk: '#1b1a17'
cardBg: ../../assets/images/charleston-bonsai/card-bg.svg
cardBgMobile: ../../assets/images/charleston-bonsai/card-bg-mobile.svg
logo: ../../assets/images/charleston-bonsai/logo.svg
coverColor: '#151714'
brandColors:
  - token: '--ink-1'
    hex: '#151714'
  - token: '--ink-2'
    hex: '#4c4e49'
  - token: '--ink-3'
    hex: '#7e827c'
  - token: '--ink-4'
    hex: '#bbbfba'
  - token: '--paper-1'
    hex: '#f6f7f3'
  - token: '--paper-2'
    hex: '#eff0eb'
  - token: '--paper-3'
    hex: '#e6e9e3'
  - token: '--accent'
    hex: '#3a553a'
  - token: '--accent-quiet'
    hex: '#e3ebdf'
url: https://www.charlestonbonsaico.com
linkText: View Site
tags:
  - Typescript
  - Vue
  - Nuxt
  - Supabase
  - Three.js
year: '2026'
role: Partner. Brand, business plan, web and AI systems
gallery:
  - image: ../../assets/images/charleston-bonsai/desktop-hero.webp
    alt: 'Home page, desktop: "Bonsai, shaped by hand in Charleston." beside an ink-wash pine'
    device: desktop
  - image: ../../assets/images/charleston-bonsai/desktop-waiting.webp
    alt: '"The work is mostly waiting." over ink-drawn hands wiring a branch'
    device: desktop
  - image: ../../assets/images/charleston-bonsai/desktop-seasons.webp
    alt: '"One tree, every season." with the same tree drawn through four seasons'
    device: desktop
  - image: ../../assets/images/charleston-bonsai/desktop-real-tree.webp
    alt: '"This one is real.": a photograph of a crepe myrtle in its pot, set into the ink-wash page'
    device: desktop
  - image: ../../assets/images/charleston-bonsai/desktop-catalog.webp
    alt: '"Around two hundred trees, in the Lowcountry." with hanging catalog cards for each specimen'
    device: desktop
  - image: ../../assets/images/charleston-bonsai/phone-hero.webp
    alt: 'Home page on a phone'
    device: phone
  - image: ../../assets/images/charleston-bonsai/phone-real-tree.webp
    alt: 'The real-tree reveal on a phone'
    device: phone
  - image: ../../assets/images/charleston-bonsai/phone-catalog.webp
    alt: 'Catalog cards on a phone'
    device: phone
storyReady: true
---

<!-- DRAFT for Curtis to edit. Hidden until storyReady is true. Software facts are read from the charlestonbonsai repo; business, nursery and agent facts are from Curtis and still need numbers where marked TODO. -->

Charleston Bonsai Co. is a bonsai nursery in the Lowcountry, and I am one of its partners. Most of my time outside client work goes to the trees: collecting them, developing them over years, and keeping them alive through Charleston summers. I also spent a lot of time on the business around them. I designed the brand, wrote the business plan, built the website and the admin behind it, and set up a team of AI agents to run the back office.

## The problem

Bonsai is slow, and it doesn't sell well on a grid of product photos. A finished tree took decades to make. Each one is one of a kind, and people see it as a living thing. A beginner looking for a first tree and a collector looking at a specimen want different things from the same nursery. We also didn't want the business to depend on retail sales alone. Retail is seasonal, and many of the people who love these trees will never own one.

That set three jobs. The brand had to feel as unhurried as the work. The business needed more than one way for people to spend time with the trees. And with a small team, everything around the trees (listings, social posts, contracts, customer questions) had to run without eating the hours that belong to the trees.

## The brand

I designed the identity around sumi-e, Japanese ink-wash painting: off-white paper, ink in four weights, and a single moss-green accent kept to a small share of any page. The typefaces are Cardo and Albert Sans. The written design brief bans a list of overused typefaces and pure black and white, and it requires the reduced-motion version of every page to tell the whole story.

## The business plan

I wrote the plan around three ways in. The nursery is the base. It sells everything from beginner stock to fully developed bonsai, along with pots, tools, display stands and benches. Rentals and subscriptions put trees where people already are: weddings and corporate events for a day, or offices and hotel lobbies year-round, with the trees rotated and cared for by us. The retreat runs three times a year and is all-inclusive. Each guest leaves with a tree, spends a workshop day styling it with an instructor, and spends an adventure day outdoors looking at the kind of landscape bonsai is trying to capture.

<!-- TODO: any early numbers. Rental bookings, retreat sell-through, subscription accounts. -->

## The nursery

Off the screen, I built the nursery itself, in the spirit of Mr. Miyagi's backyard. It has benches of trees in development, specimen displays, and a natural swimming pool that filters itself through plants instead of chemicals. The trees live there, we shoot the photographs there, and the retreats start from it.

<!-- TODO: a sentence on scale or build time, plus photos if they can go in the gallery. -->

## The website

The site reads right to left, like an emakimono, a Japanese handscroll. Scrolling down moves the paper sideways: scenes unroll from the left edge, and each chapter is marked with its kanji (mountain, the hand, seasons, ink, the nursery, the bench, the seal). Each stretch of the scroll has its own pace, so the page slows down wherever there is something worth looking at. The timeline is plain data and math with no DOM, which keeps it testable. Lenis handles smooth scrolling, but the page works without any of it: with reduced motion turned on, the whole story is still there.

The catalog lists each tree as an individual specimen. Its species, age, size and care level are set at the same weight as its photograph. A listing can also carry a 3D scan of the actual tree. I documented a photogrammetry process for this: 50 to 100 photos on a turntable, processed into a mesh, then decimated and compressed to a few megabytes of GLB. The site loads it into a Three.js viewer the visitor can orbit. Three.js only loads when someone opens the 3D view, so it costs the rest of the page nothing.

Prices are by inquiry, and the code enforces that in three layers. The public type leaves the field out. Every public endpoint builds its response field by field, so a new database column can't leak by accident. And the database itself revokes the price column from the public role. The site also takes inquiries for events and retreats, and runs a double-opt-in newsletter that never reveals whether an email address is already subscribed.

Lighthouse runs in CI and fails the build if performance or accessibility drops below 90, or if Largest Contentful Paint goes over 2.5 seconds or layout shift over 0.1. The latest desktop runs of the home page score 95 to 97 for performance and 100 for both accessibility and SEO.

## The admin

Behind the site is an admin dashboard built in the same Nuxt app. Nitro handles the server routes and Supabase Postgres stores the data, with row-level security on every table. Partners can create and edit listings with a rich-text editor (TipTap), upload photos and 3D models to Vercel Blob, set pricing, and print a QR code for each tree. The code goes on the tree's tag at the nursery, so anyone walking the benches can scan it and pull up that tree's listing.

## The agent company

The back office runs on OpenClaw as a small company of agents. About nine orchestrator agents each run a department, and each one directs its own sub-agents. Social media plans and writes posts, schedules them, and watches for replies that need a human. Contracts drafts the paperwork for large purchases that need insured delivery. Operations tracks inventory and the work at the nursery. Customer service answers the first round of questions. The partners make the decisions and the agents handle the follow-through.

<!-- TODO: name the remaining departments, say how a hand-off to a person works, and add any numbers (posts per week, response time, hours saved). -->

## The studio

The studio at /studio is a toy with a teaching purpose: a bonsai you can grow and style in your browser. Every tree is procedural. Trunk, branches, roots, moss, deadwood, wire and pot are all generated in code. There are 21 species across deciduous, conifer, broadleaf evergreen, flowering and tropical, and each one has its own leaf shape, bark, seasonal color, bloom, and the right wire (copper for conifers, aluminum for the rest). You can set the tree in any of twelve Japanese-inspired places, from a mountain dojo to a koi pond, a coastal cliff or a teahouse. Each place has its own season, light, weather, falling petals and ambient sound. The goal is for someone to understand why a juniper is wired in copper and a maple is not before they ever buy one.

## What I learned

The early version of the site moved fast and skipped safeguards. A repository audit I ran turned up an upload endpoint with no auth check, a fallback JWT secret, and no CI. Renovate was merging dependency updates straight onto main with nothing running against them. All of that has since been fixed: the endpoint is guarded, there are unit, server and end-to-end tests, and CI runs on every change. Next time I would set up CI before writing the first feature.

Most of the work in this business has nothing to do with trees, and the trees still have to come first. Software lets me keep that work out of the way: the site sells while we're out on the benches, and the agents handle the follow-up. That only works if the brand is slow and deliberate too, so a visitor arrives already expecting a different pace.
