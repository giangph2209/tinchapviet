import { NextResponse } from "next/server";
import { SESSION_COOKIE, SESSION_MAX_AGE, checkPassword, createSessionToken } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let password: unknown;
  try {
    const body = (await request.json()) as Record<string, unknown>;
    password = body?.password;
  } catch {
    return NextResponse.json({ error: "Dữ liệu không hợp lệ." }, { status: 400 });
  }

  let valid: boolean;
  try {
    valid = checkPassword(password);
  } catch (error) {
    console.error("Cấu hình đăng nhập admin lỗi:", error);
    return NextResponse.json(
      { error: "Chưa cấu hình ADMIN_PASSWORD trên máy chủ." },
      { status: 500 },
    );
  }

  if (!valid) {
    return NextResponse.json({ error: "Mật khẩu không đúng." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, await createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return response;
}
