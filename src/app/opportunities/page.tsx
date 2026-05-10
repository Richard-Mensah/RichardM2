import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import SectionNav from "@/components/ui/SectionNav";

export const metadata: Metadata = {
  title: "Opportunities | Richard Mensah",
  description:
    "Scholarships, internships, fellowships, and conferences in AI, data science, youth leadership, and sustainable development.",
};

const OPPORTUNITY_TYPES = [
  {
    id: "scholarships",
    title: "Scholarships",
    icon: "🎓",
    accent: "#009EDB",
    description:
      "Funding opportunities for students and researchers in AI, data science, climate change, and sustainable development — with a focus on the Global South.",
  },
  {
    id: "internships",
    title: "Internships",
    icon: "💼",
    accent: "#3F7E44",
    description:
      "Practical placements and work experience opportunities in AI, analytics, and development organisations for emerging talent.",
  },
  {
    id: "fellowships",
    title: "Fellowships",
    icon: "🌐",
    accent: "#19486A",
    description:
      "Competitive fellowship programmes for emerging leaders, researchers, and innovators working at the intersection of technology and global development.",
  },
  {
    id: "conferences",
    title: "Conferences",
    icon: "🎤",
    accent: "#FCC30B",
    description:
      "Upcoming and notable conferences on AI, climate change, youth leadership, and the SDGs — with call-for-papers and registration information.",
  },
] as const;

export default function OpportunitiesPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <div className="flex-1">
        <div className="bg-[#006FA6] px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-7xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-white/60">
              Opportunities
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight tracking-[-0.04em] text-white md:text-6xl">
              Pathways for growth and impact
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/80">
              Curated opportunities in AI, data science, climate, leadership, and sustainable development — for students, researchers, and emerging professionals.
            </p>
          </div>
        </div>

        <div className="bg-slate-50 px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow="Browse" title="Opportunity categories" center />
            <div className="mt-14 grid gap-8 sm:grid-cols-2">
              {OPPORTUNITY_TYPES.map((opp) => (
                <section key={opp.id} id={opp.id} className="scroll-mt-24">
                  <Card className="h-full p-8" style={{ borderTop: `3px solid ${opp.accent}` }}>
                    <span className="text-4xl">{opp.icon}</span>
                    <h2 className="mt-4 text-2xl font-black text-slate-950">{opp.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{opp.description}</p>
                    <p className="mt-6 text-xs font-semibold text-slate-400">
                      Opportunities listed soon — check back regularly.
                    </p>
                  </Card>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
      <SectionNav
        prev={{ label: "Projects", href: "/projects" }}
        next={{ label: "Leadership", href: "/leadership" }}
      />
    </div>
  );
}
