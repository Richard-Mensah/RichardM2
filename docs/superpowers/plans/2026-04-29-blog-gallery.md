# Blog & Gallery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a markdown-file-driven blog at `/blog` (card grid + article pages) and a photo gallery at `/gallery` (grid + lightbox), both as full nav entries.

**Architecture:** Blog articles are `.md` files in `/content/articles/` parsed at build time with `gray-matter` and rendered with `react-markdown`. Gallery uses a static metadata array in `src/data/gallery.ts` with a client-side lightbox component. Both routes are statically generated.

**Tech Stack:** Next.js 16 App Router · TypeScript · Tailwind CSS v4 · `gray-matter` · `react-markdown` · `remark-gfm`

---

## File Map

| File | Action | Purpose |
|---|---|---|
| `content/articles/*.md` | Create | Article source files |
| `src/lib/articles.ts` | Create | `getAllArticles()` + `getArticle(slug)` server utilities |
| `src/app/blog/page.tsx` | Create | Blog listing page (server) |
| `src/app/blog/[slug]/page.tsx` | Create | Individual article page (server, static) |
| `src/components/features/blog/BlogListing.tsx` | Create | Client component — category filter + card grid |
| `src/components/features/blog/ArticleCard.tsx` | Create | Article card (server-compatible) |
| `src/data/gallery.ts` | Create | Gallery photo metadata array |
| `src/app/gallery/page.tsx` | Create | Gallery page (server) |
| `src/components/features/gallery/GalleryLightbox.tsx` | Create | Client component — photo grid + lightbox |
| `src/constants/index.ts` | Modify | Add Writing + Gallery to `NAVIGATION` |
| `src/components/features/home/SectionOverview.tsx` | Modify | Add 2 cards, switch to 4-col grid |
| `src/app/globals.css` | Modify | Add article body prose styles |

---

## Task 1: Install dependencies

**Files:** `package.json`

- [ ] **Step 1: Install the three blog packages**

```bash
cd "c:\Users\joe\Documents\GitHub\RichardM2"
npm install gray-matter react-markdown remark-gfm
```

Expected output: 3 packages added, no peer-dep warnings.

- [ ] **Step 2: Verify TypeScript types are available**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors (types ship with these packages).

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install gray-matter, react-markdown, remark-gfm"
```

---

## Task 2: Create content directory and sample article

**Files:** `content/articles/ai-data-systems-africa.md`, `content/articles/.gitkeep`

- [ ] **Step 1: Create the content directory**

```bash
mkdir -p "c:\Users\joe\Documents\GitHub\RichardM2\content\articles"
```

- [ ] **Step 2: Create a sample article**

Create `content/articles/ai-data-systems-africa.md`:

```markdown
---
title: "AI & Data Systems: Building Intelligence for African Institutions"
category: "AI, Data & Climate"
date: "2025-05-01"
excerpt: "How African institutions can harness AI and data analytics to drive decision-making, policy, and community impact."
---

## Introduction

Africa's AI transformation is not just about adopting technology — it is about building institutional capacity that can leverage data intelligently and sustainably.

The question is not whether AI will reach Africa, but whether African institutions will be ready to use it well.

## The Institutional Gap

Most AI solutions developed globally are built for contexts with robust digital infrastructure, clean data pipelines, and well-resourced teams. African institutions often operate under different constraints:

- Fragmented or incomplete datasets
- Limited technical capacity within organisations
- Short funding cycles that discourage long-term system investment
- Governance frameworks that have not yet caught up with digital realities

## What Needs to Change

Three things must happen in parallel:

1. **Build data culture** — organisations need to treat data as a strategic asset, not a byproduct of operations
2. **Invest in local talent** — AI literacy programmes that go beyond awareness to build real analytical capability
3. **Design for context** — AI systems that work with limited data, low connectivity, and local governance structures

## The Opportunity

The opportunity is significant. Predictive analytics, classification models, and decision-support tools can dramatically improve how institutions allocate resources, target services, and measure impact — if implemented thoughtfully.

The institutions that invest now in AI capability will be the ones leading their sectors in five years.
```

- [ ] **Step 3: Commit**

```bash
git add content/
git commit -m "content: add sample article for blog"
```

---

## Task 3: Create the articles utility

**Files:** `src/lib/articles.ts`

- [ ] **Step 1: Create `src/lib/articles.ts`**

```ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type ArticleMeta = {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  coverImage?: string;
};

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

