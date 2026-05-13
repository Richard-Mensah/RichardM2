import type { Metadata } from "next";
import SectionNav from "@/components/ui/SectionNav";
import AiDataSciencePageSection from "@/components/features/research/AiDataSciencePageSection";

export const metadata: Metadata = {
  title: "AI & Data Science | Richard Mensah",
  description:
    "Richard Mensah's applied AI and data science research: machine learning, NLP, predictive modeling, and decision intelligence for real-world contexts.",
};

export default function AiDataSciencePage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <div className="flex-1">
        <AiDataSciencePageSection />
      </div>
      <SectionNav
        prev={{ label: "Thought Leadership", href: "/research/thought-leadership" }}
        next={{ label: "Youth Development", href: "/research/youth-development" }}
      />
    </div>
  );
}
