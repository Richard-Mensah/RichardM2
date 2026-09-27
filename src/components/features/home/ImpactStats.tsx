import SectionHeading from "@/components/ui/SectionHeading";
import StatCard from "@/components/features/home/StatCard";
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
        {impactStats.map((stat, index) => (
          <StatCard key={stat.label} stat={stat} index={index} />
        ))}
      </div>
    </section>
  );
}
