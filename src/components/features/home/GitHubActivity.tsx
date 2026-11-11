"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import {
  ArrowUpRight,
  Award,
  BrainCircuit,
  CalendarDays,
  Code2,
  Flame,
  FolderGit2,
  GitCommitHorizontal,
  Lock,
  Star,
  Trophy,
  Zap,
} from "lucide-react";
import CountUp from "@/components/ui/CountUp";
import { cn } from "@/lib/utils";
import { TRACK_META, type ClassifiedRepo, type TrackStats } from "@/lib/githubTracks";
import type { ContributionDay, GitHubActivity as Activity } from "@/lib/github";

const PROFILE = "https://github.com/Richard-Mensah";
const HEAT = ["rgba(255,255,255,0.06)", "#145c63", "#1e8a95", "#2ba8b4", "#7fd6d2"];
const RANKS = ["Rookie", "Apprentice", "Builder", "Maker", "Engineer", "Architect", "Innovator", "Pioneer", "Legend", "Mythic", "Titan"];

type Filter = "all" | "ai" | "web";

/** Mount flag: relative times ("3d ago") are computed only in the browser to avoid hydration drift. */
function useMounted() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setM(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return m;
}

function ago(iso: string | null, mounted: boolean) {
  if (!iso) return "—";
  const t = Date.parse(iso);
  if (!mounted) return new Date(t).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  const s = Math.max(0, (Date.now() - t) / 1000);
  if (s < 3600) return `${Math.max(1, Math.round(s / 60))}m ago`;
  if (s < 86400) return `${Math.round(s / 3600)}h ago`;
  if (s < 86400 * 30) return `${Math.round(s / 86400)}d ago`;
  if (s < 86400 * 365) return `${Math.round(s / (86400 * 30))}mo ago`;
  return `${Math.round(s / (86400 * 365))}y ago`;
}

function fmtDay(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}

function useInView<T extends Element>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setSeen(true);
        io.disconnect();
      }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen] as const;
}

/* ── Heatmap ─────────────────────────────────────────────────────────── */

function Heatmap({ weeks, busiest, total }: { weeks: ContributionDay[][]; busiest: ContributionDay | null; total: number }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.25);
  const scroller = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<{ day: ContributionDay; x: number; y: number } | null>(null);
  const lastDate = weeks.at(-1)?.filter((d) => d.date).at(-1)?.date;

  // On narrow screens start scrolled to the most recent weeks.
  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, []);

  const months = useMemo(() => {
    const out: { col: number; label: string }[] = [];
    let prev = "";
    weeks.forEach((w, i) => {
      const first = w.find((d) => d.date);
      if (!first) return;
      const m = new Date(`${first.date}T00:00:00Z`).toLocaleDateString("en-GB", { month: "short", timeZone: "UTC" });
      if (m !== prev && (out.length === 0 || i - out[out.length - 1].col > 2)) out.push({ col: i, label: m });
      prev = m;
    });
    return out;
  }, [weeks]);

  function show(target: EventTarget | null) {
    const el = target as HTMLElement | null;
    const idx = el?.dataset?.cell;
    if (!el || idx === undefined || !scroller.current) return;
    const [w, d] = idx.split("-").map(Number);
    const day = weeks[w]?.[d];
    if (!day?.date) return;
    const box = scroller.current.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    setTip({ day, x: r.left - box.left + scroller.current.scrollLeft + r.width / 2, y: r.top - box.top });
  }

  return (
    <div ref={ref} className="relative">
      <div
        ref={scroller}
        className="no-scrollbar relative overflow-x-auto pb-1"
        onMouseOver={(e) => show(e.target)}
        onFocus={(e) => show(e.target)}
        onClick={(e) => show(e.target)}
        onMouseLeave={() => setTip(null)}
        role="img"
        aria-label={`Contribution calendar: ${total} contributions in the last year${busiest ? `, busiest day ${fmtDay(busiest.date)} with ${busiest.count}` : ""}.`}
      >
        <div className="heat-grid relative w-max pt-5">
          {/* Month labels */}
          <div className="absolute left-0 top-0 h-4 text-[10px] font-semibold text-on-dark-muted" aria-hidden="true">
            {months.map((m) => (
              <span key={`${m.col}-${m.label}`} className="absolute" style={{ left: `calc(${m.col} * (var(--cell) + 3px))` }}>
                {m.label}
              </span>
            ))}
          </div>
          <div className="grid grid-flow-col gap-[3px]" style={{ gridTemplateRows: "repeat(7, var(--cell))" }}>
            {weeks.map((w, wi) =>
              w.map((d, di) =>
                d.date ? (
                  <span
                    key={d.date}
                    data-cell={`${wi}-${di}`}
                    tabIndex={-1}
                    className={cn(
                      "heat-cell heat-size rounded-[3px]",
                      seen && "is-shown",
                      d.date === lastDate && "heat-today",
                      busiest && d.date === busiest.date && "heat-best",
                    )}
                    style={{ backgroundColor: HEAT[d.level], "--d": `${wi * 14 + di * 6}ms` } as CSSProperties}
                  />
                ) : (
                  <span key={`pad-${wi}-${di}`} className="heat-size" aria-hidden="true" />
                ),
              ),
            )}
          </div>
        </div>
        {tip ? (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg bg-white px-2.5 py-1.5 text-[11px] font-semibold text-navy-950 shadow-xl"
            style={{ left: tip.x, top: tip.y + 14 }}
          >
            <strong>{tip.day.count === 0 ? "No" : tip.day.count}</strong> contribution{tip.day.count === 1 ? "" : "s"} · {fmtDay(tip.day.date)}
          </div>
        ) : null}
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-[11px] text-on-dark-muted">
        <span>
          {busiest ? (
            <>
              <span className="mr-1 inline-block h-2.5 w-2.5 rounded-[2px] bg-gold-soft align-middle" aria-hidden="true" />
              Personal best: <strong className="text-white">{busiest.count}</strong> on {fmtDay(busiest.date)}
            </>
          ) : null}
        </span>
        <span className="flex items-center gap-1.5" aria-hidden="true">
          Less
          {HEAT.map((c) => (
            <span key={c} className="h-2.5 w-2.5 rounded-[2px]" style={{ backgroundColor: c }} />
          ))}
          More
        </span>
      </div>
    </div>
  );
}

