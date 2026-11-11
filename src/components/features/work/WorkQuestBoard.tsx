"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Trophy, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ClientCategory, ClientProject } from "@/types";
import ClientWorkCard from "./ClientWorkCard";
import CaseFileDrawer from "./CaseFileDrawer";

type Filter = "all" | ClientCategory;

const TABS: { key: Filter; label: string }[] = [
  { key: "all", label: "All builds" },
  { key: "software", label: "Software" },
  { key: "organisation", label: "Companies & orgs" },
  { key: "personal", label: "Personal brands" },
];

const STORAGE_KEY = "rm-work-quest-v1";
const XP_EXPLORE = 10;
const XP_INSPECT = 25;
const RANKS = ["Visitor", "Explorer", "Scout", "Insider", "Collaborator", "Legend"];

function achievements(total: number) {
  return [
  { id: "first-case", test: (e: number, o: number) => o >= 1, title: "Case opened", text: "You opened your first case file." },
  { id: "investigator", test: (e: number, o: number) => o >= 3, title: "Investigator", text: "3 case files inspected." },
  { id: "explorer", test: (e: number) => e >= total, title: "Full portfolio explorer", text: `All ${total} builds unlocked.` },
  { id: "master", test: (e: number, o: number) => o >= total, title: "Master inspector", text: "Every case file read. Let's build yours next." },
  ];
}

type Saved = { explored: string[]; opened: string[]; earned: string[] };

function load(): Saved {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const v = JSON.parse(raw) as Partial<Saved>;
      return { explored: v.explored ?? [], opened: v.opened ?? [], earned: v.earned ?? [] };
    }
  } catch {
    /* storage blocked: play without saving */
  }
  return { explored: [], opened: [], earned: [] };
}

function save(v: Saved) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(v));
  } catch {
    /* ignore */
  }
}

