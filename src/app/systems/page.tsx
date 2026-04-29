import type { Metadata } from "next";
import SystemsSection from "@/components/features/systems/SystemsSection";
import SectionNav from "@/components/ui/SectionNav";

export const metadata: Metadata = {
  title: "Systems | Richard Mensah",
  description: "Richard Mensah's AI system projects: Financial Behaviour Intelligence, Climate Signal Observatory, and Youth Leadership Knowledge Engine.",
};

export default function SystemsPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <div className="flex-1">
        <SystemsSection />
      </div>
      <SectionNav
        prev={{ label: "Research", href: "/research" }}
        next={{ label: "Leadership", href: "/leadership" }}
      />
    </div>
  );
}
