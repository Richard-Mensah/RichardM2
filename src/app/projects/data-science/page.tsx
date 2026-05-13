import type { Metadata } from "next";
import SectionNav from "@/components/ui/SectionNav";
import DataSciencePageSection from "@/components/features/projects/DataSciencePageSection";

export const metadata: Metadata = {
  title: "Data Science Projects | Richard Mensah",
  description:
    "Richard Mensah's data science projects: analytics pipelines, dashboards, data engineering, and visualisation systems that turn raw data into actionable institutional intelligence.",
};

export default function DataSciencePage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <div className="flex-1">
        <DataSciencePageSection />
      </div>
      <SectionNav
        prev={{ label: "AI Projects", href: "/projects/ai" }}
        next={{ label: "Climate Innovation", href: "/projects/climate" }}
      />
    </div>
  );
}
