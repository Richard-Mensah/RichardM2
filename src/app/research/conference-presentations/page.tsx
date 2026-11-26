import type { Metadata } from "next";
import SectionNav from "@/components/ui/SectionNav";
import PageHero from "@/components/ui/page/PageHero";
import ResearchNav from "@/components/features/research/ResearchNav";
import WritingShelf from "@/components/features/home/WritingShelf";
import ConferencePresentationsPageSection from "@/components/features/research/ConferencePresentationsPageSection";
import { getAllArticles } from "@/lib/articles";
import { researchNeighbours, researchPage } from "@/data/researchPages";

export const dynamic = "force-dynamic";

const PAGE = researchPage("/research/conference-presentations");

export const metadata: Metadata = {
  title: "Conference Presentations | Richard Mensah",
  description:
    "Richard Mensah's speaking engagements at AI ethics forums, UN SDG convenings, climate intelligence summits, and youth leadership assemblies.",
};

export default async function ConferencePresentationsPage() {
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
        <ConferencePresentationsPageSection />
      </div>
      <WritingShelf
        articles={articles}
        topic={PAGE.topic}
        title="Related writing"
        subtitle="The ideas behind the talks, in long form"
      />
      <SectionNav {...researchNeighbours(PAGE.href)} />
    </div>
  );
}
