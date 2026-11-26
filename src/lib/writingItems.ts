import { PUBLICATIONS } from "@/constants";
import type { ArticleMeta } from "@/lib/articles";

/*
 * Articles (from the database) and research papers (from constants) as one
 * list of cards. Client-safe: no filesystem or database imports.
 */

export type WritingKind = "Article" | "Working Paper" | "Essay" | "Policy Note" | string;

export type WritingItem = {
  key: string;
  href: string;
  title: string;
  kind: WritingKind;
  isArticle: boolean;
  /** Category for articles, first tag for papers. */
  topic: string;
  excerpt: string;
  /** Display date ("25 Nov 2026" or a year). */
  meta: string;
  /** For sorting, newest first. */
  sortKey: number;
  image: string;
  /** Papers only. */
  venue?: string;
  tags?: string[];
  authors?: string;
};

/** Topic images for items without a cover, most specific first (two per topic so cards rarely repeat). */
const TOPIC_IMAGES: { test: RegExp; src: string }[] = [
  { test: /climate|emission|co₂|co2|environment|resilien|adaptation/i, src: "/domains/climate-farmer.jpg" },
  { test: /climate|emission|co₂|co2|environment|resilien|adaptation/i, src: "/research/ai-climate-change-satellite.jpg" },
  { test: /\bdata\b|analytics|dashboard|systems|predict/i, src: "/domains/data-dashboard.jpg" },
  { test: /\bdata\b|analytics|dashboard|systems|predict/i, src: "/research/ai-data-science-dashboard.jpg" },
  { test: /govern|policy|ethic|responsible|institution|parliament/i, src: "/leadership/unya-parliament-house.jpg" },
  { test: /govern|policy|ethic|responsible|institution|parliament/i, src: "/research/thought-leadership-speaking.jpg" },
  { test: /youth|leader|community|mentor|education|journey/i, src: "/community/school-outreach-1.jpg" },
  { test: /youth|leader|community|mentor|education|journey/i, src: "/research/youth-development-group.jpg" },
  { test: /design|human|language|multilingual|llm|nlp/i, src: "/research/global-development-map.jpg" },
  { test: /./, src: "/domains/ai-network.jpg" },
  { test: /./, src: "/research/conference-presentations-hero.jpg" },
];

/** Picks a fitting, not-yet-used image: title matches first, then topic words, then any unused one. */
function pickImage(title: string, topic: string, used: Set<string>): string {
  const candidates = [
    ...TOPIC_IMAGES.filter((i) => i.test.test(title)),
    ...TOPIC_IMAGES.filter((i) => i.test.test(topic)),
    ...TOPIC_IMAGES,
  ].map((i) => i.src);
  const src = candidates.find((c) => !used.has(c)) ?? candidates[0];
  used.add(src);
  return src;
}

function formatDate(date: string): string {
  const d = new Date(date);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

/** next/image only optimises site paths and the Blob store; other hosts are shown as-is. */
export const isOptimisable = (src: string) =>
  src.startsWith("/") || /^https:\/\/[^/]+\.public\.blob\.vercel-storage\.com\//.test(src);

/** Articles newest first, followed by research papers. */
export function buildWritingItems(articles: ArticleMeta[], { includePapers = true } = {}): WritingItem[] {
  const used = new Set<string>(articles.flatMap((a) => (a.coverImage ? [a.coverImage] : [])));
  const fromArticles: WritingItem[] = articles.map((a) => ({
    key: `a-${a.slug}`,
    href: `/blog/${a.slug}`,
    title: a.title,
    kind: "Article",
    isArticle: true,
    topic: a.category,
    excerpt: a.excerpt,
    meta: formatDate(a.date),
    sortKey: new Date(a.date).getTime() || 0,
    image: a.coverImage || pickImage(a.title, a.category, used),
  }));
  const fromPapers: WritingItem[] = includePapers
    ? PUBLICATIONS.map((p) => ({
        key: `p-${p.title}`,
        href: `/research/publications#${paperAnchor(p.title)}`,
        title: p.title,
        kind: p.type,
        isArticle: false,
        topic: p.tags[0] ?? "",
        excerpt: p.abstract,
        meta: p.year,
        sortKey: Number(p.year) ? new Date(`${p.year}-01-01`).getTime() : 0,
        image: pickImage(p.title, p.tags.join(" "), used),
        venue: p.venue,
        tags: [...p.tags],
        authors: p.authors,
      }))
    : [];
  return [...fromArticles, ...fromPapers];
}

/** Stable in-page anchor for a paper on the writing library. */
export function paperAnchor(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

/** Items whose title or topic matches. */
export function filterWriting(items: WritingItem[], topic?: RegExp): WritingItem[] {
  return topic ? items.filter((i) => topic.test(`${i.title} ${i.topic} ${i.excerpt}`)) : items;
}
