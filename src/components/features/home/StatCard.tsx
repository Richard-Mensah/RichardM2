"use client";

import { useEffect, useRef, useState } from "react";
import { Users, Award, TrendingUp, Globe2, HeartHandshake, Sparkles, type LucideIcon } from "lucide-react";
import CountUp from "@/components/ui/CountUp";
import type { ImpactStat } from "@/lib/impactStats";

const RADIUS = 26;
const CIRC = 2 * Math.PI * RADIUS;

// Decorative gauge fill + centre icon per card, cycled by position.
const ICONS: LucideIcon[] = [Award, TrendingUp, Users, Sparkles, Globe2, HeartHandshake];
const RATIOS = [0.92, 0.78, 1, 0.85, 0.7, 0.6];

/** Impact stat with an animated count-up value and a progress ring that draws on scroll. */
export default function StatCard({ stat, index }: { stat: ImpactStat; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Under reduced motion the ring transition is disabled in CSS, so drawing
    // it still resolves instantly — no separate synchronous branch needed.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setDrawn(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="card-lift rounded-2xl border border-line bg-surface-card p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-display text-4xl font-semibold text-navy-900 md:text-5xl">
            <CountUp value={stat.value} />
          </p>
          <p className="mt-3 text-sm font-bold uppercase tracking-[0.1em] text-ink">{stat.label}</p>
        </div>
        <div className="relative h-16 w-16 shrink-0">
          <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true">
            <circle className="ring-track" cx="32" cy="32" r={RADIUS} fill="none" strokeWidth="5" />
            <circle
              className="ring-value"
              cx="32"
              cy="32"
              r={RADIUS}
              fill="none"
              strokeWidth="5"
              strokeDasharray={CIRC}
              strokeDashoffset={drawn ? CIRC * (1 - RATIOS[index % RATIOS.length]) : CIRC}
              style={{ transitionDelay: `${index * 120}ms` }}
            />
          </svg>
          <span className="absolute inset-0 grid place-items-center text-accent-strong">
            {(() => {
              const Icon = ICONS[index % ICONS.length];
              return <Icon size={20} aria-hidden="true" />;
            })()}
          </span>
        </div>
      </div>
      {stat.detail && <p className="mt-2 text-sm leading-6 text-body">{stat.detail}</p>}
    </div>
  );
}
