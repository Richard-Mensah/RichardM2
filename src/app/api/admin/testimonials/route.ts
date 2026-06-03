import { NextRequest, NextResponse } from "next/server";
import { isAuthed } from "@/lib/adminAuth";
import { getTestimonials, saveTestimonials, type Testimonial } from "@/lib/testimonials";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ ok: true, testimonials: await getTestimonials() });
}

export async function PUT(request: NextRequest) {
  if (!isAuthed(request)) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }
  try {
    const body = (await request.json()) as { testimonials?: unknown };
    if (!Array.isArray(body.testimonials)) {
      return NextResponse.json({ ok: false, message: "Expected a 'testimonials' array." }, { status: 400 });
    }

    const cleaned: Testimonial[] = [];
    for (const item of body.testimonials) {
      const t = item as Partial<Testimonial>;
      const name = (t.name ?? "").toString().trim();
      const quote = (t.quote ?? "").toString().trim();
      if (!name && !quote) continue; // skip empty rows
      if (!name || !quote) {
        return NextResponse.json({ ok: false, message: "Each testimonial needs a name and a quote." }, { status: 400 });
      }
      cleaned.push({
        name,
        role: (t.role ?? "").toString().trim(),
        quote,
        initials: (t.initials ?? "").toString().trim(),
        accent: (t.accent ?? "#0077FF").toString().trim() || "#0077FF",
      });
    }

    await saveTestimonials(cleaned);
    return NextResponse.json({ ok: true, testimonials: cleaned });
  } catch (error) {
    console.error("Failed to save testimonials", error);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}
