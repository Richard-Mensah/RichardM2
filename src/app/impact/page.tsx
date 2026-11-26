import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/ui/page/PageHero";
import AreaTiles from "@/components/ui/page/AreaTiles";
import SectionNav from "@/components/ui/SectionNav";
import ImpactStats from "@/components/features/home/ImpactStats";
import LeadershipNav from "@/components/features/leadership/LeadershipNav";
import { getImpactStats } from "@/lib/impactStats";
import { LEADERSHIP_PAGES, leadershipNeighbours, leadershipPage } from "@/data/leadershipPages";

export const metadata: Metadata = {
  title: "Impact | Richard Mensah",
  description:
    "The measurable reach of Richard Mensah's mentorship, training and community work: study-abroad journeys, scholarships, youth leaders and communities, and the programmes behind them.",
};

export const revalidate = 3600;

const PAGE = leadershipPage("/impact");

export default async function ImpactPage() {
  const impactStats = await getImpactStats();
  const sources = LEADERSHIP_PAGES.filter((p) => p.isProgramme && p.href !== PAGE.href);

  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <PageHero
        eyebrow={PAGE.eyebrow}
        title={PAGE.title}
        lede={PAGE.lede}
        image={PAGE.image}
        imageAlt={PAGE.imageAlt}
        focus={PAGE.focus}
        crumbs={[{ label: "Leadership", href: "/leadership" }, { label: "Impact" }]}
      >
        <Link href="/sdgs" className="btn-accent inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-xs font-black uppercase tracking-[0.14em]">
          SDG alignment <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </PageHero>
      <LeadershipNav />

      <ImpactStats impactStats={impactStats} />

      <section aria-labelledby="sources-heading" className="px-5 pb-16 md:px-8 md:pb-20">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">Behind the numbers</p>
          <h2 id="sources-heading" className="font-display mt-2 text-3xl font-bold tracking-[-0.035em] text-ink md:text-4xl">
            The programmes that produced them
          </h2>
          <div className="mt-8">
            <AreaTiles tiles={sources} />
          </div>
        </div>
      </section>

      <SectionNav {...leadershipNeighbours(PAGE.href)} />
    </div>
  );
}
