# 🎨 Art Talks - Full Stack Real Time Art Platform

Art Talks is a full-stack real-time art platform that combines a visual art gallery with a live discussion forum. The app allows art enthusiasts to share artwork and have interactive conversations in real time.

## 🛠️ Tech Stack

### Frontend

- **Framework:** React 19 (TypeScript)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS 4.0
- **Data Fetching:** TanStack React Query (for efficient server-state management)
- **Routing:** React Router 7
- **Icons & UI:** Lucide React & React Toastify
- **Real-time:** Socket.io-client

### Backend

- **Framework:** NestJS (Node.js)
- **Database:** PostgreSQL with TypeORM
- **Real-time:** NestJS WebSockets (socket.io, @nestjs/websockets ,@nestjs/platform-socket.io)
- **Documentation:** Swagger UI (@nestjs/swagger)
- **Validation:** Class-validator & Class-transformer

---

## ✨ Features Implemented

1.  **Gallery Homepage:**
    - Hardcoded list support & Dynamic backend fetching.
    - Responsive Art Cards including artist name and descriptions.
    - **Search Functionality:** Real-time filtering by artwork or artist name.
2.  **Discussion Page:**
    - Detailed view of selected artwork.
    - **Real-time Chat:** Fully functional chat interface using WebSockets (Socket.io).
    - Instant UI updates upon incoming messages.
3.  **Features:**
    - Backend integration with NestJS.
    - Comprehensive error handling with React Toastify.

---

## 📦 Getting Started

### 1. Prerequisites

- Node.js (Latest LTS recommended)
- PostgreSQL (for the backend database)

### 2. Backend Setup

```bash
cd backend
npm install
# Configure your .env or database settings in TypeORM config
npm run start:dev
```

3. Frontend Setup

```bash
    cd frontend
    npm install
    npm run dev
```

---

## 🏗️ Architecture & Decisions

React Query: Chosen for the frontend to handle caching, loading states, and seamless data fetching from the NestJS API.
NestJS WebSockets: Leveraged NestJS Gateways to manage real-time communication efficiently.
TypeORM: Used to ensure type-safety and easy database management with PostgreSQL.
Clean Code: Followed a modular structure, separating components, hooks, and services to ensure maintainability.
