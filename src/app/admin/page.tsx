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
          <h1 className="text-2xl font-black font-display text-ink">Dashboard</h1>
          <AdminLogoutButton />
        </div>

        {/* Stats */}
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="glass rounded-2xl p-6 shadow-sm">
            <p className="text-4xl font-black text-ink">{articles.length}</p>
            <p className="mt-1 text-sm font-semibold text-muted">Articles published</p>
            <Link
              href="/admin/articles"
              className="mt-4 block text-sm font-black text-accent-strong hover:underline"
            >
              Manage articles →
            </Link>
          </div>
          <div className="glass rounded-2xl p-6 shadow-sm">
            <p className="text-4xl font-black text-ink">{GALLERY.length}</p>
            <p className="mt-1 text-sm font-semibold text-muted">Gallery photos</p>
            <Link
              href="/gallery"
              className="mt-4 block text-sm font-black text-accent-strong hover:underline"
            >
              View gallery →
            </Link>
          </div>
          <div className="glass rounded-2xl p-6 shadow-sm">
            <p className="text-4xl font-black text-ink">{impactStats.length}</p>
            <p className="mt-1 text-sm font-semibold text-muted">Impact stats</p>
            <Link
              href="/admin/impact-stats"
              className="mt-4 block text-sm font-black text-accent-strong hover:underline"
            >
              Edit impact stats →
            </Link>
          </div>
        </div>

        {/* Manage content */}
        <div className="mt-10">
          <h2 className="mb-4 text-lg font-black text-ink">Manage content</h2>
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
                className="glass rounded-2xl px-5 py-4 text-sm font-black text-ink-soft shadow-sm transition hover:border-accent-strong hover:text-accent-strong"
              >
                {item.label} →
              </Link>
            ))}
          </div>
        </div>

        {/* Recent articles */}
        <div className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-black text-ink">Recent articles</h2>
            <Link
              href="/admin/articles/new"
              className="btn-primary rounded-full px-4 py-2 text-xs font-black"
            >
              + New article
            </Link>
          </div>
          <div className="overflow-hidden glass rounded-2xl">
            {articles.map((article, i) => (
              <div
                key={article.slug}
                className={`flex items-center justify-between px-6 py-4 ${i > 0 ? "border-t border-line" : ""}`}
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-ink">{article.title}</p>
                  <p className="text-xs text-muted">
                    {article.category} · {article.date}
                  </p>
                </div>
                <div className="ml-4 flex shrink-0 items-center gap-4">
                  <Link
                    href={`/blog/${article.slug}`}
                    className="text-xs font-semibold text-muted hover:text-ink-soft"
                    target="_blank"
                  >
                    View
                  </Link>
                  <Link
                    href={`/admin/articles/${article.slug}/edit`}
                    className="text-xs font-black text-accent-strong hover:underline"
                  >
                    Edit
                  </Link>
                  <AdminDeleteButton slug={article.slug} />
                </div>
              </div>
            ))}
            {articles.length === 0 && (
              <p className="px-6 py-8 text-center text-muted">
                No articles yet.{" "}
                <Link href="/admin/articles/new" className="font-black text-accent-strong">
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
