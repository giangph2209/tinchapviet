"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Đăng nhập thất bại");
      const next = params.get("next");
      router.replace(next && next.startsWith("/admin") ? next : "/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đăng nhập thất bại");
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-8 space-y-4"
    >
      <div>
        <h1 className="text-[#0d3320] font-black text-xl">Quản trị Tín Chấp Việt</h1>
        <p className="text-gray-400 text-sm mt-1">Nhập mật khẩu để xem danh sách đăng ký</p>
      </div>
      <div>
        <label className="block text-[#0d3320] font-semibold text-sm mb-1.5" htmlFor="password">
          Mật khẩu
        </label>
        <input
          id="password"
          type="password"
          autoFocus
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-[#1a5c35] focus:ring-2 focus:ring-[#1a5c35]/10 transition"
        />
      </div>
      {error && <p className="text-[#c81f1a] text-sm font-medium">{error}</p>}
      <button
        type="submit"
        disabled={busy}
        className="w-full bg-[#c81f1a] hover:bg-[#a01510] text-white font-bold py-3 rounded-xl text-base transition-colors disabled:opacity-60"
      >
        {busy ? "Đang kiểm tra..." : "Đăng nhập"}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-[#0d3320] flex items-center justify-center p-4">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
