"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryPhoto } from "@/data/gallery";
import { cn } from "@/lib/utils";

type Props = {
  photos: GalleryPhoto[];
  /** Show only this many until "Show all" is pressed (all when omitted). */
  initial?: number;
  /** Grid column classes; defaults to 2 / 3 / 4 columns. */
  gridClassName?: string;
};

/** Square photo grid; any photo opens full screen with keyboard and swipe-free arrow controls. */
export default function GalleryLightbox({ photos, initial, gridClassName = "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);

  const close = useCallback(() => setActiveIndex(null), []);
  const prev = useCallback(() => setActiveIndex((i) => (i !== null && i > 0 ? i - 1 : i)), []);
  const next = useCallback(() => setActiveIndex((i) => (i !== null && i < photos.length - 1 ? i + 1 : i)), [photos.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = overflow;
    };
  }, [activeIndex, close, prev, next]);

  if (photos.length === 0) {
    return <p className="py-24 text-center text-muted">Photos coming soon, check back later.</p>;
  }

  const shown = initial && !expanded ? photos.slice(0, initial) : photos;

  return (
    <>
      <div className={cn("grid gap-3", gridClassName)}>
        {shown.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setActiveIndex(i)}
            className="group relative aspect-square overflow-hidden rounded-2xl bg-navy-950/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong"
            aria-label={`Open photo: ${photo.alt}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </button>
        ))}
      </div>

      {initial && photos.length > initial ? (
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="btn-ghost inline-flex min-h-10 items-center rounded-full px-5 text-xs font-black uppercase tracking-[0.14em]"
          >
            {expanded ? "Show fewer photos" : `Show all ${photos.length} photos`}
          </button>
        </div>
      ) : null}

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={photos[activeIndex].alt}
        >
          <button
            type="button"
            className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/25"
            onClick={close}
            aria-label="Close photo"
          >
            <X size={20} aria-hidden="true" />
          </button>

          <div className="flex max-w-5xl flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <Image
              src={photos[activeIndex].src}
              alt={photos[activeIndex].alt}
              width={1200}
              height={900}
              sizes="(min-width: 1024px) 1200px, 100vw"
              className="max-h-[78vh] w-auto rounded-xl object-contain"
            />
            <p className="mt-3 text-center text-sm text-white/70">
              {photos[activeIndex].caption ?? photos[activeIndex].alt}
              <span className="ml-2 text-white/40">
                {activeIndex + 1} / {photos.length}
              </span>
            </p>
          </div>

          {activeIndex > 0 && (
            <button
              type="button"
              className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/25 md:left-5"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous photo"
            >
              <ChevronLeft size={22} aria-hidden="true" />
            </button>
          )}
          {activeIndex < photos.length - 1 && (
            <button
              type="button"
              className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/25 md:right-5"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next photo"
            >
              <ChevronRight size={22} aria-hidden="true" />
            </button>
          )}
        </div>
      )}
    </>
  );
}
