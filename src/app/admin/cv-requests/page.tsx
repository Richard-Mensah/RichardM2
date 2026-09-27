import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import { getCvRequests } from "@/lib/cvRequests";

export const dynamic = "force-dynamic";

export default async function AdminCvRequestsPage() {
  const requests = await getCvRequests();

  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black font-display text-ink">CV requests</h1>
            <p className="mt-1 text-sm text-muted">
              {requests.length} {requests.length === 1 ? "request" : "requests"} for your CV
            </p>
          </div>
          <AdminLogoutButton />
        </div>

        {requests.length === 0 ? (
          <p className="glass rounded-2xl px-6 py-12 text-center text-muted">
            No CV requests yet. Submissions from the CV request form will appear here.
          </p>
        ) : (
          <div className="space-y-4">
            {requests.map((r) => (
              <article key={r.id} className="glass rounded-2xl p-6 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-base font-black text-ink">{r.name}</p>
                    <a
                      href={`mailto:${r.email}`}
                      className="text-sm font-semibold text-accent-strong hover:underline"
                    >
                      {r.email}
                    </a>
                    {r.organization && (
                      <span className="ml-2 text-sm text-body">· {r.organization}</span>
                    )}
                  </div>
                  <p className="text-xs text-muted">
                    {new Date(r.createdAt).toLocaleString("en-GB", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>

                {r.reason && (
                  <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-body">{r.reason}</p>
                )}

                <a
                  href={`mailto:${r.email}?subject=My CV — Richard Mensah&body=Hi ${encodeURIComponent(
                    r.name
                  )},%0D%0A%0D%0AThank you for your interest. Please find my CV attached.%0D%0A%0D%0ABest,%0D%0ARichard`}
                  className="btn-primary mt-4 inline-block rounded-full px-5 py-2 text-xs font-black uppercase tracking-[0.12em]"
                >
                  Reply with CV →
                </a>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
