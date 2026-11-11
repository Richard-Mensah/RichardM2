"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Pause, Play, Target } from "lucide-react";
import { PRIORITY_GOALS, SDG_COLOURS } from "@/constants";
import { cn } from "@/lib/utils";

/**
 * Evidence for each priority goal: the official UN target it serves, a real photo,
 * and links to work on this site that shows it in practice.
 */
const EVIDENCE: Record<
  string,
  { target: { code: string; text: string }; image: string; alt: string; objectTop?: boolean; proof: { label: string; href: string }[] }
> = {
  "SDG 4": {
    target: {
      code: "4.4",
      text: "Substantially increase the number of youth and adults who have relevant skills, including technical and vocational skills, for employment, decent jobs and entrepreneurship.",
    },
    image: "/community/school-outreach-1.jpg",
    alt: "Richard Mensah speaking to students during a school outreach session",
    proof: [
      { label: "STEM outreach & teaching in Sefwi Bekwai", href: "/leadership/community" },
      { label: "EGA Mentorship: AI & digital skills programme", href: "/leadership/ega" },
    ],
  },
  "SDG 8": {
    target: {
      code: "8.6",
      text: "Substantially reduce the proportion of youth not in employment, education or training.",
    },
    image: "/work/moncare-uk-desktop.jpg",
    alt: "MonCare Healthcare Agency website built by Richard Mensah",
    objectTop: true,
    proof: [
      { label: "MonCare OS: recruitment, scheduling & pay for care workers", href: "/work#moncare-os" },
      { label: "Portfolio sites opening international opportunities", href: "/work" },
    ],
  },
  "SDG 9": {
    target: {
      code: "9.5",
      text: "Enhance scientific research and upgrade the technological capabilities of industrial sectors, encouraging innovation.",
    },
    image: "/gallery/FB_IMG_1744840775657.jpg",
    alt: "Richard Mensah at an international innovation forum",
    proof: [
      { label: "{n} live websites & software products shipped", href: "/work" },
      { label: "Applied AI & data science research", href: "/research/ai-data-science" },
    ],
  },
  "SDG 13": {
    target: {
      code: "13.3",
      text: "Improve education, awareness-raising and human and institutional capacity on climate change mitigation, adaptation, impact reduction and early warning.",
    },
    image: "/research/ai-climate-change-satellite.jpg",
    alt: "Satellite imagery used for climate analysis",
    proof: [
      { label: "Climate Signal Observatory concept", href: "/projects/climate" },
      { label: "Research: AI for climate change", href: "/research/ai-climate-change" },
    ],
  },
  "SDG 16": {
    target: {
      code: "16.7",
      text: "Ensure responsive, inclusive, participatory and representative decision-making at all levels.",
    },
    image: "/leadership/unya-parliament-house.jpg",
    alt: "Youth delegates gathered outside Ghana's Parliament House",
    proof: [
      { label: "Bekwai Youth Movement: youth parliament & open finances", href: "/leadership/sefwi-bekwai" },
      { label: "Responsible AI & thought leadership", href: "/research/thought-leadership" },
    ],
  },
  "SDG 17": {
    target: {
      code: "17.17",
      text: "Encourage and promote effective public, public-private and civil society partnerships.",
    },
    image: "/gallery/FB_IMG_1746893921870.jpg",
    alt: "International delegates at a global youth summit",
    proof: [
      { label: "Conferences, summits & youth diplomacy", href: "/about/conferences" },
      { label: "Research collaborations across Ghana, the UK & beyond", href: "/research/collaborations" },
    ],
  },
};

const PRIORITY = new Set(PRIORITY_GOALS.map((g) => g.code.replace("SDG ", "")));
const AUTOPLAY_MS = 6500;

function arc(i: number, rIn: number, rOut: number) {
  const step = 360 / 17;
  const gap = 1.6;
  const a0 = ((-90 + i * step + gap / 2) * Math.PI) / 180;
  const a1 = ((-90 + (i + 1) * step - gap / 2) * Math.PI) / 180;
  const p = (r: number, a: number) => `${(Math.cos(a) * r).toFixed(2)} ${(Math.sin(a) * r).toFixed(2)}`;
  return `M ${p(rOut, a0)} A ${rOut} ${rOut} 0 0 1 ${p(rOut, a1)} L ${p(rIn, a1)} A ${rIn} ${rIn} 0 0 0 ${p(rIn, a0)} Z`;
}

