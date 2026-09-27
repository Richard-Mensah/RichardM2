import { db } from "@/db";
import { collaborationInquiries } from "@/db/schema";
import { COLLABORATION_TYPES, FOCUS_AREAS } from "@/constants";

export const dynamic = "force-dynamic";

const validCollaborationTypes = new Set(COLLABORATION_TYPES);
const validFocusAreas = new Set(FOCUS_AREAS);

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
  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: the hidden "website" field is only ever filled in by bots.
  // Respond as if it succeeded so they don't retry, but store nothing.
  if (cleanString(payload.website, 200)) {
    return Response.json({ ok: true, message: "Collaboration request received." }, { status: 201 });
  }

  try {
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
      : COLLABORATION_TYPES[0];
    const focusArea = validFocusAreas.has(requestedFocus)
      ? requestedFocus
      : FOCUS_AREAS[0];

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
