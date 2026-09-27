"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { NAVIGATION } from "@/constants";
import { cn } from "@/lib/utils";
import BookingLink from "@/components/ui/BookingLink";

type Props = {
  menuOpen: boolean;
  onMenuClose: () => void;
  openMobileItem: string | null;
  onMobileItemToggle: (label: string | null) => void;
};

export default function MobileNav({
  menuOpen,
  onMenuClose,
  openMobileItem,
  onMobileItemToggle,
}: Props) {
  if (!menuOpen) return null;

  return (
    <div className="border-t border-line bg-surface-card px-5 pb-6 pt-4 lg:hidden">
      <nav className="flex flex-col gap-1">
        {NAVIGATION.map((item) => {
          const hasChildren = item.children && item.children.length > 0;
          const isExpanded = openMobileItem === item.label;

          if (!hasChildren) {
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onMenuClose}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-ink-soft transition hover:bg-accent-tint hover:text-accent-strong"
              >
                {item.label}
              </Link>
            );
          }

          return (
            <div key={item.href}>
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-ink-soft transition hover:bg-accent-tint hover:text-accent-strong"
                onClick={() => onMobileItemToggle(isExpanded ? null : item.label)}
              >
                {item.label}
                <ChevronDown
                  size={16}
                  className={cn(
                    "transition-transform duration-200",
                    isExpanded ? "rotate-180" : ""
                  )}
                />
              </button>
              {isExpanded && (
                <div className="ml-4 flex flex-col gap-0.5 border-l border-line pl-4">
                  {item.children!.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={onMenuClose}
                      className="rounded-lg px-3 py-2 text-sm text-body transition hover:text-accent-strong"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Mobile booking, CV + contact actions */}
        <BookingLink
          onClick={onMenuClose}
          iconSize={14}
          className="mt-3 w-full px-4 py-3 text-[11px] tracking-[0.14em]"
        >
          Book appointment
        </BookingLink>
        <div className="mt-2 flex gap-2 border-t border-line pt-4">
          <Link
            href="/about/cv"
            onClick={onMenuClose}
            className="btn-ghost flex-1 rounded-full px-4 py-2.5 text-center text-[11px] font-black uppercase tracking-[0.14em]"
          >
            Request CV
          </Link>
          <Link
            href="/contact"
            onClick={onMenuClose}
            className="btn-primary flex-1 rounded-full px-4 py-2.5 text-center text-[11px] font-black uppercase tracking-[0.14em]"
          >
            Connect
          </Link>
        </div>
      </nav>
    </div>
  );
}
