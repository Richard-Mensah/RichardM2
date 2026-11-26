import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { eq } from "drizzle-orm";
import { db, pool } from "@/db";
import { articles, type ArticleRow } from "@/db/schema";
import { getSettingStrict, setSetting } from "@/lib/siteSettings";

/*
 * Blog articles live in Postgres so posts written in Admin → Articles appear
 * straight away and survive redeploys (the server filesystem is replaced on
 * every deploy). Markdown files in content/articles are imported once each,
 * so committed posts still work and admin deletions stick. When the database
 * is unavailable the public blog falls back to those files.
 */

export type ArticleMeta = {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  coverImage?: string;
};

export type Article = { meta: ArticleMeta; content: string };

export type ArticleInput = {
  title: string;
  category: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  date?: string;
};

export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");
const IMPORTED_KEY = "articles_imported_files";

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 200);
}

/**
 * Keeps a cover image loadable: unwraps a pasted Next.js optimiser URL
 * (/_next/image?url=…) to the original path, and only allows site paths or https.
 */
export function normaliseCover(value: unknown): string {
  let v = typeof value === "string" ? value.trim() : "";
  const wrapped = v.match(/\/_next\/image\?(?:.*&)?url=([^&]+)/);
  if (wrapped) v = decodeURIComponent(wrapped[1]);
  if (v.startsWith("/") && !v.startsWith("//")) return v.slice(0, 1000);
  if (v.startsWith("https://")) return v.slice(0, 1000);
  return "";
}

const byNewest = (a: ArticleMeta, b: ArticleMeta) =>
  new Date(b.date).getTime() - new Date(a.date).getTime() || a.title.localeCompare(b.title);

let fileCache: Article[] | null = null;

/** Markdown articles shipped with the code (read once per process). */
function fileArticles(): Article[] {
  if (fileCache) return fileCache;
  if (!fs.existsSync(ARTICLES_DIR)) return (fileCache = []);
  fileCache = fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const { data, content } = matter(fs.readFileSync(path.join(ARTICLES_DIR, filename), "utf-8"));
      return {
        meta: {
          slug: filename.replace(/\.md$/, ""),
          title: String(data.title ?? ""),
          category: String(data.category ?? ""),
          date: String(data.date ?? ""),
          excerpt: String(data.excerpt ?? ""),
          coverImage: normaliseCover(data.coverImage) || undefined,
        },
        content,
      };
    });
  return fileCache;
}

function toArticle(row: ArticleRow): Article {
  return {
    meta: {
      slug: row.slug,
      title: row.title,
      category: row.category,
      date: row.date,
      excerpt: row.excerpt,
      coverImage: row.coverImage || undefined,
    },
    content: row.content,
  };
}

let tableReady = false;
async function ensureTable(): Promise<void> {
  if (tableReady) return;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS articles (
      slug varchar(200) PRIMARY KEY,
      title varchar(300) NOT NULL,
      category varchar(120) NOT NULL,
      date varchar(10) NOT NULL,
      excerpt text NOT NULL DEFAULT '',
      cover_image text,
      content text NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now()
    );
  `);
  tableReady = true;
}

/** Imports each Markdown file once (tracked by slug, so deleting a post in admin keeps it deleted). */
async function importFiles(): Promise<void> {
  const imported = await getSettingStrict<string[]>(IMPORTED_KEY, []);
  const pending = fileArticles().filter((a) => !imported.includes(a.meta.slug));
  if (!pending.length) return;
  for (const a of pending) {
    await db
      .insert(articles)
      .values({
        slug: a.meta.slug,
        title: a.meta.title,
        category: a.meta.category,
        date: a.meta.date,
        excerpt: a.meta.excerpt,
        coverImage: a.meta.coverImage ?? null,
        content: a.content,
      })
      .onConflictDoNothing();
  }
  await setSetting(IMPORTED_KEY, [...imported, ...pending.map((a) => a.meta.slug)]);
}

async function ready(): Promise<void> {
  await ensureTable();
  await importFiles();
}

export async function getAllArticles(): Promise<ArticleMeta[]> {
  try {
    await ready();
    const rows = await db.select().from(articles);
    return rows.map((r) => toArticle(r).meta).sort(byNewest);
  } catch (error) {
    console.error("Failed to read articles, using bundled files", error);
    return fileArticles().map((a) => a.meta).sort(byNewest);
  }
}

export async function getArticle(slug: string): Promise<Article | null> {
  if (!SLUG_PATTERN.test(slug)) return null;
  try {
    await ready();
    const [row] = await db.select().from(articles).where(eq(articles.slug, slug)).limit(1);
    return row ? toArticle(row) : null;
  } catch (error) {
    console.error(`Failed to read article "${slug}", using bundled files`, error);
    return fileArticles().find((a) => a.meta.slug === slug) ?? null;
  }
}

type WriteResult = { ok: true; slug: string } | { ok: false; status: number; message: string };

function clean(input: ArticleInput) {
  return {
    title: input.title.trim().slice(0, 300),
    category: input.category.trim().slice(0, 120),
    excerpt: input.excerpt.trim(),
    content: input.content,
    coverImage: normaliseCover(input.coverImage) || null,
  };
}

export async function createArticle(input: ArticleInput): Promise<WriteResult> {
  const slug = slugify(input.title);
  if (!slug) return { ok: false, status: 400, message: "Title must contain letters or numbers." };
  await ready();
  const inserted = await db
    .insert(articles)
    .values({ slug, date: new Date().toISOString().slice(0, 10), ...clean(input) })
    .onConflictDoNothing()
    .returning({ slug: articles.slug });
  if (!inserted.length) {
    return { ok: false, status: 409, message: `An article with slug "${slug}" already exists.` };
  }
  return { ok: true, slug };
}

export async function updateArticle(slug: string, input: ArticleInput): Promise<boolean> {
  if (!SLUG_PATTERN.test(slug)) return false;
  await ready();
  const date = input.date && /^\d{4}-\d{2}-\d{2}$/.test(input.date) ? input.date : undefined;
  const updated = await db
    .update(articles)
    .set({ ...clean(input), ...(date ? { date } : {}), updatedAt: new Date() })
    .where(eq(articles.slug, slug))
    .returning({ slug: articles.slug });
  return updated.length > 0;
}

export async function deleteArticle(slug: string): Promise<boolean> {
  if (!SLUG_PATTERN.test(slug)) return false;
  await ready();
  const deleted = await db.delete(articles).where(eq(articles.slug, slug)).returning({ slug: articles.slug });
  return deleted.length > 0;
}
