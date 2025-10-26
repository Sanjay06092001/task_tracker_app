# Task Tracker App - Backend

## Setup & Run

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```

- Server runs on `http://localhost:4000` by default.
- All data is stored in memory (no database required).

## Folder Structure

- `src/index.ts` — Express app entry point
- `src/routes/` — Route definitions
- `src/controllers/` — Route handlers
- `src/middlewares/` — Auth middleware
- `src/types/` — TypeScript interfaces

## API Endpoints

### Auth
- `POST /auth/register` — Register user
- `POST /auth/login` — Login user

### Tasks (Protected)
- `GET /tasks` — List tasks
- `POST /tasks` — Create task
- `PUT /tasks/:id` — Update task
- `DELETE /tasks/:id` — Delete task

## Environment
- Node.js
- Express.js
- TypeScript
- bcrypt
- jsonwebtoken
