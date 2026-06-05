import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { NAVIGATION } from "@/constants";
import { cn } from "@/lib/utils";

type Props = {
  pathname: string;
  openDropdown: string | null;
  onMouseEnter: (label: string) => void;
  onMouseLeave: () => void;
  onDropdownHover: (label: string | null) => void;
};

export default function DesktopNav({
  pathname,
  openDropdown,
  onMouseEnter,
  onMouseLeave,
  onDropdownHover,
}: Props) {
  return (
    <div className="hidden items-center gap-0.5 lg:flex">
      {NAVIGATION.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname === item.href || pathname.startsWith(item.href + "/");
        const hasChildren = item.children && item.children.length > 0;

        if (!hasChildren) {
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-3 py-2 text-[11px] font-black uppercase tracking-[0.12em] transition",
                isActive
                  ? "text-accent-strong"
                  : "text-ink-soft hover:bg-surface-muted hover:text-accent-strong"
              )}
            >
              {item.label}
            </Link>
          );
        }

        return (
          <div
            key={item.href}
            className="relative"
            onMouseEnter={() => onMouseEnter(item.label)}
            onMouseLeave={onMouseLeave}
          >
            <button
              type="button"
              className={cn(
                "flex items-center gap-1 rounded-lg px-3 py-2 text-[11px] font-black uppercase tracking-[0.12em] transition",
                isActive || openDropdown === item.label
                  ? "text-accent-strong"
                  : "text-ink-soft hover:bg-surface-muted hover:text-accent-strong"
              )}
            >
              {item.label}
              <ChevronDown
                size={12}
                className={cn(
                  "transition-transform duration-200",
                  openDropdown === item.label ? "rotate-180" : ""
                )}
              />
            </button>

            {openDropdown === item.label && (
              <div className="header-dropdown absolute left-0 top-full z-50 mt-1 min-w-[230px] rounded-2xl border border-line bg-surface-card p-2 shadow-xl shadow-navy-950/10">
                {item.children!.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={() => onDropdownHover(null)}
                    className="block rounded-xl px-4 py-2.5 text-xs font-semibold text-ink-soft transition hover:bg-accent-tint hover:text-accent-strong"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
