# Tín Chấp Việt

Landing page vay tín chấp + trang quản trị lưu thông tin khách đăng ký.

## Thiết lập lần đầu trên Vercel

1. **Gắn cơ sở dữ liệu**: Vercel > project > tab **Storage** > **Create Database**
   > chọn **Neon (Serverless Postgres)** > gói Free. Vercel tự thêm biến
   `DATABASE_URL` vào project. Bảng `leads` được tạo tự động ở lần đăng ký đầu tiên.

2. **Đặt mật khẩu admin**: Settings > Environment Variables, thêm:
   - `ADMIN_PASSWORD` – mật khẩu để vào `/admin`
   - `AUTH_SECRET` – (nên có) chuỗi ngẫu nhiên, tạo bằng:
     `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

   Nhớ tick cả ba môi trường Production / Preview / Development.

3. **Deploy lại** để biến môi trường có hiệu lực.

4. **Kiểm tra kết nối** (tuỳ chọn, chạy ở máy bạn): dán chuỗi kết nối vào `.env`
   rồi chạy `pnpm db:init --test`. Script sẽ tạo bảng, in cấu trúc bảng và ghi
   thử một dòng rồi xoá đi để chắc chắn chuỗi kết nối có quyền ghi.

## Cấu hình build trên Vercel

`vercel.json` khai báo `framework: nextjs` và bỏ trống `outputDirectory` để ghi
đè cấu hình cũ của dự án Vite (Output Directory `dist`). Nếu Vercel vẫn báo
*"No Output Directory named dist found"*, vào Settings > Build & Deployment và
đổi **Framework Preset** sang **Next.js**, đồng thời tắt ô ghi đè
**Output Directory**.

## Sử dụng

- Trang chủ `/` – khách điền form đăng ký vay.
- Trang quản trị `/admin` – đăng nhập bằng `ADMIN_PASSWORD`, xem danh sách đăng ký,
  lọc theo trạng thái, tìm theo tên/số điện thoại, đổi trạng thái
  (Mới → Đã liên hệ → Đã giải ngân / Không đạt), xoá, tải CSV mở bằng Excel.

Phiên đăng nhập giữ trong 12 giờ. Đổi `ADMIN_PASSWORD` sẽ đăng xuất mọi phiên
(trừ khi bạn đã đặt `AUTH_SECRET` riêng).

## Chạy máy cá nhân

```bash
pnpm install
cp .env.example .env.local   # điền DATABASE_URL, ADMIN_PASSWORD
pnpm dev
```

Chi tiết cấu trúc mã nguồn xem [AGENTS.md](AGENTS.md).
