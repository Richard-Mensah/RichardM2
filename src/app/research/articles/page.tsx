import type { Metadata } from "next";
import SectionNav from "@/components/ui/SectionNav";
import ArticlesPageSection from "@/components/features/research/ArticlesPageSection";

export const metadata: Metadata = {
  title: "Articles | Richard Mensah",
  description:
    "Public writing by Richard Mensah on AI, climate, youth leadership, and sustainable development — translating research into ideas anyone can engage with.",
};

export default function ArticlesPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <div className="flex-1">
        <ArticlesPageSection />
      </div>
      <SectionNav
        prev={{ label: "Research Collaborations", href: "/research/collaborations" }}
        next={{ label: "Thought Leadership", href: "/research/thought-leadership" }}
      />
    </div>
  );
}
