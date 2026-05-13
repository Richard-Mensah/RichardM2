"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

const SLIDES = [
  // Original curated set
  { src: "/gallery/20240302_090453.jpg", alt: "Richard Mensah at a leadership programme" },
  { src: "/gallery/20240229_120952.jpg", alt: "Richard Mensah — international engagement" },
  { src: "/gallery/20240304_094455.jpg", alt: "Richard Mensah during a development programme" },
  { src: "/gallery/20240305_142937.jpg", alt: "Richard Mensah at a youth leadership session" },
  { src: "/gallery/20240607_184209.jpg", alt: "Richard Mensah at an evening programme" },
  // clearforsidebar — additional selected images
  { src: "/gallery/20251117_180354.jpg", alt: "Richard Mensah — 2025" },
  { src: "/gallery/FB_IMG_1742347818191.jpg", alt: "Richard Mensah" },
  { src: "/gallery/FB_IMG_1742347850249.jpg", alt: "Richard Mensah" },
  { src: "/gallery/FB_IMG_1746893935206.jpg", alt: "Richard Mensah" },
  { src: "/gallery/FB_IMG_1746893977402.jpg", alt: "Richard Mensah" },
  { src: "/gallery/Screenshot_20240606_183355_WhatsAppBusiness.jpg", alt: "Richard Mensah — community engagement" },
  { src: "/gallery/Screenshot_20240606_183400_WhatsAppBusiness.jpg", alt: "Richard Mensah — community event" },
  { src: "/gallery/Screenshot_20240928_222847_Gallery.jpg", alt: "Richard Mensah" },
  // Community development highlights
  { src: "/community/teaching-morning.jpg", alt: "Free morning teaching during COVID-19 lockdown — Sefwi Bekwai" },
  { src: "/community/sanitation-sweeping.jpg", alt: "Community sanitation exercise — DansoKrom, Sefwi Bekwai" },
  { src: "/community/stem-excursion-main.jpg", alt: "STEM excursion with community children — Grace Hospital, Sefwi Bekwai" },
];

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
            className="object-cover object-center brightness-110 contrast-105 saturate-110"
            priority={i === 0}
            quality={100}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Gradient on the right so the photo on the left stays clear */}
      <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/30 to-transparent" />

      {/* Content card — pinned to the bottom-right corner */}
      <div className="relative z-10 flex h-full items-end justify-end px-5 pb-24 pt-24 md:px-10">
        <div className="max-w-xs rounded-2xl bg-[#06111f]/70 p-5 text-left shadow-2xl shadow-black/50 backdrop-blur-md md:max-w-sm md:p-6">
          <h1 className="text-xl font-black leading-tight tracking-[-0.03em] text-white md:text-2xl">
            Climate AI Scientist &amp; Full-Stack Developer building{" "}
            <span className="sdg-text-gradient">human-centered systems.</span>
          </h1>
          <p className="mt-3 text-sm leading-6 text-white/80">
            Passionate about AI, data science, NLP, and large language models - designing
            intelligent systems that put people first and drive meaningful global change.
          </p>
          <div className="mt-5 flex flex-nowrap gap-2">
            <Link
              href="/sdgs"
              className="whitespace-nowrap rounded-full bg-[#0077FF] px-4 py-2.5 text-xs font-black uppercase tracking-[0.12em] text-white shadow-lg shadow-[#0077FF]/30 transition hover:-translate-y-0.5 hover:bg-[#62E8FF]"
            >
              SDG Impact
            </Link>
            <Link
              href="/projects"
              className="whitespace-nowrap rounded-full border border-white/40 bg-white/10 px-4 py-2.5 text-xs font-black uppercase tracking-[0.12em] text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/25"
            >
              Projects
            </Link>
            <Link
              href="/contact"
              className="whitespace-nowrap rounded-full border border-white/40 bg-white/10 px-4 py-2.5 text-xs font-black uppercase tracking-[0.12em] text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/25"
            >
              Connect
            </Link>
          </div>
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

      <div className="absolute bottom-8 left-6 z-10 flex items-center gap-4">
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
