# Love Calculator 💖

A playful full-stack Love Calculator: enter two names and get a deterministic
"love score". Built with an Express API and a Vite + React (TypeScript) frontend.

## Stack

- **Frontend:** Vite + React + TypeScript (dev server on port `5173`)
- **Backend:** Express JSON API (port `3001`)
- The frontend proxies `/api/*` requests to the backend in development.

## Getting started

```bash
npm install        # install dependencies
npm run dev        # start API + frontend together (concurrently)
```

Then open http://localhost:5173.

You can also run the two processes separately:

```bash
npm run server     # Express API on http://localhost:3001
npm run client     # Vite dev server on http://localhost:5173
```

## Scripts

| Script            | Description                                  |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Run API and frontend together                |
| `npm run server`  | Run the Express API only                     |
| `npm run client`  | Run the Vite dev server only                 |
| `npm run build`   | Type-check and build the production frontend |
| `npm run preview` | Preview the production build                 |
| `npm run typecheck` | Type-check without emitting                |

## API

`POST /api/calculate`

```json
{ "nameA": "Romeo", "nameB": "Juliet" }
```

Response:

```json
{ "nameA": "Romeo", "nameB": "Juliet", "score": 73, "message": "Great potential — give it a shot!" }
```

`GET /api/health` → `{ "status": "ok" }`

The score is deterministic and order-independent (`A + B` equals `B + A`).
