"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  ChevronDown,
  CloudSun,
  Code2,
  FileText,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import { SKILL_GROUPS } from "@/constants";
import { cn } from "@/lib/utils";
import SkillMeter from "@/components/ui/SkillMeter";

const ICONS: Record<string, LucideIcon> = { BrainCircuit, BarChart3, CloudSun, Code2, Users };

/** Short labels for the radar axes, plus a link to real evidence for each area. */
const META: Record<string, { short: string; proof: { label: string; href: string } }> = {
  "Machine Learning & AI": {
    short: "ML & AI",
    proof: { label: "MSc AI & Data Science research", href: "/research/ai-data-science" },
  },
  "Data Science & Analytics": {
    short: "Data",
    proof: { label: "Data science projects", href: "/projects/data-science" },
  },
  "Climate & Geospatial": {
    short: "Climate",
    proof: { label: "Climate intelligence work", href: "/projects/climate" },
  },
  "Engineering & Delivery": {
    short: "Engineering",
    proof: { label: "{n} live client builds shipped", href: "/work" },
  },
  "Leadership & Programmes": {
    short: "Leadership",
    proof: { label: "EGA, Bekwai Youth Movement & more", href: "/leadership" },
  },
};

function tier(level: number) {
  if (level >= 90) return { label: "Expert", cls: "bg-gold/20 text-gold-soft ring-gold/40" };
  if (level >= 80) return { label: "Advanced", cls: "bg-accent/20 text-accent-soft ring-accent-soft/30" };
  return { label: "Proficient", cls: "bg-white/10 text-on-dark ring-white/20" };
}

const R = 110;
const N = SKILL_GROUPS.length;
const point = (i: number, r: number) => {
  const a = (-90 + (360 / N) * i) * (Math.PI / 180);
  return [Math.cos(a) * r, Math.sin(a) * r] as const;
};

