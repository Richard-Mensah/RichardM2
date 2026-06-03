"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  initials: string;
  accent: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Ama Osei",
    role: "Women in Data Ghana participant",
    quote:
      "I came in not knowing how to apply for a fellowship. Richard sat with me, went through every section of the application, and helped me write a personal statement I was actually proud of. I got in. I still cannot believe it.",
    initials: "AO",
    accent: "#A21942",
  },
  {
    name: "Samuel Nkrumah",
    role: "Youth Network Lead",
    quote:
      "Our community climate programme was struggling. Richard helped us redesign the structure, train our volunteers and measure outcomes properly. Within four months we had reached 120 young people. The change was night and day.",
    initials: "SN",
    accent: "#3F7E44",
  },
  {
    name: "Amina Yusuf",
    role: "AI and Climate Change fellow",
    quote:
      "I had heard a lot about AI but had no idea where to start. The sessions with Richard were practical from day one. By the end my team had built a weather dashboard that actual farmers in our district were using.",
    initials: "AY",
    accent: "#0077FF",
  },
  {
    name: "Kweku Asante",
    role: "Digital skills trainee",
    quote:
      "Before the programme I could not confidently use a spreadsheet. Twelve weeks later I was presenting a data dashboard to my entire department. Richard made it feel achievable at every step.",
    initials: "KA",
    accent: "#FD6925",
  },
  {
    name: "Grace Mensah",
    role: "Scholarship recipient",
    quote:
      "Richard reviewed my personal statement three times without being asked. He caught things no one else noticed and pushed me to be specific about my goals. I got a fully funded offer. I keep telling people: find a mentor like this.",
    initials: "GM",
    accent: "#009EDB",
  },
  {
    name: "David Kwame",
    role: "Conference delegate",
    quote:
      "I was terrified to present at an international summit. Richard ran a preparation session with me, helped me rehearse questions, and connected me with two researchers I am still collaborating with today. That summit changed my trajectory.",
    initials: "DK",
    accent: "#00689D",
  },
  {
    name: "Esi Baah",
    role: "Community development facilitator",
    quote:
      "We had the energy but not the structure. Richard helped us build a proper curriculum, track participation and show funders the real numbers. We went from 20 active participants to 80 in one cohort. Measurable impact.",
    initials: "EB",
    accent: "#0EA5A4",
  },
  {
    name: "Nana Appiah",
    role: "Leadership programme graduate",
    quote:
      "The mentorship was not just career advice — it was a whole systems shift in how I thought about my potential. I left with a roadmap, a network, and the confidence to actually execute it.",
    initials: "NA",
    accent: "#19486A",
  },
];

function Stars({ accentClass = "text-[#FCC30B]" }: { accentClass?: string }) {
  return (
    <div className={cn("flex gap-0.5", accentClass)} aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="text-xs" aria-hidden="true">
          ★
        </span>
      ))}
    </div>
  );
}

function Avatar({ initials, accent }: { initials: string; accent: string }) {
  return (
    <div
      className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full text-xs font-black text-white"
      style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)` }}
    >
      {initials}
    </div>
  );
}

function useCardsPerView() {
  const [perView, setPerView] = useState(1);

  useEffect(() => {
    const lg = window.matchMedia("(min-width: 1024px)");
    const md = window.matchMedia("(min-width: 768px)");
    const update = () => setPerView(lg.matches ? 3 : md.matches ? 2 : 1);
    update();
    lg.addEventListener("change", update);
    md.addEventListener("change", update);
    return () => {
      lg.removeEventListener("change", update);
      md.removeEventListener("change", update);
    };
  }, []);

  return perView;
}

export default function TestimonialsSection() {
  const perView = useCardsPerView();
  const [index, setIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const count = TESTIMONIALS.length;
  const maxIndex = Math.max(0, count - perView);

  // Keep the index in range when the viewport (perView) changes.
  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const prev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const next = useCallback(() => setIndex((i) => Math.min(maxIndex, i + 1)), [maxIndex]);

  const close = useCallback(() => setActiveIndex(null), []);

  // Esc closes the read-more modal.
  useEffect(() => {
    if (activeIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeIndex, close]);

  const active = activeIndex !== null ? TESTIMONIALS[activeIndex] : null;

  return (
    <div className="bg-white px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#0077FF]">
              Testimonials
            </p>
            <h2 className="mt-4 text-balance text-3xl font-black tracking-[-0.03em] text-slate-950 md:text-4xl">
              In their own words.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500">
              Real accounts from people who went through the programmes, applied for scholarships,
              built projects, and came out the other side with something tangible to show for it.
            </p>
          </div>

          {/* Arrow controls */}
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={prev}
              disabled={index === 0}
              aria-label="Previous testimonials"
              className="grid h-11 w-11 place-items-center rounded-full border border-slate-300 text-slate-700 transition hover:border-[#0077FF] hover:text-[#0077FF] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-slate-300 disabled:hover:text-slate-700"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={next}
              disabled={index >= maxIndex}
              aria-label="Next testimonials"
              className="grid h-11 w-11 place-items-center rounded-full border border-slate-300 text-slate-700 transition hover:border-[#0077FF] hover:text-[#0077FF] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-slate-300 disabled:hover:text-slate-700"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel track */}
        <div className="mt-10 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * (100 / perView)}%)` }}
          >
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.name}
                className="flex-shrink-0 px-2.5"
                style={{ width: `${100 / perView}%` }}
              >
                <article className="flex h-full min-h-[300px] flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60">
                  <span
                    className="block h-1 w-12 rounded-full"
                    style={{ backgroundColor: t.accent }}
                  />
                  <div
                    className="mt-4 select-none text-5xl font-black leading-none"
                    style={{ color: t.accent }}
                    aria-hidden="true"
                  >
                    &ldquo;
                  </div>
                  <p className="mt-2 flex-1 text-sm leading-[1.8] text-slate-600 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:4] overflow-hidden">
                    {t.quote}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className="mt-3 self-start text-xs font-bold uppercase tracking-[0.12em] transition hover:underline"
                    style={{ color: t.accent }}
                  >
                    Read more
                  </button>
                  <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                    <Avatar initials={t.initials} accent={t.accent} />
                    <div className="min-w-0">
                      <p className="text-sm font-black text-slate-950">{t.name}</p>
                      <p className="mt-0.5 truncate text-xs text-slate-500">{t.role}</p>
                    </div>
                    <div className="ml-auto">
                      <Stars />
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to testimonial group ${i + 1}`}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === index ? "w-8 bg-[#0077FF]" : "w-2 bg-slate-300 hover:bg-slate-400"
              )}
            />
          ))}
        </div>
      </div>

      {/* Read-more modal */}
      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`Testimonial from ${active.name}`}
        >
          <div
            className="relative w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <X size={18} />
            </button>

            <span
              className="block h-1 w-12 rounded-full"
              style={{ backgroundColor: active.accent }}
            />
            <div
              className="mt-3 select-none text-6xl font-black leading-none"
              style={{ color: active.accent }}
              aria-hidden="true"
            >
              &ldquo;
            </div>
            <p className="mt-2 text-base leading-[1.9] text-slate-700">{active.quote}</p>

            <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
              <Avatar initials={active.initials} accent={active.accent} />
              <div className="min-w-0">
                <p className="text-sm font-black text-slate-950">{active.name}</p>
                <p className="mt-0.5 text-xs text-slate-500">{active.role}</p>
              </div>
              <div className="ml-auto">
                <Stars />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
