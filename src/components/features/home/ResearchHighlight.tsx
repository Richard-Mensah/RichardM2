import Link from "next/link";
import { ArrowUpRight, FileText, GraduationCap } from "lucide-react";
import { PUBLICATIONS } from "@/constants";

/** Thesis + selected writing + research systems link, merged into one section. */
export default function ResearchHighlight() {
  const papers = PUBLICATIONS.slice(0, 3);

  return (
    <section className="px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow">Research & writing</p>
            <h2 className="font-display mt-3 text-balance text-3xl font-bold tracking-[-0.035em] text-ink md:text-4xl">
              Research and ideas, open for collaboration
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/research" className="btn-ghost inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-xs font-black uppercase tracking-[0.14em]">
              All research
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            <Link href="/projects" className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-xs font-black uppercase tracking-[0.14em] text-accent-strong hover:underline">
              Research systems
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          {/* Thesis feature */}
          <article className="relative overflow-hidden rounded-[2rem] bg-navy-950 p-7 text-white md:p-9">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl" aria-hidden="true" />
            <div className="relative">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent/15 text-accent-soft ring-1 ring-accent/25">
                  <GraduationCap size={20} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-accent-soft">MSc thesis</p>
                  <p className="text-xs font-semibold text-on-dark-muted">AI &amp; Data Science · Bangor University · 2026</p>
                </div>
              </div>
              <h3 className="font-display mt-6 text-balance text-xl font-bold leading-snug md:text-2xl">
                &ldquo;Predicting Vehicle CO₂ Emissions Using Machine Learning: A Feature-Based Approach to Support Consumer
                and Environmental Decision-Making.&rdquo;
              </h3>
              <p className="mt-4 text-sm leading-7 text-on-dark-muted">
                Comparing machine-learning methods to predict vehicle CO₂ emissions from their features, so consumers get
                clearer, evidence-based information for lower-emission choices. Where my data science meets my climate work.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/research/thesis" className="btn-accent inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-xs font-black uppercase tracking-[0.14em]">
                  Read the research <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
                <Link href="/about/cv" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 px-5 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:bg-white/10">
                  <FileText size={15} aria-hidden="true" /> Request CV
                </Link>
              </div>
            </div>
          </article>

          {/* Selected writing */}
          <ul className="flex flex-col gap-3">
            {papers.map((paper) => (
              <li key={paper.title}>
                <Link
                  href="/research/publications"
                  className="group flex h-full flex-col rounded-2xl border border-line bg-surface-card p-5 transition hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md"
                >
                  <span className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.12em]">
                    <span className="inline-flex items-center gap-1.5 text-accent-strong">
                      <FileText size={13} aria-hidden="true" />
                      {paper.type}
                    </span>
                    <span className="text-muted">{paper.year}</span>
                  </span>
                  <span className="mt-2 text-sm font-bold leading-snug text-ink group-hover:text-accent-strong">{paper.title}</span>
                  <span className="mt-1.5 line-clamp-2 text-xs leading-5 text-body">{paper.abstract}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
