import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAuthed } from "@/lib/adminAuth";
import { setSetting } from "@/lib/siteSettings";
import { TRACK_OVERRIDES_KEY } from "@/lib/github";
import type { TrackOverride, TrackOverrides } from "@/lib/githubTracks";

export const dynamic = "force-dynamic";

const ALLOWED: TrackOverride[] = ["ai", "web", "hidden"];

/** Saves per-repo track overrides used by the homepage GitHub section. */
export async function PUT(request: NextRequest) {
  if (!(await isAuthed(request))) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }
  try {
    const body = (await request.json()) as { overrides?: unknown };
    if (!body.overrides || typeof body.overrides !== "object" || Array.isArray(body.overrides)) {
      return NextResponse.json({ ok: false, message: "Expected an 'overrides' object." }, { status: 400 });
    }
    const clean: TrackOverrides = {};
    for (const [name, value] of Object.entries(body.overrides as Record<string, unknown>)) {
      if (typeof name !== "string" || name.length > 200) continue;
      if (ALLOWED.includes(value as TrackOverride)) clean[name] = value as TrackOverride;
    }
    if (Object.keys(clean).length > 500) {
      return NextResponse.json({ ok: false, message: "Too many overrides." }, { status: 400 });
    }
    await setSetting(TRACK_OVERRIDES_KEY, clean);
    revalidatePath("/");
    return NextResponse.json({ ok: true, overrides: clean });
  } catch (error) {
    console.error("Failed to save GitHub track overrides", error);
    return NextResponse.json({ ok: false, message: "Server error while saving." }, { status: 500 });
  }
}
