import HeroSection from "@/components/features/hero/HeroSection";
import JourneyShowcase from "@/components/features/home/JourneyShowcase";
import AudiencePathways from "@/components/features/home/AudiencePathways";
import DomainPillars from "@/components/features/home/DomainPillars";
import SkillsMatrix from "@/components/features/home/SkillsMatrix";
import ImpactStats from "@/components/features/home/ImpactStats";
import FeaturedWork from "@/components/features/home/FeaturedWork";
import ClientWorkShowcase from "@/components/features/home/ClientWorkShowcase";
import ThesisHighlight from "@/components/features/home/ThesisHighlight";
import SelectedWriting from "@/components/features/home/SelectedWriting";
import SdgExplorer from "@/components/features/home/SdgExplorer";
import TestimonialsSection from "@/components/features/home/TestimonialsSection";
import FinalCta from "@/components/features/home/FinalCta";
import { getImpactStats } from "@/lib/impactStats";
import { getHomepage } from "@/lib/homepage";
import { getTestimonials } from "@/lib/testimonials";
import { getClientWork } from "@/lib/clientWork";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [impactStats, homepage, testimonials, clientWork] = await Promise.all([
    getImpactStats(),
    getHomepage(),
    getTestimonials(),
    getClientWork(),
  ]);

  return (
    <>
      <HeroSection content={homepage} />
      <ClientWorkShowcase projects={clientWork} />
      <JourneyShowcase />
      <AudiencePathways />
      <DomainPillars />
      <SdgExplorer clientCount={clientWork.length} />
      <SkillsMatrix clientCount={clientWork.length} />
      <ImpactStats impactStats={impactStats} />
      <FeaturedWork />
      <ThesisHighlight />
      <SelectedWriting />
      <TestimonialsSection testimonials={testimonials} />
      <FinalCta />
    </>
  );
}
