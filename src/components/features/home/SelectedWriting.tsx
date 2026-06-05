import Link from "next/link";
import { FileText, ArrowUpRight } from "lucide-react";
import { PUBLICATIONS } from "@/constants";

export default function SelectedWriting() {
  const featured = PUBLICATIONS.slice(0, 3);

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <p className="eyebrow">Selected writing & working papers</p>
          <h2 className="font-display mt-3 text-balance text-3xl font-bold tracking-[-0.035em] text-ink md:text-4xl">
            Research and ideas, open for collaboration
          </h2>
        </div>
        <Link
          href="/research/publications"
          className="btn-ghost inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-black uppercase tracking-[0.14em]"
        >
          All publications
          <ArrowUpRight size={15} />
        </Link>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {featured.map((paper) => (
          <article
            key={paper.title}
            className="card-lift flex flex-col rounded-2xl border border-line bg-surface-card p-7"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-accent-strong">
                <FileText size={14} />
                {paper.type}
              </span>
              <span className="text-xs font-semibold text-muted">{paper.year}</span>
            </div>

            <h3 className="mt-4 text-base font-bold leading-snug text-ink">{paper.title}</h3>
            <p className="mt-3 flex-1 text-sm leading-6 text-body">{paper.abstract}</p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {paper.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-line bg-surface px-2.5 py-0.5 text-[11px] font-semibold text-ink-soft"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
