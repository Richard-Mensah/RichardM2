import Link from "next/link";
import { NAVIGATION } from "@/constants";

const EXPLORE_LINKS = [
  { label: "Profile", href: "/about/profile" },
  { label: "SDG Impact", href: "/sdgs" },
  { label: "Gallery", href: "/gallery" },
  { label: "Opportunities (Kofiever)", href: "/opportunities" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0a1730]/40 text-white backdrop-blur-md">
      <div className="sdg-band h-1" />
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center glass rounded-2xl text-sm font-black text-[#122a4e] shadow-lg">
                RM
              </span>
              <span className="text-sm font-black uppercase tracking-[0.18em] text-white">
                Richard Mensah
              </span>
            </div>
            <p className="mt-4 text-sm leading-7 text-white/65">
              AI researcher, youth leader, and SDG-aligned system builder working across Ghana, the
              UK, and global innovation networks.
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#7fb0ff]">
              AI - Leadership - SDGs
            </p>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-white/40">Navigate</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3">
              {NAVIGATION.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-semibold text-white/65 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-white/40">Explore</p>
            <ul className="mt-5 space-y-3">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-semibold text-white/65 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-white/40">Connect</p>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="mailto:rmensahuk@gmail.com"
                  className="text-sm font-semibold text-white/65 transition hover:text-white"
                >
                  rmensahuk@gmail.com
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="btn-azure inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-black uppercase tracking-[0.18em] shadow-md shadow-[#4f8bff]/25 transition hover:-translate-y-0.5"
                >
                  Contact desk -&gt;
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright {new Date().getFullYear()} Richard Mensah. AI, leadership, and SDG impact.</p>
          <p>Built with Next.js - Deployed on Vercel</p>
        </div>
      </div>
    </footer>
  );
}
