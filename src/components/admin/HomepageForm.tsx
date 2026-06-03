"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { HomepageContent } from "@/lib/homepage";

const FIELD =
  "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-brand-primary-accent focus:outline-none focus:ring-2 focus:ring-brand-primary-accent/20";
const LABEL = "mb-1.5 block text-sm font-semibold text-slate-700";

export default function HomepageForm({ initial }: { initial: HomepageContent }) {
  const router = useRouter();
  const [form, setForm] = useState<HomepageContent>(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function update(field: keyof HomepageContent, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/admin/homepage", {
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
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="text-xs font-black uppercase tracking-[0.15em] text-slate-400">Hero (top of homepage)</p>
        <div className="mt-4 space-y-4">
          <div>
            <label className={LABEL}>Eyebrow / name</label>
            <input className={FIELD} value={form.heroEyebrow} onChange={(e) => update("heroEyebrow", e.target.value)} />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className={LABEL}>Title — lead</label>
              <input className={FIELD} value={form.heroTitleLead} onChange={(e) => update("heroTitleLead", e.target.value)} />
            </div>
            <div>
              <label className={LABEL}>Title — highlight</label>
              <input className={FIELD} value={form.heroTitleHighlight} onChange={(e) => update("heroTitleHighlight", e.target.value)} />
            </div>
            <div>
              <label className={LABEL}>Title — tail</label>
              <input className={FIELD} value={form.heroTitleTail} onChange={(e) => update("heroTitleTail", e.target.value)} />
            </div>
          </div>
          <div>
            <label className={LABEL}>Subtitle</label>
            <textarea className={FIELD} rows={2} value={form.heroSubtitle} onChange={(e) => update("heroSubtitle", e.target.value)} />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="text-xs font-black uppercase tracking-[0.15em] text-slate-400">Welcome / intro</p>
        <div className="mt-4 space-y-4">
          <div>
            <label className={LABEL}>Welcome heading</label>
            <textarea className={FIELD} rows={2} value={form.welcomeTitle} onChange={(e) => update("welcomeTitle", e.target.value)} />
          </div>
          <div>
            <label className={LABEL}>
              Welcome body <span className="font-normal text-slate-400">(separate paragraphs with a blank line)</span>
            </label>
            <textarea className={FIELD} rows={8} value={form.welcomeBody} onChange={(e) => update("welcomeBody", e.target.value)} />
          </div>
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
