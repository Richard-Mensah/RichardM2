import type { Metadata } from "next";
import SectionNav from "@/components/ui/SectionNav";
import PageHero from "@/components/ui/page/PageHero";
import ProjectsNav from "@/components/features/projects/ProjectsNav";
import PortfolioPageSection from "@/components/features/projects/PortfolioPageSection";
import RepoGrid from "@/components/features/projects/RepoGrid";
import { getClientWork } from "@/lib/clientWork";
import { getPublicRepos } from "@/lib/github";
import { projectNeighbours, projectPage } from "@/data/projectPages";

export const dynamic = "force-dynamic";

const PAGE = projectPage("/projects/portfolio");

export const metadata: Metadata = {
  title: "Portfolio | Richard Mensah",
  description:
    "Richard Mensah's complete portfolio: AI systems, data science projects, climate innovation, and community initiatives across Ghana, the UK, and global networks.",
};

export default async function PortfolioPage() {
  const [repos, projects] = await Promise.all([getPublicRepos(), getClientWork()]);
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
        <PortfolioPageSection projects={projects} />
      </div>
      <RepoGrid repos={repos} title="Latest public repositories" subtitle="The most recently updated code on GitHub" limit={9} />
      <SectionNav {...projectNeighbours(PAGE.href)} />
    </div>
  );
}
