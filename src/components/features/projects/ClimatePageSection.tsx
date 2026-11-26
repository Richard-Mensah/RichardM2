import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";

const FOCUS_AREAS = [
  {
    title: "Satellite Data Analysis",
    description: "Processing open satellite datasets to extract localized climate indicators, land use patterns, and environmental stress signals relevant to community-level planning.",
    accent: "#2f6bea",
    icon: "🛰️",
  },
  {
    title: "Community Risk Narratives",
    description: "Translating technical climate outputs into plain-language risk summaries that communities and local authorities can actually understand and plan around.",
    accent: "#2f6bea",
    icon: "📋",
  },
  {
    title: "Youth-Facing Dashboards",
    description: "Resilience dashboards designed with young people as the primary audience, making climate data accessible, engaging, and actionable for the next generation.",
    accent: "#0A97D9",
    icon: "📱",
  },
];

export default function ClimatePageSection() {
  return (
    <div>

      {/* Featured System */}
      <section className="bg-transparent px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Flagship System" title="Climate Signal Observatory for Community Resilience" />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {[
              {
                tab: "Problem",
                content: "Communities in Sub-Saharan Africa face acute climate risk but lack access to localized intelligence that is understandable, relevant, and timely enough to inform adaptation decisions.",
                accent: "#3a78e0",
              },
              {
                tab: "Approach",
                content: "Open climate datasets, geospatial indicators, risk narrative generation using NLP, and youth-facing resilience dashboards combining multiple data sources into a single actionable view.",
                accent: "#2f6bea",
              },
              {
                tab: "Impact",
                content: "Supports community resilience planning, strengthens public climate awareness, and creates a foundation for evidence-based adaptation conversations at grassroots level.",
                accent: "#0A97D9",
              },
            ].map((item) => (
              <Card key={item.tab} className="p-6" style={{ borderTop: `3px solid ${item.accent}` }}>
                <p className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: item.accent }}>
                  {item.tab}
                </p>
                <p className="mt-3 text-sm leading-7 text-body">{item.content}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="bg-transparent px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Focus Areas" title="What these projects address" center />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {FOCUS_AREAS.map((area) => (
              <Card key={area.title} className="p-6" style={{ borderTop: `3px solid ${area.accent}` }}>
                <span className="inline-block h-2.5 w-10 rounded-full" style={{ backgroundColor: area.accent }} aria-hidden="true" />
                <h3 className="mt-3 text-sm font-bold text-ink">{area.title}</h3>
                <p className="mt-2 text-xs leading-6 text-body">{area.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SDG connection */}
      <section className="bg-transparent px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-accent-strong/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-accent-strong">
            SDG 13, Climate Action
          </span>
          <p className="mt-5 text-2xl font-black leading-tight text-ink">
            The communities most affected by climate change are rarely the ones with access to climate science. This work closes that gap.
          </p>
          <p className="mt-4 text-sm leading-7 text-body">
            Every project in this area is oriented around one question: how do we make climate knowledge usable for the people who need it most? That means building for low-resource contexts, local languages, and community-level decision-making rather than just institutional audiences.
          </p>
          <Link
            href="/research/ai-climate-change"
            className="mt-8 inline-flex items-center gap-2 text-sm font-black text-accent-strong transition hover:gap-3"
          >
            Read the research →
          </Link>
        </div>
      </section>
    </div>
  );
}
