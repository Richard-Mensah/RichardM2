# richmensah.com

Source for **[richmensah.com](https://www.richmensah.com)**, the personal site of Richard Mensah: AI & data scientist, youth leader, and Global Director of EGA Mentorship International.

The site does two jobs:

- **Public portfolio.** About 50 pages covering research, projects, leadership, SDG impact, a blog and a gallery.
- **Small CMS.** A password-protected `/admin` panel that edits homepage copy, impact stats, testimonials, opportunities, gallery photos and blog articles without a redeploy.

| | |
|---|---|
| **Framework** | Next.js 16 (App Router, React 19, TypeScript 5.9) |
| **Styling** | Tailwind CSS v4 (CSS-first `@theme` tokens), Inter + Space Grotesk |
| **Data** | PostgreSQL via Drizzle ORM + `pg` (Neon recommended) |
| **Files** | Vercel Blob (gallery uploads), Markdown in `content/articles` (blog) |
| **Hosting** | Vercel |

---

## Contents

- [Quick start](#quick-start)
- [Environment variables](#environment-variables)
- [Project structure](#project-structure)
- [Architecture](#architecture)
  - [Rendering and data flow](#rendering-and-data-flow)
  - [Database](#database)
  - [Admin CMS and authentication](#admin-cms-and-authentication)
  - [Booking sessions (EGA Mentorship)](#booking-sessions-ega-mentorship)
  - [Contact form](#contact-form)
  - [Analytics](#analytics)
  - [Design system](#design-system)
  - [SEO](#seo)
- [API reference](#api-reference)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Common tasks](#common-tasks)
- [Known limitations and roadmap](#known-limitations-and-roadmap)

---

## Quick start

**Prerequisites:** Node.js 20+ and npm. A Postgres database is optional for local work (see [Graceful degradation](#graceful-degradation)).

```bash
git clone https://github.com/Richard-Mensah/RichardM2.git
cd RichardM2
npm install
cp .env.example .env.local   # then fill in values; everything is optional locally
npm run dev                  # http://localhost:3000
```

To use a database locally, set `DATABASE_URL` in `.env.local` and create the tables once:

```bash
npm run db:push
```

Before opening a PR, run the full gate:

```bash
npm run check   # typecheck, then lint, then production build
```

---

## Environment variables

Set these in `.env.local` for local work and in **Vercel → Project → Settings → Environment Variables** for production. `.env*` files are git-ignored.

| Variable | Required | Used by | Purpose |
|---|---|---|---|
| `DATABASE_URL` | Production | `src/db/index.ts`, `drizzle.config.ts` | Postgres connection string. Neon: add `?sslmode=require`. |
| `ADMIN_PASSWORD` | For `/admin` | `api/admin/login` | Password for the admin panel. Without it, admin login is disabled. |
| `ADMIN_SESSION_SECRET` | Recommended | `src/lib/adminAuth.ts` | Key used to sign admin session cookies. Falls back to `ADMIN_PASSWORD`. Use a long random string, e.g. `openssl rand -hex 32`. |
| `BLOB_READ_WRITE_TOKEN` | For gallery uploads | `api/admin/gallery`, `lib/gallery.ts` | Vercel Blob token. Created automatically when you connect a Blob store in Vercel. |
| `NEXT_PUBLIC_SITE_URL` | No | `src/lib/siteUrl.ts` | Canonical URL for metadata, sitemap and robots. Defaults to `https://www.richmensah.com`. |

Rotating `ADMIN_SESSION_SECRET`, or `ADMIN_PASSWORD` when no secret is set, signs every admin out immediately.

---

## Project structure

```
content/articles/         Blog posts as Markdown + frontmatter (title, category, date, excerpt, coverImage)
public/                   Static assets: portraits, gallery/community photos, CV PDF
scripts/gen-favicons.cjs  One-off favicon generator from public/Rich1.png (needs `sharp`)
docs/                     Planning notes and design specs
src/
  app/                    App Router: one folder per route
    (public pages)        about/, research/, projects/, leadership/, blog/, gallery/, sdgs/, contact/, ...
    admin/                CMS pages (protected by middleware)
    api/                  Route handlers (see API reference)
    layout.tsx            Root layout: fonts, header, footer, page-view tracker
    sitemap.ts, robots.ts
  components/
    layout/               SiteHeader (+ DesktopNav, MobileNav), SiteFooter
    features/             Page sections grouped by domain (home, hero, research, projects, ...)
    admin/                CMS forms and managers
    ui/                   Shared primitives: Card, SectionHeading, SectionNav, BookingLink, ...
  constants/index.ts      Site content and config: navigation, SDGs, pillars, BOOKING_URL, ...
  data/                   Static datasets (gallery seed, development data)
  db/                     Drizzle schema + lazily-initialised connection pool
  lib/                    Data access and domain logic (one module per content type), auth, utils
  middleware.ts           Guards /admin/* behind a signed session cookie
  types/                  Shared TypeScript types
```

**Conventions**

- **Content** that rarely changes lives in `src/constants`.
- **Content** Richard edits often lives in the database and is edited through `/admin`.
- **Pages stay thin.** Each page in `src/app` composes sections from `src/components/features`.
- **Data access only happens in `src/lib/*`.** Components never import `@/db` directly. The one exception is the admin inquiries page.

---

## Architecture

### Rendering and data flow

```
Request ──> middleware.ts (only /admin/*: verify signed cookie)
        └─> app/<route>/page.tsx (Server Component)
              └─> lib/<content>.ts ──> db (Drizzle/pg) ──> Postgres
                        └─ on any error ──> typed static defaults
```

- **Where rendering happens.** Pages are React Server Components. Only interactive pieces are Client Components: the header menu, forms, lightbox and admin managers.
- **Dynamic pages.** Pages that read CMS data use `export const dynamic = "force-dynamic"`. These are `/`, `/about`, `/gallery`, `/opportunities` and `/blog/*`.
- **Cache refresh.** When an admin saves something, the handler calls `revalidatePath()` so the affected pages refresh.
- **External data.** The only third-party call is the public GitHub API, used by `/projects/open-source` and `/projects/portfolio` and cached for one hour with `revalidate: 3600`.

#### Graceful degradation

Every `lib/*` read is wrapped in `try/catch` and falls back to typed defaults, e.g. `DEFAULT_IMPACT_STATS`, `DEFAULT_TESTIMONIALS`, `DEFAULT_HOMEPAGE`. The consequences:

- **The public site stays up without a database.** The site builds and renders with no `DATABASE_URL`.
- **What does need a database:** writes (the contact form, admin saves) and `/api/health`. These fail loudly with a 500.
- **Opportunities** is DB-only and renders an empty list without a database.

### Database

Schema lives in [`src/db/schema.ts`](src/db/schema.ts):

| Table | Purpose |
|---|---|
| `collaboration_inquiries` | Contact-form submissions (read in `/admin/inquiries`) |
| `site_settings` | Key/value `jsonb` store for singletons: `homepage`, `author` |
| `impact_stats` | Ordered homepage/about stats |
| `testimonials` | Ordered testimonials |
| `opportunities` | Opportunities board ("Kofiever") |
| `gallery_photos` | Gallery entries (URLs point at Vercel Blob or `/public`) |
| `page_views` | First-party page-view log |

**Connection.** [`src/db/index.ts`](src/db/index.ts) exports `db` and `pool` as lazy Proxies:

- **Lazy initialisation.** The pool is created on first use, not at import, so `next build` works without `DATABASE_URL`.
- **One cached pool per instance.** The pool is cached on `globalThis` in every environment. On Vercel that means one pool per serverless instance (`max: 5`, 5 s connect timeout).
- **Why caching matters.** The Proxy resolves the pool on every property access, so an uncached pool would leak a new connection pool per query.

**Schema management.**
- `collaboration_inquiries` is created by `npm run db:push`, which runs drizzle-kit.
- The CMS tables also self-create at runtime: each `lib/*` module runs `CREATE TABLE IF NOT EXISTS` once per process via `ensureTable()`.
- Seeds come from the typed defaults when a table is empty.
- There is no migrations folder yet (see [roadmap](#known-limitations-and-roadmap)).

### Admin CMS and authentication

`/admin` is a single-user CMS. It is protected in two layers:

1. **Pages.** [`src/middleware.ts`](src/middleware.ts) guards every `/admin/*` page except `/admin/login` and redirects unauthenticated visitors to the login page.
2. **API routes.** Every mutating `/api/admin/*` handler calls `await isAuthed(request)` itself. The middleware does not cover `/api`.

**Session design** ([`src/lib/adminAuth.ts`](src/lib/adminAuth.ts)):

- **Login.** `POST /api/admin/login` checks the password against `ADMIN_PASSWORD` with a constant-time comparison. A failed attempt adds a fixed 500 ms delay.
- **Cookie.** On success the handler sets the `admin_session` cookie: httpOnly, `sameSite=lax`, `secure` in production, 7-day lifetime.
- **Token format.** The cookie value is `<expiresAtMs>.<HMAC-SHA256(secret, "admin:<expiresAtMs>")>`.
- **Forgery.** Without the secret the cookie cannot be forged, and expired tokens are rejected.
- **Runtime.** Everything uses Web Crypto, so the same code runs in middleware and route handlers.
- **Redirects.** The post-login `?next=` redirect only accepts `/admin…` paths, which prevents open redirects.
- **Article routes.** Slugs must match `^[a-z0-9]+(?:-[a-z0-9]+)*$`, which blocks path traversal. Frontmatter is whitelisted to `title`, `category`, `date`, `excerpt` and `coverImage`.

### Booking sessions (EGA Mentorship)

One-to-one sessions are booked on EGA Mentorship at `https://www.egamentorship.org/book/richard`.

- **Where the URL lives.** It is defined once as `BOOKING_URL` in [`src/constants/index.ts`](src/constants/index.ts).
- **How it is rendered.** It is only ever rendered through [`src/components/ui/BookingLink.tsx`](src/components/ui/BookingLink.tsx). That component opens a new tab with `rel="noopener noreferrer"` and includes screen-reader text.
- **Where it appears:** the header (desktop and mobile), the hero, the closing CTA, the contact page, the contact-form success state and the footer.
- **Why it isn't embedded.** EGA sends `X-Frame-Options: DENY` / `frame-ancestors 'none'`, so the page cannot be shown in an iframe.

To change the booking URL, edit `BOOKING_URL` and nothing else.

### Contact form

`CollaborationForm` posts JSON to `POST /api/collaborations`, which:

- **Rejects malformed JSON** with a 400.
- **Uses a honeypot.** A hidden `website` field catches bots. A filled honeypot gets a fake 201 and nothing is stored.
- **Validates and cleans input.** It trims and caps field lengths, checks the email format, and whitelists collaboration type and focus area against `COLLABORATION_TYPES` / `FOCUS_AREAS`.
- **Stores the result** in `collaboration_inquiries`. Submissions are read at `/admin/inquiries`.

The API's `message` field is shown to the user on error. Labels are bound to inputs, errors use `role="alert"`, and success uses `aria-live`.

### Analytics

`PageViewTracker` (a client component in the root layout) posts `{ path, referrer }` to `/api/analytics/track` on every route change, using `keepalive`. `/admin` paths are skipped.

- **No cookies, IPs or user agents** are stored.
- **The data** lands in `page_views`.
- **The dashboard** at `/admin/analytics` shows totals, 7- and 30-day counts, top pages, top blog posts and a 14-day trend.

### Design system

Tailwind v4 is configured CSS-first: all tokens live in `@theme` in [`src/app/globals.css`](src/app/globals.css). There is no `tailwind.config.*` file.

| Token group | Examples |
|---|---|
| Navy (structure, dark bands) | `navy-950` … `navy-600` |
| Accent / teal (primary interactive) | `accent`, `accent-strong`, `accent-soft`, `accent-tint` |
| Brand / red (one hero CTA per view) | `brand`, `brand-strong` |
| Surfaces and text | `surface`, `surface-card`, `surface-muted`, `ink`, `body`, `muted`, `on-dark`, `on-dark-muted`, `line` |
| SDG palette | `sdg-1` … `sdg-17`, `.sdg-band`, `.sdg-conic` |

- **Button classes:** `.btn-primary` (navy), `.btn-accent` (teal), `.btn-brand` (red), `.btn-ghost` for light surfaces, `.btn-white` for dark surfaces.
- **Fonts:** Inter (`font-sans`) and Space Grotesk (`font-display`), loaded with `next/font/google`.

### SEO

- **Metadata.** `metadataBase` comes from `SITE_URL`, and every page exports its own `metadata`.
- **Sitemap.** [`src/app/sitemap.ts`](src/app/sitemap.ts) is generated from `NAVIGATION`.
- **Robots.** [`src/app/robots.ts`](src/app/robots.ts) disallows `/admin` and `/api`.
- **Icons.** Favicons and app icons live in `src/app/` (`icon.png`, `apple-icon.png`, `favicon.ico`).

---

## API reference

All handlers return JSON of the form `{ ok: boolean, message?: string, ... }`.

| Route | Method | Auth | Description |
|---|---|---|---|
| `/api/health` | GET | — | `select 1`. Returns 200 `{ok:true}` or 500. Use it for uptime checks. |
| `/api/collaborations` | POST | — | Submit a contact inquiry (see [Contact form](#contact-form)). |
| `/api/analytics/track` | POST | — | Record a page view `{ path, referrer }`. |
| `/api/development-data` | GET | — | Static development dataset (currently unused by the UI). |
| `/api/admin/login` | POST | — | `{ password }` → sets the session cookie, returns `{ redirect }`. |
| `/api/admin/logout` | POST | — | Clears the session cookie. |
| `/api/admin/homepage` | GET / PUT | PUT | Homepage copy (`site_settings.homepage`). |
| `/api/admin/author` | GET / PUT | PUT | Blog author bio (`site_settings.author`). |
| `/api/admin/impact-stats` | GET / PUT | PUT | Replace all impact stats. |
| `/api/admin/testimonials` | GET / PUT | PUT | Replace all testimonials. |
| `/api/admin/opportunities` | GET / PUT | PUT | Replace all opportunities. |
| `/api/admin/gallery` | POST / DELETE | Both | Upload (multipart → Vercel Blob) or delete a gallery photo. |
| `/api/admin/articles` | GET / POST | POST | List articles, or create a Markdown article. |
| `/api/admin/articles/[slug]` | GET / PUT / DELETE | PUT, DELETE | Read, update or delete an article. |

---

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server on `:3000` (webpack mode) |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (`eslint-config-next`) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run check` | Typecheck, then lint, then build. Run this before every push. |
| `npm run db:push` | Push `src/db/schema.ts` to the database (drizzle-kit) |

---

## Deployment

Production runs on **Vercel** from the `main` branch; every push to `main` deploys.

1. **Database.** Create a Neon (or any Postgres) database. Set `DATABASE_URL` in Vercel, then run `npm run db:push` once against it.
2. **Admin.** Set `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET`.
3. **Gallery.** In Vercel → Storage, create a Blob store and connect it to the project. This sets `BLOB_READ_WRITE_TOKEN`.
4. **Verify.** Push to `main`, then check `https://www.richmensah.com/api/health` returns `{"ok":true}`.

See [DEPLOYMENT.md](DEPLOYMENT.md) for host-specific notes.

---

## Common tasks

| Task | How |
|---|---|
| Change the booking link | Edit `BOOKING_URL` in `src/constants/index.ts` |
| Edit homepage copy, stats or testimonials | `/admin` → the relevant section (no deploy needed) |
| Add a blog post | Add `content/articles/<slug>.md` with frontmatter and commit it (see limitations below) |
| Add a page | Create `src/app/<route>/page.tsx`, export `metadata`, and add it to `NAVIGATION` if it belongs in the menu and sitemap |
| Update the CV | Replace `public/richard-mensah-cv.pdf` |
| Add a table | Define it in `src/db/schema.ts`, run `npm run db:push`, and add a `src/lib/<name>.ts` access module with typed fallbacks |

---

## Known limitations and roadmap

These are known trade-offs, listed so nobody rediscovers them the hard way.

- **Blog editing in production.** Articles are Markdown files written to the local filesystem. Vercel's filesystem is read-only and ephemeral, so the admin article editor only persists changes when you run locally and commit the file. The next step is to move articles to Postgres or Blob.
- **Single shared admin password.** There are no user accounts and no rate limiting beyond a fixed delay. That is fine for one owner. Add rate limiting (e.g. Vercel KV) or an auth provider before adding more editors.
- **No rate limiting on public POST endpoints.** `/api/collaborations` has a honeypot; `/api/analytics/track` has nothing. Consider Vercel Firewall rate-limit rules.
- **No inquiry notifications.** Contact submissions are stored but no email is sent. Adding a transactional email provider such as Resend is a small, isolated change in `api/collaborations`.
- **Schema drift risk.** Tables are created by both drizzle-kit and runtime `ensureTable()` SQL. Moving to generated Drizzle migrations would give one source of truth.
- **No automated tests.** Good first targets: `lib/adminAuth.ts` (token signing and verification), the `api/collaborations` validation, and the article slug guard.
- **Unused code:** `/api/development-data` and `src/data/developmentData.ts`.

---

© Richard Mensah. All rights reserved. The source is public for transparency; content, photographs and branding may not be reused without permission.
