import type { Metadata } from "next";
import SectionNav from "@/components/ui/SectionNav";
import PublicationsPageSection from "@/components/features/research/PublicationsPageSection";

export const metadata: Metadata = {
  title: "Writing & Working Papers | Richard Mensah",
  description:
    "Independent essays, working papers, and policy notes by Richard Mensah at the intersection of AI, climate, and sustainable development. Self-published works, not peer-reviewed journal publications.",
};

export default function PublicationsPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <div className="flex-1">
        <PublicationsPageSection />
      </div>
      <SectionNav
        prev={{ label: "Research Hub", href: "/research" }}
        next={{ label: "Conference Presentations", href: "/research/conference-presentations" }}
      />
    </div>
  );
}
