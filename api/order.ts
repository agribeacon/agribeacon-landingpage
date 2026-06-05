type OrderItem = {
  name?: string;
  quantity?: number;
  billing?: "yearly" | "monthly" | string;
  isRental?: boolean;
};

type OrderRequest = {
  name?: string;
  phone?: string;
  items?: OrderItem[];
};

type VercelRequest = {
  method?: string;
  body?: unknown;
};

type VercelResponse = {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => {
    json: (body: unknown) => void;
  };
};

const MAX_FIELD_LENGTH = 1000;

const buildItemLines = (items: OrderItem[]): string =>
  items
    .map((item) => {
      const qty = item.quantity || 1;
      const billing = item.billing
        ? ` (${item.billing === "yearly" ? "Năm" : "Tháng"})`
        : "";
      const rental = item.isRental ? " — Thuê" : "";
      return `• **${item.name ?? "Sản phẩm"}**${rental}${billing} × ${qty}`;
    })
    .join("\n")
    .slice(0, MAX_FIELD_LENGTH);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const webhook = process.env.DISCORD_WEBHOOK_URL;
  if (!webhook) {
    return res.status(500).json({ error: "Missing DISCORD_WEBHOOK_URL" });
  }

  const body = (req.body || {}) as OrderRequest;
  const name = (body.name || "").trim().slice(0, 256);
  const phone = (body.phone || "").trim().slice(0, 64);
  const items = Array.isArray(body.items) ? body.items.slice(0, 50) : [];

  if (!name || !phone) {
    return res.status(400).json({ error: "Họ tên và số điện thoại là bắt buộc" });
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [
          {
            title: "🛒 Yêu cầu báo giá mới",
            color: 0x4ade80,
            fields: [
              { name: "👤 Họ và tên", value: name, inline: true },
              { name: "📞 Số điện thoại", value: phone, inline: true },
              { name: `📦 Sản phẩm (${items.length})`, value: buildItemLines(items) || "—" },
            ],
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });

    if (!response.ok) {
      console.error("Discord webhook failed:", response.status);
      return res.status(502).json({ error: "Không gửi được thông báo" });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Failed to post order to Discord:", err);
    return res.status(500).json({ error: "Gửi thất bại" });
  }
}
