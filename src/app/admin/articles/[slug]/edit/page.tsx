import { notFound } from "next/navigation";
import { getArticle } from "@/lib/articles";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import ArticleEditForm from "@/components/admin/ArticleEditForm";

type Props = { params: Promise<{ slug: string }> };

export default async function AdminEditArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) notFound();

  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black font-display text-ink">Edit Article</h1>
            <p className="mt-1 text-sm text-muted">slug: {slug}</p>
          </div>
          <AdminLogoutButton />
        </div>
        <ArticleEditForm
          slug={slug}
          initialData={{
            title: article.meta.title,
            category: article.meta.category,
            excerpt: article.meta.excerpt,
            content: article.content,
            coverImage: article.meta.coverImage,
            date: article.meta.date,
          }}
        />
      </main>
    </div>
  );
}
