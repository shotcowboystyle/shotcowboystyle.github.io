---
title: Kalmia Woods
description: My family's mountain house in upstate South Carolina, rented just enough to pay its own bills, with a private calendar app so family and friends can book it without calling me.
screenshotImage: ../../assets/images/kalmia-woods-screenshot.png
cardColor: '#0f3d2a'
cardBg: ../../assets/images/kalmia-woods/card-bg.svg
cardBgMobile: ../../assets/images/kalmia-woods/card-bg-mobile.svg
logo: ../../assets/images/kalmia-woods/logo.svg
coverColor: '#f3d79b'
brandColors:
  - token: '--kw-green-900'
    hex: '#2e3323'
  - token: '--kw-green-800'
    hex: '#434b34'
  - token: '--kw-green-700'
    hex: '#535d41'
  - token: '--kw-green-600'
    hex: '#5b6647'
  - token: '--kw-green-500'
    hex: '#667250'
  - token: '--kw-green-300'
    hex: '#9eab87'
  - token: '--kw-green-200'
    hex: '#d4d4b9'
  - token: '--kw-cream-200'
    hex: '#e3e3c4'
  - token: '--kw-paper'
    hex: '#f7f7ee'
  - token: '--kw-sand'
    hex: '#e4ddcb'
  - token: '--kw-sand-soft'
    hex: '#efeadd'
  - token: '--kw-blue-900'
    hex: '#03364f'
  - token: '--kw-blue-800'
    hex: '#043f5d'
  - token: '--kw-blue-700'
    hex: '#03485f'
  - token: '--kw-badge-green'
    hex: '#7fa84d'
  - token: '--kw-badge-bark'
    hex: '#2c2117'
  - token: '--kw-sun'
    hex: '#f3d79b'
  - token: '--kw-info'
    hex: '#a9d6df'
  - token: '--kw-warning'
    hex: '#b07f2e'
  - token: '--kw-error'
    hex: '#b5503e'
url: https://www.kalmiawoods.com
linkText: View Site
tags:
  - Typescript
  - Astro
  - React
  - Next.js
  - Postgres
year: '2026'
role: Owner, design, architecture, build and production support
gallery:
  - image: ../../assets/images/kalmia-woods/desktop-hero.webp
    alt: 'Home page, desktop: the illustrated cabin in the Blue Ridge'
    device: desktop
  - image: ../../assets/images/kalmia-woods/desktop-rooms.webp
    alt: 'Rooms, with photographs of the house interior'
    device: desktop
  - image: ../../assets/images/kalmia-woods/desktop-cabins.webp
    alt: "The stays list: Cozy Cabin, Nature's Haven and Forest Escape, with nightly rates"
    device: desktop
  - image: ../../assets/images/kalmia-woods/desktop-dining.webp
    alt: 'Dining options with regional specialties, on a deep blue panel'
    device: desktop
  - image: ../../assets/images/kalmia-woods/desktop-lakes.webp
    alt: 'Lakes and waterfalls of Oconee County, with photographs of a waterfall and a swimming cove'
    device: desktop
  - image: ../../assets/images/kalmia-woods/phone-hero.webp
    alt: 'Home page on a phone'
    device: phone
  - image: ../../assets/images/kalmia-woods/phone-rooms.webp
    alt: 'Rooms on a phone'
    device: phone
storyReady: true
---

<!-- DRAFT for Curtis to edit. Hidden until storyReady is true. Software facts are read from the kalmiawoods repo; the goals and history are from Curtis. Add numbers where marked TODO. -->

Kalmia Woods is my family's mountain house on 38 acres in Oconee County, South Carolina, a few minutes from Lake Jocassee and Lake Keowee. Family and friends use it all year. We rent it to guests only enough to cover the monthly electric and internet, so the house pays for itself and nobody pays out of pocket. I built two things for it: a public site that guests reach mostly by word of mouth, and a private calendar app where family and friends check dates and book their own stays.

## The problem

Most rental sites try to fill every night. We wanted the opposite. The house is for the people who already love it, and every night we rent out is a night one of them can't use it. So the goal was a small number of paid nights that covered the bills and left the calendar mostly open.

That ruled out running it like a full-time Airbnb. Listing platforms reward high occupancy and quick replies, and they bring in strangers we don't need. We wanted a site we could hand to a friend of a friend, one that looked like a real place and answered their questions, without pushing it to the top of a search page.

The bigger problem was me. Every stay went through me. A cousin wanted a weekend in June and called me. A friend wanted to know if the lake weekend was still open and called me. I kept the calendar, I worked out the conflicts, and I stopped whatever I was doing every time the phone rang. Most of those calls were one question, "is it free?", and only one person could answer it.

