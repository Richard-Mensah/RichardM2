import type { Metadata } from "next";
import SectionNav from "@/components/ui/SectionNav";
import PageHero from "@/components/ui/page/PageHero";
import ResearchNav from "@/components/features/research/ResearchNav";
import WritingShelf from "@/components/features/home/WritingShelf";
import YouthDevelopmentPageSection from "@/components/features/research/YouthDevelopmentPageSection";
import { getAllArticles } from "@/lib/articles";
import { researchNeighbours, researchPage } from "@/data/researchPages";

export const dynamic = "force-dynamic";

const PAGE = researchPage("/research/youth-development");

export const metadata: Metadata = {
  title: "Youth Development | Richard Mensah",
  description:
    "Richard Mensah's youth development work: mentorship, scholarship facilitation, training programmes, and knowledge systems that move young people from aspiration to action.",
};

export default async function YouthDevelopmentPage() {
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
        <YouthDevelopmentPageSection />
      </div>
      <WritingShelf
        articles={articles}
        topic={PAGE.topic}
        title="Related writing"
        subtitle="Articles and papers on youth leadership, mentorship and education"
      />
      <SectionNav {...researchNeighbours(PAGE.href)} />
    </div>
  );
}
