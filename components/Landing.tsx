"use client";

import { useState } from "react";
import Image from "next/image";
import posterImg from "@/public/poster.jpg";
import logoImg from "@/public/logo.png";

// ── Icons ─────────────────────────────────────────────────────────────────────

function IconChart() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
      <rect
        x="6"
        y="22"
        width="7"
        height="12"
        rx="2"
        fill="currentColor"
        opacity="0.6"
      />
      <rect x="16" y="14" width="7" height="20" rx="2" fill="currentColor" />
      <rect
        x="26"
        y="8"
        width="7"
        height="26"
        rx="2"
        fill="currentColor"
        opacity="0.8"
      />
      <polyline
        points="9,20 19,12 29,6"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
    </svg>
  );
}

function IconBasket() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
      <path d="M6 16h28l-3 14H9L6 16z" fill="currentColor" opacity="0.7" />
      <path
        d="M14 16l4-8M26 16l-4-8"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="14" cy="32" r="2" fill="white" />
      <circle cx="26" cy="32" r="2" fill="white" />
    </svg>
  );
}

function IconStore() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
      <rect
        x="6"
        y="18"
        width="28"
        height="16"
        rx="1"
        fill="currentColor"
        opacity="0.6"
      />
      <path
        d="M4 18l4-8h24l4 8"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <rect
        x="15"
        y="24"
        width="10"
        height="10"
        rx="1"
        fill="white"
        opacity="0.9"
      />
      <path d="M4 18h32" stroke="currentColor" strokeWidth="2" opacity="0.4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 22 22" fill="none" className="w-5 h-5 shrink-0 mt-0.5">
      <circle cx="11" cy="11" r="10" fill="#c81f1a" />
      <polyline
        points="6,11 9.5,14.5 16,8"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <path
        d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
        fill="currentColor"
      />
    </svg>
  );
}

function ZaloIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <rect width="24" height="24" rx="6" fill="none" />
      <text
        x="2"
        y="17"
        fontSize="14"
        fontWeight="700"
        fill="currentColor"
        fontFamily="sans-serif"
      >
        Za
      </text>
    </svg>
  );
}

