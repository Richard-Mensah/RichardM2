"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import type { SystemProject } from "@/types";

type Tab = "problem" | "approach" | "impact";

const TABS: { key: Tab; label: string }[] = [
  { key: "problem", label: "Problem" },
  { key: "approach", label: "Approach" },
  { key: "impact", label: "Impact" },
];

type Props = { system: SystemProject };

export default function SystemProjectCard({ system }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("problem");

  const content: Record<Tab, string> = {
    problem: system.problem,
    approach: system.approach,
    impact: system.impact,
  };

  return (
    <Card className="flex min-h-[26rem] flex-col overflow-hidden p-0">
      {/* Header */}
      <div className="px-7 pt-7 pb-4">
        <div
          className="mb-4 inline-flex w-fit rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white"
          style={{ backgroundColor: system.color }}
        >
          {system.label}
        </div>
        <h3 className="text-xl font-black leading-tight text-slate-950">{system.title}</h3>
      </div>

      {/* Tab bar */}
      <div className="flex border-b border-slate-100 px-7">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "relative pb-3 pr-6 text-xs font-black uppercase tracking-[0.2em] transition",
              activeTab === tab.key ? "text-slate-950" : "text-slate-400 hover:text-slate-600"
            )}
          >
            {tab.label}
            {activeTab === tab.key && (
              <span
                key={tab.key}
                className="tab-indicator absolute inset-x-0 bottom-0 h-[2px] rounded-full"
                style={{ backgroundColor: system.color }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 px-7 py-5">
        <p key={activeTab} className="reveal-up text-sm leading-7 text-slate-600">
          {content[activeTab]}
        </p>
      </div>

      {/* CTA */}
      <a
        href="#collaborate"
        className="mt-auto inline-flex items-center gap-2 px-7 pb-7 pt-2 text-sm font-black text-[#00689D] transition hover:gap-3"
      >
        Discuss the system <span aria-hidden="true">→</span>
      </a>
    </Card>
  );
}
