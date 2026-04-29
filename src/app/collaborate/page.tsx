import type { Metadata } from "next";
import CollaborationSection from "@/components/features/collaboration/CollaborationSection";
import SectionNav from "@/components/ui/SectionNav";

export const metadata: Metadata = {
  title: "Collaborate | Richard Mensah",
  description: "Work with Richard Mensah on research partnerships, AI systems, institutional training, youth programs, speaking, climate intelligence, and SDG-aligned innovation.",
};

export default function CollaboratePage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <div className="flex-1">
        <CollaborationSection />
      </div>
      <SectionNav prev={{ label: "Leadership", href: "/leadership" }} />
    </div>
  );
}
