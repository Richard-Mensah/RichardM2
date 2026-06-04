"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { Testimonial } from "@/lib/testimonials";

const FIELD =
  "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-brand-primary-accent focus:outline-none focus:ring-2 focus:ring-brand-primary-accent/20";
const LABEL = "mb-1.5 block text-sm font-semibold text-slate-700";

const EMPTY: Testimonial = { name: "", role: "", quote: "", initials: "", accent: "#2BA8B4" };

export default function TestimonialsManager({ initial }: { initial: Testimonial[] }) {
  const router = useRouter();
  const [items, setItems] = useState<Testimonial[]>(initial.length ? initial : [{ ...EMPTY }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function update(i: number, field: keyof Testimonial, value: string) {
    setItems((prev) => prev.map((t, idx) => (idx === i ? { ...t, [field]: value } : t)));
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
      const res = await fetch("/api/admin/testimonials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ testimonials: items }),
      });
      if (!res.ok) {
        setError(
          res.status === 401
            ? "Your admin session expired. Please sign out and log in again."
            : `Save failed (HTTP ${res.status}).`
        );
        return;
      }
      const data = (await res.json()) as { ok: boolean; message?: string; testimonials?: Testimonial[] };
      if (data.ok) {
        setSaved(true);
        if (data.testimonials) setItems(data.testimonials.length ? data.testimonials : [{ ...EMPTY }]);
        router.refresh();
      } else {
        setError(data.message ?? "Failed to save.");
      }
    } catch (err) {
      console.error("Testimonials save failed", err);
      setError("Could not reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">
      <p className="text-sm leading-6 text-slate-500">
        These appear in the testimonials carousel on the homepage. Initials are auto-generated from
        the name if left blank.
      </p>

      {items.map((t, i) => (
        <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-black uppercase tracking-[0.15em] text-slate-400">
              Testimonial {i + 1}
            </p>
            <button
              type="button"
              onClick={() => removeRow(i)}
              className="text-xs font-bold text-red-500 transition hover:text-red-700"
            >
              Remove
            </button>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className={LABEL}>Name *</label>
              <input className={FIELD} value={t.name} onChange={(e) => update(i, "name", e.target.value)} />
            </div>
            <div>
              <label className={LABEL}>Role / title</label>
              <input className={FIELD} value={t.role} onChange={(e) => update(i, "role", e.target.value)} />
            </div>
          </div>

          <div className="mt-4">
            <label className={LABEL}>Quote *</label>
            <textarea className={FIELD} rows={3} value={t.quote} onChange={(e) => update(i, "quote", e.target.value)} />
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_140px]">
            <div>
              <label className={LABEL}>
                Initials <span className="font-normal text-slate-400">(optional)</span>
              </label>
              <input className={FIELD} value={t.initials} maxLength={4} onChange={(e) => update(i, "initials", e.target.value)} />
            </div>
            <div>
              <label className={LABEL}>Accent colour</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={t.accent}
                  onChange={(e) => update(i, "accent", e.target.value)}
                  className="h-11 w-14 cursor-pointer rounded-lg border border-slate-200"
                  aria-label="Accent colour"
                />
                <input className={FIELD} value={t.accent} onChange={(e) => update(i, "accent", e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addRow}
        className="rounded-xl border border-dashed border-slate-300 px-5 py-3 text-sm font-bold text-slate-600 transition hover:border-brand-primary-accent hover:text-brand-primary-accent"
      >
        + Add testimonial
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
