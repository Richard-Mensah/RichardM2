import type { Metadata } from "next";
import LeadershipPageSections from "@/components/features/leadership/LeadershipPageSections";
import LeadershipSection from "@/components/features/leadership/LeadershipSection";
import SectionNav from "@/components/ui/SectionNav";

export const metadata: Metadata = {
  title: "Leadership | Richard Mensah",
  description: "Richard Mensah's leadership story — from founding the Sefwi Bekwai Youth Movement and Youth Parliament to building EGA Mentorship International with partners across Serbia, USA, Zambia, and Liberia.",
};

export default function LeadershipPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <div className="flex-1">
        <LeadershipPageSections />
        <LeadershipSection />
      </div>
      <SectionNav
        prev={{ label: "Systems", href: "/systems" }}
        next={{ label: "Collaborate", href: "/collaborate" }}
      />
    </div>
  );
}
