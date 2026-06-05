import HeroSection from "@/components/features/hero/HeroSection";
import AudiencePathways from "@/components/features/home/AudiencePathways";
import DomainPillars from "@/components/features/home/DomainPillars";
import SkillsMatrix from "@/components/features/home/SkillsMatrix";
import ImpactStats from "@/components/features/home/ImpactStats";
import FeaturedWork from "@/components/features/home/FeaturedWork";
import SelectedWriting from "@/components/features/home/SelectedWriting";
import SdgAlignmentStrip from "@/components/features/home/SdgAlignmentStrip";
import TestimonialsSection from "@/components/features/home/TestimonialsSection";
import FinalCta from "@/components/features/home/FinalCta";
import { getImpactStats } from "@/lib/impactStats";
import { getHomepage } from "@/lib/homepage";
import { getTestimonials } from "@/lib/testimonials";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [impactStats, homepage, testimonials] = await Promise.all([
    getImpactStats(),
    getHomepage(),
    getTestimonials(),
  ]);

  return (
    <>
      <HeroSection content={homepage} />
      <AudiencePathways />
      <DomainPillars />
      <SkillsMatrix />
      <ImpactStats impactStats={impactStats} />
      <FeaturedWork />
      <SelectedWriting />
      <SdgAlignmentStrip />
      <TestimonialsSection testimonials={testimonials} />
      <FinalCta />
    </>
  );
}
