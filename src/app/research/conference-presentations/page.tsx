import type { Metadata } from "next";
import SectionNav from "@/components/ui/SectionNav";
import ConferencePresentationsPageSection from "@/components/features/research/ConferencePresentationsPageSection";

export const metadata: Metadata = {
  title: "Conference Presentations | Richard Mensah",
  description:
    "Richard Mensah's speaking engagements at AI ethics forums, UN SDG convenings, climate intelligence summits, and youth leadership assemblies.",
};

export default function ConferencePresentationsPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <div className="flex-1">
        <ConferencePresentationsPageSection />
      </div>
      <SectionNav
        prev={{ label: "Research Papers", href: "/research/research-papers" }}
        next={{ label: "Research Collaborations", href: "/research/collaborations" }}
      />
    </div>
  );
}
