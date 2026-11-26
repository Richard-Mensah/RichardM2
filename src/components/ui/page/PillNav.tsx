"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export type PillItem = { href: string; label: string; accent?: boolean };

/** Sticky, swipeable row of page links that sits just below the site header. */
export default function PillNav({ items, label }: { items: PillItem[]; label: string }) {
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
    <nav aria-label={label} className="sticky top-[var(--header-h)] z-30 border-b border-line bg-surface/85 backdrop-blur-md">
      <ul ref={listRef} className="no-scrollbar relative mx-auto flex max-w-7xl gap-1.5 overflow-x-auto px-5 py-2.5 md:px-8">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.href} className="shrink-0">
              <Link
                ref={active ? activeRef : undefined}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-9 items-center rounded-full px-3.5 text-xs font-bold transition",
                  active
                    ? "bg-navy-950 text-white shadow-sm"
                    : item.accent
                      ? "text-accent-strong hover:bg-accent/10"
                      : "text-ink-soft hover:bg-navy-950/5 hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
