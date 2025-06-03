# Monorepo: Firebase Backend & Next.js Frontend with Turborepo

This project is a monorepo built using **Turborepo** that combines:
- A **backend repo** using **Express.js** + **Firebase Admin SDK**
- A **frontend repo** using **Next.js 14+** (App Router) + **React MUI** + **Firebase Auth**
- Shared type definitions under `packages/shared`

---

## Features

### Backend (Express + Firestore)
- Update & fetch user data via REST API
- Calculate and store `potentialScore` based on:
  ```
  potentialScore = (totalAverageWeightRatings * 1_000_000) +
                   (numberOfRents * 1_000) +
                   (recentlyActive / 1_000_000)
  ```
- Paginated ranking based on `potentialScore` (descending)
- CORS support for frontend integration
- Error handling via custom `ApiError`

### Frontend (Next.js + Firebase Auth + Redux)
- Firebase email/password authentication
- Protected routing: redirects unauthenticated users to login
- Mobile-responsive login form (React MUI)
- Fetch and display user data using Redux state
- Input field to query users dynamically
- Page to list top-ranked users by potential

---

## Monorepo Structure

```
mono-repo/
├── apps/
│   ├── backend-repo/
│   │   ├── config/
│   │   ├── controller/
│   │   ├── core/
│   │   ├── routes/
│   │   └── ...
│   └── frontend-repo/
│       ├── app/
│       ├── components/
│       ├── store/
│       ├── apis/
│       └── ...
├── packages/
│   └── shared/
│       └── user.ts
├── turbo.json
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- Yarn (`corepack enable` recommended)
- Firebase project + emulator enabled (for backend dev)

---

### Install dependencies

```bash
yarn install
```

---

### Dev Commands

Run both frontend & backend with:

```bash
yarn dev
```

> `frontend-repo` runs on port `3001` if `3000` is taken by backend

---

### API Endpoints

| Method | Endpoint                         | Description             |
|--------|----------------------------------|-------------------------|
| PUT    | `/api/update-user-data`         | Update user + score     |
| GET    | `/api/fetch-user-data/:id`      | Get user by ID          |
| GET    | `/api/top-users?lastScore=...`  | Paginated top users     |

---

### Sample User Schema

```ts
type User = {
  id: string;
  name: string;
  email: string;
  totalAverageWeightRatings: number;
  numberOfRents: number;
  recentlyActive: number;
  potentialScore?: number;
};
```

---

## Firebase Auth Logic

- Auth state tracked using `onAuthStateChanged`
- If not logged in → redirect to `/login`
- After login → redirect to `/main`

---

## Bonus: Ranking Formula Explanation

To simulate a compound ranking score:

```ts
Score = rating * 1_000_000 + rents * 1_000 + recentlyActive / 1_000_000
```

This flattens multi-factor logic into a single number for accurate pagination.


## Environment Variables

Create a file named `.env.local` in the `frontend-repo` directory with the following content:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
```

> **Note**: Replace `your-project-auth-domain` and `your-project-id` with the actual values from your Firebase project. Avoid hardcoding sensitive keys in public repositories.
---

## Personality & Technical Questions

**1. Based on this URL link https://www.reddit.com/settings (login into Reddit). Without looking at the code base, which part of the settings page is NOT server side component? Please explain how to get your answer.**  
Elements like theme toggles (dark/light mode), notification preferences, or other instant UI changes are most likely not server-side components. To verify this, open the browser DevTools → go to the Network tab → filter by "document" or "XHR", and observe what gets triggered when changing settings. If there's no full HTML or server-rendered content being fetched, it suggests that part is handled client-side (likely via client-side JavaScript or hydration).

**2. What are the most difficult technical problems in your work experience you have encountered and how do you fix them?**  
One of the most challenging issues I faced was synchronizing real-time data from multiple sources (Firebase, REST APIs, WebSocket) into a single dashboard. This caused race conditions and inconsistent frontend state. I resolved this by redesigning state management using Redux Toolkit with async middleware (Thunk), implementing debouncing logic, and prioritizing updates to prevent state conflicts.

**3. When you’re working on a project, how do you typically approach it from start to finish?**  
I start by clarifying the requirements and breaking them into smaller, manageable tasks. I set up the repository structure and development environment. Then I proceed with backend logic (if fullstack), followed by frontend development and API integration. I prioritize testing, write documentation, and prepare deployment steps. Feature branches and pull requests are used for every major module for better code review and tracking.

**4. How do you usually approach learning a new topic to absorb as much as possible?**  
I start with the official documentation and sample use cases. I then build small projects to apply what I learn in practical scenarios. I also dive into edge cases and best practices through blogs and videos. Taking notes and experimenting through trial-and-error helps me retain knowledge more effectively.

**5. “Consistency” vs “fast & efficient”. Choose one.**  
Consistency. While speed is beneficial, consistent code style, structure, and implementation patterns are essential for long-term maintainability and team collaboration.

**6. Do you own any Apple products? Like iMac, MacBook, iPad, iPhone, etc…**  
Yes, I use a MacBook Pro for development due to its excellent compatibility with Docker, Node.js, Firebase CLI, and various cross-platform tools.

**7. What is your immediate availability to start this job?**  
I am available to start immediately after the interview and onboarding process is completed.

---

## Author

Made with ❤️ by Handika
---
