# FitLog — Workout Library

FitLog is a dark, no-nonsense workout library and daily training journal. Browse twelve strength and conditioning movements, review instructions, and build a focused plan for today.

## Technologies

- Next.js 16 App Router and React 19
- TypeScript
- Tailwind CSS 4 with responsive custom CSS
- FitLog REST API with an alternate API fallback
- Browser `localStorage` for persistent plan and saved workouts

## Features

1. Responsive workout library with search and duration, calorie, and rating sorting.
2. Workout detail pages with key specs, coaching instructions, and local workout photography.
3. A five-lift daily plan with live exercise, time, and calorie metrics.
4. Saved workouts, mark-as-done controls, toast feedback, and local persistence.
5. Loading, API error, empty, and custom 404 states for reliable navigation.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Create a production build with `npm run build`, then serve it using `npm start`.

## Workout data and images

Workout details load from `https://api.abcz.workers.dev/api/fitlog`, with `https://api.api-store.workers.dev/api/fitlog` as a fallback. Exercise photographs are bundled in `public/workouts` so they work without third-party image hosts at runtime.
