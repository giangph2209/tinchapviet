import Image from "next/image";
import Link from "next/link";
import logoImg from "@/public/logo.png";
import LeadsTable from "./LeadsTable";
import { countByStatus, isLeadStatus, listLeads, LEAD_STATUSES, STATUS_LABEL } from "@/lib/leads";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 50;

type SearchParams = { q?: string; status?: string; page?: string };

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const q = params.q?.trim() ?? "";
  const status = isLeadStatus(params.status) ? params.status : "all";
  const page = Math.max(Number(params.page) || 1, 1);

  let leads: Awaited<ReturnType<typeof listLeads>> = { rows: [], total: 0 };
  let stats: Record<string, number> = {};
  let loadError = "";

  try {
    [leads, stats] = await Promise.all([
      listLeads({ q, status, limit: PAGE_SIZE, offset: (page - 1) * PAGE_SIZE }),
      countByStatus(),
    ]);
  } catch (error) {
    loadError =
      error instanceof Error ? error.message : "Không đọc được dữ liệu từ cơ sở dữ liệu.";
  }

  const totalPages = Math.max(Math.ceil(leads.total / PAGE_SIZE), 1);
  const totalAll = Object.values(stats).reduce((sum, n) => sum + n, 0);

  function pageHref(target: number) {
    const search = new URLSearchParams();
    if (q) search.set("q", q);
    if (status !== "all") search.set("status", status);
    if (target > 1) search.set("page", String(target));
    const query = search.toString();
    return query ? `/admin?${query}` : "/admin";
  }

  return (
    <main className="min-h-screen bg-[#f5faf6]">
      <header className="bg-[#0d3320] shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0">
              <Image src={logoImg} alt="Tín Chấp Việt" width={36} height={36} className="w-8 h-8 object-contain" />
            </div>
            <div>
              <div className="text-white font-bold text-sm leading-tight">QUẢN TRỊ ĐĂNG KÝ</div>
              <div className="text-[#a8d5b5] text-[10px] tracking-widest uppercase">Tín Chấp Việt</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-[#a8d5b5] hover:text-white text-sm transition-colors">
              Xem trang chủ
            </Link>
            <a
              href="/api/admin/export"
              className="hidden sm:inline-flex bg-[#1a5c35] hover:bg-[#256b40] text-white px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors"
            >
              Tải CSV
            </a>
            <form action="/api/admin/logout" method="post">
              <button
                type="submit"
                className="bg-[#c81f1a] hover:bg-[#a01510] text-white px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors"
              >
                Đăng xuất
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {loadError && (
          <div className="bg-[#c81f1a]/10 border border-[#c81f1a]/30 text-[#c81f1a] rounded-xl p-4 text-sm">
            <strong className="font-bold">Không tải được dữ liệu.</strong> {loadError}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="text-gray-400 text-xs uppercase tracking-wide">Tổng đăng ký</div>
            <div className="text-[#0d3320] font-black text-2xl mt-1">{totalAll}</div>
          </div>
          {LEAD_STATUSES.map((s) => (
            <div key={s} className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="text-gray-400 text-xs uppercase tracking-wide">{STATUS_LABEL[s]}</div>
              <div className="text-[#0d3320] font-black text-2xl mt-1">{stats[s] ?? 0}</div>
            </div>
          ))}
        </div>

        <form method="get" className="flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-[#0d3320] font-semibold text-xs mb-1.5" htmlFor="q">
              Tìm theo tên, số điện thoại, ghi chú
            </label>
            <input
              id="q"
              name="q"
              defaultValue={q}
              placeholder="Nguyễn Văn A hoặc 0985..."
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-[#1a5c35] focus:ring-2 focus:ring-[#1a5c35]/10 transition"
            />
          </div>
          <div>
            <label className="block text-[#0d3320] font-semibold text-xs mb-1.5" htmlFor="status">
              Trạng thái
            </label>
            <select
              id="status"
              name="status"
              defaultValue={status}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-[#1a5c35] transition"
            >
              <option value="all">Tất cả</option>
              {LEAD_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABEL[s]}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-[#1a5c35] hover:bg-[#256b40] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
          >
            Lọc
          </button>
          {(q || status !== "all") && (
            <Link href="/admin" className="text-gray-500 hover:text-[#0d3320] text-sm py-2.5">
              Xoá bộ lọc
            </Link>
          )}
        </form>

        <LeadsTable leads={leads.rows} />

        {totalPages > 1 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">
              Trang {page}/{totalPages} · {leads.total} kết quả
            </span>
            <div className="flex gap-2">
              {page > 1 && (
                <Link
                  href={pageHref(page - 1)}
                  className="px-4 py-2 rounded-lg bg-white border border-gray-200 hover:border-[#1a5c35] transition-colors"
                >
                  Trước
                </Link>
              )}
              {page < totalPages && (
                <Link
                  href={pageHref(page + 1)}
                  className="px-4 py-2 rounded-lg bg-white border border-gray-200 hover:border-[#1a5c35] transition-colors"
                >
                  Sau
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
