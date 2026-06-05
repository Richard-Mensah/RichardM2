import type { Metadata } from "next";
import SectionNav from "@/components/ui/SectionNav";
import ThesisPageSection from "@/components/features/research/ThesisPageSection";

export const metadata: Metadata = {
  title: "MSc Thesis | Richard Mensah",
  description:
    "Predicting vehicle CO₂ emissions with machine learning: Richard Mensah's MSc thesis (Bangor University), a feature-based, SHAP-explainable approach built to support consumer decision-making.",
};

export default function ThesisPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <div className="flex-1">
        <ThesisPageSection />
      </div>
      <SectionNav
        prev={{ label: "AI & Data Science", href: "/research/ai-data-science" }}
        next={{ label: "Get in touch", href: "/contact" }}
      />
    </div>
  );
}
