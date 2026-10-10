---
title: Isla Suds
description: A goat milk soap shop named after a two-year-old, built as a Shopify Hydrogen storefront full of bubbles, foam and goats, with a wholesale portal that lets local shops restock without a phone call.
screenshotImage: ../../assets/images/isla-suds-screenshot.png
cardColor: '#a6d4cb'
cardInk: '#23222a'
cardBg: ../../assets/images/isla-suds/card-bg.svg
cardBgMobile: ../../assets/images/isla-suds/card-bg-mobile.svg
cover: ../../assets/images/isla-suds/cover.png
coverColor: '#292934'
brandColors:
  - token: '--canvas-base'
    hex: '#faf7f2'
  - token: '--canvas-elevated'
    hex: '#f5f0e8'
  - token: '--canvas-milk'
    hex: '#faeade'
  - token: '--canvas-cream'
    hex: '#fcf4e1'
  - token: '--ink-primary'
    hex: '#2c2416'
  - token: '--ink-strong'
    hex: '#292934'
  - token: '--ink-muted'
    hex: '#8c8578'
  - token: '--coral'
    hex: '#d4897a'
  - token: '--coral-light'
    hex: '#e8a090'
  - token: '--accent-red'
    hex: '#ea5d5d'
  - token: '--accent-red-deep'
    hex: '#7f3b2d'
  - token: '--accent-gold'
    hex: '#fcca75'
  - token: '--brown-dark'
    hex: '#523122'
  - token: '--brown-mid'
    hex: '#a26833'
  - token: '--brown-light'
    hex: '#e3a458'
  - token: '--teal'
    hex: '#55bcbc'
  - token: '--sky-top'
    hex: '#90cfd3'
  - token: '--lavender'
    hex: '#bf95e4'
  - token: '--lemongrass'
    hex: '#c5a659'
  - token: '--sea-salt'
    hex: '#eee1d8'
  - token: '--eucalyptus'
    hex: '#32955e'
url: https://www.islasuds.com
linkText: View Site
tags:
  - Typescript
  - React
  - Shopify Hydrogen
  - GSAP
year: '2026'
role: Design partner, architecture, build and production support
gallery:
  - image: ../../assets/images/isla-suds/desktop-hero.webp
    alt: 'Home page hero, desktop: "Natural skincare you can trust" among floating soap bars'
    device: desktop
  - image: ../../assets/images/isla-suds/desktop-fresh.webp
    alt: '"Freshen up and feel great in your own skin" filling in word by word on a coral ground'
    device: desktop
  - image: ../../assets/images/isla-suds/desktop-silky-smooth.webp
    alt: '"We have 4 silky smooth sudsy soap bars" as the product rail arrives'
    device: desktop
  - image: ../../assets/images/isla-suds/desktop-product-cards.webp
    alt: 'Product cards for the organic goat milk soaps, each with its own add-to-cart'
    device: desktop
  - image: ../../assets/images/isla-suds/desktop-simple-soap.webp
    alt: '"Real gentle simple soap" with the ingredient chips laid over the bars'
    device: desktop
  - image: ../../assets/images/isla-suds/desktop-ingredients.webp
    alt: 'The short version: moisturizing, no added fragrance, natural ingredients'
    device: desktop
  - image: ../../assets/images/isla-suds/desktop-bath.webp
    alt: 'The bath film: "Side effects may include suds hair"'
    device: desktop
  - image: ../../assets/images/isla-suds/desktop-suds-happen.webp
    alt: '"Suds happen everywhere" with customer photos fanning across the type'
    device: desktop
  - image: ../../assets/images/isla-suds/phone-hero.webp
    alt: 'Home page hero on a phone'
    device: phone
  - image: ../../assets/images/isla-suds/phone-products.webp
    alt: 'Product cards on a phone'
    device: phone
  - image: ../../assets/images/isla-suds/phone-bath.webp
    alt: 'The bath film on a phone'
    device: phone
  - image: ../../assets/images/isla-suds/phone-suds-happen.webp
    alt: '"Suds happen everywhere" on a phone'
    device: phone
storyReady: true
---

<!-- DRAFT for Curtis to edit. Hidden until storyReady is true. Software facts are read from the isla-suds repo; results are as reported by the family. Add numbers where marked TODO. -->

Isla Suds is a family soap business that makes small batches of goat milk soap. It's named after their two-year-old daughter, Isla, who also worked on the design. They sold most of their bars at the farmer's market and stocked a local shop by hand. I built them a storefront and a wholesale portal on Shopify Hydrogen in about a week. Both are still running, and both are still full of bubbles.

## The problem

The business had two bottlenecks, and both of them were a person.

The first was at the market. A customer would buy a bar on Saturday, love it, and have nowhere to buy the next one until the following Saturday. The family needed a shop they could point people to from the stall, open at any hour, so a repeat purchase didn't depend on a repeat visit.

