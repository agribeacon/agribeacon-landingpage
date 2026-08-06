import { useMemo, useState, type ReactElement } from "react";
import { Link } from "react-router-dom";
import { useSimpleLanguage } from "@/contexts/SimpleLanguageContext";
import { useCart } from "@/contexts/CartContext";
import { Check, X, Plane, Droplets, Radio, Bot, BarChart3, TreePine, Sprout, MapPinned, Building2, Crown, ShoppingCart, Info, Loader2, Star, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ProductDetailModal, type ProductDetailData } from "@/components/ProductDetailModal";
import { useToast } from "@/hooks/use-toast";
import { usePricingCatalog, type PricingItem } from "@/lib/pricingApi";

const formatPrice = (price: number) => new Intl.NumberFormat("vi-VN").format(price);

type BillingKey = "oneYear" | "twoYears";

const ICON_MAP: Record<string, LucideIcon> = {
  Plane, Droplets, Radio, Bot, BarChart3, TreePine, Sprout, MapPinned, Building2, Crown,
};
const iconFor = (name?: string): LucideIcon => (name && ICON_MAP[name]) || Sprout;

interface PlanView {
  key: string;
  name: string;
  subtitle: string;
  description: string;
  features: string[];
  excludedFeatures: string[];
  popular: boolean;
  priceType: "free" | "contact" | "paid";
  monthly: number | null; // giá bán (đã áp KM nếu có), theo kỳ
  originalMonthly: number | null; // giá gốc gạch ngang khi có KM
  promoLabel: string;
  ctaLabel?: string;
}
interface AddonView {
  key: string;
  icon: LucideIcon;
  name: string;
  description: string;
  priceType: string; // 'free' | 'contact' | 'paid'
  priceValue: number | null; // giá bán (đã áp KM); null khi Liên hệ
  priceDisplay: string;
  priceSuffix: string; // hậu tố đơn vị, vd "/ site" (để render "199.000₫ / site / tháng")
  subtitle: string;
  originalDisplay: string | null; // giá gốc gạch ngang khi có KM
  promoLabel: string;
  group: "capacity" | "ai" | null; // nhóm hiển thị trên trang giá
  popular: boolean; // badge "Phổ biến" (dùng cho thẻ AI)
  isService?: boolean; // item kind='service' (module Dịch vụ) → CTA luôn là Liên hệ
  detail?: ProductDetailData;
}
interface HwView {
  key: string;
  icon: LucideIcon;
  name: string;
  description: string;
  specs: string[];
  priceType: string; // 'free' | 'contact' | 'paid'
  buyPrice: number | null; // giá bán (đã áp KM)
  buyOriginal: number | null;
  rentValue: number | null; // giá bán (đã áp KM)
  rentOriginal: number | null;
  promoLabel: string;
  detail?: ProductDetailData;
}

// KM chỉ hợp lệ khi có giá gốc và giá KM > 0 và thấp hơn giá gốc. Ô "Giá KM" bị nhập 0
// thay vì bỏ trống là dữ liệu rác, không phải "khuyến mãi còn 0đ" — nếu coi là KM thì
// trang giá hiện 0₫ trong khi CMS/báo giá vẫn theo giá gốc. (KM hết hạn đã bị BE lọc
// ở /public/pricing nên ở đây không cần kiểm tra promoEndsAt.)
const isValidPromo = (original: number | null, promo: number | null): boolean =>
  promo != null && promo > 0 && original != null && promo < original;

const promoBadge = (label: string, original: number | null, promo: number | null, percent?: number | null): string => {
  if (label) return label;
  if (percent != null) return `-${percent}%`;
  if (original && promo && original > promo) return `-${Math.round((1 - promo / original) * 100)}%`;
  return "";
};
type ComparisonRow = { category: string } | { feature: string; values: (boolean | string)[] };

