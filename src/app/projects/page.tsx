import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Rocket } from "lucide-react";
import PageHero from "@/components/ui/page/PageHero";
import AreaTiles from "@/components/ui/page/AreaTiles";
import SectionNav from "@/components/ui/SectionNav";
import ProjectsNav from "@/components/features/projects/ProjectsNav";
import RepoGrid from "@/components/features/projects/RepoGrid";
import SystemsSection from "@/components/features/systems/SystemsSection";
import ClientWorkCard from "@/components/features/work/ClientWorkCard";
import { getClientWork } from "@/lib/clientWork";
import { getPublicRepos } from "@/lib/github";
import { PROJECTS_HUB, PROJECT_PAGES, projectNeighbours } from "@/data/projectPages";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects | Richard Mensah",
  description:
    "Client software, AI and data science projects, climate innovation and community platforms by Richard Mensah, framed as problem, approach and impact.",
};

export default async function ProjectsPage() {
  const [builds, repos] = await Promise.all([getClientWork(), getPublicRepos()]);
  const featured = [...builds.filter((b) => b.featured), ...builds.filter((b) => !b.featured)].slice(0, 3);
  const facts = [
    { value: builds.length, label: "client builds shipped" },
    { value: repos.length, label: "public repositories" },
    { value: 2, label: "countries: UK and Ghana" },
  ].filter((f) => f.value > 0);

  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <PageHero
        eyebrow={PROJECTS_HUB.eyebrow}
        title={PROJECTS_HUB.title}
        lede={PROJECTS_HUB.lede}
        image={PROJECTS_HUB.image}
        imageAlt={PROJECTS_HUB.imageAlt}
        focus={PROJECTS_HUB.focus}
      >
        <Link href="/work" className="btn-accent inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-xs font-black uppercase tracking-[0.14em]">
          <Rocket size={15} aria-hidden="true" /> See client work
        </Link>
        <Link
          href="/projects/open-source"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/30 px-5 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:bg-white/10"
        >
          GitHub activity
        </Link>
        <ul className="flex w-full flex-wrap gap-x-6 gap-y-2 pt-3 text-sm text-white/80" aria-label="Projects in numbers">
          {facts.map((f) => (
            <li key={f.label}>
              <span className="font-display mr-1.5 text-2xl font-bold text-white">{f.value}</span>
              {f.label}
            </li>
          ))}
        </ul>
      </PageHero>
      <ProjectsNav />

      {featured.length ? (
        <section aria-labelledby="featured-builds" className="px-5 py-14 md:px-8 md:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Shipped</p>
                <h2 id="featured-builds" className="font-display mt-2 text-3xl font-bold tracking-[-0.035em] text-ink md:text-4xl">
                  Featured client builds
                </h2>
              </div>
              <Link href="/work" className="btn-ghost inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-xs font-black uppercase tracking-[0.14em]">
                All {builds.length} builds <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featured.map((p, i) => (
                <ClientWorkCard key={p.slug} project={p} index={i} showPhone={false} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="areas-heading" className="px-5 py-14 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">Project areas</p>
          <h2 id="areas-heading" className="font-display mt-2 text-3xl font-bold tracking-[-0.035em] text-ink md:text-4xl">
            Seven ways the work shows up
          </h2>
          <div className="mt-8">
            <AreaTiles tiles={PROJECT_PAGES.filter((p) => p.isArea)} />
          </div>
        </div>
      </section>

      <SystemsSection />
      <RepoGrid repos={repos} title="Latest from GitHub" subtitle="The most recently updated public projects" />

      <SectionNav {...projectNeighbours(PROJECTS_HUB.href)} />
    </div>
  );
}
