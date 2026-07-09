import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ArrowRight,
  ArrowUpRight,
  MessageCircle,
  Video,
  FileText,
  HelpCircle,
} from "lucide-react";
import type { HelpLocale, HelpTreeArticle, HelpTreeCategory } from "@/lib/helpApi";
import { iconFor } from "./helpIcons";

// Chuỗi UI theo ngôn ngữ.
const HOME_UI: Record<HelpLocale, Record<string, string>> = {
  vi: {
    badge: "Trung tâm trợ giúp",
    title: "Chúng tôi có thể giúp gì cho trang trại của bạn?",
    subtitle:
      "Tìm câu trả lời, hướng dẫn từng bước và mẹo vận hành cho mọi quy mô — từ vườn nhỏ đến hợp tác xã.",
    searchPlaceholder: "Tìm bài viết, ví dụ: 'phun thuốc', 'sinh sản bò'…",
    suggest: "Gợi ý:",
    browse: "Duyệt theo chủ đề",
    viewAll: "Xem tất cả",
    readGuide: "Đọc hướng dẫn",
    noResult: "Không tìm thấy bài viết phù hợp",
    faq: "Câu hỏi phổ biến",
    resources: "Tài nguyên",
    stillTitle: "Vẫn chưa tìm được câu trả lời?",
    stillDesc: "Đội ngũ hỗ trợ của Sutagrow phản hồi trong vòng vài giờ làm việc, mọi ngày trong tuần.",
    contact: "Liên hệ hỗ trợ",
  },
  en: {
    badge: "Help Center",
    title: "How can we help your farm?",
    subtitle: "Find answers, step-by-step guides and operating tips for any scale — from a small orchard to a cooperative.",
    searchPlaceholder: "Search articles, e.g. 'spraying', 'cattle breeding'…",
    suggest: "Try:",
    browse: "Browse by topic",
    viewAll: "View all",
    readGuide: "Read guide",
    noResult: "No matching article",
    faq: "Popular questions",
    resources: "Resources",
    stillTitle: "Still can't find an answer?",
    stillDesc: "The Sutagrow support team replies within a few business hours, every day of the week.",
    contact: "Contact support",
  },
  ja: {
    badge: "ヘルプセンター",
    title: "あなたの農場をどうお手伝いできますか？",
    subtitle: "小さな果樹園から協同組合まで、あらゆる規模に向けた回答・手順ガイド・運用のヒントを見つけましょう。",
    searchPlaceholder: "記事を検索（例：「散布」「牛の繁殖」）…",
    suggest: "例：",
    browse: "トピックから探す",
    viewAll: "すべて見る",
    readGuide: "ガイドを読む",
    noResult: "該当する記事がありません",
    faq: "よくある質問",
    resources: "リソース",
    stillTitle: "答えが見つかりませんか？",
    stillDesc: "Sutagrowのサポートチームが毎日、数営業時間以内に返信します。",
    contact: "サポートに問い合わせる",
  },
};

// Nhận diện danh mục FAQ / Tài nguyên theo slug để render ở dải dưới.
const isFaq = (c: HelpTreeCategory) => /faq|cau-hoi|question/i.test(c.slug);
const isResource = (c: HelpTreeCategory) => /resource|tai-nguyen|download/i.test(c.slug);

// Gộp toàn bộ bài viết (kèm slug danh mục) để tìm kiếm + link.
function flattenArticles(
  cats: HelpTreeCategory[]
): { categorySlug: string; article: HelpTreeArticle }[] {
  const out: { categorySlug: string; article: HelpTreeArticle }[] = [];
  const walk = (list: HelpTreeCategory[]) => {
    for (const c of list) {
      c.articles.forEach((a) => out.push({ categorySlug: c.slug, article: a }));
      if (c.children?.length) walk(c.children);
    }
  };
  walk(cats);
  return out;
}

function firstArticleLink(cat: HelpTreeCategory): string | null {
  // Ưu tiên trang nội dung của chính danh mục nếu có.
  if (cat.hasContent) return `/help/${cat.slug}`;
  if (cat.articles[0]) return `/help/${cat.slug}/${cat.articles[0].slug}`;
  for (const child of cat.children || []) {
    const l = firstArticleLink(child);
    if (l) return l;
  }
  return null;
}

function norm(s: string): string {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d");
}

