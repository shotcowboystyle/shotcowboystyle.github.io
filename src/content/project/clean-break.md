---
title: Clean Break
description: Clean Break is an iOS app that finds every place an ex still comes up in your digital life, from Photos Memories to feeds to the camera roll, and lets you hide or remove each one. It notifies nobody. Success is uninstall.
screenshotImage: ../../assets/images/clean-break-screenshot.png
cardColor: '#06070c'
cardBg: ../../assets/images/clean-break/card-bg.svg
cardBgMobile: ../../assets/images/clean-break/card-bg-mobile.svg
logo: ../../assets/images/clean-break/logo.svg
brandColors:
  - token: '--cb-surface-base'
    hex: '#06070c'
  - token: '--cb-surface-raised'
    hex: '#0f1119'
  - token: '--cb-border-hairline'
    hex: '#202435'
  - token: '--cb-ink-primary'
    hex: '#eff1f8'
  - token: '--cb-ink-secondary'
    hex: '#a3aac0'
  - token: '--cb-ink-muted'
    hex: '#7b8194'
  - token: '--cb-accent'
    hex: '#8fa0e8'
  - token: '--cb-accent-contrast'
    hex: '#a8b6f0'
  - token: '--cb-aurora-from'
    hex: '#2e2a5e'
  - token: '--cb-aurora-to'
    hex: '#1b3352'
  - token: '--cb-danger'
    hex: '#e8607a'
cardAurora:
  - '#2e2a5e'
  - '#1b3352'
url: https://testflight.apple.com/join/cqAJWkug
linkText: Join the Beta
year: '2026'
role: Solo. Concept, AI-directed brand, design, architecture and build
tags:
  - iOS
  - On-device
  - Privacy
variant: split
gallery:
  - image: ../../assets/images/clean-break/phone-today.webp
    alt: 'Today: the paced set of things that still come up this month (design mockup)'
    device: phone
  - image: ../../assets/images/clean-break/phone-review.webp
    alt: 'Reviewing matched photos one at a time, keep or hide (design mockup)'
    device: phone
  - image: ../../assets/images/clean-break/phone-group-photos.webp
    alt: 'Group photos are held back for later, with no pressure to decide (design mockup)'
    device: phone
  - image: ../../assets/images/clean-break/phone-three-things.webp
    alt: 'Before we start: three reassurances, up front (design mockup)'
    device: phone
  - image: ../../assets/images/clean-break/phone-take-a-break.webp
    alt: "A step-by-step walkthrough for Facebook's Take a Break (design mockup)"
    device: phone
  - image: ../../assets/images/clean-break/phone-through-it.webp
    alt: "You're through it: the totals, and what is still out of reach (design mockup)"
    device: phone
storyReady: true
---

<!-- DRAFT for Curtis to edit. Hidden until storyReady is true. Software facts are read from the clean-break repo (git log, SPEC.md, research, spike findings, retros, ci.yml). Add tester numbers where marked TODO. -->

Clean Break is an iPhone app for after a breakup. It finds the places an ex still comes up in someone's digital life, like Photos Memories, social feeds and shared albums, and walks them to each platform's own setting for quieting it. The app acts on nothing itself, nothing it suggests is permanent, and the ex is never notified. It's free, and it has done its job when someone stops needing it and deletes it.

I built it in my free time, as an excuse to learn two things at once: native iOS development, and how far I could push AI coding agents on a real product.

## Where it came from

A friend of a friend needed a room to rent because they were going through a divorce, and they became my roommate. That got me thinking about how much of a relationship lives on a phone. Moving out takes a weekend. The phone keeps bringing the person back for months, in a Memories slideshow, a suggested post, an old shared album, and every one of those apps hides its off switch somewhere different. I figured other people with a freshly broken heart would want something that found those switches for them, without making a scene of it.

## AI from the logo down

I used AI at every stage on purpose, to find out where it holds up and where it doesn't.

The logo started as a concept I worked through with Claude, then became a Claude Design project, and the app's icon and launch screen are built from those files. The planning ran on the BMAD method, where each planning document belongs to one agent skill and nobody hand-edits it. An idea brief became a single spec that stood in for a PRD. A UX spec went through thirteen review passes, covering accessibility, adversarial reading and prose. An architecture spine holds 39 numbered invariants. Then came the epics, the stories and a sprint plan. Implementation ran story by story through an agent loop with built-in limits: up to three review cycles and two development attempts per story before it stops and asks me.

