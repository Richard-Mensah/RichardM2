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
