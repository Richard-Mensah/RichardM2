"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { OPPORTUNITY_CATEGORIES, type Opportunity } from "@/lib/opportunities-shared";

const FIELD =
  "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-brand-primary-accent focus:outline-none focus:ring-2 focus:ring-brand-primary-accent/20";
const LABEL = "mb-1.5 block text-sm font-semibold text-slate-700";

const EMPTY: Opportunity = {
  type: OPPORTUNITY_CATEGORIES[0].id,
  title: "",
  description: "",
  link: "",
  accent: OPPORTUNITY_CATEGORIES[0].accent,
};

export default function OpportunitiesManager({ initial }: { initial: Opportunity[] }) {
  const router = useRouter();
  const [items, setItems] = useState<Opportunity[]>(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function update(i: number, field: keyof Opportunity, value: string) {
    setItems((prev) => prev.map((o, idx) => (idx === i ? { ...o, [field]: value } : o)));
    setSaved(false);
  }
  function addRow() {
    setItems((prev) => [...prev, { ...EMPTY }]);
    setSaved(false);
  }
  function removeRow(i: number) {
    setItems((prev) => prev.filter((_, idx) => idx !== i));
    setSaved(false);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/opportunities", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ opportunities: items }),
      });
      if (!res.ok) {
        setError(
          res.status === 401
            ? "Your admin session expired. Please sign out and log in again."
            : `Save failed (HTTP ${res.status}).`
        );
        return;
      }
      const data = (await res.json()) as { ok: boolean; message?: string; opportunities?: Opportunity[] };
      if (data.ok) {
        setSaved(true);
        if (data.opportunities) setItems(data.opportunities);
        router.refresh();
      } else {
        setError(data.message ?? "Failed to save.");
      }
    } catch (err) {
      console.error("Opportunities save failed", err);
      setError("Could not reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">
      <p className="text-sm leading-6 text-slate-500">
        Add scholarships, internships, fellowships, and conferences. Each entry shows under its
        category on the public Opportunities page.
      </p>

      {items.length === 0 && (
        <p className="rounded-2xl border border-dashed border-slate-300 px-6 py-8 text-center text-sm text-slate-400">
          No opportunities yet. Add one below.
        </p>
      )}

      {items.map((o, i) => (
        <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-black uppercase tracking-[0.15em] text-slate-400">
              Opportunity {i + 1}
            </p>
            <button
              type="button"
              onClick={() => removeRow(i)}
              className="text-xs font-bold text-red-500 transition hover:text-red-700"
            >
              Remove
            </button>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-[180px_1fr]">
            <div>
              <label className={LABEL}>Category *</label>
              <select className={FIELD} value={o.type} onChange={(e) => update(i, "type", e.target.value)}>
                {OPPORTUNITY_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={LABEL}>Title *</label>
              <input className={FIELD} value={o.title} onChange={(e) => update(i, "title", e.target.value)} />
            </div>
          </div>

          <div className="mt-4">
            <label className={LABEL}>Description</label>
            <textarea className={FIELD} rows={2} value={o.description} onChange={(e) => update(i, "description", e.target.value)} />
          </div>

          <div className="mt-4">
            <label className={LABEL}>Link / URL</label>
            <input className={FIELD} value={o.link} placeholder="https://…" onChange={(e) => update(i, "link", e.target.value)} />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addRow}
        className="rounded-xl border border-dashed border-slate-300 px-5 py-3 text-sm font-bold text-slate-600 transition hover:border-brand-primary-accent hover:text-brand-primary-accent"
      >
        + Add opportunity
      </button>

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
