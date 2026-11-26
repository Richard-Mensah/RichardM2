import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { deleteArticle, getArticle, updateArticle } from "@/lib/articles";
import { isAuthed } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

const NOT_FOUND = () => NextResponse.json({ ok: false, message: "Not found" }, { status: 404 });

function refresh(slug: string) {
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/sitemap.xml");
}

export async function GET(_: NextRequest, { params }: Params) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return NOT_FOUND();
  return NextResponse.json({ ok: true, meta: article.meta, content: article.content });
}

export async function PUT(request: NextRequest, { params }: Params) {
  if (!(await isAuthed(request))) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }
  const { slug } = await params;
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const str = (key: string) => (typeof body[key] === "string" ? (body[key] as string) : "");
    if (!str("title").trim() || !str("category").trim()) {
      return NextResponse.json({ ok: false, message: "title and category are required." }, { status: 400 });
    }
    const ok = await updateArticle(slug, {
      title: str("title"),
      category: str("category"),
      excerpt: str("excerpt"),
      content: str("content"),
      coverImage: str("coverImage"),
      date: str("date"),
    });
    if (!ok) return NOT_FOUND();
    refresh(slug);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(`Failed to update article "${slug}"`, error);
    return NextResponse.json({ ok: false, message: "Could not save the article. Please try again." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  if (!(await isAuthed(request))) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }
  const { slug } = await params;
  try {
    if (!(await deleteArticle(slug))) return NOT_FOUND();
    refresh(slug);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(`Failed to delete article "${slug}"`, error);
    return NextResponse.json({ ok: false, message: "Could not delete the article." }, { status: 500 });
  }
}
