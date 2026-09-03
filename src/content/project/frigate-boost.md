---
# draft: placeholder case-study copy — replace with the real story before shipping.
title: Frigate Boost
description: Frigate Boost is a web extension allowing for requested features that haven't been developed yet like batch deleting of events, etc.
screenshotImage: ../../assets/images/frigate-boost-screenshot.png
cardColor: '#181818'
url: https://github.com/shotcowboystyle/frigate-boost-ext
linkText: View Source
tags:
  - Typescript
  - Vue
  - Browser Extension
variant: split
role: Solo — Design & Engineering
timeline: '2025'
stack:
  - Vue
  - TypeScript
  - WebExtension APIs
  - Vite
problem: |
  Frigate is beloved NVR software with a maddening gap — no batch operations. Deleting a hundred events one at a time is the kind of chore that begs for a small, sharp tool. The extension had to feel like it was always part of the app, not bolted on.
approach:
  - name: Reads like a native panel
    body: |
      The overlay uses Frigate's own spatial rhythm — same grid, same panel weight, same focus states. It doesn't announce itself. If a maintainer merged this upstream tomorrow, it would look like it had always been there.
  - name: Bulk selection that respects the surface
    body: |
      Multi-select is shift-drag, keyboard-first, and reversible. Selected events dim rather than mark; the visual weight of the selection matches the weight of the action.
  - name: Zero-config safe defaults
    body: |
      The extension detects a Frigate instance without configuration and refuses to run against unknown surfaces. Batch delete is behind a two-step confirm with a plain-language count. No accidental fleet wipes.
motionMoments:
  - name: Selection ink-drop
    demo: ink-drop
    description: |
      Selecting an event drops a subtle ink of accent color onto the tile — a two-frame transition that reads as commitment, not a hover flourish.
  - name: Batch confirm scrub
    demo: count-up
    description: |
      The confirm dialog counts up to the target number over three hundred milliseconds. It slows down enough for the eye to catch the last digit — a designed pause before an irreversible action.
nextSlug: charleston-bonsai
---
