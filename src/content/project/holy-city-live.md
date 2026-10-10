---
title: Holy City Live
description: Holy City Live is a set of live flood, heat, construction, public safety and city-service dashboards for Charleston, SC, built on public NOAA, USGS, FEMA, City and County data.
screenshotImage: ../../assets/images/holy-city-live-screenshot.png
cardColor: '#e9e9e7'
cardInk: '#1c1d21'
cardBg: ../../assets/images/holy-city-live/card-bg.svg
cardBgMobile: ../../assets/images/holy-city-live/card-bg-mobile.svg
logo: ../../assets/images/holy-city-live/logo-reverse.png
coverColor: '#141a22'
brandColors:
  - token: 'ink'
    hex: '#141a22'
  - token: 'harbor'
    hex: '#1d4e89'
  - token: 'harbor-light'
    hex: '#8fb6e3'
  - token: 'paper'
    hex: '#f6f4ee'
url: https://www.holycity.live
linkText: View Site
year: '2026'
role: Solo. Concept, data, design and build
tags:
  - Typescript
  - Data Viz
  - Maps
gallery:
  - image: ../../assets/images/holy-city-live/desktop-flood-heat.webp
    alt: 'Flood & Heat Risk: the flooding outlook and an hourly tide-and-rain forecast over a terrain map of the peninsula'
    device: desktop
  - image: ../../assets/images/holy-city-live/desktop-construction.webp
    alt: 'Construction Near Me: street closures, permits and the biggest projects within half a mile of an address'
    device: desktop
  - image: ../../assets/images/holy-city-live/desktop-public-safety.webp
    alt: 'Public Safety Trends: police department open data by neighborhood, with a 24-month trend'
    device: desktop
  - image: ../../assets/images/holy-city-live/desktop-service-days.webp
    alt: 'Service Days: trash, yard waste and street sweeping days for an address, with a two-week pickup calendar'
    device: desktop
  - image: ../../assets/images/holy-city-live/phone-construction.webp
    alt: 'Construction Near Me on a phone'
    device: phone
  - image: ../../assets/images/holy-city-live/phone-public-safety.webp
    alt: 'Public Safety Trends on a phone'
    device: phone
  - image: ../../assets/images/holy-city-live/phone-service-days.webp
    alt: 'Service Days on a phone'
    device: phone
storyReady: true
---

<!-- DRAFT for Curtis to edit. Hidden until storyReady is true. Software facts are read from the holycity-live repo (README, git log, ride.js, app.js, tests). Add visitor numbers where marked TODO. -->

Holy City Live is a set of free, live dashboards for Charleston, SC. Each one answers a question people here ask out loud: will my street flood, what is being built near me, how is my neighborhood trending, and when does the trash go out. Type in an address once and every tab answers for that spot.

It's my bit of civic duty. Charleston gave me a lot, and this felt like a way to give some of it back.

## Where it came from

Anyone who has driven downtown has made this bet. There's a puddle across the street, it looks shallow, you go for it, and halfway through you find out it isn't. Water gets in the engine, the car dies, and you're stalled in the middle of the road waiting for a tow. The tide gauge, the rain radar and the City's flood closures are all public. Nobody had put them together into one answer: is my route going to be underwater, and when.

The second Charleston staple is construction. Streets close, lots fill with cranes, and it's hard to find out what's going in, how big it is, or who to call about it. The City publishes every permit and every closure, but as GIS layers that leave you to work out the answer yourself.

## One question per screen

The design rule was simple: lead with the answer in plain English, then let people dig. Every tab opens with a sentence, and the charts and maps sit under it. Anything beyond the core question goes behind a **More** toggle.

