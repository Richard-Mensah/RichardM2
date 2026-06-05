"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

const CATEGORIES = [
  "AI, Data & Climate",
  "AI Ethics & Technologies",
  "Youth Leadership",
  "Community & SDGs",
];

type Props = {
  slug: string;
  initialData: {
    title: string;
    category: string;
    excerpt: string;
    content: string;
    coverImage?: string;
    date: string;
  };
};

export default function ArticleEditForm({ slug, initialData }: Props) {
  const router = useRouter();
  const [form, setForm] = useState({
    title: initialData.title ?? "",
    category: initialData.category ?? CATEGORIES[0],
    excerpt: initialData.excerpt ?? "",
    content: initialData.content ?? "",
    coverImage: initialData.coverImage ?? "",
    date: initialData.date ?? "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setSaved(false);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSaved(false);

    const res = await fetch(`/api/admin/articles/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.title,
        category: form.category,
        date: form.date,
        excerpt: form.excerpt,
        ...(form.coverImage ? { coverImage: form.coverImage } : {}),
        content: form.content,
      }),
    });

    const data = (await res.json()) as { ok: boolean; message?: string };

    if (data.ok) {
      setSaved(true);
      router.refresh();
    } else {
      setError(data.message ?? "Failed to save article.");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-accent-strong">Title *</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="glass-input"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-accent-strong">Category *</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="glass-input"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-accent-strong">Date</label>
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            className="glass-input"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-accent-strong">Excerpt *</label>
        <textarea
          name="excerpt"
          value={form.excerpt}
          onChange={handleChange}
          required
          rows={3}
          className="glass-input"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-accent-strong">
          Content <span className="font-normal text-muted">(Markdown)</span>
        </label>
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          required
          rows={24}
          className="glass-input font-mono"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-accent-strong">
          Cover image path <span className="font-normal text-muted">(optional)</span>
        </label>
        <input
          name="coverImage"
          value={form.coverImage}
          onChange={handleChange}
          className="glass-input"
          placeholder="/articles/cover.jpg"
        />
      </div>

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
          {error}
        </p>
      )}
      {saved && (
        <p className="rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
          Article saved successfully.
        </p>
      )}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary disabled:opacity-60"
        >
          {loading ? "Saving…" : "Save changes"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/articles")}
          className="btn-ghost"
        >
          Back to articles
        </button>
      </div>
    </form>
  );
}
