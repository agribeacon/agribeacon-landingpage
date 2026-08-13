import { envFooter } from "./_env";

type ContactField = {
  name?: string;
  value?: string;
};

type ContactRequest = {
  subject?: string;
  color?: number;
  fields?: ContactField[];
};

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

const MAX_VALUE_LENGTH = 1024;
const MAX_FIELDS = 25;
const DEFAULT_COLOR = 0x4ade80;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const webhook = process.env.DISCORD_WEBHOOK_URL;
  if (!webhook) {
    return res.status(500).json({ error: "Missing DISCORD_WEBHOOK_URL" });
  }

  const body = (req.body || {}) as ContactRequest;
  const subject = (body.subject || "📬 Liên hệ mới").trim().slice(0, 256);
  const color = typeof body.color === "number" ? body.color : DEFAULT_COLOR;

  // Keep only fields that actually have a value; Discord rejects empty field values.
  const fields = (Array.isArray(body.fields) ? body.fields : [])
    .filter((f) => f && typeof f.value === "string" && f.value.trim())
    .slice(0, MAX_FIELDS)
    .map((f) => ({
      name: (f.name || "—").slice(0, 256),
      value: f.value!.trim().slice(0, MAX_VALUE_LENGTH),
    }));

  if (fields.length === 0) {
    return res.status(400).json({ error: "Cần ít nhất một trường có nội dung" });
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [
          {
            title: subject,
            color,
            fields,
            footer: { text: envFooter(req) },
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
    console.error("Failed to post contact to Discord:", err);
    return res.status(500).json({ error: "Gửi thất bại" });
  }
}
