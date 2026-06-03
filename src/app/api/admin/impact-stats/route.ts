import { NextRequest, NextResponse } from "next/server";
import { getImpactStats, saveImpactStats, type ImpactStat } from "@/lib/impactStats";

export const dynamic = "force-dynamic";

const ADMIN_COOKIE = "admin_session";
const SESSION_VALUE = "authenticated";

function isAuthed(request: NextRequest): boolean {
  return request.cookies.get(ADMIN_COOKIE)?.value === SESSION_VALUE;
}

export async function GET() {
  return NextResponse.json({ ok: true, stats: await getImpactStats() });
}

export async function PUT(request: NextRequest) {
  if (!isAuthed(request)) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { stats?: unknown };

    if (!Array.isArray(body.stats)) {
      return NextResponse.json(
        { ok: false, message: "Expected a 'stats' array." },
        { status: 400 }
      );
    }

    const cleaned: ImpactStat[] = [];
    for (const item of body.stats) {
      const s = item as Partial<ImpactStat>;
      const value = (s.value ?? "").toString().trim();
      const label = (s.label ?? "").toString().trim();
      const detail = (s.detail ?? "").toString().trim();
      // Skip fully empty rows; require at least a value and a label.
      if (!value && !label && !detail) continue;
      if (!value || !label) {
        return NextResponse.json(
          { ok: false, message: "Each stat needs both a value and a label." },
          { status: 400 }
        );
      }
      cleaned.push({ value, label, detail });
    }

    if (cleaned.length === 0) {
      return NextResponse.json(
        { ok: false, message: "Add at least one stat." },
        { status: 400 }
      );
    }

    await saveImpactStats(cleaned);
    return NextResponse.json({ ok: true, stats: cleaned });
  } catch (error) {
    console.error("Failed to save impact stats", error);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}
