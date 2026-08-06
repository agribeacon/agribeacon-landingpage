import { retrieveAgriBeaconKnowledge } from "./knowledge.js";

const OPENCODE_GO_ENDPOINT = "https://opencode.ai/zen/go/v1/chat/completions";
const DEFAULT_MODEL = "deepseek-v4-flash";
// AND-386: nhà cung cấp có thể từ chối MODEL (vd "latest version ... requires explicit opt in")
// làm trợ lý ngừng trả lời hoàn toàn. Cho phép cấu hình danh sách model dự phòng qua env để
// ops đổi ngay không cần sửa code: OPENCODE_GO_FALLBACK_MODELS="model-a,model-b".
const fallbackModels = (): string[] =>
  (process.env.OPENCODE_GO_FALLBACK_MODELS || "")
    .split(",")
    .map((m) => m.trim())
    .filter(Boolean);
const MAX_MESSAGES = 12;
const MAX_CONTENT_LENGTH = 2000;

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

type ChatRequest = {
  messages?: ChatMessage[];
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

type OpenCodeGoResponse = {
  error?: {
    message?: string;
  };
  choices?: Array<{
    message?: {
      content?: string;
      reasoning_content?: string;
    };
  }>;
};

// Thông báo hiển thị cho khách khi nhà cung cấp AI lỗi/từ chối — thay vì lỗi kỹ thuật.
const PROVIDER_DOWN_MESSAGE =
  "Trợ lý đang tạm thời không phản hồi được. Bạn thử lại sau ít phút, hoặc để lại câu hỏi ở form liên hệ để đội ngũ AgriBeacon trả lời nhé.";

const systemPrompt = `You are Than Nong, AgriBeacon's helpful AI assistant for farmers and agricultural operators.
Answer in the user's language. Answer directly without step-by-step reasoning. Keep answers under 120 words unless the user asks for detail.
Use ONLY the retrieved AgriBeacon static-site context for factual answers. Do not use outside knowledge, assumptions, or generic model knowledge to fill gaps.
Prefer translated user-facing labels, descriptions, and FAQ over raw source-code constants when they differ. Do not invent exact prices, specs, warranties, policies, integrations, locations, timelines, or recommendations that are not in the context.
If the retrieved context does not contain the answer, say that the current AgriBeacon documents do not include that information and guide the user to ask about AgriBeacon products, pricing, warranty, services, or contact sales.
For safety-critical farming, chemical, financial, or legal questions, only give context-backed guidance and recommend consulting a qualified local expert.`;

const normalizeMessages = (messages: ChatMessage[] = []) =>
  messages
    .filter((message) => message && (message.role === "user" || message.role === "assistant"))
    .slice(-MAX_MESSAGES)
    .map((message) => ({
      role: message.role,
      content: String(message.content || "").slice(0, MAX_CONTENT_LENGTH),
    }))
    .filter((message) => message.content.trim().length > 0);

const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .trim();

const isGreetingOnly = (message: string) => /^(hi|hello|hey|xin chao|chao|chào|alo|yo|good morning|good afternoon|good evening)[!.?\s]*$/i.test(message.trim());

const isLikelyVietnamese = (message: string) => {
  const normalized = normalizeText(message);
  return /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(message)
    || /\b(xin chao|chao|gia|bao nhieu|bao hanh|cam bien|vuon|nong trai|cay|sau rieng|thue|mua|tu van)\b/i.test(normalized);
};

const getNoKnowledgeAnswer = (message: string) => {
  if (isGreetingOnly(message)) {
    return isLikelyVietnamese(message)
      ? "Chào bạn, mình hỗ trợ các thông tin có trong tài liệu AgriBeacon như sản phẩm, giá, bảo hành, dịch vụ và giải pháp nông nghiệp."
      : "Hello, I can help with information from AgriBeacon documents such as products, pricing, warranty, services, and agricultural solutions.";
  }

  return isLikelyVietnamese(message)
    ? "Mình chưa thấy thông tin này trong tài liệu AgriBeacon hiện có. Bạn có thể hỏi về sản phẩm, giá, bảo hành, dịch vụ hoặc liên hệ đội kinh doanh AgriBeacon để được xác nhận."
    : "I do not see this information in the current AgriBeacon documents. Please ask about AgriBeacon products, pricing, warranty, services, or contact sales for confirmation.";
};

const callModel = async ({
  apiKey,
  model,
  messages,
  maxTokens,
}: {
  apiKey: string;
  model: string;
  messages: Array<{ role: string; content: string }>;
  maxTokens: number;
}) => {
  const response = await fetch(OPENCODE_GO_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.25,
      max_tokens: maxTokens,
    }),
  });

  const data = (await response.json().catch(() => ({}))) as OpenCodeGoResponse;
  return { response, data };
};

