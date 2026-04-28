"use client";

import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";
import type { IdentityCard } from "@/types";

type Props = { items: IdentityCard[] };

export default function IdentityStepperClient({ items }: Props) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal-section grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.3em] text-[#26BDE2]">
          Identity system
        </p>
        <h2 className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-white md:text-5xl">
          A personal brand that feels like a living institution, not a normal portfolio.
        </h2>
        <p className="mt-5 text-base leading-8 text-slate-400 md:text-lg">
          The website presents Richard as a thought leader in formation: technical enough for AI
          work, strategic enough for institutions, and human enough for leadership and youth
          transformation.
        </p>
      </div>

      <div className="relative space-y-0">
        {items.map((item, index) => (
          <div key={item.place} className="relative flex gap-6 pb-12 last:pb-0">
            {/* Connector line */}
            {index < items.length - 1 && (
              <div
                className="absolute left-[1.375rem] top-11 bottom-0 w-px bg-gradient-to-b from-[#009EDB]/40 to-transparent"
                aria-hidden="true"
              />
            )}

            {/* Number badge */}
            <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#009EDB] bg-slate-950 text-sm font-black text-[#009EDB]">
              0{index + 1}
            </div>

            {/* Content */}
            <div className="pt-1.5">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#26BDE2]">
                {item.place}
              </p>
              <h3 className="mt-2 text-xl font-black text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">{item.body}</p>

              {index === 2 && (
                <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-white/20 shadow-md">
                    <Image
                      src="/my image.jpg"
                      alt="Richard Mensah — global impact"
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <p className="text-xs font-bold leading-tight text-slate-400">
                    Cross-border<br />impact builder
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
