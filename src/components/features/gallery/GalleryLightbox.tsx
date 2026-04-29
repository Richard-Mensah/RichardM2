"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import type { GalleryPhoto } from "@/data/gallery";

type Props = { photos: GalleryPhoto[] };

export default function GalleryLightbox({ photos }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);

  const prev = useCallback(
    () => setActiveIndex((i) => (i !== null && i > 0 ? i - 1 : i)),
    []
  );

  const next = useCallback(
    () =>
      setActiveIndex((i) =>
        i !== null && i < photos.length - 1 ? i + 1 : i
      ),
    [photos.length]
  );

  useEffect(() => {
    if (activeIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeIndex, close, prev, next]);

  if (photos.length === 0) {
    return (
      <p className="py-24 text-center text-slate-400">
        Photos coming soon — check back later.
      </p>
    );
  }

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            onClick={() => setActiveIndex(i)}
            className="group relative aspect-square overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#009EDB]"
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

      {/* Lightbox */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={close}
        >
          {/* Close */}
          <button
            className="absolute right-5 top-5 z-10 rounded-full bg-white/10 p-2.5 text-white transition hover:bg-white/25"
            onClick={close}
            aria-label="Close lightbox"
          >
            ✕
          </button>

          {/* Image + caption */}
          <div
            className="flex max-w-5xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[activeIndex].src}
              alt={photos[activeIndex].alt}
              width={1200}
              height={900}
              className="max-h-[78vh] w-auto rounded-xl object-contain"
            />
            {photos[activeIndex].caption && (
              <p className="mt-3 text-center text-sm text-white/60">
                {photos[activeIndex].caption}
              </p>
            )}
          </div>

          {/* Prev */}
          {activeIndex > 0 && (
            <button
              className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-xl text-white transition hover:bg-white/25"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous photo"
            >
              ←
            </button>
          )}

          {/* Next */}
          {activeIndex < photos.length - 1 && (
            <button
              className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-xl text-white transition hover:bg-white/25"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next photo"
            >
              →
            </button>
          )}
        </div>
      )}
    </>
  );
}
