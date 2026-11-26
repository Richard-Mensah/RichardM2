import type { Metadata } from "next";
import SectionNav from "@/components/ui/SectionNav";
import PageHero from "@/components/ui/page/PageHero";
import ProjectsNav from "@/components/features/projects/ProjectsNav";
import CommunityPageSection from "@/components/features/projects/CommunityPageSection";
import ClientWorkCard from "@/components/features/work/ClientWorkCard";
import { getClientWork } from "@/lib/clientWork";
import { projectNeighbours, projectPage } from "@/data/projectPages";

export const dynamic = "force-dynamic";

const PAGE = projectPage("/projects/community");

export const metadata: Metadata = {
  title: "Community Initiatives | Richard Mensah",
  description:
    "Richard Mensah's community technology work: mentorship platforms, youth movement tools, and grassroots data initiatives built for communities in Ghana and beyond.",
};

export default async function CommunityProjectsPage() {
  const builds = (await getClientWork()).filter((p) => p.category === "organisation");
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
        <CommunityPageSection />
      </div>
      {builds.length ? (
        <section aria-labelledby="community-builds" className="px-5 py-14 md:px-8 md:py-16">
          <div className="mx-auto max-w-7xl">
            <p className="eyebrow">Built for organisations</p>
            <h2 id="community-builds" className="font-display mt-2 text-2xl font-bold tracking-[-0.03em] text-ink md:text-3xl">
              Platforms running in communities today
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {builds.map((p, i) => (
                <ClientWorkCard key={p.slug} project={p} index={i} showPhone={false} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <SectionNav {...projectNeighbours(PAGE.href)} />
    </div>
  );
}
