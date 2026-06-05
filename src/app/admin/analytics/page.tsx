import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import { getAnalyticsSummary } from "@/lib/analytics";

export const dynamic = "force-dynamic";

export default async function AdminAnalyticsPage() {
  const a = await getAnalyticsSummary();
  const maxDay = Math.max(1, ...a.perDay.map((d) => d.views));

  const cards = [
    { label: "Total page views", value: a.total },
    { label: "Last 7 days", value: a.last7 },
    { label: "Last 30 days", value: a.last30 },
  ];

  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black font-display text-ink">Analytics</h1>
            <p className="mt-1 text-sm text-muted">Cookieless page views, no personal data collected.</p>
          </div>
          <AdminLogoutButton />
        </div>

        {a.total === 0 && (
          <p className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 px-6 py-4 text-sm text-amber-800">
            No views recorded yet. Browse a few public pages (outside <code>/admin</code>) and refresh.
          </p>
        )}

        {/* Summary cards */}
        <div className="grid gap-6 sm:grid-cols-3">
          {cards.map((c) => (
            <div key={c.label} className="glass rounded-2xl p-6 shadow-sm">
              <p className="text-4xl font-black text-ink">{c.value.toLocaleString()}</p>
              <p className="mt-1 text-sm font-semibold text-muted">{c.label}</p>
            </div>
          ))}
        </div>

        {/* Per-day chart */}
        <div className="mt-8 glass rounded-2xl p-6 shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.15em] text-muted">Views, last 14 days</p>
          <div className="mt-6 flex h-40 items-end gap-2">
            {a.perDay.length === 0 ? (
              <p className="text-sm text-muted">No data yet.</p>
            ) : (
              a.perDay.map((d) => (
                <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex w-full flex-1 items-end">
                    <div
                      className="w-full rounded-t bg-[#4f8bff]"
                      style={{ height: `${Math.max(4, (d.views / maxDay) * 100)}%` }}
                      title={`${d.day}: ${d.views} views`}
                    />
                  </div>
                  <span className="text-[10px] text-muted">{d.day.slice(5)}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Top pages + articles */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <TopList title="Top pages" rows={a.topPages} />
          <TopList title="Top articles" rows={a.topArticles} emptyText="No article views yet." />
        </div>
      </main>
    </div>
  );
}

function TopList({
  title,
  rows,
  emptyText = "No views yet.",
}: {
  title: string;
  rows: { path: string; views: number }[];
  emptyText?: string;
}) {
  return (
    <div className="glass rounded-2xl p-6 shadow-sm">
      <p className="text-xs font-black uppercase tracking-[0.15em] text-muted">{title}</p>
      {rows.length === 0 ? (
        <p className="mt-4 text-sm text-muted">{emptyText}</p>
      ) : (
        <ul className="mt-4 divide-y divide-line">
          {rows.map((r) => (
            <li key={r.path} className="flex items-center justify-between gap-4 py-2.5">
              <span className="truncate text-sm font-semibold text-body">{r.path}</span>
              <span className="shrink-0 text-sm font-black text-ink">{r.views.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
