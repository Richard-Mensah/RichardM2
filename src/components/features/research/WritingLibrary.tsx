"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import MediaCard from "@/components/ui/MediaCard";
import { isOptimisable, paperAnchor, type WritingItem } from "@/lib/writingItems";
import { cn } from "@/lib/utils";

const PLURAL: Record<string, string> = {
  Article: "Articles",
  "Working Paper": "Working papers",
  Essay: "Essays",
  "Policy Note": "Policy notes",
  "Research Note": "Research notes",
};

/** Filterable library of articles and papers. Papers show their full abstract inline. */
export default function WritingLibrary({ items }: { items: WritingItem[] }) {
  const kinds = useMemo(() => [...new Set(items.map((i) => i.kind))], [items]);
  const [kind, setKind] = useState<string>("All");
  const shown = kind === "All" ? items : items.filter((i) => i.kind === kind);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter writing by type">
        {["All", ...kinds].map((k) => {
          const count = k === "All" ? items.length : items.filter((i) => i.kind === k).length;
          const active = kind === k;
          return (
            <button
              key={k}
              type="button"
              onClick={() => setKind(k)}
              aria-pressed={active}
              className={cn(
                "inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-sm font-bold transition",
                active ? "border-navy-950 bg-navy-950 text-white" : "border-line bg-surface-card text-ink-soft hover:border-navy-950/40 hover:text-ink",
              )}
            >
              {k === "All" ? "All" : (PLURAL[k] ?? k)}
              <span className={cn("rounded-full px-1.5 text-[11px] tabular-nums", active ? "bg-white/20" : "bg-navy-950/5")}>{count}</span>
            </button>
          );
        })}
      </div>

      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        {shown.map((item) =>
          item.isArticle ? (
            <li key={item.key}>
              <MediaCard item={item} withExcerpt />
            </li>
          ) : (
            <li key={item.key} id={paperAnchor(item.title)} className="scroll-mt-44 sm:col-span-2 lg:col-span-3">
              <PaperCard item={item} />
            </li>
          ),
        )}
      </ul>
    </div>
  );
}

function PaperCard({ item }: { item: WritingItem }) {
  return (
    <article className="grid overflow-hidden rounded-md bg-white shadow-[0_18px_40px_-26px_rgba(10,26,48,0.6)] ring-1 ring-navy-950/5 md:grid-cols-[0.42fr_1fr]">
      <div className="relative aspect-[16/9] md:aspect-auto">
        <Image src={item.image} alt="" fill sizes="(min-width: 768px) 30vw, 92vw" unoptimized={!isOptimisable(item.image)} className="object-cover" />
      </div>
      <div className="flex flex-col p-6 md:p-7">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-muted">
          <FileText size={14} className="text-accent-strong" aria-hidden="true" />
          <span className="font-bold text-ink-soft">{item.kind}</span>
          <span aria-hidden="true">·</span>
          <span>{item.meta}</span>
        </div>
        <h3 className="font-display mt-3 text-xl font-bold leading-snug text-ink">{item.title}</h3>
        {item.venue ? (
          <p className="mt-1 text-sm text-ink-soft">
            {item.authors ? `${item.authors} · ` : ""}
            <span className="italic">{item.venue}</span>
          </p>
        ) : null}
        <p className="mt-4 text-sm leading-7 text-body">{item.excerpt}</p>
        {item.tags?.length ? (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Topics">
            {item.tags.map((t) => (
              <li key={t} className="rounded-full bg-accent/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-accent-strong">
                {t}
              </li>
            ))}
          </ul>
        ) : null}
        <Link
          href="/research/collaborations"
          className="mt-6 inline-flex w-fit items-center gap-1.5 text-xs font-black uppercase tracking-[0.14em] text-accent-strong hover:gap-2.5"
        >
          Review or co-author this paper <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
