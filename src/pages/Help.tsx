import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, ChevronDown, LifeBuoy, Loader2, MessageCircle } from "lucide-react";
import { useSimpleLanguage } from "@/contexts/SimpleLanguageContext";
import {
  fetchHelpTree,
  fetchHelpArticle,
  fetchHelpCategory,
  type HelpTreeCategory,
  type HelpLocale,
} from "@/lib/helpApi";
import { sanitizeHtml, tocFromHtml, parseSections, type HelpSection } from "@/lib/sanitizeHtml";
import HelpHome from "@/components/help/HelpHome";
import { iconFor } from "@/components/help/helpIcons";

interface TocItem {
  id: string;
  text: string;
  level: number; // 1 = h2, 2 = h3
}

const UI: Record<HelpLocale, Record<string, string>> = {
  vi: { catalog: "DANH MỤC", onThisPage: "NỘI DUNG", help: "Trợ giúp", empty: "Nội dung trợ giúp đang được cập nhật.", notFound: "Không tìm thấy bài viết.", support: "Cần thêm trợ giúp?", contact: "Liên hệ hỗ trợ" },
  en: { catalog: "CATALOG", onThisPage: "ON THIS PAGE", help: "Help", empty: "Help content is being updated.", notFound: "Article not found.", support: "Need more help?", contact: "Contact support" },
  ja: { catalog: "カテゴリ", onThisPage: "目次", help: "ヘルプ", empty: "ヘルプコンテンツを更新中です。", notFound: "記事が見つかりません。", support: "さらにサポートが必要ですか？", contact: "サポートに問い合わせる" },
};

function useActiveHeading(ids: string[]): string {
  const [active, setActive] = useState(ids[0] || "");
  const key = ids.join(",");
  useEffect(() => {
    if (!ids.length) {
      setActive("");
      return;
    }
    let timer: ReturnType<typeof setTimeout> | undefined;
    const compute = () => {
      const line = 120; // ngưỡng tính từ đỉnh viewport (dưới header help ~64px)
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= line) current = id;
        else break;
      }
      setActive((prev) => (prev === current ? prev : current));
    };
    const onScroll = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(compute, 180);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (timer) clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return active;
}

// ------- Sidebar (cây danh mục + bài viết, đóng/mở được) -------
// Một danh mục "chứa" bài đang đọc nếu chính nó hoặc danh mục con của nó
// có article trùng slug — dùng để mở sẵn nhánh tương ứng.
const key = (c?: HelpTreeCategory) => c?.id ?? "";

function categoryContainsActive(cat: HelpTreeCategory, activeCategory?: string): boolean {
  if (cat.slug === activeCategory) return true;
  return (cat.children || []).some((c) => categoryContainsActive(c, activeCategory));
}

