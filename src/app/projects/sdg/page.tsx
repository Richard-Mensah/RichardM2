import type { Metadata } from "next";
import SectionNav from "@/components/ui/SectionNav";
import SdgPageSection from "@/components/features/projects/SdgPageSection";

export const metadata: Metadata = {
  title: "SDG Projects | Richard Mensah",
  description:
    "Richard Mensah's SDG-aligned projects: systems and programmes directly supporting SDG 4, 9, 13, and 17, from education and innovation to climate action and global partnerships.",
};

export default function SdgProjectsPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <div className="flex-1">
        <SdgPageSection />
      </div>
      <SectionNav
        prev={{ label: "Climate Innovation", href: "/projects/climate" }}
        next={{ label: "Community Initiatives", href: "/projects/community" }}
      />
    </div>
  );
}
