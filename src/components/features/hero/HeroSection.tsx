"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

const SLIDES = [
  { src: "/hero-slides/slide-1.jpg", alt: "Richard Mensah, AI researcher and youth leader" },
  { src: "/hero-slides/slide-2.jpg", alt: "Richard Mensah at a leadership event" },
  { src: "/hero-slides/slide-3.jpg", alt: "Richard Mensah at a conference and summit" },
  { src: "/hero-slides/slide-4.jpg", alt: "Richard Mensah speaking and engaging communities" },
  { src: "/hero-slides/slide-5.jpg", alt: "Richard Mensah, SDG advocate and data scientist" },
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
    <section className="relative -mt-28 h-[calc(100vh+7rem)] min-h-[660px] overflow-hidden">
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

      <div className="absolute inset-0 bg-gradient-to-r from-black/78 via-black/42 to-black/10" />

      <div className="relative z-10 flex h-full flex-col items-start justify-center px-5 pt-24 text-left md:px-8 lg:px-14">
        <h1 className="max-w-2xl text-balance text-4xl font-black leading-[1.02] text-white drop-shadow-2xl md:text-5xl lg:text-6xl">
          AI & Data Scientist building systems for{" "}
          <span className="text-[#62E8FF]">global impact.</span>
        </h1>

        <p className="mt-6 max-w-xl text-base leading-7 text-white/90 drop-shadow-lg md:text-lg">
          Richard Mensah operates at the intersection of AI, leadership, entrepreneurship, and
          sustainable development - building systems that serve people and communities.
        </p>

        <div className="mt-8 flex flex-col justify-start gap-3 sm:flex-row">
          <Link
            href="/sdgs"
            className="rounded-full bg-[#00A6FF] px-6 py-3 text-center text-xs font-black uppercase tracking-[0.18em] text-white shadow-xl shadow-[#00A6FF]/30 transition hover:-translate-y-1 hover:bg-white hover:text-[#0077FF]"
          >
            See SDG impact
          </Link>
          <Link
            href="/projects"
            className="rounded-full border border-white/40 bg-white/10 px-6 py-3 text-center text-xs font-black uppercase tracking-[0.18em] text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white hover:text-slate-950"
          >
            Explore projects
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-white/60 px-6 py-3 text-center text-xs font-black uppercase tracking-[0.18em] text-white transition hover:-translate-y-1 hover:bg-white hover:text-slate-950"
          >
            Connect
          </Link>
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition hover:bg-white/25"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition hover:bg-white/25"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-8 right-6 z-10 flex items-center gap-4">
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
