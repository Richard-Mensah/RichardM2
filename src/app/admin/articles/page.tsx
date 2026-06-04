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
          <h1 className="text-2xl font-black text-white">Articles</h1>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/articles/new"
              className="rounded-full bg-[#3a78e0] px-4 py-2 text-xs font-black text-white transition hover:bg-[#4f8bff]"
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
              className={`flex items-center justify-between px-6 py-5 ${i > 0 ? "border-t border-white/10" : ""}`}
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-black text-white">{article.title}</p>
                <p className="mt-0.5 text-xs text-[#7e92b6]">
                  {article.category} · {article.date}
                </p>
                <p className="mt-1 line-clamp-1 text-sm text-[#8aa0c4]">{article.excerpt}</p>
              </div>
              <div className="ml-4 flex shrink-0 items-center gap-4">
                <Link
                  href={`/blog/${article.slug}`}
                  className="text-xs font-semibold text-[#7e92b6] transition hover:text-[#cdd9ee]"
                  target="_blank"
                >
                  View
                </Link>
                <Link
                  href={`/admin/articles/${article.slug}/edit`}
                  className="text-xs font-black text-[#4f8bff] hover:underline"
                >
                  Edit
                </Link>
                <AdminDeleteButton slug={article.slug} />
              </div>
            </div>
          ))}
          {articles.length === 0 && (
            <p className="px-6 py-12 text-center text-[#7e92b6]">
              No articles yet.{" "}
              <Link href="/admin/articles/new" className="font-black text-[#4f8bff]">
                Start writing →
              </Link>
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
