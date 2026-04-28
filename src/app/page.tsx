import { db } from "@/db";
import { sql } from "drizzle-orm";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import HeroSection from "@/components/features/hero/HeroSection";
import IdentitySection from "@/components/features/identity/IdentitySection";
import SdgsSection from "@/components/features/sdgs/SdgsSection";
import ResearchSection from "@/components/features/research/ResearchSection";
import SystemsSection from "@/components/features/systems/SystemsSection";
import LeadershipSection from "@/components/features/leadership/LeadershipSection";
import WritingSection from "@/components/features/writing/WritingSection";
import CollaborationSection from "@/components/features/collaboration/CollaborationSection";
import type { DatabaseSignal } from "@/types";

export const dynamic = "force-dynamic";

async function getDatabaseSignal(): Promise<DatabaseSignal> {
  try {
    await db.execute(sql`select 1`);
    return "online";
  } catch {
    return "degraded";
  }
}

export default async function HomePage() {
  const databaseSignal = await getDatabaseSignal();

  return (
    <>
      <div className="sdg-band fixed inset-x-0 top-0 z-[60] h-1.5" />
      <SiteHeader />
      <main id="home" className="overflow-hidden pt-20">
        <HeroSection databaseSignal={databaseSignal} />
        <IdentitySection />
        <SdgsSection />
        <ResearchSection />
        <SystemsSection />
        <LeadershipSection />
        <WritingSection />
        <CollaborationSection />
      </main>
      <SiteFooter />
    </>
  );
}