// ── Nav ───────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: "Trang Chủ", id: "hero" },
  { label: "Dịch Vụ", id: "benefits" },
  { label: "Điều Kiện", id: "requirements" },
  { label: "Lợi Ích", id: "benefits" },
  { label: "Liên Hệ", id: "contact" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function Navbar({ onContact }: { onContact: () => void }) {
  const [open, setOpen] = useState(false);

  function handleNav(id: string) {
    scrollTo(id);
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 bg-[#0d3320] shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNav("hero")}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow overflow-hidden shrink-0">
            <Image
              src={logoImg}
              alt="Tín Chấp Việt"
              width={36}
              height={36}
              priority
              className="w-9 h-9 object-contain"
            />
          </div>
          <div className="text-left">
            <div className="text-white font-bold text-sm leading-tight tracking-wide">
              TÍN CHẤP VIỆT
            </div>
            <div className="text-[#a8d5b5] text-[10px] tracking-widest uppercase">
              Vay tín chấp
            </div>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNav(item.id)}
              className="text-[#a8d5b5] hover:text-white transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onContact}
            className="hidden sm:flex items-center gap-2 bg-[#c81f1a] hover:bg-[#a01510] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            <PhoneIcon /> 0985 410 836
          </button>
          <button
            className="md:hidden text-white p-1"
            onClick={() => setOpen(!open)}
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
              <path
                d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0d3320] border-t border-[#1a5c35] px-4 pb-4">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNav(item.id)}
              className="block w-full text-left py-2.5 text-[#a8d5b5] hover:text-white text-sm font-medium border-b border-[#1a5c35]/40 last:border-0"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              onContact();
              setOpen(false);
            }}
            className="mt-3 w-full flex items-center justify-center gap-2 bg-[#c81f1a] text-white py-3 rounded-lg font-semibold text-sm"
          >
            <PhoneIcon /> Liên Hệ Ngay
          </button>
        </div>
      )}
    </header>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function Hero({ onContact }: { onContact: () => void }) {
  return (
    <section id="hero" className="relative bg-[#e8f5ed] overflow-hidden">
      {/* Diagonal green overlay accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-1/2 h-full bg-[#c8e6d0]/60"
          style={{ clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)" }}
        />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-[#a8d5b5]/30 blur-[80px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        {/* Left content */}
        <div className="animate-fadeup">
          <div className="inline-flex items-center gap-2 bg-[#c81f1a]/10 border border-[#c81f1a]/30 rounded-full px-4 py-1.5 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#c81f1a]" />
            <span className="text-[#c81f1a] text-sm font-medium">
              Hỗ trợ doanh nghiệp 24/7
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight text-[#0d3320] mb-2 uppercase">
            Vay Đơn Giản
          </h1>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight text-[#c81f1a] mb-6 uppercase">
            Giải Ngân Nhanh
          </h1>

          <p className="text-[#2d6e47] text-base sm:text-lg mb-8 leading-relaxed max-w-md">
            Hỗ trợ khoản vay cho các hộ kinh doanh, doanh nghiệp nhỏ và vừa với
            thủ tục đơn giản, nhanh chóng.
          </p>

          {/* Loan range */}
          <div className="bg-[#c81f1a] rounded-2xl px-6 py-4 inline-block mb-8 shadow-[0_8px_32px_rgba(200,31,26,0.4)]">
            <div className="text-white/80 text-sm font-medium mb-0.5">
              Hạn mức khoản vay
            </div>
            <div className="text-white text-3xl sm:text-4xl font-black tracking-tight">
              50 Triệu – 1 Tỷ VNĐ
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={onContact}
              className="relative flex items-center gap-2 bg-[#c81f1a] hover:bg-[#a01510] text-white px-8 py-4 rounded-xl font-bold text-base transition-all duration-200 hover:scale-[1.02] shadow-[0_4px_20px_rgba(200,31,26,0.5)]"
            >
              Liên Hệ Ngay →
            </button>
            <a
              href="tel:0985410836"
              className="flex items-center gap-2 bg-white hover:bg-[#f0f9f3] border border-[#a8d5b5] text-[#0d3320] px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200"
            >
              <PhoneIcon /> 0985 410 836
            </a>
          </div>
        </div>

        {/* Right: poster image */}
        <div className="animate-fadeup-2 relative flex justify-center md:justify-end">
          <div className="relative w-full max-w-sm">
            <div className="absolute -inset-3 bg-gradient-to-br from-[#a8d5b5] to-[#c81f1a]/10 rounded-3xl blur-xl opacity-70" />
            <Image
              src={posterImg}
              alt="Tín Chấp Việt – Vay đơn giản, giải ngân nhanh"
              priority
              sizes="(max-width: 768px) 100vw, 384px"
              className="relative rounded-2xl shadow-2xl w-full h-auto object-cover border border-white/10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Requirements ──────────────────────────────────────────────────────────────

function Requirements() {
  const docs = [
    {
      title: "Căn Cước Công Dân",
      desc: "CCCD / CMND còn hiệu lực",
      icon: "🪪",
    },
    {
      title: "Giấy Phép Kinh Doanh",
      desc: "Đăng ký kinh doanh hợp lệ",
      icon: "📋",
    },
    { title: "Các Hồ Sơ Cơ Bản", desc: "Tùy loại khoản vay", icon: "📁" },
  ];

  return (
    <section id="requirements" className="bg-[#f5faf6] py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-block bg-[#1a5c35] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
            Thủ tục đơn giản
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0d3320]">
            Hồ Sơ Cần Chuẩn Bị
          </h2>
          <p className="text-gray-500 mt-3 max-w-md mx-auto">
            Chỉ cần vài giấy tờ cơ bản, hồ sơ được duyệt trong ngày
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {docs.map((d) => (
            <div
              key={d.title}
              className="bg-white rounded-2xl p-6 border border-[#e0f0e7] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-4xl mb-4">{d.icon}</div>
              <div className="flex items-start gap-2 mb-2">
                <CheckIcon />
                <h3 className="font-bold text-[#0d3320] text-base leading-tight">
                  {d.title}
                </h3>
              </div>
              <p className="text-gray-500 text-sm pl-7">{d.desc}</p>
            </div>
          ))}
        </div>

        {/* Process steps */}
        <div className="mt-12 bg-[#0d3320] rounded-2xl p-6 sm:p-8">
          <h3 className="text-white font-bold text-lg mb-6 text-center">
            Quy trình 3 bước đơn giản
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                step: "01",
                title: "Liên hệ tư vấn",
                desc: "Gọi hotline hoặc nhắn Zalo để được tư vấn miễn phí",
              },
              {
                step: "02",
                title: "Nộp hồ sơ",
                desc: "Chuẩn bị hồ sơ theo hướng dẫn, nộp trực tiếp hoặc online",
              },
              {
                step: "03",
                title: "Giải ngân",
                desc: "Hồ sơ duyệt trong ngày, tiền về tài khoản nhanh chóng",
              },
            ].map((s, i) => (
              <div
                key={s.step}
                className="relative flex flex-col items-center text-center"
              >
                {i < 2 && (
                  <div className="hidden sm:block absolute top-5 left-[60%] w-[80%] h-px bg-[#c81f1a]/30 border-t border-dashed border-[#c81f1a]/40" />
                )}
                <div className="relative w-12 h-12 rounded-full bg-[#c81f1a] flex items-center justify-center font-black text-white text-lg mb-3 shadow-[0_0_20px_rgba(200,31,26,0.4)]">
                  {s.step}
                </div>
                <h4 className="text-white font-bold text-sm mb-1">{s.title}</h4>
                <p className="text-[#a8d5b5] text-xs leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Benefits ──────────────────────────────────────────────────────────────────

function Benefits() {
  const items = [
    {
      icon: <IconChart />,
      title: "Mở Rộng Kinh Doanh",
      desc: "Bổ sung vốn lưu động, mở rộng quy mô, phát triển chi nhánh mới một cách nhanh chóng.",
    },
    {
      icon: <IconBasket />,
      title: "Nhập Hàng Hóa",
      desc: "Chủ động nhập hàng số lượng lớn, đáp ứng nhu cầu kinh doanh theo mùa vụ.",
    },
    {
      icon: <IconStore />,
      title: "Nâng Cấp Cửa Hàng",
      desc: "Đầu tư cơ sở vật chất, thiết bị hiện đại để nâng cao năng lực cạnh tranh.",
    },
  ];

  return (
    <section id="benefits" className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-block bg-[#c81f1a]/10 text-[#c81f1a] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
            Nhằm giúp đỡ doanh nghiệp của bạn
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0d3320]">
            Vốn Đúng Lúc – Bứt Phá Doanh Thu
          </h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">
            Chúng tôi đồng hành cùng hàng ngàn hộ kinh doanh, cửa hàng, doanh
            nghiệp vừa và nhỏ trên khắp cả nước
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.title}
              className="group relative overflow-hidden bg-[#f5faf6] hover:bg-[#0d3320] border border-[#e0f0e7] rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-default"
            >
              <div className="w-16 h-16 mx-auto mb-5 text-[#1a5c35] group-hover:text-[#a8d5b5] transition-colors duration-300">
                {item.icon}
              </div>
              <h3 className="font-black text-[#0d3320] group-hover:text-white text-lg mb-3 transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-gray-500 group-hover:text-[#a8d5b5] text-sm leading-relaxed transition-colors duration-300">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: "5.000+", label: "Hộ kinh doanh" },
            { value: "50Tr–1Tỷ", label: "Hạn mức vay" },
            { value: "24h", label: "Giải ngân nhanh" },
            { value: "98%", label: "Khách hàng hài lòng" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-[#0d3320] rounded-2xl p-5 text-center"
            >
              <div className="text-[#c81f1a] font-black text-2xl sm:text-3xl mb-1">
                {s.value}
              </div>
              <div className="text-[#a8d5b5] text-xs font-medium">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Contact CTA ───────────────────────────────────────────────────────────────

function ContactCTA({ id }: { id?: string }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    amount: "",
    note: "",
  });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error || "Gửi không thành công");
      }
      setForm({ name: "", phone: "", amount: "", note: "" });
      setSent(true);
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Không gửi được. Vui lòng gọi hotline 0985 410 836.",
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <section id={id} className="bg-[#0d3320] py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 items-start">
        {/* Left info */}
        <div>
          <div className="inline-block bg-[#c81f1a]/20 text-[#f5a0a0] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6">
            Liên hệ ngay
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
            Bắt Đầu Vay Vốn
            <br />
            <span className="text-[#c81f1a]">Chỉ Trong Hôm Nay</span>
          </h2>
          <p className="text-[#a8d5b5] mb-8 leading-relaxed">
            Đội ngũ chuyên viên tư vấn sẵn sàng hỗ trợ bạn 24/7. Liên hệ ngay để
            được tư vấn miễn phí và giải ngân nhanh nhất.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-[#1a5c35]/40 border border-[#256b40]/40 rounded-xl p-4">
              <div className="relative w-12 h-12 shrink-0">
                <div className="pulse-ring" />
                <div className="w-12 h-12 rounded-full bg-[#c81f1a] flex items-center justify-center text-white">
                  <PhoneIcon />
                </div>
              </div>
              <div>
                <div className="text-[#a8d5b5] text-xs mb-0.5">
                  Hotline tư vấn
                </div>
                <a
                  href="tel:0985410836"
                  className="text-white font-bold text-xl hover:text-[#c81f1a] transition-colors"
                >
                  0985 410 836
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-[#1a5c35]/40 border border-[#256b40]/40 rounded-xl p-4">
              <div className="w-12 h-12 shrink-0 rounded-full bg-[#0068ff] flex items-center justify-center text-white text-sm font-black">
                Za
              </div>
              <div>
                <div className="text-[#a8d5b5] text-xs mb-0.5">Zalo tư vấn</div>
                <a
                  href="https://zalo.me/0985410836"
                  className="text-white font-bold text-xl hover:text-[#0068ff] transition-colors"
                >
                  0985 410 836
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-[#1a5c35]/40 border border-[#256b40]/40 rounded-xl p-4">
              <div className="w-12 h-12 shrink-0 rounded-full bg-[#256b40] flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <div>
                <div className="text-[#a8d5b5] text-xs mb-0.5">Địa chỉ</div>
                <div className="text-white font-medium text-sm">
                  Toàn quốc – Hỗ trợ online & tại nhà
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl">
          {sent ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-16 h-16 bg-[#1a5c35] rounded-full flex items-center justify-center text-white text-3xl mb-4">
                ✓
              </div>
              <h3 className="text-[#0d3320] font-black text-xl mb-2">
                Đăng ký thành công!
              </h3>
              <p className="text-gray-500 text-sm">
                Chuyên viên sẽ liên hệ lại trong vòng 30 phút. Cảm ơn bạn đã tin
                tưởng Tín Chấp Việt!
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-6 text-[#1a5c35] text-sm font-semibold underline"
              >
                Gửi yêu cầu khác
              </button>
            </div>
          ) : (
            <>
              <h3 className="font-black text-[#0d3320] text-xl mb-1">
                Đăng Ký Vay Vốn
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                Điền thông tin – Chuyên viên sẽ liên hệ ngay
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[#0d3320] font-semibold text-sm mb-1.5">
                    Họ và tên *
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Nguyễn Văn A"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#1a5c35] focus:ring-2 focus:ring-[#1a5c35]/10 transition"
                  />
                </div>
                <div>
                  <label className="block text-[#0d3320] font-semibold text-sm mb-1.5">
                    Số điện thoại *
                  </label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    placeholder="0985 410 836"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#1a5c35] focus:ring-2 focus:ring-[#1a5c35]/10 transition"
                  />
                </div>
                <div>
                  <label className="block text-[#0d3320] font-semibold text-sm mb-1.5">
                    Số tiền cần vay
                  </label>
                  <select
                    value={form.amount}
                    onChange={(e) =>
                      setForm({ ...form, amount: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#1a5c35] focus:ring-2 focus:ring-[#1a5c35]/10 transition bg-white"
                  >
                    <option value="">-- Chọn mức vay --</option>
                    <option>50 – 100 Triệu</option>
                    <option>100 – 300 Triệu</option>
                    <option>300 – 500 Triệu</option>
                    <option>500 Triệu – 1 Tỷ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#0d3320] font-semibold text-sm mb-1.5">
                    Ghi chú
                  </label>
                  <textarea
                    value={form.note}
                    onChange={(e) => setForm({ ...form, note: e.target.value })}
                    placeholder="Mô tả ngắn về nhu cầu vay vốn..."
                    rows={3}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#1a5c35] focus:ring-2 focus:ring-[#1a5c35]/10 transition resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-[#c81f1a] hover:bg-[#a01510] text-white font-bold py-4 rounded-xl text-base transition-all duration-200 hover:scale-[1.01] shadow-[0_4px_20px_rgba(200,31,26,0.35)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {sending ? "Đang gửi..." : "Đăng Ký Ngay – Miễn Phí Tư Vấn"}
                </button>
                {error && (
                  <p className="text-center text-[#c81f1a] text-sm font-medium">
                    {error}
                  </p>
                )}
                <p className="text-center text-gray-400 text-xs">
                  Thông tin của bạn được bảo mật tuyệt đối
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-[#060f09] py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0">
            <Image
              src={logoImg}
              alt="Tín Chấp Việt"
              width={32}
              height={32}
              priority
              className="w-8 h-8 object-contain"
            />
          </div>
          <span className="text-[#a8d5b5] text-sm font-semibold">
            TÍN CHẤP VIỆT
          </span>
        </div>
        <p className="text-[#4a7a5a] text-xs text-center">
          © 2024 Tín Chấp Việt. Hotline: 0985 410 836 · Zalo: 0985 410 836
        </p>
        <div className="flex items-center gap-3">
          <a
            href="tel:0985410836"
            className="w-8 h-8 rounded-full bg-[#1a5c35] flex items-center justify-center text-white hover:bg-[#256b40] transition-colors"
          >
            <PhoneIcon />
          </a>
          <a
            href="https://zalo.me/0985410836"
            className="w-8 h-8 rounded-full bg-[#0068ff] flex items-center justify-center text-white text-xs font-black hover:bg-[#0052cc] transition-colors"
          >
            Za
          </a>
        </div>
      </div>
    </footer>
  );
}

// ── Floating CTA ──────────────────────────────────────────────────────────────

function FloatingCTA() {
  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-2">
      <a
        href="https://zalo.me/0985410836"
        className="flex items-center gap-2 bg-[#0068ff] text-white px-4 py-2.5 rounded-full font-semibold text-sm shadow-lg hover:bg-[#0052cc] transition-all hover:scale-105"
      >
        Zalo
      </a>
      <a
        href="tel:0985410836"
        className="relative flex items-center gap-2 bg-[#c81f1a] text-white px-4 py-2.5 rounded-full font-semibold text-sm shadow-lg hover:bg-[#a01510] transition-all hover:scale-105"
      >
        <div className="pulse-ring !border-[#c81f1a]" />
        <PhoneIcon /> Gọi ngay
      </a>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function Landing() {
  const [, setContactOpen] = useState(false);

  function scrollToContact() {
    scrollTo("contact");
  }

  return (
    <div className="min-h-full bg-white">
      <Navbar onContact={scrollToContact} />
      <Hero onContact={scrollToContact} />
      <Requirements />
      <Benefits />
      <ContactCTA id="contact" />
      <Footer />
      <FloatingCTA />
    </div>
  );
}
