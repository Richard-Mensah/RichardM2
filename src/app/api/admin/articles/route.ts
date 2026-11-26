import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createArticle, getAllArticles } from "@/lib/articles";
import { isAuthed } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function GET() {
  const articles = await getAllArticles();
  return NextResponse.json({ ok: true, articles });
}

export async function POST(request: NextRequest) {
  if (!(await isAuthed(request))) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const str = (key: string) => (typeof body[key] === "string" ? (body[key] as string) : "");

    if (!str("title").trim() || !str("category").trim() || !str("excerpt").trim() || !str("content").trim()) {
      return NextResponse.json(
        { ok: false, message: "title, category, excerpt, and content are required." },
        { status: 400 },
      );
    }

    const result = await createArticle({
      title: str("title"),
      category: str("category"),
      excerpt: str("excerpt"),
      content: str("content"),
      coverImage: str("coverImage"),
    });
    if (!result.ok) {
      return NextResponse.json({ ok: false, message: result.message }, { status: result.status });
    }

    revalidatePath("/blog");
    revalidatePath(`/blog/${result.slug}`);
    revalidatePath("/sitemap.xml");
    return NextResponse.json({ ok: true, slug: result.slug }, { status: 201 });
  } catch (error) {
    console.error("Failed to create article", error);
    return NextResponse.json({ ok: false, message: "Could not save the article. Please try again." }, { status: 500 });
  }
}
