import type { Metadata } from "next";
import SectionNav from "@/components/ui/SectionNav";
import PageHero from "@/components/ui/page/PageHero";
import ResearchNav from "@/components/features/research/ResearchNav";
import WritingShelf from "@/components/features/home/WritingShelf";
import ThoughtLeadershipPageSection from "@/components/features/research/ThoughtLeadershipPageSection";
import { getAllArticles } from "@/lib/articles";
import { researchNeighbours, researchPage } from "@/data/researchPages";

export const dynamic = "force-dynamic";

const PAGE = researchPage("/research/thought-leadership");

export const metadata: Metadata = {
  title: "Thought Leadership | Richard Mensah",
  description:
    "Richard Mensah's frameworks and perspectives on AI in society, governance, the Global South, and how intelligent systems can serve communities rather than exclude them.",
};

export default async function ThoughtLeadershipPage() {
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
        <ThoughtLeadershipPageSection />
      </div>
      <WritingShelf
        articles={articles}
        topic={PAGE.topic}
        title="Related writing"
        subtitle="Essays and notes on AI governance, ethics and society"
      />
      <SectionNav {...researchNeighbours(PAGE.href)} />
    </div>
  );
}
