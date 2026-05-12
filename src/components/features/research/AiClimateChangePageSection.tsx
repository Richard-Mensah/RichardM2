import Image from "next/image";
import Link from "next/link";
import { SYSTEMS } from "@/constants";

const APPROACH = [
  {
    icon: "DS",
    title: "Data Sources",
    body: "Open geospatial datasets, satellite imagery, precipitation records, and temperature anomaly indices — sourced from publicly available climate data repositories.",
    accent: "#3F7E44",
  },
  {
    icon: "ML",
    title: "Methods",
    body: "Machine learning models, NLP-based risk narratives, and geospatial analytics that translate raw signals into structured, interpretable intelligence.",
    accent: "#009EDB",
  },
  {
    icon: "OP",
    title: "Outputs",
    body: "Community dashboards, adaptation planning briefs, and youth-facing visualisations that help local governments and NGOs act without needing a data science team.",
    accent: "#0077FF",
  },
];

export default function AiClimateChangePageSection() {
  const climateSystem = SYSTEMS[1];

  return (
    <div className="research-ground relative px-5 py-20 md:px-8">
      <div className="pointer-events-none absolute inset-0 data-grid-light opacity-30" />
      <div className="relative mx-auto max-w-5xl">

        {/* Hero */}
        <p className="text-xs font-black uppercase tracking-[0.32em] text-[#3F7E44]">AI & Climate Change</p>
        <h1 className="mt-4 text-balance text-4xl font-black tracking-[-0.04em] text-slate-950 md:text-5xl">
          Climate intelligence for communities on the frontlines.
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600">
          Translating complex environmental signals into practical, community-readable
          adaptation intelligence — particularly for Sub-Saharan Africa, where climate risk
          is acute and data science capacity is limited.
        </p>

        {/* Research narrative */}
        <div className="mt-12 space-y-4 text-base leading-7 text-slate-600">
          <p>
            Climate change is not an abstract threat for the communities Richard works with and
            researches. It is a lived, daily reality — changing rainfall patterns, increasing
            drought frequency, shifting planting seasons, and growing flood risk. His climate AI
            research focuses on making this complexity legible to the people who need to act on it.
          </p>
          <p>
            Working with open geospatial datasets and satellite imagery, Richard develops models
            and dashboards that help local governments, NGOs, and communities understand what is
            happening in their environment and plan adaptive responses — without needing a data
            science team to interpret the outputs.
          </p>
          <p>
            This research area directly informs his work on SDG 13 (Climate Action) and contributes
            to a broader evidence base on AI-assisted adaptation in Sub-Saharan Africa. The goal is
            not just to produce climate data — but to produce climate intelligence that communities
            can actually use.
          </p>
        </div>

        {/* SDG 13 card */}
        <div className="mt-12 rounded-2xl bg-[#3F7E44] p-8 text-white">
          <span className="text-[0.65rem] font-black uppercase tracking-[0.28em] text-white/70">SDG 13</span>
          <h2 className="mt-2 text-2xl font-black">Climate Action</h2>
          <div className="mt-4 space-y-3 text-sm leading-7 text-white/85">
            <p>
              Richard&apos;s climate AI work is explicitly aligned with SDG 13 — strengthening
              resilience and adaptive capacity to climate-related hazards through applied AI.
            </p>
            <p>
              By building systems that translate satellite-derived signals into community-readable
              risk narratives, this research contributes directly to evidence-based adaptation
              planning in communities with the least resources and the highest exposure.
            </p>
          </div>
        </div>

        <div className="relative mt-12 h-64 overflow-hidden rounded-2xl">
          <Image src="/research/ai-climate-change-satellite.jpg" alt="Satellite view of earth's climate systems" fill className="object-cover" />
        </div>

        {/* Approach strip */}
        <div className="mt-12">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-slate-500">Research approach</p>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {APPROACH.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div
                  className="grid h-10 w-10 place-items-center rounded-xl text-xs font-black text-white"
                  style={{ backgroundColor: item.accent }}
                >
                  {item.icon}
                </div>
                <h3 className="mt-4 text-base font-black text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured system */}
        <div className="mt-12">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-slate-500">Featured system</p>
          <div className="mt-5 relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60">
            <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl" style={{ backgroundColor: climateSystem.color }} />
            <span
              className="rounded-full px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.2em] text-white"
              style={{ backgroundColor: climateSystem.color }}
            >
              {climateSystem.label}
            </span>
            <h3 className="mt-4 text-xl font-black text-slate-950">{climateSystem.title}</h3>
            <p className="mt-1 text-sm text-slate-500"><strong>Problem:</strong> {climateSystem.problem}</p>
            <p className="mt-2 text-sm text-slate-500"><strong>Approach:</strong> {climateSystem.approach}</p>
            <p className="mt-2 text-sm text-slate-500"><strong>Impact:</strong> {climateSystem.impact}</p>
            <Link href="/systems" className="mt-5 inline-flex items-center gap-1.5 text-sm font-black text-[#3F7E44] transition hover:underline">
              Explore the system →
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl bg-[#F0FAF2] p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#3F7E44]">Collaborate on climate research</p>
          <p className="mt-3 text-base leading-7 text-slate-600">
            Interested in partnering on climate intelligence research, co-developing community dashboards, or accessing datasets and methodologies?
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/systems" className="rounded-full bg-[#3F7E44] px-6 py-2.5 text-sm font-black text-white transition hover:bg-[#2F6433]">
              Explore Climate System
            </Link>
            <Link href="/contact" className="rounded-full border border-slate-300 px-6 py-2.5 text-sm font-black text-slate-700 transition hover:border-slate-400">
              Start a conversation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
