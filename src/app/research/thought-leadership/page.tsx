import type { Metadata } from "next";
import SectionNav from "@/components/ui/SectionNav";
import ThoughtLeadershipPageSection from "@/components/features/research/ThoughtLeadershipPageSection";

export const metadata: Metadata = {
  title: "Thought Leadership | Richard Mensah",
  description:
    "Richard Mensah's frameworks and perspectives on AI in society, governance, the Global South, and how intelligent systems can serve communities rather than exclude them.",
};

export default function ThoughtLeadershipPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <div className="flex-1">
        <ThoughtLeadershipPageSection />
      </div>
      <SectionNav
        prev={{ label: "Articles", href: "/research/articles" }}
        next={{ label: "AI & Data Science", href: "/research/ai-data-science" }}
      />
    </div>
  );
}
