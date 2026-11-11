"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Trophy } from "lucide-react";

/** Reads the visitor's saved /work quest progress and invites them to finish it. */
export default function QuestProgressChip({ total }: { total: number }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let n = 0;
    try {
      const raw = window.localStorage.getItem("rm-work-quest-v1");
      n = raw ? ((JSON.parse(raw).explored as string[] | undefined)?.length ?? 0) : 0;
    } catch {
      n = 0;
    }
    const id = requestAnimationFrame(() => setCount(n));
    return () => cancelAnimationFrame(id);
  }, []);

  const label =
    count === null || count === 0
      ? `Collect all ${total} builds`
      : count >= total
        ? `All ${total} collected · revisit`
        : `${count}/${total} collected · keep going`;

  return (
    <Link
      href="/work"
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-4 text-xs font-black uppercase tracking-[0.12em] text-ink transition hover:-translate-y-0.5 hover:bg-gold/20"
    >
      <Trophy size={14} className="text-gold" aria-hidden="true" />
      {label}
    </Link>
  );
}
