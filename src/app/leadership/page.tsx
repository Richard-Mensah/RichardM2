import type { Metadata } from "next";
import LeadershipSection from "@/components/features/leadership/LeadershipSection";
import SectionNav from "@/components/ui/SectionNav";

export const metadata: Metadata = {
  title: "Leadership | Richard Mensah",
  description: "Richard Mensah's leadership platform — Alpha Society, AI training, cross-border partnerships, and public thinking on AI in Africa, climate, and youth empowerment.",
};

export default function LeadershipPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <div className="flex-1">
        <LeadershipSection />
      </div>
      <SectionNav
        prev={{ label: "Systems", href: "/systems" }}
        next={{ label: "Collaborate", href: "/collaborate" }}
      />
    </div>
  );
}
