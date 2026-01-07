# User Management System

This project is a full-stack application for managing users, consisting of an ASP.NET Core Web API backend and a ReactJS frontend.

## Features Implemented

- [x] View list of users
- [x] Add new users
- [x] Edit existing user details
- [x] Activate/Deactivate users
- [x] Delete users

## Prerequisites

- [.NET SDK](https://dotnet.microsoft.com/download) (6.0 or later)
- [Node.js](https://nodejs.org/) (v14 or later)

## Setup & Running

### 1. Backend (ASP.NET Core)

1. Open a terminal and navigate to the `server` folder:
   ```bash
   cd server
   ```
2. Run the application:
   ```bash
   dotnet run
   ```
   *Note: The API usually starts at `http://localhost:5056`. Check the terminal output to confirm.*
   *Swagger UI: `http://localhost:5056/swagger`*

### 2. Frontend (ReactJS)

1. Open a **new** terminal and navigate to the `client` folder:
   ```bash
   cd client
   ```
2. **Important:** Check `src/services/api.js` and ensure `API_URL` matches your backend port:
   ```javascript
   const API_URL = "http://localhost:5056/api/users"; // Update port 5056 if needed
   ```
3. Install dependencies and start:
   ```bash
   npm install
   npm start
   ```
   The application will run at `http://localhost:3000`.

## Git Initialization

To create a repository for this project:

```bash
git init
git add .
git commit -m "Initial commit: Complete User Management System"
```