import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getAllArticles } from "@/lib/articles";

export const dynamic = "force-dynamic";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function GET() {
  const articles = getAllArticles();
  return NextResponse.json({ ok: true, articles });
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      title?: string;
      category?: string;
      excerpt?: string;
      content?: string;
      coverImage?: string;
    };

    if (!body.title || !body.category || !body.excerpt || !body.content) {
      return NextResponse.json(
        { ok: false, message: "title, category, excerpt, and content are required." },
        { status: 400 }
      );
    }

    const slug = slugify(body.title);
    const date = new Date().toISOString().split("T")[0];
    const filepath = path.join(ARTICLES_DIR, `${slug}.md`);

    if (fs.existsSync(filepath)) {
      return NextResponse.json(
        { ok: false, message: `An article with slug "${slug}" already exists.` },
        { status: 409 }
      );
    }

    const frontmatter: Record<string, string> = {
      title: body.title,
      category: body.category,
      date,
      excerpt: body.excerpt,
    };
    if (body.coverImage) frontmatter.coverImage = body.coverImage;

    const fileContent = matter.stringify(body.content, frontmatter);

    if (!fs.existsSync(ARTICLES_DIR)) fs.mkdirSync(ARTICLES_DIR, { recursive: true });
    fs.writeFileSync(filepath, fileContent, "utf-8");

    return NextResponse.json({ ok: true, slug }, { status: 201 });
  } catch (error) {
    console.error("Failed to create article", error);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}
