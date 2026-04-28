import { db } from "@/db";
import { collaborationInquiries } from "@/db/schema";

export const dynamic = "force-dynamic";

const validCollaborationTypes = new Set([
  "Research collaboration",
  "Speaking or media",
  "Startup or product build",
  "Policy or institutional advisory",
  "Mentorship or youth program",
]);

const validFocusAreas = new Set([
  "AI for sustainable development",
  "Climate intelligence",
  "Youth leadership",
  "Data science systems",
  "Ethics and policy",
  "Institutional training",
]);

function cleanString(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Record<string, unknown>;

    const name = cleanString(payload.name, 160);
    const email = cleanString(payload.email, 255).toLowerCase();
    const organization = cleanString(payload.organization, 180) || null;
    const requestedType = cleanString(payload.collaborationType, 120);
    const requestedFocus = cleanString(payload.focusArea, 140);
    const message = cleanString(payload.message, 2000);

    if (!name || !email || !message) {
      return Response.json(
        { ok: false, message: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return Response.json(
        { ok: false, message: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    const collaborationType = validCollaborationTypes.has(requestedType)
      ? requestedType
      : "Research collaboration";
    const focusArea = validFocusAreas.has(requestedFocus)
      ? requestedFocus
      : "AI for sustainable development";

    const [createdInquiry] = await db
      .insert(collaborationInquiries)
      .values({
        name,
        email,
        organization,
        collaborationType,
        focusArea,
        message,
      })
      .returning({ id: collaborationInquiries.id });

    return Response.json(
      {
        ok: true,
        inquiryId: createdInquiry?.id,
        message: "Collaboration request received. Richard can now follow up with context.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Unable to create collaboration inquiry", error);

    return Response.json(
      {
        ok: false,
        message: "The collaboration desk is temporarily unavailable. Please try again shortly.",
      },
      { status: 500 },
    );
  }
}
