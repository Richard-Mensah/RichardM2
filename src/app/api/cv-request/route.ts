import { createCvRequest } from "@/lib/cvRequests";

export const dynamic = "force-dynamic";

function cleanString(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
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
  if (cleanString(payload.website, 200)) {
    return Response.json({ ok: true, message: "Request received." }, { status: 201 });
  }

  try {
    const name = cleanString(payload.name, 160);
    const email = cleanString(payload.email, 255).toLowerCase();
    const organization = cleanString(payload.organization, 180) || null;
    const reason = cleanString(payload.reason, 1000);

    if (!name || !email) {
      return Response.json(
        { ok: false, message: "Name and email are required." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return Response.json(
        { ok: false, message: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    const id = await createCvRequest({ name, email, organization, reason });

    return Response.json(
      {
        ok: true,
        requestId: id,
        message: "Request received. Richard will review it and send his CV by email.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Unable to create CV request", error);
    return Response.json(
      { ok: false, message: "The request desk is temporarily unavailable. Please try again shortly." },
      { status: 500 },
    );
  }
}
