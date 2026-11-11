"use client";

import { useRef, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { Testimonial } from "@/lib/testimonials";

const FIELD = "glass-input";
const LABEL = "mb-1.5 block text-sm font-semibold text-accent-strong";

const EMPTY: Testimonial = { name: "", role: "", quote: "", initials: "", accent: "#4f8bff", avatar: "", outcome: "", rating: 5 };

/** Photo upload with preview; stores the Blob URL in the testimonial's avatar field. */
function AvatarField({
  id,
  value,
  initials,
  accent,
  onChange,
}: {
  id: string;
  value: string;
  initials: string;
  accent: string;
  onChange: (url: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function upload(file: File) {
    setBusy(true);
    setErr(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "testimonials");
      const res = await fetch("/api/admin/upload", { method: "POST", credentials: "same-origin", body: fd });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; url?: string; message?: string };
      if (!res.ok || !data.ok || !data.url) {
        setErr(res.status === 401 ? "Session expired. Log in again." : data.message ?? `Upload failed (HTTP ${res.status}).`);
        return;
      }
      onChange(data.url);
    } catch {
      setErr("Upload failed. Check your connection.");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div>
      <label htmlFor={id} className={LABEL}>
        Photo <span className="font-normal text-muted">(square works best; initials are shown if empty)</span>
      </label>
      <div className="flex items-center gap-4">
        <span
          className="relative grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full text-lg font-black text-white"
          style={{ background: `linear-gradient(135deg, ${accent}, ${accent}aa)` }}
        >
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            initials || "?"
          )}
        </span>
        <div className="min-w-0 flex-1 space-y-2">
          <input id={id} className={FIELD} placeholder="Upload a photo or paste an image URL" value={value} onChange={(e) => onChange(e.target.value)} />
          <div className="flex flex-wrap items-center gap-3">
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              aria-label="Upload photo"
              className="text-xs"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void upload(f);
              }}
            />
            {busy && <span className="text-xs font-semibold text-accent-strong">Uploading…</span>}
            {value && (
              <button type="button" onClick={() => onChange("")} className="text-xs font-bold text-red-500">
                Remove photo
              </button>
            )}
          </div>
          {err && <p className="text-xs font-semibold text-red-600">{err}</p>}
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsManager({ initial }: { initial: Testimonial[] }) {
  const router = useRouter();
  const [items, setItems] = useState<Testimonial[]>(initial.length ? initial : [{ ...EMPTY }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function update(i: number, field: keyof Testimonial, value: string | number) {
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
      <p className="text-sm leading-6 text-body">
        These appear in the testimonials spotlight on the homepage. Upload a photo for each person (or leave it empty to show initials). Initials are auto-generated from
        the name if left blank.
      </p>

      {items.map((t, i) => (
        <div key={i} className="glass rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-black uppercase tracking-[0.15em] text-muted">
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
              <label htmlFor={`t-name-${i}`} className={LABEL}>Name *</label>
              <input id={`t-name-${i}`} className={FIELD} value={t.name} onChange={(e) => update(i, "name", e.target.value)} />
            </div>
            <div>
              <label htmlFor={`t-role-${i}`} className={LABEL}>Role / title</label>
              <input id={`t-role-${i}`} className={FIELD} value={t.role} onChange={(e) => update(i, "role", e.target.value)} />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor={`t-quote-${i}`} className={LABEL}>Quote *</label>
            <textarea id={`t-quote-${i}`} className={FIELD} rows={3} value={t.quote} onChange={(e) => update(i, "quote", e.target.value)} />
          </div>

          <div className="mt-4">
            <AvatarField
              id={`t-avatar-${i}`}
              value={t.avatar}
              initials={t.initials || t.name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("")}
              accent={t.accent}
              onChange={(url) => update(i, "avatar", url)}
            />
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_200px]">
            <div>
              <label htmlFor={`t-outcome-${i}`} className={LABEL}>
                Achievement <span className="font-normal text-muted">(short result, e.g. &ldquo;Fellowship secured&rdquo;)</span>
              </label>
              <input id={`t-outcome-${i}`} className={FIELD} maxLength={120} value={t.outcome} onChange={(e) => update(i, "outcome", e.target.value)} />
            </div>
            <div>
              <label htmlFor={`t-rating-${i}`} className={LABEL}>Star rating</label>
              <select id={`t-rating-${i}`} className={FIELD} value={t.rating} onChange={(e) => update(i, "rating", Number(e.target.value))}>
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {"★".repeat(n)} ({n})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_140px]">
            <div>
              <label htmlFor={`t-initials-${i}`} className={LABEL}>
                Initials <span className="font-normal text-muted">(optional)</span>
              </label>
              <input id={`t-initials-${i}`} className={FIELD} value={t.initials} maxLength={4} onChange={(e) => update(i, "initials", e.target.value)} />
            </div>
            <div>
              <label htmlFor={`t-accent-${i}`} className={LABEL}>Accent colour</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={t.accent}
                  onChange={(e) => update(i, "accent", e.target.value)}
                  className="h-11 w-14 cursor-pointer rounded-lg border border-line"
                  aria-label="Accent colour picker"
                />
                <input id={`t-accent-${i}`} title="Accent colour hex value" className={FIELD} value={t.accent} onChange={(e) => update(i, "accent", e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addRow}
        className="rounded-xl border border-dashed border-line px-5 py-3 text-sm font-bold text-ink-soft transition hover:border-accent hover:text-accent-strong"
      >
        + Add testimonial
      </button>

      {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{error}</p>}

      <div className="sticky bottom-0 z-10 -mx-1 flex items-center gap-4 border-t border-line bg-white/95 px-1 py-4 backdrop-blur">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary disabled:opacity-60"
        >
          {loading ? "Saving…" : "Save changes"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="btn-ghost"
        >
          Back to dashboard
        </button>
        {saved && <span className="text-sm font-semibold text-green-700">Saved ✓</span>}
      </div>
    </form>
  );
}
