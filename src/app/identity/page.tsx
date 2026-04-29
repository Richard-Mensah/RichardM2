import type { Metadata } from "next";
import IdentitySection from "@/components/features/identity/IdentitySection";
import SectionNav from "@/components/ui/SectionNav";

export const metadata: Metadata = {
  title: "Identity | Richard Mensah",
  description: "Richard Mensah's journey from Ghana to the UK and the Global South — rooted in development urgency, expanded through systems thinking, built for cross-border impact.",
};

export default function IdentityPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <div className="flex-1">
        <IdentitySection />
      </div>
      <SectionNav next={{ label: "SDGs", href: "/sdgs" }} />
    </div>
  );
}
