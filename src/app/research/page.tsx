import type { Metadata } from "next";
import ResearchSection from "@/components/features/research/ResearchSection";
import SectionNav from "@/components/ui/SectionNav";

export const metadata: Metadata = {
  title: "Research | Richard Mensah",
  description: "Richard Mensah's research pillars: AI & Data Science, AI & Climate Change, Youth Leadership Systems, and Policy, Ethics & Institutions.",
};

export default function ResearchPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <div className="flex-1">
        <ResearchSection />
      </div>
      <SectionNav
        prev={{ label: "SDGs", href: "/sdgs" }}
        next={{ label: "Systems", href: "/systems" }}
      />
    </div>
  );
}
