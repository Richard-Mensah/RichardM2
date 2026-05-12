import Link from "next/link";
import { PUBLICATIONS, TAG_COLOURS } from "@/constants";

const FEATURED = PUBLICATIONS[0];
const GRID_PAPERS = PUBLICATIONS.filter(
  (p) => p.type === "Working Paper" || p.type === "Research Note"
).slice(1);

const AGENDA = [
  "NLP for low-resource African languages — bridging the digital language divide",
  "Climate signal translation — turning satellite data into community-readable risk narratives",
  "Human-centred AI design — building systems that work across literacy levels and device constraints",
  "Institutional AI readiness — what governance and accountability look like in the Global South",
];

export default function ResearchPapersPageSection() {
  return (
    <div className="research-ground relative px-5 py-20 md:px-8">
      <div className="pointer-events-none absolute inset-0 data-grid-light opacity-30" />
      <div className="relative mx-auto max-w-5xl">

        {/* Hero */}
        <p className="text-xs font-black uppercase tracking-[0.32em] text-[#009EDB]">Research Papers</p>
        <h1 className="mt-4 text-balance text-4xl font-black tracking-[-0.04em] text-slate-950 md:text-5xl">
          Rigorous inquiry at the frontier of AI and development.
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600">
          Peer-reviewed and working papers spanning NLP, climate AI, human-centred design,
          and institutional governance — designed to inform practice, not just add to the literature.
        </p>

        {/* Featured paper */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/60">
            <span
              className="rounded-full px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.2em] text-white"
              style={{ backgroundColor: FEATURED.accent }}
            >
              {FEATURED.type}
            </span>
            <span className="ml-3 text-xs font-bold text-slate-400">{FEATURED.year}</span>
            <h2 className="mt-4 text-xl font-black leading-snug text-slate-950">
              {FEATURED.title}
            </h2>
            <p className="mt-2 text-sm font-semibold text-slate-500">
              {FEATURED.authors} &mdash; <span className="italic">{FEATURED.venue}</span>
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-600">{FEATURED.abstract}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {FEATURED.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border px-3 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.18em]"
                  style={{
                    borderColor: `${TAG_COLOURS[tag] ?? "#009EDB"}44`,
                    color: TAG_COLOURS[tag] ?? "#009EDB",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Image placeholder — right column */}
          {/* IMAGE PLACEHOLDER — replace with:
              <div className="relative overflow-hidden rounded-2xl">
                <Image src="/research/research-papers-hero.jpg" alt="Research papers" fill className="object-cover" />
              </div> */}
          <div
            aria-hidden="true"
            className="min-h-[280px] rounded-2xl bg-gradient-to-br from-[#009EDB]/20 via-[#0077FF]/12 to-[#009EDB]/5"
          />
        </div>

        {/* Papers grid */}
        {GRID_PAPERS.length > 0 && (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {GRID_PAPERS.map((pub) => (
              <div
                key={pub.title}
                className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="absolute inset-y-0 left-0 w-1 rounded-l-2xl" style={{ backgroundColor: pub.accent }} />
                <div className="pl-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="rounded-full px-2.5 py-0.5 text-[0.6rem] font-black uppercase tracking-[0.18em] text-white"
                      style={{ backgroundColor: pub.accent }}
                    >
                      {pub.type}
                    </span>
                    <span className="text-xs font-bold text-slate-400">{pub.year}</span>
                  </div>
                  <h3 className="mt-3 text-base font-black leading-snug text-slate-950">{pub.title}</h3>
                  <p className="mt-1 text-xs italic text-slate-500">{pub.venue}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Research agenda */}
        <div className="mt-12 rounded-2xl border border-[#009EDB]/20 bg-[#F0FAFF] p-8">
          <p className="text-xs font-black uppercase tracking-[0.26em] text-[#009EDB]">Current research agenda</p>
          <h2 className="mt-3 text-xl font-black text-slate-950">What Richard is working on now</h2>
          <ul className="mt-5 space-y-3">
            {AGENDA.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-700">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#009EDB]" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl bg-[#F0FAFF] p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#009EDB]">Collaborate</p>
          <p className="mt-3 text-base leading-7 text-slate-600">
            Interested in proposing a joint research project or providing peer review?
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/contact" className="rounded-full bg-[#009EDB] px-6 py-2.5 text-sm font-black text-white transition hover:bg-[#007DB8]">
              Get in touch
            </Link>
            <Link href="/research" className="rounded-full border border-slate-300 px-6 py-2.5 text-sm font-black text-slate-700 transition hover:border-slate-400">
              Back to Research Hub
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
