import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import LinkedInProfileCard from "./LinkedInProfileCard";

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
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 px-5 py-20 md:px-8 md:py-28">
        <div className="pointer-events-none absolute inset-0 data-grid-light opacity-10" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-accent-soft">
                Projects / Data Science
              </p>
              <h1 className="mt-4 text-4xl font-black font-display leading-tight text-white md:text-5xl">
                Turning raw data into institutional intelligence
              </h1>
              <p className="mt-6 text-base leading-8 text-on-dark-muted">
                Data science work that goes beyond notebooks and dashboards. Richard builds systems that clean, interpret, and surface data as decisions, giving institutions the clarity they need to act.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://github.com/Richard-Mensah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  View on GitHub →
                </a>
                <Link
                  href="/research/ai-data-science"
                  className="btn-ghost inline-flex items-center gap-2"
                >
                  Related Research
                </Link>
              </div>
            </div>
            <div className="relative h-72 overflow-hidden rounded-2xl lg:h-96">
              <Image
                src="/gallery/20240302_090453.jpg"
                alt="Richard Mensah at a leadership and data event, 2024"
                fill
                className="object-cover object-center"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>

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

      {/* Connect */}
      <section className="bg-transparent px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="Connect" title="Follow the work" center />
          <div className="mt-8 flex flex-col gap-4">
            <a
              href="https://github.com/Richard-Mensah"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-xl border border-line bg-transparent p-5 transition hover:border-accent-strong/40 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-black text-ink">github.com/Richard-Mensah</p>
                <p className="text-xs text-muted">Browse public repositories and active projects</p>
              </div>
              <span className="text-xs font-black text-accent-strong">View →</span>
            </a>
            <LinkedInProfileCard />
          </div>
        </div>
      </section>
    </div>
  );
}
