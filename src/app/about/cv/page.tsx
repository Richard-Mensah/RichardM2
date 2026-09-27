import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, GraduationCap, Briefcase, Globe2 } from "lucide-react";
import SectionNav from "@/components/ui/SectionNav";
import CvRequestForm from "@/components/features/cv/CvRequestForm";

export const metadata: Metadata = {
  title: "CV / Resume | Richard Mensah",
  description:
    "Request Richard Mensah's full curriculum vitae covering academic qualifications, professional experience, research contributions, leadership roles, and programme outcomes.",
};

const HIGHLIGHTS = [
  {
    icon: GraduationCap,
    title: "Education",
    body: "MSc, Artificial Intelligence & Data Science, Bangor University (2026). BSc foundation in computing and analytics.",
  },
  {
    icon: Briefcase,
    title: "Experience",
    body: "AI/ML and data science work, full-stack delivery, and a decade of programme design, mentorship, and monitoring & evaluation.",
  },
  {
    icon: Globe2,
    title: "Leadership",
    body: "Formal Country Representative for UNYA-Ghana, Youth MP, and Global Director of EGA Mentorship International.",
  },
  {
    icon: BadgeCheck,
    title: "Research",
    body: "Working papers on climate intelligence, responsible AI for the Global South, and multilingual LLMs for development.",
  },
];

export default function CvPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy-950 px-5 py-16 md:px-8 md:py-24">
        <div className="data-grid-light pointer-events-none absolute inset-0 opacity-[0.4]" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/about"
            className="mb-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-accent-soft transition hover:text-white"
          >
            ← About Richard
          </Link>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-accent-soft">
            CV / Resume
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.02em] text-white md:text-5xl">
            The full record of a career built with purpose.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-on-dark-muted">
            Richard&apos;s CV covers his academic qualifications, professional experience, research
            contributions, publications, leadership roles, and programme outcomes. He shares it on
            request, so it stays current and he knows who&apos;s reading it. Request a copy below
            and he&apos;ll email it to you.
          </p>
        </div>
      </section>

      {/* ── Highlights + request form ─────────────────────────────── */}
      <section className="flex-1 bg-surface px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          <div>
            <p className="eyebrow">What&apos;s inside</p>
            <h2 className="font-display mt-3 text-2xl font-bold tracking-[-0.02em] text-ink md:text-3xl">
              A snapshot before you ask
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {HIGHLIGHTS.map(({ icon: Icon, title, body }) => (
                <div key={title} className="card-lift rounded-2xl border border-line bg-surface-card p-5">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent-tint text-accent-strong">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-sm font-black uppercase tracking-[0.1em] text-ink">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-body">{body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-line bg-surface-card p-6 shadow-xl shadow-navy-950/5 md:p-8">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-accent-strong">
              Request the CV
            </p>
            <h2 className="font-display mt-2 text-2xl font-semibold text-ink">
              Ask for a copy
            </h2>
            <div className="mt-6">
              <CvRequestForm />
            </div>
          </div>
        </div>
      </section>

      <SectionNav
        prev={{ label: "Media & Speaking", href: "/about/media" }}
        next={{ label: "Research", href: "/research" }}
      />
    </div>
  );
}
