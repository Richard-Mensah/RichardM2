import type { Metadata } from "next";
import SectionNav from "@/components/ui/SectionNav";
import YouthDevelopmentPageSection from "@/components/features/research/YouthDevelopmentPageSection";

export const metadata: Metadata = {
  title: "Youth Development | Richard Mensah",
  description:
    "Richard Mensah's youth development work — mentorship, scholarship facilitation, training programmes, and knowledge systems that move young people from aspiration to action.",
};

export default function YouthDevelopmentPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <div className="flex-1">
        <YouthDevelopmentPageSection />
      </div>
      <SectionNav
        prev={{ label: "AI & Data Science", href: "/research/ai-data-science" }}
        next={{ label: "AI & Climate Change", href: "/research/ai-climate-change" }}
      />
    </div>
  );
}
