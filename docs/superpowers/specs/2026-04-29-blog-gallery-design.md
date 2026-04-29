# Blog & Gallery Design Spec
Date: 2026-04-29

## Overview

Add two new top-level features to the site:
1. **Blog (`/blog`)** — markdown-based articles in four categories; card grid listing with filter; individual article pages
2. **Gallery (`/gallery`)** — personal and professional photo grid with lightbox

Both become nav entries. The homepage SectionOverview expands from 6 to 8 cards (4-column grid on desktop).

---

## Part 1: Blog

### Content

- Articles stored as `.md` files in `/content/articles/` (repo root)
- Frontmatter fields:

```yaml
---
title: string        # Article title
category: string     # One of the four categories below
date: string         # ISO date: "YYYY-MM-DD"
excerpt: string      # One-sentence summary shown on card
coverImage: string   # Optional: "/articles/filename.jpg"
---
```

- **Categories (exact strings):**
  - `AI, Data & Climate`
  - `AI Ethics & Technologies`
  - `Youth Leadership`
  - `Community & SDGs`

- Slugs are derived from the filename: `ai-in-africa.md` → `/blog/ai-in-africa`
- Images referenced in article body: placed in `/public/articles/`, referenced as `![alt](/articles/img.jpg)`

### Dependencies

Install three packages (no `next.config.ts` changes required):

| Package | Purpose |
|---|---|
| `gray-matter` | Parse markdown frontmatter |
| `react-markdown` | Render markdown body as React |
| `remark-gfm` | GitHub Flavored Markdown (tables, task lists, strikethrough) |

### Routes

| Route | File | Type | Description |
|---|---|---|---|
| `/blog` | `src/app/blog/page.tsx` | Static | Article listing with category filter |
| `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` | Static (generateStaticParams) | Individual article |

### Files to Create

#### `src/lib/articles.ts`
Utility module. Two exports:
- `getAllArticles(): ArticleMeta[]` — reads all `.md` files from `/content/articles/`, parses frontmatter, returns sorted by date descending
- `getArticle(slug: string): { meta: ArticleMeta; content: string } | null` — reads and parses one file by slug

```ts
type ArticleMeta = {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  coverImage?: string;
};
```

Uses Node.js `fs` (server-only — never imported in client components).

#### `src/app/blog/page.tsx`
Server component. Calls `getAllArticles()`, passes result to `<BlogListing articles={articles} />`.

Metadata: `title: "Writing | Richard Mensah"`, description referencing the four categories: AI, Data & Climate · AI Ethics & Technologies · Youth Leadership · Community & SDGs.

#### `src/app/blog/[slug]/page.tsx`
Server component.
- `generateStaticParams`: maps all slugs to `{ slug }` objects
- Calls `getArticle(slug)`, renders article layout:
  - Category badge + date
  - Title (h1)
  - Optional cover image (Next.js `<Image>`)
  - Body via `<ReactMarkdown remarkPlugins={[remarkGfm]}>`
  - `<SectionNav>` at bottom linking back to `/blog`
- Returns 404 (`notFound()`) if slug doesn't resolve

#### `src/components/features/blog/BlogListing.tsx`
`"use client"` component.
- Props: `articles: ArticleMeta[]`
- State: `activeCategory: string` (default `"All"`)
- Filter buttons: `All` + one per category; active button uses accent colour
- Renders filtered `<ArticleCard>` grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`

#### `src/components/features/blog/ArticleCard.tsx`
Server-compatible card component.
- Props: `article: ArticleMeta`
- Layout: category badge (coloured by category), date, title, excerpt, "Read →" link
- Category colour map:
  - `AI, Data & Climate` → `#009EDB`
  - `AI Ethics & Technologies` → `#FD6925`
  - `Youth Leadership` → `#FCC30B`
  - `Community & SDGs` → `#19486A`

### Navigation Update

Add to `NAVIGATION` in `src/constants/index.ts`:
```ts
{ label: "Writing", href: "/blog" }
```
Insert after `Collaborate` (becomes 7th item).

---

## Part 2: Gallery

### Content

- Photos placed in `/public/gallery/` by the site owner
- Metadata defined in `src/data/gallery.ts` — manually maintained array:

```ts
export type GalleryPhoto = {
  src: string;      // e.g. "/gallery/speaking-accra.jpg"
  alt: string;      // Screen-reader description
  caption?: string; // Optional visible caption
};

export const GALLERY: GalleryPhoto[] = [
  // populated by owner as photos are added
];
```

### Route

| Route | File | Type |
|---|---|---|
| `/gallery` | `src/app/gallery/page.tsx` | Static |

### Files to Create

#### `src/data/gallery.ts`
Exports `GalleryPhoto` type and `GALLERY` constant (initially empty array with one example commented out).

#### `src/app/gallery/page.tsx`
Server component. Imports `GALLERY`, renders `<GalleryLightbox photos={GALLERY} />`.

Metadata: `title: "Gallery | Richard Mensah"`.

#### `src/components/features/gallery/GalleryLightbox.tsx`
`"use client"` component. Renders both the grid and the overlay (combined so click handlers are co-located).
- Props: `photos: GalleryPhoto[]`
- State: `activeIndex: number | null` (null = closed)
- Renders a responsive grid: `grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3`
- Each cell: `<button>` wrapping Next.js `<Image>` (aspect-square, object-cover, rounded-2xl, hover scale)
- When `activeIndex !== null`, renders lightbox overlay:
  - Fixed full-screen dark backdrop (`bg-black/90`)
  - Centred `<Image>` (max-h-[85vh], object-contain)
  - Optional caption below image
  - Prev (`←`) and Next (`→`) buttons; wraps at boundaries
  - Close button (`×`) top-right
  - Keyboard: `Escape` → close, `ArrowLeft/ArrowRight` → navigate (via `useEffect` + `keydown` listener)
  - Click on backdrop → close

### Navigation Update

Add to `NAVIGATION` in `src/constants/index.ts`:
```ts
{ label: "Gallery", href: "/gallery" }
```
Insert after `Writing` (becomes 8th item).

---

## Part 3: Homepage SectionOverview Update

`src/components/features/home/SectionOverview.tsx` — add two new entries to the `SECTIONS` array:

```ts
{ label: "Writing", href: "/blog",    tagline: "Articles on AI, climate intelligence, and youth leadership", accent: "#009EDB" },
{ label: "Gallery", href: "/gallery", tagline: "Personal and professional photos from the field",            accent: "#FCC30B" },
```

Change the grid from `lg:grid-cols-3` to `lg:grid-cols-4` so 8 cards sit in two rows of 4 on desktop.

---

## Verification

### Blog
1. `npm install gray-matter react-markdown remark-gfm`
2. Create at least one article in `/content/articles/` with all required frontmatter fields
3. `npm run dev` → visit `/blog` — article card appears, category filter works
4. Click card → `/blog/[slug]` renders title, date, body, optional image
5. `npm run build` — no TypeScript errors; `/blog` and `/blog/[slug]` are listed as static routes

### Gallery
1. Add at least one image to `/public/gallery/` and add its entry to `src/data/gallery.ts`
2. `npm run dev` → visit `/gallery` — image grid renders
3. Click a photo → lightbox opens fullscreen
4. Test Escape key, arrow keys, and backdrop click to close/navigate
5. `npm run build` — clean

### Navigation
- All 8 nav items visible on desktop; hamburger menu shows all 8 on mobile
- Active link highlight works on all new routes
- SectionOverview on homepage shows 8 cards in 4-column grid on desktop
