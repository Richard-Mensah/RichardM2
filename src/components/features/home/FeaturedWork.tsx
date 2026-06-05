import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SYSTEMS } from "@/constants";

export default function FeaturedWork() {
  return (
    <section className="border-y border-line bg-surface-card">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow">Featured work</p>
            <h2 className="font-display mt-3 text-balance text-3xl font-bold tracking-[-0.035em] text-ink md:text-4xl">
              Systems built to make better decisions
            </h2>
          </div>
          <Link
            href="/projects"
            className="btn-ghost inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-black uppercase tracking-[0.14em]"
          >
            View full portfolio
            <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {SYSTEMS.map((system) => (
            <article
              key={system.title}
              className="card-lift flex flex-col rounded-2xl border border-line bg-surface p-7"
            >
              <span className="self-start rounded-full bg-accent-tint px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-accent-strong">
                {system.label}
              </span>
              <h3 className="mt-5 text-lg font-bold leading-snug text-ink">{system.title}</h3>

              <dl className="mt-5 space-y-3 text-sm leading-6">
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted">Problem</dt>
                  <dd className="mt-0.5 text-body">{system.problem}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted">Approach</dt>
                  <dd className="mt-0.5 text-body">{system.approach}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.12em] text-accent-strong">Impact</dt>
                  <dd className="mt-0.5 text-ink-soft">{system.impact}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
