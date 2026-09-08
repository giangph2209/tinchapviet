# tinchapviet

Landing page vay tín chấp + trang quản trị đăng ký. Next.js 15 (App Router),
React 19, Tailwind CSS v4, Neon Postgres. Deploy trên Vercel.

## Chạy máy cá nhân

```bash
pnpm install
cp .env.example .env.local   # điền DATABASE_URL và ADMIN_PASSWORD
pnpm dev                     # http://localhost:3000
```

`pnpm build` chạy `next build`, `pnpm typecheck` chạy `tsc --noEmit`.
`pnpm db:init` tạo bảng và kiểm tra kết nối cơ sở dữ liệu (thêm `--test` để
ghi/xoá thử một dòng).

## Cấu trúc

- `app/page.tsx` – trang chủ, chỉ bọc `components/Landing.tsx`
- `components/Landing.tsx` – toàn bộ giao diện landing (client component)
- `app/globals.css` – Tailwind v4 + `@theme` màu thương hiệu + animation
- `app/layout.tsx` – metadata, favicon (`public/logo.png`)
- `app/admin/page.tsx` – bảng danh sách đăng ký, lọc, phân trang, thống kê
- `app/admin/LeadsTable.tsx` – bảng có đổi trạng thái / xoá (client)
- `app/admin/actions.ts` – server action đổi trạng thái, xoá
- `app/admin/login/page.tsx` – form đăng nhập
- `app/api/leads/route.ts` – POST nhận đăng ký từ form
- `app/api/admin/{login,logout,export}` – đăng nhập, đăng xuất, tải CSV
- `middleware.ts` – chặn `/admin/*` và `/api/admin/*` khi chưa đăng nhập
- `lib/db.ts` – kết nối Neon, tạo bảng `leads` nếu chưa có
- `lib/leads.ts` – kiểu dữ liệu, kiểm tra đầu vào, truy vấn
- `lib/auth.ts` – mật khẩu admin, cookie phiên ký HMAC (Web Crypto)
- `lib/session.ts` – đọc cookie phiên trong server component / server action
- `scripts/init-db.ts` – khởi tạo và kiểm tra cơ sở dữ liệu (`pnpm db:init`)

## Biến môi trường

| Biến | Bắt buộc | Ghi chú |
| --- | --- | --- |
| `DATABASE_URL` | có | Neon tự đổ vào khi gắn ở Vercel > Storage |
| `ADMIN_PASSWORD` | có | Mật khẩu vào `/admin` |
| `AUTH_SECRET` | không | Khoá ký cookie; bỏ trống thì dẫn xuất từ `ADMIN_PASSWORD` |

## Lưu ý khi sửa code

- Ảnh đặt trong `public/` và **không** để Git LFS quản lý: Vercel không tải LFS
  objects khi build nên ảnh sẽ thành file con trỏ và bị vỡ. Xem `.gitattributes`.
- Dùng nháy kép cho chuỗi có dấu nháy đơn (`"We're here"`), hoặc escape lại.
- Bảng `leads` được tạo tự động bằng `CREATE TABLE IF NOT EXISTS` trong
  `lib/db.ts`; dự án chỉ có một bảng nên chưa cần công cụ migration riêng.
