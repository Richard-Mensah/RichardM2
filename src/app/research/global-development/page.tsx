import type { Metadata } from "next";
import SectionNav from "@/components/ui/SectionNav";
import GlobalDevelopmentPageSection from "@/components/features/research/GlobalDevelopmentPageSection";

export const metadata: Metadata = {
  title: "Global Development | Richard Mensah",
  description:
    "Richard Mensah's global development work — cross-border research, SDG-aligned partnerships, and AI initiatives connecting Ghana, the UK, and global networks.",
};

export default function GlobalDevelopmentPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <div className="flex-1">
        <GlobalDevelopmentPageSection />
      </div>
      <SectionNav
        prev={{ label: "AI & Climate Change", href: "/research/ai-climate-change" }}
        next={{ label: "Research Hub", href: "/research" }}
      />
    </div>
  );
}
