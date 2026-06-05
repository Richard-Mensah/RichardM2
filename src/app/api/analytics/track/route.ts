import { NextRequest, NextResponse } from "next/server";
import { recordView } from "@/lib/analytics";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { path?: string; referrer?: string };
    const path = (body.path ?? "").toString();
    // Only track real public pages; ignore admin and empty paths.
    if (!path || !path.startsWith("/") || path.startsWith("/admin")) {
      return NextResponse.json({ ok: true });
    }
    await recordView(path, (body.referrer ?? "").toString());
    return NextResponse.json({ ok: true });
  } catch {
    // Analytics must never break the page, always succeed.
    return NextResponse.json({ ok: true });
  }
}
