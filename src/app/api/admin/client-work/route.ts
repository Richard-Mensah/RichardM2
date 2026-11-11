import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAuthed } from "@/lib/adminAuth";
import { getClientWork, normaliseProject, saveClientWork } from "@/lib/clientWork";
import type { ClientProject } from "@/types";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ ok: true, projects: await getClientWork() });
}

export async function PUT(request: NextRequest) {
  if (!(await isAuthed(request))) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }
  try {
    const body = (await request.json()) as { projects?: unknown };
    if (!Array.isArray(body.projects)) {
      return NextResponse.json({ ok: false, message: "Expected a 'projects' array." }, { status: 400 });
    }
    if (body.projects.length > 200) {
      return NextResponse.json({ ok: false, message: "Too many projects (max 200)." }, { status: 400 });
    }

    const cleaned: ClientProject[] = [];
    for (const item of body.projects) {
      const result = normaliseProject(item);
      if (!result.ok) return NextResponse.json({ ok: false, message: result.message }, { status: 400 });
      cleaned.push(result.project);
    }

    const saved = await saveClientWork(cleaned);
    for (const path of ["/", "/work", "/projects", "/projects/portfolio"]) revalidatePath(path);
    return NextResponse.json({ ok: true, projects: saved });
  } catch (error) {
    console.error("Failed to save client projects", error);
    return NextResponse.json({ ok: false, message: "Server error while saving." }, { status: 500 });
  }
}
