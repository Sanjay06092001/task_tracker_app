# Task Tracker App

A full-stack Task Tracker application with JWT authentication, in-memory storage, and CRUD operations for tasks. Built with React (frontend) and Express/TypeScript (backend).

## Features
- User registration and login (JWT-based authentication)
- Create, read, update, delete (CRUD) tasks for the logged-in user
- All data stored in-memory (no database required)
- Protected API routes (JWT required)
- Responsive dashboard UI
- Password visibility toggle
- Error and success message handling
- Input validation

## Technologies Used
- Frontend: React, TypeScript, Axios, CSS
- Backend: Node.js, Express, TypeScript, bcrypt, jsonwebtoken

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Backend Setup
1. Navigate to the `server` folder:
   ```sh
   cd server
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file:
   ```env
   JWT_SECRET=your_jwt_secret_key_here
   PORT=4000
   ```
4. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup
1. Navigate to the `client` folder:
   ```sh
   cd client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend app:
   ```sh
   npm start
   ```

### Usage
- Register a new user and log in.
- Add, edit, complete, or delete tasks from your dashboard.
- All actions require authentication (JWT token).
- Data is stored in-memory and will reset when the backend restarts.

## API Endpoints
- `POST /auth/register` — Register a new user
- `POST /auth/login` — Login and receive JWT token
- `GET /tasks` — List user's tasks (protected)
- `POST /tasks` — Add a new task (protected)
- `PUT /tasks/:id` — Edit task or mark completed (protected)
- `DELETE /tasks/:id` — Delete a task (protected)

## Notes
- For demo/assessment purposes only. Not suitable for production.
- No persistent storage; all data lost on server restart.

## License
MIT
