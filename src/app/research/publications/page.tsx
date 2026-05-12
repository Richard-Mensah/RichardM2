import type { Metadata } from "next";
import SectionNav from "@/components/ui/SectionNav";
import PublicationsPageSection from "@/components/features/research/PublicationsPageSection";

export const metadata: Metadata = {
  title: "Publications | Richard Mensah",
  description:
    "Working papers, policy notes, and public essays by Richard Mensah at the intersection of AI, climate, and sustainable development.",
};

export default function PublicationsPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <div className="flex-1">
        <PublicationsPageSection />
      </div>
      <SectionNav
        prev={{ label: "Research Hub", href: "/research" }}
        next={{ label: "Research Papers", href: "/research/research-papers" }}
      />
    </div>
  );
}
