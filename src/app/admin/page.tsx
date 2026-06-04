import Link from "next/link";
import { getAllArticles } from "@/lib/articles";
import { getImpactStats } from "@/lib/impactStats";
import { GALLERY } from "@/data/gallery";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import AdminDeleteButton from "@/components/admin/AdminDeleteButton";

export default async function AdminDashboardPage() {
  const articles = getAllArticles();
  const impactStats = await getImpactStats();

  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-black text-slate-950">Dashboard</h1>
          <AdminLogoutButton />
        </div>

        {/* Stats */}
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-4xl font-black text-[#176E78]">{articles.length}</p>
            <p className="mt-1 text-sm font-semibold text-slate-500">Articles published</p>
            <Link
              href="/admin/articles"
              className="mt-4 block text-sm font-black text-[#2BA8B4] hover:underline"
            >
              Manage articles →
            </Link>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-4xl font-black text-[#176E78]">{GALLERY.length}</p>
            <p className="mt-1 text-sm font-semibold text-slate-500">Gallery photos</p>
            <Link
              href="/gallery"
              className="mt-4 block text-sm font-black text-[#2BA8B4] hover:underline"
            >
              View gallery →
            </Link>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-4xl font-black text-[#176E78]">{impactStats.length}</p>
            <p className="mt-1 text-sm font-semibold text-slate-500">Impact stats</p>
            <Link
              href="/admin/impact-stats"
              className="mt-4 block text-sm font-black text-[#2BA8B4] hover:underline"
            >
              Edit impact stats →
            </Link>
          </div>
        </div>

        {/* Manage content */}
        <div className="mt-10">
          <h2 className="mb-4 text-lg font-black text-slate-950">Manage content</h2>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {[
              { label: "Homepage content", href: "/admin/homepage" },
              { label: "About the Author", href: "/admin/author" },
              { label: "Impact stats", href: "/admin/impact-stats" },
              { label: "Testimonials", href: "/admin/testimonials" },
              { label: "Opportunities", href: "/admin/opportunities" },
              { label: "Gallery", href: "/admin/gallery" },
              { label: "Contact inquiries", href: "/admin/inquiries" },
              { label: "Analytics", href: "/admin/analytics" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-black text-slate-700 shadow-sm transition hover:border-[#2BA8B4] hover:text-[#176E78]"
              >
                {item.label} →
              </Link>
            ))}
          </div>
        </div>

        {/* Recent articles */}
        <div className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-950">Recent articles</h2>
            <Link
              href="/admin/articles/new"
              className="rounded-full bg-[#176E78] px-4 py-2 text-xs font-black text-white transition hover:bg-[#2BA8B4]"
            >
              + New article
            </Link>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {articles.map((article, i) => (
              <div
                key={article.slug}
                className={`flex items-center justify-between px-6 py-4 ${i > 0 ? "border-t border-slate-100" : ""}`}
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-slate-950">{article.title}</p>
                  <p className="text-xs text-slate-400">
                    {article.category} · {article.date}
                  </p>
                </div>
                <div className="ml-4 flex shrink-0 items-center gap-4">
                  <Link
                    href={`/blog/${article.slug}`}
                    className="text-xs font-semibold text-slate-400 hover:text-slate-700"
                    target="_blank"
                  >
                    View
                  </Link>
                  <Link
                    href={`/admin/articles/${article.slug}/edit`}
                    className="text-xs font-black text-[#2BA8B4] hover:underline"
                  >
                    Edit
                  </Link>
                  <AdminDeleteButton slug={article.slug} />
                </div>
              </div>
            ))}
            {articles.length === 0 && (
              <p className="px-6 py-8 text-center text-slate-400">
                No articles yet.{" "}
                <Link href="/admin/articles/new" className="font-black text-[#2BA8B4]">
                  Start writing →
                </Link>
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
