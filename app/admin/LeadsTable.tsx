"use client";

import { useState, useTransition } from "react";
import { removeLead, setLeadStatus } from "./actions";
import { LEAD_STATUSES, STATUS_LABEL, type Lead, type LeadStatus } from "@/lib/leads";

const STATUS_STYLE: Record<LeadStatus, string> = {
  new: "bg-[#c81f1a]/10 text-[#c81f1a] border-[#c81f1a]/30",
  contacted: "bg-[#e8a020]/10 text-[#9a6a10] border-[#e8a020]/40",
  done: "bg-[#1a5c35]/10 text-[#1a5c35] border-[#1a5c35]/30",
  rejected: "bg-gray-100 text-gray-500 border-gray-200",
};

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
    <tr className={pending ? "opacity-50 transition-opacity" : "transition-opacity"}>
      <td className="px-4 py-3 align-top whitespace-nowrap text-xs text-gray-500">
        {formatTime(lead.created_at)}
      </td>
      <td className="px-4 py-3 align-top">
        <div className="font-semibold text-[#0d3320]">{lead.name}</div>
        {lead.note && <div className="text-gray-500 text-xs mt-1 max-w-xs">{lead.note}</div>}
      </td>
      <td className="px-4 py-3 align-top whitespace-nowrap">
        <a href={`tel:${lead.phone.replace(/\s/g, "")}`} className="text-[#1a5c35] font-semibold hover:underline">
          {lead.phone}
        </a>
      </td>
      <td className="px-4 py-3 align-top whitespace-nowrap text-gray-700">{lead.amount || "—"}</td>
      <td className="px-4 py-3 align-top">
        <select
          value={lead.status}
          disabled={pending}
          onChange={(e) => changeStatus(e.target.value)}
          className={`border rounded-lg px-2 py-1.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#1a5c35]/20 ${STATUS_STYLE[lead.status] ?? STATUS_STYLE.new}`}
        >
          {LEAD_STATUSES.map((status) => (
            <option key={status} value={status}>
              {STATUS_LABEL[status]}
            </option>
          ))}
        </select>
        {error && <div className="text-[#c81f1a] text-xs mt-1">{error}</div>}
      </td>
      <td className="px-4 py-3 align-top text-right">
        <button
          type="button"
          onClick={handleDelete}
          disabled={pending}
          className="text-gray-400 hover:text-[#c81f1a] text-xs font-semibold transition-colors disabled:opacity-50"
        >
          Xoá
        </button>
      </td>
    </tr>
  );
}

export default function LeadsTable({ leads }: { leads: Lead[] }) {
  if (leads.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center text-gray-400">
        Chưa có đăng ký nào khớp bộ lọc.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#f5faf6] text-[#0d3320] text-xs uppercase tracking-wide">
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
