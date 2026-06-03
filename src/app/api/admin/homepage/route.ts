import { NextRequest, NextResponse } from "next/server";
import { isAuthed } from "@/lib/adminAuth";
import { getHomepage, saveHomepage, DEFAULT_HOMEPAGE, type HomepageContent } from "@/lib/homepage";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ ok: true, homepage: await getHomepage() });
}

export async function PUT(request: NextRequest) {
  if (!isAuthed(request)) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }
  try {
    const body = (await request.json()) as Partial<HomepageContent>;
    const str = (v: unknown, fallback: string) =>
      typeof v === "string" && v.trim() ? v : fallback;
    const content: HomepageContent = {
      heroEyebrow: str(body.heroEyebrow, DEFAULT_HOMEPAGE.heroEyebrow),
      heroTitleLead: typeof body.heroTitleLead === "string" ? body.heroTitleLead : DEFAULT_HOMEPAGE.heroTitleLead,
      heroTitleHighlight: typeof body.heroTitleHighlight === "string" ? body.heroTitleHighlight : DEFAULT_HOMEPAGE.heroTitleHighlight,
      heroTitleTail: typeof body.heroTitleTail === "string" ? body.heroTitleTail : DEFAULT_HOMEPAGE.heroTitleTail,
      heroSubtitle: str(body.heroSubtitle, DEFAULT_HOMEPAGE.heroSubtitle),
      welcomeTitle: str(body.welcomeTitle, DEFAULT_HOMEPAGE.welcomeTitle),
      welcomeBody: str(body.welcomeBody, DEFAULT_HOMEPAGE.welcomeBody),
    };
    await saveHomepage(content);
    return NextResponse.json({ ok: true, homepage: content });
  } catch (error) {
    console.error("Failed to save homepage content", error);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}
