import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const dynamic = "force-dynamic";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

type Params = { params: Promise<{ slug: string }> };

export async function GET(_: NextRequest, { params }: Params) {
  const { slug } = await params;
  const filepath = path.join(ARTICLES_DIR, `${slug}.md`);
  if (!fs.existsSync(filepath)) {
    return NextResponse.json({ ok: false, message: "Not found" }, { status: 404 });
  }
  const raw = fs.readFileSync(filepath, "utf-8");
  const { data, content } = matter(raw);
  return NextResponse.json({ ok: true, meta: { ...data, slug }, content });
}

export async function PUT(request: NextRequest, { params }: Params) {
  const { slug } = await params;
  const filepath = path.join(ARTICLES_DIR, `${slug}.md`);
  if (!fs.existsSync(filepath)) {
    return NextResponse.json({ ok: false, message: "Not found" }, { status: 404 });
  }
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const { content = "", ...frontmatterData } = body;
    const updated = matter.stringify(content as string, frontmatterData as Record<string, string>);
    fs.writeFileSync(filepath, updated, "utf-8");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: Params) {
  const { slug } = await params;
  const filepath = path.join(ARTICLES_DIR, `${slug}.md`);
  if (!fs.existsSync(filepath)) {
    return NextResponse.json({ ok: false, message: "Not found" }, { status: 404 });
  }
  fs.unlinkSync(filepath);
  return NextResponse.json({ ok: true });
}
