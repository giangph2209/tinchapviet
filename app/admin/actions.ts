"use server";

import { revalidatePath } from "next/cache";
import { deleteLead, isLeadStatus, updateLeadStatus } from "@/lib/leads";
import { requireAdmin } from "@/lib/session";

/**
 * Neon trả cột `bigserial` (id) về dưới dạng chuỗi để tránh mất độ chính xác,
 * nên id gửi từ client có thể là string. Chuẩn hoá về số nguyên dương.
 */
function parseId(id: number | string): number {
  const num = typeof id === "string" ? Number(id) : id;
  if (!Number.isInteger(num) || num <= 0) {
    throw new Error("Dữ liệu không hợp lệ");
  }
  return num;
}

export async function setLeadStatus(id: number | string, status: string): Promise<void> {
  await requireAdmin();
  if (!isLeadStatus(status)) {
    throw new Error("Dữ liệu không hợp lệ");
  }
  await updateLeadStatus(parseId(id), status);
  revalidatePath("/admin");
}

export async function removeLead(id: number | string): Promise<void> {
  await requireAdmin();
  await deleteLead(parseId(id));
  revalidatePath("/admin");
}
