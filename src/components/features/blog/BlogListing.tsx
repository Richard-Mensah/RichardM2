"use client";

import { useMemo, useState } from "react";
import MediaCard from "@/components/ui/MediaCard";
import type { WritingItem } from "@/lib/writingItems";
import { cn } from "@/lib/utils";

/** Article grid with category filters (categories come from the articles themselves). */
export default function BlogListing({ items }: { items: WritingItem[] }) {
  const categories = useMemo(() => [...new Set(items.map((i) => i.topic).filter(Boolean))].sort(), [items]);
  const [active, setActive] = useState("All");
  const shown = active === "All" ? items : items.filter((i) => i.topic === active);

  return (
    <div>
      {categories.length > 1 ? (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter articles by category">
          {["All", ...categories].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              aria-pressed={active === c}
              className={cn(
                "inline-flex min-h-10 items-center rounded-full border px-4 text-sm font-bold transition",
                active === c ? "border-navy-950 bg-navy-950 text-white" : "border-line bg-surface-card text-ink-soft hover:border-navy-950/40 hover:text-ink",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      ) : null}

      {shown.length ? (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
          {shown.map((item) => (
            <li key={item.key}>
              <MediaCard item={item} withExcerpt />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-12 text-center text-muted">No articles in this category yet.</p>
      )}
    </div>
  );
}
