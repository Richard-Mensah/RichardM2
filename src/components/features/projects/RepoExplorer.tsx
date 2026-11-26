"use client";

import { useMemo, useState } from "react";
import RepoCard from "@/components/ui/RepoCard";
import { TRACK_META, type ClassifiedRepo } from "@/lib/githubTracks";
import { cn } from "@/lib/utils";

type Filter = "all" | "ai" | "web" | "other";

const PAGE_SIZE = 12;

/** All public repos with track and language filters. */
export default function RepoExplorer({ repos }: { repos: ClassifiedRepo[] }) {
  const [track, setTrack] = useState<Filter>("all");
  const [language, setLanguage] = useState("All");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const languages = useMemo(() => {
    const counts = new Map<string, number>();
    for (const r of repos) if (r.language) counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([name]) => name);
  }, [repos]);

  const shown = repos.filter((r) => (track === "all" || r.track === track) && (language === "All" || r.language === language));
  const tabs: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: "All", count: repos.length },
    { key: "ai", label: TRACK_META.ai.short, count: repos.filter((r) => r.track === "ai").length },
    { key: "web", label: TRACK_META.web.short, count: repos.filter((r) => r.track === "web").length },
    { key: "other", label: "Other", count: repos.filter((r) => r.track === "other").length },
  ];

  if (!repos.length) {
    return (
      <p className="rounded-xl border border-line bg-surface-card p-8 text-center text-sm text-body">
        GitHub is not reachable right now. Visit the profile directly to browse the repositories.
      </p>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by skill track">
        {tabs
          .filter((t) => t.count > 0 || t.key === "all")
          .map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => {
                setTrack(t.key);
                setVisible(PAGE_SIZE);
              }}
              aria-pressed={track === t.key}
              className={cn(
                "inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-sm font-bold transition",
                track === t.key ? "border-navy-950 bg-navy-950 text-white" : "border-line bg-surface-card text-ink-soft hover:border-navy-950/40 hover:text-ink",
              )}
            >
              {t.label}
              <span className={cn("rounded-full px-1.5 text-[11px] tabular-nums", track === t.key ? "bg-white/20" : "bg-navy-950/5")}>{t.count}</span>
            </button>
          ))}
      </div>
      {languages.length > 1 ? (
        <div className="mt-3 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by language">
          {["All", ...languages].map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => {
                setLanguage(l);
                setVisible(PAGE_SIZE);
              }}
              aria-pressed={language === l}
              className={cn(
                "inline-flex min-h-8 items-center rounded-full px-3 text-xs font-semibold transition",
                language === l ? "bg-accent text-white" : "bg-navy-950/5 text-ink-soft hover:bg-navy-950/10",
              )}
            >
              {l === "All" ? "Any language" : l}
            </button>
          ))}
        </div>
      ) : null}

      {shown.length ? (
        <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
          {shown.slice(0, visible).map((r) => (
            <li key={r.name}>
              <RepoCard repo={r} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-8 text-center text-sm text-muted">No repositories match these filters.</p>
      )}
      {shown.length > visible ? (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="btn-ghost inline-flex min-h-11 items-center rounded-full px-6 text-xs font-black uppercase tracking-[0.14em]"
          >
            Show more ({shown.length - visible} left)
          </button>
        </div>
      ) : null}
    </div>
  );
}
