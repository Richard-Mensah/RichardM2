import SectionHeading from "@/components/ui/SectionHeading";
import type { ImpactStat } from "@/lib/impactStats";

export default function ImpactStats({ impactStats }: { impactStats: ImpactStat[] }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
      <SectionHeading eyebrow="Impact in numbers" title="A decade of work, measured">
        <p>
          Figures drawn from programme records across Ghana and beyond, indicative of the reach of
          ten years of mentorship, training, and community work, now being formalised into a fuller
          monitoring record.
        </p>
      </SectionHeading>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {impactStats.map((stat) => (
          <div
            key={stat.label}
            className="card-lift rounded-2xl border border-line bg-surface-card p-6"
          >
            <p className="font-display text-4xl font-semibold text-navy-900 md:text-5xl">
              {stat.value}
            </p>
            <p className="mt-3 text-sm font-bold uppercase tracking-[0.1em] text-ink">
              {stat.label}
            </p>
            {stat.detail && <p className="mt-2 text-sm leading-6 text-body">{stat.detail}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
