import type { Metadata } from "next";
import SectionNav from "@/components/ui/SectionNav";
import PageHero from "@/components/ui/page/PageHero";
import ProjectsNav from "@/components/features/projects/ProjectsNav";
import AiProjectsPageSection from "@/components/features/projects/AiProjectsPageSection";
import RepoGrid from "@/components/features/projects/RepoGrid";
import { getPublicRepos } from "@/lib/github";
import { projectNeighbours, projectPage } from "@/data/projectPages";

export const dynamic = "force-dynamic";

const PAGE = projectPage("/projects/ai");

export const metadata: Metadata = {
  title: "AI Projects | Richard Mensah",
  description:
    "Richard Mensah's AI projects: machine learning systems, NLP tools, predictive models, and intelligent decision-support platforms built for real-world institutional use.",
};

export default async function AiProjectsPage() {
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
        <AiProjectsPageSection />
      </div>
      <RepoGrid repos={repos} match={PAGE.repos} track={PAGE.track} title="AI and machine-learning repositories" subtitle="Models, APIs and apps, updated automatically from GitHub" />
      <SectionNav {...projectNeighbours(PAGE.href)} />
    </div>
  );
}
