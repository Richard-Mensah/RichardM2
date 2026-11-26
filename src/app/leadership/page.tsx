import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import PageHero from "@/components/ui/page/PageHero";
import AreaTiles from "@/components/ui/page/AreaTiles";
import SectionNav from "@/components/ui/SectionNav";
import LeadershipNav from "@/components/features/leadership/LeadershipNav";
import LeadershipSection from "@/components/features/leadership/LeadershipSection";
import { LEADERSHIP_HUB, LEADERSHIP_PAGES, leadershipNeighbours } from "@/data/leadershipPages";

export const metadata: Metadata = {
  title: "Leadership | Richard Mensah",
  description:
    "Richard Mensah's leadership story, from founding the Sefwi Bekwai Youth Movement and Youth Parliament to building EGA Mentorship International with partners across Serbia, USA, Zambia, and Liberia.",
};

export default function LeadershipPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <PageHero
        eyebrow={LEADERSHIP_HUB.eyebrow}
        title={LEADERSHIP_HUB.title}
        lede={LEADERSHIP_HUB.lede}
        image={LEADERSHIP_HUB.image}
        imageAlt={LEADERSHIP_HUB.imageAlt}
        focus={LEADERSHIP_HUB.focus}
      >
        <Link href="/leadership/ega" className="btn-accent inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-xs font-black uppercase tracking-[0.14em]">
          EGA Mentorship <ArrowRight size={15} aria-hidden="true" />
        </Link>
        <Link
          href="/leadership/journey"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/30 px-5 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:bg-white/10"
        >
          <FileText size={15} aria-hidden="true" /> Leadership record
        </Link>
      </PageHero>
      <LeadershipNav />

      <section aria-labelledby="chapters-heading" className="px-5 py-14 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">The chapters</p>
          <h2 id="chapters-heading" className="font-display mt-2 text-3xl font-bold tracking-[-0.035em] text-ink md:text-4xl">
            Grassroots, institutions and global reach
          </h2>
          <div className="mt-8">
            <AreaTiles tiles={LEADERSHIP_PAGES.filter((p) => p.isProgramme)} />
          </div>
        </div>
      </section>

      <LeadershipSection />

      <section className="px-5 pb-16 md:px-8">
        <Link
          href="/leadership/journey"
          className="group mx-auto flex max-w-7xl flex-col gap-3 rounded-2xl bg-navy-950 p-6 text-white transition hover:shadow-xl sm:flex-row sm:items-center sm:justify-between md:p-8"
        >
          <span className="flex items-start gap-3">
            <FileText size={22} className="mt-0.5 text-accent-soft" aria-hidden="true" />
            <span>
              <span className="font-display block text-xl font-bold">The full leadership record</span>
              <span className="text-sm text-on-dark-muted">Every role and programme on one printable page, ready to save as PDF.</span>
            </span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.14em] text-accent-soft group-hover:gap-2.5">
            Open the record <ArrowRight size={14} aria-hidden="true" />
          </span>
        </Link>
      </section>

      <SectionNav {...leadershipNeighbours(LEADERSHIP_HUB.href)} />
    </div>
  );
}
