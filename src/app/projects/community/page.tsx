import type { Metadata } from "next";
import SectionNav from "@/components/ui/SectionNav";
import CommunityPageSection from "@/components/features/projects/CommunityPageSection";

export const metadata: Metadata = {
  title: "Community Initiatives | Richard Mensah",
  description:
    "Richard Mensah's community technology work: mentorship platforms, youth movement tools, and grassroots data initiatives built for communities in Ghana and beyond.",
};

export default function CommunityProjectsPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <div className="flex-1">
        <CommunityPageSection />
      </div>
      <SectionNav
        prev={{ label: "SDG Projects", href: "/projects/sdg" }}
        next={{ label: "Open Source", href: "/projects/open-source" }}
      />
    </div>
  );
}
