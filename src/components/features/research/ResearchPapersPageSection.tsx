import Image from "next/image";
import Link from "next/link";
import { PUBLICATIONS, TAG_COLOURS } from "@/constants";

const FEATURED = PUBLICATIONS[0];
const GRID_PAPERS = PUBLICATIONS.filter(
  (p) => p.type === "Working Paper" || p.type === "Research Note"
).slice(1);

const AGENDA = [
  "NLP for low-resource African languages: bridging the digital language divide",
  "Climate signal translation: turning satellite data into community-readable risk narratives",
  "Human-centred AI design: building systems that work across literacy levels and device constraints",
  "Institutional AI readiness: what governance and accountability look like in the Global South",
];

export default function ResearchPapersPageSection() {
  return (
    <div className="research-ground relative px-5 py-20 md:px-8">
      <div className="pointer-events-none absolute inset-0 data-grid-light opacity-30" />
      <div className="relative mx-auto max-w-5xl">

        {/* Hero */}
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#4f8bff]">Research Papers</p>
        <h1 className="mt-4 text-balance text-4xl font-bold tracking-[-0.02em] text-white md:text-5xl">
          Working papers and applied research.
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-[#a9bcdc]">
          Working drafts and applied research spanning NLP, climate AI, human-centred design, and
          institutional governance — written to inform practice. These are working papers shared
          openly for discussion and review, not peer-reviewed journal publications.
        </p>

        {/* Featured paper */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="glass rounded-2xl p-8 shadow-lg shadow-slate-200/60">
            <span
              className="rounded-full px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.2em] text-white"
              style={{ backgroundColor: FEATURED.accent }}
            >
              {FEATURED.type}
            </span>
            <span className="ml-3 text-xs font-bold text-[#7e92b6]">{FEATURED.year}</span>
            <h2 className="mt-4 text-xl font-black leading-snug text-white">
              {FEATURED.title}
            </h2>
            <p className="mt-2 text-sm font-semibold text-[#8aa0c4]">
              {FEATURED.authors} &mdash; <span className="italic">{FEATURED.venue}</span>
            </p>
            <p className="mt-4 text-sm leading-7 text-[#a9bcdc]">{FEATURED.abstract}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {FEATURED.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border px-3 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.18em]"
                  style={{
                    borderColor: `${TAG_COLOURS[tag] ?? "#4f8bff"}44`,
                    color: TAG_COLOURS[tag] ?? "#4f8bff",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="relative min-h-[280px] overflow-hidden rounded-2xl">
            <Image src="/research/research-papers-hero.jpg" alt="Richard Mensah at an academic conference" fill className="object-cover" />
          </div>
        </div>

        {/* Papers grid */}
        {GRID_PAPERS.length > 0 && (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {GRID_PAPERS.map((pub) => (
              <div
                key={pub.title}
                className="relative overflow-hidden glass rounded-2xl p-6 shadow-sm"
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
                    <span className="text-xs font-bold text-[#7e92b6]">{pub.year}</span>
                  </div>
                  <h3 className="mt-3 text-base font-black leading-snug text-white">{pub.title}</h3>
                  <p className="mt-1 text-xs italic text-[#8aa0c4]">{pub.venue}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Research agenda */}
        <div className="mt-12 rounded-2xl border border-[#4f8bff]/20 bg-transparent p-8">
          <p className="text-xs font-black uppercase tracking-[0.26em] text-[#4f8bff]">Current research agenda</p>
          <h2 className="mt-3 text-xl font-black text-white">What Richard is working on now</h2>
          <ul className="mt-5 space-y-3">
            {AGENDA.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-6 text-[#cdd9ee]">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#4f8bff]" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl bg-transparent p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#4f8bff]">Collaborate</p>
          <p className="mt-3 text-base leading-7 text-[#a9bcdc]">
            Interested in proposing a joint research project or providing peer review?
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/contact" className="rounded-full bg-[#4f8bff] px-6 py-2.5 text-sm font-black text-white transition hover:bg-[#007DB8]">
              Get in touch
            </Link>
            <Link href="/research" className="rounded-full border border-white/15 px-6 py-2.5 text-sm font-black text-[#cdd9ee] transition hover:border-slate-400">
              Back to Research Hub
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
