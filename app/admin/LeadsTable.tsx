"use client";

import { useState, useTransition } from "react";
import { removeLead, setLeadStatus } from "./actions";
import { LEAD_STATUSES, STATUS_LABEL, type Lead, type LeadStatus } from "@/lib/leads";

const STATUS_STYLE: Record<LeadStatus, { select: string; dot: string }> = {
  new: { select: "bg-[#c81f1a]/8 text-[#c81f1a] border-[#c81f1a]/25", dot: "bg-[#c81f1a]" },
  contacted: { select: "bg-[#e8a020]/10 text-[#9a6a10] border-[#e8a020]/40", dot: "bg-[#e8a020]" },
  done: { select: "bg-[#1a5c35]/10 text-[#1a5c35] border-[#1a5c35]/30", dot: "bg-[#1a5c35]" },
  rejected: { select: "bg-gray-100 text-gray-500 border-gray-200", dot: "bg-gray-400" },
};

const AVATAR_COLORS = [
  "bg-[#1a5c35]",
  "bg-[#c81f1a]",
  "bg-[#e8a020]",
  "bg-[#0d3320]",
  "bg-[#256b40]",
];

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function avatarColor(name: string): string {
  let sum = 0;
  for (const ch of name) sum += ch.charCodeAt(0);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
}

function formatTime(value: string): string {
  return new Date(value).toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function LeadRow({ lead }: { lead: Lead }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const style = STATUS_STYLE[lead.status] ?? STATUS_STYLE.new;

  function changeStatus(status: string) {
    setError("");
    startTransition(async () => {
      try {
        await setLeadStatus(lead.id, status);
      } catch {
        setError("Không cập nhật được");
      }
    });
  }

  function handleDelete() {
    if (!confirm(`Xoá đăng ký của "${lead.name}"? Thao tác này không hoàn tác được.`)) return;
    setError("");
    startTransition(async () => {
      try {
        await removeLead(lead.id);
      } catch {
        setError("Không xoá được");
      }
    });
  }

  return (
    <tr className={`group hover:bg-[#f5faf6]/70 transition-colors ${pending ? "opacity-50" : ""}`}>
      <td className="px-4 py-3.5 align-top whitespace-nowrap text-xs text-gray-500">
        {formatTime(lead.created_at)}
      </td>
      <td className="px-4 py-3.5 align-top">
        <div className="flex items-start gap-3">
          <span
            className={`shrink-0 w-9 h-9 rounded-full ${avatarColor(lead.name)} text-white text-xs font-bold flex items-center justify-center`}
          >
            {initials(lead.name)}
          </span>
          <div className="min-w-0">
            <div className="font-semibold text-[#0d3320] truncate">{lead.name}</div>
            {lead.note && <div className="text-gray-500 text-xs mt-0.5 max-w-xs line-clamp-2">{lead.note}</div>}
          </div>
        </div>
      </td>
      <td className="px-4 py-3.5 align-top whitespace-nowrap">
        <a
          href={`tel:${lead.phone.replace(/\s/g, "")}`}
          className="inline-flex items-center gap-1.5 text-[#1a5c35] font-semibold hover:underline"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-60">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {lead.phone}
        </a>
      </td>
      <td className="px-4 py-3.5 align-top whitespace-nowrap text-gray-700 font-medium">{lead.amount || "—"}</td>
      <td className="px-4 py-3.5 align-top">
        <div className="relative inline-flex items-center">
          <span className={`absolute left-2.5 w-2 h-2 rounded-full ${style.dot} pointer-events-none`} />
          <select
            value={lead.status}
            disabled={pending}
            onChange={(e) => changeStatus(e.target.value)}
            className={`appearance-none border rounded-lg pl-6 pr-7 py-1.5 text-xs font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1a5c35]/20 disabled:cursor-wait ${style.select}`}
          >
            {LEAD_STATUSES.map((status) => (
              <option key={status} value={status}>
                {STATUS_LABEL[status]}
              </option>
            ))}
          </select>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="absolute right-2 pointer-events-none opacity-50">
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        {error && <div className="text-[#c81f1a] text-xs mt-1">{error}</div>}
      </td>
      <td className="px-4 py-3.5 align-top text-right">
        <button
          type="button"
          onClick={handleDelete}
          disabled={pending}
          aria-label="Xoá đăng ký"
          className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-gray-300 hover:text-[#c81f1a] hover:bg-[#c81f1a]/10 transition-colors disabled:opacity-50"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </td>
    </tr>
  );
}

export default function LeadsTable({ leads }: { leads: Lead[] }) {
  if (leads.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
        <div className="w-14 h-14 mx-auto rounded-full bg-[#f5faf6] flex items-center justify-center mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a5c35" strokeWidth="2" className="opacity-50">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="text-gray-500 font-medium">Chưa có đăng ký nào khớp bộ lọc.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#f5faf6] text-[#0d3320] text-[11px] uppercase tracking-wider border-b border-gray-100">
            <th className="px-4 py-3 text-left font-bold">Thời gian</th>
            <th className="px-4 py-3 text-left font-bold">Khách hàng</th>
            <th className="px-4 py-3 text-left font-bold">Điện thoại</th>
            <th className="px-4 py-3 text-left font-bold">Mức vay</th>
            <th className="px-4 py-3 text-left font-bold">Trạng thái</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {leads.map((lead) => (
            <LeadRow key={lead.id} lead={lead} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
