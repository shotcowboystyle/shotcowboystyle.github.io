---
# draft: placeholder case-study copy — replace with the real story before shipping.
title: Kalmia Woods
description: Kalmia Woods is a mountain house rental with a full-blown guest Welcome Book that will soon be open sourced for use.
screenshotImage: ../../assets/images/kalmia-woods-screenshot.png
cardColor: '#1f1f1f'
url: https://www.kalmiawoods.com
linkText: View Site
tags:
  - Typescript
  - Vue
  - Astro
role: Design & Engineering
timeline: '2024 — Ongoing'
stack:
  - Astro
  - Vue
  - TypeScript
  - Tailwind
problem: |
  Short-term rentals ship guests a forty-page PDF or a stack of Yelp-tier neighborhood dumps. A cabin in the Blue Ridge deserves better — a considered welcome book that answers the questions before they're asked, and reads like a small monograph rather than a printout of house rules.
approach:
  - name: One document per family, not one PDF for everyone
    body: |
      The Welcome Book is generated per stay from a shared content collection. A family of four with a dog and a family of ten with no car see two different books; the pattern under the surface is the same.
  - name: Islands only where they earn it
    body: |
      Ninety percent of the site is static Astro. Vue islands appear exactly where they carry weight — availability lookups, saved preferences — and nowhere else. Time-to-first-byte reads like a document, not an app.
  - name: The book is the brand
    body: |
      No hero, no marketing scroll. The landing page is the book's cover; the cover leads to a table of contents that respects the reader's time. Photography and typography carry the room; the interface disappears.
motionMoments:
  - name: Room-by-room scroll cadence
    description: |
      Each room lands as a full-viewport plate with a paced reveal — the photograph settles first, the room name follows, house notes trail. Motion tells the reader "one room at a time"; it doesn't decorate.
  - name: Availability preflight
    description: |
      When a guest queries dates, the availability card breathes once before returning an answer — signaling that a real request is running, not that a spinner is spinning.
nextSlug: frigate-boost
---
