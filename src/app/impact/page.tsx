import type { Metadata } from "next";
import SdgsSection from "@/components/features/sdgs/SdgsSection";
import SectionNav from "@/components/ui/SectionNav";

export const metadata: Metadata = {
  title: "Impact | Richard Mensah",
  description:
    "SDG-aligned impact through AI, climate intelligence, youth leadership, and global partnerships, Richard Mensah's contribution to the Sustainable Development Goals.",
};

export default function ImpactPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <div className="flex-1">
        <SdgsSection />
      </div>
      <SectionNav
        prev={{ label: "Opportunities", href: "/opportunities" }}
        next={{ label: "Contact", href: "/contact" }}
      />
    </div>
  );
}
