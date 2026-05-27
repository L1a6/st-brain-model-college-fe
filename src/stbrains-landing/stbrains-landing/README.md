# St. Brain's Model College — Landing Page

## Setup

```bash
npm install
npm run dev
```

## ⚠️ Logo Setup

Place your `logo123.jpg` file in the `/public/` directory.

The logo is referenced at `/logo123.jpg` throughout the project.

## Environment

No environment variables needed for the landing page.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Fonts: Playfair Display + Jost (Google Fonts)
- Images: Unsplash CDN

## Brand Colors

| Color      | Hex       | Usage                           |
|------------|-----------|----------------------------------|
| Crimson    | `#DA3743` | Primary accent, CTAs, highlights |
| Navy Dark  | `#0B1220` | Sidebar, hero overlay, footer    |
| Navy Mid   | `#1B3B6F` | Secondary navy elements          |

## Pages

| Route           | Description              |
|-----------------|--------------------------|
| `/`             | Homepage (all sections)  |
| `/about`        | About Us page            |
| `/admissions`   | Admissions process       |
| `/contact`      | Contact form             |

## Portal Links

The "Login to Portal" button links to `/portal/student/login`.
This assumes the portal system is running on the same domain.

- Student Portal: `/portal/student/login`
- Teacher Portal: `/staff/teacher/login` (hidden route)
- Admin Portal:   `/staff/management/login` (hidden route)

## Integrating with the Portal System

Copy the `src/` folder content into your existing portal project (patfon-portal),
or deploy both projects and configure a reverse proxy (e.g., Nginx/Vercel rewrites)
to serve the landing page at `/` and the portal at `/portal/*` and `/staff/*`.
