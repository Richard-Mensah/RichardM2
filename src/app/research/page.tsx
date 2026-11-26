import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen, GraduationCap } from "lucide-react";
import PageHero from "@/components/ui/page/PageHero";
import SectionNav from "@/components/ui/SectionNav";
import ResearchNav from "@/components/features/research/ResearchNav";
import ResearchAreas from "@/components/features/research/ResearchAreas";
import ResearchHighlight from "@/components/features/home/ResearchHighlight";
import WritingShelf from "@/components/features/home/WritingShelf";
import { PUBLICATIONS } from "@/constants";
import { getAllArticles } from "@/lib/articles";
import { RESEARCH_HUB, researchNeighbours, researchPage } from "@/data/researchPages";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Research | Richard Mensah",
  description:
    "Richard Mensah's research hub: AI and data science, climate intelligence, global development, youth development and responsible AI, with his MSc thesis and writing.",
};

const ENGAGE = ["/research/conference-presentations", "/research/collaborations", "/research/publications"].map(researchPage);

export default async function ResearchPage() {
  const articles = await getAllArticles();
  const facts = [
    { value: PUBLICATIONS.length, label: "working papers & notes" },
    { value: articles.length, label: articles.length === 1 ? "article" : "articles" },
    { value: 1, label: "MSc thesis" },
  ];

  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <PageHero
        eyebrow={RESEARCH_HUB.eyebrow}
        title={RESEARCH_HUB.title}
        lede={RESEARCH_HUB.lede}
        image={RESEARCH_HUB.image}
        imageAlt={RESEARCH_HUB.imageAlt}
        focus={RESEARCH_HUB.focus}
      >
        <Link href="/research/publications" className="btn-accent inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-xs font-black uppercase tracking-[0.14em]">
          <BookOpen size={15} aria-hidden="true" /> Writing library
        </Link>
        <Link
          href="/research/thesis"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/30 px-5 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:bg-white/10"
        >
          <GraduationCap size={15} aria-hidden="true" /> MSc thesis
        </Link>
        <ul className="flex w-full flex-wrap gap-x-6 gap-y-2 pt-3 text-sm text-white/80" aria-label="Research in numbers">
          {facts.map((f) => (
            <li key={f.label}>
              <span className="font-display mr-1.5 text-2xl font-bold text-white">{f.value}</span>
              {f.label}
            </li>
          ))}
        </ul>
      </PageHero>
      <ResearchNav />

      <ResearchAreas />
      <ResearchHighlight heading={false} />
      <WritingShelf articles={articles} />

      <section aria-labelledby="engage-heading" className="px-5 py-14 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">Engage</p>
          <h2 id="engage-heading" className="font-display mt-3 text-3xl font-bold tracking-[-0.035em] text-ink md:text-4xl">
            Talks, partnerships and the full library
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {ENGAGE.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface-card transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <span className="relative block aspect-[16/9] overflow-hidden">
                    <Image src={p.image} alt="" fill sizes="(min-width: 768px) 30vw, 92vw" className="object-cover transition duration-700 group-hover:scale-105" style={{ objectPosition: p.focus ?? "center" }} />
                  </span>
                  <span className="flex flex-1 flex-col p-5">
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-accent-strong">{p.eyebrow}</span>
                    <span className="font-display mt-2 text-lg font-bold leading-snug text-ink">{p.title}</span>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-xs font-black uppercase tracking-[0.14em] text-accent-strong">
                      Open <ArrowUpRight size={14} aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SectionNav {...researchNeighbours(RESEARCH_HUB.href)} />
    </div>
  );
}
