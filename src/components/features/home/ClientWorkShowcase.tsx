import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import ClientWorkCard from "@/components/features/work/ClientWorkCard";
import QuestProgressChip from "@/components/features/work/QuestProgressChip";
import { clientWorkStats } from "@/data/clientWork";
import type { ClientProject } from "@/types";

/** Homepage proof-of-delivery: featured client builds with live animated screenshots. */
export default function ClientWorkShowcase({ projects }: { projects: ClientProject[] }) {
  const stats = clientWorkStats(projects);
  const featuredOnly = projects.filter((p) => p.featured);
  const featured = featuredOnly.length ? featuredOnly : projects.slice(0, 6);

  return (
    <section className="relative overflow-hidden px-5 py-20 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow">Shipped for clients</p>
            <h2 className="font-display mt-3 text-balance text-3xl font-bold tracking-[-0.035em] text-ink md:text-4xl">
              {stats.total} live websites and software products, built for people and organisations
            </h2>
            <p className="mt-4 text-base leading-7 text-body">
              A care-agency operating system, youth institutions, a global mentorship platform and portfolios that
              open international doors. Every screen below is a real, live product.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <QuestProgressChip total={stats.total} />
            <Link
              href="/work"
              className="btn-ghost inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-xs font-black uppercase tracking-[0.14em]"
            >
              See all {stats.total} builds
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>


        {/* Mobile: swipeable carousel. Desktop: grid. */}
        <div className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 lg:grid-cols-3">
          {featured.map((p, i) => (
            <ClientWorkCard
              key={p.slug}
              project={p}
              index={projects.indexOf(p)}
              showPhone={i === 0}
              className="w-[85vw] max-w-[24rem] shrink-0 snap-center md:w-auto md:max-w-none"
            />
          ))}
        </div>
        <p className="mt-2 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-muted md:hidden">
          Swipe to browse <ArrowRight size={12} aria-hidden="true" />
        </p>
      </div>
    </section>
  );
}
