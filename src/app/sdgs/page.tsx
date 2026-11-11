import type { Metadata } from "next";
import SdgsSection from "@/components/features/sdgs/SdgsSection";
import SdgExplorer from "@/components/features/home/SdgExplorer";
import SectionNav from "@/components/ui/SectionNav";
import { getClientWork } from "@/lib/clientWork";

export const metadata: Metadata = {
  title: "SDG Impact | Richard Mensah",
  description: "Richard Mensah's Sustainable Development Goal contributions, connecting AI, climate intelligence, youth leadership, and partnerships to the global 2030 agenda.",
};

export const revalidate = 3600;

export default async function SdgsPage() {
  const clientWork = await getClientWork();
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <div className="flex-1">
        <SdgExplorer clientCount={clientWork.length} />
        <SdgsSection />
      </div>
      <SectionNav
        prev={{ label: "Identity", href: "/identity" }}
        next={{ label: "Research", href: "/research" }}
      />
    </div>
  );
}