function labelPos(i: number, r: number) {
  const a = ((-90 + (i + 0.5) * (360 / 17)) * Math.PI) / 180;
  return { x: Math.cos(a) * r, y: Math.sin(a) * r };
}

export default function SdgExplorer({ clientCount }: { clientCount: number }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const goal = PRIORITY_GOALS[active];
  const ev = EVIDENCE[goal.code];
  const activeNum = goal.code.replace("SDG ", "");

  // Respect reduced motion: never autoplay.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => setPlaying(false));
      return () => cancelAnimationFrame(id);
    }
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || !inView) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % PRIORITY_GOALS.length), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [active, playing, inView]);

  const select = (i: number) => {
    setActive(i);
    setPlaying(false);
  };
  const selectByNumber = (n: string) => {
    const i = PRIORITY_GOALS.findIndex((g) => g.code === `SDG ${n}`);
    if (i >= 0) select(i);
  };

  return (
    <section ref={ref} className="relative overflow-hidden border-y border-line bg-surface-card">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] transition-colors duration-700" style={{ background: `radial-gradient(60rem 30rem at 15% 40%, ${goal.color}, transparent 70%)` }} aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow">SDG alignment</p>
            <h2 className="font-display mt-3 text-balance text-3xl font-bold tracking-[-0.035em] text-ink md:text-4xl lg:text-[2.7rem]">
              The global goals my work moves
            </h2>
            <p className="mt-4 text-base leading-8 text-body">
              Not all seventeen. Just the six where AI, education and climate action make a measurable difference,
              each tied to an official UN target and to real work you can open. Tap a goal on the wheel.
            </p>
          </div>
          <Link
            href="/sdgs"
            className="btn-primary inline-flex min-h-12 items-center gap-2 rounded-full px-6 text-xs font-black uppercase tracking-[0.14em] transition hover:-translate-y-0.5"
          >
            Full SDG impact
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-14">
          {/* Wheel */}
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-[25rem]">
              <svg viewBox="-162 -162 324 324" className="w-full" role="img" aria-label="Wheel of the 17 Sustainable Development Goals, six highlighted">
                {SDG_COLOURS.map((s, i) => {
                  const isPriority = PRIORITY.has(s.number);
                  const isActive = s.number === activeNum;
                  const lp = labelPos(i, isActive ? 116 : 104);
                  return (
                    <g
                      key={s.number}
                      onClick={isPriority ? () => selectByNumber(s.number) : undefined}
                      className={cn("sdg-seg", isPriority && "cursor-pointer")}
                      style={{ opacity: isPriority ? 1 : 0.18 }}
                    >
                      <title>{`SDG ${s.number}: ${s.name}${isPriority ? "" : " (not a focus goal)"}`}</title>
                      <path
                        d={arc(i, isActive ? 80 : 76, isActive ? 146 : 130)}
                        fill={s.color}
                        className="transition-all duration-500"
                        style={isActive ? { filter: `drop-shadow(0 6px 14px ${s.color}88)` } : undefined}
                      />
                      <text
                        x={lp.x}
                        y={lp.y}
                        textAnchor="middle"
                        dominantBaseline="central"
                        className="pointer-events-none fill-white text-[13px] font-black"
                      >
                        {s.number}
                      </text>
                    </g>
                  );
                })}
                {/* Centre */}
                <circle r="68" className="fill-surface-card" />
                <circle r="68" fill="none" stroke={goal.color} strokeOpacity="0.25" strokeWidth="1.5" />
                {playing && inView ? (
                  <circle
                    key={`ring-${active}`}
                    r="62"
                    fill="none"
                    stroke={goal.color}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 62}
                    transform="rotate(-90)"
                    className="sdg-timer"
                    style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
                  />
                ) : null}
              </svg>
              <div className="pointer-events-none absolute inset-0 grid place-items-center">
                <div key={goal.code} className="reveal-up text-center">
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-muted">Goal</p>
                  <p className="font-display text-5xl font-black leading-none sm:text-6xl" style={{ color: goal.color }}>
                    {activeNum}
                  </p>
                  <p className="mx-auto mt-1 max-w-[7.5rem] text-[11px] font-bold leading-tight text-ink-soft">{goal.title}</p>
                </div>
              </div>
            </div>

            {/* Accessible selector */}
            <div role="tablist" aria-label="Priority Sustainable Development Goals" className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {PRIORITY_GOALS.map((g, i) => {
                const selected = i === active;
                return (
                  <button
                    key={g.code}
                    role="tab"
                    id={`sdg-tab-${i}`}
                    aria-selected={selected}
                    aria-controls="sdg-panel"
                    aria-label={`${g.code}: ${g.title}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => select(i)}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                        e.preventDefault();
                        select((active + 1) % PRIORITY_GOALS.length);
                      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                        e.preventDefault();
                        select((active - 1 + PRIORITY_GOALS.length) % PRIORITY_GOALS.length);
                      }
                    }}
                    className={cn(
                      "grid h-11 w-11 place-items-center rounded-xl text-sm font-black text-white transition duration-300",
                      selected ? "scale-110 shadow-lg" : "opacity-60 hover:opacity-100",
                    )}
                    style={{ backgroundColor: g.color, boxShadow: selected ? `0 10px 24px -8px ${g.color}` : undefined }}
                  >
                    {g.code.replace("SDG ", "")}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Pause goal tour" : "Play goal tour"}
                className="grid h-11 w-11 place-items-center rounded-xl border border-line-strong text-ink-soft transition hover:border-accent hover:text-accent-strong"
              >
                {playing ? <Pause size={16} /> : <Play size={16} />}
              </button>
            </div>
          </div>

          {/* Detail panel */}
          <div
            id="sdg-panel"
            role="tabpanel"
            aria-labelledby={`sdg-tab-${active}`}
            className="overflow-hidden rounded-[1.75rem] border border-line bg-surface shadow-[0_30px_70px_-40px_rgba(10,26,48,0.45)]"
          >
            <div className="relative h-52 overflow-hidden sm:h-60">
              {PRIORITY_GOALS.map((g) => {
                const e = EVIDENCE[g.code];
                return (
                  <Image
                    key={g.code}
                    src={e.image}
                    alt={g.code === goal.code ? e.alt : ""}
                    fill
                    sizes="(min-width: 1024px) 600px, 100vw"
                    className={cn(
                      "object-cover transition-all duration-700",
                      e.objectTop && "object-top",
                      g.code === goal.code ? "scale-100 opacity-100" : "scale-105 opacity-0",
                    )}
                  />
                );
              })}
              <div className="absolute inset-0 transition-colors duration-700" style={{ background: `linear-gradient(135deg, ${goal.color}e6 0%, ${goal.color}99 35%, rgba(10,26,48,0.35) 100%)` }} aria-hidden="true" />
              <div className="absolute inset-x-0 bottom-0 flex items-end gap-4 p-5 sm:p-6">
                <span key={goal.code} className="reveal-up grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-white text-2xl font-black shadow-xl" style={{ color: goal.color }}>
                  {activeNum}
                </span>
                <div className="min-w-0 text-white">
                  <p className="text-[11px] font-black uppercase tracking-[0.24em] text-white/80">
                    {goal.code} · Goal {active + 1} of {PRIORITY_GOALS.length}
                  </p>
                  <h3 className="font-display mt-1 text-xl font-bold leading-tight sm:text-2xl">{goal.title}</h3>
                </div>
              </div>
            </div>

            <div key={`${goal.code}-body`} className="reveal-up p-5 sm:p-7">
              <p className="text-base leading-8 text-ink-soft">{goal.contribution}</p>

              <div className="mt-5 rounded-2xl border-l-4 bg-surface-card p-4" style={{ borderColor: goal.color }}>
                <p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: goal.color }}>
                  <Target size={12} aria-hidden="true" /> UN target {ev.target.code}
                </p>
                <p className="mt-1.5 text-sm leading-6 text-body">{ev.target.text}</p>
              </div>

              <p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted">Where it shows up</p>
              <ul className="mt-2 divide-y divide-line">
                {ev.proof.map((p) => (
                  <li key={p.label}>
                    <Link href={p.href} className="group flex min-h-12 items-center justify-between gap-3 py-2.5 text-sm font-semibold text-ink transition hover:text-accent-strong">
                      <span className="flex items-center gap-2.5">
                        <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: goal.color }} aria-hidden="true" />
                        {p.label.replace("{n}", String(clientCount))}
                      </span>
                      <ArrowUpRight size={16} className="shrink-0 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
