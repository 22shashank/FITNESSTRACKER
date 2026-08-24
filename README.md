# FitGrid Fitness Analytics

Run locally:

```bash
npm install
npm run dev
```

This is a frontend-only, local-first personal fitness and performance analytics platform. Data is persisted to `localStorage`, demo data can be loaded from Settings, and the app includes an installable offline shell.

## Product Features

- Workout, nutrition, macro, weight, water, sleep, activity, goal, habit, and PR tracking
- Macro dashboard with serving-size calculations, custom foods, favorites, recents, targets, history, and calendar
- Dashboard analytics for calories, protein, steps, workouts, sleep, weight, and selectable 7/30/90-day trends
- Reusable analytics utilities for workout volume, estimated 1RM, progression, macro aggregation, and goal progress
- Local fallback fitness assistant at `/assistant`; no API key is shipped to the browser
- Demo data, JSON export/import, reset flow, and defensive localStorage handling

## Architecture

```text
Pages and components
	|
FitnessContext and assistant services
	|
analytics.js, macroStorage.js, storage.js
	|
localStorage / PWA cache
```

The provider is the current state boundary. Storage and analytics are kept in services/utilities so a future REST adapter can replace persistence without changing page contracts. LocalStorage authentication is a demo convenience and is not presented as secure authentication.

## Tech Stack

React 19, React Router, Vite, Tailwind CSS, Lucide React, Recharts, and browser localStorage.

## Testing and Build

```bash
npm run test:headless
npm run build
```

The smoke suite covers storage import/export/reset, existing core records, workout metrics, 1RM, progression, macro aggregation, and goal progress.

## PWA and Future Work

The manifest and service worker cache the application shell. Locally persisted fitness data remains available offline. Future work includes extracting feature-specific hooks, adding a server-side REST adapter, richer workout set logging and PR detection, component tests, and a user-controlled light theme.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Quick test & QA

Run the headless smoke tests that validate persistence and core flows:

```bash
npm run test:headless
```

Manual QA checklist:
- Open the app (`npm run dev`) and go to Settings → Load Demo Data
- Verify Dashboard counts (Workouts, Meals, Water)
- Add a workout, add a meal/food, add weight/water/sleep/activity entries
- Export data, then Reset and Import the exported JSON to verify persistence

If you need to debug headless runs, run the individual scripts:

```bash
npm run test:storage
npm run test:core
```