The second was wholesale. Retail partners restocked by reaching a family member and placing the order by hand, which could be written down wrong, and that family member had to be available whenever a shop ran low. Each order also had to be typed up afterward. The family wanted shops to be able to reorder on their own, and wanted new shops to have a way to find them and apply.

<!-- TODO: how wholesale orders came in before (phone, text, in person) and roughly how many a month. -->

The family had already chosen Shopify, so the platform was settled. My questions were how much of the site Shopify should own, and how much it should look like Shopify.

## The design

We worked out the design together, with the family and with Isla. We agreed early that the soap shouldn't be sold like a spa product. The brand was already there: a toddler named the business, the soap is made from goat milk, and the funniest thing about a bath is the foam hairdo afterward. So the site has goats, bubbles, foam hair, and some silliness in almost every section.

The palette is warm and edible: milk and cream grounds, coral, gold and honey browns, with lavender, lemongrass, eucalyptus and sea salt reserved for the scents. Each page is told through scroll instead of a product grid. On the home page, soap bars tumble into the hero, the copy fills in word by word, and the product rail moves with the reader. A bar wears down as you scroll past it. A bath film carries the warning "Side effects may include suds hair". The About page tells the family story in scenes, from one market table, to two, to shops.

## Liquid, then Hydrogen

I started in Liquid, Shopify's long-standing theme language. It works for a store that looks like a theme. This design needed scroll-linked timelines, layered SVG scenes and components with state, and Liquid kept getting in the way. A theme gives you sections to fill in, and most of what we'd designed didn't fit any of them.

So I switched to Hydrogen, Shopify's headless framework built on React Router. Hydrogen gave me full control of the front end without giving up what Shopify already does well. Products, prices, sales, scent descriptions, customer accounts and checkout all stay in Shopify's admin, where the family already works. The storefront reads them through the Storefront API, with GraphQL types generated from the schema, so a change to the catalog shows up on the site with no code involved.

The rest of the stack is TypeScript, Tailwind, GSAP with ScrollTrigger for the motion, Lenis for smooth scrolling, Zustand for the small amount of client state, Leaflet for the map of local stockists, and Resend for the newsletter.

## The wholesale portal

A partner shop signs in with Shopify's Customer Account API and is linked to its B2B company record. The dashboard greets the shop by name, shows its last order with status and line items, and puts a Reorder button next to it. One tap rebuilds that order as a cart at the shop's wholesale pricing and sends it to Shopify checkout. Placing a different order goes through a wholesale order page with quantity selectors. No one in the family has to be reachable for any of it.

New retailers can find their own way in. The Partners page explains the wholesale program and ends with an application form, and a Locations page maps every shop that stocks the soap. That map tells a customer where to buy the soap locally and shows a prospective shop who already carries it.

## The footer

Every page ends in the same place. As you reach the footer, the bathtub from the preloader slides back up from the bottom of the screen, overflowing with foam. The Isla Suds wordmark rises out of the water and bubbles float up through the footer. You can pop them by hovering with a mouse or tapping on a phone. A popped bubble comes back up from the foam, and a small pill counts the ones you've popped yourself. The site never makes up a number.

The bubbles only rise while the footer is on screen. With reduced motion turned on, they rest at fixed heights in the foam, and you can still pop them.

## Shipping it

I wanted the family to never have to think about deploys. I set up a custom Shopify app and an Oxygen deployment token so GitHub Actions could deploy to Shopify's Oxygen hosting with no manual steps. Every push runs CI first: lint, type checks, unit and component tests in Vitest, Playwright end-to-end tests that include the wholesale reorder flow, axe accessibility checks, a bundle-size budget, and Lighthouse. The Lighthouse gate fails the build if desktop performance or accessibility drops below 90, if Largest Contentful Paint goes over 2.5 seconds, or if layout shift goes over 0.1. The deploy runs only after CI passes, and it builds the exact commit CI checked. That way a red build can't ship even when two pushes land close together.

## Results

A few months after launch, the family reports:

- Monthly bar sales roughly doubled. Market customers now have somewhere to buy their next bar.
- A second wholesale retailer signed on. The shop found Isla Suds through the site and got in touch there, with no introduction from the market.
- Reorders no longer wait on a person. Existing partners restock from the portal whenever they need to.

<!-- TODO: before/after bars per month, the share of orders that come from market customers (a discount code or "how did you hear about us" would show this), and how many wholesale reorders have gone through the portal. -->

## What I learned

I should have tested Liquid against the hardest part of the design on day one instead of the easiest. I lost time building toward a ceiling I could have found in an hour. For a headless build, the deciding question is how much of the platform you can keep. With Hydrogen, the family kept the admin, checkout, accounts and B2B pricing they would have had anyway, and only the front end is custom.

A playful brand falls flat if the details don't hold up. A bubble counter that only counts real pops, bubbles that still work with reduced motion, and an end-to-end test on the reorder button are what keep the silliness charming. And it helps to have a two-year-old on the design team. She has never once asked for less foam.