export default function WorkQuestBoard({ projects }: { projects: ClientProject[] }) {
  const CLIENT_WORK = projects;
  const MAX_XP = Math.max(1, projects.length * (XP_EXPLORE + XP_INSPECT));
  const ACHIEVEMENTS = useMemo(() => achievements(projects.length), [projects.length]);
  const slugSet = useMemo(() => new Set(projects.map((p) => p.slug)), [projects]);
  const [filter, setFilter] = useState<Filter>("all");
  const [progress, setProgress] = useState<Saved>({ explored: [], opened: [], earned: [] });
  const [hydrated, setHydrated] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [toast, setToast] = useState<{ title: string; text: string } | null>(null);
  const [boardInView, setBoardInView] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  // Restore saved progress after mount (keeps SSR markup stable).
  useEffect(() => {
    const saved = load();
    const id = requestAnimationFrame(() => {
      setProgress(saved);
      setHydrated(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (hydrated) save(progress);
  }, [progress, hydrated]);

  const visible = useMemo(
    () => (filter === "all" ? CLIENT_WORK : CLIENT_WORK.filter((p) => p.category === filter)),
    [filter, CLIENT_WORK],
  );

  // Unlock cards as they scroll into view.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || !hydrated) return;
    const io = new IntersectionObserver(
      (entries) => {
        const seen = entries.filter((e) => e.isIntersecting).map((e) => (e.target as HTMLElement).dataset.slug!);
        if (!seen.length) return;
        setProgress((p) => {
          const next = seen.filter((s) => !p.explored.includes(s));
          return next.length ? { ...p, explored: [...p.explored, ...next] } : p;
        });
      },
      { threshold: 0.35 },
    );
    grid.querySelectorAll("[data-slug]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [visible, hydrated]);

  // Show the floating progress pill only while the board is on screen.
  useEffect(() => {
    const el = boardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setBoardInView(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Award achievements.
  useEffect(() => {
    if (!hydrated) return;
    const e = progress.explored.filter((s) => slugSet.has(s)).length;
    const o = progress.opened.filter((s) => slugSet.has(s)).length;
    const fresh = ACHIEVEMENTS.find((a) => a.test(e, o) && !progress.earned.includes(a.id));
    if (!fresh) return;
    const id = requestAnimationFrame(() => {
      setProgress((p) => ({ ...p, earned: [...p.earned, fresh.id] }));
      setToast({ title: fresh.title, text: fresh.text });
    });
    return () => cancelAnimationFrame(id);
  }, [progress, hydrated, ACHIEVEMENTS, slugSet]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3800);
    return () => clearTimeout(t);
  }, [toast]);

  const open = useCallback((slug: string) => {
    setActive(slug);
    setProgress((p) => (p.opened.includes(slug) ? p : { ...p, opened: [...p.opened, slug] }));
  }, []);

  const step = useCallback(
    (dir: 1 | -1) => {
      if (!active) return;
      const list = visible.some((p) => p.slug === active) ? visible : CLIENT_WORK;
      const i = list.findIndex((p) => p.slug === active);
      const next = list[(i + dir + list.length) % list.length];
      open(next.slug);
    },
    [active, visible, open, CLIENT_WORK],
  );
  const prev = useCallback(() => step(-1), [step]);
  const next = useCallback(() => step(1), [step]);
  const close = useCallback(() => setActive(null), []);

  const exploredCount = progress.explored.filter((s) => slugSet.has(s)).length;
  const openedCount = progress.opened.filter((s) => slugSet.has(s)).length;
  const xp = exploredCount * XP_EXPLORE + openedCount * XP_INSPECT;
  const level = Math.min(RANKS.length, Math.floor((xp / MAX_XP) * (RANKS.length - 1)) + 1);
  const pct = Math.round((xp / MAX_XP) * 100);
  const activeProject = active ? CLIENT_WORK.find((p) => p.slug === active) : null;
  const activeList = activeProject && visible.some((p) => p.slug === active) ? visible : CLIENT_WORK;

  return (
    <div ref={boardRef}>
      {/* Quest HUD */}
      <div className="rounded-[1.75rem] border border-line bg-surface-card p-5 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="legendary-shimmer grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-navy-950">
              <Trophy size={22} aria-hidden="true" />
            </span>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-muted">Your quest rank</p>
              <p className="font-display text-lg font-bold text-ink">
                Level {level} · {RANKS[level - 1]}
              </p>
            </div>
          </div>
          <dl className="grid grid-cols-3 gap-2 text-center sm:gap-3">
            {[
              { k: "Unlocked", v: `${exploredCount}/${CLIENT_WORK.length}` },
              { k: "Case files", v: `${openedCount}/${CLIENT_WORK.length}` },
              { k: "XP", v: `${xp}` },
            ].map((s) => (
              <div key={s.k} className="min-w-[4.75rem] rounded-xl bg-surface px-3 py-2">
                <dt className="text-[9px] font-black uppercase tracking-[0.16em] text-muted">{s.k}</dt>
                <dd className="font-display text-base font-bold tabular-nums text-ink">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mt-4">
          <div
            className="h-2.5 overflow-hidden rounded-full bg-surface-sunken"
            role="progressbar"
            aria-label="Portfolio quest progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}
          >
            <div className="xp-fill h-full rounded-full" style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-2 flex items-center gap-1.5 text-xs text-body">
            <Zap size={13} className="text-gold" aria-hidden="true" />
            Scroll to unlock a build (+{XP_EXPLORE} XP). Open its case file (+{XP_INSPECT} XP).
          </p>
        </div>
      </div>

      {/* Quest tabs */}
      <div className="no-scrollbar -mx-5 mt-8 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        <div role="tablist" aria-label="Filter builds" className="flex w-max gap-2">
          {TABS.map((t) => {
            const count = t.key === "all" ? CLIENT_WORK.length : CLIENT_WORK.filter((p) => p.category === t.key).length;
            const selected = filter === t.key;
            return (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setFilter(t.key)}
                className={cn(
                  "inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-full border px-4 text-xs font-black uppercase tracking-[0.12em] transition",
                  selected
                    ? "border-navy-950 bg-navy-950 text-white"
                    : "border-line-strong bg-surface-card text-ink-soft hover:border-accent hover:text-accent-strong",
                )}
              >
                {t.label}
                <span className={cn("rounded-full px-1.5 py-0.5 text-[10px] tabular-nums", selected ? "bg-white/15" : "bg-surface-muted")}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <div ref={gridRef} className="mt-8 grid gap-6 md:grid-cols-2 md:gap-7">
        {visible.map((p) => (
          <ClientWorkCard
            key={p.slug}
            project={p}
            index={CLIENT_WORK.indexOf(p)}
            unlocked={!hydrated || progress.explored.includes(p.slug)}
            onOpen={open}
            priority={CLIENT_WORK.indexOf(p) < 2}
          />
        ))}
      </div>

      {/* Floating progress pill */}
      <div
        className={cn(
          "pointer-events-none fixed bottom-4 left-1/2 z-40 -translate-x-1/2 transition duration-300 sm:left-auto sm:right-6 sm:translate-x-0",
          boardInView && hydrated && !active ? "opacity-100" : "translate-y-4 opacity-0",
        )}
        aria-hidden="true"
      >
        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-navy-950/95 py-2 pl-2 pr-4 text-white shadow-2xl backdrop-blur">
          <svg width="36" height="36" viewBox="0 0 36 36" className="shrink-0">
            <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
            <circle
              cx="18"
              cy="18"
              r="15"
              fill="none"
              stroke="var(--color-accent-soft)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 15}
              strokeDashoffset={2 * Math.PI * 15 * (1 - exploredCount / Math.max(1, CLIENT_WORK.length))}
              transform="rotate(-90 18 18)"
              style={{ transition: "stroke-dashoffset 700ms ease" }}
            />
          </svg>
          <span className="text-xs font-black tabular-nums">
            {exploredCount}/{CLIENT_WORK.length} unlocked
            <span className="ml-2 text-accent-soft">{xp} XP</span>
          </span>
        </div>
      </div>

      {/* Achievement toast */}
      <div aria-live="polite" className="sr-only">
        {toast ? `Achievement unlocked: ${toast.title}. ${toast.text}` : ""}
      </div>
      {toast ? (
        <div className="achievement-toast fixed inset-x-0 bottom-20 z-[70] mx-auto w-[min(92vw,22rem)] sm:bottom-auto sm:top-24" aria-hidden="true">
          <div className="flex items-center gap-3 rounded-2xl border border-gold/40 bg-navy-950 p-3 pr-4 text-white shadow-2xl">
            <span className="legendary-shimmer grid h-11 w-11 shrink-0 place-items-center rounded-xl text-navy-950">
              <Trophy size={20} />
            </span>
            <span>
              <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-gold-soft">Achievement unlocked</span>
              <span className="block text-sm font-bold">{toast.title}</span>
              <span className="block text-xs text-on-dark-muted">{toast.text}</span>
            </span>
          </div>
        </div>
      ) : null}

      {activeProject ? (
        <CaseFileDrawer
          project={activeProject}
          position={activeList.indexOf(activeProject) + 1}
          total={activeList.length}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      ) : null}
    </div>
  );
}
