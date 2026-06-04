"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { NAVIGATION } from "@/constants";
import { cn } from "@/lib/utils";

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
    <div className="border-t border-white/10 bg-[#122a4e] px-5 pb-6 pt-4 lg:hidden">
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
                className="rounded-xl px-4 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            );
          }

          return (
            <div key={item.href}>
              <button
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
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
                <div className="ml-4 flex flex-col gap-0.5 border-l border-white/20 pl-4">
                  {item.children!.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={onMenuClose}
                      className="rounded-lg px-3 py-2 text-sm text-white/70 transition hover:text-white"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
