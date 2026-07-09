// Sanitizer HTML dựa trên DOMParser (không cần thư viện). Dùng cho nội dung
// Help Center do super-admin soạn (WYSIWYG). Chỉ giữ tag/thuộc tính an toàn,
// loại <script>/<style>/<iframe>, mọi handler on*, và URL javascript:.

const ALLOWED_TAGS = new Set([
  "p", "br", "strong", "b", "em", "i", "u", "s", "a", "ul", "ol", "li",
  "h1", "h2", "h3", "h4", "blockquote", "code", "pre", "img", "video",
  "span", "div", "hr", "figure", "figcaption",
  "table", "thead", "tbody", "tr", "td", "th",
]);
const ALLOWED_ATTR = new Set([
  "href", "src", "alt", "title", "id", "class", "style",
  "controls", "colspan", "rowspan", "target", "rel", "width", "height",
]);

export function sanitizeHtml(html: string): string {
  if (typeof window === "undefined" || !html) return "";
  const doc = new DOMParser().parseFromString(html, "text/html");

  const walk = (node: Element) => {
    Array.from(node.children).forEach((child) => {
      const tag = child.tagName.toLowerCase();
      if (!ALLOWED_TAGS.has(tag)) {
        child.remove();
        return;
      }
      Array.from(child.attributes).forEach((attr) => {
        const name = attr.name.toLowerCase();
        if (name.startsWith("on") || !ALLOWED_ATTR.has(name)) {
          child.removeAttribute(attr.name);
          return;
        }
        if ((name === "href" || name === "src") && /^\s*javascript:/i.test(attr.value)) {
          child.removeAttribute(attr.name);
        }
        if (name === "style" && /expression|javascript:|url\s*\(\s*['"]?\s*javascript/i.test(attr.value)) {
          child.removeAttribute(attr.name);
        }
      });
      if (tag === "a") {
        child.setAttribute("rel", "noopener noreferrer");
        if (child.getAttribute("target") === "_blank") child.setAttribute("rel", "noopener noreferrer");
      }
      walk(child);
    });
  };
  walk(doc.body);
  return doc.body.innerHTML;
}

// Sinh mục lục từ HTML (fallback khi article không có outline lưu sẵn).
export interface HtmlTocItem {
  id: string;
  text: string;
  level: number; // 1 = h2, 2 = h3
}

function slugifyId(text: string): string {
  return (text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Tách HTML thành các "section" theo H2: mỗi section = 1 H2 + nội dung của nó
// (tới H2 kế). Nội dung trước H2 đầu tiên = intro. Dùng để highlight section
// đang xem khi scroll (giống thiết kế landing).
export interface HelpSection {
  id: string;
  num: number;
  headingInner: string;
  contentHtml: string;
}
export interface ParsedDoc {
  intro: string;
  sections: HelpSection[];
}

export function parseSections(html: string): ParsedDoc {
  if (typeof window === "undefined" || !html) return { intro: "", sections: [] };
  const doc = new DOMParser().parseFromString(html, "text/html");
  const seen = new Set<string>();
  const uid = (base: string) => {
    let id = base || "muc";
    let i = 2;
    while (seen.has(id)) id = `${base}-${i++}`;
    seen.add(id);
    return id;
  };

  let intro = "";
  const sections: HelpSection[] = [];
  let current: HelpSection | null = null;
  let num = 0;

  Array.from(doc.body.childNodes).forEach((node) => {
    if (node.nodeType === 1 && (node as Element).tagName === "H2") {
      const el = node as HTMLElement;
      num += 1;
      const id = uid(el.id || slugifyId(el.textContent || ""));
      current = { id, num, headingInner: el.innerHTML, contentHtml: "" };
      sections.push(current);
    } else {
      const frag = node.nodeType === 1 ? (node as Element).outerHTML : node.textContent || "";
      if (current) current.contentHtml += frag;
      else intro += frag;
    }
  });

  return { intro, sections };
}

export function tocFromHtml(html: string): HtmlTocItem[] {
  if (typeof window === "undefined" || !html) return [];
  const doc = new DOMParser().parseFromString(html, "text/html");
  const items: HtmlTocItem[] = [];
  doc.querySelectorAll("h2, h3").forEach((h) => {
    const text = h.textContent || "";
    items.push({
      id: (h as HTMLElement).id || slugifyId(text),
      text,
      level: h.tagName === "H3" ? 2 : 1,
    });
  });
  return items;
}