// Thứ tự & nhãn các nhóm add-on trên trang giá (bám bố cục ảnh mẫu). 'other' gom
// các add-on chưa phân nhóm ở BE. Tách khỏi i18n lớn để gọn (theo pattern sẵn có).
const ADDON_GROUP_ORDER = ["capacity", "ai", "service", "other"] as const;
type AddonGroupId = (typeof ADDON_GROUP_ORDER)[number];
const ADDON_GROUP_TEXT: Record<string, Record<AddonGroupId, { title: string; sub: string }>> = {
  vi: {
    capacity: { title: "Capacity", sub: "Mở rộng quy mô và số lượng người dùng." },
    ai: { title: "AI Credit", sub: "Gói trợ lý AI Tiểu Thần Nông theo nhu cầu." },
    service: { title: "Dịch vụ", sub: "Số hoá bản đồ, khảo sát & lắp đặt — theo báo giá thực tế." },
    other: { title: "Tiện ích khác", sub: "" },
  },
  en: {
    capacity: { title: "Capacity", sub: "Scale up sites and number of users." },
    ai: { title: "AI Credit", sub: "AI assistant packs on demand." },
    service: { title: "Services", sub: "Map digitization, survey & setup — by quote." },
    other: { title: "More add-ons", sub: "" },
  },
  ja: {
    capacity: { title: "Capacity", sub: "サイト数とユーザー数を拡張します。" },
    ai: { title: "AI Credit", sub: "必要に応じたAIアシスタントパック。" },
    service: { title: "サービス", sub: "地図デジタル化・調査・設置（見積もり）。" },
    other: { title: "その他のアドオン", sub: "" },
  },
};

// Nhãn UI khối add-on (bám ảnh mẫu). Tách khỏi i18n lớn để gọn.
interface AddonUi {
  add: string; added: string; select: string; selected: string; popular: string;
  byQuote: string; contactQuote: string; perMonth: string;
  subtotal: string; chosen: string; estTotal: string; exVat: string; continue: string;
}
const ADDON_UI: Record<string, AddonUi> = {
  vi: {
    add: "Thêm", added: "Đã thêm", select: "Chọn gói", selected: "Đã chọn", popular: "Phổ biến",
    byQuote: "Theo báo giá thực tế", contactQuote: "Liên hệ báo giá", perMonth: "/ tháng",
    subtotal: "Tạm tính", chosen: "add-on đã chọn", estTotal: "Tổng cộng (ước tính)",
    exVat: "Chưa bao gồm VAT", continue: "Tiếp tục",
  },
  en: {
    add: "Add", added: "Added", select: "Select", selected: "Selected", popular: "Popular",
    byQuote: "By actual quote", contactQuote: "Request a quote", perMonth: "/ month",
    subtotal: "Subtotal", chosen: "add-ons selected", estTotal: "Estimated total",
    exVat: "VAT excluded", continue: "Continue",
  },
  ja: {
    add: "追加", added: "追加済み", select: "選択", selected: "選択済み", popular: "人気",
    byQuote: "実際の見積もり", contactQuote: "見積もり依頼", perMonth: "/ 月",
    subtotal: "小計", chosen: "個のアドオン選択", estTotal: "合計（概算）",
    exVat: "税抜", continue: "続ける",
  },
};

