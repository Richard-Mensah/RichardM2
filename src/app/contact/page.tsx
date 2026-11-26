import type { Metadata } from "next";
import CollaborationSection from "@/components/features/collaboration/CollaborationSection";
import SectionNav from "@/components/ui/SectionNav";

export const metadata: Metadata = {
  title: "Contact | Richard Mensah",
  description:
    "Contact Richard Mensah about research partnerships, AI systems and software builds, institutional training, youth programmes, speaking and SDG-aligned innovation.",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <div className="flex-1">
        <CollaborationSection />
      </div>
      <SectionNav prev={{ label: "Leadership record", href: "/leadership/journey" }} />
    </div>
  );
}
