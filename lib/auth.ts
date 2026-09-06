/**
 * Đăng nhập admin bằng một mật khẩu chung (ADMIN_PASSWORD).
 * Phiên đăng nhập là cookie ký HMAC-SHA256, dùng Web Crypto nên chạy được cả
 * trong middleware (Edge runtime) lẫn route handler.
 */

export const SESSION_COOKIE = "tcv_admin";
export const SESSION_MAX_AGE = 60 * 60 * 12; // 12 giờ

const encoder = new TextEncoder();

function adminPassword(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    throw new Error(
      "Thiếu biến môi trường ADMIN_PASSWORD. Đặt trong Vercel > Settings > Environment Variables.",
    );
  }
  return password;
}

async function signingKey(): Promise<CryptoKey> {
  // AUTH_SECRET là khoá nên dùng. Nếu chưa đặt thì dẫn xuất từ mật khẩu admin —
  // đổi mật khẩu sẽ vô hiệu hoá mọi phiên đang đăng nhập.
  const secret = process.env.AUTH_SECRET || `tcv:${adminPassword()}`;
  const raw = await crypto.subtle.digest("SHA-256", encoder.encode(secret));
  return crypto.subtle.importKey("raw", raw, { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
    "verify",
  ]);
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** So sánh không phụ thuộc thời gian, tránh lộ thông tin qua timing attack. */
function safeEqual(a: string, b: string): boolean {
  const ea = encoder.encode(a);
  const eb = encoder.encode(b);
  if (ea.length !== eb.length) return false;
  let diff = 0;
  for (let i = 0; i < ea.length; i++) diff |= ea[i] ^ eb[i];
  return diff === 0;
}

export function checkPassword(input: unknown): boolean {
  if (typeof input !== "string" || input.length === 0) return false;
  return safeEqual(input, adminPassword());
}

export async function createSessionToken(): Promise<string> {
  const expires = Date.now() + SESSION_MAX_AGE * 1000;
  const payload = String(expires);
  const signature = await crypto.subtle.sign("HMAC", await signingKey(), encoder.encode(payload));
  return `${payload}.${toHex(signature)}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expires = Number(payload);
  if (!Number.isFinite(expires) || expires < Date.now()) return false;

  try {
    const expected = await crypto.subtle.sign("HMAC", await signingKey(), encoder.encode(payload));
    return safeEqual(signature, toHex(expected));
  } catch {
    return false;
  }
}
