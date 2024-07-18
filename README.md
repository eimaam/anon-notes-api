
# Anon-notes: Anonymous Notes - Backend

This repository contains the backend code for the Anonymous Messaging App `anon-notes`, a web application that allows users to create threads with titles and receive anonymous replies.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)

## Features

- User registration and authentication
- Create threads with titles
- Receive anonymous messages for threads > Responses
- Favourite and Archive Replies
- Share Replies to Socials as image or plain text.
- Light and Dark mode support for the UI (handled in the frontend)
- Notifications via Firebase

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Notifications**: Firebase
- **Validation**: express-validator
- **Programming Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js (v20 or later)
- npm or yarn
- MongoDB (local or cloud instance)
- Firebase project (not necessary)

### Installation

1. **Clone the repository:**

   ```bash
   git clone [https://github.com/your-username/anonymous-messaging-backend.git](https://github.com/eimaam/anon-notes-api.git)
   cd anon-notes-api
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

### Environment Variables

Create a `.env` file in the root directory and add the env as listed in `.env.example` file

### Running the Application

Start the development server:

```bash
npm run dev
```

or

```bash
yarn dev
```

The server will start on `http://localhost:3000` (Here the PORT you served via `env).

### Example JSON Responses

#### Register

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "60d21b4667d0d8992e610c85",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```
