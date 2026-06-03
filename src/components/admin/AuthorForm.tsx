"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { Author } from "@/lib/author";

const FIELD =
  "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-brand-primary-accent focus:outline-none focus:ring-2 focus:ring-brand-primary-accent/20";
const LABEL = "mb-1.5 block text-sm font-semibold text-slate-700";

export default function AuthorForm({ initial }: { initial: Author }) {
  const router = useRouter();
  const [form, setForm] = useState<Author>(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function update(field: keyof Author, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/admin/author", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = (await res.json()) as { ok: boolean; message?: string };
    if (data.ok) {
      setSaved(true);
      router.refresh();
    } else {
      setError(data.message ?? "Failed to save.");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      <p className="text-sm leading-6 text-slate-500">
        This bio appears in the &ldquo;About the author&rdquo; box at the bottom of every article.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={LABEL}>Name *</label>
          <input className={FIELD} value={form.name} onChange={(e) => update("name", e.target.value)} required />
        </div>
        <div>
          <label className={LABEL}>Role / title</label>
          <input className={FIELD} value={form.role} onChange={(e) => update("role", e.target.value)} />
        </div>
      </div>

      <div>
        <label className={LABEL}>Bio</label>
        <textarea className={FIELD} rows={4} value={form.bio} onChange={(e) => update("bio", e.target.value)} />
      </div>

      <div>
        <label className={LABEL}>
          Photo path / URL <span className="font-normal text-slate-400">(e.g. /Rich1.png)</span>
        </label>
        <input className={FIELD} value={form.photo} onChange={(e) => update("photo", e.target.value)} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={LABEL}>LinkedIn URL</label>
          <input className={FIELD} value={form.linkedin} onChange={(e) => update("linkedin", e.target.value)} />
        </div>
        <div>
          <label className={LABEL}>GitHub URL</label>
          <input className={FIELD} value={form.github} onChange={(e) => update("github", e.target.value)} />
        </div>
      </div>

      {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{error}</p>}

      <div className="sticky bottom-0 z-10 -mx-1 flex items-center gap-4 border-t border-slate-200 bg-white/95 px-1 py-4 backdrop-blur">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-brand-primary-darker px-6 py-3 text-sm font-black uppercase tracking-[0.1em] text-white transition hover:bg-brand-primary-accent disabled:opacity-60"
        >
          {loading ? "Saving…" : "Save changes"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-black text-slate-600 transition hover:border-slate-400"
        >
          Back to dashboard
        </button>
        {saved && <span className="text-sm font-semibold text-green-700">Saved ✓</span>}
      </div>
    </form>
  );
}
