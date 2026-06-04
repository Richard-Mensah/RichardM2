import Link from "next/link";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin" },
  { label: "Articles", href: "/admin/articles" },
  { label: "New Article", href: "/admin/articles/new" },
  { label: "Homepage", href: "/admin/homepage" },
  { label: "About the Author", href: "/admin/author" },
  { label: "Impact Stats", href: "/admin/impact-stats" },
  { label: "Testimonials", href: "/admin/testimonials" },
  { label: "Opportunities", href: "/admin/opportunities" },
  { label: "Gallery", href: "/admin/gallery" },
  { label: "Inquiries", href: "/admin/inquiries" },
  { label: "Analytics", href: "/admin/analytics" },
  { label: "← View Site", href: "/" },
];

export default function AdminSidebar() {
  return (
    <aside className="w-60 shrink-0 bg-brand-primary-darker px-4 py-8">
      <div className="mb-8 flex items-center gap-3 px-2">
        <span className="grid h-10 w-10 place-items-center glass rounded-xl text-sm font-black text-brand-primary-darker">
          RM
        </span>
        <p className="text-xs font-black uppercase tracking-[0.15em] text-white">Admin</p>
      </div>
      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