export default function HelpHome({
  categories,
  locale,
}: {
  categories: HelpTreeCategory[];
  locale: HelpLocale;
}) {
  const ui = HOME_UI[locale] || HOME_UI.vi;
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const allArticles = useMemo(() => flattenArticles(categories), [categories]);

  // Danh mục thường (loại FAQ/Resource ra dải dưới).
  const topics = categories.filter((c) => !isFaq(c) && !isResource(c));
  const faqCat = categories.find(isFaq);
  const resourceCat = categories.find(isResource);

  // Chip gợi ý = vài bài đầu tiên.
  const chips = allArticles.slice(0, 4).map((a) => a.article.title).filter(Boolean);

  const results = useMemo(() => {
    const q = norm(query.trim());
    if (!q) return [];
    return allArticles
      .filter(
        ({ article }) =>
          norm(article.title).includes(q) || norm(article.subtitle || "").includes(q)
      )
      .slice(0, 6);
  }, [query, allArticles]);

  return (
    <div className="space-y-14">
      {/* Hero */}
      <section className="rounded-2xl bg-primary/5 border border-primary/10 px-6 py-12 md:py-14 text-center">
        <p className="text-sm font-semibold text-primary mb-3">{ui.badge}</p>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 max-w-2xl mx-auto">
          {ui.title}
        </h1>
        <p className="text-muted-foreground mb-7 max-w-xl mx-auto">{ui.subtitle}</p>

        {/* Search */}
        <div className="relative max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={ui.searchPlaceholder}
              className="w-full rounded-full border border-border bg-background pl-11 pr-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          {query.trim() && (
            <div className="absolute z-20 mt-2 w-full rounded-xl border border-border bg-background shadow-lg overflow-hidden text-left">
              {results.length === 0 ? (
                <div className="px-4 py-3 text-sm text-muted-foreground">{ui.noResult}</div>
              ) : (
                results.map(({ categorySlug, article }) => (
                  <button
                    key={article.id}
                    onClick={() => navigate(`/help/${categorySlug}/${article.slug}`)}
                    className="flex w-full items-start gap-3 px-4 py-2.5 hover:bg-muted transition-colors"
                  >
                    <FileText className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-foreground truncate">
                        {article.title}
                      </span>
                      {article.subtitle && (
                        <span className="block text-xs text-muted-foreground truncate">
                          {article.subtitle}
                        </span>
                      )}
                    </span>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {/* Suggestion chips */}
        {chips.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5 text-sm">
            <span className="text-muted-foreground">{ui.suggest}</span>
            {chips.map((c, i) => (
              <button
                key={i}
                onClick={() => setQuery(c)}
                className="rounded-full bg-background border border-border px-3 py-1 text-foreground/80 hover:border-primary hover:text-primary transition-colors"
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Browse by topic */}
      {topics.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">{ui.browse}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topics.map((cat) => {
              const Icon = iconFor(cat.icon);
              const link = firstArticleLink(cat);
              const Card = (
                <div className="group h-full rounded-xl border border-border bg-card p-5 transition-all hover:shadow-md hover:-translate-y-0.5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-1">{cat.title}</h3>
                  {cat.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {cat.description}
                    </p>
                  )}
                  {link && (
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                      {ui.readGuide}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  )}
                </div>
              );
              return link ? (
                <Link key={cat.id} to={link} className="block h-full">
                  {Card}
                </Link>
              ) : (
                <div key={cat.id}>{Card}</div>
              );
            })}
          </div>
        </section>
      )}

      {/* Per-topic article sections */}
      {topics
        .filter((c) => c.articles.length > 0)
        .map((cat) => (
          <section key={`sec-${cat.id}`}>
            <h2 className="text-2xl font-bold text-foreground mb-6">{cat.title}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cat.articles.map((a) => {
                const Icon = iconFor(a.icon || cat.icon);
                return (
                  <Link
                    key={a.id}
                    to={`/help/${cat.slug}/${a.slug}`}
                    className="group block rounded-xl border border-border bg-card p-5 transition-all hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{a.title}</h3>
                    {a.subtitle && (
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                        {a.subtitle}
                      </p>
                    )}
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                      {ui.readGuide}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}

      {/* FAQ + Resources band */}
      {(faqCat || resourceCat) && (
        <section className="rounded-2xl bg-primary/5 border border-primary/10 p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {faqCat && (
              <div>
                <h2 className="text-xl font-bold text-foreground mb-4">{faqCat.title}</h2>
                <ul className="space-y-1">
                  {faqCat.articles.map((a) => (
                    <li key={a.id}>
                      <Link
                        to={`/help/${faqCat.slug}/${a.slug}`}
                        className="flex items-start gap-2 rounded-lg px-3 py-2 text-sm text-foreground/80 hover:bg-background hover:text-foreground transition-colors"
                      >
                        <HelpCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                        {a.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {resourceCat && (
              <div>
                <h2 className="text-xl font-bold text-foreground mb-4">{resourceCat.title}</h2>
                <div className="space-y-3">
                  {resourceCat.articles.map((a) => (
                    <Link
                      key={a.id}
                      to={`/help/${resourceCat.slug}/${a.slug}`}
                      className="flex items-start gap-3 rounded-xl border border-border bg-background p-4 hover:shadow-sm transition-all"
                    >
                      <Video className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>
                        <span className="block font-medium text-foreground">{a.title}</span>
                        {a.subtitle && (
                          <span className="block text-sm text-muted-foreground">{a.subtitle}</span>
                        )}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground ml-auto shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Still stuck CTA */}
      <section className="rounded-2xl border border-border p-8 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">{ui.stillTitle}</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">{ui.stillDesc}</p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
        >
          <MessageCircle className="h-4 w-4" />
          {ui.contact}
        </Link>
      </section>
    </div>
  );
}
