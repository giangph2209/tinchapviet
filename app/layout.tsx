import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tín Chấp Việt – Vay tín chấp, giải ngân nhanh toàn quốc",
  description:
    "Vay tín chấp 50 triệu đến 3 tỷ, thủ tục đơn giản, giải ngân trong ngày. Hotline 0985 410 836.",
  icons: { icon: "/logo.png", apple: "/logo.png" },
};

export const viewport: Viewport = {
  themeColor: "#0d3320",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
