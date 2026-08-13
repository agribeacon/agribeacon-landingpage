// Nhãn môi trường cho footer embed Discord. VERCEL_ENV một mình không đủ:
// bản staging (staging.agribeacon.tech) proxy /api về chính function Vercel
// prod nên VERCEL_ENV luôn là "production" — phải kèm host nguồn
// (origin/referer) mới phân biệt được lead thật với lead test.
type RequestWithHeaders = {
  headers?: Record<string, string | string[] | undefined>;
};

export const envFooter = (req: RequestWithHeaders): string => {
  const h = req.headers || {};
  const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || "";
  const ref = first(h.origin) || first(h.referer);
  let host = "";
  try {
    host = ref ? new URL(ref).host : "";
  } catch {
    host = "";
  }
  const env = process.env.VERCEL_ENV || process.env.NODE_ENV || "development";
  return `Môi trường: ${env}${host ? ` · từ ${host}` : ""}`;
};
