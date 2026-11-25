"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import {
  BookOpen,
  BrainCircuit,
  ChartColumn,
  Compass,
  Globe2,
  Lock,
  Rocket,
  Sprout,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";

type Level = {
  title: string;
  places: string;
  body: string;
  badge: string;
  icon: LucideIcon;
  color: string;
};

const LEVELS: Level[] = [
  {
    title: "Roots",
    places: "Paboase · Surano 'A' · Sefwi Bekwai",
    body: "Born in Paboase and raised across Surano 'A' and Sefwi Bekwai Lowcost, where the first questions about opportunity took shape.",
    badge: "Origin story",
    icon: Sprout,
    color: "#3fa34d",
  },
  {
    title: "Foundations",
    places: "Surano 'A' Anglican JHS · Bibiani SHTS",
    body: "Basic education at Surano 'A' Anglican JHS (St. Stephen's), then Bibiani Senior High Technical School.",
    badge: "Scholar",
    icon: BookOpen,
    color: "#2f6bea",
  },
  {
    title: "The pivot",
    places: "University of Education, Winneba",
    body: "Chose purpose over comfort: left a programme that did not fit his aspirations and started afresh at UEW, determined to raise the standard of rural education.",
    badge: "Course corrector",
    icon: Compass,
    color: "#e8a33d",
  },
  {
    title: "Educator & changemaker",
    places: "Winneba · Western North Region",
    body: "Community development, volunteer teaching and sanitation drives, while supporting his supervisor in teaching and administration through Levels 300 and 400.",
    badge: "Changemaker",
    icon: Users,
    color: "#e5243b",
  },
  {
    title: "Knowledge investment",
    places: "ALX Africa · Azubi Africa",
    body: "Turned a passion for technology into a data career: the ALX Data Science Programme and Azubi Africa's Data Analytics programme with a Machine Learning focus.",
    badge: "Data wrangler",
    icon: ChartColumn,
    color: "#19486a",
  },
  {
    title: "Builder",
    places: "Center for Analytics Services",
    body: "Founded and led a data and analytics practice, putting new skills to work for real clients.",
    badge: "Founder",
    icon: Rocket,
    color: "#fd6925",
  },
  {
    title: "Global lens",
    places: "IGNOU, India · RUDN University, Russia",
    body: "MA in Industrial & Organisational Psychology, and a Certificate in International & Intercultural Communication: people, behaviour and cultures.",
    badge: "Bridge builder",
    icon: Globe2,
    color: "#8b5cf6",
  },
  {
    title: "Mastery",
    places: "Bangor University, United Kingdom",
    body: "MSc in Artificial Intelligence & Data Science, and now building AI for climate, education and youth opportunity from the UK.",
    badge: "AI practitioner",
    icon: BrainCircuit,
    color: "#0a97d9",
  },
];