export function getAllArticles(): ArticleMeta[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];

  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".md"));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(ARTICLES_DIR, filename), "utf-8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title as string,
        category: data.category as string,
        date: data.date as string,
        excerpt: data.excerpt as string,
        coverImage: data.coverImage as string | undefined,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticle(
  slug: string
): { meta: ArticleMeta; content: string } | null {
  const filepath = path.join(ARTICLES_DIR, `${slug}.md`);
  if (!fs.existsSync(filepath)) return null;

  const raw = fs.readFileSync(filepath, "utf-8");
  const { data, content } = matter(raw);

  return {
    meta: {
      slug,
      title: data.title as string,
      category: data.category as string,
      date: data.date as string,
      excerpt: data.excerpt as string,
      coverImage: data.coverImage as string | undefined,
    },
    content,
  };
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/articles.ts
git commit -m "feat: add articles filesystem utility"
```

---

## Task 4: Create ArticleCard component

**Files:** `src/components/features/blog/ArticleCard.tsx`

- [ ] **Step 1: Create `src/components/features/blog/ArticleCard.tsx`**

```tsx
import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";

const CATEGORY_COLOURS: Record<string, string> = {
  "AI, Data & Climate": "#009EDB",
  "AI Ethics & Technologies": "#FD6925",
  "Youth Leadership": "#FCC30B",
  "Community & SDGs": "#19486A",
};

type Props = { article: ArticleMeta };

export default function ArticleCard({ article }: Props) {
  const accent = CATEGORY_COLOURS[article.category] ?? "#009EDB";
  const formattedDate = new Date(article.date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link href={`/blog/${article.slug}`} className="group">
      <div
        className="flex h-full flex-col rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 transition hover:-translate-y-0.5"
        style={{ borderTop: `3px solid ${accent}` }}
      >
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.15em] text-white"
            style={{ backgroundColor: accent }}
          >
            {article.category}
          </span>
          <span className="text-xs text-slate-400">{formattedDate}</span>
        </div>
        <p className="mt-4 flex-1 text-lg font-black leading-snug text-slate-950">
          {article.title}
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-500">{article.excerpt}</p>
        <p
          className="mt-4 text-sm font-black transition group-hover:translate-x-1"
          style={{ color: accent }}
        >
          Read →
        </p>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/features/blog/ArticleCard.tsx
git commit -m "feat: add ArticleCard component"
```

---

## Task 5: Create BlogListing component

**Files:** `src/components/features/blog/BlogListing.tsx`

- [ ] **Step 1: Create `src/components/features/blog/BlogListing.tsx`**

```tsx
"use client";

import { useState } from "react";
import type { ArticleMeta } from "@/lib/articles";
import ArticleCard from "./ArticleCard";
import SectionHeading from "@/components/ui/SectionHeading";

const CATEGORIES = [
  "All",
  "AI, Data & Climate",
  "AI Ethics & Technologies",
  "Youth Leadership",
  "Community & SDGs",
] as const;

type Props = { articles: ArticleMeta[] };

export default function BlogListing({ articles }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered =
    activeCategory === "All"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  return (
    <section className="px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Writing"
          title="Ideas, research, and perspectives"
        />

        <div className="mt-10 flex flex-wrap gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2 text-sm font-black transition ${
                activeCategory === cat
                  ? "bg-slate-950 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-slate-950 hover:text-slate-950"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="mt-16 text-center text-slate-400">
            No articles in this category yet.
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/features/blog/BlogListing.tsx
git commit -m "feat: add BlogListing component with category filter"
```

---

## Task 6: Create blog listing page

**Files:** `src/app/blog/page.tsx`

- [ ] **Step 1: Create `src/app/blog/page.tsx`**

```tsx
import type { Metadata } from "next";
import { getAllArticles } from "@/lib/articles";
import BlogListing from "@/components/features/blog/BlogListing";
import SectionNav from "@/components/ui/SectionNav";

export const metadata: Metadata = {
  title: "Writing | Richard Mensah",
  description:
    "Articles on AI, Data & Climate · AI Ethics & Technologies · Youth Leadership · Community & SDGs.",
};

export default function BlogPage() {
  const articles = getAllArticles();
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <div className="flex-1">
        <BlogListing articles={articles} />
      </div>
      <SectionNav />
    </div>
  );
}
```

- [ ] **Step 2: Run dev server and verify**

```bash
npm run dev
```

Open `http://localhost:3000/blog`. Expected:
- Section heading "Writing / Ideas, research, and perspectives"
- Five filter buttons (All + four categories)
- One article card for the sample article
- Clicking "AI, Data & Climate" keeps the card; other categories show "No articles yet"

- [ ] **Step 3: Commit**

```bash
git add src/app/blog/page.tsx
git commit -m "feat: add /blog listing page"
```

---

## Task 7: Add article prose styles and create article detail page

**Files:** `src/app/globals.css`, `src/app/blog/[slug]/page.tsx`

- [ ] **Step 1: Add article body styles to `src/app/globals.css`**

Append these styles at the end of the file:

```css
/* Article body prose styles */
.article-body > * + * { margin-top: 1.25rem; }
.article-body h2 { font-size: 1.5rem; font-weight: 900; color: #020617; margin-top: 2.5rem; letter-spacing: -0.02em; }
.article-body h3 { font-size: 1.125rem; font-weight: 800; color: #020617; margin-top: 2rem; }
.article-body p { font-size: 1.0625rem; line-height: 1.875; color: #475569; }
.article-body ul, .article-body ol { padding-left: 1.5rem; color: #475569; line-height: 1.875; }
.article-body ul { list-style-type: disc; }
.article-body ol { list-style-type: decimal; }
.article-body li + li { margin-top: 0.375rem; }
.article-body blockquote { border-left: 3px solid #009EDB; padding-left: 1.25rem; color: #64748b; font-style: italic; }
.article-body code { background: #f1f5f9; border-radius: 0.25rem; padding: 0.125rem 0.375rem; font-size: 0.875rem; color: #1e293b; }
.article-body pre { background: #0f172a; color: #e2e8f0; border-radius: 1rem; padding: 1.25rem; overflow-x: auto; }
.article-body pre code { background: transparent; padding: 0; color: inherit; }
.article-body img { border-radius: 1rem; width: 100%; height: auto; }
.article-body a { color: #009EDB; text-decoration: underline; }
.article-body strong { font-weight: 800; color: #1e293b; }
```

- [ ] **Step 2: Create `src/app/blog/[slug]/page.tsx`**

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllArticles, getArticle } from "@/lib/articles";
import SectionNav from "@/components/ui/SectionNav";

type Props = { params: Promise<{ slug: string }> };

const CATEGORY_COLOURS: Record<string, string> = {
  "AI, Data & Climate": "#009EDB",
  "AI Ethics & Technologies": "#FD6925",
  "Youth Leadership": "#FCC30B",
  "Community & SDGs": "#19486A",
};

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: `${article.meta.title} | Richard Mensah`,
    description: article.meta.excerpt,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const { meta, content } = article;
  const accent = CATEGORY_COLOURS[meta.category] ?? "#009EDB";
  const formattedDate = new Date(meta.date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <article className="mx-auto w-full max-w-3xl flex-1 px-5 py-16 md:px-8 md:py-24">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.15em] text-white"
            style={{ backgroundColor: accent }}
          >
            {meta.category}
          </span>
          <span className="text-xs text-slate-400">{formattedDate}</span>
        </div>

        <h1 className="mt-6 text-4xl font-black leading-tight tracking-[-0.04em] text-slate-950 md:text-5xl">
          {meta.title}
        </h1>

        <p className="mt-4 text-lg leading-8 text-slate-500">{meta.excerpt}</p>

        {meta.coverImage && (
          <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl">
            <Image src={meta.coverImage} alt={meta.title} fill className="object-cover" />
          </div>
        )}

        <div className="article-body mt-10">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      </article>

      <SectionNav prev={{ label: "All Writing", href: "/blog" }} />
    </div>
  );
}
```

- [ ] **Step 3: Verify in dev server**

Open `http://localhost:3000/blog/ai-data-systems-africa`. Expected:
- Category badge (blue "AI, Data & Climate") + date
- Large article title
- Excerpt in slate-500
- Article body rendered with headings, paragraphs, list styles
- "← All Writing" SectionNav at bottom

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css src/app/blog/
git commit -m "feat: add /blog/[slug] article page with prose styles"
```

---

## Task 8: Create gallery data file

**Files:** `src/data/gallery.ts`, `public/gallery/.gitkeep`

- [ ] **Step 1: Create `public/gallery/.gitkeep`** (empty file to track the directory)

```bash
mkdir -p public/gallery
touch public/gallery/.gitkeep
```

- [ ] **Step 2: Create `src/data/gallery.ts`**

```ts
export type GalleryPhoto = {
  src: string;
  alt: string;
  caption?: string;
};

