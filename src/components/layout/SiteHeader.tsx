"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import DesktopNav from "./SiteHeader/DesktopNav";
import MobileNav from "./SiteHeader/MobileNav";

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100017450235773",
    path: "M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.25 10.44 22v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22C18.34 21.25 22 17.08 22 12.06Z",
    viewBox: "0 0 24 24",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/richard-mensah-ab8564190/",
    path: "M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.34 8h4.32v14H.34V8Zm7.36 0h4.14v1.92h.06c.58-1.1 1.99-2.26 4.1-2.26 4.38 0 5.2 2.9 5.2 6.66V22h-4.32v-6.81c0-1.62-.03-3.71-2.25-3.71-2.26 0-2.6 1.77-2.6 3.59V22H7.7V8Z",
    viewBox: "0 0 22 23",
  },
  {
    label: "GitHub",
    href: "https://github.com/Richard-Mensah",
    path: "M12 .5A12 12 0 0 0 8.2 23.88c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.84 2.8 1.31 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.31-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.24-3.23-.12-.31-.54-1.54.12-3.19 0 0 1.01-.33 3.3 1.23A11.45 11.45 0 0 1 12 6.23c1.02 0 2.04.14 3 .41 2.29-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.19.77.84 1.24 1.92 1.24 3.23 0 4.62-2.81 5.63-5.49 5.93.43.37.81 1.1.81 2.22v3.3c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z",
    viewBox: "0 0 24 24",
  },
  {
    label: "WhatsApp Ghana",
    href: "https://wa.me/233240567894",
    path: "M12.04 2C6.58 2 2.14 6.43 2.14 11.88c0 1.74.46 3.44 1.33 4.94L2 22l5.3-1.39a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.43 9.9-9.88C21.95 6.45 17.51 2 12.04 2Zm0 18.13h-.01a8.18 8.18 0 0 1-4.17-1.14l-.3-.18-3.15.83.84-3.07-.2-.32a8.14 8.14 0 0 1-1.25-4.37c0-4.51 3.68-8.18 8.21-8.18 2.19 0 4.25.85 5.8 2.4a8.13 8.13 0 0 1 2.4 5.8c0 4.52-3.68 8.19-8.17 8.19Zm4.49-6.13c-.25-.12-1.46-.72-1.68-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.96-.14.17-.29.19-.54.07-.25-.13-1.04-.38-1.98-1.22a7.36 7.36 0 0 1-1.37-1.7c-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.83-.2-.48-.4-.41-.56-.42h-.47c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.13.17 1.75 2.67 4.24 3.75.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z",
    viewBox: "0 0 24 24",
  },
  {
    label: "WhatsApp UK",
    href: "https://wa.me/447388160797",
    path: "M12.04 2C6.58 2 2.14 6.43 2.14 11.88c0 1.74.46 3.44 1.33 4.94L2 22l5.3-1.39a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.43 9.9-9.88C21.95 6.45 17.51 2 12.04 2Zm0 18.13h-.01a8.18 8.18 0 0 1-4.17-1.14l-.3-.18-3.15.83.84-3.07-.2-.32a8.14 8.14 0 0 1-1.25-4.37c0-4.51 3.68-8.18 8.21-8.18 2.19 0 4.25.85 5.8 2.4a8.13 8.13 0 0 1 2.4 5.8c0 4.52-3.68 8.19-8.17 8.19Zm4.49-6.13c-.25-.12-1.46-.72-1.68-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.96-.14.17-.29.19-.54.07-.25-.13-1.04-.38-1.98-1.22a7.36 7.36 0 0 1-1.37-1.7c-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.83-.2-.48-.4-.41-.56-.42h-.47c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.13.17 1.75 2.67 4.24 3.75.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z",
    viewBox: "0 0 24 24",
  },
] as const;

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
    <header className="fixed inset-x-0 top-1.5 z-50 shadow-lg shadow-[#0077FF]/25">
      <div className="bg-[#021B4D] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-2 text-[11px] font-bold md:px-8">
          <p className="hidden uppercase tracking-[0.2em] text-white/70 sm:block">
            Connect with Richard Mensah
          </p>
          <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end">
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  title={link.label}
                  className="grid h-7 w-7 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-[#005BDB]"
                >
                  <svg
                    viewBox={link.viewBox}
                    aria-hidden="true"
                    className="h-3.5 w-3.5 fill-current"
                  >
                    <path d={link.path} />
                  </svg>
                </a>
              ))}
            </div>
            <a
              href="tel:+447388160797"
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-[#005BDB] transition hover:bg-[#62E8FF]"
            >
              <Phone size={13} />
              <span className="hidden sm:inline">Call +44 7388 160797</span>
              <span className="sm:hidden">Call</span>
            </a>
          </div>
        </div>
      </div>

      <nav className="bg-gradient-to-r from-[#005BDB] via-[#0077FF] to-[#00A6FF]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3" aria-label="Richard Mensah home">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-sm font-black text-[#005BDB] shadow-lg">
              RM
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block text-sm font-black uppercase tracking-[0.22em] text-white">
                Richard Mensah
              </span>
              <span className="block text-xs font-semibold text-white/80">
                AI - Leadership - SDGs
              </span>
            </span>
          </Link>

          <DesktopNav
            pathname={pathname}
            openDropdown={openDropdown}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onDropdownHover={setOpenDropdown}
          />

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#005BDB] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#021B4D] hover:text-white"
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
        </div>

        <div className="mx-auto max-w-7xl">
          <MobileNav
            menuOpen={menuOpen}
            onMenuClose={() => setMenuOpen(false)}
            openMobileItem={openMobileItem}
            onMobileItemToggle={setOpenMobileItem}
          />
        </div>
      </nav>
    </header>
  );
}