// Thử model chính, model nào bị nhà cung cấp từ chối thì thử tiếp danh sách dự phòng (AND-386).
const requestOpenCodeGo = async ({
  apiKey,
  messages,
  maxTokens,
}: {
  apiKey: string;
  messages: Array<{ role: string; content: string }>;
  maxTokens: number;
}) => {
  const models = [process.env.OPENCODE_GO_MODEL || DEFAULT_MODEL, ...fallbackModels()];
  let last = await callModel({ apiKey, model: models[0], messages, maxTokens });
  for (let i = 1; i < models.length && !last.response.ok; i += 1) {
    console.error(
      "chat_api_model_rejected",
      JSON.stringify({ model: models[i - 1], status: last.response.status, message: last.data?.error?.message }),
    );
    last = await callModel({ apiKey, model: models[i], messages, maxTokens });
  }
  return last;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.OPENCODE_GO_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Missing OPENCODE_GO_API_KEY" });
  }

  try {
    const body = (req.body || {}) as ChatRequest;
    const messages = normalizeMessages(body.messages);

    if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
      return res.status(400).json({ error: "A user message is required" });
    }

    const latestUserMessage = messages[messages.length - 1].content;
    const retrievedKnowledge = retrieveAgriBeaconKnowledge(latestUserMessage);

    if (!retrievedKnowledge.context) {
      return res.status(200).json({ answer: getNoKnowledgeAnswer(latestUserMessage) });
    }

    const contextPrompt = `${systemPrompt}\n\nRetrieved AgriBeacon static-site context:\n${retrievedKnowledge.context}`;
    const providerMessages = [{ role: "system", content: contextPrompt }, ...messages];

    let { response, data } = await requestOpenCodeGo({ apiKey, messages: providerMessages, maxTokens: 1600 });

    if (!response.ok) {
      // AND-386: TUYỆT ĐỐI không đẩy nguyên văn lỗi nhà cung cấp ra trang public (lỗi cũ làm
      // khách thấy cả link workspace nội bộ của opencode.ai). Log lại, trả thông báo thân thiện.
      console.error(
        "chat_api_provider_error",
        JSON.stringify({ status: response.status, message: data?.error?.message }),
      );
      return res.status(503).json({ error: PROVIDER_DOWN_MESSAGE });
    }

    let answer = data?.choices?.[0]?.message?.content?.trim();

    if (!answer && data?.choices?.[0]?.message?.reasoning_content) {
      const retry = await requestOpenCodeGo({ apiKey, messages: providerMessages, maxTokens: 2400 });
      response = retry.response;
      data = retry.data;

      if (!response.ok) {
        console.error(
          "chat_api_provider_error",
          JSON.stringify({ status: response.status, message: data?.error?.message }),
        );
        return res.status(503).json({ error: PROVIDER_DOWN_MESSAGE });
      }

      answer = data?.choices?.[0]?.message?.content?.trim();
    }

    if (!answer) {
      console.error("chat_api_empty_answer");
      return res.status(503).json({ error: PROVIDER_DOWN_MESSAGE });
    }

    return res.status(200).json({ answer });
  } catch (error) {
    console.error("chat_api_error", error instanceof Error ? error.message : "unknown");
    return res.status(500).json({ error: "Unable to answer right now" });
  }
}
