"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { CLIENT_CATEGORY_LABEL, clientWorkStats } from "@/data/clientWork";
import type { ClientCategory, ClientProject, ClientShot } from "@/types";

const FIELD = "glass-input";
const LABEL = "mb-1.5 block text-sm font-semibold text-accent-strong";
const HINT = "font-normal text-muted";

/** Form state keeps list fields as plain text so they are easy to edit. */
type Draft = Omit<ClientProject, "highlights" | "badges" | "tags" | "rarity"> & {
  highlights: string;
  badges: string;
  tags: string;
  _key: string;
  _open: boolean;
};

const CATEGORY_OPTIONS: ClientCategory[] = ["organisation", "personal", "software"];

let keySeq = 0;
const nextKey = () => `p${Date.now()}-${keySeq++}`;

function toDraft(p: ClientProject, open = false): Draft {
  return {
    ...p,
    highlights: p.highlights.join("\n"),
    badges: p.badges.join(", "),
    tags: p.tags.join(", "),
    _key: nextKey(),
    _open: open,
  };
}

function fromDraft(d: Draft) {
  const { _key, _open, ...rest } = d;
  return {
    ...rest,
    highlights: d.highlights.split(/\r?\n/).map((s) => s.trim()).filter(Boolean),
    badges: d.badges.split(",").map((s) => s.trim()).filter(Boolean),
    tags: d.tags.split(",").map((s) => s.trim()).filter(Boolean),
  };
}

const EMPTY = (): Draft => ({
  slug: "",
  name: "",
  client: "",
  category: "organisation",
  url: "https://",
  location: "",
  tagline: "",
  summary: "",
  highlights: "",
  badges: "",
  tags: "",
  desktop: { src: "", width: 1440, height: 900 },
  mobile: undefined,
  featured: false,
  _key: nextKey(),
  _open: true,
});

function readSize(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read that image."));
    };
    img.src = url;
  });
}

function ShotField({
  id,
  label,
  hint,
  value,
  onChange,
  optional,
}: {
  id: string;
  label: string;
  hint: string;
  value: ClientShot | undefined;
  onChange: (v: ClientShot | undefined) => void;
  optional?: boolean;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function upload(file: File) {
    setBusy(true);
    setErr(null);
    try {
      const size = await readSize(file);
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "client-work");
      const res = await fetch("/api/admin/upload", { method: "POST", credentials: "same-origin", body: fd });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; url?: string; message?: string };
      if (!res.ok || !data.ok || !data.url) {
        setErr(res.status === 401 ? "Session expired. Log in again." : data.message ?? `Upload failed (HTTP ${res.status}).`);
        return;
      }
      onChange({ src: data.url, ...size });
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div>
      <label htmlFor={id} className={LABEL}>
        {label} <span className={HINT}>{hint}</span>
      </label>
      <div className="flex gap-3">
        <div className="h-24 w-20 shrink-0 overflow-hidden rounded-lg border border-line bg-surface-muted">
          {value?.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value.src} alt="" className="h-full w-full object-cover object-top" />
          ) : (
            <span className="grid h-full place-items-center text-[10px] text-muted">No image</span>
          )}
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <input
            id={id}
            className={FIELD}
            placeholder="/work/my-site-desktop.jpg or https://…"
            value={value?.src ?? ""}
            onChange={(e) => {
              const src = e.target.value;
              if (!src && optional) return onChange(undefined);
              onChange({ src, width: value?.width ?? (optional ? 780 : 1440), height: value?.height ?? 900 });
            }}
          />
          <div className="flex flex-wrap items-center gap-2">
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              aria-label={`Upload ${label}`}
              className="text-xs"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void upload(f);
              }}
            />
            {busy && <span className="text-xs font-semibold text-accent-strong">Uploading…</span>}
            {value?.src && (
              <span className="text-[11px] text-muted">
                {value.width}×{value.height}px
              </span>
            )}
            {optional && value?.src && (
              <button type="button" onClick={() => onChange(undefined)} className="text-xs font-bold text-red-500">
                Remove
              </button>
            )}
          </div>
          {err && <p className="text-xs font-semibold text-red-600">{err}</p>}
        </div>
      </div>
    </div>
  );
}

