import type { Metadata } from "next";
import SectionNav from "@/components/ui/SectionNav";
import AiClimateChangePageSection from "@/components/features/research/AiClimateChangePageSection";

export const metadata: Metadata = {
  title: "AI & Climate Change | Richard Mensah",
  description:
    "Richard Mensah's climate AI research: translating satellite-derived climate signals into community-readable risk narratives for adaptation planning in Sub-Saharan Africa.",
};

export default function AiClimateChangePage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <div className="flex-1">
        <AiClimateChangePageSection />
      </div>
      <SectionNav
        prev={{ label: "Youth Development", href: "/research/youth-development" }}
        next={{ label: "Global Development", href: "/research/global-development" }}
      />
    </div>
  );
}
