"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useReveal } from "@/hooks/useReveal";

const TRACK_DETAILS = [
  "Building Alpha Society as a structured youth leadership community focused on AI, entrepreneurship and systems thinking for the next generation of African leaders.",
  "Delivering hands-on AI and analytics training to students, professionals and institutions across Ghana, the UK and beyond — bridging the technical skills gap at scale.",
  "Cultivating cross-border partnerships with universities, NGOs, governments and innovation labs across Ghana, UK, India and the Global South to amplify systemic impact.",
  "Publishing essays, frameworks and talks on AI in Africa, climate intelligence, inequality, youth leadership and responsible development for global audiences.",
];

type Props = { tracks: string[] };

export default function LeadershipAccordionClient({ tracks }: Props) {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useReveal();

  return (
    <div ref={ref} className="reveal-section space-y-2">
      {tracks.map((track, index) => {
        const isOpen = open === index;
        return (
          <div key={track} className="overflow-hidden rounded-[1.5rem] border border-white/10">
            <button
              onClick={() => setOpen(isOpen ? null : index)}
              className="flex w-full items-center gap-5 px-5 py-4 text-left transition duration-200 hover:bg-white/[0.06]"
              aria-expanded={isOpen}
            >
              <span
                className={cn(
                  "sdg-conic grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-sm font-black text-white shadow-lg transition duration-200",
                  isOpen && "scale-110"
                )}
              >
                {index + 1}
              </span>
              <p className="flex-1 text-base font-bold leading-7 text-white">{track}</p>
              <span
                className={cn(
                  "shrink-0 text-slate-400 transition duration-200 text-lg leading-none",
                  isOpen && "rotate-180 text-[#26BDE2]"
                )}
                aria-hidden="true"
              >
                ⌄
              </span>
            </button>

            <div className={cn("accordion-grid", isOpen && "open")}>
              <div className="accordion-inner">
                <p className="pb-5 pl-[4.25rem] pr-5 text-sm leading-7 text-slate-400">
                  {TRACK_DETAILS[index]}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
