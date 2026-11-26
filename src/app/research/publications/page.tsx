import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Info, Lightbulb, PenLine } from "lucide-react";
import PageHero from "@/components/ui/page/PageHero";
import SectionNav from "@/components/ui/SectionNav";
import ResearchNav from "@/components/features/research/ResearchNav";
import WritingLibrary from "@/components/features/research/WritingLibrary";
import { WRITING_IDEAS } from "@/constants";
import { getAllArticles } from "@/lib/articles";
import { buildWritingItems } from "@/lib/writingItems";
import { researchNeighbours, researchPage } from "@/data/researchPages";

export const dynamic = "force-dynamic";

const PAGE = researchPage("/research/publications");

export const metadata: Metadata = {
  title: "Writing & Working Papers | Richard Mensah",
  description:
    "Articles, essays, working papers and policy notes by Richard Mensah on AI, climate change and sustainable development in the Global South.",
};

const AGENDA = [
  "NLP for low-resource African languages: bridging the digital language divide",
  "Climate signal translation: turning satellite data into community-readable risk narratives",
  "Human-centred AI design: building systems that work across literacy levels and device constraints",
  "Institutional AI readiness: what governance and accountability look like in the Global South",
];

export default async function PublicationsPage() {
  const items = buildWritingItems(await getAllArticles());

  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <PageHero
        eyebrow={PAGE.eyebrow}
        title={PAGE.title}
        lede={PAGE.lede}
        image={PAGE.image}
        imageAlt={PAGE.imageAlt}
        focus={PAGE.focus}
        crumbs={[{ label: "Research", href: "/research" }, { label: "Writing & papers" }]}
      >
        <Link href="/blog" className="btn-accent inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-xs font-black uppercase tracking-[0.14em]">
          <PenLine size={15} aria-hidden="true" /> Read the blog
        </Link>
        <Link
          href="/research/collaborations"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/30 px-5 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:bg-white/10"
        >
          Collaborate
        </Link>
      </PageHero>
      <ResearchNav />

      <section className="px-5 py-14 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-start gap-3 rounded-2xl border border-amber-300/60 bg-amber-50 p-4 text-sm leading-6 text-amber-900 md:max-w-3xl">
            <Info size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
            <p>
              <span className="font-bold">A note on status:</span> the papers are independent, self-published works and
              working drafts, not peer-reviewed journal publications. Several are open for collaboration and review.
            </p>
          </div>

          <div className="mt-10">
            <WritingLibrary items={items} />
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-8 md:pb-20">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-navy-950 p-7 text-white md:p-8">
            <p className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.24em] text-accent-soft">
              <Lightbulb size={15} aria-hidden="true" /> Research agenda
            </p>
            <h2 className="font-display mt-3 text-2xl font-bold">Questions the work is pursuing next</h2>
            <ol className="mt-6 space-y-4">
              {AGENDA.map((item, i) => (
                <li key={item} className="flex gap-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-sm font-black text-accent-soft">{i + 1}</span>
                  <span className="text-sm leading-6 text-white/85">{item}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-2xl border border-line bg-surface-card p-7 md:p-8">
            <p className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.24em] text-accent-strong">
              <PenLine size={15} aria-hidden="true" /> In progress
            </p>
            <h2 className="font-display mt-3 text-2xl font-bold text-ink">Essays currently being written</h2>
            <ul className="mt-6 space-y-3">
              {WRITING_IDEAS.map((idea) => (
                <li key={idea} className="flex items-start gap-3 rounded-xl bg-navy-950/[0.03] p-4">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  <span className="text-sm font-semibold leading-6 text-ink">{idea}</span>
                </li>
              ))}
            </ul>
            <Link href="/contact" className="mt-6 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.14em] text-accent-strong hover:gap-2.5">
              Suggest a topic or co-write <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <SectionNav {...researchNeighbours(PAGE.href)} />
    </div>
  );
}
