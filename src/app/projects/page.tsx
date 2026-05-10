import type { Metadata } from "next";
import SystemsSection from "@/components/features/systems/SystemsSection";
import SectionNav from "@/components/ui/SectionNav";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Projects | Richard Mensah",
  description:
    "AI systems, data science projects, climate innovation, and community initiatives by Richard Mensah — turning research into infrastructure and impact.",
};

const PROJECT_CATEGORIES = [
  { id: "ai", title: "AI Projects", accent: "#009EDB", description: "Machine learning systems, NLP tools, predictive models, and intelligent decision-support platforms built for real-world institutional use." },
  { id: "data-science", title: "Data Science Projects", accent: "#0A97D9", description: "Analytics pipelines, dashboards, data engineering, and visualisation systems that turn raw data into actionable institutional intelligence." },
  { id: "climate", title: "Climate Innovation", accent: "#3F7E44", description: "Climate signal observatories, resilience dashboards, and community-facing tools that translate complex climate data into understandable, actionable insights." },
  { id: "sdg", title: "SDG Projects", accent: "#19486A", description: "Systems and programmes directly aligned with specific Sustainable Development Goals — from SDG 4 (education) to SDG 13 (climate action)." },
  { id: "community", title: "Community Initiatives", accent: "#FCC30B", description: "Youth-led and community-centred programmes combining skills training, mentorship, and local data to drive grassroots development." },
  { id: "open-source", title: "Open Source Work", accent: "#FD6925", description: "Publicly available tools, code, and frameworks contributed to the open-source community for AI, data science, and development applications." },
  { id: "portfolio", title: "Portfolio", accent: "#A21942", description: "A complete showcase of Richard's built systems, published work, and deployed tools across AI, climate intelligence, and youth development." },
] as const;

export default function ProjectsPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <div className="flex-1">
        <SystemsSection />

        <div className="bg-slate-50 px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow="Projects" title="Full project portfolio" center />
            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {PROJECT_CATEGORIES.map((cat) => (
                <section key={cat.id} id={cat.id} className="scroll-mt-24">
                  <Card
                    className="h-full p-8"
                    style={{ borderTop: `3px solid ${cat.accent}` }}
                  >
                    <h2 className="text-xl font-black text-slate-950">{cat.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{cat.description}</p>
                    <p className="mt-6 text-xs font-semibold text-slate-400">Coming soon</p>
                  </Card>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
      <SectionNav
        prev={{ label: "Research", href: "/research" }}
        next={{ label: "Leadership", href: "/leadership" }}
      />
    </div>
  );
}
