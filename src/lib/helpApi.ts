// Client đọc Help Center từ sutagrow-api (endpoint public, không auth).
// Base URL lấy từ VITE_API_URL (build-time). Chỉ trả nội dung đã published.

export const API_BASE =
  (import.meta.env.VITE_API_URL as string | undefined) || "http://localhost:3018/api";

export type HelpLocale = "en" | "vi" | "ja";

export interface HelpTreeArticle {
  id: string;
  slug: string;
  icon: string;
  title: string;
  subtitle?: string;
}

export interface HelpTreeCategory {
  id: string;
  slug: string;
  icon: string;
  title: string;
  description?: string;
  order: number;
  // Danh mục có body nội dung → bấm vào danh mục mở trang nội dung của chính nó.
  hasContent?: boolean;
  children: HelpTreeCategory[];
  articles: HelpTreeArticle[];
}

export interface HelpOutlineItem {
  label: string;
  anchor: string;
  level: number;
}

export interface HelpArticleDetail {
  locale: HelpLocale;
  category: { slug: string; title: string };
  article: {
    slug: string;
    icon: string;
    title: string;
    subtitle: string;
    body: string; // HTML
    outline?: HelpOutlineItem[];
    updatedAt?: string;
  };
}

// Trang nội dung của 1 danh mục (body của chính danh mục).
export interface HelpCategoryDetail {
  locale: HelpLocale;
  category: {
    slug: string;
    icon: string;
    title: string;
    subtitle: string;
    body: string; // HTML
    outline?: HelpOutlineItem[];
    updatedAt?: string;
  };
}

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) {
    const err = new Error(`HTTP ${res.status}`) as Error & { status?: number };
    err.status = res.status;
    throw err;
  }
  const json = await res.json();
  if (!json?.success) throw new Error(json?.message || "Request failed");
  return json.data as T;
}

// GET /public/help-center/tree — cây danh mục + bài viết cho sidebar.
export async function fetchHelpTree(locale: HelpLocale): Promise<HelpTreeCategory[]> {
  const data = await getJson<{ locale: HelpLocale; categories: HelpTreeCategory[] }>(
    `${API_BASE}/public/help-center/tree?locale=${locale}`
  );
  return data.categories || [];
}

// GET /public/help-center/articles/:categorySlug/:articleSlug — 1 bài đầy đủ.
export async function fetchHelpArticle(
  categorySlug: string,
  articleSlug: string,
  locale: HelpLocale
): Promise<HelpArticleDetail> {
  return getJson<HelpArticleDetail>(
    `${API_BASE}/public/help-center/articles/${encodeURIComponent(
      categorySlug
    )}/${encodeURIComponent(articleSlug)}?locale=${locale}`
  );
}

// GET /public/help-center/category/:categorySlug — trang nội dung 1 danh mục.
export async function fetchHelpCategory(
  categorySlug: string,
  locale: HelpLocale
): Promise<HelpCategoryDetail> {
  return getJson<HelpCategoryDetail>(
    `${API_BASE}/public/help-center/category/${encodeURIComponent(categorySlug)}?locale=${locale}`
  );
}

// Bài viết đầu tiên trong cây (để /help redirect vào bài mặc định).
export function firstArticleOf(
  categories: HelpTreeCategory[]
): { categorySlug: string; articleSlug: string } | null {
  const walk = (cats: HelpTreeCategory[]): { categorySlug: string; articleSlug: string } | null => {
    for (const c of cats) {
      if (c.articles.length > 0) return { categorySlug: c.slug, articleSlug: c.articles[0].slug };
      const inChild = walk(c.children || []);
      if (inChild) return inChild;
    }
    return null;
  };
  return walk(categories);
}
