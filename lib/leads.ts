import { ensureSchema, sql } from "@/lib/db";

export const LEAD_STATUSES = ["new", "contacted", "done", "rejected"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const STATUS_LABEL: Record<LeadStatus, string> = {
  new: "Mới",
  contacted: "Đã liên hệ",
  done: "Đã giải ngân",
  rejected: "Không đạt",
};

export type Lead = {
  id: number;
  name: string;
  phone: string;
  amount: string;
  note: string;
  status: LeadStatus;
  ip: string | null;
  user_agent: string | null;
  created_at: string;
};

export type LeadInput = {
  name: string;
  phone: string;
  amount: string;
  note: string;
};

export function isLeadStatus(value: unknown): value is LeadStatus {
  return typeof value === "string" && (LEAD_STATUSES as readonly string[]).includes(value);
}

/** Kiểm tra dữ liệu form. Trả về lời nhắn tiếng Việt để hiện thẳng cho khách. */
export function validateLead(raw: unknown): { ok: true; value: LeadInput } | { ok: false; error: string } {
  if (typeof raw !== "object" || raw === null) {
    return { ok: false, error: "Dữ liệu không hợp lệ." };
  }
  const body = raw as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

  const name = str(body.name);
  const phone = str(body.phone);
  const amount = str(body.amount);
  const note = str(body.note);

  if (name.length < 2 || name.length > 100) {
    return { ok: false, error: "Vui lòng nhập họ tên (2–100 ký tự)." };
  }
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 9 || digits.length > 15) {
    return { ok: false, error: "Số điện thoại không hợp lệ." };
  }
  if (amount.length > 60) {
    return { ok: false, error: "Mức vay không hợp lệ." };
  }
  if (note.length > 1000) {
    return { ok: false, error: "Ghi chú quá dài (tối đa 1000 ký tự)." };
  }

  return { ok: true, value: { name, phone, amount, note } };
}

export async function createLead(
  input: LeadInput,
  meta: { ip?: string | null; userAgent?: string | null } = {},
): Promise<{ id: number }> {
  await ensureSchema();
  const rows = (await sql()`
    INSERT INTO leads (name, phone, amount, note, ip, user_agent)
    VALUES (${input.name}, ${input.phone}, ${input.amount}, ${input.note},
            ${meta.ip ?? null}, ${meta.userAgent ?? null})
    RETURNING id
  `) as { id: number }[];
  return { id: rows[0].id };
}

export type ListLeadsOptions = {
  q?: string;
  status?: LeadStatus | "all";
  limit?: number;
  offset?: number;
};

export async function listLeads(options: ListLeadsOptions = {}): Promise<{ rows: Lead[]; total: number }> {
  await ensureSchema();
  const db = sql();
  const q = options.q?.trim() ?? "";
  const status = options.status && options.status !== "all" ? options.status : null;
  const limit = Math.min(Math.max(options.limit ?? 50, 1), 200);
  const offset = Math.max(options.offset ?? 0, 0);
  const pattern = q ? `%${q}%` : null;

  const rows = (await db`
    SELECT id, name, phone, amount, note, status, ip, user_agent, created_at
    FROM leads
    WHERE (${status}::text IS NULL OR status = ${status})
      AND (${pattern}::text IS NULL OR name ILIKE ${pattern} OR phone ILIKE ${pattern} OR note ILIKE ${pattern})
    ORDER BY created_at DESC, id DESC
    LIMIT ${limit} OFFSET ${offset}
  `) as Lead[];

  const totals = (await db`
    SELECT count(*)::int AS total
    FROM leads
    WHERE (${status}::text IS NULL OR status = ${status})
      AND (${pattern}::text IS NULL OR name ILIKE ${pattern} OR phone ILIKE ${pattern} OR note ILIKE ${pattern})
  `) as { total: number }[];

  return { rows, total: totals[0]?.total ?? 0 };
}

export async function countByStatus(): Promise<Record<string, number>> {
  await ensureSchema();
  const rows = (await sql()`
    SELECT status, count(*)::int AS count FROM leads GROUP BY status
  `) as { status: string; count: number }[];
  return Object.fromEntries(rows.map((r) => [r.status, r.count]));
}

export async function updateLeadStatus(id: number, status: LeadStatus): Promise<void> {
  await ensureSchema();
  await sql()`UPDATE leads SET status = ${status} WHERE id = ${id}`;
}

export async function deleteLead(id: number): Promise<void> {
  await ensureSchema();
  await sql()`DELETE FROM leads WHERE id = ${id}`;
}

export async function allLeadsForExport(): Promise<Lead[]> {
  await ensureSchema();
  return (await sql()`
    SELECT id, name, phone, amount, note, status, ip, user_agent, created_at
    FROM leads ORDER BY created_at DESC, id DESC
  `) as Lead[];
}
