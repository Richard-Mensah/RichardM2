import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, FileText, GraduationCap } from "lucide-react";

/** A heartbeat trace across the photo: two beats on a flat baseline. */
const PULSE_PATH = "M0 34 H62 L72 34 L80 14 L90 52 L98 24 L106 34 H170 L178 34 L186 6 L196 58 L204 30 L212 34 H300";

/** The MSc thesis feature; articles and papers follow in the WritingShelf. */
export default function ResearchHighlight() {
  return (
    <section className="px-5 pb-10 pt-16 md:px-8 md:pb-12 md:pt-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow">Research & writing</p>
            <h2 className="font-display mt-3 text-balance text-3xl font-bold tracking-[-0.035em] text-ink md:text-4xl">
              Research and ideas, open for collaboration
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/research" className="btn-ghost inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-xs font-black uppercase tracking-[0.14em]">
              All research
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            <Link href="/projects" className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-xs font-black uppercase tracking-[0.14em] text-accent-strong hover:underline">
              Research systems
            </Link>
          </div>
        </div>

        <div className="mt-10">
          {/* Thesis feature (selected writing sits in the shelf below) */}
          <article className="relative grid overflow-hidden rounded-[2rem] bg-navy-950 text-white md:grid-cols-[0.85fr_1.15fr] lg:grid-cols-[0.7fr_1.3fr]">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl" aria-hidden="true" />

            {/* "Pulse of the Earth" photo with a live heartbeat line */}
            <figure className="pulse-photo relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-full">
              <Image
                src="/gallery/pulse-of-the-earth-2.jpg"
                alt="Richard Mensah at the Pulse of the Earth climate exhibition"
                fill
                sizes="(min-width: 1024px) 26vw, (min-width: 768px) 40vw, 92vw"
                className="object-cover object-[50%_45%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent md:bg-gradient-to-r md:from-transparent md:via-navy-950/10 md:to-navy-950" aria-hidden="true" />

              <ul className="absolute left-4 top-4 flex flex-col items-start gap-2" aria-label="Research themes">
                {["Climate × AI", "CO₂ prediction", "Machine learning"].map((chip) => (
                  <li
                    key={chip}
                    className="chip-float rounded-full border border-white/20 bg-navy-950/60 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-accent-soft backdrop-blur"
                  >
                    {chip}
                  </li>
                ))}
              </ul>

              <svg
                className="pointer-events-none absolute inset-x-0 bottom-12 h-14 w-full"
                viewBox="0 0 300 60"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d={PULSE_PATH} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                <path
                  className="pulse-line"
                  d={PULSE_PATH}
                  pathLength={1}
                  fill="none"
                  stroke="#7fd6d2"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <svg className="pulse-dot pointer-events-none absolute inset-x-0 bottom-12 h-14 w-full" viewBox="0 0 300 60" preserveAspectRatio="none" aria-hidden="true">
                <circle r="3.5" fill="#ffffff" opacity="0">
                  <animateMotion dur="3.6s" repeatCount="indefinite" path={PULSE_PATH} keyPoints="0;1;1" keyTimes="0;0.6;1" calcMode="linear" />
                  <animate attributeName="opacity" dur="3.6s" repeatCount="indefinite" values="0;1;1;0;0" keyTimes="0;0.08;0.6;0.85;1" />
                </circle>
              </svg>

              <figcaption className="absolute bottom-4 left-4 text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">
                Pulse of the Earth · Wales
              </figcaption>
            </figure>

            <div className="relative p-7 md:p-9">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent/15 text-accent-soft ring-1 ring-accent/25">
                  <GraduationCap size={20} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-accent-soft">MSc thesis</p>
                  <p className="text-xs font-semibold text-on-dark-muted">AI &amp; Data Science · Bangor University · 2026</p>
                </div>
              </div>
              <h3 className="font-display mt-6 text-balance text-xl font-bold leading-snug md:text-2xl">
                &ldquo;Predicting Vehicle CO₂ Emissions Using Machine Learning: A Feature-Based Approach to Support Consumer
                and Environmental Decision-Making.&rdquo;
              </h3>
              <p className="mt-4 text-sm leading-7 text-on-dark-muted">
                Comparing machine-learning methods to predict vehicle CO₂ emissions from their features, so consumers get
                clearer, evidence-based information for lower-emission choices. Where my data science meets my climate work.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/research/thesis" className="btn-accent inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-xs font-black uppercase tracking-[0.14em]">
                  Read the research <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
                <Link href="/about/cv" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 px-5 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:bg-white/10">
                  <FileText size={15} aria-hidden="true" /> Request CV
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
