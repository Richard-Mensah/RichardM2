"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Briefcase, Code2, GraduationCap, Handshake, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Path = {
  key: string;
  label: string;
  icon: LucideIcon;
  line: string;
  links: { label: string; href: string; external?: boolean }[];
};

const PATHS: Path[] = [
  {
    key: "recruiter",
    label: "Recruiter",
    icon: Briefcase,
    line: "Hiring for AI/ML, data or full-stack roles? Start with my CV, shipped client work and daily code.",
    links: [
      { label: "CV & skills", href: "/about/cv" },
      { label: "GitHub activity", href: "/projects/open-source" },
    ],
  },
  {
    key: "supervisor",
    label: "Supervisor",
    icon: GraduationCap,
    line: "Supervising AI, climate or development research? See my MSc thesis, working papers and methods.",
    links: [
      { label: "MSc thesis", href: "/research/thesis" },
      { label: "Research & papers", href: "/research" },
    ],
  },
  {
    key: "client",
    label: "Client",
    icon: Code2,
    line: "Need a website, portfolio or operations platform? See what I've built for organisations and professionals.",
    links: [
      { label: "Client work", href: "/work" },
      { label: "Start a project", href: "/collaborate" },
    ],
  },
  {
    key: "partner",
    label: "Partner",
    icon: Handshake,
    line: "Conference, funder or community partner? Explore my youth leadership, SDG impact and speaking.",
    links: [
      { label: "SDG impact", href: "/sdgs" },
      { label: "Speaking & conferences", href: "/about/conferences" },
    ],
  },
];

/** "I'm here as…" router under the hero: one short line and two next steps per audience. */
export default function AudienceSwitcher() {
  const [active, setActive] = useState(0);
  const path = PATHS[active];

  return (
    <section aria-label="Find what matters to you" className="border-b border-line bg-surface-card">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 md:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
        <p className="shrink-0 text-[11px] font-black uppercase tracking-[0.2em] text-muted">I&rsquo;m here as a</p>
        <div role="tablist" aria-label="Choose your role" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:px-0">
          {PATHS.map((p, i) => {
            const Icon = p.icon;
            const selected = i === active;
            return (
              <button
                key={p.key}
                type="button"
                role="tab"
                id={`aud-tab-${p.key}`}
                aria-selected={selected}
                aria-controls="aud-panel"
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") setActive((active + 1) % PATHS.length);
                  if (e.key === "ArrowLeft") setActive((active - 1 + PATHS.length) % PATHS.length);
                }}
                className={cn(
                  "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-xs font-black uppercase tracking-[0.12em] transition",
                  selected ? "border-navy-950 bg-navy-950 text-white" : "border-line-strong text-ink-soft hover:border-accent hover:text-accent-strong",
                )}
              >
                <Icon size={14} aria-hidden="true" />
                {p.label}
              </button>
            );
          })}
        </div>
        </div>
        <div
          id="aud-panel"
          role="tabpanel"
          aria-labelledby={`aud-tab-${path.key}`}
          key={path.key}
          className="reveal-up flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-sm leading-6 text-body">{path.line}</p>
          <div className="flex shrink-0 flex-wrap gap-2">
            {path.links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 text-xs font-black uppercase tracking-[0.12em] transition",
                  i === 0 ? "btn-accent" : "border border-line-strong text-ink hover:border-accent hover:text-accent-strong",
                )}
              >
                {l.label}
                {i === 0 ? <ArrowRight size={14} aria-hidden="true" /> : null}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
