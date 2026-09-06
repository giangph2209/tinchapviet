import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

/** Kiểm tra lại trong server action, không chỉ dựa vào middleware. */
export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) {
    throw new Error("Chưa đăng nhập");
  }
}
