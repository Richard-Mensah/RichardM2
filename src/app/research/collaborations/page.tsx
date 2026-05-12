import type { Metadata } from "next";
import SectionNav from "@/components/ui/SectionNav";
import CollaborationsPageSection from "@/components/features/research/CollaborationsPageSection";

export const metadata: Metadata = {
  title: "Research Collaborations | Richard Mensah",
  description:
    "Open research partnerships, institutional collaborations, and joint publications with Richard Mensah across AI, climate, and global development.",
};

export default function CollaborationsPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <div className="flex-1">
        <CollaborationsPageSection />
      </div>
      <SectionNav
        prev={{ label: "Conference Presentations", href: "/research/conference-presentations" }}
        next={{ label: "Articles", href: "/research/articles" }}
      />
    </div>
  );
}
