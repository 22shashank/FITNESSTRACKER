# FitStack Fitness Analytics

FitStack is a full-stack personal fitness and performance analytics platform. Registered users sync their fitness state to a Node/Express API backed by SQLite, while localStorage keeps the app useful offline.

## Features

- Workout, nutrition, macro, weight, water, sleep, activity, goal, habit, PR, and progression tracking
- Dashboard analytics with real Recharts trends and generated insights
- Local fallback fitness assistant at `/assistant`
- Server-backed registration and login at `/account`
- Password hashing with bcrypt and JWT authentication
- Per-user SQLite state persistence through `/api/state`
- Demo data, JSON export/import, reset flow, and PWA offline shell

## Architecture

```text
React pages/components
        |
FitnessContext + client API service
        |
Express routes + JWT middleware
        |
SQLite users and per-user fitness state
```

The client uses `src/services/api.js` instead of calling the database directly. The provider hydrates state from the API when a JWT exists and falls back to localStorage when the server is unavailable. This keeps the storage boundary replaceable for a future managed database or REST deployment.

## Tech Stack

React 19, React Router, Vite, Tailwind CSS, Recharts, Lucide React, Node.js, Express, SQLite via better-sqlite3, bcryptjs, and JSON Web Tokens.

## Run Locally

```bash
npm install
cp .env.example .env
npm run dev:fullstack
```

On Windows, copy `.env.example` to `.env` manually if `cp` is unavailable. The frontend runs at `http://localhost:5173`; the API runs at `http://localhost:3001`. Register at `/account` to create a server-backed account.

Set a long random `JWT_SECRET` before any real deployment. The SQLite file is created at `server/data/fitgrid.sqlite` and is ignored by git.

## Testing

```bash
npm run test:headless
npm run build
```

The smoke tests cover storage import/export/reset, existing core records, workout metrics, estimated 1RM, progression, macro aggregation, goal progress, PR detection, and habit streaks.

## PWA and Offline Behavior

The manifest and service worker cache the application shell. Local fitness data remains available offline. Server sync resumes automatically when a valid JWT and API are available.

## Security Notes

Passwords are hashed server-side and sessions use signed JWTs. The client never contains a database credential or AI secret. Production deployments should use HTTPS, a strong secret manager, rate limiting, secure cookies or short-lived tokens, and a managed database backup strategy.

## Future Improvements

- Database migrations and production deployment configuration
- Feature-specific hooks and service interfaces
- Managed Postgres or MongoDB adapter
- Refresh-token rotation and account recovery
- Component tests and accessibility automation
