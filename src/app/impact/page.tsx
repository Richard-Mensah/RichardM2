import type { Metadata } from "next";
import SdgsSection from "@/components/features/sdgs/SdgsSection";
import ImpactStats from "@/components/features/home/ImpactStats";
import SectionNav from "@/components/ui/SectionNav";
import { getImpactStats } from "@/lib/impactStats";

export const metadata: Metadata = {
  title: "Impact | Richard Mensah",
  description:
    "SDG-aligned impact through AI, climate intelligence, youth leadership, and global partnerships, Richard Mensah's contribution to the Sustainable Development Goals.",
};

export const revalidate = 3600;

export default async function ImpactPage() {
  const impactStats = await getImpactStats();
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <div className="flex-1">
        <ImpactStats impactStats={impactStats} />
        <SdgsSection />
      </div>
      <SectionNav
        prev={{ label: "Opportunities", href: "/opportunities" }}
        next={{ label: "Contact", href: "/contact" }}
      />
    </div>
  );
}
