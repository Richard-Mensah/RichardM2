import type { NextRequest } from "next/server";

/**
 * Admin session handling.
 *
 * The session cookie is a signed, expiring token: `<expiresAtMs>.<hmacSha256Hex>`.
 * It is signed with ADMIN_SESSION_SECRET (falling back to ADMIN_PASSWORD), so a
 * cookie cannot be forged by hand, and rotating the password or secret logs every
 * session out. Uses Web Crypto so the same code runs in middleware and route handlers.
 */

export const ADMIN_COOKIE = "admin_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

const encoder = new TextEncoder();

function getSecret(): string | undefined {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || undefined;
}

async function hmacHex(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return Array.from(new Uint8Array(signature), (b) => b.toString(16).padStart(2, "0")).join("");
}

/** Length-independent, constant-time string comparison. */
export function safeEqual(a: string, b: string): boolean {
  const aBytes = encoder.encode(a);
  const bBytes = encoder.encode(b);
  let diff = aBytes.length ^ bBytes.length;
  const length = Math.max(aBytes.length, bBytes.length);
  for (let i = 0; i < length; i++) {
    diff |= (aBytes[i] ?? 0) ^ (bBytes[i] ?? 0);
  }
  return diff === 0;
}

/** Creates a new signed session token, or null when admin auth is not configured. */
export async function createSessionToken(): Promise<string | null> {
  const secret = getSecret();
  if (!secret) return null;
  const expiresAt = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  return `${expiresAt}.${await hmacHex(secret, `admin:${expiresAt}`)}`;
}

/** Verifies a session token's signature and expiry. */
export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  const secret = getSecret();
  if (!secret || !token) return false;

  const [expiresAtRaw, signature, ...rest] = token.split(".");
  if (!expiresAtRaw || !signature || rest.length > 0) return false;

  const expiresAt = Number(expiresAtRaw);
  if (!Number.isSafeInteger(expiresAt) || expiresAt < Date.now()) return false;

  return safeEqual(signature, await hmacHex(secret, `admin:${expiresAt}`));
}

/** True when the request carries a valid, unexpired admin session cookie. */
export async function isAuthed(request: NextRequest): Promise<boolean> {
  return verifySessionToken(request.cookies.get(ADMIN_COOKIE)?.value);
}

/** Only allow same-site relative redirects after login (blocks `//evil.com`, `https://…`). */
export function safeAdminRedirect(next: string | null): string {
  if (!next || !next.startsWith("/admin") || next.startsWith("//") || next.includes("\\")) {
    return "/admin";
  }
  return next;
}
