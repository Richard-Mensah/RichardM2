import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  createSessionToken,
  safeAdminRedirect,
  safeEqual,
} from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return NextResponse.json(
      { ok: false, message: "Admin not configured. Set ADMIN_PASSWORD in .env.local." },
      { status: 500 }
    );
  }

  const body = (await request.json().catch(() => ({}))) as { password?: unknown };
  const password = typeof body.password === "string" ? body.password : "";

  if (!safeEqual(password, adminPassword)) {
    // Small fixed delay to slow down password guessing.
    await new Promise((resolve) => setTimeout(resolve, 500));
    return NextResponse.json({ ok: false, message: "Invalid password." }, { status: 401 });
  }

  const token = await createSessionToken();
  if (!token) {
    return NextResponse.json({ ok: false, message: "Admin not configured." }, { status: 500 });
  }

  const redirect = safeAdminRedirect(request.nextUrl.searchParams.get("next"));
  const response = NextResponse.json({ ok: true, redirect });

  response.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: "/",
  });

  return response;
}
