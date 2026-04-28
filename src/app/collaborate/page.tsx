import type { Metadata } from "next";
import CollaborationSection from "@/components/features/collaboration/CollaborationSection";

export const metadata: Metadata = {
  title: "Collaborate | Richard Mensah",
  description: "Work with Richard Mensah on research partnerships, AI systems, institutional training, youth programs, speaking, climate intelligence, and SDG-aligned innovation.",
};

export default function CollaboratePage() {
  return <CollaborationSection />;
}
