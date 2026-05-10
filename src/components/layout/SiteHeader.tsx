"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAVIGATION } from "@/constants";
import { cn } from "@/lib/utils";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileItem, setOpenMobileItem] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  const handleMouseEnter = useCallback((label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  }, []);

  const handleMouseLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 120);
  }, []);

  return (
    <header className="fixed inset-x-0 top-1.5 z-50 border-b border-white/10 bg-[#006FA6] shadow-lg shadow-[#006FA6]/30">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3" aria-label="Richard Mensah home">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-sm font-black text-[#006FA6] shadow-lg">
            RM
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-black uppercase tracking-[0.22em] text-white">
              Richard Mensah
            </span>
            <span className="block text-xs font-semibold text-white/70">AI • Leadership • SDGs</span>
          </span>
        </Link>

        {/* Desktop nav */}
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
                      ? "text-white underline underline-offset-4"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
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
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={cn(
                    "flex items-center gap-1 rounded-lg px-3 py-2 text-[11px] font-black uppercase tracking-[0.12em] transition",
                    isActive || openDropdown === item.label
                      ? "text-white"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
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
                  <div className="header-dropdown absolute left-0 top-full z-50 mt-1 min-w-[220px] rounded-2xl border border-white/10 bg-[#005A8A] p-2 shadow-2xl shadow-black/30">
                    {item.children!.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpenDropdown(null)}
                        className="block rounded-xl px-4 py-2.5 text-xs font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
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

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#006FA6] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#009EDB] hover:text-white"
          >
            Connect
          </Link>
          <button
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/20 bg-white/10 text-white transition hover:bg-white/20 lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-[#005A8A] px-5 pb-6 pt-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAVIGATION.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isExpanded = openMobileItem === item.label;

              if (!hasChildren) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
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
                    onClick={() => setOpenMobileItem(isExpanded ? null : item.label)}
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
                          onClick={() => setMenuOpen(false)}
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
      )}
    </header>
  );
}
