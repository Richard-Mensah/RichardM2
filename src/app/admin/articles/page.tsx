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
          <h1 className="text-2xl font-black text-slate-950">Articles</h1>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/articles/new"
              className="rounded-full bg-[#006FA6] px-4 py-2 text-xs font-black text-white transition hover:bg-[#009EDB]"
            >
              + New article
            </Link>
            <AdminLogoutButton />
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {articles.map((article, i) => (
            <div
              key={article.slug}
              className={`flex items-center justify-between px-6 py-5 ${i > 0 ? "border-t border-slate-100" : ""}`}
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-black text-slate-950">{article.title}</p>
                <p className="mt-0.5 text-xs text-slate-400">
                  {article.category} · {article.date}
                </p>
                <p className="mt-1 line-clamp-1 text-sm text-slate-500">{article.excerpt}</p>
              </div>
              <div className="ml-4 flex shrink-0 items-center gap-4">
                <Link
                  href={`/blog/${article.slug}`}
                  className="text-xs font-semibold text-slate-400 transition hover:text-slate-700"
                  target="_blank"
                >
                  View
                </Link>
                <Link
                  href={`/admin/articles/${article.slug}/edit`}
                  className="text-xs font-black text-[#009EDB] hover:underline"
                >
                  Edit
                </Link>
                <AdminDeleteButton slug={article.slug} />
              </div>
            </div>
          ))}
          {articles.length === 0 && (
            <p className="px-6 py-12 text-center text-slate-400">
              No articles yet.{" "}
              <Link href="/admin/articles/new" className="font-black text-[#009EDB]">
                Start writing →
              </Link>
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
