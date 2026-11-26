import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionNav from "@/components/ui/SectionNav";
import AreaTiles from "@/components/ui/page/AreaTiles";
import AboutNav from "@/components/features/about/AboutNav";
import { ABOUT_HUB, ABOUT_PAGES, aboutNeighbours } from "@/data/aboutPages";
import { getImpactStats } from "@/lib/impactStats";
import CountUp from "@/components/ui/CountUp";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Richard Mensah | AI Researcher, Youth Leader, SDG Advocate",
  description:
    "Learn about Richard Mensah, an AI and Data Scientist, youth leader, and SDG advocate whose work bridges data intelligence, climate action, and youth empowerment across the Global South and beyond.",
};

export default async function AboutPage() {
  const QUICK_STATS = await getImpactStats();

  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy-950 pt-10 pb-0 md:pt-16">
        <div className="mx-auto grid max-w-7xl items-end gap-10 px-5 md:px-8 lg:grid-cols-2">
          <div className="pb-12 md:pb-16">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-accent-soft">About Richard</p>
            <h1 className="font-display mt-4 text-balance text-4xl font-black leading-[0.95] tracking-[-0.04em] text-white md:text-6xl">
              From Ghana to the world, one impact system at a time.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-on-dark-muted">
              Richard Mensah is an AI and Data Scientist, youth leader, and sustainable development
              advocate whose work bridges data intelligence, climate action, and youth empowerment
              across the Global South and beyond.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/about/biography" className="btn-primary">
                Read Biography
              </Link>
              <a
                href="mailto:rmensahuk@gmail.com?subject=CV Request - Richard Mensah"
                className="rounded-full border border-white/25 px-6 py-3 text-sm font-black uppercase tracking-[0.15em] text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                Request CV
              </a>
            </div>
          </div>

          <div className="relative mx-auto h-[460px] w-full max-w-sm overflow-hidden rounded-t-[2rem] shadow-2xl shadow-black/60 lg:mx-0">
            <Image
              src="/Rich1.png"
              alt="Richard Mensah, AI and Data Scientist, Youth Leader"
              fill
              className="object-cover object-top"
              priority
              sizes="(min-width: 1024px) 40vw, 90vw"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/60 to-transparent p-5">
              <p className="font-black text-white">Richard Mensah</p>
              <p className="text-sm text-on-dark-muted">AI &amp; Data Scientist · Youth Leader · SDG Advocate</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick stats bar ───────────────────────────────────────── */}
      <section className="bg-navy-900 px-5 py-7 md:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {QUICK_STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-black text-white md:text-3xl"><CountUp value={stat.value} /></p>
              <p className="mt-1 text-xs font-semibold text-white/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
      <AboutNav />

      {/* ── Hub cards ─────────────────────────────────────────────── */}
      <section className="bg-transparent px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-accent-strong">Explore</p>
          <h2 className="font-display mt-3 text-balance text-3xl font-black tracking-[-0.04em] text-ink md:text-4xl">
            Everything about Richard in one place.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-body">
            Select a section to explore the full story, from personal biography and grassroots
            community work to international conferences, media, and the full CV.
          </p>

          <div className="mt-12">
            <AreaTiles tiles={ABOUT_PAGES} />
          </div>
        </div>
      </section>

      <SectionNav {...aboutNeighbours(ABOUT_HUB.href)} />
    </div>
  );
}
