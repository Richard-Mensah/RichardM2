# Richard Mensah Website — Deployment Guide

Stack: Next.js App Router · PostgreSQL (Drizzle ORM) · Tailwind CSS v4 · Vercel

---

## Database: PostgreSQL (stay — do not switch to MongoDB)

This site stores collaboration form submissions in a structured table (`collaboration_inquiries`).
PostgreSQL is the correct choice — it handles structured, relational data with type safety, and the
Drizzle ORM + pg driver stack is already production-ready.

**Recommended Postgres host for Vercel: [Neon](https://neon.tech)**

- Free tier available, no credit card required
- Serverless — connection pooling handled for you
- Create a project → copy the connection string

```
DATABASE_URL=postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

---

## 1. Images

Your profile photos are already in `public/`:

| File | Purpose |
|------|---------|
| `public/Richard 1.jpg` | Main hero portrait (used in hero section) |
| `public/my image.jpg` | Secondary photo (used in identity section) |
| `public/sdg-impact-wheel.svg` | SDG wheel graphic |
| `public/richard-mensah-profile.svg` | Fallback SVG icon |

No renaming needed — the site references these files directly.

---

## 2. Required environment variables

Set these in your deployment platform (Vercel → Settings → Environment Variables):

```
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

For Neon it looks like:
```
DATABASE_URL=postgresql://richard:xxx@ep-cool-wildflower-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

Optional:
```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

---

## 3. Apply the database schema

Run this once against your production database to create the `collaboration_inquiries` table:

```bash
npx drizzle-kit push
```

For Neon: run this locally with the production `DATABASE_URL` exported, or from a trusted environment.

---

## 4. Install dependencies

```bash
npm install
```

---

## 5. Validate before deploying

```bash
npm exec tsc -- --noEmit --pretty false
npm run build
```

Both must complete without errors.

---

## 6. Deploy to Vercel

1. Push the project to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import the repo
3. Add `DATABASE_URL` in Vercel project settings (Environment Variables)
4. Click Deploy

Vercel detects Next.js automatically — no build command changes needed.

---

## 7. Deploy to another Node host

```bash
npm install
npx drizzle-kit push
npm run build
npm run start
```

Use any Node-compatible platform (Railway, Fly.io, Render, etc.) that supports Next.js.

---

## 8. Health check

```
GET /api/health
```

Returns `{ "ok": true }` when the database connection is live. Use this for uptime monitoring.

---

## 9. Collaboration form data

Submissions are stored in the `collaboration_inquiries` table. Review them via:
- Your database dashboard (Neon console, Supabase Table Editor, etc.)
- Any SQL client: `SELECT * FROM collaboration_inquiries ORDER BY created_at DESC;`
