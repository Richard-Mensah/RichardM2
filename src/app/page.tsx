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
import { getGitHubActivity } from "@/lib/github";
import GitHubActivity from "@/components/features/home/GitHubActivity";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [impactStats, homepage, testimonials, clientWork, github] = await Promise.all([
    getImpactStats(),
    getHomepage(),
    getTestimonials(),
    getClientWork(),
    getGitHubActivity(),
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
      {github ? <GitHubActivity data={github} /> : null}
      <ImpactStats impactStats={impactStats} />
      <FeaturedWork />
      <ThesisHighlight />
      <SelectedWriting />
      <TestimonialsSection testimonials={testimonials} />
      <FinalCta />
    </>
  );
}
