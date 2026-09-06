import { allLeadsForExport, STATUS_LABEL, type LeadStatus } from "@/lib/leads";
import { requireAdmin } from "@/lib/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function csvCell(value: unknown): string {
  const text = value == null ? "" : String(value);
  return `"${text.replace(/"/g, '""')}"`;
}

/** Xuất toàn bộ danh sách ra CSV để mở bằng Excel. */
export async function GET() {
  await requireAdmin();

  const leads = await allLeadsForExport();
  const header = ["ID", "Thời gian", "Họ tên", "Số điện thoại", "Mức vay", "Ghi chú", "Trạng thái"];
  const lines = [header.map(csvCell).join(",")];

  for (const lead of leads) {
    lines.push(
      [
        lead.id,
        new Date(lead.created_at).toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }),
        lead.name,
        lead.phone,
        lead.amount,
        lead.note,
        STATUS_LABEL[lead.status as LeadStatus] ?? lead.status,
      ]
        .map(csvCell)
        .join(","),
    );
  }

  const today = new Date().toISOString().slice(0, 10);
  // BOM để Excel trên Windows đọc đúng tiếng Việt.
  return new Response("\uFEFF" + lines.join("\r\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="dang-ky-vay-${today}.csv"`,
    },
  });
}
