import type { Metadata } from "next";
import SectionNav from "@/components/ui/SectionNav";
import PageHero from "@/components/ui/page/PageHero";
import ResearchNav from "@/components/features/research/ResearchNav";
import WritingShelf from "@/components/features/home/WritingShelf";
import GlobalDevelopmentPageSection from "@/components/features/research/GlobalDevelopmentPageSection";
import { getAllArticles } from "@/lib/articles";
import { researchNeighbours, researchPage } from "@/data/researchPages";

export const dynamic = "force-dynamic";

const PAGE = researchPage("/research/global-development");

export const metadata: Metadata = {
  title: "Global Development | Richard Mensah",
  description:
    "Richard Mensah's global development work: cross-border research, SDG-aligned partnerships, and AI initiatives connecting Ghana, the UK, and global networks.",
};

export default async function GlobalDevelopmentPage() {
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
        <GlobalDevelopmentPageSection />
      </div>
      <WritingShelf
        articles={articles}
        topic={PAGE.topic}
        title="Related writing"
        subtitle="Articles and papers on development, the SDGs and the Global South"
      />
      <SectionNav {...researchNeighbours(PAGE.href)} />
    </div>
  );
}
