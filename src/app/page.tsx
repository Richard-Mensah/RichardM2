import HeroSection from "@/components/features/hero/HeroSection";
import AudienceSwitcher from "@/components/features/home/AudienceSwitcher";
import ProofBar from "@/components/features/home/ProofBar";
import ClientWorkShowcase from "@/components/features/home/ClientWorkShowcase";
import DomainPillars from "@/components/features/home/DomainPillars";
import GitHubActivity from "@/components/features/home/GitHubActivity";
import SdgExplorer from "@/components/features/home/SdgExplorer";
import ResearchHighlight from "@/components/features/home/ResearchHighlight";
import TestimonialsSection from "@/components/features/home/TestimonialsSection";
import FinalCta from "@/components/features/home/FinalCta";
import { getImpactStats } from "@/lib/impactStats";
import { getHomepage } from "@/lib/homepage";
import { getTestimonials } from "@/lib/testimonials";
import { getClientWork } from "@/lib/clientWork";
import { getGitHubActivity } from "@/lib/github";
import { getHeroReel } from "@/lib/heroReel";

export const dynamic = "force-dynamic";

/*
 * The homepage is a front door: who Richard is, proof in one row, then a short
 * slice for each audience with links to the deeper pages. The skills radar,
 * journey timeline, full impact stats and full GitHub stats live on /about/cv,
 * /about/leadership-journey, /impact and /projects/open-source.
 */
export default async function HomePage() {
  const [impactStats, homepage, testimonials, clientWork, github, reel] = await Promise.all([
    getImpactStats(),
    getHomepage(),
    getTestimonials(),
    getClientWork(),
    getGitHubActivity(),
    getHeroReel(),
  ]);

  return (
    <>
      <HeroSection
        content={homepage}
        chapters={reel}
        player={{
          level: github?.level ?? null,
          builds: clientWork.length,
          projects: github?.totalRepos ?? null,
          youth: impactStats.find((s) => /youth impacted/i.test(s.label))?.value ?? null,
        }}
      />
      <AudienceSwitcher />
      <ProofBar
        impactStats={impactStats}
        clientBuilds={clientWork.length}
        githubProjects={github?.totalRepos ?? null}
        contributions={github?.totalContributions ?? null}
      />
      <ClientWorkShowcase projects={clientWork} />
      <DomainPillars />
      <SdgExplorer clientCount={clientWork.length} />
      {github ? <GitHubActivity data={github} variant="compact" /> : null}
      <ResearchHighlight />
      <TestimonialsSection testimonials={testimonials} />
      <FinalCta />
    </>
  );
}