export const GALLERY: GalleryPhoto[] = [
  // Add entries here as you add photos to /public/gallery/
  // Example:
  // {
  //   src: "/gallery/speaking-accra.jpg",
  //   alt: "Richard Mensah speaking at the Youth Leadership Summit in Accra",
  //   caption: "Youth Leadership Summit, Accra 2024",
  // },
];
```

- [ ] **Step 3: Commit**

```bash
git add src/data/gallery.ts public/gallery/
git commit -m "feat: add gallery data file and public/gallery directory"
```

---

## Task 9: Create GalleryLightbox component

**Files:** `src/components/features/gallery/GalleryLightbox.tsx`

- [ ] **Step 1: Create `src/components/features/gallery/GalleryLightbox.tsx`**

```tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import type { GalleryPhoto } from "@/data/gallery";

type Props = { photos: GalleryPhoto[] };

export default function GalleryLightbox({ photos }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);

  const prev = useCallback(
    () => setActiveIndex((i) => (i !== null && i > 0 ? i - 1 : i)),
    []
  );

  const next = useCallback(
    () =>
      setActiveIndex((i) =>
        i !== null && i < photos.length - 1 ? i + 1 : i
      ),
    [photos.length]
  );

  useEffect(() => {
    if (activeIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeIndex, close, prev, next]);

  if (photos.length === 0) {
    return (
      <p className="py-24 text-center text-slate-400">
        Photos coming soon — check back later.
      </p>
    );
  }

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            onClick={() => setActiveIndex(i)}
            className="group relative aspect-square overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#009EDB]"
            aria-label={`Open photo: ${photo.alt}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={close}
        >
          {/* Close */}
          <button
            className="absolute right-5 top-5 z-10 rounded-full bg-white/10 p-2.5 text-white transition hover:bg-white/25"
            onClick={close}
            aria-label="Close lightbox"
          >
            ✕
          </button>

          {/* Image + caption */}
          <div
            className="flex max-w-5xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[activeIndex].src}
              alt={photos[activeIndex].alt}
              width={1200}
              height={900}
              className="max-h-[78vh] w-auto rounded-xl object-contain"
            />
            {photos[activeIndex].caption && (
              <p className="mt-3 text-center text-sm text-white/60">
                {photos[activeIndex].caption}
              </p>
            )}
          </div>

          {/* Prev */}
          {activeIndex > 0 && (
            <button
              className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-xl text-white transition hover:bg-white/25"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous photo"
            >
              ←
            </button>
          )}

          {/* Next */}
          {activeIndex < photos.length - 1 && (
            <button
              className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-xl text-white transition hover:bg-white/25"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next photo"
            >
              →
            </button>
          )}
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/features/gallery/GalleryLightbox.tsx
git commit -m "feat: add GalleryLightbox component with keyboard navigation"
```

---

## Task 10: Create gallery page

**Files:** `src/app/gallery/page.tsx`

- [ ] **Step 1: Create `src/app/gallery/page.tsx`**

```tsx
import type { Metadata } from "next";
import { GALLERY } from "@/data/gallery";
import GalleryLightbox from "@/components/features/gallery/GalleryLightbox";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionNav from "@/components/ui/SectionNav";

export const metadata: Metadata = {
  title: "Gallery | Richard Mensah",
  description:
    "Personal and professional photos from events, speaking engagements, and community work.",
};

export default function GalleryPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <div className="flex-1 px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Gallery" title="From the field" />
          <div className="mt-14">
            <GalleryLightbox photos={GALLERY} />
          </div>
        </div>
      </div>
      <SectionNav prev={{ label: "Writing", href: "/blog" }} />
    </div>
  );
}
```

- [ ] **Step 2: Verify in dev server**

Open `http://localhost:3000/gallery`. Expected:
- Section heading "Gallery / From the field"
- "Photos coming soon — check back later." (since GALLERY array is empty)
- SectionNav with "← Writing" and "Back to home"

- [ ] **Step 3: Commit**

```bash
git add src/app/gallery/page.tsx
git commit -m "feat: add /gallery page"
```

---

## Task 11: Update navigation constants

**Files:** `src/constants/index.ts`

- [ ] **Step 1: Open `src/constants/index.ts` and update the NAVIGATION array**

Find the current NAVIGATION definition (lines 3–10) and replace it:

```ts
export const NAVIGATION: NavItem[] = [
  { label: "Identity", href: "/identity" },
  { label: "SDGs", href: "/sdgs" },
  { label: "Research", href: "/research" },
  { label: "Systems", href: "/systems" },
  { label: "Leadership", href: "/leadership" },
  { label: "Collaborate", href: "/collaborate" },
  { label: "Writing", href: "/blog" },
  { label: "Gallery", href: "/gallery" },
];
```

- [ ] **Step 2: Verify dev server nav**

Open `http://localhost:3000`. On desktop (≥ lg breakpoint), confirm 8 nav links appear. On mobile, open the hamburger menu and confirm all 8 items are listed.

Confirm active highlight works: visit `/blog` — "Writing" should be highlighted in `#009EDB`.

- [ ] **Step 3: Commit**

```bash
git add src/constants/index.ts
git commit -m "feat: add Writing and Gallery to site navigation"
```

---

## Task 12: Update SectionOverview on homepage

**Files:** `src/components/features/home/SectionOverview.tsx`

- [ ] **Step 1: Open the file and make two changes**

**Change 1 — add two entries to the SECTIONS array** (after the Collaborate entry):

```ts
  {
    label: "Writing",
    href: "/blog",
    tagline: "Articles on AI, climate intelligence, ethics, and youth leadership",
    accent: "#009EDB",
  },
  {
    label: "Gallery",
    href: "/gallery",
    tagline: "Personal and professional photos from the field",
    accent: "#FCC30B",
  },
```

**Change 2 — switch the grid to 4 columns on desktop:**

Find `lg:grid-cols-3` and change it to `lg:grid-cols-4`.

The full updated `SECTIONS` array and grid className should read:

```ts
const SECTIONS = [
  {
    label: "Identity",
    href: "/identity",
    tagline: "From Ghana to the UK — grounded in development urgency",
    accent: "#009EDB",
  },
  {
    label: "SDGs",
    href: "/sdgs",
    tagline: "Six priority goals driving every project and decision",
    accent: "#19486A",
  },
  {
    label: "Research",
    href: "/research",
    tagline: "Four pillars across AI, climate, youth, and policy",
    accent: "#3F7E44",
  },
  {
    label: "Systems",
    href: "/systems",
    tagline: "Three AI system builds turning research into infrastructure",
    accent: "#FD6925",
  },
  {
    label: "Leadership",
    href: "/leadership",
    tagline: "Youth empowerment, institutions, and public intellectual work",
    accent: "#FCC30B",
  },
  {
    label: "Collaborate",
    href: "/collaborate",
    tagline: "Work with me on AI, climate, or youth systems projects",
    accent: "#A21942",
  },
  {
    label: "Writing",
    href: "/blog",
    tagline: "Articles on AI, climate intelligence, ethics, and youth leadership",
    accent: "#009EDB",
  },
  {
    label: "Gallery",
    href: "/gallery",
    tagline: "Personal and professional photos from the field",
    accent: "#FCC30B",
  },
] as const;
```

Grid div className:
```tsx
<div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
```

- [ ] **Step 2: Verify homepage**

Open `http://localhost:3000`. Scroll past the hero. Expected:
- 8 cards in a 4-column grid on desktop (2 rows of 4)
- 2-column on tablet, 1-column on mobile
- Writing card links to `/blog`, Gallery card links to `/gallery`

- [ ] **Step 3: Commit**

```bash
git add src/components/features/home/SectionOverview.tsx
git commit -m "feat: expand homepage section overview to 8 cards"
```

---

## Task 13: Final build verification

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected output includes:
```
✓ Compiled successfully
Route (app)
├ ○ /
├ ○ /blog
├ ○ /blog/[slug]      (or ● /blog/ai-data-systems-africa)
├ ○ /gallery
...all existing routes still present
```

No TypeScript errors. No build failures.

- [ ] **Step 2: Smoke-test all new routes**

```bash
npm run dev
```

| URL | What to verify |
|---|---|
| `http://localhost:3000` | 8-card section grid, Writing + Gallery cards link correctly |
| `http://localhost:3000/blog` | Sample article card, category filter works |
| `http://localhost:3000/blog/ai-data-systems-africa` | Full article renders with styled body |
| `http://localhost:3000/gallery` | "Photos coming soon" message (empty state) |
| Resize to mobile | Hamburger shows all 8 nav links |

- [ ] **Step 3: Add a real gallery photo (optional but recommended)**

Add a photo to `public/gallery/` (e.g. `Rich1.png` already exists — you can also copy it as a test):

Add to `src/data/gallery.ts`:
```ts
export const GALLERY: GalleryPhoto[] = [
  {
    src: "/Rich1.png",
    alt: "Richard Mensah — AI Researcher and Youth Leader",
    caption: "Richard Mensah",
  },
];
```

Refresh `/gallery` — the grid should show the photo. Click it — lightbox opens. Test Escape key, arrow keys, and clicking the backdrop.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: blog and gallery complete — markdown articles, category filter, lightbox"
```
