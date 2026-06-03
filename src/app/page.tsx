import HeroSection from "@/components/features/hero/HeroSection";
import SectionOverview from "@/components/features/home/SectionOverview";
import { getImpactStats } from "@/lib/impactStats";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const impactStats = await getImpactStats();

  return (
    <>
      <HeroSection />
      <SectionOverview impactStats={impactStats} />
    </>
  );
}
