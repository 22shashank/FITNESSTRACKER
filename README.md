# FitnessTracker (local-first)

Run locally:

```bash
npm install
npm run dev
```

This app is frontend-only; data is persisted to `localStorage` and demo data can be loaded from the auth screen.
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
