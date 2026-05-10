"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

const SLIDES = [
  { src: "/hero-slides/slide-1.jpg", alt: "Richard Mensah – AI researcher and youth leader" },
  { src: "/hero-slides/slide-2.jpg", alt: "Richard Mensah at a leadership event" },
  { src: "/hero-slides/slide-3.jpg", alt: "Richard Mensah – conference and summit appearance" },
  { src: "/hero-slides/slide-4.jpg", alt: "Richard Mensah speaking and engaging communities" },
  { src: "/hero-slides/slide-5.jpg", alt: "Richard Mensah – SDG advocate and data scientist" },
] as const;

const AUTOPLAY_INTERVAL = 5000;

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const next = useCallback(() => setCurrentIndex((i) => (i + 1) % SLIDES.length), []);
  const prev = useCallback(
    () => setCurrentIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length),
    []
  );

  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(next, AUTOPLAY_INTERVAL);
    return () => clearInterval(id);
  }, [isPlaying, next]);

  return (
    <section className="relative -mt-20 h-[calc(100vh+5rem)] min-h-[600px] overflow-hidden">
      {/* Background slides */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            i === currentIndex ? "opacity-100" : "opacity-0"
          )}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover object-center"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/75" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 pt-24 text-center md:px-8">
        <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-black uppercase tracking-[0.2em] text-white backdrop-blur-md">
          <span className="sdg-conic h-3 w-3 rounded-full" />
          SDG-aligned personal brand ecosystem
        </div>

        <h1 className="mt-8 max-w-5xl text-balance text-5xl font-black leading-[0.95] tracking-[-0.06em] text-white md:text-7xl lg:text-8xl">
          AI & Data Scientist building systems for{" "}
          <span className="sdg-text-gradient">global impact.</span>
        </h1>

        <p className="mt-7 max-w-3xl text-lg leading-8 text-white/85 md:text-xl">
          Richard Mensah operates at the intersection of AI, leadership, entrepreneurship, and
          sustainable development — building systems that serve people and communities.
        </p>

        <div className="mt-9 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/impact"
            className="rounded-full bg-[#009EDB] px-7 py-4 text-center text-sm font-black uppercase tracking-[0.2em] text-white shadow-xl shadow-[#009EDB]/25 transition hover:-translate-y-1 hover:bg-white hover:text-[#006FA6]"
          >
            See SDG impact
          </Link>
          <Link
            href="/projects"
            className="rounded-full border border-white/40 bg-white/10 px-7 py-4 text-center text-sm font-black uppercase tracking-[0.2em] text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white hover:text-slate-950"
          >
            Explore projects
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-white/60 px-7 py-4 text-center text-sm font-black uppercase tracking-[0.2em] text-white transition hover:-translate-y-1 hover:bg-white hover:text-slate-950"
          >
            Contact
          </Link>
        </div>
      </div>

      {/* Prev arrow */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition hover:bg-white/25"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Next arrow */}
      <button
        onClick={next}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition hover:bg-white/25"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots + play/pause */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-4">
        <div className="flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "rounded-full transition-all duration-300",
                i === currentIndex ? "h-2 w-8 bg-white" : "h-2 w-2 bg-white/40 hover:bg-white/70"
              )}
            />
          ))}
        </div>
        <button
          onClick={() => setIsPlaying((p) => !p)}
          className="rounded-full bg-white/10 p-2 text-white backdrop-blur-md transition hover:bg-white/25"
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
      </div>
    </section>
  );
}
