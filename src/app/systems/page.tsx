import type { Metadata } from "next";
import SystemsSection from "@/components/features/systems/SystemsSection";

export const metadata: Metadata = {
  title: "Systems | Richard Mensah",
  description: "Richard Mensah's AI system projects: Financial Behaviour Intelligence, Climate Signal Observatory, and Youth Leadership Knowledge Engine.",
};

export default function SystemsPage() {
  return <SystemsSection />;
}
