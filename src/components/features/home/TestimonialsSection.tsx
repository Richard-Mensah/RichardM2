"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Pause, Play, Quote, Star, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/lib/testimonials";

const AUTOPLAY_MS = 8000;

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          aria-hidden="true"
          className={i < rating ? "fill-gold text-gold" : "fill-transparent text-line-strong"}
        />
      ))}
    </span>
  );
}

/** Photo when one is uploaded in the dashboard, otherwise coloured initials. */
function Avatar({ t, size = 48, ring = false }: { t: Testimonial; size?: number; ring?: boolean }) {
  return (
    <span
      className={cn("relative grid shrink-0 place-items-center overflow-hidden rounded-full font-black text-white", ring && "ring-[3px] ring-offset-2 ring-offset-surface-card")}
      style={{
        width: size,
        height: size,
        fontSize: Math.round(size * 0.32),
        background: `linear-gradient(135deg, ${t.accent}, ${t.accent}aa)`,
        ...(ring ? ({ "--tw-ring-color": t.accent } as React.CSSProperties) : {}),
      }}
    >
      {t.avatar ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={t.avatar} alt={`Photo of ${t.name}`} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <span aria-hidden="true">{t.initials}</span>
      )}
    </span>
  );
}

export default function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const count = testimonials.length;
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [inView, setInView] = useState(false);
  const [heard, setHeard] = useState<Set<number>>(() => new Set([0]));
  const sectionRef = useRef<HTMLElement>(null);
  const rosterRef = useRef<HTMLDivElement>(null);

  const avg = count ? testimonials.reduce((n, t) => n + t.rating, 0) / count : 0;
  const outcomes = testimonials.filter((t) => t.outcome).length;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => setPlaying(false));
      return () => cancelAnimationFrame(id);
    }
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const go = useCallback(
    (i: number) => {
      const next = (i + count) % count;
      setActive(next);
      setHeard((h) => (h.has(next) ? h : new Set(h).add(next)));
      // Keep the chosen avatar visible in the mobile strip.
      const el = rosterRef.current?.querySelector<HTMLElement>(`[data-idx="${next}"]`);
      el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    },
    [count],
  );

  const running = playing && inView && !hovering && count > 1;
  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => go(active + 1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [running, active, go]);

  if (count === 0) return null;
  const t = testimonials[active];
  const allHeard = heard.size >= count;

  return (
    <section ref={sectionRef} className="relative overflow-hidden px-5 py-20 md:px-8 md:py-24">
      <div
        className="pointer-events-none absolute -left-40 top-20 h-[30rem] w-[30rem] rounded-full opacity-[0.12] blur-3xl transition-colors duration-700"
        style={{ backgroundColor: t.accent }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-accent-strong">Testimonials</p>
            <h2 className="font-display mt-3 text-balance text-3xl font-bold tracking-[-0.035em] text-ink md:text-4xl lg:text-[2.7rem]">
              In their own words
            </h2>
            <p className="mt-4 text-base leading-7 text-body">
              Real accounts from people who went through the programmes, applied for scholarships, built projects, and
              came out the other side with something tangible to show for it.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-4 rounded-2xl border border-line bg-surface-card px-5 py-4 shadow-sm">
            <div>
              <p className="font-display text-3xl font-black leading-none text-ink">{avg.toFixed(1)}</p>
              <div className="mt-1.5">
                <Stars rating={Math.round(avg)} size={13} />
              </div>
            </div>
            <span className="h-10 w-px bg-line" aria-hidden="true" />
            <div className="text-sm">
              <p className="font-black text-ink">{count} voices</p>
              <p className="text-muted">{outcomes} outcomes unlocked</p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:gap-8">
          {/* Spotlight */}
          <article
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onFocus={() => setHovering(true)}
            onBlur={() => setHovering(false)}
            aria-roledescription="testimonial"
            aria-label={`Testimonial ${active + 1} of ${count}, from ${t.name}`}
            className="relative flex min-h-[24rem] min-w-0 flex-col overflow-hidden rounded-[2rem] border border-line bg-surface-card p-6 shadow-[0_30px_70px_-40px_rgba(10,26,48,0.45)] sm:p-9"
          >
            <span className="absolute inset-x-0 top-0 h-1.5 transition-colors duration-500" style={{ backgroundColor: t.accent }} aria-hidden="true" />
            <Quote
              size={120}
              className="pointer-events-none absolute -right-4 -top-4 opacity-[0.07] transition-colors duration-500"
              style={{ color: t.accent }}
              aria-hidden="true"
            />

            <div key={active} className="reveal-up relative flex flex-1 flex-col">
              {t.outcome ? (
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/40 bg-gold/10 py-1 pl-1 pr-3 text-xs font-bold text-ink">
                  <span className="legendary-shimmer grid h-6 w-6 place-items-center rounded-full text-navy-950">
                    <Trophy size={12} aria-hidden="true" />
                  </span>
                  <span className="text-[9px] font-black uppercase tracking-[0.18em] text-gold">Achievement</span>
                  {t.outcome}
                </span>
              ) : null}

              <blockquote className="font-display mt-6 flex-1 text-balance text-xl font-semibold leading-[1.5] tracking-[-0.01em] text-ink sm:text-2xl">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Avatar t={t} size={64} ring />
                <div className="min-w-0 flex-1">
                  <p className="text-base font-black text-ink">{t.name}</p>
                  <p className="text-sm text-muted">{t.role}</p>
                </div>
                <Stars rating={t.rating} size={16} />
              </div>
            </div>

            {/* Controls + timer */}
            <div className="relative mt-8 flex items-center gap-2 border-t border-line pt-5">
              <button type="button" onClick={() => go(active - 1)} aria-label="Previous testimonial" className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink transition hover:border-accent hover:text-accent-strong">
                <ChevronLeft size={18} />
              </button>
              <button type="button" onClick={() => go(active + 1)} aria-label="Next testimonial" className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink transition hover:border-accent hover:text-accent-strong">
                <ChevronRight size={18} />
              </button>
              <button type="button" onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause testimonials" : "Play testimonials"} className="grid h-11 w-11 place-items-center rounded-full text-muted transition hover:bg-surface-muted hover:text-ink">
                {playing ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <div className="ml-2 h-1 flex-1 overflow-hidden rounded-full bg-surface-sunken" aria-hidden="true">
                {running ? (
                  <span key={`timer-${active}`} className="testimonial-timer block h-full rounded-full" style={{ backgroundColor: t.accent, animationDuration: `${AUTOPLAY_MS}ms` }} />
                ) : (
                  <span className="block h-full rounded-full opacity-40" style={{ backgroundColor: t.accent, width: `${((active + 1) / count) * 100}%` }} />
                )}
              </div>
              <span className="ml-2 text-xs font-black tabular-nums text-muted">
                {String(active + 1).padStart(2, "0")}/{String(count).padStart(2, "0")}
              </span>
            </div>
          </article>

          {/* Roster */}
          <div className="flex min-w-0 flex-col rounded-[2rem] border border-line bg-surface-card/70 p-5 backdrop-blur sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-ink">Choose a story</p>
              <p className="text-xs font-bold tabular-nums text-muted">
                {heard.size}/{count} heard
              </p>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-sunken" role="progressbar" aria-label="Stories heard" aria-valuemin={0} aria-valuemax={count} aria-valuenow={heard.size}>
              <div className="xp-fill h-full rounded-full" style={{ width: `${(heard.size / count) * 100}%` }} />
            </div>
            {allHeard ? (
              <p className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-gold">
                <Trophy size={13} aria-hidden="true" /> Achievement unlocked: you heard every story
              </p>
            ) : null}

            <div
              ref={rosterRef}
              role="tablist"
              aria-label="Testimonials"
              className="no-scrollbar -mx-5 mt-4 flex snap-x gap-3 overflow-x-auto px-5 pb-1 sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:px-0"
            >
              {testimonials.map((p, i) => {
                const selected = i === active;
                return (
                  <button
                    key={`${p.name}-${i}`}
                    data-idx={i}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => {
                      go(i);
                      setPlaying(false);
                    }}
                    className={cn(
                      "group flex shrink-0 snap-center items-center gap-3 rounded-2xl border p-2.5 text-left transition duration-300 lg:w-full",
                      selected ? "border-transparent bg-navy-950 text-white shadow-lg" : "border-line bg-surface-card hover:border-line-strong",
                    )}
                  >
                    <span className="relative">
                      <Avatar t={p} size={44} />
                      {heard.has(i) && !selected ? (
                        <span className="absolute -bottom-0.5 -right-0.5 grid h-4 w-4 place-items-center rounded-full bg-up text-white ring-2 ring-surface-card">
                          <Check size={10} strokeWidth={3} aria-hidden="true" />
                        </span>
                      ) : null}
                    </span>
                    <span className="min-w-0 pr-2 lg:flex-1">
                      <span className={cn("block whitespace-nowrap text-sm font-bold lg:truncate", selected ? "text-white" : "text-ink")}>{p.name}</span>
                      <span className={cn("hidden truncate text-xs lg:block", selected ? "text-on-dark-muted" : "text-muted")}>
                        {p.outcome || p.role}
                      </span>
                    </span>
                    <span
                      className="hidden h-2 w-2 shrink-0 rounded-full lg:block"
                      style={{ backgroundColor: selected ? "var(--color-gold-soft)" : p.accent }}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
