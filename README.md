# NG-Notifications

A full-stack personal notifications app. Users can register, log in, and manage notifications (INFO / WARNING / ERROR) with live dismissible banners on the dashboard. Built with React + TypeScript (frontend) and NestJS + MongoDB (backend), using JWT authentication.

## Prerequisites

Make sure the following are installed before you start:

- **Node.js >= 22 (LTS)**
- **npm >= 10**
- **MongoDB** — either a local MongoDB installation, or **Docker** to run the provided `docker-compose.yml`

TypeScript is installed per-package as a dependency, so you do **not** need a global TypeScript install.

## Getting the Code

Clone the repository and enter it:

```
git clone <your-repo-url>
cd ng-notifications
```

The project has two apps in separate folders: `backend/` and `frontend/`, each
with its own dependencies. You need to set up both.

## Installing Dependencies

### Backend

From the project root:

```
cd backend
npm install
```

### Frontend

From the project root:

```
cd frontend
npm install
```

## Database

The backend needs a running MongoDB instance. Pick one:

**Option A — Docker:** from the project root, start MongoDB with the
provided compose file:

```
docker compose up -d
```

**Option B — Local MongoDB:** install MongoDB Community Edition and ensure the
`mongod` service is running.

Note the connection string to use set up environment variables.

## Environment Variables

Both apps read configuration from `.env` files that are **not** committed to the
repository. Create them before running the app. Fill in your values according to the table shown below:


**`backend/.env`**

| Variable     | Description                               | Example                                      |
| ------------ | ----------------------------------------- | -------------------------------------------- |
| `MONGO_URI`  | MongoDB connection string                 | `mongodb://localhost:27017/ng-notifications` |
| `JWT_SECRET` | Secret used to sign and verify JWT tokens | `a-long-random-string`                       |

**`frontend/.env`**

| Variable       | Description                 | Example                 |
| -------------- | --------------------------- | ----------------------- |
| `VITE_API_URL` | Base URL of the backend API | `http://localhost:3000` |

## Running the App
 
Make sure MongoDB is running (see [Database](#database)) and both `.env` files are in place before starting.
 
The backend and frontend run as two separate processes, so start each in its own terminal.
 
### Backend
 
From the project root:
 
```
cd backend
npm run start
```
 
This starts the NestJS API in watch mode (restarts on file changes) at `http://localhost:3000`. To run without watch mode, use `npm run start`.
 
### Frontend
 
In a second terminal, from the project root:
 
```
cd frontend
npm run dev
```
 
This starts the Vite dev server at `http://localhost:5173`. Open that URL in your browser.
 
Make sure `VITE_API_URL` in `frontend/.env` points at the backend(`http://localhost:3000` by default). The backend already allows requests from the Vite dev server origin via CORS.
 
## Running Tests
 
The backend includes unit tests for its services (the Mongoose model is mocked, so **no database is required** to run them).
 
From the project root:
 
```
cd backend
npm test
```
 
Useful variants:
 
```
npm run test:watch   # re-run on file changes
npm run test:cov     # run with a coverage report
```
 
> The end-to-end tests (`npm run test:e2e`) boot the full application and
> therefore need a running MongoDB instance and the backend `.env` in place.
