import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MediaCard from "@/components/ui/MediaCard";
import type { ArticleMeta } from "@/lib/articles";
import { buildWritingItems, filterWriting } from "@/lib/writingItems";

type Props = {
  articles: ArticleMeta[];
  title?: string;
  subtitle?: string;
  /** Only show articles and papers matching this (title, topic or summary). */
  topic?: RegExp;
  limit?: number;
  /** Link shown top-right. */
  more?: { label: string; href: string };
};

/**
 * A broadcaster-style shelf of image cards on warm bokeh light: newest
 * articles first, topped up with research papers. Swipeable on phones.
 */
export default function WritingShelf({
  articles,
  title = "Latest writing",
  subtitle = "Ideas on AI, climate and youth leadership, from articles to working papers",
  topic,
  limit = 5,
  more = { label: "All writing", href: "/research/publications" },
}: Props) {
  const all = buildWritingItems(articles);
  const matched = filterWriting(all, topic);
  // Top up with other writing so the shelf never looks empty.
  const items = [...matched, ...all.filter((i) => !matched.includes(i))].slice(0, limit);
  if (!items.length) return null;

  const headingId = `shelf-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <section aria-labelledby={headingId} className="writing-shelf relative isolate overflow-hidden py-14 md:py-16">
      {/* Soft bokeh light, drawn in CSS (no image to load) */}
      <div className="writing-shelf__bokeh pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id={headingId} className="font-display text-2xl font-bold tracking-[-0.03em] text-white md:text-3xl">
              {title}
            </h2>
            <p className="mt-1.5 text-sm font-medium text-white/80 md:text-base">{subtitle}</p>
          </div>
          <Link
            href={more.href}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 text-xs font-black uppercase tracking-[0.14em] text-white backdrop-blur transition hover:bg-white/20"
          >
            {more.label} <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <ul
        className="no-scrollbar mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 md:scroll-px-8 md:px-8 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-5 lg:overflow-visible lg:pb-0"
        aria-label={title}
        style={{ gridTemplateColumns: `repeat(${Math.max(items.length, 3)}, minmax(0, 1fr))` }}
      >
        {items.map((item) => (
          <li key={item.key} className="w-[78%] shrink-0 snap-start sm:w-[45%] md:w-[31%] lg:w-auto">
            <MediaCard item={item} sizes="(min-width: 1024px) 18vw, (min-width: 768px) 31vw, 78vw" />
          </li>
        ))}
      </ul>
    </section>
  );
}