My job was to make the calls. The agents wrote specs, code and tests, and they also wrote retrospectives at the end of each epic. Two of those retros rejected their own epic, and I learned more from those two than from the ones that passed.

## The phone disagreed with the research

Before writing any app code, I had agents research what iOS actually allows. They ran three research passes, imported an 81-source second opinion and did a verification round. They concluded that Facebook, TikTok and Snapchat had no deep links into their settings, which would have meant a much weaker walkthrough.

Then I put a throwaway spike on a physical iPhone and ran nine experiments. The links worked on all four platforms, and finding them took five minutes. Six of the documented conclusions turned out wrong, and every one of them was reasoned from not finding something. The claims that rested on an Apple primary source all held up.

Apple's own documentation didn't fare much better. The documented Photos background API differed from the shipping SDK in four places: a method that doesn't exist, an enum case that isn't there, a property that isn't public, and a replacement protocol that never shipped. A shared app-and-extension settings store looked fine in code and silently stopped syncing on the device. The Developer Mode I needed to force the extension to run only existed in the iOS beta, not the current release. For the second spike, I stopped reading documentation and read the compiled Swift interface instead, and all six experiments passed.

## Cutting the riskiest feature

The original plan matched an ex's face across the photo library and hid those photos for you. It was the most impressive feature on paper. It also meant processing biometric data, which carries real legal exposure under state laws like Illinois's BIPA and Texas's CUBI. Midway through, I retired it, along with background scanning, notifications, donations and a bring-your-own-key AI option. That deleted five epics and 43 stories, none of them started. The planning note puts it plainly: delete the questions rather than pay for the answers.

Removing a feature turned out to be harder than not building it. The first fix blocked it with a build check, and a retro later found a test fixture that imported Photos and passed anyway. The second fix deleted the capability from the type system, so a Photos request no longer compiles. Even then, the first screen in the app still promised that photos would go to a Hidden album, because nothing checked the copy. That retro rejected its own epic with a line I've kept: prose in a retrospective is not a control.

## How it's built

The app is four Swift modules with a one-way dependency direction: a core of models and logic, a platform layer of adapters, a design-token UI library that imports nothing from the project, and the app itself. 26 gates enforce the architecture. Each is a shell script that runs both as an Xcode build phase and in CI, and each is tested in both directions, so a gate that can't fail gets caught. Some gates guard the product rather than the code. There are no badges and no pull-to-refresh, because this is an app you're supposed to need less. The voice gate rejects exclamation points, emoji and "we".

The walkthroughs ship as data. A taxonomy of 49 "landmines" and 22 hand-off procedures comes in an Ed25519-signed bundle with rollback protection, so a guide can be fixed when Facebook moves a setting, without an App Store release. Layouts hold up at every accessibility text size, down to an iPhone SE, with a 4.5:1 contrast floor. A Release build won't go out without a recorded smoke test on a physical device.

## What iOS taught me

iOS development is not easy, and it's an especially hard place to lean on AI. Every year, iOS adds features and deprecates others, and an agent's knowledge is always a release or two behind the SDK on my machine. The things that change every June are exactly the things you'd want to automate.

It showed up everywhere. Linters auto-corrected working Swift into Swift that doesn't compile, so I turned six of those rules off. Xcode's asset compiler silently dropped the dark and tinted icon variants. The project generator stripped the signing team. The Swift 6.2 toolchain and `SWIFT_VERSION = 6.0` are both correct and mean different things. CI went a month without running a single step, for three unrelated reasons, before I noticed.

I also came out with a solid foundation: Swift 6 with strict concurrency, SwiftUI and SwiftData, Xcode project configuration through XcodeGen, code signing, app extensions and App Groups, and the paperwork the App Store requires before TestFlight, including the privacy manifest and the export-compliance flag.

## Results

- Five weeks from first story to TestFlight, in free time. The research and spikes started in late August, and the release pipeline that uploads to TestFlight landed in early October.
- 44 of 49 stories done across six epics, in 164 production Swift files of about 26,600 lines.
- 961 app tests and 766 gate tests, with the counts enforced in CI so a test can't disappear unnoticed.
- A public TestFlight beta.

<!-- TODO: number of beta testers, and any feedback worth quoting. -->

## What I learned

Test absence of evidence on a device first. A five-minute experiment overturned weeks of research, and it would have cost less on day one.

A lesson that only lives in a retro will come back. Each time something went wrong twice, the fix that stuck was turning it into a check that fails the build.

By the second epic, planning and review documents outweighed production code ten to one. That record is how I could trace every decision in this write-up, but next time I'd spend less on ceremony and more on the device.
