import type { Metadata } from "next";
import SectionNav from "@/components/ui/SectionNav";
import PageHero from "@/components/ui/page/PageHero";
import ResearchNav from "@/components/features/research/ResearchNav";
import WritingShelf from "@/components/features/home/WritingShelf";
import CollaborationsPageSection from "@/components/features/research/CollaborationsPageSection";
import { getAllArticles } from "@/lib/articles";
import { researchNeighbours, researchPage } from "@/data/researchPages";

export const dynamic = "force-dynamic";

const PAGE = researchPage("/research/collaborations");

export const metadata: Metadata = {
  title: "Research Collaborations | Richard Mensah",
  description:
    "Open research partnerships, institutional collaborations, and joint publications with Richard Mensah across AI, climate, and global development.",
};

export default async function CollaborationsPage() {
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
        <CollaborationsPageSection />
      </div>
      <WritingShelf
        articles={articles}
        topic={PAGE.topic}
        title="Related writing"
        subtitle="Papers open for review, co-authorship and partnership"
      />
      <SectionNav {...researchNeighbours(PAGE.href)} />
    </div>
  );
}