export default function ClientWorkManager({ initial }: { initial: ClientProject[] }) {
  const router = useRouter();
  const [items, setItems] = useState<Draft[]>(() => initial.map((p) => toDraft(p)));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const stats = clientWorkStats(items.map((d) => ({ ...fromDraft(d), rarity: "rare" }) as ClientProject));

  function update<K extends keyof Draft>(i: number, field: K, value: Draft[K]) {
    setItems((prev) => prev.map((d, idx) => (idx === i ? { ...d, [field]: value } : d)));
    setSaved(false);
  }
  function move(i: number, dir: -1 | 1) {
    setItems((prev) => {
      const j = i + dir;
      if (j < 0 || j >= prev.length) return prev;
      const next = [...prev];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
    setSaved(false);
  }
  function remove(i: number) {
    const name = items[i]?.name || "this project";
    if (!confirm(`Remove ${name}? It disappears from the site when you save.`)) return;
    setItems((prev) => prev.filter((_, idx) => idx !== i));
    setSaved(false);
  }
  function add() {
    setItems((prev) => [EMPTY(), ...prev]);
    setSaved(false);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/client-work", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ projects: items.map(fromDraft) }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string; projects?: ClientProject[] };
      if (!res.ok || !data.ok) {
        setError(
          res.status === 401
            ? "Your admin session expired. Please sign out and log in again."
            : data.message ?? `Save failed (HTTP ${res.status}).`,
        );
        return;
      }
      if (data.projects) setItems(data.projects.map((p) => toDraft(p)));
      setSaved(true);
      router.refresh();
    } catch (err) {
      console.error("Client work save failed", err);
      setError("Could not reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-5">
      <p className="text-sm leading-6 text-body">
        Projects listed here power the <strong>Shipped for clients</strong> section on the homepage, the{" "}
        <strong>/work</strong> page and the portfolio. The counters on the site update automatically from the categories
        below. Tick <em>Featured</em> to show a project on the homepage. Use the arrows to set the order.
      </p>

      {/* Live analytics preview */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { k: "Total builds", v: stats.total },
          { k: CLIENT_CATEGORY_LABEL.organisation + " sites", v: stats.organisations },
          { k: CLIENT_CATEGORY_LABEL.personal + " sites", v: stats.personal },
          { k: CLIENT_CATEGORY_LABEL.software, v: stats.software },
        ].map((s) => (
          <div key={s.k} className="glass rounded-2xl p-4 shadow-sm">
            <p className="text-3xl font-black text-ink">{s.v}</p>
            <p className="mt-1 text-xs font-semibold text-muted">{s.k}</p>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={add}
        className="w-full rounded-xl border border-dashed border-line px-5 py-3 text-sm font-bold text-ink-soft transition hover:border-accent hover:text-accent-strong"
      >
        + Add a completed project
      </button>

      {items.map((d, i) => (
        <div key={d._key} className="glass rounded-2xl shadow-sm">
          {/* Summary row */}
          <div className="flex flex-wrap items-center gap-3 p-4">
            <div className="h-12 w-16 shrink-0 overflow-hidden rounded-md border border-line bg-surface-muted">
              {d.desktop?.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={d.desktop.src} alt="" className="h-full w-full object-cover object-top" />
              ) : null}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-black text-ink">{d.name || "Untitled project"}</p>
              <p className="text-xs text-muted">
                #{i + 1} · {CLIENT_CATEGORY_LABEL[d.category]}
                {d.featured ? " · ★ Featured" : ""}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up" className="rounded-lg px-2.5 py-1.5 text-sm font-bold text-ink-soft hover:bg-surface-muted disabled:opacity-30">
                ↑
              </button>
              <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1} aria-label="Move down" className="rounded-lg px-2.5 py-1.5 text-sm font-bold text-ink-soft hover:bg-surface-muted disabled:opacity-30">
                ↓
              </button>
              <button type="button" onClick={() => update(i, "_open", !d._open)} className="rounded-lg px-3 py-1.5 text-xs font-black text-accent-strong hover:bg-accent-tint">
                {d._open ? "Close" : "Edit"}
              </button>
              <button type="button" onClick={() => remove(i)} className="rounded-lg px-3 py-1.5 text-xs font-bold text-red-500 hover:bg-red-50">
                Remove
              </button>
            </div>
          </div>

          {d._open && (
            <div className="space-y-4 border-t border-line p-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor={`cw-name-${d._key}`} className={LABEL}>Project name *</label>
                  <input id={`cw-name-${d._key}`} className={FIELD} value={d.name} onChange={(e) => update(i, "name", e.target.value)} />
                </div>
                <div>
                  <label htmlFor={`cw-client-${d._key}`} className={LABEL}>Client <span className={HINT}>(person or organisation)</span></label>
                  <input id={`cw-client-${d._key}`} className={FIELD} value={d.client} onChange={(e) => update(i, "client", e.target.value)} />
                </div>
                <div>
                  <label htmlFor={`cw-cat-${d._key}`} className={LABEL}>Category *</label>
                  <select id={`cw-cat-${d._key}`} className={FIELD} value={d.category} onChange={(e) => update(i, "category", e.target.value as ClientCategory)}>
                    {CATEGORY_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {CLIENT_CATEGORY_LABEL[c]}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor={`cw-url-${d._key}`} className={LABEL}>Live URL *</label>
                  <input id={`cw-url-${d._key}`} type="url" className={FIELD} value={d.url} onChange={(e) => update(i, "url", e.target.value)} />
                </div>
                <div>
                  <label htmlFor={`cw-loc-${d._key}`} className={LABEL}>Location</label>
                  <input id={`cw-loc-${d._key}`} className={FIELD} placeholder="e.g. Accra, Ghana" value={d.location} onChange={(e) => update(i, "location", e.target.value)} />
                </div>
                <div className="flex items-end">
                  <label className="flex min-h-11 cursor-pointer items-center gap-2 text-sm font-semibold text-ink">
                    <input type="checkbox" checked={Boolean(d.featured)} onChange={(e) => update(i, "featured", e.target.checked)} className="h-4 w-4" />
                    Featured on the homepage
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor={`cw-tag-${d._key}`} className={LABEL}>Tagline <span className={HINT}>(one line on the card)</span></label>
                <input id={`cw-tag-${d._key}`} className={FIELD} value={d.tagline} onChange={(e) => update(i, "tagline", e.target.value)} />
              </div>
              <div>
                <label htmlFor={`cw-sum-${d._key}`} className={LABEL}>Summary <span className={HINT}>(shown in the case file)</span></label>
                <textarea id={`cw-sum-${d._key}`} rows={3} className={FIELD} value={d.summary} onChange={(e) => update(i, "summary", e.target.value)} />
              </div>
              <div>
                <label htmlFor={`cw-hl-${d._key}`} className={LABEL}>What I built <span className={HINT}>(one point per line, up to 8)</span></label>
                <textarea id={`cw-hl-${d._key}`} rows={4} className={FIELD} value={d.highlights} onChange={(e) => update(i, "highlights", e.target.value)} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor={`cw-badges-${d._key}`} className={LABEL}>Achievement badges <span className={HINT}>(comma separated, up to 4)</span></label>
                  <input id={`cw-badges-${d._key}`} className={FIELD} placeholder="Healthcare, UK Client" value={d.badges} onChange={(e) => update(i, "badges", e.target.value)} />
                </div>
                <div>
                  <label htmlFor={`cw-tags-${d._key}`} className={LABEL}>Build notes / tech <span className={HINT}>(comma separated)</span></label>
                  <input id={`cw-tags-${d._key}`} className={FIELD} placeholder="Next.js, Database, SEO" value={d.tags} onChange={(e) => update(i, "tags", e.target.value)} />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <ShotField
                  id={`cw-desk-${d._key}`}
                  label="Desktop screenshot *"
                  hint="(full-page capture, ~1440px wide)"
                  value={d.desktop}
                  onChange={(v) => update(i, "desktop", v ?? { src: "", width: 1440, height: 900 })}
                />
                <ShotField
                  id={`cw-mob-${d._key}`}
                  label="Mobile screenshot"
                  hint="(optional, phone width)"
                  value={d.mobile}
                  optional
                  onChange={(v) => update(i, "mobile", v)}
                />
              </div>
              <p className="text-xs text-muted">
                Tip: tall full-page screenshots scroll automatically on the site. In Chrome, open the site, press F12 →
                Ctrl+Shift+P → &ldquo;Capture full size screenshot&rdquo;.
              </p>
            </div>
          )}
        </div>
      ))}

      {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{error}</p>}

      <div className="sticky bottom-0 z-10 -mx-1 flex items-center gap-4 border-t border-line bg-white/95 px-1 py-4 backdrop-blur">
        <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60">
          {loading ? "Saving…" : "Save changes"}
        </button>
        <button type="button" onClick={() => router.push("/admin")} className="btn-ghost">
          Back to dashboard
        </button>
        {saved && <span className="text-sm font-semibold text-green-700">Saved ✓ The site is updated.</span>}
      </div>
    </form>
  );
}
