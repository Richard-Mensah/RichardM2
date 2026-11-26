import type { Metadata } from "next";
import SectionNav from "@/components/ui/SectionNav";
import PageHero from "@/components/ui/page/PageHero";
import ProjectsNav from "@/components/features/projects/ProjectsNav";
import RepoExplorer from "@/components/features/projects/RepoExplorer";
import GitHubActivity from "@/components/features/home/GitHubActivity";
import { getGitHubActivity, getPublicRepos } from "@/lib/github";
import { projectNeighbours, projectPage } from "@/data/projectPages";

export const dynamic = "force-dynamic";

const PAGE = projectPage("/projects/open-source");

export const metadata: Metadata = {
  title: "Open Source Work | Richard Mensah",
  description:
    "Richard Mensah's open source contributions: publicly available tools, code, and frameworks for AI, data science, and community development applications.",
};

export default async function OpenSourcePage() {
  const [repos, github] = await Promise.all([getPublicRepos(), getGitHubActivity()]);
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
      {github ? <GitHubActivity data={github} variant="full" /> : null}
      <section aria-labelledby="repos-heading" className="px-5 py-14 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">Repositories</p>
          <h2 id="repos-heading" className="font-display mt-2 text-2xl font-bold tracking-[-0.03em] text-ink md:text-3xl">
            Every public project, filterable
          </h2>
          <p className="mt-1.5 mb-7 text-sm text-body md:text-base">Sorted by most recent push. Private client repositories are not listed.</p>
          <RepoExplorer repos={repos} />
        </div>
      </section>
      <SectionNav {...projectNeighbours(PAGE.href)} />
    </div>
  );
}
