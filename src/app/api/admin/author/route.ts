import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAuthed } from "@/lib/adminAuth";
import { getAuthor, saveAuthor, DEFAULT_AUTHOR, type Author } from "@/lib/author";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ ok: true, author: await getAuthor() });
}

export async function PUT(request: NextRequest) {
  if (!isAuthed(request)) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }
  try {
    const body = (await request.json()) as Partial<Author>;
    const author: Author = {
      name: (body.name ?? "").toString().trim() || DEFAULT_AUTHOR.name,
      role: (body.role ?? "").toString().trim(),
      bio: (body.bio ?? "").toString().trim(),
      photo: (body.photo ?? "").toString().trim(),
      linkedin: (body.linkedin ?? "").toString().trim(),
      github: (body.github ?? "").toString().trim(),
    };
    await saveAuthor(author);
    revalidatePath("/blog/[slug]", "page");
    return NextResponse.json({ ok: true, author });
  } catch (error) {
    console.error("Failed to save author", error);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}
