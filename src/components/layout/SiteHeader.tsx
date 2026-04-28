"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAVIGATION } from "@/constants";
import { cn } from "@/lib/utils";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-1.5 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Richard Mensah home">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#009EDB] text-sm font-black text-white shadow-lg shadow-[#009EDB]/25">
            RM
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-black uppercase tracking-[0.22em] text-slate-950">
              Richard Mensah
            </span>
            <span className="block text-xs font-semibold text-slate-500">AI • Leadership • SDGs</span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {NAVIGATION.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-semibold transition hover:text-[#009EDB]",
                pathname === item.href ? "font-black text-[#009EDB]" : "text-slate-600"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/collaborate"
            className="rounded-full bg-slate-950 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-white shadow-lg shadow-slate-300 transition hover:-translate-y-0.5 hover:bg-[#009EDB]"
          >
            Connect
          </Link>
          <button
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-[#009EDB] hover:text-[#009EDB] lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-slate-100 bg-white/95 px-5 pb-6 pt-4 backdrop-blur-2xl lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAVIGATION.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "rounded-xl px-4 py-3 text-base font-semibold transition hover:bg-slate-50 hover:text-[#009EDB]",
                  pathname === item.href ? "bg-slate-50 font-black text-[#009EDB]" : "text-slate-700"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
