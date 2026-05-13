import type { Metadata } from "next";
import SectionNav from "@/components/ui/SectionNav";
import AiProjectsPageSection from "@/components/features/projects/AiProjectsPageSection";

export const metadata: Metadata = {
  title: "AI Projects | Richard Mensah",
  description:
    "Richard Mensah's AI projects: machine learning systems, NLP tools, predictive models, and intelligent decision-support platforms built for real-world institutional use.",
};

export default function AiProjectsPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <div className="flex-1">
        <AiProjectsPageSection />
      </div>
      <SectionNav
        prev={{ label: "Projects", href: "/projects" }}
        next={{ label: "Data Science", href: "/projects/data-science" }}
      />
    </div>
  );
}
