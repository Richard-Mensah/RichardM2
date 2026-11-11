"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Images, MapPin, Pause, Play, Plane, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReelChapter } from "@/data/heroReel";

const CHAPTER_MS = 6500;
const STORAGE_KEY = "rm-reel-watched";
const KEN_BURNS = ["reel-kb-a", "reel-kb-b", "reel-kb-c", "reel-kb-d"];
const ENTERS = ["reel-in-fade", "reel-in-iris", "reel-in-wipe"];

export type PlayerStats = { level: number | null; builds: number; projects: number | null; youth: string | null };

type Props = {
  chapters: ReelChapter[];
  eyebrow: string;
  titleLead: string;
  titleHighlight: string;
  titleTail: string;
  subtitle: string;
  player: PlayerStats;
  /** Extra CTA nodes (e.g. BookingLink, a server-friendly component). */
  primaryCta: ReactNode;
};

/**
 * Full-screen cinematic reel: Richard's photos animated like a film trailer
 * (Ken Burns, iris/wipe transitions, grain, vignette), with story-style chapter
 * progress, a journey track and a "full story" achievement. Pauses off-screen,
 * on hidden tabs and for reduced-motion users.
 */
export default function HeroReel({ chapters, eyebrow, titleLead, titleHighlight, titleTail, subtitle, player, primaryCta }: Props) {
  const count = chapters.length;
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [cycle, setCycle] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(true);
  const [docVisible, setDocVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [seen, setSeen] = useState<Set<number>>(() => new Set([0]));
  const [toast, setToast] = useState<string | null>(null);
  const [watched, setWatched] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setReduced(true);
        setPlaying(false);
      }
      try {
        setWatched(window.localStorage.getItem(STORAGE_KEY) === "1");
      } catch {
        /* storage blocked */
      }
    });
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    const onVis = () => setDocVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const indexRef = useRef(0);
  const seenRef = useRef<Set<number>>(new Set([0]));

  const go = useCallback(
    (next: number) => {
      const n = (next + count) % count;
      const cur = indexRef.current;
      if (n === cur) return;
      indexRef.current = n;
      setPrev(cur);
      setIndex(n);
      setCycle((c) => c + 1);
      if (!seenRef.current.has(n)) {
        const ns = new Set(seenRef.current).add(n);
        seenRef.current = ns;
        setSeen(ns);
        if (ns.size === count) {
          try {
            window.localStorage.setItem(STORAGE_KEY, "1");
          } catch {
            /* ignore */
          }
          setWatched(true);
          setToast("Achievement: full story watched");
        } else {
          setToast(`Chapter ${n + 1} unlocked`);
        }
      }
    },
    [count],
  );

  const running = playing && inView && docVisible && !reduced && count > 1;
  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => go(index + 1), CHAPTER_MS);
    return () => clearTimeout(t);
  }, [running, index, cycle, go]);

  // Drop the outgoing layer once its successor has finished entering.
  useEffect(() => {
    if (prev === null) return;
    const t = setTimeout(() => setPrev(null), 1300);
    return () => clearTimeout(t);
  }, [prev, cycle]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  if (!count) return null;
  const ch = chapters[index];
  const layers = prev !== null && prev !== index ? [prev, index] : [index];

  return (
    <section
      ref={ref}
      aria-roledescription="carousel"
      aria-label="Richard Mensah's story in pictures"
      className="relative isolate flex min-h-[88svh] flex-col overflow-hidden bg-navy-950 text-white"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 60) go(index + (dx < 0 ? 1 : -1));
      }}
    >
      {/* ── Film layers ─────────────────────────────────────── */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {layers.map((i) => {
          const c = chapters[i];
          const entering = i === index && prev !== null;
          return (
            <div
              key={`${i}-${i === index ? cycle : "out"}`}
              className={cn("absolute inset-0 overflow-hidden", entering && ENTERS[cycle % ENTERS.length])}
            >
              {c.video ? (
                <video className="h-full w-full object-cover" src={c.video} autoPlay muted loop playsInline poster={c.image || undefined} />
              ) : (
                <div className={cn("absolute inset-0", !reduced && KEN_BURNS[i % KEN_BURNS.length])}>
                  <Image
                    src={c.image}
                    alt=""
                    fill
                    priority={i === 0}
                    sizes="100vw"
                    className="object-cover"
                    style={{ objectPosition: c.focus ?? "center" }}
                  />
                </div>
              )}
            </div>
          );
        })}
        {/* Preload the next chapter quietly */}
        {count > 1 && !chapters[(index + 1) % count].video ? (
          <div className="absolute h-px w-px overflow-hidden opacity-0">
            <Image src={chapters[(index + 1) % count].image} alt="" width={16} height={16} sizes="100vw" />
          </div>
        ) : null}
        {/* Grade, vignette, grain */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/65 to-navy-950/10" />
        <div className="absolute inset-0 bg-navy-950/40 sm:hidden" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-navy-950/40" />
        <div className="absolute inset-0 mix-blend-soft-light" style={{ background: "linear-gradient(120deg, rgba(30,138,149,0.35), rgba(124,92,255,0.18))" }} />
        <div className="reel-vignette absolute inset-0" />
        <div className="reel-grain absolute -inset-[10%] opacity-[0.08]" />
      </div>

      {/* ── Top: chapter progress ──────────────────────────── */}
      <div className="relative mx-auto flex w-full max-w-7xl items-center gap-3 px-5 pt-6 md:px-8">
        <div className="flex flex-1 gap-1.5" role="tablist" aria-label="Story chapters">
          {chapters.map((c, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Chapter ${i + 1}: ${c.title}`}
              onClick={() => {
                go(i);
                setPlaying(false);
              }}
              className="group relative h-6 flex-1"
            >
              <span className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 overflow-hidden rounded-full bg-white/20 transition group-hover:bg-white/35">
                <span
                  key={i === index ? `p-${cycle}-${running}` : `s-${i}`}
                  className={cn(
                    "block h-full rounded-full bg-white",
                    i < index && "w-full",
                    i > index && "w-0",
                    i === index && (running ? "reel-progress" : "w-full opacity-70"),
                  )}
                  style={i === index && running ? { animationDuration: `${CHAPTER_MS}ms` } : undefined}
                />
              </span>
            </button>
          ))}
        </div>
        <span className="hidden text-[11px] font-black uppercase tracking-[0.2em] text-white/70 sm:inline">
          {index + 1}/{count}
        </span>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause story" : "Play story"}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur transition hover:bg-white/20"
        >
          {playing && !reduced ? <Pause size={16} /> : <Play size={16} />}
        </button>
      </div>

      {/* ── Headline ───────────────────────────────────────── */}
      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-5 pb-4 pt-8 md:justify-center md:px-8 md:pb-6">
        <div className="max-w-2xl stagger">
          <p className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.24em] text-accent-soft">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-soft opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-soft" />
            </span>
            {eyebrow}
          </p>
          <h1 className="font-display mt-4 text-balance text-[2.15rem] font-black leading-[1.04] tracking-[-0.04em] sm:text-5xl lg:text-[3.5rem]">
            {titleLead}
            <span className="bg-gradient-to-r from-accent-soft via-[#9be7e1] to-gold-soft bg-clip-text text-transparent">{titleHighlight}</span>
            {titleTail}
          </h1>
          <p className="mt-4 hidden max-w-xl text-base leading-7 text-white/80 sm:block">{subtitle}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {primaryCta}
            <Link href="/work" className="btn-white inline-flex min-h-11 items-center gap-2 rounded-full px-6 text-xs font-black uppercase tracking-[0.14em]">
              See my work <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Bottom: caption, journey, player card ─────────── */}
      <div className="relative mx-auto grid w-full max-w-7xl gap-4 px-5 pb-6 md:px-8 lg:grid-cols-[1fr_auto] lg:items-end lg:pb-8">
        <div className="min-w-0">
          {/* Caption */}
          <div key={`cap-${index}-${cycle}`} className="reel-caption" aria-live="polite">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-gold-soft">{ch.kicker}</p>
            <p className="font-display mt-1 text-lg font-bold leading-snug sm:text-xl">{ch.title}</p>
            <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-white/70">
              <MapPin size={13} className="reel-pin text-accent-soft" aria-hidden="true" />
              {ch.location}
            </p>
          </div>

          {/* Journey track */}
          <div className="relative mt-3 hidden h-8 max-w-xl sm:block" aria-hidden="true">
            <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 border-t border-dashed border-white/25" />
            <div
              className="absolute top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-gradient-to-r from-accent-soft to-gold-soft transition-[width] duration-700"
              style={{ width: count > 1 ? `${(index / (count - 1)) * 100}%` : "0%" }}
            />
            {chapters.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border transition",
                  i <= index ? "border-gold-soft bg-gold-soft" : "border-white/40 bg-navy-950",
                  seen.has(i) && i > index && "border-accent-soft",
                )}
                style={{ left: count > 1 ? `${(i / (count - 1)) * 100}%` : "0%" }}
              />
            ))}
            <span
              className="absolute top-1/2 grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-navy-950 shadow-lg transition-[left] duration-700"
              style={{ left: count > 1 ? `${(index / (count - 1)) * 100}%` : "0%" }}
            >
              <Plane size={14} />
            </span>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <button type="button" onClick={() => go(index - 1)} aria-label="Previous chapter" className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur transition hover:bg-white/20">
              <ChevronLeft size={18} />
            </button>
            <button type="button" onClick={() => go(index + 1)} aria-label="Next chapter" className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur transition hover:bg-white/20">
              <ChevronRight size={18} />
            </button>
            <Link href="/gallery" className="ml-1 inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-xs font-black uppercase tracking-[0.14em] text-white/80 transition hover:text-white">
              <Images size={15} aria-hidden="true" /> Full gallery
            </Link>
          </div>
        </div>

        {/* Player card */}
        <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-navy-950/60 p-3 pr-4 backdrop-blur-md lg:min-w-[22rem]">
          <span className="relative shrink-0">
            <span className="block h-14 w-14 overflow-hidden rounded-full ring-2 ring-gold-soft ring-offset-2 ring-offset-navy-950">
              <Image src="/Rich1.png" alt="Richard Mensah" width={56} height={56} className="h-full w-full object-cover object-top" />
            </span>
            {player.level ? (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-gold-soft px-1.5 text-[9px] font-black text-navy-950">Lv {player.level}</span>
            ) : null}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-black">Richard Mensah</p>
            <p className="text-[11px] text-white/70">Class: AI &amp; Data Scientist · Builder</p>
            <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] font-bold">
              <span><span className="text-gold-soft">{player.builds}</span> builds</span>
              {player.projects ? <span><span className="text-gold-soft">{player.projects}</span> repos</span> : null}
              {player.youth ? <span><span className="text-gold-soft">{player.youth}</span> youth</span> : null}
            </div>
          </div>
          {watched ? (
            <span className="legendary-shimmer grid h-9 w-9 shrink-0 place-items-center rounded-xl text-navy-950" title="Full story watched">
              <Trophy size={16} aria-hidden="true" />
            </span>
          ) : null}
        </div>
      </div>

      {/* Chapter toast */}
      {toast ? (
        <div className="achievement-toast pointer-events-none absolute inset-x-0 top-20 z-10 mx-auto w-max max-w-[90vw] rounded-full border border-gold/40 bg-navy-950/90 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-gold-soft shadow-xl backdrop-blur">
          ★ {toast}
        </div>
      ) : null}
    </section>
  );
}