// Bọc nút CTA bằng đường dẫn: URL ngoài (http/https) → thẻ <a> tab mới; path nội bộ → <Link>.
// Không có url → trả nguyên nút (không điều hướng).
const CtaLink = ({ url, children }: { url?: string; children: ReactElement }): ReactElement => {
  if (!url) return children;
  if (/^https?:\/\//i.test(url)) return <a href={url} target="_blank" rel="noopener noreferrer">{children}</a>;
  return <Link to={url}>{children}</Link>;
};

const Price = () => {
  const [billing, setBilling] = useState<BillingKey>("oneYear");
  const [detailModal, setDetailModal] = useState<{ open: boolean; title: string; type: string; key: string; price: number; isRental: boolean; contact: boolean; detail?: ProductDetailData }>({
    open: false, title: "", type: "", key: "", price: 0, isRental: false, contact: false, detail: undefined,
  });
  const { t, language } = useSimpleLanguage();
  const { catalog, loading } = usePricingCatalog(language);
  const { addItem } = useCart();
  const { toast } = useToast();
  const au = ADDON_UI[language] || ADDON_UI.vi;

  const detailFrom = (it: PricingItem): ProductDetailData | undefined => (it.detail ? (it.detail as ProductDetailData) : undefined);

  // ---- Billing terms (chỉ 1 năm / 2 năm) ----
  const terms: { key: BillingKey; label: string }[] = useMemo(() => {
    const fromCatalog = catalog?.config?.billingTerms;
    if (fromCatalog?.length) return fromCatalog.map((bt) => ({ key: bt.key, label: bt.label || t(`hero.${bt.key}`) }));
    return [{ key: "oneYear", label: t("hero.oneYear") }, { key: "twoYears", label: t("hero.twoYears") }];
  }, [catalog, t]);

  // ---- Plans (từ catalog) ----
  const plans: PlanView[] = useMemo(() => {
    return (catalog?.items || []).filter((i) => i.kind === "plan").map((it) => {
      const original = it.prices?.[billing] ?? null;
      const promo = it.promoPrices?.[billing] ?? null;
      const hasPromo = it.priceType === "paid" && isValidPromo(original, promo);
      return {
        key: it.key,
        name: it.name,
        subtitle: it.subtitle,
        description: it.description,
        features: it.features || [],
        excludedFeatures: it.excludedFeatures || [],
        popular: it.popular,
        priceType: it.priceType,
        monthly: it.priceType === "free" ? 0 : it.priceType === "contact" ? -1 : (hasPromo ? promo : original),
        originalMonthly: hasPromo ? original : null,
        promoLabel: hasPromo ? promoBadge(it.promoLabel, original, promo, it.promoPercent) : "",
      };
    });
  }, [catalog, billing]);

  // ---- Add-ons (từ catalog) ----
  const addons: AddonView[] = useMemo(() => {
    return (catalog?.items || []).filter((i) => i.kind === "addon").map((it) => {
      const isContact = it.priceType === "contact";
      const isFree = it.priceType === "free";
      const original = it.prices?.[billing] ?? null;
      const promo = it.promoPrices?.[billing] ?? null;
      const hasPromo = it.priceType === "paid" && isValidPromo(original, promo);
      // Liên hệ → không có giá số; Miễn phí → 0; còn lại lấy giá (đã áp KM).
      const priceValue = isContact ? null : isFree ? 0 : (hasPromo ? promo : original);
      const suffix = it.priceSuffix ? " " + it.priceSuffix : "";
      const priceDisplay = isContact
        ? t("plans.contact")
        : isFree
          ? t("plans.free")
          : (priceValue != null ? `${formatPrice(priceValue)}₫${suffix}` : (it.priceLabel || ""));
      return {
        key: it.key, icon: iconFor(it.icon), name: it.name, description: it.description,
        priceType: it.priceType,
        priceValue, priceDisplay,
        priceSuffix: it.priceSuffix || "",
        subtitle: it.subtitle || "",
        originalDisplay: hasPromo ? `${formatPrice(original)}₫${suffix}` : null,
        promoLabel: hasPromo ? promoBadge(it.promoLabel, original, promo, it.promoPercent) : "",
        group: it.group ?? null,
        popular: !!it.popular,
        detail: detailFrom(it),
      };
    });
  }, [catalog, billing, t]);

  // ---- Dịch vụ (từ catalog kind='service') — hiển thị như thẻ Liên hệ/báo giá ----
  const services: AddonView[] = useMemo(() => {
    return (catalog?.items || []).filter((i) => i.kind === "service").map((it) => {
      const isContact = it.priceType === "contact";
      const isFree = it.priceType === "free";
      const unit = it.serviceUnit ? `/${it.serviceUnit}` : "";
      const priceValue = isContact ? null : isFree ? 0 : (it.servicePrice ?? null);
      const priceDisplay = isContact
        ? t("plans.contact")
        : isFree
          ? t("plans.free")
          : (priceValue != null ? `${formatPrice(priceValue)}₫${unit}` : t("plans.contact"));
      return {
        key: it.key, icon: iconFor(it.icon), name: it.name, description: it.description,
        priceType: it.priceType,
        priceValue, priceDisplay,
        priceSuffix: "",
        subtitle: it.subtitle || "",
        originalDisplay: null,
        promoLabel: "",
        group: null,
        popular: false,
        isService: true,
        detail: detailFrom(it),
      };
    });
  }, [catalog, t]);

  // Các section trên khối add-on: Capacity / AI Credit (từ add-on group) →
  // Dịch vụ (từ kind='service') → Tiện ích khác (add-on chưa phân nhóm). Chỉ hiện
  // section có item.
  const displayGroups = useMemo(() => {
    const text = ADDON_GROUP_TEXT[language] || ADDON_GROUP_TEXT.vi;
    const addonBy = (gid: AddonGroupId) => addons.filter((a) => (a.group ?? "other") === gid);
    const make = (id: AddonGroupId, items: AddonView[]) => ({
      id,
      title: text[id].title,
      sub: text[id].sub,
      items,
    });
    return [
      make("capacity", addonBy("capacity")),
      make("ai", addonBy("ai")),
      make("service", services),
      make("other", addonBy("other")),
    ].filter((grp) => grp.items.length > 0);
  }, [addons, services, language]);


  // ---- Hardware (từ catalog) ----
  const hardware: HwView[] = useMemo(() => {
    return (catalog?.items || []).filter((i) => i.kind === "hardware").map((it) => {
      const buyOrig = it.buyPrice ?? null;
      const buyPromo = it.buyPromoPrice ?? null;
      const hasBuyPromo = isValidPromo(buyOrig, buyPromo);
      const rentOrig = it.rentPrices?.[billing] ?? null;
      const rentPromo = it.rentPromoPrices?.[billing] ?? null;
      const hasRentPromo = isValidPromo(rentOrig, rentPromo);
      return {
        key: it.key, icon: iconFor(it.icon), name: it.name, description: it.description, specs: it.specs || [],
        priceType: it.priceType,
        buyPrice: hasBuyPromo ? buyPromo : buyOrig,
        buyOriginal: hasBuyPromo ? buyOrig : null,
        rentValue: hasRentPromo ? rentPromo : rentOrig,
        rentOriginal: hasRentPromo ? rentOrig : null,
        promoLabel: promoBadge(it.promoLabel, hasBuyPromo ? buyOrig : rentOrig, hasBuyPromo ? buyPromo : rentPromo, it.promoPercent),
        detail: detailFrom(it),
      };
    });
  }, [catalog, billing]);

  // ---- Comparison (từ catalog) ----
  const comparisonTitle = catalog?.config?.comparison?.title || (t("comparison.title") as string);
  const comparisonSubtitle = catalog?.config?.comparison?.subtitle || (t("comparison.subtitle") as string);
  const comparisonData: ComparisonRow[] = useMemo(() => {
    const rows: ComparisonRow[] = [];
    for (const g of catalog?.config?.comparison?.groups || []) {
      rows.push({ category: g.label });
      for (const r of g.rows) rows.push({ feature: r.label, values: r.values });
    }
    return rows;
  }, [catalog]);

  // ---- FAQ (từ catalog) ----
  const faqArray: Array<{ q: string; a: string }> = useMemo(() => catalog?.config?.faq || [], [catalog]);

  // ---- Hero / CTA ----
  const hero = catalog?.config?.hero;
  const cta = catalog?.config?.cta;

  // ---- Cart handlers (giá đã resolve theo kỳ) ----
  const handleAddPlanToCart = (p: PlanView) => {
    if (p.monthly == null || p.priceType === "contact") return;
    addItem({ id: `plan-${p.key}-${billing}`, type: "plan", name: p.name, price: p.monthly, billing, metadata: { key: p.key } });
    toast({ title: t("cart.added") || "Added to cart", description: `${p.name} (${terms.find((x) => x.key === billing)?.label})`, duration: 2000 });
  };
  const handleAddAddonToCart = (a: AddonView) => {
    addItem({ id: `addon-${a.key}-${billing}`, type: "addon", name: a.name, price: a.priceValue ?? 0, billing, metadata: { key: a.key } });
    toast({ title: t("cart.added") || "Added to cart", description: a.name, duration: 2000 });
  };
  // Dịch vụ trả 1 lần theo đơn vị công → KHÔNG gắn `billing` (giống hardware mua đứt),
  // để giỏ hàng không hiện nhãn chu kỳ 1 năm/2 năm cho một khoản trả một lần.
  const handleAddServiceToCart = (s: AddonView) => {
    addItem({ id: `service-${s.key}-onetime`, type: "service", name: s.name, price: s.priceValue ?? 0, metadata: { key: s.key } });
    toast({ title: t("cart.added") || "Added to cart", description: s.name, duration: 2000 });
  };
  const handleAddHardwareToCart = (h: HwView, isRental: boolean) => {
    const price = isRental ? (h.rentValue ?? 0) : (h.buyPrice ?? 0);
    addItem({ id: `hardware-${h.key}-${isRental ? "rent" : "buy"}-${isRental ? billing : "onetime"}`, type: "hardware", name: h.name, price, billing: isRental ? billing : undefined, metadata: { key: h.key, isRental } });
    toast({ title: t("cart.added") || "Added to cart", description: `${h.name} (${isRental ? terms.find((x) => x.key === billing)?.label : t("hardware.buyOutright")})`, duration: 2000 });
  };

  const openDetailModal = (type: string, key: string, title: string, price: number, isRental: boolean, contact: boolean, detail?: ProductDetailData) => {
    setDetailModal({ open: true, type, key, title, price, isRental, contact, detail });
  };

  const planPriceLabel = (p: PlanView) => {
    if (p.priceType === "free" || p.monthly === 0) return <span className="text-3xl font-bold text-foreground">{t("plans.free")}</span>;
    if (p.priceType === "contact" || p.monthly === -1 || p.monthly == null) return <span className="text-3xl font-bold text-foreground">{t("plans.contact")}</span>;
    return (
      <div>
        {p.originalMonthly != null && (
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-sm text-muted-foreground line-through">{formatPrice(p.originalMonthly)}₫</span>
            {p.promoLabel && <Badge className="bg-red-500 text-white text-[10px] px-1.5 py-0">{p.promoLabel}</Badge>}
          </div>
        )}
        <span className="text-3xl font-bold text-foreground">{formatPrice(p.monthly)}₫</span>
        <span className="text-sm text-muted-foreground">{t("plans.perMonth")}</span>
      </div>
    );
  };

  // ---- Loading / trạng thái rỗng (bỏ fallback tĩnh → phụ thuộc catalog) ----
  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-32 flex flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground text-sm">{t("hero.badge")}</p>
      </div>
    );
  }
  if (!catalog || plans.length === 0) {
    return (
      <div className="min-h-screen bg-background pt-32">
        <section className="py-24 px-4 text-center max-w-xl mx-auto">
          <Badge variant="secondary" className="mb-4 text-sm px-4 py-1.5">{t("hero.badge")}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{t("cta.title")}</h1>
          <p className="text-muted-foreground mb-8">{t("cta.subtitle")}</p>
          <Link to="/contact"><Button size="lg">{t("cta.contactConsult")}</Button></Link>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-32">
      <ProductDetailModal
        open={detailModal.open}
        onOpenChange={(open) => setDetailModal({ ...detailModal, open })}
        title={detailModal.title}
        type={detailModal.type}
        productKey={detailModal.key}
        isRental={detailModal.isRental}
        detailData={detailModal.detail}
        contactHref={detailModal.contact ? "/contact" : undefined}
        onAddToCart={detailModal.contact ? undefined : () => {
          if (detailModal.type === "hardware") {
            const h = hardware.find((x) => x.key === detailModal.key);
            if (h) handleAddHardwareToCart(h, detailModal.isRental);
          } else {
            const a = addons.find((x) => x.key === detailModal.key);
            if (a) handleAddAddonToCart(a);
          }
        }}
      />

      {/* Hero */}
      <section className="py-16 md:py-24 text-center px-4">
        <Badge variant="secondary" className="mb-4 text-sm px-4 py-1.5">{hero?.badge || t("hero.badge")}</Badge>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 max-w-3xl mx-auto leading-tight">
          {hero?.title || (<>{t("hero.titleStart")}<span className="text-primary">{t("hero.titleHighlight")}</span></>)}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">{hero?.subtitle || t("hero.subtitle")}</p>

        <div className="inline-flex items-center gap-1 bg-muted rounded-full p-1">
          {terms.map((term) => (
            <button
              key={term.key}
              onClick={() => setBilling(term.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${billing === term.key ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              {term.label}
            </button>
          ))}
        </div>
      </section>

      {/* SaaS Plans */}
      <section className="container mx-auto px-4 pb-20">
        <div className="flex flex-wrap justify-center gap-5">
          {plans.map((p) => (
            <Card key={p.key} className={`relative flex flex-col w-full md:w-[calc(50%-0.625rem)] lg:w-[calc(25%-0.9375rem)] ${p.popular ? "border-primary shadow-lg shadow-primary/10 scale-[1.02]" : "border-border"}`}>
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground shadow-sm">{t("plans.popular")}</Badge>
                </div>
              )}
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{p.name}</CardTitle>
                  <Badge variant="outline" className="text-xs font-normal">{p.subtitle}</Badge>
                </div>
                <CardDescription>{p.description}</CardDescription>
                <div className="pt-3">{planPriceLabel(p)}</div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2.5">
                  {p.features.map((text) => (
                    <li key={text} className="flex items-start gap-2.5 text-sm">
                      <Check className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                      <span className="text-foreground">{text}</span>
                    </li>
                  ))}
                  {p.excludedFeatures.map((text) => (
                    <li key={text} className="flex items-start gap-2.5 text-sm">
                      <Check className="h-4 w-4 mt-0.5 shrink-0 text-border" />
                      <span className="text-muted-foreground/50 line-through">{text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                {p.priceType === "contact" ? (
                  // Gói báo giá không thêm vào giỏ được, nên nút dẫn thẳng sang trang liên hệ
                  <Button asChild variant={p.popular ? "default" : "outline"} className="w-full">
                    <Link to="/contact">{p.ctaLabel || t("plans.enterprise.cta")}</Link>
                  </Button>
                ) : (
                  <Button
                    variant={p.popular ? "default" : "outline"}
                    className="w-full"
                    onClick={() => handleAddPlanToCart(p)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {t("cart.addToCart") || "Add to Cart"}
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-3">{t("comparison.badge")}</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{comparisonTitle}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">{comparisonSubtitle}</p>
          </div>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/60">
                  <th className="text-left py-4 px-5 font-semibold text-foreground min-w-[220px]">{comparisonTitle}</th>
                  {plans.map((p) => (
                    <th key={p.key} className="text-center py-4 px-4 font-semibold text-foreground min-w-[130px]">{p.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => {
                  if ("category" in row) {
                    return (
                      <tr key={i} className="bg-muted/30 border-t border-border">
                        <td colSpan={plans.length + 1} className="py-3 px-5 font-semibold text-foreground text-xs uppercase tracking-wider">{row.category}</td>
                      </tr>
                    );
                  }
                  return (
                    <tr key={i} className="border-t border-border hover:bg-muted/20 transition-colors">
                      <td className="py-3 px-5 text-foreground">{row.feature}</td>
                      {/* Render đúng theo số gói đang hiển thị — values có thể lệch khi admin thêm/xóa gói */}
                      {plans.map((p, j) => {
                        const val = row.values[j] ?? false;
                        return (
                          <td key={p.key} className="text-center py-3 px-4">
                            {val === true ? <Check className="h-4 w-4 text-primary mx-auto" /> : val === false ? <X className="h-4 w-4 text-muted-foreground/30 mx-auto" /> : <span className="text-xs text-muted-foreground font-medium">{val}</span>}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="bg-muted/50 py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-3">{t("addons.badge")}</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{t("addons.title")}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">{t("addons.subtitle")}</p>
          </div>
          <div className="max-w-6xl mx-auto space-y-6">
            {displayGroups.map((grp) => (
              <div key={grp.id} className="rounded-2xl border border-border bg-card p-5 md:p-6">
                <div className="mb-5">
                  <h3 className="text-lg md:text-xl font-bold text-foreground">{grp.title}</h3>
                  {grp.sub && <p className="text-sm text-muted-foreground mt-1">{grp.sub}</p>}
                </div>

                {/* Capacity: thẻ + nút Thêm vào giỏ */}
                {grp.id === "capacity" && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {grp.items.map((addon) => (
                        <div key={addon.key} className="rounded-xl border border-border p-4 flex flex-col">
                          <div className="flex items-start gap-3 mb-3 flex-1">
                            <div className="h-11 w-11 flex-none rounded-xl bg-primary/10 flex items-center justify-center">
                              <addon.icon className="h-5 w-5 text-primary" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-foreground">{addon.name}</p>
                              <p className="text-sm text-muted-foreground">{addon.description}</p>
                            </div>
                          </div>
                          <p className="mb-4 text-xl font-bold text-primary">
                            {addon.priceType === "paid" ? (
                              <>{formatPrice(addon.priceValue ?? 0)}₫ <span className="text-xs font-normal text-muted-foreground">{addon.priceSuffix || au.perMonth}</span></>
                            ) : addon.priceDisplay}
                          </p>
                          <div className="flex gap-2">
                            <Button variant="outline" className="flex-1" onClick={() => openDetailModal("addon", addon.key, addon.name, addon.priceValue ?? 0, false, addon.priceType === "contact", addon.detail)}>{t("addons.detail")}</Button>
                            <Button className="flex-1" onClick={() => handleAddAddonToCart(addon)}>
                              <ShoppingCart className="mr-1.5 h-4 w-4" />{au.add}
                            </Button>
                          </div>
                        </div>
                    ))}
                  </div>
                )}

                {/* AI Credit: thẻ gói, badge Phổ biến (gói popular được tô nổi bật) */}
                {grp.id === "ai" && (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {grp.items.map((addon) => {
                      const highlight = addon.popular;
                      return (
                        <div key={addon.key} className={`relative rounded-xl border p-4 flex flex-col transition-colors ${highlight ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border"}`}>
                          {addon.popular && (
                            <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 gap-1">
                              <Star className="h-3 w-3" />{au.popular}
                            </Badge>
                          )}
                          <p className="font-bold text-foreground">{addon.name}</p>
                          {addon.subtitle && <p className="text-sm text-muted-foreground mt-0.5">{addon.subtitle}</p>}
                          <div className="my-3 flex items-center gap-2 rounded-lg bg-primary/5 px-3 py-2 text-sm text-primary">
                            <MessageCircle className="h-4 w-4 flex-none" />
                            <span>{addon.description}</span>
                          </div>
                          <div className="flex-1" />
                          <p className="mb-4 text-xl font-bold text-primary">
                            {addon.priceType === "paid" ? (
                              <>{formatPrice(addon.priceValue ?? 0)}₫ <span className="text-xs font-normal text-muted-foreground">{addon.priceSuffix || au.perMonth}</span></>
                            ) : addon.priceDisplay}
                          </p>
                          <div className="flex gap-2">
                            <Button variant="outline" className="flex-1" onClick={() => openDetailModal("addon", addon.key, addon.name, addon.priceValue ?? 0, false, addon.priceType === "contact", addon.detail)}>{t("addons.detail")}</Button>
                            <Button variant={highlight ? "default" : "outline"} className="flex-1" onClick={() => handleAddAddonToCart(addon)}>
                              <ShoppingCart className="mr-1.5 h-4 w-4" />{au.select}
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Services (kind='service'): pill báo giá + nút liên hệ */}
                {grp.id === "service" && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {grp.items.map((addon) => (
                      <div key={addon.key} className="rounded-xl border border-border p-4 flex flex-col">
                        <div className="flex items-start gap-3 mb-3 flex-1">
                          <div className="h-11 w-11 flex-none rounded-xl bg-primary/10 flex items-center justify-center">
                            <addon.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-foreground">{addon.name}</p>
                            <p className="text-sm text-muted-foreground">{addon.description}</p>
                          </div>
                        </div>
                        <div className="mb-3 rounded-lg border border-dashed border-border bg-muted/40 px-3 py-2 text-center text-sm text-muted-foreground">
                          {addon.priceType === "paid" ? addon.priceDisplay : au.byQuote}
                        </div>
                        {/* Có đơn giá → cho chọn thẳng vào giỏ; chưa có giá (Liên hệ) → giữ nút liên hệ. */}
                        {addon.priceType === "paid" && (addon.priceValue ?? 0) > 0 ? (
                          <Button className="w-full" onClick={() => handleAddServiceToCart(addon)}>
                            <ShoppingCart className="mr-2 h-4 w-4" />{au.select}
                          </Button>
                        ) : (
                          <Button variant="outline" asChild className="w-full">
                            <Link to="/contact"><Phone className="mr-2 h-4 w-4" />{au.contactQuote}</Link>
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Tiện ích khác (add-on chưa phân nhóm): giữ thẻ Chi tiết + Thêm vào giỏ */}
                {grp.id === "other" && (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {grp.items.map((addon) => (
                      <Card key={addon.key} className="flex flex-col h-full border-border hover:border-primary/40 transition-colors">
                        <CardHeader className="pb-3">
                          <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center mb-2">
                            <addon.icon className="h-5 w-5 text-accent-foreground" />
                          </div>
                          <CardTitle className="text-base">{addon.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1">
                          <div className="mb-3">
                            {addon.originalDisplay && (
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-sm text-muted-foreground line-through">{addon.originalDisplay}</span>
                                {addon.promoLabel && <Badge className="bg-red-500 text-white text-[10px] px-1.5 py-0">{addon.promoLabel}</Badge>}
                              </div>
                            )}
                            <span className="text-2xl font-bold text-foreground">{addon.priceDisplay}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{addon.description}</p>
                        </CardContent>
                        <CardFooter className="flex gap-2 mt-auto">
                          <Button variant="outline" size="sm" className="flex-1" onClick={() => openDetailModal("addon", addon.key, addon.name, addon.priceValue ?? 0, false, addon.priceType === "contact", addon.detail)}>{t("addons.detail")}</Button>
                          {addon.priceType === "contact" ? (
                            <Button asChild size="sm" className="flex-1"><Link to="/contact">{t("plans.contact")}</Link></Button>
                          ) : (
                            <Button size="sm" className="flex-1" onClick={() => handleAddAddonToCart(addon)}><ShoppingCart className="h-4 w-4 mr-2" />{t("cart.addToCart") || "Add to Cart"}</Button>
                          )}
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hardware */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-3">{t("hardware.badge")}</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{t("hardware.title")}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">{t("hardware.subtitle")}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-5">
            {hardware.map((hw) => (
              <Card key={hw.key} className="border-border hover:border-primary/40 transition-colors flex flex-col h-full w-full md:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.834rem)]">
                <CardHeader>
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                    <hw.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-base">{hw.name}</CardTitle>
                  <CardDescription>{hw.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hw.specs.map((spec) => (<Badge key={spec} variant="secondary" className="text-xs font-normal">{spec}</Badge>))}
                  </div>
                  <div className="space-y-3">
                    {/* Buy outright */}
                    {hw.buyPrice != null && (
                      <div className="rounded-lg border border-border bg-muted/40 p-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-medium text-foreground">{t("hardware.buyOutright")}</p>
                            <p className="text-xs text-muted-foreground">{t("hardware.buyDesc")}</p>
                          </div>
                          <div className="text-right shrink-0">
                            {hw.buyOriginal != null && <p className="text-xs text-muted-foreground line-through">{formatPrice(hw.buyOriginal)}₫</p>}
                            <p className="text-lg font-bold text-foreground whitespace-nowrap">{formatPrice(hw.buyPrice)}₫</p>
                            <p className="text-xs text-muted-foreground">{t("hardware.perUnit")}</p>
                          </div>
                        </div>
                        <div className="flex justify-end gap-1.5 mt-2">
                          <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => openDetailModal("hardware", hw.key, hw.name, hw.buyPrice ?? 0, false, false, hw.detail)}><Info className="h-3.5 w-3.5" /></Button>
                          <Button size="icon" className="h-7 w-7" onClick={() => handleAddHardwareToCart(hw, false)}><ShoppingCart className="h-3.5 w-3.5" /></Button>
                        </div>
                      </div>
                    )}
                    {/* Rent bundle */}
                    {hw.rentValue != null && (
                      <div className="rounded-lg border border-primary/30 bg-accent p-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-foreground">{t("hardware.rentBundle")}</p>
                              <Badge className="text-[10px]">{t("hardware.rentBadge")}</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{t("hardware.rentDesc")}</p>
                          </div>
                          <div className="text-right shrink-0">
                            {hw.rentOriginal != null && <p className="text-xs text-muted-foreground line-through">{formatPrice(hw.rentOriginal)}₫</p>}
                            <p className="text-lg font-bold text-foreground whitespace-nowrap">{formatPrice(hw.rentValue)}₫</p>
                            <p className="text-xs text-muted-foreground">{t("hardware.perUnitMonth")}</p>
                          </div>
                        </div>
                        <div className="flex justify-end gap-1.5 mt-2">
                          <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => openDetailModal("hardware", hw.key, hw.name, hw.rentValue ?? 0, true, false, hw.detail)}><Info className="h-3.5 w-3.5" /></Button>
                          <Button size="icon" className="h-7 w-7" onClick={() => handleAddHardwareToCart(hw, true)}><ShoppingCart className="h-3.5 w-3.5" /></Button>
                        </div>
                      </div>
                    )}
                    {/* Liên hệ: không có giá mua/thuê → hiện CTA liên hệ thay vì để trống */}
                    {hw.priceType === "contact" && (
                      <div className="rounded-lg border border-border bg-muted/40 p-3">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-lg font-bold text-foreground">{t("plans.contact")}</p>
                          <div className="flex gap-1.5 shrink-0">
                            <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => openDetailModal("hardware", hw.key, hw.name, 0, false, true, hw.detail)}><Info className="h-3.5 w-3.5" /></Button>
                            <Button asChild size="sm" className="h-7"><Link to="/contact">{t("plans.contact")}</Link></Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cost estimator CTA */}
      <section className="px-4 pb-20">
        <div className="container mx-auto">
          <div className="rounded-2xl border border-border bg-muted/40 p-10 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{t("costEstimator.title")}</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">{t("costEstimator.subtitle")}</p>
            <Link to="/cost-estimator"><Button size="lg">{t("costEstimator.cta")}</Button></Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faqArray.length > 0 && (
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-3">{t("faq.badge")}</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{t("faq.title")}</h2>
              <p className="text-muted-foreground">{t("faq.subtitle")}</p>
            </div>
            <Accordion type="single" collapsible className="space-y-3">
              {faqArray.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-lg px-5 data-[state=open]:bg-muted/30">
                  <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-4">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{cta?.title || t("cta.title")}</h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">{cta?.subtitle || t("cta.subtitle")}</p>
          <div className="flex items-center justify-center gap-4">
            <CtaLink url={cta?.primaryUrl}>
              <Button variant="secondary" size="lg">{cta?.primary || t("cta.freeTrial")}</Button>
            </CtaLink>
            <CtaLink url={cta?.secondaryUrl}>
              <Button variant="outline" size="lg" className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">{cta?.secondary || t("cta.contactConsult")}</Button>
            </CtaLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Price;
