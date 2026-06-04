"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { ImpactStat } from "@/lib/impactStats";

type Props = {
  initialStats: ImpactStat[];
};

const EMPTY: ImpactStat = { value: "", label: "", detail: "" };

export default function ImpactStatsForm({ initialStats }: Props) {
  const router = useRouter();
  const [stats, setStats] = useState<ImpactStat[]>(
    initialStats.length ? initialStats : [{ ...EMPTY }]
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function update(index: number, field: keyof ImpactStat, value: string) {
    setStats((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
    setSaved(false);
  }

  function addRow() {
    setStats((prev) => [...prev, { ...EMPTY }]);
    setSaved(false);
  }

  function removeRow(index: number) {
    setStats((prev) => prev.filter((_, i) => i !== index));
    setSaved(false);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSaved(false);

    try {
      const res = await fetch("/api/admin/impact-stats", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ stats }),
      });

      if (!res.ok) {
        let msg = `Save failed (HTTP ${res.status}).`;
        try {
          const d = (await res.json()) as { message?: string };
          if (d?.message) msg = d.message;
        } catch {
          /* non-JSON response */
        }
        if (res.status === 401) msg = "Your admin session expired. Please sign out and log in again.";
        setError(msg);
        return;
      }

      const data = (await res.json()) as { ok: boolean; message?: string; stats?: ImpactStat[] };
      if (data.ok) {
        setSaved(true);
        if (data.stats) setStats(data.stats);
        router.refresh();
      } else {
        setError(data.message ?? "Failed to save stats.");
      }
    } catch (err) {
      console.error("Impact stats save failed", err);
      setError("Could not reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">
      <p className="text-sm leading-6 text-[#8aa0c4]">
        These numbers appear on the homepage impact dashboard and the About page. Edit the value,
        label, and supporting detail for each, add or remove rows, then save.
      </p>

      {stats.map((stat, i) => (
        <div key={i} className="glass rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-black uppercase tracking-[0.15em] text-[#7e92b6]">
              Stat {i + 1}
            </p>
            <button
              type="button"
              onClick={() => removeRow(i)}
              className="text-xs font-bold text-red-500 transition hover:text-red-700"
            >
              Remove
            </button>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-[140px_1fr]">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#cdd9ee]">Value *</label>
              <input
                value={stat.value}
                onChange={(e) => update(i, "value", e.target.value)}
                placeholder="2,500+"
                className="w-full rounded-xl border border-white/10 px-4 py-3 text-sm focus:border-brand-primary-accent focus:outline-none focus:ring-2 focus:ring-brand-primary-accent/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#cdd9ee]">Label *</label>
              <input
                value={stat.label}
                onChange={(e) => update(i, "label", e.target.value)}
                placeholder="Youth impacted"
                className="w-full rounded-xl border border-white/10 px-4 py-3 text-sm focus:border-brand-primary-accent focus:outline-none focus:ring-2 focus:ring-brand-primary-accent/20"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-1.5 block text-sm font-semibold text-[#cdd9ee]">
              Detail <span className="font-normal text-[#7e92b6]">(shown on the homepage)</span>
            </label>
            <textarea
              value={stat.detail}
              onChange={(e) => update(i, "detail", e.target.value)}
              rows={2}
              placeholder="Through training, mentorship, and leadership programmes…"
              className="w-full rounded-xl border border-white/10 px-4 py-3 text-sm focus:border-brand-primary-accent focus:outline-none focus:ring-2 focus:ring-brand-primary-accent/20"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addRow}
        className="rounded-xl border border-dashed border-white/15 px-5 py-3 text-sm font-bold text-[#a9bcdc] transition hover:border-brand-primary-accent hover:text-brand-primary-accent"
      >
        + Add stat
      </button>

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{error}</p>
      )}
      {saved && (
        <p className="rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
          Stats saved successfully.
        </p>
      )}

      <div className="sticky bottom-0 z-10 -mx-1 flex items-center gap-4 border-t border-white/10 bg-white/95 px-1 py-4 backdrop-blur">
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
          className="rounded-xl border border-white/10 px-6 py-3 text-sm font-black text-[#a9bcdc] transition hover:border-slate-400"
        >
          Back to dashboard
        </button>
        {saved && <span className="text-sm font-semibold text-green-700">Saved ✓</span>}
      </div>
    </form>
  );
}
