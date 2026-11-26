import type { Metadata } from "next";
import SectionNav from "@/components/ui/SectionNav";
import PageHero from "@/components/ui/page/PageHero";
import ProjectsNav from "@/components/features/projects/ProjectsNav";
import SdgPageSection from "@/components/features/projects/SdgPageSection";
import { projectNeighbours, projectPage } from "@/data/projectPages";

const PAGE = projectPage("/projects/sdg");

export const metadata: Metadata = {
  title: "SDG Projects | Richard Mensah",
  description:
    "Richard Mensah's SDG-aligned projects: systems and programmes directly supporting SDG 4, 9, 13, and 17, from education and innovation to climate action and global partnerships.",
};

export default function SdgProjectsPage() {
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
        <SdgPageSection />
      </div>
      <SectionNav {...projectNeighbours(PAGE.href)} />
    </div>
  );
}
