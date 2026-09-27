"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PRIORITY_GOALS } from "@/constants";

export default function SdgExplorer() {
  const [active, setActive] = useState(0);
  const goal = PRIORITY_GOALS[active];

  return (
    <section className="border-y border-line bg-surface-card">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="eyebrow">SDG alignment</p>
            <h2 className="font-display mt-3 text-balance text-3xl font-bold tracking-[-0.035em] text-ink md:text-4xl">
              The global goals my work moves
            </h2>
            <p className="mt-5 text-base leading-8 text-body">
              I map my work to the Sustainable Development Goals it genuinely touches, not all
              seventeen, but the few where AI, education and climate action make a measurable
              difference. Tap a goal to see how.
            </p>
            <Link
              href="/sdgs"
              className="btn-primary mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-black uppercase tracking-[0.14em] transition hover:-translate-y-0.5"
            >
              Full SDG impact
              <ArrowUpRight size={15} />
            </Link>
          </div>

          <div>
            {/* Goal selector */}
            <div
              role="tablist"
              aria-label="Priority Sustainable Development Goals"
              className="flex flex-wrap gap-2"
            >
              {PRIORITY_GOALS.map((g, i) => {
                const selected = i === active;
                return (
                  <button
                    key={g.code}
                    role="tab"
                    id={`sdg-tab-${i}`}
                    aria-selected={selected}
                    aria-controls="sdg-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(i)}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                        e.preventDefault();
                        setActive((active + 1) % PRIORITY_GOALS.length);
                      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                        e.preventDefault();
                        setActive((active - 1 + PRIORITY_GOALS.length) % PRIORITY_GOALS.length);
                      }
                    }}
                    className="group flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-black uppercase tracking-[0.08em] transition"
                    style={{
                      borderColor: selected ? g.color : "var(--color-line)",
                      backgroundColor: selected ? g.color : "transparent",
                      color: selected ? "#fff" : "var(--color-ink)",
                    }}
                  >
                    <span
                      className="grid h-5 w-5 place-items-center rounded-full text-[10px] font-black"
                      style={{
                        backgroundColor: selected ? "rgba(255,255,255,0.25)" : g.color,
                        color: "#fff",
                      }}
                    >
                      {g.code.replace("SDG ", "")}
                    </span>
                    {g.title}
                  </button>
                );
              })}
            </div>

            {/* Detail panel */}
            <div
              id="sdg-panel"
              role="tabpanel"
              aria-labelledby={`sdg-tab-${active}`}
              aria-live="polite"
              className="mt-6 overflow-hidden rounded-2xl border border-line bg-surface p-6 md:p-8"
            >
              <div className="flex items-start gap-5">
                <span
                  key={goal.code}
                  className="reveal-up grid h-16 w-16 shrink-0 place-items-center rounded-2xl text-xl font-black text-white shadow-lg"
                  style={{ backgroundColor: goal.color }}
                >
                  {goal.code.replace("SDG ", "")}
                </span>
                <div>
                  <p
                    className="text-[11px] font-extrabold uppercase tracking-[0.24em]"
                    style={{ color: goal.color }}
                  >
                    {goal.code}
                  </p>
                  <h3 className="font-display mt-1 text-xl font-bold text-ink md:text-2xl">
                    {goal.title}
                  </h3>
                </div>
              </div>
              <p key={`${goal.code}-body`} className="reveal-up mt-5 text-base leading-8 text-body">
                {goal.contribution}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
