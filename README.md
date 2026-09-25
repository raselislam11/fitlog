# FitLog — Workout Library

A dark, no-nonsense gym companion built for the **B14-A6-Fit Log** assignment. Browse a library of lifts, dive into a detailed workout page, and build out today's training plan — all tracked live in the navbar.

## Technologies Used

- **Next.js 14** (App Router) — routing, pages, dynamic `[id]` routes
- **React 18** — component state, Context API for global plan/saved state
- **Tailwind CSS** — styling and full responsiveness (mobile / tablet / desktop)
- **lucide-react** — icon set (clock, flame, star, chevrons, etc.)
- **react-hot-toast** — toast notifications
- **localStorage** — persists Today's Plan and Saved lists across reloads

## Features

1. **Full workout library** — fetches all lifts from the FitLog API and displays them in a responsive 3×4 card grid, each with image, category tags, name, equipment, and a stats row (duration / calories / rating).
2. **Search + sort** — instantly filter by name/tag and re-sort the library by Duration, Calories, or Rating.
3. **Workout detail page** — two-column layout with a key-specs panel (equipment, difficulty, sets, reps, duration, calories, rating) and numbered step-by-step instructions.
4. **Live plan & saved tracking** — "Add to today's plan" and "Save for later" update the navbar badge counters instantly, show a toast, and persist to `localStorage`. The plan is capped at 5 lifts.
5. **My Plan dashboard** — live Exercises / Minutes / Calories summary, tabs for Today's Plan vs Saved, per-item "Mark as Done" and remove (X) actions, and a "Nothing here yet" empty state with a CTA back to the library.
6. **Resilient UX** — loading states while data is fetched, a custom 404 page for unknown routes, and graceful handling if the API call fails.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
  page.js                 → Home (Hero + Library)
  workout/[id]/page.js    → Workout detail page
  my-plan/page.js         → My Plan dashboard
  not-found.js            → Custom 404
  layout.js, globals.css  → Root layout, fonts, global styles
components/                → Navbar, Footer, WorkoutCard, SortDropdown, Toaster
lib/
  api.js                  → Fetches + normalizes FitLog API data
  PlanContext.js          → Global plan/saved state + localStorage persistence
```

## Notes on the API

`lib/api.js` normalizes whatever the FitLog API returns into a consistent shape (`id`, `name`, `category`, `equipment`, `image`, `duration`, `calories`, `rating`, `difficulty`, `sets`, `reps`, `instructions`). If a field ever comes back empty on your machine, open the browser console, check the raw response, and adjust the field names inside `normalizeWorkout()` in `lib/api.js` — everything else in the app reads from that one normalized shape, so it's a one-file fix.

## Deployment

Deploy to Vercel (recommended), Netlify, or Cloudflare Pages — no environment variables required.

- **Live Link:** _fill in after deploying_
- **GitHub Repository Link:** _fill in after pushing_

---

© 2026 FitLog — Workout Library. Train hard, log honest.
