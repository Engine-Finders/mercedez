import { NextResponse } from "next/server";

/**
 * Cross-brand path leaks (BMW / Jaguar) → 410 Gone so Google drops them.
 * Mercedes routes are left alone.
 */
const CROSS_BRAND =
  /^\/(?:1-series|2-series|3-series|4-series|5-series|6-series|7-series|8-series|x[1-7]|z4|i[348x]|m[2-8]|mini|i-pace|e-pace|f-pace|f-type|xe|xf|xj|xk)(?:\/|$)/i;

const BMW_ENGINE =
  /^\/engine\/(?:n[0-9]{2}|b[0-9]{2}|s[0-9]{2}|m[0-9]{2}|n55b30|m52b20)(?:\/|$)/i;

export function middleware(request) {
  const { pathname } = request.nextUrl;
  if (CROSS_BRAND.test(pathname) || BMW_ENGINE.test(pathname)) {
    return new NextResponse("Gone", { status: 410 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
