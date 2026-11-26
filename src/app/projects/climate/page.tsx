import type { Metadata } from "next";
import SectionNav from "@/components/ui/SectionNav";
import PageHero from "@/components/ui/page/PageHero";
import ProjectsNav from "@/components/features/projects/ProjectsNav";
import ClimatePageSection from "@/components/features/projects/ClimatePageSection";
import RepoGrid from "@/components/features/projects/RepoGrid";
import { getPublicRepos } from "@/lib/github";
import { projectNeighbours, projectPage } from "@/data/projectPages";

export const dynamic = "force-dynamic";

const PAGE = projectPage("/projects/climate");

export const metadata: Metadata = {
  title: "Climate Innovation | Richard Mensah",
  description:
    "Richard Mensah's climate innovation projects: signal observatories, resilience dashboards, and community-facing tools that translate complex climate data into actionable insights.",
};

export default async function ClimateProjectsPage() {
  const repos = await getPublicRepos();
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <PageHero
        eyebrow={PAGE.eyebrow}
        title={PAGE.title}
        lede={PAGE.lede}
        image={PAGE.image}
        imageAlt={PAGE.imageAlt}
        focus={PAGE.focus}
        tag={PAGE.sdg}
        crumbs={[{ label: "Projects", href: "/projects" }, { label: PAGE.eyebrow }]}
      />
      <ProjectsNav />
      <div className="flex-1">
        <ClimatePageSection />
      </div>
      <RepoGrid repos={repos} match={PAGE.repos} track={PAGE.track} title="Climate and environment repositories" subtitle="Public climate-related code on GitHub" />
      <SectionNav {...projectNeighbours(PAGE.href)} />
    </div>
  );
}
