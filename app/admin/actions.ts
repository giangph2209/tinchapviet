"use server";

import { revalidatePath } from "next/cache";
import { deleteLead, isLeadStatus, updateLeadStatus } from "@/lib/leads";
import { requireAdmin } from "@/lib/session";

export async function setLeadStatus(id: number, status: string): Promise<void> {
  await requireAdmin();
  if (!Number.isInteger(id) || !isLeadStatus(status)) {
    throw new Error("Dữ liệu không hợp lệ");
  }
  await updateLeadStatus(id, status);
  revalidatePath("/admin");
}

export async function removeLead(id: number): Promise<void> {
  await requireAdmin();
  if (!Number.isInteger(id)) {
    throw new Error("Dữ liệu không hợp lệ");
  }
  await deleteLead(id);
  revalidatePath("/admin");
}
