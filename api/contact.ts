// Form liên hệ (/contact) → CRM AgriBeacon. Hàm server này giữ khoá API; trình duyệt không
// bao giờ gọi thẳng CRM. Mỗi lần gửi thành công là một dòng ở hàng chờ "Lead tự về chờ duyệt"
// của CRM, kênh Website — đội sale duyệt và liên hệ lại.
//
// Biến môi trường (server-only, KHÔNG đặt VITE_*):
//   CRM_API_URL  địa chỉ gốc API của CRM, không có dấu / cuối
//   CRM_API_KEY  khoá API cấp cho website

// `need` … `plan` là ngữ cảnh nút khách đã bấm để tới form (query string của /contact).
const FIELDS = [
  "name",
  "phone",
  "email",
  "farmSize",
  "message",
  "need",
  "from",
  "crop",
  "area",
  "device",
  "plan",
] as const;

type Field = (typeof FIELDS)[number];

type VercelRequest = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string | string[] | undefined>;
};

type VercelResponse = {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => {
    json: (body: unknown) => void;
  };
};

// Khớp trần độ dài của cửa CRM — cắt ở đây để một ô quá dài không làm rơi cả lead.
const LIMITS: Record<Field, number> = {
  name: 160,
  phone: 40,
  email: 160,
  farmSize: 160,
  message: 2000,
  need: 60,
  from: 60,
  crop: 60,
  area: 20,
  device: 60,
  plan: 60,
};

const clean = (value: unknown, max: number): string | null => {
  if (typeof value !== "string") return null;
  const trimmed = value.trim().slice(0, max);
  return trimmed || null;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiUrl = process.env.CRM_API_URL;
  const apiKey = process.env.CRM_API_KEY;
  if (!apiUrl || !apiKey) {
    console.error("Missing CRM_API_URL / CRM_API_KEY");
    return res.status(500).json({ error: "Chưa cấu hình kết nối CRM" });
  }

  const body = (req.body && typeof req.body === "object" ? req.body : {}) as Record<string, unknown>;
  const lead = Object.fromEntries(FIELDS.map((key) => [key, clean(body[key], LIMITS[key])])) as Record<
    Field,
    string | null
  >;

  if (!lead.name) {
    return res.status(400).json({ error: "Thiếu họ tên" });
  }
  if (!lead.phone && !lead.email) {
    return res.status(400).json({ error: "Cần số điện thoại hoặc email" });
  }

  try {
    const response = await fetch(`${apiUrl.replace(/\/+$/, "")}/integrations/website-leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Api-Key": apiKey },
      body: JSON.stringify(lead),
    });

    if (!response.ok) {
      console.error("CRM rejected website lead:", response.status, await response.text());
      // 400 = dữ liệu khách gõ không hợp lệ · 429 = đang quá nhiều lượt gửi · còn lại = lỗi phía CRM.
      const status = response.status === 400 || response.status === 429 ? response.status : 502;
      return res.status(status).json({ error: "Không gửi được về CRM" });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Failed to reach CRM:", err);
    return res.status(502).json({ error: "Không tới được CRM" });
  }
}
