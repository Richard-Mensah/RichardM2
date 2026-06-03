import type { Metadata } from "next";
import SectionNav from "@/components/ui/SectionNav";
import ResearchPapersPageSection from "@/components/features/research/ResearchPapersPageSection";

export const metadata: Metadata = {
  title: "Research Papers | Richard Mensah",
  description:
    "Working papers and applied research by Richard Mensah spanning NLP, climate AI, human-centred design, and AI governance in the Global South. Working drafts shared for review, not peer-reviewed journal publications.",
};

export default function ResearchPapersPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <div className="flex-1">
        <ResearchPapersPageSection />
      </div>
      <SectionNav
        prev={{ label: "Publications", href: "/research/publications" }}
        next={{ label: "Conference Presentations", href: "/research/conference-presentations" }}
      />
    </div>
  );
}
