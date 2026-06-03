import type { NextRequest } from "next/server";

const ADMIN_COOKIE = "admin_session";
const SESSION_VALUE = "authenticated";

/** True when the request carries a valid admin session cookie. */
export function isAuthed(request: NextRequest): boolean {
  return request.cookies.get(ADMIN_COOKIE)?.value === SESSION_VALUE;
}