- **Flood & Heat Risk** opens with a ride check: "Now: streets are dry" or "Flooding likely from 4 pm, for about 3 hours (high tide and rain). Plan around it." Under it is a 48-hour strip of hourly harbor levels that lights up when flooding hits, on a 3D terrain map of the peninsula. Click a spot and it tells you how deep the water gets there, and whether to go slow or find another way.
- **Construction Near Me** puts closures first, then the biggest projects by permit value, a 12-month permit strip and a ¼, ½ or 1 mile radius. Code cases and older permits sit under More.
- **Public Safety Trends** describes police activity in your neighborhood per resident, compared with the rest of the city ("higher than most neighborhoods", "down 12%"), over 24 months.
- **Service Days** shows trash, yard waste and street sweeping days on a two-week calendar. Under More are your fire station, your representatives, zoning, flood zone and the nearest parks, which is where "who do I call" usually ends up.

Every view lives in the URL, including address, radius, time and map layers, so a link to "my street at high tide on Thursday" can be sent to a neighbor.

## Making the flood map honest

Tide flooding is the easy part. NOAA's Charleston Harbor gauge publishes observed water levels, predictions and the official flood stages, and the NWS issues a harbor forecast. I added NOAA's STOFS storm-surge model on top. Its files live on S3 without CORS headers, so a small Cloudflare Worker fetches the 1.8 MB file, pulls out the Charleston station and caches the result at the edge for 30 minutes.

Rain flooding was harder. The map runs a depression-fill model over USGS elevation data: it finds every low spot that can't drain to open water, then fills each one with rain the drains can't keep up with. It's a bathtub model, not a hydraulic one, and the site says so. To give the numbers some footing, I tuned the drainage and runoff defaults against a real storm. On October 4, 2026 the City closed 15 streets for flooding, and the model reproduces 12 of them. That's one event, and the calibration panel says that too.

The safety tab needed the same care. Arrests and stops measure police activity, not crime, and they're recorded where they happened, not where people live. That note sits right under the chart, because a dashboard that ranks neighborhoods can do harm if it's read wrong.

## How it's built

There's no framework and no build step. The site is plain HTML, CSS and JavaScript, about 2,600 lines in total, served as static files from Cloudflare Workers. The Worker code only runs for two paths: the surge proxy, and the analytics script. Three.js draws the 3D map, Leaflet draws the 2D ones, and both load from CDNs. Everything else is fetched live in the browser from NOAA, USGS, FEMA, Open-Meteo and the City and County GIS servers, with no API keys.

The plain-language logic, such as "can I ride", "up 12%" and "among the highest in the city", lives in small pure functions with `node --test` coverage, alongside the surge-file parser.

A design review pass added the parts a public tool can't skip. Focus rings are visible. Every slider and select has an accessible name. The tide chart and column charts have text summaries for screen readers. Touch targets are 44 px on phones, and the maps take one finger to scroll the page and two to pan. If a source fails, the page says which one in plain words and offers a retry. Analytics only run in production and only send the tab name, so an address in a shared link never reaches Google.

The last pass applied a brand kit: a "harbor gauge" mark, a steeple standing as the needle over harbor water, set in Public Sans and Newsreader, with a light and dark theme.

## Results

- Live at [holycity.live](https://www.holycity.live), with four dashboards built on public feeds from NOAA, USGS, FEMA, Open-Meteo and the City and County of Charleston.
- The rain model reproduces 12 of the 15 City flood closures from the October 4, 2026 storm.
- No build step and no API keys. Static hosting runs free, and only the surge proxy runs code.
- Open source under the MIT license.

<!-- TODO: visitors, shares, or any feedback from neighbors worth quoting. -->

## What's next

Once you've built one civic dashboard, the next one is easy to justify. Flooding and construction came first because they're the ones that cost people money. The plan is to keep adding a dashboard whenever a question keeps coming up. Give it a year and there may be one for every kind of Charlestonian: the hipster, the artist, the socialite, and whoever knows every oyster roast in the county.

## What I learned

Plain words are the hard part. Pulling data from a GIS server takes an afternoon. Turning a water level in feet above a tidal datum into "find another way" took most of the work, and it's what people actually use.

Say what the model can't do. A flood map that looks precise but isn't is worse than no map. Listing the limits next to the result is what makes the rest of it believable.

Public data is a decent API. Between NOAA, USGS, FEMA and the City, almost everything I needed was already published. What was missing was a page that asked the right question first.
