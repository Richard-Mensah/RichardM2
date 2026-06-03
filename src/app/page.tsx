import HeroSection from "@/components/features/hero/HeroSection";
import SectionOverview from "@/components/features/home/SectionOverview";
import { getImpactStats } from "@/lib/impactStats";
import { getHomepage, toParagraphs } from "@/lib/homepage";
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
      <SectionOverview
        impactStats={impactStats}
        welcomeTitle={homepage.welcomeTitle}
        welcomeParagraphs={toParagraphs(homepage.welcomeBody)}
        testimonials={testimonials}
      />
    </>
  );
}
