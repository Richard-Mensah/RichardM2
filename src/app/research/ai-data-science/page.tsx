import type { Metadata } from "next";
import SectionNav from "@/components/ui/SectionNav";
import PageHero from "@/components/ui/page/PageHero";
import ResearchNav from "@/components/features/research/ResearchNav";
import WritingShelf from "@/components/features/home/WritingShelf";
import AiDataSciencePageSection from "@/components/features/research/AiDataSciencePageSection";
import { getAllArticles } from "@/lib/articles";
import { researchNeighbours, researchPage } from "@/data/researchPages";

export const dynamic = "force-dynamic";

const PAGE = researchPage("/research/ai-data-science");

export const metadata: Metadata = {
  title: "AI & Data Science | Richard Mensah",
  description:
    "Richard Mensah's applied AI and data science research: machine learning, NLP, predictive modeling, and decision intelligence for real-world contexts.",
};

export default async function AiDataSciencePage() {
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
        <AiDataSciencePageSection />
      </div>
      <WritingShelf
        articles={articles}
        topic={PAGE.topic}
        title="Related writing"
        subtitle="Articles and papers on applied AI, data and decision intelligence"
      />
      <SectionNav {...researchNeighbours(PAGE.href)} />
    </div>
  );
}
