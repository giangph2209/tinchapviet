import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

/** Chặn mọi đường dẫn admin khi chưa đăng nhập; trang và API login được bỏ qua. */
export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname === "/admin/login" || pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  const authorized = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);
  if (authorized) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", request.url);
  if (pathname !== "/admin") {
    loginUrl.searchParams.set("next", pathname + search);
  }
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
