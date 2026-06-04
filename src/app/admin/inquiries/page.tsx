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
            <h1 className="text-2xl font-black text-white">Contact inquiries</h1>
            <p className="mt-1 text-sm text-[#8aa0c4]">
              {inquiries.length} {inquiries.length === 1 ? "submission" : "submissions"} from the
              collaboration form
            </p>
          </div>
          <AdminLogoutButton />
        </div>

        {inquiries.length === 0 ? (
          <p className="glass rounded-2xl px-6 py-12 text-center text-[#7e92b6]">
            No inquiries yet. Submissions from the contact / collaboration form will appear here.
          </p>
        ) : (
          <div className="space-y-4">
            {inquiries.map((q) => (
              <article
                key={q.id}
                className="glass rounded-2xl p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-base font-black text-white">{q.name}</p>
                    <a
                      href={`mailto:${q.email}`}
                      className="text-sm font-semibold text-[#4f8bff] hover:underline"
                    >
                      {q.email}
                    </a>
                    {q.organization && (
                      <span className="ml-2 text-sm text-[#8aa0c4]">· {q.organization}</span>
                    )}
                  </div>
                  <p className="text-xs text-[#7e92b6]">
                    {new Date(q.createdAt).toLocaleString("en-GB", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#4f8bff]/10 px-3 py-1 text-xs font-bold text-[#4f8bff]">
                    {q.collaborationType}
                  </span>
                  <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-bold text-[#a9bcdc]">
                    {q.focusArea}
                  </span>
                </div>

                <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-[#cdd9ee]">
                  {q.message}
                </p>

                <a
                  href={`mailto:${q.email}?subject=Re: your message to Richard Mensah`}
                  className="mt-4 inline-block rounded-full bg-slate-950 px-5 py-2 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:bg-[#4f8bff]"
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
