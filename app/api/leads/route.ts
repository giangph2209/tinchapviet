import { NextResponse } from "next/server";
import { createLead, validateLead } from "@/lib/leads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Nhận đăng ký vay vốn từ form trên trang chủ. */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Dữ liệu không hợp lệ." }, { status: 400 });
  }

  const parsed = validateLead(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    const { id } = await createLead(parsed.value, {
      ip:
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
        request.headers.get("x-real-ip"),
      userAgent: request.headers.get("user-agent"),
    });
    return NextResponse.json({ ok: true, id }, { status: 201 });
  } catch (error) {
    console.error("Không lưu được lead:", error);
    return NextResponse.json(
      { error: "Hệ thống đang bận. Vui lòng gọi hotline 0985 410 836." },
      { status: 500 },
    );
  }
}
