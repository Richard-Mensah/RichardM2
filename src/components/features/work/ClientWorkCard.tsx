"use client";

import type { CSSProperties } from "react";
import { ArrowUpRight, Award, Crown, FolderOpen, Gem, Lock, MapPin, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { CLIENT_CATEGORY_LABEL, RARITY } from "@/data/clientWork";
import type { ClientProject } from "@/types";
import AnimatedScreenshot from "./AnimatedScreenshot";

const RARITY_ICON = { legendary: Crown, epic: Gem, rare: Sparkles } as const;

type Props = {
  project: ClientProject;
  index: number;
  unlocked?: boolean;
  /** Opens the case file. When omitted the card links to /work#slug instead. */
  onOpen?: (slug: string) => void;
  showPhone?: boolean;
  priority?: boolean;
  className?: string;
};

export default function ClientWorkCard({
  project,
  index,
  unlocked = true,
  onOpen,
  showPhone = true,
  priority,
  className,
}: Props) {
  const rarity = RARITY[project.rarity];
  const RarityIcon = RARITY_ICON[project.rarity];
  const number = String(index + 1).padStart(2, "0");

  const openLabel = `Open case file: ${project.name}`;
  const OpenTag = onOpen ? "button" : "a";
  const openProps = onOpen
    ? { type: "button" as const, onClick: () => onOpen(project.slug) }
    : { href: `/work#${project.slug}` };

  return (
    <article
      id={project.slug}
      data-slug={project.slug}
      className={cn(
        "quest-card rarity-glow group relative flex scroll-mt-28 flex-col overflow-hidden rounded-[1.75rem] border border-line bg-surface-card transition duration-300 hover:-translate-y-1",
        unlocked && "is-unlocked",
        className,
      )}
      style={{ "--rarity": `${rarity.color}55`, "--rarity-glow": rarity.glow } as CSSProperties}
    >
      {/* Media */}
      <div className="relative bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 p-4 pb-0 sm:p-5 sm:pb-0">
        <div className="pointer-events-none absolute inset-0 data-grid-light opacity-10" aria-hidden="true" />
        <div className="relative flex items-center justify-between gap-2 pb-3">
          <span className="font-display text-xs font-black tracking-[0.2em] text-white/50">#{number}</span>
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em]",
              project.rarity === "legendary" ? "legendary-shimmer text-navy-950" : "text-white",
            )}
            style={project.rarity === "legendary" ? undefined : { backgroundColor: rarity.color }}
          >
            <RarityIcon size={11} aria-hidden="true" />
            {rarity.label}
          </span>
        </div>

        <OpenTag
          {...openProps}
          aria-label={openLabel}
          className="relative block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-soft focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950 rounded-xl"
        >
          <AnimatedScreenshot
            shot={project.desktop}
            url={project.url}
            alt={`${project.name} website, full-page screenshot`}
            sizes="(min-width: 1280px) 560px, (min-width: 768px) 46vw, 92vw"
            priority={priority}
            className="translate-y-px rounded-b-none"
          />
          {showPhone && project.mobile ? (
            <AnimatedScreenshot
              shot={project.mobile}
              frame="phone"
              alt=""
              sizes="110px"
              className="absolute -bottom-2 right-2 hidden w-[22%] max-w-[110px] sm:block"
            />
          ) : null}
        </OpenTag>

        {/* Locked veil: lifts when the card scrolls into view */}
        <div
          className="lock-veil absolute inset-0 z-10 grid place-items-center bg-navy-950/55"
          aria-hidden="true"
        >
          <span className="flex flex-col items-center gap-2 text-white">
            <span className="grid h-12 w-12 place-items-center rounded-full border border-white/25 bg-white/10">
              <Lock size={20} />
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.24em]">Scroll to unlock</span>
          </span>
        </div>
        <div className="unlock-sweep z-20" aria-hidden="true" />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-black uppercase tracking-[0.16em] text-muted">
          <span className="text-accent-strong">{CLIENT_CATEGORY_LABEL[project.category]}</span>
          <span className="inline-flex items-center gap-1">
            <MapPin size={11} aria-hidden="true" />
            {project.location}
          </span>
        </div>
        <h3 className="font-display mt-2 text-xl font-bold leading-tight tracking-[-0.02em] text-ink">{project.name}</h3>
        <p className="mt-2 text-sm leading-6 text-body">{project.tagline}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Achievements">
          {project.badges.map((b) => (
            <li
              key={b}
              className="badge-pop inline-flex items-center gap-1 rounded-full border border-line bg-surface px-2.5 py-1 text-[10px] font-bold text-ink-soft"
            >
              <Award size={11} className="text-gold" aria-hidden="true" />
              {b}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
          <OpenTag
            {...openProps}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-navy-950 px-4 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:bg-navy-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <FolderOpen size={14} aria-hidden="true" />
            Case file
          </OpenTag>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line-strong px-4 text-xs font-black uppercase tracking-[0.12em] text-ink transition hover:border-accent hover:text-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Live site
            <ArrowUpRight size={14} aria-hidden="true" />
            <span className="sr-only"> for {project.name} (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </article>
  );
}
