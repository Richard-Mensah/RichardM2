"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { TRACK_META, type Track, type TrackOverride, type TrackOverrides } from "@/lib/githubTracks";

type Row = { name: string; url: string; language: string | null; isPrivate: boolean; auto: Track; reason: string };
type Choice = "auto" | TrackOverride;

const LABEL: Record<Track | "hidden", string> = {
  ai: TRACK_META.ai.short,
  web: TRACK_META.web.short,
  other: "Unsorted",
  hidden: "Hidden",
};

export default function GitHubTracksManager({
  repos,
  initial,
  tokenConfigured,
}: {
  repos: Row[];
  initial: TrackOverrides;
  tokenConfigured: boolean;
}) {
  const router = useRouter();
  const [overrides, setOverrides] = useState<TrackOverrides>(initial);
  const [query, setQuery] = useState("");
  const [only, setOnly] = useState<"all" | Track | "hidden">("all");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const effective = (r: Row): Track | "hidden" => overrides[r.name] ?? r.auto;

  const counts = useMemo(() => {
    const c = { ai: 0, web: 0, other: 0, hidden: 0 };
    for (const r of repos) c[overrides[r.name] ?? r.auto]++;
    return c;
  }, [repos, overrides]);

  const rows = repos.filter(
    (r) => (only === "all" || effective(r) === only) && r.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  function set(name: string, choice: Choice) {
    setOverrides((prev) => {
      const next = { ...prev };
      if (choice === "auto") delete next[name];
      else next[name] = choice;
      return next;
    });
    setSaved(false);
  }

  async function save() {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/github-tracks", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ overrides }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string };
      if (!res.ok || !data.ok) {
        setError(res.status === 401 ? "Your admin session expired. Please log in again." : data.message ?? `Save failed (HTTP ${res.status}).`);
        return;
      }
      setSaved(true);
      router.refresh();
    } catch {
      setError("Could not reach the server. Check your connection and try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-5xl space-y-5">
      <p className="text-sm leading-6 text-body">
        Every GitHub repository is sorted automatically into <strong>{TRACK_META.ai.label}</strong> or{" "}
        <strong>{TRACK_META.web.label}</strong> (using topics, language and keywords). Change any repo here and it updates the
        homepage. Tip: adding a topic such as <code>machine-learning</code> or <code>nextjs</code> on GitHub also sorts it
        automatically. GitHub data refreshes about once an hour.
      </p>
      {!tokenConfigured && (
        <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
          No <code>GITHUB_TOKEN</code>{" "}is set, so only public repositories are listed and private projects aren&rsquo;t counted.
          Add the token in Vercel to include them.
        </p>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {(["ai", "web", "other", "hidden"] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setOnly(only === k ? "all" : k)}
            className={`glass rounded-2xl p-4 text-left shadow-sm transition ${only === k ? "ring-2 ring-accent" : ""}`}
          >
            <p className="text-3xl font-black text-ink">{counts[k]}</p>
            <p className="mt-1 text-xs font-semibold text-muted">{LABEL[k]}</p>
          </button>
        ))}
      </div>

      <input className="glass-input" placeholder="Search repositories…" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search repositories" />

      {repos.length === 0 ? (
        <p className="glass rounded-2xl p-6 text-sm text-body">Couldn&rsquo;t reach GitHub just now. Try again in a minute.</p>
      ) : (
        <div className="glass overflow-hidden rounded-2xl shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-surface-muted text-left text-xs font-black uppercase tracking-[0.12em] text-muted">
              <tr>
                <th className="px-4 py-3">Repository</th>
                <th className="hidden px-4 py-3 md:table-cell">Auto-detected</th>
                <th className="px-4 py-3">Show as</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((r) => {
                const choice: Choice = overrides[r.name] ?? "auto";
                return (
                  <tr key={r.name}>
                    <td className="px-4 py-3">
                      <a href={r.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink hover:text-accent-strong">
                        {r.name}
                      </a>
                      <p className="text-xs text-muted">
                        {r.language ?? "No language"}
                        {r.isPrivate ? " · private (name never shown publicly)" : ""}
                      </p>
                    </td>
                    <td className="hidden px-4 py-3 text-xs text-body md:table-cell">
                      <span className="font-bold text-ink">{LABEL[r.auto]}</span> · {r.reason}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        className="glass-input min-w-[12rem] max-w-[16rem]"
                        value={choice}
                        onChange={(e) => set(r.name, e.target.value as Choice)}
                        aria-label={`Track for ${r.name}`}
                      >
                        <option value="auto">Auto ({LABEL[r.auto]})</option>
                        <option value="ai">{TRACK_META.ai.short}</option>
                        <option value="web">{TRACK_META.web.short}</option>
                        <option value="hidden">Hide from site</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{error}</p>}

      <div className="sticky bottom-0 z-10 -mx-1 flex items-center gap-4 border-t border-line bg-white/95 px-1 py-4 backdrop-blur">
        <button type="button" onClick={save} disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? "Saving…" : "Save changes"}
        </button>
        <button type="button" onClick={() => router.push("/admin")} className="btn-ghost">
          Back to dashboard
        </button>
        {saved && <span className="text-sm font-semibold text-green-700">Saved ✓ Homepage updated.</span>}
      </div>
    </div>
  );
}
