import type { Metadata } from "next";
import CollaborationSection from "@/components/features/collaboration/CollaborationSection";
import SectionNav from "@/components/ui/SectionNav";

export const metadata: Metadata = {
  title: "Contact | Richard Mensah",
  description:
    "Get in touch with Richard Mensah for research partnerships, speaking engagements, AI systems collaboration, and SDG-aligned initiatives.",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <div className="flex-1">
        <CollaborationSection />
      </div>
      <SectionNav prev={{ label: "Impact", href: "/impact" }} />
    </div>
  );
}
