import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import LinkedInProfileCard from "./LinkedInProfileCard";

const FOCUS_AREAS = [
  {
    title: "Natural Language Processing",
    description: "Text classification, sentiment analysis, multilingual models, and NLP tools designed for African language contexts and institutional communication needs.",
    accent: "#009EDB",
    icon: "💬",
  },
  {
    title: "Decision-Support Dashboards",
    description: "Interactive dashboards that translate ML outputs into clear institutional decisions, removing complexity from the path between data and action.",
    accent: "#0077FF",
    icon: "📈",
  },
  {
    title: "Explainable AI Scoring",
    description: "Classification and scoring systems built with interpretability at the core, so institutions can trust, audit, and act on every prediction.",
    accent: "#A21942",
    icon: "🔍",
  },
];

export default function AiProjectsPageSection() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 px-5 py-20 md:px-8 md:py-28">
        <div className="pointer-events-none absolute inset-0 data-grid-light opacity-10" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#009EDB]">
                Projects / AI
              </p>
              <h1 className="mt-4 text-4xl font-black leading-tight text-white md:text-5xl">
                Applied intelligence for real-world decisions
              </h1>
              <p className="mt-6 text-base leading-8 text-slate-300">
                Every AI project Richard builds starts with a real institutional problem and ends with a working system. Machine learning, NLP, and decision intelligence designed for the contexts where they matter most.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://github.com/Richard-Mensah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-black text-white transition hover:bg-white/20"
                >
                  View on GitHub →
                </a>
                <Link
                  href="/research/ai-data-science"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-black text-white/80 transition hover:border-white/40 hover:text-white"
                >
                  Related Research
                </Link>
              </div>
            </div>
            <div className="relative h-72 overflow-hidden rounded-2xl lg:h-96">
              <Image
                src="/gallery/FB_IMG_1744840775657.jpg"
                alt="Richard Mensah at the St. Petersburg International Economic Forum, 2024"
                fill
                className="object-cover object-top"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured System */}
      <section className="bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Flagship System" title="Predictive Intelligence System for Financial Behaviour" />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {[
              {
                tab: "Problem",
                content: "Organizations need better insight into financial behaviour without overwhelming people with irrelevant campaigns or intrusive data practices.",
                accent: "#A21942",
              },
              {
                tab: "Approach",
                content: "Classification models, behavioural segmentation, explainable scoring, and decision dashboards built to inform rather than replace human judgment.",
                accent: "#009EDB",
              },
              {
                tab: "Impact",
                content: "Improves targeting, reduces waste, and creates a pathway toward ethical financial inclusion for underserved communities.",
                accent: "#3F7E44",
              },
            ].map((item) => (
              <Card key={item.tab} className="p-6" style={{ borderTop: `3px solid ${item.accent}` }}>
                <p className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: item.accent }}>
                  {item.tab}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.content}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="bg-slate-50 px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Capabilities" title="What these projects cover" center />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FOCUS_AREAS.map((area) => (
              <Card key={area.title} className="p-6" style={{ borderTop: `3px solid ${area.accent}` }}>
                <span className="text-2xl" aria-hidden="true">{area.icon}</span>
                <h3 className="mt-3 text-sm font-black text-slate-950">{area.title}</h3>
                <p className="mt-2 text-xs leading-6 text-slate-600">{area.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Connect */}
      <section className="bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="Connect" title="Follow the work" center />
          <div className="mt-8 flex flex-col gap-4">
            <a
              href="https://github.com/Richard-Mensah"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-5 transition hover:border-[#FD6925]/40 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-black text-slate-950">github.com/Richard-Mensah</p>
                <p className="text-xs text-slate-500">Browse public repositories and active projects</p>
              </div>
              <span className="text-xs font-black text-[#FD6925]">View →</span>
            </a>
            <LinkedInProfileCard />
          </div>
        </div>
      </section>
    </div>
  );
}
