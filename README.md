# St. Brain's Model College Frontend

St. Brain's Model College Frontend is the Next.js portal for the school management system. It is being shaped as a direct, single-school interface for the core dashboards used by administrators, teachers, students, and parents.

## Overview
This frontend is focused on the day-to-day school experience rather than SaaS onboarding. It provides a single-school landing experience and dashboard entry points for the main user groups.

The current app direction is:
- Direct access to dashboards without login redirects during the rebuild phase
- A single-school experience for St. Brain's Model College
- Dashboard-first navigation for school operations and academic tracking
- Clean API integration with the backend service

## Tech Stack
- Next.js 16 with the App Router
- TypeScript
- Tailwind CSS
- ShadCN UI
- Framer Motion
- TanStack Query
- Zustand
- Zod
- Axios
- pnpm

## Main Dashboards
- Admin Dashboard
- Teacher Dashboard
- Student Dashboard
- Parent Dashboard

## Repository Structure
```text
src/
  app/          # App Router pages, layouts, and route groups
  components/   # Shared UI and feature components
  lib/          # API clients and utilities
  hooks/        # Custom React hooks
  providers/    # Context providers
  store/        # Zustand state
  services/     # Data fetching and business logic
  types/        # Shared TypeScript types
  utils/        # Helper functions
  data/         # Local/static data used by UI pieces
public/         # Static assets
```

## Setup
Install dependencies with pnpm:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

The app runs at:

```bash
http://localhost:3000
```

## Notes
- The project is being rebuilt from an older SaaS-style portal into a single-school portal for St. Brain's Model College.
- Authentication and protected route behavior may be temporarily bypassed during the rebuild.
- Frontend API calls should point to the local backend instance used by the backend workspace.

## Development Standards
- TypeScript-first development
- Zod for runtime schema validation
- TanStack Query for server state
- ShadCN UI for consistent components
- ESLint, Prettier, Husky, and Lint-Staged for code quality
