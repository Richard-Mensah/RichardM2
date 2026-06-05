import Link from "next/link";
import { getAllArticles } from "@/lib/articles";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import AdminDeleteButton from "@/components/admin/AdminDeleteButton";

export default function AdminArticlesPage() {
  const articles = getAllArticles();

  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-black font-display text-ink">Articles</h1>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/articles/new"
              className="btn-primary rounded-full px-4 py-2 text-xs font-black"
            >
              + New article
            </Link>
            <AdminLogoutButton />
          </div>
        </div>

        <div className="overflow-hidden glass rounded-2xl">
          {articles.map((article, i) => (
            <div
              key={article.slug}
              className={`flex items-center justify-between px-6 py-5 ${i > 0 ? "border-t border-line" : ""}`}
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-black text-ink">{article.title}</p>
                <p className="mt-0.5 text-xs text-muted">
                  {article.category} · {article.date}
                </p>
                <p className="mt-1 line-clamp-1 text-sm text-body">{article.excerpt}</p>
              </div>
              <div className="ml-4 flex shrink-0 items-center gap-4">
                <Link
                  href={`/blog/${article.slug}`}
                  className="text-xs font-semibold text-muted transition hover:text-ink-soft"
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
            <p className="px-6 py-12 text-center text-muted">
              No articles yet.{" "}
              <Link href="/admin/articles/new" className="font-black text-accent-strong">
                Start writing →
              </Link>
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
