"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, Award, Check, ChevronLeft, ChevronRight, MapPin, X } from "lucide-react";
import { CLIENT_CATEGORY_LABEL, RARITY } from "@/data/clientWork";
import type { ClientProject } from "@/types";
import AnimatedScreenshot from "./AnimatedScreenshot";

type Props = {
  project: ClientProject;
  position: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

/** Accessible modal "case file" for one build. Bottom sheet on mobile, centred dialog on desktop. */
export default function CaseFileDrawer({ project, position, total, onClose, onPrev, onNext }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const rarity = RARITY[project.rarity];

  // Lock page scroll, restore focus on close.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      previouslyFocused?.focus?.();
    };
  }, []);

  // Keyboard: Esc closes, arrows navigate, Tab is trapped inside the dialog.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") return onClose();
      if (e.key === "ArrowLeft") return onPrev();
      if (e.key === "ArrowRight") return onNext();
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  // Scroll the sheet back to the top when switching builds.
  useEffect(() => {
    dialogRef.current?.scrollTo({ top: 0 });
  }, [project.slug]);

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Close case file"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 bg-navy-950/75 backdrop-blur-sm"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-file-title"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 70) (dx < 0 ? onNext : onPrev)();
        }}
        className="case-sheet relative max-h-[92dvh] w-full max-w-5xl overflow-y-auto overscroll-contain rounded-t-[1.75rem] bg-surface-card shadow-2xl sm:rounded-[1.75rem]"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-line bg-surface-card/95 px-4 py-3 backdrop-blur sm:px-6">
          <div className="flex min-w-0 items-center gap-2">
            <span
              className="shrink-0 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white"
              style={{ backgroundColor: rarity.color }}
            >
              {rarity.label}
            </span>
            <span className="truncate text-[11px] font-black uppercase tracking-[0.16em] text-muted">
              <span className="hidden sm:inline">Case file </span>{position} / {total}
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <button type="button" onClick={onPrev} aria-label="Previous build" className="grid h-11 w-11 place-items-center rounded-full text-ink transition hover:bg-surface-muted">
              <ChevronLeft size={20} />
            </button>
            <button type="button" onClick={onNext} aria-label="Next build" className="grid h-11 w-11 place-items-center rounded-full text-ink transition hover:bg-surface-muted">
              <ChevronRight size={20} />
            </button>
            <button ref={closeRef} type="button" onClick={onClose} aria-label="Close case file" className="grid h-11 w-11 place-items-center rounded-full bg-surface-muted text-ink transition hover:bg-line">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Screens */}
        <div className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 px-4 pt-6 sm:px-8 sm:pt-8">
          <div className={`mx-auto grid max-w-4xl items-end gap-4 sm:gap-6 ${project.mobile ? "grid-cols-[1fr_auto]" : "grid-cols-1"}`}>
            <AnimatedScreenshot
              key={`d-${project.slug}`}
              shot={project.desktop}
              url={project.url}
              alt={`${project.name} desktop website, full-page screenshot`}
              sizes="(min-width: 1024px) 720px, 70vw"
              className="rounded-b-none"
            />
            {project.mobile ? (
            <AnimatedScreenshot
              key={`m-${project.slug}`}
              shot={project.mobile}
              frame="phone"
              alt={`${project.name} mobile website, full-page screenshot`}
              sizes="160px"
              className="mb-4 w-[24vw] max-w-[150px] sm:w-[150px]"
            />
            ) : null}
          </div>
        </div>

        {/* Details */}
        <div className="grid gap-8 px-5 py-7 sm:px-8 md:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-accent-strong">
              {CLIENT_CATEGORY_LABEL[project.category]} · {project.client}
            </p>
            <h2 id="case-file-title" className="font-display mt-2 text-2xl font-bold tracking-[-0.03em] text-ink sm:text-3xl">
              {project.name}
            </h2>
            <p className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-muted">
              <MapPin size={12} aria-hidden="true" /> {project.location}
            </p>
            <p className="mt-4 text-base leading-7 text-body">{project.summary}</p>

            <h3 className="mt-6 text-[11px] font-black uppercase tracking-[0.18em] text-ink">What I built</h3>
            <ul className="mt-3 space-y-2.5">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-2.5 text-sm leading-6 text-ink-soft">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-tint text-accent-strong">
                    <Check size={12} aria-hidden="true" />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.18em] text-ink">Achievements</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.badges.map((b) => (
                  <li key={b} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-bold text-ink-soft">
                    <Award size={13} className="text-gold" aria-hidden="true" /> {b}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.18em] text-ink">Build notes</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <li key={t} className="rounded-md bg-surface-muted px-2.5 py-1 text-xs font-semibold text-body">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-6 text-xs font-black uppercase tracking-[0.14em]"
            >
              Visit the live site <ArrowUpRight size={16} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <p className="text-center text-[11px] text-muted sm:hidden">Swipe left or right to browse builds</p>
          </div>
        </div>
      </div>
    </div>
  );
}
