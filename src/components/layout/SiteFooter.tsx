import { NAVIGATION } from "@/constants";

const RESEARCH_LINKS = [
  { label: "AI & Data Science", href: "#research" },
  { label: "AI & Climate Change", href: "#research" },
  { label: "Youth Leadership", href: "#research" },
  { label: "Policy & Ethics", href: "#research" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="sdg-band h-1" />
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#009EDB] text-sm font-black text-white shadow-lg shadow-[#009EDB]/25">
                RM
              </span>
              <span className="text-sm font-black uppercase tracking-[0.18em] text-slate-950">
                Richard Mensah
              </span>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-500">
              AI researcher, youth leader, and SDG-aligned system builder working across Ghana, the UK, and global innovation networks.
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#009EDB]">
              AI · Leadership · SDGs
            </p>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-slate-950">Navigate</p>
            <ul className="mt-5 space-y-3">
              {NAVIGATION.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm font-semibold text-slate-500 transition hover:text-[#009EDB]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-slate-950">Research</p>
            <ul className="mt-5 space-y-3">
              {RESEARCH_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm font-semibold text-slate-500 transition hover:text-[#009EDB]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-slate-950">Connect</p>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="mailto:rmensahuk@gmail.com"
                  className="text-sm font-semibold text-slate-500 transition hover:text-[#009EDB]"
                >
                  rmensahuk@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="#collaborate"
                  className="inline-flex items-center gap-2 rounded-full bg-[#009EDB] px-5 py-2.5 text-xs font-black uppercase tracking-[0.18em] text-white shadow-md shadow-[#009EDB]/25 transition hover:-translate-y-0.5 hover:bg-slate-950"
                >
                  Collaboration desk →
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-slate-100 pt-8 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Richard Mensah. AI, leadership, and SDG impact.</p>
          <p>Built with Next.js · Deployed on Vercel</p>
        </div>
      </div>
    </footer>
  );
}
