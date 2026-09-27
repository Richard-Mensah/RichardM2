import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { isAuthed } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const FRONTMATTER_KEYS = ["title", "category", "date", "excerpt", "coverImage"] as const;

type Params = { params: Promise<{ slug: string }> };

/** Resolves a slug to its markdown file, rejecting anything that isn't a plain slug. */
function articlePath(slug: string): string | null {
  return SLUG_PATTERN.test(slug) ? path.join(ARTICLES_DIR, `${slug}.md`) : null;
}

const NOT_FOUND = () => NextResponse.json({ ok: false, message: "Not found" }, { status: 404 });

export async function GET(_: NextRequest, { params }: Params) {
  const { slug } = await params;
  const filepath = articlePath(slug);
  if (!filepath || !fs.existsSync(filepath)) return NOT_FOUND();
  const raw = fs.readFileSync(filepath, "utf-8");
  const { data, content } = matter(raw);
  return NextResponse.json({ ok: true, meta: { ...data, slug }, content });
}

export async function PUT(request: NextRequest, { params }: Params) {
  if (!(await isAuthed(request))) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }
  const { slug } = await params;
  const filepath = articlePath(slug);
  if (!filepath || !fs.existsSync(filepath)) return NOT_FOUND();
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const content = typeof body.content === "string" ? body.content : "";
    // Only persist known string frontmatter fields.
    const frontmatter: Record<string, string> = {};
    for (const key of FRONTMATTER_KEYS) {
      if (typeof body[key] === "string" && body[key]) frontmatter[key] = body[key] as string;
    }
    const updated = matter.stringify(content, frontmatter);
    fs.writeFileSync(filepath, updated, "utf-8");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  if (!(await isAuthed(request))) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }
  const { slug } = await params;
  const filepath = articlePath(slug);
  if (!filepath || !fs.existsSync(filepath)) return NOT_FOUND();
  fs.unlinkSync(filepath);
  return NextResponse.json({ ok: true });
}
