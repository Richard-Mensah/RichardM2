"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RESEARCH_FAMILY } from "@/data/researchPages";
import { cn } from "@/lib/utils";

/** Sticky, swipeable menu linking every page in the research family. */
export default function ResearchNav() {
  const pathname = usePathname();
  const listRef = useRef<HTMLUListElement | null>(null);
  const activeRef = useRef<HTMLAnchorElement | null>(null);

  // Centre the current page's pill on narrow screens (scrolls the menu only, never the page).
  useEffect(() => {
    const list = listRef.current;
    const active = activeRef.current;
    if (!list || !active) return;
    list.scrollLeft = active.offsetLeft - list.clientWidth / 2 + active.clientWidth / 2;
  }, [pathname]);

  return (
    <nav aria-label="Research pages" className="sticky top-[var(--header-h)] z-30 border-b border-line bg-surface/85 backdrop-blur-md">
      <ul ref={listRef} className="no-scrollbar relative mx-auto flex max-w-7xl gap-1.5 overflow-x-auto px-5 py-2.5 md:px-8">
        {RESEARCH_FAMILY.map((p) => {
          const active = pathname === p.href;
          return (
            <li key={p.href} className="shrink-0">
              <Link
                ref={active ? activeRef : undefined}
                href={p.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-9 items-center rounded-full px-3.5 text-xs font-bold transition",
                  active ? "bg-navy-950 text-white shadow-sm" : "text-ink-soft hover:bg-navy-950/5 hover:text-ink",
                )}
              >
                {p.nav}
              </Link>
            </li>
          );
        })}
        <li className="shrink-0">
          <Link
            href="/blog"
            aria-current={pathname === "/blog" ? "page" : undefined}
            className={cn(
              "inline-flex min-h-9 items-center rounded-full px-3.5 text-xs font-bold transition",
              pathname === "/blog" ? "bg-navy-950 text-white shadow-sm" : "text-accent-strong hover:bg-accent/10",
            )}
          >
            Blog
          </Link>
        </li>
      </ul>
    </nav>
  );
}