<!-- TODO: roughly how many calls or texts a month this used to be, and how many regular users share the house. -->

## The guest site

The public site is a fully static Astro site at kalmiawoods.com. It shows the rooms, the dining nearby, wellness, and the lakes and waterfalls of Oconee County, with an illustrated cabin in the Blue Ridge on the home page and GSAP and Lenis for the motion. It's built to answer a guest's questions before they ask them. A guest who heard about the house from a friend should land on the site and trust the place.

It's also built to stay small. There's no booking engine or availability widget. Booking and online check-in are holding pages for now. A guest gets in touch, and a person decides. The site is there to back up a friend's recommendation, so it doesn't try to sell nights to strangers.

Being static also means there's almost nothing to run. Vercel serves the site from its CDN, there's no server, and there's nothing to patch when nobody has looked at it for a month.

## The calendar app

The admin app is where the real work happened. It lives at admin.kalmiawoods.com, behind a sign-in, for the family and friends who use the house most. They can see what's booked, what's open, and add their own stay without asking me.

The property has two dwellings: the main house, which guests can rent, and a smaller workshop on its own ridge about 250 yards away, kept for family. A stay can claim the main house, the workshop, or both. The app checks every new stay against the existing ones before it saves. A stay on the main house blocks the main house and "both". A stay on "both" blocks everything. Check-in is 3 p.m. and check-out is 11 a.m. Eastern, and the overlap check treats a stay as a half-open interval, so one family can leave the same morning another arrives. That rule used to live in my head. Now it lives in one tested module that both the form and the API use.

The dashboard opens on what people actually want to know: who's there now, who's coming next, and an occupancy grid that shows open dates at a glance. The reservations list filters by current, upcoming and past. Users have roles. Admins manage stays, and super admins also manage who has access. New users get a temporary password and must change it on first sign-in.

It's an installable PWA because it gets opened on phones, often from the house itself, where the signal isn't great. The page shells are static and precached by a service worker. Data comes through TanStack Query and is saved to IndexedDB, so the last calendar you saw still loads with no connection. Writes never queue in the background. If you're offline when you save, the app says "Not saved, you're offline" instead of pretending it worked and syncing a conflicting stay later. When a new version ships, a banner offers to reload.

## Rebuilding it properly

The first version of the admin was a Supabase app from 2023. In 2026 I moved the data to Neon Postgres, added roles, a fuller dashboard, conflict prevention and offline support, and then rebuilt the whole admin as its own Next.js app instead of a section of the marketing site. The old /admin routes now redirect to the new host.

Both apps live in one pnpm and Turborepo monorepo. The domain rules (stays, conflicts, password policy, sign-in crypto) sit in a pure TypeScript package with no I/O, so they're simple to test. The Drizzle schema, validated config, shared API errors and logging each have their own package, and a static-analysis tool enforces which packages may import which. The new admin had to keep every existing account working, so it reuses the same database tables, sessions and password hashing as the old one. Nobody had to reset a password when it switched over.

Every route handler checks the session itself, and every write checks that the request came from the admin's own origin. CI runs type checks, lint, unit tests in Vitest and Playwright end-to-end tests for both apps, including the admin against a seeded database. Each app deploys to Vercel on its own, and only when something it depends on changes.

## Results

<!-- TODO: confirm and add numbers. Candidates: the share of months the rental income covered electric and internet, paid nights per year, stays now booked in the app without contacting you, and calls or texts per month before and after. -->

- The house pays its own utilities. A handful of paid stays a year covers the electric and internet, and the calendar stays mostly free for family and friends.
- Booking doesn't go through me anymore. Family and friends check dates and add their own stays from their phones.
- No double bookings. The app rejects a stay that overlaps one already saved, across both dwellings.

## What's next

Next is the guest book. Right now the house rules, Wi-Fi details, trash day, and the best waterfalls and barbecue nearby are spread across a binder and a lot of text messages. I'm turning that into a digital guest book that guests and family can open on their phones, using the same offline-first approach as the admin, since that's where the signal drops.

## What I learned

The best call in this project was leaving something out. A booking engine on the public site would have been the obvious build, and it would have worked against what we wanted. Leaving it out kept the rentals few and the guests people somebody knows.

The trouble all along was that only one person held the calendar. Once the rules lived in code and the calendar lived somewhere everyone could reach, the phone calls stopped without anyone having to be told. If I did it again, I'd have built the shared calendar first and the polished guest site second, because the calendar is what gave me my time back.
