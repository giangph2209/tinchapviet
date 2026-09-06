import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let cached: NeonQueryFunction<false, false> | null = null;

/** Kết nối Neon Postgres. DATABASE_URL do Vercel đổ vào khi gắn Neon integration. */
export function sql(): NeonQueryFunction<false, false> {
  if (cached) return cached;
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "Thiếu biến môi trường DATABASE_URL. Gắn Neon Postgres trong Vercel > Storage, hoặc thêm vào .env.local khi chạy máy cá nhân.",
    );
  }
  cached = neon(url);
  return cached;
}

let schemaReady: Promise<void> | null = null;

/**
 * Tạo bảng nếu chưa có. Dự án chỉ có một bảng nên không cần công cụ migration
 * riêng; chạy một lần cho mỗi tiến trình serverless.
 */
export function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      const db = sql();
      await db`
        CREATE TABLE IF NOT EXISTS leads (
          id          bigserial PRIMARY KEY,
          name        text        NOT NULL,
          phone       text        NOT NULL,
          amount      text        NOT NULL DEFAULT '',
          note        text        NOT NULL DEFAULT '',
          status      text        NOT NULL DEFAULT 'new',
          ip          text,
          user_agent  text,
          created_at  timestamptz NOT NULL DEFAULT now()
        )
      `;
      await db`CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC)`;
      await db`CREATE INDEX IF NOT EXISTS leads_status_idx ON leads (status)`;
    })().catch((err) => {
      schemaReady = null; // cho phép thử lại ở request sau
      throw err;
    });
  }
  return schemaReady;
}
