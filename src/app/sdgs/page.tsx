import type { Metadata } from "next";
import SdgsSection from "@/components/features/sdgs/SdgsSection";
import SectionNav from "@/components/ui/SectionNav";

export const metadata: Metadata = {
  title: "SDG Impact | Richard Mensah",
  description: "Richard Mensah's Sustainable Development Goal contributions — connecting AI, climate intelligence, youth leadership, and partnerships to the global 2030 agenda.",
};

export default function SdgsPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <div className="flex-1">
        <SdgsSection />
      </div>
      <SectionNav
        prev={{ label: "Identity", href: "/identity" }}
        next={{ label: "Research", href: "/research" }}
      />
    </div>
  );
}