/* ── Skill tree card ─────────────────────────────────────────────────── */

function TrackCard({ s, mounted, active, onSelect }: { s: TrackStats; mounted: boolean; active: boolean; onSelect: () => void }) {
  const meta = TRACK_META[s.track];
  const Icon = s.track === "ai" ? BrainCircuit : Code2;
  const circ = 2 * Math.PI * 30;
  const [ref, seen] = useInView<HTMLDivElement>(0.3);
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex min-w-0 flex-col overflow-hidden rounded-[1.75rem] border bg-surface-card p-5 transition duration-300 sm:p-6",
        active ? "border-transparent shadow-[0_24px_60px_-28px_var(--track)]" : "border-line hover:-translate-y-0.5",
      )}
      style={{ "--track": meta.color, boxShadow: active ? `0 0 0 2px ${meta.color}, 0 24px 60px -28px ${meta.color}` : undefined } as CSSProperties}
    >
      <span className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: meta.color }} aria-hidden="true" />
      <div className="flex items-start gap-4">
        <div className="relative grid h-[76px] w-[76px] shrink-0 place-items-center">
          <svg viewBox="0 0 76 76" className="absolute inset-0 -rotate-90" aria-hidden="true">
            <circle cx="38" cy="38" r="30" fill="none" stroke="var(--color-surface-sunken)" strokeWidth="6" />
            <circle
              cx="38"
              cy="38"
              r="30"
              fill="none"
              stroke={meta.color}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={seen ? circ * (1 - s.progress) : circ}
              style={{ transition: "stroke-dashoffset 1400ms cubic-bezier(0.22,1,0.36,1)" }}
            />
          </svg>
          <span className="grid h-12 w-12 place-items-center rounded-full text-white" style={{ backgroundColor: meta.color }}>
            <Icon size={22} aria-hidden="true" />
          </span>
          <span className="absolute -bottom-1 rounded-full bg-navy-950 px-2 py-0.5 text-[10px] font-black text-white">Lv {s.level}</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: meta.color }}>
            Skill tree
          </p>
          <h3 className="font-display text-xl font-bold leading-tight text-ink">{meta.label}</h3>
          <p className="mt-0.5 text-xs text-muted">Class: {meta.role}</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-xl bg-surface px-2 py-2.5">
          <p className="font-display text-2xl font-black text-ink">
            <CountUp value={String(s.count)} />
          </p>
          <p className="text-[10px] font-semibold text-muted">projects{s.privateCount ? ` · ${s.privateCount} private` : ""}</p>
        </div>
        <div className="rounded-xl bg-surface px-2 py-2.5">
          <p className="font-display text-2xl font-black text-ink">
            <CountUp value={String(s.activeLast90)} />
          </p>
          <p className="text-[10px] font-semibold text-muted">active in 90 days</p>
        </div>
        <div className="rounded-xl bg-surface px-2 py-2.5">
          <p className="font-display text-base font-black leading-8 text-ink">{ago(s.lastPushedAt, mounted)}</p>
          <p className="text-[10px] font-semibold text-muted">last push</p>
        </div>
      </div>

      {s.languages.length ? (
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Top languages">
          {s.languages.slice(0, 4).map((l) => (
            <li key={l.name} className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-[11px] font-semibold text-ink-soft">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: l.color }} aria-hidden="true" />
              {l.name} <span className="text-muted">{l.count}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <ul className="mt-4 space-y-1.5">
        {s.latest.map((r) => (
          <li key={r.name}>
            <a href={r.url} target="_blank" rel="noopener noreferrer" className="group flex min-h-11 items-center gap-2 rounded-xl px-2 text-sm text-ink transition hover:bg-surface">
              <FolderGit2 size={15} className="shrink-0 text-muted" aria-hidden="true" />
              <span className="min-w-0 flex-1 truncate font-semibold">{r.name.replace(/[-_]+/g, " ").trim()}</span>
              <span className="shrink-0 text-[11px] text-muted">{ago(r.pushedAt, mounted)}</span>
              <ArrowUpRight size={14} className="shrink-0 text-muted transition group-hover:text-accent-strong" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onSelect}
        aria-pressed={active}
        className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-full px-4 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:brightness-110"
        style={{ backgroundColor: meta.color }}
      >
        {active ? "Showing these projects" : `Show ${meta.short} projects`}
      </button>
    </div>
  );
}

/* ── Repo marquee ────────────────────────────────────────────────────── */

function RepoChip({ r, mounted }: { r: ClassifiedRepo; mounted: boolean }) {
  const accent = r.track === "ai" || r.track === "web" ? TRACK_META[r.track].color : "#8595a6";
  return (
    <a
      href={r.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex w-[17rem] shrink-0 flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-white/25 hover:bg-white/[0.08]"
    >
      <span className="flex items-center gap-2">
        <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: accent }} aria-hidden="true" />
        <span className="min-w-0 flex-1 truncate text-sm font-bold text-white">{r.name.replace(/[-_]+/g, " ").trim()}</span>
        <ArrowUpRight size={14} className="shrink-0 text-on-dark-muted transition group-hover:text-white" aria-hidden="true" />
      </span>
      <span className="mt-1.5 line-clamp-2 min-h-[2.4em] text-xs leading-[1.2rem] text-on-dark-muted">
        {r.description || (r.track === "ai" ? "Data science & machine learning project" : "Web & software project")}
      </span>
      <span className="mt-3 flex items-center gap-3 text-[11px] text-on-dark-muted">
        {r.language ? (
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: r.languageColor ?? "#8595a6" }} aria-hidden="true" />
            {r.language}
          </span>
        ) : null}
        {r.stars > 0 ? (
          <span className="inline-flex items-center gap-1">
            <Star size={11} aria-hidden="true" /> {r.stars}
          </span>
        ) : null}
        <span className="ml-auto">{ago(r.pushedAt, mounted)}</span>
      </span>
    </a>
  );
}

function MarqueeRow({ repos, reverse, mounted }: { repos: ClassifiedRepo[]; reverse?: boolean; mounted: boolean }) {
  if (!repos.length) return null;
  const dur = Math.max(30, repos.length * 7);
  return (
    <div className="marquee group relative overflow-hidden">
      <div className={cn("marquee-track flex w-max gap-3", reverse && "marquee-reverse")} style={{ animationDuration: `${dur}s` }}>
        {[...repos, ...repos].map((r, i) => (
          <div key={`${r.name}-${i}`} aria-hidden={i >= repos.length ? true : undefined} className="shrink-0">
            <RepoChip r={r} mounted={mounted} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────────────────── */

export default function GitHubActivity({ data }: { data: Activity }) {
  const mounted = useMounted();
  const [filter, setFilter] = useState<Filter>("all");
  const { ai, web } = data.tracks;
  const classified = ai.count + web.count;
  const aiPct = classified ? Math.round((ai.count / classified) * 100) : 50;

  const filtered = useMemo(() => (filter === "all" ? data.repos : data.repos.filter((r) => r.track === filter)), [filter, data.repos]);
  const rowA = filtered.filter((_, i) => i % 2 === 0);
  const rowB = filtered.filter((_, i) => i % 2 === 1);
  const langs = filter === "all" ? data.languages : data.tracks[filter].languages;
  const langTotal = langs.reduce((n, l) => n + l.count, 0) || 1;
  const [langRef, langSeen] = useInView<HTMLDivElement>(0.3);
  const unlocked = data.badges.filter((b) => b.unlocked).length;
  const latest = data.repos.slice(0, 3);

  const select = (f: Filter) => setFilter((cur) => (cur === f ? "all" : f));

  const hud = [
    { icon: FolderGit2, value: String(data.totalRepos), label: data.privateRepos ? `projects · ${data.privateRepos} private` : "projects on GitHub" },
    { icon: GitCommitHorizontal, value: String(data.totalContributions), label: "contributions this year" },
    { icon: Flame, value: String(data.currentStreak), label: "day current streak" },
    { icon: Zap, value: String(data.longestStreak), label: "day longest streak" },
    { icon: CalendarDays, value: String(data.activeDays), label: "active days" },
  ];

  return (
    <section className="relative overflow-hidden px-5 py-20 md:px-8 md:py-24">
      <div className="pointer-events-none absolute -right-32 top-24 h-[28rem] w-[28rem] rounded-full bg-[#7c5cff]/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-32 bottom-10 h-[26rem] w-[26rem] rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-up opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-up" />
              </span>
              Live from GitHub
            </p>
            <h2 className="font-display mt-3 text-balance text-3xl font-bold tracking-[-0.035em] text-ink md:text-4xl lg:text-[2.7rem]">
              Shipping code every day, across{" "}
              <span className="bg-gradient-to-r from-accent-strong to-[#7c5cff] bg-clip-text text-transparent">AI and software</span>
            </h2>
            <p className="mt-4 text-base leading-7 text-body">
              {data.totalRepos} projects split across two skill trees, from machine-learning notebooks to production web
              platforms. Updated automatically from @Richard-Mensah.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={PROFILE} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-xs font-black uppercase tracking-[0.14em]">
              Follow on GitHub <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <a href={`${PROFILE}?tab=repositories`} target="_blank" rel="noopener noreferrer" className="btn-ghost inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-xs font-black uppercase tracking-[0.14em]">
              All {data.totalRepos} projects
            </a>
          </div>
        </div>

        {/* HUD */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {hud.map(({ icon: Icon, value, label }, i) => (
            <div key={label} className={cn("rounded-2xl border border-line bg-surface-card p-4 shadow-sm", i === 0 && "col-span-2 sm:col-span-1")}>
              <Icon size={18} className={i === 2 ? "text-[#f97316]" : "text-accent-strong"} aria-hidden="true" />
              <p className="font-display mt-2 text-3xl font-black tabular-nums text-ink">
                <CountUp value={value} />
              </p>
              <p className="text-xs font-semibold text-body">{label}</p>
            </div>
          ))}
        </div>

        {/* Console: level + heatmap */}
        <div className="mt-6 overflow-hidden rounded-[2rem] bg-navy-950 p-5 text-white shadow-[0_30px_70px_-35px_rgba(10,26,48,0.7)] sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="legendary-shimmer grid h-11 w-11 place-items-center rounded-xl text-navy-950">
                <Trophy size={20} aria-hidden="true" />
              </span>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-on-dark-muted">Developer level</p>
                <p className="font-display text-lg font-bold">
                  Lv {data.level} · {RANKS[data.level - 1] ?? "Titan"}
                </p>
              </div>
            </div>
            <div className="w-full max-w-sm">
              <div className="flex justify-between text-[11px] font-semibold text-on-dark-muted">
                <span>{data.totalContributions.toLocaleString("en-GB")} XP</span>
                <span>Next level at {data.nextLevelAt.toLocaleString("en-GB")}</span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/10" role="progressbar" aria-label="Progress to next developer level" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(data.levelProgress * 100)}>
                <div className="xp-fill h-full rounded-full" style={{ width: `${Math.round(data.levelProgress * 100)}%` }} />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Heatmap weeks={data.weeks} busiest={data.busiest} total={data.totalContributions} />
          </div>

          {latest.length ? (
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-4 text-xs text-on-dark-muted">
              <span className="font-black uppercase tracking-[0.18em] text-accent-soft">Latest pushes</span>
              {latest.map((r) => (
                <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 transition hover:text-white">
                  <GitCommitHorizontal size={13} aria-hidden="true" />
                  <span className="max-w-[14rem] truncate font-semibold text-white">{r.name}</span>
                  <span>{ago(r.pushedAt, mounted)}</span>
                </a>
              ))}
            </div>
          ) : null}
        </div>

        {/* Skill trees */}
        <div className="mt-10">
          <div className="grid gap-5 lg:grid-cols-2">
            <TrackCard s={ai} mounted={mounted} active={filter === "ai"} onSelect={() => select("ai")} />
            <TrackCard s={web} mounted={mounted} active={filter === "web"} onSelect={() => select("web")} />
          </div>
          {/* Balance meter */}
          <div className="mt-5 rounded-2xl border border-line bg-surface-card p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold">
              <span style={{ color: TRACK_META.ai.color }}>
                {TRACK_META.ai.short} · {aiPct}%
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted">
                {ai.count >= 10 && web.count >= 10 ? "Hybrid builder" : "Skill balance"}
              </span>
              <span style={{ color: TRACK_META.web.color }}>
                {100 - aiPct}% · {TRACK_META.web.short}
              </span>
            </div>
            <div className="mt-2 flex h-3 overflow-hidden rounded-full bg-surface-sunken">
              <span className="h-full transition-all duration-700" style={{ width: `${aiPct}%`, backgroundColor: TRACK_META.ai.color }} />
              <span className="h-full flex-1 transition-all duration-700" style={{ backgroundColor: TRACK_META.web.color }} />
            </div>
          </div>
        </div>

        {/* Filter + languages */}
        <div ref={langRef} className="mt-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div role="tablist" aria-label="Filter projects by track" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:px-0">
            {([
              { k: "all", label: `All · ${data.repos.length}` },
              { k: "ai", label: `${TRACK_META.ai.short} · ${data.repos.filter((r) => r.track === "ai").length}` },
              { k: "web", label: `${TRACK_META.web.short} · ${data.repos.filter((r) => r.track === "web").length}` },
            ] as { k: Filter; label: string }[]).map((t) => (
              <button
                key={t.k}
                type="button"
                role="tab"
                aria-selected={filter === t.k}
                onClick={() => setFilter(t.k)}
                className={cn(
                  "min-h-11 whitespace-nowrap rounded-full border px-4 text-xs font-black uppercase tracking-[0.12em] transition",
                  filter === t.k ? "border-navy-950 bg-navy-950 text-white" : "border-line-strong bg-surface-card text-ink-soft hover:border-accent",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="min-w-0 flex-1 lg:max-w-xl">
            <div className="flex h-2.5 overflow-hidden rounded-full bg-surface-sunken" aria-hidden="true">
              {langs.map((l) => (
                <span
                  key={l.name}
                  className="h-full transition-[width] duration-1000"
                  style={{ width: langSeen ? `${(l.count / langTotal) * 100}%` : "0%", backgroundColor: l.color }}
                />
              ))}
            </div>
            <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-semibold text-body" aria-label="Languages">
              {langs.slice(0, 6).map((l) => (
                <li key={l.name} className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: l.color }} aria-hidden="true" />
                  {l.name} <span className="text-muted">{Math.round((l.count / langTotal) * 100)}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Repo marquee (full bleed) */}
      <div className="relative -mx-5 mt-6 bg-navy-950 py-6 md:-mx-8">
        <div className="marquee-fade pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-navy-950 to-transparent sm:w-32" aria-hidden="true" />
        <div className="marquee-fade pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-navy-950 to-transparent sm:w-32" aria-hidden="true" />
        <div key={filter} className="reveal-up space-y-3">
          <MarqueeRow repos={rowA} mounted={mounted} />
          <MarqueeRow repos={rowB} reverse mounted={mounted} />
        </div>
      </div>

      {/* Achievements */}
      <div className="relative mx-auto mt-10 max-w-7xl">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-ink">Achievements</p>
          <p className="text-xs font-bold text-muted">
            {unlocked}/{data.badges.length} unlocked
          </p>
        </div>
        <ul className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {data.badges.map((b) => (
            <li
              key={b.id}
              className={cn(
                "flex items-center gap-3 rounded-2xl border p-3",
                b.unlocked ? "border-gold/40 bg-gold/10" : "border-dashed border-line bg-surface-card opacity-70",
              )}
            >
              <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-xl", b.unlocked ? "legendary-shimmer text-navy-950" : "bg-surface-muted text-muted")}>
                {b.unlocked ? <Award size={17} aria-hidden="true" /> : <Lock size={15} aria-hidden="true" />}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-bold text-ink">{b.label}</span>
                <span className="block truncate text-[11px] text-muted">{b.detail}</span>
              </span>
              <span className="sr-only">{b.unlocked ? "unlocked" : "locked"}</span>
            </li>
          ))}
        </ul>
        {data.source === "public" ? (
          <p className="mt-4 text-[11px] text-muted">Showing public repositories. Private projects are counted once a GitHub token is configured.</p>
        ) : null}
      </div>
    </section>
  );
}
