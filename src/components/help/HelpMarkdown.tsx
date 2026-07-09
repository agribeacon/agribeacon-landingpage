import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CheckCircle2, Info, AlertTriangle } from "lucide-react";

/**
 * HelpMarkdown — render nội dung bài trợ giúp (Markdown + directive tự định nghĩa).
 *
 * Cú pháp directive (admin soạn):
 *   :::step{title="Tạo loại cây"}
 *   Nội dung markdown của bước...
 *   :::
 *
 *   :::callout{type="success"}   (success | info | warning)
 *   Ghi chú...
 *   :::
 *
 * Mỗi :::step render thành khối đánh số (khớp ảnh thiết kế) và là 1 mục trong
 * mục lục ("NỘI DUNG"). TOC được sinh từ các step + heading ## trong markdown.
 */

export interface TocItem {
  id: string;
  text: string;
  level: number; // 1 = step / h2, 2 = h3
}

type Block =
  | { kind: "md"; content: string }
  | { kind: "step"; n: number; id: string; title: string; content: string }
  | { kind: "callout"; variant: "success" | "info" | "warning"; content: string };

// Bỏ dấu tiếng Việt + tạo id an toàn cho anchor.
function slugifyId(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseAttrs(raw: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  const re = /(\w+)="([^"]*)"/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(raw))) attrs[m[1]] = m[2];
  return attrs;
}

/**
 * parseHelpBody — tách body thành blocks + sinh danh sách TOC.
 */
export function parseHelpBody(body: string): { blocks: Block[]; toc: TocItem[] } {
  const lines = (body || "").replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  const toc: TocItem[] = [];
  const usedIds = new Set<string>();

  const uniqueId = (base: string) => {
    let id = base || "muc";
    let i = 2;
    while (usedIds.has(id)) id = `${base}-${i++}`;
    usedIds.add(id);
    return id;
  };

  let mdBuffer: string[] = [];
  let stepCount = 0;

  const flushMd = () => {
    if (mdBuffer.length) {
      const content = mdBuffer.join("\n").trim();
      if (content) {
        // Sinh TOC từ heading ## / ### trong đoạn markdown.
        for (const line of content.split("\n")) {
          const h = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
          if (h) {
            const level = h[1].length === 2 ? 1 : 2;
            const text = h[2].replace(/[#*`]/g, "").trim();
            toc.push({ id: uniqueId(slugifyId(text)), text, level });
          }
        }
        blocks.push({ kind: "md", content });
      }
      mdBuffer = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const open = /^:::(step|callout)\s*(\{[^}]*\})?\s*$/.exec(lines[i]);
    if (open) {
      flushMd();
      const kind = open[1];
      const attrs = parseAttrs(open[2] || "");
      // Gom tới dòng đóng ':::'
      const inner: string[] = [];
      i++;
      while (i < lines.length && !/^:::\s*$/.test(lines[i])) {
        inner.push(lines[i]);
        i++;
      }
      const content = inner.join("\n").trim();
      if (kind === "step") {
        stepCount++;
        const title = attrs.title || `Bước ${stepCount}`;
        const id = uniqueId(slugifyId(title));
        toc.push({ id, text: title, level: 1 });
        blocks.push({ kind: "step", n: stepCount, id, title, content });
      } else {
        const t = (attrs.type || "info").toLowerCase();
        const variant = t === "success" || t === "warning" ? t : "info";
        blocks.push({ kind: "callout", variant, content });
      }
      continue;
    }
    mdBuffer.push(lines[i]);
  }
  flushMd();

  return { blocks, toc };
}

const proseClass =
  "prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-foreground " +
  "prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground " +
  "prose-a:text-primary prose-strong:text-foreground prose-img:rounded-lg";

function Markdown({ children }: { children: string }) {
  return (
    <div className={proseClass}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}

const calloutStyles = {
  success: { box: "border-green-200 bg-green-50/60", icon: CheckCircle2, iconColor: "text-green-600" },
  info: { box: "border-blue-200 bg-blue-50/60", icon: Info, iconColor: "text-blue-600" },
  warning: { box: "border-amber-200 bg-amber-50/60", icon: AlertTriangle, iconColor: "text-amber-600" },
} as const;

export function HelpArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, idx) => {
        if (block.kind === "step") {
          return (
            <section
              key={idx}
              id={block.id}
              className="scroll-mt-32 rounded-xl border border-border bg-card p-6 first:border-l-4 first:border-l-primary"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {block.n}
                </span>
                <h2 className="text-xl font-bold text-foreground">{block.title}</h2>
              </div>
              {block.content && (
                <div className="pl-11">
                  <Markdown>{block.content}</Markdown>
                </div>
              )}
            </section>
          );
        }
        if (block.kind === "callout") {
          const style = calloutStyles[block.variant];
          const Icon = style.icon;
          return (
            <div key={idx} className={`flex gap-3 rounded-lg border p-4 ${style.box}`}>
              <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${style.iconColor}`} />
              <div className="flex-1 [&_p]:m-0 text-sm">
                <Markdown>{block.content}</Markdown>
              </div>
            </div>
          );
        }
        // Đoạn markdown thường — gắn id cho heading để TOC nhảy tới đúng chỗ.
        return <MarkdownWithHeadingIds key={idx} content={block.content} />;
      })}
    </div>
  );
}

// Render markdown và gán id cho h2/h3 (khớp id đã sinh trong TOC).
function MarkdownWithHeadingIds({ content }: { content: string }) {
  const seen = new Set<string>();
  const makeId = (text: string) => {
    const base = slugifyId(text);
    let id = base || "muc";
    let i = 2;
    while (seen.has(id)) id = `${base}-${i++}`;
    seen.add(id);
    return id;
  };
  return (
    <div className={proseClass}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2 id={makeId(String(children))} className="scroll-mt-32">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 id={makeId(String(children))} className="scroll-mt-32">
              {children}
            </h3>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
