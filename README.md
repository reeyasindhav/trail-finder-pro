# Trail Finder Pro

Trailblaze- Hiking & Trail Discovery Platform

Please create a full UI UX design for this website. Make sure to have design-focused pages make sure to use and iterate on the given images to create ui, the final site should be production ready with functional implementation. It should include minimum of 8 to 10 pages, including login/singup pages and authenticated pages like the dashboard. The focus should be on design while maintaining all mockup data. add animations to the site and please give a simple user flow in the response

please do not generate images in here use open source images where needed.

Design Ideas: Rugged outdoor aesthetic, trail map integration, difficulty badge system, elevation chart UI, gear checklists feature.

Problem Statement:

Outdoor enthusiasts and hikers often struggle to find accurate, centralised information when planning their trips. Key details-such as trail difficulty, terrain elevation, required gear, and recent community reviews-are typically scattered across multiple disconnected websites or outdated forums. This lack of clear, consolidated information makes trip planning inefficient and can lead to safety risks when hikers choose trails that do not match their physical fitness or gear preparation. Trailblaze addresses this by providing a unified digital platform that allows hikers to easily discover routes, evaluate accurate difficulty levels, review interactive elevation and map data, and prepare properly using integrated gear checklists.

Ask me if you have any questions.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/30ec60ae-af7e-4515-ba6a-7254481e343c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

I've laid the foundation for Trailblaze but ran out of room to finish the build.

Done so far:

- Design system in `src/styles.css` — cream/sand + deep forest palette, Fraunces display serif, mono micro-labels, topo background, reveal/lift/draw animation utilities
- `src/lib/trails.ts` — 6 full mock trails with elevation profiles, waypoints, gear checklist data, community reviews, planned hikes, activity stats
- `src/lib/auth.tsx` — mock session + saved-trails context (localStorage)
- Components: `Reveal` (scroll animation), `DifficultyBadge` (3-bar system), `TrailMap` (animated SVG topo route with hover waypoints), `ElevationChart` (Recharts), `TrailCard` (grid + list), `SiteHeader`

Still remaining: the footer, wiring `AuthProvider` into `__root.tsx`, and the 10 route pages — home, @readiscover, trail detail, gear, community, about, login, signup, dashboard, saved/profile — plus per-route head metadata and Unsplash imagery.

Intended user flow:
Landing → Discover (filter by difficulty/distance) → Trail detail (map, elevation chart, gear list, reviews) → Save trail or Sign up → Dashboard (planned hikes, mileage stats) → Gear checklist per hike → Community (post a trip report).
