import Image from "next/image";
import Link from "next/link";
import { LEADERSHIP_TRACKS, FOCUS_AREAS } from "@/constants";

const STATS = [
  { value: "120+", label: "Study Abroad Journeys" },
  { value: "35+", label: "Fully Funded Scholarships" },
  { value: "2,500+", label: "Youth Impacted" },
  { value: "180+", label: "Youth Leaders Empowered" },
];

export default function YouthDevelopmentPageSection() {
  return (
    <div className="research-ground relative px-5 py-20 md:px-8">
      <div className="pointer-events-none absolute inset-0 data-grid-light opacity-30" />
      <div className="relative mx-auto max-w-5xl">

        {/* Hero */}
        <p className="text-xs font-black uppercase tracking-[0.32em] text-accent-strong">Youth Development</p>
        <h1 className="mt-4 text-balance text-4xl font-black font-display tracking-[-0.04em] text-ink md:text-5xl">
          From potential to execution, at scale.
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-body">
          Mentorship, training, and knowledge systems that help young people across Ghana and
          beyond move from aspiration to action, with measurable, lasting outcomes.
        </p>

        {/* Impact stats strip */}
        <div className="mt-10 rounded-2xl bg-navy-900 p-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-black tracking-[-0.04em] text-white">{s.value}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-white/70">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mt-10 h-64 overflow-hidden rounded-2xl">
          <Image src="/research/youth-development-group.jpg" alt="Youth group at an international event" fill className="object-cover" />
        </div>

        {/* 2-col narrative */}
        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-accent-strong">EGA Mentorship International</p>
            <h2 className="mt-4 text-2xl font-black tracking-[-0.03em] text-ink">
              Building knowledge systems, not just motivation.
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-body">
              <p>
                EGA Mentorship International is the flagship youth development initiative Richard
                leads: a structured platform connecting ambitious young Africans with the
                information, mentors, and opportunities they need to access global education
                and leadership pathways.
              </p>
              <p>
                The programme focuses on scholarship applications, fellowship pipelines, study
                abroad preparation, and youth network development. Every pathway is data-tracked,
                with outcomes measured across cohort cycles to inform continuous programme improvement.
              </p>
              <p>
                The goal is not inspiration. It is execution. Talent is distributed equally.
                The programme&apos;s job is to remove the friction between aspiration and action.
              </p>
            </div>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-muted">Programme pillars</p>
            <div className="mt-4 space-y-4">
              {LEADERSHIP_TRACKS.map((track, i) => (
                <div key={i} className="flex items-start gap-4 rounded-xl border border-white/10 bg-navy-900 p-4">
                  <div className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg bg-accent-strong text-xs font-black text-white">
                    {i + 1}
                  </div>
                  <p className="text-sm leading-6 text-on-dark-muted">{track}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Focus areas */}
        <div className="mt-12">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-muted">Focus areas</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {FOCUS_AREAS.map((area) => (
              <span
                key={area}
                className="rounded-full border border-line px-4 py-2 text-sm font-bold text-accent-strong"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl bg-navy-900 p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-accent-soft">Get involved</p>
          <p className="mt-3 text-base leading-7 text-on-dark-muted">
            Partner on a youth programme, support the scholarship pipeline, or connect young people in your network with EGA Mentorship International.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-accent rounded-full px-6 py-2.5 text-sm font-black">
              Partner with us
            </Link>
            <Link href="/leadership" className="btn-ghost rounded-full px-6 py-2.5 text-sm font-black">
              EGA Mentorship
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
