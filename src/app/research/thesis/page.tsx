import type { Metadata } from "next";
import SectionNav from "@/components/ui/SectionNav";
import ThesisPageSection from "@/components/features/research/ThesisPageSection";
import ResearchNav from "@/components/features/research/ResearchNav";
import { researchNeighbours } from "@/data/researchPages";

export const metadata: Metadata = {
  title: "MSc Thesis | Richard Mensah",
  description:
    "Predicting vehicle CO₂ emissions with machine learning: Richard Mensah's MSc thesis (Bangor University), a feature-based, SHAP-explainable approach built to support consumer decision-making.",
};

export default function ThesisPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <ResearchNav />
      <div className="flex-1">
        <ThesisPageSection />
      </div>
      <SectionNav {...researchNeighbours("/research/thesis")} />
    </div>
  );
}
