"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

const CATEGORIES = [
  "AI, Data & Climate",
  "AI Ethics & Technologies",
  "Youth Leadership",
  "Community & SDGs",
];

export default function AdminNewArticlePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    category: CATEGORIES[0],
    excerpt: "",
    content: "",
    coverImage: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/admin/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = (await res.json()) as { ok: boolean; slug?: string; message?: string };

    if (data.ok && data.slug) {
      router.push("/admin/articles");
      router.refresh();
    } else {
      setError(data.message ?? "Failed to create article.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-8">
        <h1 className="mb-8 text-2xl font-black font-display text-ink">New Article</h1>

        <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-ink-soft">Title *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="glass-input w-full"
              placeholder="Article title"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-ink-soft">Category *</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="glass-input w-full"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-ink-soft">
              Excerpt * <span className="font-normal text-muted">(shown in article list)</span>
            </label>
            <textarea
              name="excerpt"
              value={form.excerpt}
              onChange={handleChange}
              required
              rows={3}
              className="glass-input w-full"
              placeholder="Brief summary of the article"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-ink-soft">
              Content * <span className="font-normal text-muted">(Markdown supported)</span>
            </label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              required
              rows={20}
              className="glass-input w-full font-mono"
              placeholder="Write your article in Markdown…&#10;&#10;## Introduction&#10;&#10;Your content here…"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-ink-soft">
              Cover image path{" "}
              <span className="font-normal text-muted">(optional, e.g. /articles/my-image.jpg)</span>
            </label>
            <input
              name="coverImage"
              value={form.coverImage}
              onChange={handleChange}
              className="glass-input w-full"
              placeholder="/articles/cover.jpg"
            />
          </div>

          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
              {error}
            </p>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary rounded-xl px-6 py-3 text-sm font-black uppercase tracking-[0.1em] disabled:opacity-60"
            >
              {loading ? "Publishing…" : "Publish article"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="btn-ghost rounded-xl px-6 py-3 text-sm font-black"
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
