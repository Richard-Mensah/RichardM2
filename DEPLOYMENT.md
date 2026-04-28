# Richard Mensah Website Deployment Guide

This site is a Next.js App Router application with PostgreSQL and Drizzle ORM. It is designed as Richard Mensah's AI, leadership, and SDG-impact personal brand platform.

## 1. Add Richard's real image before deployment

The redesigned hero is already wired to load the real portrait from:

```txt
public/richard-mensah-photo.jpg
```

Before deploying, save the supplied professional headshot using exactly that filename and location.

Recommended image settings:

- Format: JPG or JPEG
- Filename: `richard-mensah-photo.jpg`
- Location: `public/richard-mensah-photo.jpg`
- Suggested size: at least 1200px wide
- Crop: portrait / head-and-shoulders
- Keep the current fallback asset `public/richard-mensah-profile.svg` in place in case the photo is missing.

## 2. SDG visual system

The site includes an SDG-colour-inspired wheel asset at:

```txt
public/sdg-impact-wheel.svg
```

It is designed as an SDG contribution motif for the website. If you use official United Nations SDG logos or icons in public/commercial contexts, review the latest UN SDG logo usage guidance and permissions requirements.

## 3. Required environment variables

Create the following variable in your deployment platform:

```txt
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

For local development, the sandbox uses:

```txt
postgresql://postgres:postgres@127.0.0.1:5432/app_db
```

## 4. Install dependencies

```bash
npm install
```

## 5. Apply the database schema

The collaboration form stores inquiries in PostgreSQL through Drizzle ORM.

```bash
npx drizzle-kit push
```

## 6. Validate before deployment

Run the same production checks used during development:

```bash
npx next typegen
npm exec tsc -- --noEmit --pretty false
npm run build
```

## 7. Deploying to Vercel

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Add `DATABASE_URL` in Vercel project settings.
4. Add `public/richard-mensah-photo.jpg` before the final production deployment.
5. Run `npx drizzle-kit push` against the production database from a trusted environment.
6. Deploy.

## 8. Deploying to another Node host

Use a Node-compatible platform that supports Next.js and PostgreSQL.

Typical production commands:

```bash
npm install
npx drizzle-kit push
npm run build
npm run start
```

## 9. Health check

The app provides a health endpoint:

```txt
/api/health
```

A healthy response returns:

```json
{ "ok": true }
```

## 10. Collaboration form data

Collaboration submissions are stored in the `collaboration_inquiries` table with:

- name
- email
- organization
- collaboration type
- SDG / focus area
- message
- created timestamp

Use your database dashboard or SQL client to review submissions.
