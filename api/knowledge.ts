import { AGRIBEACON_KNOWLEDGE } from "./generated/agribeacon-knowledge.js";

const MAX_CONTEXT_LENGTH = 4800;
const MAX_CHUNKS = 5;
const MIN_RELEVANCE_SCORE = 6;

export type AgriBeaconKnowledgeResult = {
  context: string;
  matches: number;
  topScore: number;
};

const STOP_WORDS = new Set([
  "anh",
  "ban",
  "bạn",
  "cho",
  "cua",
  "của",
  "duoc",
  "được",
  "gi",
  "gì",
  "la",
  "là",
  "minh",
  "mình",
  "mot",
  "một",
  "nhu",
  "như",
  "toi",
  "tôi",
  "the",
  "thế",
  "thi",
  "thì",
  "va",
  "và",
  "ve",
  "về",
  "what",
  "with",
  "that",
  "this",
  "from",
  "have",
]);

const DOMAIN_PATTERNS = [
  /agribeacon/,
  /\bagri\b/,
  /\bfarm\b/,
  /nong trai/,
  /nong nghiep/,
  /canh tac/,
  /cay trong/,
  /sau rieng/,
  /durian/,
  /cam bien/,
  /sensor/,
  /\biot\b/,
  /\buav\b/,
  /drone/,
  /robot/,
  /rtk/,
  /ban do/,
  /mapping/,
  /nang suat/,
  /yield/,
  /dat/,
  /soil/,
  /nuoc/,
  /water/,
  /\bgia\b/,
  /bao gia/,
  /pricing/,
  /price/,
  /cost/,
  /bao hanh/,
  /warranty/,
  /dich vu/,
  /service/,
  /demo/,
  /lien he/,
  /contact/,
  // AND-386: câu hỏi về brochure/add-on/gói/plan bị chặn trước khi chấm điểm vì
  // không khớp domain pattern nào, dù knowledge base có nội dung liên quan.
  /brochure/,
  /add.?on/,
  /\bplan\b/,
  /goi (dich vu|cuoc|phan mem)/,
  /package/,
  /catalog/,
  /tai lieu/,
  /hardware/,
  /phan cung/,
];

const SYNONYMS: Record<string, string[]> = {
  "ai": ["assistant", "analytics", "thần nông"],
  "bao": ["quote", "contact", "pricing", "bao gia"],
  "baohanh": ["warranty", "bảo hành", "faq"],
  "banggia": ["price", "pricing", "cost", "bảng giá", "₫"],
  "cam": ["sensor", "cảm biến"],
  "dat": ["soil", "đất", "soilSensor"],
  "drone": ["uav", "bay", "aerial"],
  "gia": ["price", "pricing", "cost", "₫", "vnd", "bảng giá"],
  "nuoc": ["water", "nước", "waterSensor"],
  "robot": ["spraying", "phun thuốc", "rental", "buyPrice", "rentPrice"],
  "rtk": ["centimeter", "base station", "rover"],
  "saurieng": ["durian", "sầu riêng"],
  "thue": ["rent", "rental", "rentPrice", "thuê"],
  "uav": ["drone", "aerial", "bay"],
};

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s₫]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const tokenize = (query: string) => {
  const normalized = normalize(query);
  const tokens = normalized
    .split(" ")
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));

  const compactTokens = ["sau rieng", "bao hanh", "cam bien", "bang gia", "bao gia", "phun thuoc"]
    .filter((phrase) => normalized.includes(phrase))
    .map((phrase) => phrase.replace(/\s/g, ""));

  const expanded = [...tokens, ...compactTokens];
  for (const token of [...expanded]) {
    const synonyms = SYNONYMS[token];
    if (synonyms) expanded.push(...synonyms.map(normalize));
  }

  return [...new Set(expanded)].filter((token) => token.length > 1);
};

const hasAny = (value: string, patterns: RegExp[]) => patterns.some((pattern) => pattern.test(value));

export const retrieveAgriBeaconKnowledge = (query: string): AgriBeaconKnowledgeResult => {
  const normalizedQuery = normalize(query);
  const tokens = tokenize(query);

  if (tokens.length === 0) return { context: "", matches: 0, topScore: 0 };
  if (!hasAny(normalizedQuery, DOMAIN_PATTERNS)) return { context: "", matches: 0, topScore: 0 };

  const isPricingQuery = hasAny(normalizedQuery, [/\bgia\b/, /bao gia/, /bang gia/, /bao nhieu/, /price/, /pricing/, /cost/, /\bmua\b/, /\bthue\b/, /rent/, /buy/, /₫/]);
  const isWarrantyQuery = hasAny(normalizedQuery, [/bao hanh/, /warranty/, /bao tri/, /maintenance/]);
  const isRobotQuery = hasAny(normalizedQuery, [/robot/, /tas/, /phun thuoc/]);
  const isAiQuery = hasAny(normalizedQuery, [/\bai\b/, /assistant/, /than nong/, /thần nông/]);

  const scored = AGRIBEACON_KNOWLEDGE.map((chunk) => {
    const normalizedTitle = normalize(chunk.title);
    const normalizedSource = normalize(chunk.source);
    const normalizedText = normalize(chunk.text);
    const haystack = `${normalizedTitle}\n${normalizedSource}\n${normalizedText}`;
    let score = 0;

    for (const token of tokens) {
      if (haystack.includes(token)) score += token.length > 4 ? 4 : 2;
      if (normalizedTitle.includes(token)) score += 6;
      if (normalizedSource.includes(token)) score += 4;
    }

    if (normalizedQuery && haystack.includes(normalizedQuery.slice(0, 48))) score += 12;

    if (isPricingQuery && hasAny(haystack, [/pricingcalculator/, /pages price/, /price /, /buyprice/, /rentprice/, /addons/, /hardware/, /plans/, /₫/])) score += 28;
    if (isPricingQuery && isRobotQuery && hasAny(haystack, [/robot.*buyprice/, /robot.*rentprice/, /hardware robot/])) score += 35;
    if (isPricingQuery && isAiQuery && hasAny(haystack, [/ai assistant/, /aiassistant/, /ai assistant.*130000/, /130000/])) score += 32;

    if (isWarrantyQuery && hasAny(haystack, [/warranty/, /bao hanh/, /faq/])) score += 36;
    if (isWarrantyQuery && hasAny(haystack, [/12 thang/, /12 month/, /manufacturer warranty/, /bao tri/, /maintenance/])) score += 30;

    return { chunk, score };
  })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_CHUNKS);

  const topScore = scored[0]?.score || 0;
  if (topScore < MIN_RELEVANCE_SCORE) {
    return { context: "", matches: 0, topScore };
  }

  let context = "";
  for (const item of scored) {
    const next = `[${item.chunk.title} | ${item.chunk.source}]\n${item.chunk.text}`;
    if (context.length + next.length > MAX_CONTEXT_LENGTH) break;
    context += `${context ? "\n\n" : ""}${next}`;
  }

  return { context, matches: scored.length, topScore };
};
