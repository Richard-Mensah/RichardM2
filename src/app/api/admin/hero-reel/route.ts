import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAuthed } from "@/lib/adminAuth";
import { HERO_REEL_MAX, normaliseChapter, saveHeroReel } from "@/lib/heroReel";
import type { ReelChapter } from "@/data/heroReel";

export const dynamic = "force-dynamic";

/** Saves the homepage hero reel chapters (Admin → Hero Reel). */
export async function PUT(request: NextRequest) {
  if (!(await isAuthed(request))) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }
  try {
    const body = (await request.json()) as { chapters?: unknown };
    if (!Array.isArray(body.chapters)) {
      return NextResponse.json({ ok: false, message: "Expected a 'chapters' array." }, { status: 400 });
    }
    if (body.chapters.length === 0) {
      return NextResponse.json({ ok: false, message: "Keep at least one chapter." }, { status: 400 });
    }
    if (body.chapters.length > HERO_REEL_MAX) {
      return NextResponse.json({ ok: false, message: `Up to ${HERO_REEL_MAX} chapters.` }, { status: 400 });
    }
    const clean: ReelChapter[] = [];
    for (let i = 0; i < body.chapters.length; i++) {
      const r = normaliseChapter(body.chapters[i], i);
      if (!r.ok) return NextResponse.json({ ok: false, message: r.message }, { status: 400 });
      clean.push(r.chapter);
    }
    await saveHeroReel(clean);
    revalidatePath("/");
    return NextResponse.json({ ok: true, chapters: clean });
  } catch (error) {
    console.error("Failed to save hero reel", error);
    return NextResponse.json({ ok: false, message: "Server error while saving." }, { status: 500 });
  }
}
