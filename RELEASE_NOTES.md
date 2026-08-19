# Release notes

Version: 0.0.1

- Implemented full local-first fitness tracker SPA
- Persistence via `localStorage` with `src/services/storage.js`
- Global state via `src/context/FitnessContext.jsx`
- Demo data, export/import, reset helpers
- Headless smoke tests in `scripts/` validated persistence and core flows
- Production build tested with Vite

How to run:

```bash
npm install
npm run dev
```
