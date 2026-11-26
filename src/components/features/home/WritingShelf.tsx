import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, PenLine } from "lucide-react";
import { PUBLICATIONS } from "@/constants";
import type { ArticleMeta } from "@/lib/articles";

type ShelfItem = {
  key: string;
  href: string;
  title: string;
  kind: "Article" | string;
  meta: string;
  image: string;
  isArticle: boolean;
};

const MAX_ITEMS = 5;

/** Topic images for items without a cover, most specific first. */
const TOPIC_IMAGES: { test: RegExp; src: string }[] = [
  { test: /climate|emission|co₂|co2|environment|resilien|adaptation/, src: "/domains/climate-farmer.jpg" },
  { test: /\bdata\b|analytics|dashboard|systems/, src: "/domains/data-dashboard.jpg" },
  { test: /govern|policy|ethic|responsible|institution|parliament/, src: "/leadership/unya-parliament-house.jpg" },
  { test: /youth|leader|community|mentor|education|journey/, src: "/community/school-outreach-1.jpg" },
  { test: /./, src: "/domains/ai-network.jpg" },
];

/** Picks a fitting, not-yet-used image: title matches first, then topic tags, then any unused one. */
function pickImage(title: string, topic: string, used: Set<string>): string {
  const t = title.toLowerCase();
  const k = topic.toLowerCase();
  const candidates = [
    ...TOPIC_IMAGES.filter((i) => i.test.test(t)),
    ...TOPIC_IMAGES.filter((i) => i.test.test(k)),
    ...TOPIC_IMAGES,
  ].map((i) => i.src);
  const src = candidates.find((c) => !used.has(c)) ?? candidates[0];
  used.add(src);
  return src;
}

const isOptimisable = (src: string) => src.startsWith("/") || /^https:\/\/[^/]+\.public\.blob\.vercel-storage\.com\//.test(src);

function formatDate(date: string): string {
  const d = new Date(date);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

/**
 * "Latest writing": a broadcaster-style shelf of image cards on a softly lit
 * background. Newest blog articles first, topped up with research papers.
 */
export default function WritingShelf({ articles }: { articles: ArticleMeta[] }) {
  const used = new Set<string>(articles.flatMap((a) => (a.coverImage ? [a.coverImage] : [])));
  const items: ShelfItem[] = [
    ...articles.map((a) => ({
      key: `a-${a.slug}`,
      href: `/blog/${a.slug}`,
      title: a.title,
      kind: "Article",
      meta: formatDate(a.date),
      image: a.coverImage || pickImage(a.title, a.category, used),
      isArticle: true,
    })),
    ...PUBLICATIONS.map((p) => ({
      key: `p-${p.title}`,
      href: "/research/publications",
      title: p.title,
      kind: p.type,
      meta: p.year,
      image: pickImage(p.title, p.tags.join(" "), used),
      isArticle: false,
    })),
  ].slice(0, MAX_ITEMS);

  if (!items.length) return null;

  return (
    <section aria-labelledby="writing-heading" className="writing-shelf relative isolate overflow-hidden py-14 md:py-16">
      {/* Soft bokeh light, drawn in CSS (no image to load) */}
      <div className="writing-shelf__bokeh pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="writing-heading" className="font-display text-2xl font-bold tracking-[-0.03em] text-white md:text-3xl">
              Latest writing
            </h2>
            <p className="mt-1.5 text-sm font-medium text-white/80 md:text-base">
              Ideas on AI, climate and youth leadership, from articles to working papers
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 text-xs font-black uppercase tracking-[0.14em] text-white backdrop-blur transition hover:bg-white/20"
          >
            All writing <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Cards: swipeable row on phones, a tidy grid from large screens */}
      <ul
        className="no-scrollbar mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 md:scroll-px-8 md:px-8 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-5 lg:overflow-visible lg:pb-0"
        aria-label="Latest articles and papers"
      >
        {items.map((item) => (
          <li key={item.key} className="w-[78%] shrink-0 snap-start sm:w-[45%] md:w-[31%] lg:w-auto">
            <Link
              href={item.href}
              className="group flex h-full flex-col overflow-hidden rounded-md bg-white shadow-[0_18px_40px_-24px_rgba(10,26,48,0.75)] outline-offset-4 transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_50px_-24px_rgba(10,26,48,0.9)]"
            >
              <span className="relative block aspect-[16/9] overflow-hidden bg-navy-900">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 18vw, (min-width: 768px) 31vw, 78vw"
                  unoptimized={!isOptimisable(item.image)}
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </span>
              <span className="flex flex-1 flex-col p-4">
                <span className="font-display line-clamp-4 text-[1.05rem] font-bold leading-snug text-ink group-hover:text-accent-strong">
                  {item.title}
                </span>
                <span className="mt-auto flex items-center gap-1.5 pt-5 text-xs font-semibold text-muted">
                  {item.isArticle ? (
                    <PenLine size={13} className="text-accent-strong" aria-hidden="true" />
                  ) : (
                    <FileText size={13} className="text-accent-strong" aria-hidden="true" />
                  )}
                  <span className="text-ink-soft">{item.kind}</span>
                  {item.meta ? <span aria-hidden="true">·</span> : null}
                  {item.meta ? <span>{item.meta}</span> : null}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
