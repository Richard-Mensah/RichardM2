import type { Metadata } from "next";
import SectionNav from "@/components/ui/SectionNav";
import PageHero from "@/components/ui/page/PageHero";
import ResearchNav from "@/components/features/research/ResearchNav";
import WritingShelf from "@/components/features/home/WritingShelf";
import AiClimateChangePageSection from "@/components/features/research/AiClimateChangePageSection";
import { getAllArticles } from "@/lib/articles";
import { researchNeighbours, researchPage } from "@/data/researchPages";

export const dynamic = "force-dynamic";

const PAGE = researchPage("/research/ai-climate-change");

export const metadata: Metadata = {
  title: "AI & Climate Change | Richard Mensah",
  description:
    "Richard Mensah's climate AI research: translating satellite-derived climate signals into community-readable risk narratives for adaptation planning in Sub-Saharan Africa.",
};

export default async function AiClimateChangePage() {
  const articles = await getAllArticles();
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <PageHero
        eyebrow={PAGE.eyebrow}
        title={PAGE.title}
        lede={PAGE.lede}
        image={PAGE.image}
        imageAlt={PAGE.imageAlt}
        focus={PAGE.focus}
        tag={PAGE.sdg}
        crumbs={[{ label: "Research", href: "/research" }, { label: PAGE.eyebrow }]}
      />
      <ResearchNav />
      <div className="flex-1">
        <AiClimateChangePageSection />
      </div>
      <WritingShelf
        articles={articles}
        topic={PAGE.topic}
        title="Related writing"
        subtitle="Articles and papers on climate intelligence and adaptation"
      />
      <SectionNav {...researchNeighbours(PAGE.href)} />
    </div>
  );
}
