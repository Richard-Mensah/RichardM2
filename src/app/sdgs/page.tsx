import type { Metadata } from "next";
import PageHero from "@/components/ui/page/PageHero";
import SectionNav from "@/components/ui/SectionNav";
import SdgsSection from "@/components/features/sdgs/SdgsSection";
import SdgExplorer from "@/components/features/home/SdgExplorer";
import LeadershipNav from "@/components/features/leadership/LeadershipNav";
import { getClientWork } from "@/lib/clientWork";
import { leadershipNeighbours, leadershipPage } from "@/data/leadershipPages";

export const metadata: Metadata = {
  title: "SDG Impact | Richard Mensah",
  description: "Richard Mensah's Sustainable Development Goal contributions, connecting AI, climate intelligence, youth leadership, and partnerships to the global 2030 agenda.",
};

export const revalidate = 3600;

const PAGE = leadershipPage("/sdgs");

export default async function SdgsPage() {
  const clientWork = await getClientWork();
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <PageHero
        eyebrow={PAGE.eyebrow}
        title={PAGE.title}
        lede={PAGE.lede}
        image={PAGE.image}
        imageAlt={PAGE.imageAlt}
        focus={PAGE.focus}
        crumbs={[{ label: "Leadership", href: "/leadership" }, { label: "SDGs" }]}
      />
      <LeadershipNav />
      <div className="flex-1">
        <SdgExplorer clientCount={clientWork.length} />
        <SdgsSection />
      </div>
      <SectionNav {...leadershipNeighbours(PAGE.href)} />
    </div>
  );
}
