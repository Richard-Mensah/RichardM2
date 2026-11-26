import type { Metadata } from "next";
import SectionNav from "@/components/ui/SectionNav";
import PageHero from "@/components/ui/page/PageHero";
import ProjectsNav from "@/components/features/projects/ProjectsNav";
import DataSciencePageSection from "@/components/features/projects/DataSciencePageSection";
import RepoGrid from "@/components/features/projects/RepoGrid";
import { getPublicRepos } from "@/lib/github";
import { projectNeighbours, projectPage } from "@/data/projectPages";

export const dynamic = "force-dynamic";

const PAGE = projectPage("/projects/data-science");

export const metadata: Metadata = {
  title: "Data Science Projects | Richard Mensah",
  description:
    "Richard Mensah's data science projects: analytics pipelines, dashboards, data engineering, and visualisation systems that turn raw data into actionable institutional intelligence.",
};

export default async function DataSciencePage() {
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
        <DataSciencePageSection />
      </div>
      <RepoGrid repos={repos} match={PAGE.repos} exclude={PAGE.reposExclude} track={PAGE.track} title="Data science repositories" subtitle="Analysis, dashboards and pipelines, updated automatically from GitHub" />
      <SectionNav {...projectNeighbours(PAGE.href)} />
    </div>
  );
}
