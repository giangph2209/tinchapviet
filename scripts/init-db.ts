/**
 * Khởi tạo và kiểm tra cơ sở dữ liệu.
 *
 *   pnpm db:init          tạo bảng nếu chưa có, rồi báo cáo tình trạng
 *   pnpm db:init --test   làm như trên, thêm một lượt ghi/xoá thử để chắc
 *                         chắn chuỗi kết nối có quyền ghi
 *
 * Dùng chung ensureSchema() với ứng dụng nên không sợ lệch định nghĩa bảng.
 */
import { ensureSchema, sql } from "../lib/db.ts";

function fail(message: string): never {
  console.error(`\n✖ ${message}\n`);
  process.exit(1);
}

const url = process.env.DATABASE_URL;

if (!url) {
  fail(
    "Chưa có DATABASE_URL.\n" +
      "  Tạo file .env ở thư mục gốc (copy từ .env.example) rồi dán chuỗi kết nối Neon vào.",
  );
}

if (/user:password|ep-xxx/.test(url)) {
  fail(
    "DATABASE_URL vẫn là chuỗi mẫu trong .env.example.\n" +
      "  Lấy chuỗi thật ở Vercel > Storage > database của bạn > .env.local,\n" +
      "  hoặc ở console.neon.tech > Connection string.",
  );
}

let host = "?";
try {
  host = new URL(url).hostname;
} catch {
  fail("DATABASE_URL không phải một URL hợp lệ.");
}

console.log(`\nKết nối tới ${host} ...`);

try {
  await ensureSchema();
  console.log("✔ Bảng leads đã sẵn sàng.");

  const db = sql();

  const columns = (await db`
    SELECT column_name, data_type
    FROM information_schema.columns
    WHERE table_name = 'leads'
    ORDER BY ordinal_position
  `) as { column_name: string; data_type: string }[];

  console.log("\nCấu trúc bảng leads:");
  for (const c of columns) {
    console.log(`  ${c.column_name.padEnd(12)} ${c.data_type}`);
  }

  if (process.argv.includes("--test")) {
    const inserted = (await db`
      INSERT INTO leads (name, phone, amount, note)
      VALUES ('Kiểm tra kết nối', '0000000000', '', 'Bản ghi thử, sẽ tự xoá')
      RETURNING id
    `) as { id: number }[];
    const id = inserted[0].id;
    await db`DELETE FROM leads WHERE id = ${id}`;
    console.log(`\n✔ Ghi và xoá thử thành công (id ${id}). Chuỗi kết nối có quyền ghi.`);
  }

  const counts = (await db`SELECT count(*)::int AS total FROM leads`) as { total: number }[];
  console.log(`\nHiện có ${counts[0].total} đăng ký trong bảng.`);
  console.log("\nXong. Chạy `pnpm dev` rồi mở http://localhost:3000/admin\n");
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  fail(`Không kết nối được cơ sở dữ liệu:\n  ${message}`);
}