const XP_PER_LEVEL = 125;
const ALL_LEVELS = new Set(LEVELS.map((_, i) => i));
const MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeMotion(onChange: () => void) {
  const mq = window.matchMedia(MOTION_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function prefersStatic() {
  return window.matchMedia(MOTION_QUERY).matches || typeof IntersectionObserver === "undefined";
}

/** Scroll-driven "quest log" of Richard's journey: each level unlocks as it enters the viewport. */
export default function JourneyQuest() {
  const [seen, setSeen] = useState<Set<number>>(() => new Set());
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  // Reduced motion (or no IntersectionObserver): show everything unlocked straight away.
  const showAll = useSyncExternalStore(subscribeMotion, prefersStatic, () => false);
  const unlocked = showAll ? ALL_LEVELS : seen;

  useEffect(() => {
    if (showAll) return;
    const io = new IntersectionObserver(
      (entries) => {
        const hits = entries.filter((e) => e.isIntersecting).map((e) => Number((e.target as HTMLElement).dataset.level));
        if (hits.length) setSeen((prev) => new Set([...prev, ...hits]));
      },
      { rootMargin: "0px 0px -25% 0px", threshold: 0.4 },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [showAll]);

  const count = unlocked.size;
  const pct = Math.round((count / LEVELS.length) * 100);
  const complete = count === LEVELS.length;

  return (
    <section aria-labelledby="quest-heading" className="relative overflow-hidden bg-navy-950 px-5 py-16 text-white md:px-8 md:py-24">
      <div className="data-grid-light pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-accent-soft">The journey, level by level</p>
            <h2 id="quest-heading" className="font-display mt-4 text-balance text-3xl font-black tracking-[-0.04em] md:text-5xl">
              Eight levels from Paboase to AI.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-on-dark-muted">
              Scroll to unlock each chapter of the story and the badge earned along the way.
            </p>
          </div>

          {/* XP bar */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur" aria-live="polite">
            <div className="flex items-baseline justify-between text-xs font-black uppercase tracking-[0.18em]">
              <span className="text-accent-soft">Level {Math.max(count, 1)} / {LEVELS.length}</span>
              <span className="tabular-nums text-on-dark-muted">{count * XP_PER_LEVEL} XP</span>
            </div>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="Journey progress">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#3fa34d] via-[#e8a33d] to-[#0a97d9] transition-[width] duration-700 ease-out"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="mt-3 text-sm font-semibold text-white">
              {complete ? (
                <span className="inline-flex items-center gap-2 text-[#ffd166]">
                  <Trophy size={16} aria-hidden="true" /> Achievement unlocked: Full story
                </span>
              ) : (
                `${LEVELS.length - count} level${LEVELS.length - count === 1 ? "" : "s"} to go`
              )}
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_0.62fr]">
          {/* Level path */}
          <ol className="relative space-y-5 before:absolute before:bottom-6 before:left-[1.45rem] before:top-6 before:w-px before:bg-white/15">
            {LEVELS.map((lv, i) => {
              const on = unlocked.has(i);
              const Icon = on ? lv.icon : Lock;
              return (
                <li
                  key={lv.title}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  data-level={i}
                  className="relative flex min-w-0 gap-4"
                >
                  <span
                    className={`relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-2xl ring-2 transition-all duration-500 ${
                      on ? "scale-100 text-white shadow-lg" : "scale-90 bg-navy-900 text-white/40 ring-white/15"
                    }`}
                    style={on ? { backgroundColor: lv.color, boxShadow: `0 0 0 4px ${lv.color}33, 0 10px 30px -10px ${lv.color}` } : undefined}
                    aria-hidden="true"
                  >
                    <Icon size={20} />
                  </span>
                  <div
                    className={`min-w-0 flex-1 rounded-2xl border p-5 transition-all duration-500 ${
                      on ? "translate-y-0 border-white/15 bg-white/[0.06] opacity-100" : "translate-y-2 border-white/5 bg-white/[0.02] opacity-60"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: on ? lv.color : undefined }}>
                        Level {i + 1}
                      </p>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] transition ${
                          on ? "bg-white text-navy-950" : "bg-white/10 text-white/50"
                        }`}
                      >
                        {on ? `Badge: ${lv.badge}` : "Locked"}
                      </span>
                    </div>
                    <h3 className="font-display mt-2 text-xl font-bold">{lv.title}</h3>
                    <p className="mt-1 text-xs font-semibold text-accent-soft">{lv.places}</p>
                    <p className="mt-3 text-sm leading-6 text-on-dark-muted">{lv.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Player card */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <figure className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 shadow-2xl">
              <div className="relative aspect-[3/4]">
                <Image
                  src="/gallery/pulse-of-the-earth-2.jpg"
                  alt="Richard Mensah at the Pulse of the Earth climate exhibition"
                  fill
                  className="object-cover object-[50%_65%]"
                  sizes="(min-width: 1024px) 34vw, 92vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/10 to-transparent" aria-hidden="true" />
                <span className="absolute left-4 top-4 rounded-full bg-[#0a97d9] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white shadow">
                  Current level · {LEVELS.length}
                </span>
                <figcaption className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-display text-2xl font-black">Richard Mensah</p>
                  <p className="text-sm font-semibold text-accent-soft">Kofi Richard · AI &amp; Data Scientist</p>
                </figcaption>
              </div>
              <div className="p-5">
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-on-dark-muted">Badges earned</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {LEVELS.map((lv, i) => (
                    <li
                      key={lv.badge}
                      title={lv.badge}
                      className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.1em] transition duration-500 ${
                        unlocked.has(i) ? "text-white" : "bg-white/5 text-white/30"
                      }`}
                      style={unlocked.has(i) ? { backgroundColor: `${lv.color}cc` } : undefined}
                    >
                      {lv.badge}
                    </li>
                  ))}
                </ul>
              </div>
            </figure>
          </aside>
        </div>
      </div>
    </section>
  );
}
