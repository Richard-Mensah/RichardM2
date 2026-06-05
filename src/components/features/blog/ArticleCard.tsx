import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";

const CATEGORY_COLOURS: Record<string, string> = {
  "AI, Data & Climate": "#4f8bff",
  "AI Ethics & Technologies": "#4f8bff",
  "Youth Leadership": "#4f8bff",
  "Community & SDGs": "#19486A",
};

type Props = { article: ArticleMeta };

export default function ArticleCard({ article }: Props) {
  const accent = CATEGORY_COLOURS[article.category] ?? "#4f8bff";
  const formattedDate = new Date(article.date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link href={`/blog/${article.slug}`} className="group">
      <div
        className="flex h-full flex-col glass rounded-[2rem] p-6 shadow-xl shadow-slate-200/70 transition hover:-translate-y-0.5"
        style={{ borderTop: `3px solid ${accent}` }}
      >
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.15em] text-white"
            style={{ backgroundColor: accent }}
          >
            {article.category}
          </span>
          <span className="text-xs text-muted">{formattedDate}</span>
        </div>
        <p className="mt-4 flex-1 text-lg font-black leading-snug text-ink">
          {article.title}
        </p>
        <p className="mt-2 text-sm leading-6 text-body">{article.excerpt}</p>
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