function Radar({ active, onSelect, shown }: { active: number; onSelect: (i: number) => void; shown: boolean }) {
  const shape = SKILL_GROUPS.map((g, i) => point(i, (g.level / 100) * R).join(",")).join(" ");
  return (
    <svg viewBox="-240 -160 480 320" className="w-full max-w-[26rem]" role="img" aria-label="Capability radar chart">
      <defs>
        <radialGradient id="radar-fill" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="scale(130)">
          <stop offset="0%" stopColor="#7fd6d2" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#1e8a95" stopOpacity="0.18" />
        </radialGradient>
      </defs>

      {/* Rings + axes */}
      {[0.25, 0.5, 0.75, 1].map((s) => (
        <polygon
          key={s}
          points={SKILL_GROUPS.map((_, i) => point(i, R * s).join(",")).join(" ")}
          fill="none"
          stroke="rgba(255,255,255,0.09)"
          strokeDasharray={s === 1 ? undefined : "3 4"}
        />
      ))}
      {SKILL_GROUPS.map((_, i) => {
        const [x, y] = point(i, R);
        return <line key={i} x1={0} y1={0} x2={x} y2={y} stroke={i === active ? "rgba(127,214,210,0.55)" : "rgba(255,255,255,0.08)"} />;
      })}

      {/* Shape */}
      <g className={cn("radar-shape", shown && "is-shown")}>
        <polygon points={shape} fill="url(#radar-fill)" stroke="#7fd6d2" strokeWidth="2" strokeLinejoin="round" />
        {SKILL_GROUPS.map((g, i) => {
          const [x, y] = point(i, (g.level / 100) * R);
          return (
            <g key={g.area}>
              {i === active ? <circle cx={x} cy={y} r="11" fill="#7fd6d2" opacity="0.25" className="radar-pulse" /> : null}
              <circle cx={x} cy={y} r={i === active ? 5.5 : 4} fill={i === active ? "#e7c987" : "#7fd6d2"} stroke="#0a1a30" strokeWidth="2" />
            </g>
          );
        })}
      </g>

      {/* Labels (clickable) */}
      {SKILL_GROUPS.map((g, i) => {
        const [x, y] = point(i, R + 26);
        const anchor = Math.abs(x) < 8 ? "middle" : x > 0 ? "start" : "end";
        return (
          <g key={g.area} onClick={() => onSelect(i)} className="cursor-pointer">
            <text
              x={x}
              y={y - 4}
              textAnchor={anchor}
              className={cn("text-[14px] font-bold uppercase tracking-[0.06em] transition", i === active ? "fill-white" : "fill-[#9fb0c2]")}
            >
              {META[g.area]?.short ?? g.area}
            </text>
            <text x={x} y={y + 13} textAnchor={anchor} className={cn("text-[14px] font-bold", i === active ? "fill-[#e7c987]" : "fill-[#7fd6d2]")}>
              {g.level}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function SkillsMatrix({ clientCount }: { clientCount: number }) {
  const [active, setActive] = useState(SKILL_GROUPS.findIndex((g) => g.level === Math.max(...SKILL_GROUPS.map((s) => s.level))));
  const [shown, setShown] = useState(false);
  const radarRef = useRef<HTMLDivElement>(null);
  const power = Math.round(SKILL_GROUPS.reduce((n, g) => n + g.level, 0) / N);
  const totalSkills = SKILL_GROUPS.reduce((n, g) => n + g.skills.length, 0);

  useEffect(() => {
    const el = radarRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setShown(true);
        io.disconnect();
      }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden bg-navy-950 text-on-dark">
      <div className="data-grid-light pointer-events-none absolute inset-0 opacity-[0.35]" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-gold/10 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          {/* Left: headline + radar */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.24em] text-accent-soft">
              <Sparkles size={13} aria-hidden="true" /> Capabilities
            </p>
            <h2 className="font-display mt-3 text-balance text-3xl font-bold tracking-[-0.035em] text-white md:text-4xl lg:text-[2.7rem] lg:leading-[1.08]">
              A technical toolkit built for{" "}
              <span className="bg-gradient-to-r from-accent-soft via-accent-bright to-gold-soft bg-clip-text text-transparent">
                real-world impact
              </span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-8 text-on-dark-muted">
              Equally at home in a research notebook and a production codebase, from model design to deployed
              application, and from data pipeline to programme delivery.
            </p>

            <div ref={radarRef} className="relative mt-8 rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-on-dark-muted">Power level</p>
                  <p className="font-display text-4xl font-black text-white">
                    {power}
                    <span className="ml-1 text-base font-bold text-accent-soft">/100</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-on-dark-muted">Skills mapped</p>
                  <p className="font-display text-4xl font-black text-white">{totalSkills}</p>
                </div>
              </div>
              <div className="mt-2 flex justify-center">
                <Radar active={active} onSelect={setActive} shown={shown} />
              </div>
            </div>

            <Link
              href="/about/cv"
              className="btn-accent mt-8 inline-flex min-h-12 items-center gap-2 rounded-full px-6 text-xs font-black uppercase tracking-[0.14em] transition hover:-translate-y-0.5"
            >
              <FileText size={15} aria-hidden="true" />
              Full skills in my CV
            </Link>
          </div>

          {/* Right: skill rows */}
          <ul className="flex flex-col gap-3">
            {SKILL_GROUPS.map((group, i) => {
              const Icon = ICONS[group.icon] ?? Code2;
              const open = i === active;
              const t = tier(group.level);
              const meta = META[group.area];
              const circ = 2 * Math.PI * 20;
              return (
                <li
                  key={group.area}
                  className={cn(
                    "group rounded-[1.5rem] border transition duration-300",
                    open
                      ? "border-accent-soft/40 bg-gradient-to-br from-white/[0.09] to-white/[0.02] shadow-[0_20px_60px_-30px_rgba(127,214,210,0.5)]"
                      : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-expanded={open}
                    className="flex w-full items-center gap-4 p-4 text-left sm:p-5"
                  >
                    <span className="relative grid h-12 w-12 shrink-0 place-items-center">
                      <svg viewBox="0 0 48 48" className="absolute inset-0 -rotate-90" aria-hidden="true">
                        <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                        <circle
                          cx="24"
                          cy="24"
                          r="20"
                          fill="none"
                          stroke={open ? "#e7c987" : "#7fd6d2"}
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeDasharray={circ}
                          strokeDashoffset={shown ? circ * (1 - group.level / 100) : circ}
                          style={{ transition: `stroke-dashoffset 1200ms cubic-bezier(0.22,1,0.36,1) ${i * 120}ms` }}
                        />
                      </svg>
                      <Icon size={19} className={open ? "text-gold-soft" : "text-accent-soft"} aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold text-white sm:text-[15px]">{group.area}</span>
                      <span className="mt-1.5 flex items-center gap-2">
                        <span className={cn("rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.16em] ring-1", t.cls)}>
                          {t.label}
                        </span>
                        <span className="text-[11px] text-on-dark-muted">{group.skills.length} skills</span>
                      </span>
                    </span>
                    <span className="font-display text-2xl font-black tabular-nums text-white">
                      {group.level}
                      <span className="text-sm text-accent-soft">%</span>
                    </span>
                    <ChevronDown
                      size={18}
                      className={cn("shrink-0 text-on-dark-muted transition-transform duration-300", open && "rotate-180 text-white")}
                      aria-hidden="true"
                    />
                  </button>

                  <div className={cn("accordion-grid", open && "open")}>
                    <div className="accordion-inner">
                      <div className="px-4 pb-5 sm:px-5">
                        <SkillMeter value={group.level} label={group.area} />
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {group.skills.map((skill, k) => (
                            <li
                              key={skill}
                              className="skill-chip rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-medium text-on-dark"
                              style={{ animationDelay: `${k * 60}ms` }}
                            >
                              {skill}
                            </li>
                          ))}
                        </ul>
                        {meta ? (
                          <Link
                            href={meta.proof.href}
                            className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 text-xs font-bold text-gold-soft transition hover:bg-gold/20"
                          >
                            <span className="text-[9px] font-black uppercase tracking-[0.18em] text-gold">Proof</span>
                            {meta.proof.label.replace("{n}", String(clientCount))}
                            <ArrowUpRight size={14} aria-hidden="true" />
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