function Sidebar({
  categories,
  activeCategory,
  activeArticle,
}: {
  categories: HelpTreeCategory[];
  activeCategory?: string;
  activeArticle?: string;
}) {
  // Mặc định mở toàn bộ nhánh tổ tiên chứa bài đang đọc (để bài ở cấp sâu vẫn
  // hiện ra); nếu chưa chọn bài nào thì chỉ mở danh mục gốc đầu tiên.
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const defaultOpenKeys = useMemo(() => {
    const set = new Set<string>();
    if (activeCategory) {
      // Mọi danh mục "chứa" bài đang đọc chính là tổ tiên trên đường dẫn → mở hết.
      const walk = (cat: HelpTreeCategory) => {
        if (categoryContainsActive(cat, activeCategory)) set.add(key(cat));
        (cat.children || []).forEach(walk);
      };
      categories.forEach(walk);
    } else if (categories[0]) {
      set.add(key(categories[0]));
    }
    return set;
  }, [categories, activeCategory]);
  const isOpen = (cat: HelpTreeCategory) => open[key(cat)] ?? defaultOpenKeys.has(key(cat));
  const toggle = (cat: HelpTreeCategory) =>
    setOpen((prev) => ({ ...prev, [key(cat)]: !(prev[key(cat)] ?? defaultOpenKeys.has(key(cat))) }));

  const renderCategory = (cat: HelpTreeCategory, depth: number) => {
    const expanded = isOpen(cat);
    const Icon = iconFor(cat.icon);
    // Danh mục có nội dung (body) → tên là link mở trang nội dung của chính nó
    // tại /help/:slug; mũi tên vẫn để bung/thu mục con. Đang xem đúng danh mục
    // đó (không kèm articleSlug) thì highlight.
    const hasContent = !!cat.hasContent;
    const contentActive = hasContent && activeCategory === cat.slug && !activeArticle;
    const headBase =
      depth === 0
        ? "text-sm font-bold"
        : "text-xs font-semibold uppercase tracking-wide mt-3";
    const headColor = contentActive
      ? "text-primary"
      : depth === 0
        ? "text-foreground"
        : "text-muted-foreground";
    return (
      <div key={cat.id} className={depth === 0 ? "mb-2" : "mt-2"}>
        <div
          className={`flex items-center gap-2 rounded-md py-1.5 pr-1 transition-colors ${headBase} ${headColor} ${
            contentActive ? "bg-primary/10" : ""
          }`}
        >
          {depth === 0 && <Icon className="h-4 w-4 flex-none text-primary" />}
          {hasContent ? (
            <Link
              to={`/help/${cat.slug}`}
              className="flex-1 text-left hover:text-foreground"
            >
              {cat.title}
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => toggle(cat)}
              className="flex-1 text-left hover:text-foreground"
            >
              {cat.title}
            </button>
          )}
          <button
            type="button"
            onClick={() => toggle(cat)}
            aria-expanded={expanded}
            aria-label={expanded ? "Thu gọn" : "Mở rộng"}
            className="flex-none rounded p-0.5 text-muted-foreground hover:text-foreground"
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${expanded ? "" : "-rotate-90"}`}
            />
          </button>
        </div>
        {expanded && (
          <ul className="space-y-0.5 border-l border-border ml-2 pl-3">
            {cat.articles.map((a) => {
              const isActive = activeCategory === cat.slug && activeArticle === a.slug;
              return (
                <li key={a.id}>
                  <Link
                    to={`/help/${cat.slug}/${a.slug}`}
                    className={`block rounded-md px-3 py-1.5 text-sm transition-colors ${
                      isActive
                        ? "bg-primary/10 font-medium text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {a.title}
                  </Link>
                </li>
              );
            })}
            {cat.children?.map((child) => (
              <li key={child.id}>{renderCategory(child, depth + 1)}</li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return <nav>{categories.map((c) => renderCategory(c, 0))}</nav>;
}

// ------- Nội dung bài: các section highlight theo scroll -------
function HelpDoc({
  intro,
  sections,
  active,
}: {
  intro: string;
  sections: HelpSection[];
  active: string;
}) {
  const proseClass =
    "help-prose-content prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-primary prose-strong:text-foreground [&_img]:rounded-xl [&_video]:rounded-xl [&_video]:w-full";
  return (
    <div className="help-body">
      {intro && <div className={proseClass} dangerouslySetInnerHTML={{ __html: intro }} />}
      {sections.map((s) => (
        <section
          key={s.id}
          id={s.id}
          className={`help-section${active === s.id ? " is-active" : ""}`}
        >
          <div className="help-section-head">
            <span className="help-num">{s.num}</span>
            <h2 className="help-heading" dangerouslySetInnerHTML={{ __html: s.headingInner }} />
          </div>
          {s.contentHtml && (
            <div className={proseClass} dangerouslySetInnerHTML={{ __html: s.contentHtml }} />
          )}
        </section>
      ))}
    </div>
  );
}

// ------- Mục lục bên phải -------
function TableOfContents({
  toc,
  ui,
  active,
}: {
  toc: TocItem[];
  ui: Record<string, string>;
  active: string;
}) {
  if (toc.length === 0) return null;
  return (
    <div className="sticky top-24">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
        {ui.onThisPage}
      </p>
      <ul className="space-y-1.5 border-l border-border">
        {toc.map((t) => (
          <li key={t.id} style={{ paddingLeft: t.level === 2 ? 24 : 12 }}>
            <a
              href={`#${t.id}`}
              className={`block text-sm transition-colors -ml-px border-l-2 pl-3 ${
                active === t.id
                  ? "border-primary font-medium text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

const Help = () => {
  const { language } = useSimpleLanguage();
  const locale = language as HelpLocale;
  const ui = UI[locale] || UI.vi;
  const { categorySlug, articleSlug } = useParams();

  const treeQuery = useQuery({
    queryKey: ["help-tree", locale],
    queryFn: () => fetchHelpTree(locale),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const categories = treeQuery.data || [];
  const isHome = !categorySlug;
  const isCategoryPage = !!categorySlug && !articleSlug;

  const articleQuery = useQuery({
    queryKey: ["help-article", categorySlug, articleSlug, locale],
    queryFn: () => fetchHelpArticle(categorySlug!, articleSlug!, locale),
    enabled: !!categorySlug && !!articleSlug,
    retry: 1,
  });

  const categoryQuery = useQuery({
    queryKey: ["help-category", categorySlug, locale],
    queryFn: () => fetchHelpCategory(categorySlug!, locale),
    enabled: isCategoryPage,
    retry: 1,
  });

  // Nội dung hiển thị: trang nội dung danh mục HOẶC bài viết — cùng shape
  // {title, subtitle, body, outline}.
  const contentQuery = isCategoryPage ? categoryQuery : articleQuery;
  const doc = isCategoryPage ? categoryQuery.data?.category : articleQuery.data?.article;
  const html = useMemo(() => sanitizeHtml(doc?.body || ""), [doc?.body]);
  const { intro, sections } = useMemo(() => parseSections(html), [html]);
  const toc = useMemo<TocItem[]>(() => {
    // Ưu tiên section (khớp với id đang render); fallback outline rồi heading.
    if (sections.length > 0) {
      return sections.map((s) => ({ id: s.id, text: s.headingInner.replace(/<[^>]+>/g, ""), level: 1 }));
    }
    const ol = doc?.outline;
    if (ol && ol.length > 0) {
      return ol.filter((o) => o.anchor).map((o) => ({ id: o.anchor, text: o.label, level: o.level === 3 ? 2 : 1 }));
    }
    return tocFromHtml(html);
  }, [sections, doc?.outline, html]);
  const activeSection = useActiveHeading(sections.map((s) => s.id));

  const loading = treeQuery.isLoading || (!!categorySlug && contentQuery.isLoading);
  const hasContent = categories.length > 0;

  // ---------- HUB (/help) ----------
  if (isHome) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto max-w-7xl px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] gap-8 lg:gap-12">
            {/* Left: catalog */}
            <aside className="hidden lg:block">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-4">
                {ui.catalog}
              </p>
              {treeQuery.isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              ) : (
                <Sidebar categories={categories} />
              )}
            </aside>

            {/* Main: hub */}
            <main className="min-w-0">
              {treeQuery.isLoading ? (
                <div className="flex items-center gap-2 text-muted-foreground py-20">
                  <Loader2 className="h-5 w-5 animate-spin" /> {ui.help}…
                </div>
              ) : treeQuery.isError || !hasContent ? (
                <EmptyState ui={ui} />
              ) : (
                <HelpHome categories={categories} locale={locale} />
              )}
            </main>
          </div>
        </div>
      </div>
    );
  }

  // ---------- ARTICLE (/help/:cat/:art) ----------
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)_200px] gap-8 lg:gap-10">
          {/* Left: catalog */}
          <aside className="hidden lg:block">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-4">
              {ui.catalog}
            </p>
            {treeQuery.isLoading ? (
              <div className="text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            ) : (
              <Sidebar
                categories={categories}
                activeCategory={categorySlug}
                activeArticle={articleSlug}
              />
            )}
          </aside>

          {/* Center: content (bài viết hoặc trang nội dung danh mục) */}
          <main className="min-w-0">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6 flex-wrap">
              <Link to="/help" className="hover:text-foreground">
                {ui.help}
              </Link>
              {doc && (
                <>
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-foreground">{doc.title}</span>
                </>
              )}
            </nav>

            {loading ? (
              <div className="flex items-center gap-2 text-muted-foreground py-20">
                <Loader2 className="h-5 w-5 animate-spin" /> {ui.help}…
              </div>
            ) : treeQuery.isError || (categories.length === 0 && !doc) ? (
              <EmptyState ui={ui} />
            ) : contentQuery.isError ? (
              <div className="py-20 text-muted-foreground">{ui.notFound}</div>
            ) : doc ? (
              <article>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                  {doc.title}
                </h1>
                {doc.subtitle && (
                  <p className="text-lg text-muted-foreground mb-8">{doc.subtitle}</p>
                )}
                <HelpDoc intro={intro} sections={sections} active={activeSection} />

                {/* Support CTA */}
                <div className="mt-16 rounded-xl border border-border bg-muted/30 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <LifeBuoy className="h-6 w-6 text-primary" />
                    <span className="font-medium text-foreground">{ui.support}</span>
                  </div>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {ui.contact}
                  </Link>
                </div>
              </article>
            ) : (
              <EmptyState ui={ui} />
            )}
          </main>

          {/* Right: TOC */}
          <aside className="hidden lg:block">
            {doc && <TableOfContents toc={toc} ui={ui} active={activeSection} />}
          </aside>
        </div>
      </div>
    </div>
  );
};

function EmptyState({ ui }: { ui: Record<string, string> }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <LifeBuoy className="h-10 w-10 text-muted-foreground/40 mb-4" />
      <p className="text-muted-foreground mb-6">{ui.empty}</p>
      <Link
        to="/contact"
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
      >
        <MessageCircle className="h-4 w-4" />
        {ui.contact}
      </Link>
    </div>
  );
}

export default Help;
