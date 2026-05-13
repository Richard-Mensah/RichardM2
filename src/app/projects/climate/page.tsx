import type { Metadata } from "next";
import SectionNav from "@/components/ui/SectionNav";
import ClimatePageSection from "@/components/features/projects/ClimatePageSection";

export const metadata: Metadata = {
  title: "Climate Innovation | Richard Mensah",
  description:
    "Richard Mensah's climate innovation projects: signal observatories, resilience dashboards, and community-facing tools that translate complex climate data into actionable insights.",
};

export default function ClimateProjectsPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <div className="flex-1">
        <ClimatePageSection />
      </div>
      <SectionNav
        prev={{ label: "Data Science", href: "/projects/data-science" }}
        next={{ label: "SDG Projects", href: "/projects/sdg" }}
      />
    </div>
  );
}
