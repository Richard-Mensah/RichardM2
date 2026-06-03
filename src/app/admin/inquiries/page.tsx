import { desc } from "drizzle-orm";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import { db } from "@/db";
import { collaborationInquiries, type CollaborationInquiry } from "@/db/schema";

export const dynamic = "force-dynamic";

async function getInquiries(): Promise<CollaborationInquiry[]> {
  try {
    return await db
      .select()
      .from(collaborationInquiries)
      .orderBy(desc(collaborationInquiries.createdAt));
  } catch (error) {
    console.error("Failed to load inquiries", error);
    return [];
  }
}

export default async function AdminInquiriesPage() {
  const inquiries = await getInquiries();

  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-slate-950">Contact inquiries</h1>
            <p className="mt-1 text-sm text-slate-500">
              {inquiries.length} {inquiries.length === 1 ? "submission" : "submissions"} from the
              collaboration form
            </p>
          </div>
          <AdminLogoutButton />
        </div>

        {inquiries.length === 0 ? (
          <p className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center text-slate-400">
            No inquiries yet. Submissions from the contact / collaboration form will appear here.
          </p>
        ) : (
          <div className="space-y-4">
            {inquiries.map((q) => (
              <article
                key={q.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-base font-black text-slate-950">{q.name}</p>
                    <a
                      href={`mailto:${q.email}`}
                      className="text-sm font-semibold text-[#0077FF] hover:underline"
                    >
                      {q.email}
                    </a>
                    {q.organization && (
                      <span className="ml-2 text-sm text-slate-500">· {q.organization}</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">
                    {new Date(q.createdAt).toLocaleString("en-GB", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#0077FF]/10 px-3 py-1 text-xs font-bold text-[#0077FF]">
                    {q.collaborationType}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                    {q.focusArea}
                  </span>
                </div>

                <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-700">
                  {q.message}
                </p>

                <a
                  href={`mailto:${q.email}?subject=Re: your message to Richard Mensah`}
                  className="mt-4 inline-block rounded-full bg-slate-950 px-5 py-2 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:bg-[#0077FF]"
                >
                  Reply →
                </a>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
