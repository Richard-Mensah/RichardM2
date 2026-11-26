import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";

const FOCUS_AREAS = [
  {
    title: "Natural Language Processing",
    description: "Text classification, sentiment analysis, multilingual models, and NLP tools designed for African language contexts and institutional communication needs.",
    accent: "#4f8bff",
    icon: "💬",
  },
  {
    title: "Decision-Support Dashboards",
    description: "Interactive dashboards that translate ML outputs into clear institutional decisions, removing complexity from the path between data and action.",
    accent: "#4f8bff",
    icon: "📈",
  },
  {
    title: "Explainable AI Scoring",
    description: "Classification and scoring systems built with interpretability at the core, so institutions can trust, audit, and act on every prediction.",
    accent: "#3a78e0",
    icon: "🔍",
  },
];

export default function AiProjectsPageSection() {
  return (
    <div>

      {/* Featured System */}
      <section className="bg-transparent px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Flagship System" title="Predictive Intelligence System for Financial Behaviour" />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {[
              {
                tab: "Problem",
                content: "Organizations need better insight into financial behaviour without overwhelming people with irrelevant campaigns or intrusive data practices.",
                accent: "#3a78e0",
              },
              {
                tab: "Approach",
                content: "Classification models, behavioural segmentation, explainable scoring, and decision dashboards built to inform rather than replace human judgment.",
                accent: "#4f8bff",
              },
              {
                tab: "Impact",
                content: "Improves targeting, reduces waste, and creates a pathway toward ethical financial inclusion for underserved communities.",
                accent: "#2f6bea",
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
          <SectionHeading eyebrow="Capabilities" title="What these projects cover" center />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

    </div>
  );
}
