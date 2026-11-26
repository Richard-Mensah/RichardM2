import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";

const CAPABILITIES = [
  {
    title: "Analytics Pipelines",
    description: "End-to-end data pipelines that ingest, clean, transform, and deliver structured datasets ready for modelling and institutional decision-making.",
    accent: "#0A97D9",
    icon: "🔄",
  },
  {
    title: "Dashboard Systems",
    description: "Interactive reporting and visualisation systems that surface the right metrics at the right time for the people who need to act on them.",
    accent: "#4f8bff",
    icon: "📊",
  },
  {
    title: "Predictive Analytics",
    description: "Forecasting and classification models that help organizations anticipate outcomes, allocate resources more effectively, and reduce operational uncertainty.",
    accent: "#4f8bff",
    icon: "🎯",
  },
  {
    title: "Data Engineering",
    description: "Scalable data architecture and engineering work that makes messy real-world data usable, queryable, and trustworthy for downstream analysis.",
    accent: "#19486A",
    icon: "⚙️",
  },
];

export default function DataSciencePageSection() {
  return (
    <div>

      {/* Capabilities */}
      <section className="bg-transparent px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Capabilities" title="What these projects cover" center />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {CAPABILITIES.map((cap) => (
              <Card key={cap.title} className="p-6" style={{ borderTop: `3px solid ${cap.accent}` }}>
                <span className="inline-block h-2.5 w-10 rounded-full" style={{ backgroundColor: cap.accent }} aria-hidden="true" />
                <h3 className="mt-3 text-sm font-bold text-ink">{cap.title}</h3>
                <p className="mt-2 text-xs leading-6 text-body">{cap.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Thesis */}
      <section className="bg-transparent px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-accent-strong">
            Core thesis
          </p>
          <p className="mt-4 text-2xl font-black leading-tight text-ink md:text-3xl">
            Data is only valuable when institutions can act on it. The work is building that bridge.
          </p>
          <p className="mt-6 text-sm leading-8 text-body">
            From raw ingestion to final dashboard, every data science project is designed to reduce the gap between what organizations know and what they do. The goal is not more data, it is better decisions.
          </p>
        </div>
      </section>

    </div>
  );
}
