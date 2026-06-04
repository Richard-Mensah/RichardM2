import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAuthed } from "@/lib/adminAuth";
import {
  getOpportunities,
  saveOpportunities,
  accentForType,
  OPPORTUNITY_CATEGORIES,
  type Opportunity,
} from "@/lib/opportunities";

export const dynamic = "force-dynamic";

const VALID_TYPES = new Set(OPPORTUNITY_CATEGORIES.map((c) => c.id));

export async function GET() {
  return NextResponse.json({ ok: true, opportunities: await getOpportunities() });
}

export async function PUT(request: NextRequest) {
  if (!isAuthed(request)) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }
  try {
    const body = (await request.json()) as { opportunities?: unknown };
    if (!Array.isArray(body.opportunities)) {
      return NextResponse.json({ ok: false, message: "Expected an 'opportunities' array." }, { status: 400 });
    }

    const cleaned: Opportunity[] = [];
    for (const item of body.opportunities) {
      const o = item as Partial<Opportunity>;
      const title = (o.title ?? "").toString().trim();
      if (!title) continue; // skip empty rows
      const type = VALID_TYPES.has((o.type ?? "") as string) ? (o.type as string) : "scholarships";
      cleaned.push({
        title,
        type,
        description: (o.description ?? "").toString().trim(),
        link: (o.link ?? "").toString().trim(),
        accent: accentForType(type),
      });
    }

    await saveOpportunities(cleaned);
    revalidatePath("/opportunities");
    return NextResponse.json({ ok: true, opportunities: cleaned });
  } catch (error) {
    console.error("Failed to save opportunities", error);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}
