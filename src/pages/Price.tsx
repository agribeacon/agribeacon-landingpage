import { useMemo, useState, useRef, useEffect, type ReactElement } from "react";
import { Link } from "react-router-dom";
import { useSimpleLanguage } from "@/contexts/SimpleLanguageContext";
import { useCart } from "@/contexts/CartContext";
import { Check, Plane, Droplets, Radio, Bot, BarChart3, TreePine, Sprout, MapPinned, Building2, Crown, ShoppingCart, Info, Loader2, Star, MessageCircle, Phone, Smartphone, ShieldCheck, Plug, Award, Headphones, ChevronLeft, ChevronRight, ChevronDown, Layers, Wrench, ArrowRight, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ProductDetailModal, type ProductDetailData } from "@/components/ProductDetailModal";
import { useToast } from "@/hooks/use-toast";
import { usePricingCatalog, pricingImageSrc, type PricingItem } from "@/lib/pricingApi";

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
  group: "soil-station" | "handheld" | "robot" | "uav" | null; // tab phân loại
  popular: boolean; // badge "Bán chạy"
  imageUrl: string; // ảnh sản phẩm (hiển thị thay icon nếu có)
  priceSuffix: string; // đơn vị giá cấu hình (vd "/chiếc", "/bộ"); rỗng → fallback
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

// Thứ tự & nhãn các nhóm add-on trên trang giá (bám bố cục ảnh mẫu). 'other' gom
// các add-on chưa phân nhóm ở BE. Tách khỏi i18n lớn để gọn (theo pattern sẵn có).
const ADDON_GROUP_ORDER = ["capacity", "ai", "service", "other"] as const;
type AddonGroupId = (typeof ADDON_GROUP_ORDER)[number];
const ADDON_GROUP_TEXT: Record<string, Record<AddonGroupId, { title: string; sub: string }>> = {
  vi: {
    capacity: { title: "Mở rộng quy mô", sub: "Mở rộng quy mô và số lượng người dùng." },
    ai: { title: "Trợ lý AI", sub: "Gói trợ lý AI Tiểu Thần Nông theo nhu cầu." },
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

// Icon nhóm add-on (hiển thị ở tab mobile + tiêu đề nhóm).
const ADDON_GROUP_ICON: Record<AddonGroupId, LucideIcon> = {
  capacity: Layers, ai: MessageCircle, service: Wrench, other: Sprout,
};

// Nhãn chỉ dùng cho layout mobile (thu gọn danh sách tính năng của gói).
const MOBILE_UI: Record<string, { viewAll: string; collapse: string }> = {
  vi: { viewAll: "Xem tất cả tính năng", collapse: "Thu gọn" },
  en: { viewAll: "View all features", collapse: "Show less" },
  ja: { viewAll: "すべての機能を見る", collapse: "折りたたむ" },
};
const MOBILE_PLAN_FEATURES = 5; // số tính năng hiện trước khi bấm "Xem tất cả"

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

// ---- Phân loại phần cứng (tabs) ----
const HW_GROUP_ORDER = ["soil-station", "handheld", "robot", "uav", "other"] as const;
type HwGroupId = (typeof HW_GROUP_ORDER)[number];
const HW_GROUP_ICON: Record<HwGroupId, LucideIcon> = {
  "soil-station": Sprout, handheld: Smartphone, robot: Bot, uav: Plane, other: BarChart3,
};
const HW_GROUP_TEXT: Record<string, Record<HwGroupId, { title: string; sub: string }>> = {
  vi: {
    "soil-station": { title: "Trạm đo đất cố định", sub: "Lắp đặt cố định tại ruộng, tự động theo dõi 24/7." },
    handheld: { title: "Thiết bị cầm tay", sub: "Đo nhanh tại hiện trường, gọn nhẹ." },
    robot: { title: "Robot", sub: "Tự động hoá canh tác ngoài đồng." },
    uav: { title: "UAV", sub: "Bay khảo sát, phun & lập bản đồ." },
    other: { title: "Thiết bị khác", sub: "" },
  },
  en: {
    "soil-station": { title: "Fixed soil stations", sub: "Installed in-field, monitoring 24/7." },
    handheld: { title: "Handheld devices", sub: "Fast on-site measurement, compact." },
    robot: { title: "Robots", sub: "Automate field operations." },
    uav: { title: "UAV", sub: "Survey, spray & mapping drones." },
    other: { title: "Other devices", sub: "" },
  },
  ja: {
    "soil-station": { title: "固定土壌ステーション", sub: "圃場に設置し24/7監視。" },
    handheld: { title: "ハンドヘルド機器", sub: "現場で素早く測定。" },
    robot: { title: "ロボット", sub: "圃場作業を自動化。" },
    uav: { title: "UAV", sub: "調査・散布・マッピング。" },
    other: { title: "その他の機器", sub: "" },
  },
};

// Thanh cam kết dưới phần cứng (tĩnh, đa ngôn ngữ).
const HW_TRUST: Record<string, Array<{ icon: LucideIcon; title: string; sub: string }>> = {
  vi: [
    { icon: ShieldCheck, title: "Sở hữu trọn đời", sub: "Không phí thuê bao" },
    { icon: Plug, title: "Kết nối trực tiếp", sub: "Tích hợp sẵn với AgriBeacon" },
    { icon: Award, title: "Bảo hành chính hãng", sub: "12 – 24 tháng" },
    { icon: Headphones, title: "Hỗ trợ kỹ thuật", sub: "Tận tình 24/7" },
  ],
  en: [
    { icon: ShieldCheck, title: "Own forever", sub: "No subscription fee" },
    { icon: Plug, title: "Direct connection", sub: "Built-in with AgriBeacon" },
    { icon: Award, title: "Official warranty", sub: "12 – 24 months" },
    { icon: Headphones, title: "Tech support", sub: "24/7 dedicated" },
  ],
  ja: [
    { icon: ShieldCheck, title: "永久所有", sub: "月額費用なし" },
    { icon: Plug, title: "直接接続", sub: "AgriBeaconに標準統合" },
    { icon: Award, title: "正規保証", sub: "12〜24ヶ月" },
    { icon: Headphones, title: "技術サポート", sub: "24/7対応" },
  ],
};

// Carousel ngang có mũi tên + chấm trang (cho danh sách thiết bị).
function HardwareCarousel({ children }: { children: ReactElement[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);
  const recompute = () => {
    const el = ref.current;
    if (!el) return;
    setPages(Math.max(1, Math.round(el.scrollWidth / el.clientWidth)));
    setPage(Math.round(el.scrollLeft / el.clientWidth));
  };
  useEffect(() => {
    recompute();
    const el = ref.current;
    if (!el) return;
    el.addEventListener("scroll", recompute, { passive: true });
    window.addEventListener("resize", recompute);
    return () => {
      el.removeEventListener("scroll", recompute);
      window.removeEventListener("resize", recompute);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children.length]);
  const go = (dir: -1 | 1) => ref.current?.scrollBy({ left: dir * (ref.current?.clientWidth || 0), behavior: "smooth" });
  const toPage = (p: number) => ref.current?.scrollTo({ left: p * (ref.current?.clientWidth || 0), behavior: "smooth" });
  const multi = pages > 1;
  return (
    <div className="relative">
      {multi && (
        <button type="button" onClick={() => go(-1)} aria-label="Trước"
          className="absolute -left-3 md:-left-5 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full border border-border bg-card shadow-sm hidden sm:flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-40"
          disabled={page <= 0}>
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}
      {/* Mobile: thẻ rộng 86% để lộ mép thẻ kế bên (gợi ý vuốt ngang) */}
      <div ref={ref} className="flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {children.map((c, i) => (
          <div key={i} className="snap-start shrink-0 w-[86%] sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.834rem)]">{c}</div>
        ))}
      </div>
      {multi && (
        <button type="button" onClick={() => go(1)} aria-label="Sau"
          className="absolute -right-3 md:-right-5 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full border border-border bg-card shadow-sm hidden sm:flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-40"
          disabled={page >= pages - 1}>
          <ChevronRight className="h-5 w-5" />
        </button>
      )}
      {multi && (
        <div className="mt-5 flex justify-center gap-2">
          {Array.from({ length: pages }).map((_, p) => (
            <button key={p} type="button" aria-label={`Trang ${p + 1}`} onClick={() => toPage(p)}
              className={`h-2 rounded-full transition-all ${p === page ? "w-6 bg-primary" : "w-2 bg-border"}`} />
          ))}
        </div>
      )}
    </div>
  );
}

// Carousel vuốt-từng-thẻ cho mobile: index do cha giữ để đồng bộ 2 chiều với hàng tab
// (bấm tab → cuộn tới thẻ; vuốt thẻ → tab sáng theo). Dùng rect thay offsetLeft để
// không phụ thuộc offsetParent của thẻ con.
const SNAP_PAD = 16; // = px-4 của khung cuộn (đi kèm scroll-pl-4 để thẻ snap đúng mép nội dung)
function MobileCardCarousel({ children, index, onIndexChange }: { children: ReactElement[]; index: number; onIndexChange: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const shown = useRef(0); // thẻ đang thực sự nằm ở mép trái khung cuộn
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const base = el.getBoundingClientRect().left + SNAP_PAD;
      let best = 0;
      let bestDist = Infinity;
      Array.from(el.children).forEach((kid, i) => {
        const dist = Math.abs((kid as HTMLElement).getBoundingClientRect().left - base);
        if (dist < bestDist) { bestDist = dist; best = i; }
      });
      if (best !== shown.current) { shown.current = best; onIndexChange(best); }
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [onIndexChange]);
  useEffect(() => {
    const el = ref.current;
    if (!el || index === shown.current) return;
    const kid = el.children[index] as HTMLElement | undefined;
    if (!kid) return;
    shown.current = index;
    el.scrollTo({ left: el.scrollLeft + (kid.getBoundingClientRect().left - el.getBoundingClientRect().left) - SNAP_PAD, behavior: "smooth" });
  }, [index]);
  return (
    <div>
      <div ref={ref} className="-mx-4 flex snap-x snap-mandatory scroll-pl-4 gap-4 overflow-x-auto scroll-smooth px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {children.map((c, i) => (
          <div key={i} className="w-[88%] shrink-0 snap-start">{c}</div>
        ))}
      </div>
      {children.length > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {children.map((_, i) => (
            <button key={i} type="button" aria-label={`${i + 1}`} onClick={() => onIndexChange(i)}
              className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-primary" : "w-2 bg-border"}`} />
          ))}
        </div>
      )}
    </div>
  );
}

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
  const mu = MOBILE_UI[language] || MOBILE_UI.vi;
  // Mobile: chỉ hiện 1 gói / 1 nhóm add-on tại một thời điểm (xem ảnh mẫu).
  const [planIndex, setPlanIndex] = useState(0);
  const [expandedPlans, setExpandedPlans] = useState<Record<string, boolean>>({});
  const [addonTab, setAddonTab] = useState<string>("");
  const hwViewAll = language === "en" ? "View all" : language === "ja" ? "すべて見る" : "Xem tất cả";
  const hwBestSeller = language === "en" ? "Best seller" : language === "ja" ? "人気" : "Bán chạy";

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
        group: (it.group === "capacity" || it.group === "ai" ? it.group : null) as AddonView["group"],
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
  const activeAddonGroup = displayGroups.find((g) => g.id === addonTab) || displayGroups[0];


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
        group: (["soil-station", "handheld", "robot", "uav"].includes(it.group as string) ? it.group : null) as HwView["group"],
        popular: !!it.popular,
        imageUrl: it.imageUrl || "",
        priceSuffix: it.priceSuffix || "",
        detail: detailFrom(it),
      };
    });
  }, [catalog, billing]);

  // Cấu hình tab phân loại phần cứng (bám ảnh mẫu). Chỉ hiện tab có thiết bị.
  const hwGroups = useMemo(() => {
    const text = HW_GROUP_TEXT[language] || HW_GROUP_TEXT.vi;
    return HW_GROUP_ORDER.map((gid) => ({
      id: gid,
      title: text[gid].title,
      sub: text[gid].sub,
      icon: HW_GROUP_ICON[gid],
      items: hardware.filter((h) => (h.group ?? "other") === gid),
    })).filter((g) => g.items.length > 0);
  }, [hardware, language]);
  const [hwTab, setHwTab] = useState<string>("");
  const activeHwGroup = hwGroups.find((g) => g.id === hwTab) || hwGroups[0];

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

  // `onPrimary`: thẻ nằm trên nền primary (header gói nổi bật ở mobile) → chữ trắng.
  // `accent`: giá tô màu primary (thẻ mobile thường), desktop giữ màu foreground.
  const planPriceLabel = (p: PlanView, onPrimary = false, accent = false) => {
    const main = onPrimary ? "text-primary-foreground" : accent ? "text-primary" : "text-foreground";
    const sub = onPrimary ? "text-primary-foreground/80" : "text-muted-foreground";
    if (p.priceType === "free" || p.monthly === 0) return <span className={`text-3xl font-bold ${main}`}>{t("plans.free")}</span>;
    if (p.priceType === "contact" || p.monthly === -1 || p.monthly == null) return <span className={`text-3xl font-bold ${main}`}>{t("plans.contact")}</span>;
    return (
      <div>
        {p.originalMonthly != null && (
          <div className="flex items-center gap-2 mb-0.5">
            <span className={`text-sm line-through ${sub}`}>{formatPrice(p.originalMonthly)}₫</span>
            {p.promoLabel && <Badge className="bg-red-500 text-white text-[10px] px-1.5 py-0">{p.promoLabel}</Badge>}
          </div>
        )}
        <span className={`text-3xl font-bold ${main}`}>{formatPrice(p.monthly)}₫</span>
        <span className={`text-sm ${sub}`}>{t("plans.perMonth")}</span>
      </div>
    );
  };

  // Nút CTA của gói (dùng chung cho thẻ desktop & mobile).
  const planCta = (p: PlanView, onPrimary = false) =>
    p.priceType === "contact" ? (
      // Gói báo giá không thêm vào giỏ được, nên nút dẫn thẳng sang trang liên hệ
      <Button asChild variant={p.popular && !onPrimary ? "default" : "outline"} className="w-full">
        <Link to="/contact">{p.ctaLabel || t("plans.enterprise.cta")}</Link>
      </Button>
    ) : (
      <Button variant={p.popular && !onPrimary ? "default" : "outline"} className="w-full" onClick={() => handleAddPlanToCart(p)}>
        <ShoppingCart className="h-4 w-4 mr-2" />
        {t("cart.addToCart") || "Add to Cart"}
      </Button>
    );

  // Thẻ gói cho mobile (bám ảnh mẫu): header tô nền, danh sách tính năng thu gọn.
  const renderMobilePlanCard = (p: PlanView) => {
    const open = !!expandedPlans[p.key];
    const rows: Array<{ text: string; excluded: boolean }> = [
      ...p.features.map((text) => ({ text, excluded: false })),
      ...p.excludedFeatures.map((text) => ({ text, excluded: true })),
    ];
    const visible = open ? rows : rows.slice(0, MOBILE_PLAN_FEATURES);
    return (
      <Card className={`flex h-full flex-col overflow-hidden ${p.popular ? "border-primary shadow-lg shadow-primary/10" : "border-border"}`}>
        <div className={`p-5 ${p.popular ? "bg-primary" : "bg-muted/40"}`}>
          <div className="flex items-start justify-between gap-2">
            <h3 className={`text-2xl font-bold ${p.popular ? "text-primary-foreground" : "text-foreground"}`}>{p.name}</h3>
            {p.popular && <Badge className="bg-primary-foreground/20 text-primary-foreground shadow-none">{t("plans.popular")}</Badge>}
          </div>
          {p.subtitle && <p className={`text-sm ${p.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{p.subtitle}</p>}
          <div className="pt-3">{planPriceLabel(p, p.popular, !p.popular)}</div>
          {p.description && <p className={`mt-1 text-xs ${p.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{p.description}</p>}
        </div>
        <div className="flex-1 p-5">
          <ul className="space-y-2.5">
            {visible.map((row) => (
              <li key={row.text} className="flex items-start gap-2.5 text-sm">
                <Check className={`h-4 w-4 mt-0.5 shrink-0 ${row.excluded ? "text-border" : "text-primary"}`} />
                <span className={row.excluded ? "text-muted-foreground/50 line-through" : "text-foreground"}>{row.text}</span>
              </li>
            ))}
          </ul>
          {rows.length > MOBILE_PLAN_FEATURES && (
            <button type="button" onClick={() => setExpandedPlans((s) => ({ ...s, [p.key]: !open }))}
              className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
              {open ? mu.collapse : mu.viewAll}
              <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
          )}
        </div>
        <div className="p-5 pt-0">{planCta(p)}</div>
      </Card>
    );
  };

  // Nội dung 1 nhóm add-on — dùng chung cho mobile (chỉ nhóm đang chọn) và desktop
  // (xếp chồng tất cả nhóm).
  const renderAddonGroupBody = (grp: (typeof displayGroups)[number]) => {
    const GroupIcon = ADDON_GROUP_ICON[grp.id];
    return (
      <>
        <div className="mb-5 flex items-center gap-3">
          <div className="h-10 w-10 flex-none rounded-xl bg-primary/10 flex items-center justify-center">
            <GroupIcon className="h-5 w-5 text-primary" />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg md:text-xl font-bold text-foreground">{grp.title}</h3>
            {grp.sub && <p className="text-sm text-muted-foreground">{grp.sub}</p>}
          </div>
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
                  <Button className="flex-[1.4]" onClick={() => handleAddAddonToCart(addon)}>
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
                    <Button variant={highlight ? "default" : "outline"} className="flex-[1.4]" onClick={() => handleAddAddonToCart(addon)}>
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
      </>
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
      <section className="container mx-auto px-4 pb-16 md:pb-20">
        {/* Mobile: hàng tab tên gói + carousel vuốt ngang (1 gói / màn hình) */}
        <div className="md:hidden">
          <div className="-mx-4 mb-5 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {plans.map((p, i) => (
              <button key={p.key} type="button" onClick={() => setPlanIndex(i)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${i === planIndex ? "bg-foreground text-background" : "border border-border bg-card text-foreground"}`}>
                {p.name}
              </button>
            ))}
          </div>
          <MobileCardCarousel index={planIndex} onIndexChange={setPlanIndex}>
            {plans.map((p) => <div key={p.key} className="h-full">{renderMobilePlanCard(p)}</div>)}
          </MobileCardCarousel>
        </div>

        <div className="hidden md:flex flex-wrap justify-center gap-5">
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


      {/* Add-ons */}
      <section className="bg-muted/50 py-14 md:py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <Badge variant="outline" className="mb-3">{t("addons.badge")}</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{t("addons.title")}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">{t("addons.subtitle")}</p>
          </div>
          <div className="max-w-6xl mx-auto">
            {/* Mobile: chọn nhóm bằng tab, mỗi lần chỉ hiện 1 nhóm cho đỡ dài trang */}
            <div className="md:hidden">
              <div className="-mx-4 mb-5 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {displayGroups.map((grp) => {
                  const TabIcon = ADDON_GROUP_ICON[grp.id];
                  const on = grp.id === activeAddonGroup?.id;
                  return (
                    <button key={grp.id} type="button" onClick={() => setAddonTab(grp.id)}
                      className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${on ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-foreground"}`}>
                      <TabIcon className="h-4 w-4" />{grp.title}
                    </button>
                  );
                })}
              </div>
              {activeAddonGroup && (
                <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
                  {renderAddonGroupBody(activeAddonGroup)}
                </div>
              )}
            </div>

            {/* Desktop: xếp chồng tất cả nhóm */}
            <div className="hidden md:block space-y-6">
              {displayGroups.map((grp) => (
                <div key={grp.id} className="rounded-2xl border border-border bg-card p-6">
                  {renderAddonGroupBody(grp)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hardware */}
      <section className="py-14 md:py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8 md:mb-10">
            <Badge variant="outline" className="mb-3">{t("hardware.badge")}</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{t("hardware.title")}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">{t("hardware.subtitle")}</p>
          </div>

          {hwGroups.length > 0 && activeHwGroup && (
            <>
              {/* Tabs phân loại — mobile: hàng pill cuộn ngang; desktop: lưới thẻ */}
              <div className="md:hidden -mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {hwGroups.map((g) => {
                  const on = g.id === activeHwGroup.id;
                  return (
                    <button key={g.id} type="button" onClick={() => setHwTab(g.id)}
                      className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${on ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-foreground"}`}>
                      <g.icon className="h-4 w-4" />{g.title}
                    </button>
                  );
                })}
              </div>
              <div className="max-w-5xl mx-auto mb-10 hidden md:grid grid-cols-4 gap-3">
                {hwGroups.map((g) => {
                  const on = g.id === activeHwGroup.id;
                  return (
                    <button key={g.id} type="button" onClick={() => setHwTab(g.id)}
                      className={`flex items-center gap-3 rounded-xl border p-3 md:p-4 text-left transition-colors ${on ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}>
                      <div className={`h-10 w-10 flex-none rounded-lg flex items-center justify-center ${on ? "bg-primary/10" : "bg-muted"}`}>
                        <g.icon className={`h-5 w-5 ${on ? "text-primary" : "text-muted-foreground"}`} />
                      </div>
                      <span className={`font-semibold text-sm ${on ? "text-primary" : "text-foreground"}`}>{g.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tiêu đề nhóm đang chọn + Xem tất cả */}
              <div className="max-w-6xl mx-auto mb-6 md:mb-8 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 md:h-11 md:w-11 flex-none rounded-xl bg-primary/10 flex items-center justify-center">
                    <activeHwGroup.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg md:text-xl font-bold text-foreground">{activeHwGroup.title}</h3>
                    {activeHwGroup.sub && <p className="text-sm text-muted-foreground">{activeHwGroup.sub}</p>}
                  </div>
                </div>
              </div>

              {/* Carousel thiết bị */}
              <div className="max-w-6xl mx-auto px-1">
                <HardwareCarousel>
                  {activeHwGroup.items.map((hw) => {
                    const contact = hw.priceType === "contact" || (hw.buyPrice == null && hw.rentValue == null);
                    const showRentOnly = hw.buyPrice == null && hw.rentValue != null;
                    const price = hw.buyPrice != null ? hw.buyPrice : showRentOnly ? hw.rentValue : null;
                    const priceOrig = hw.buyPrice != null ? hw.buyOriginal : showRentOnly ? hw.rentOriginal : null;
                    const unit = hw.buyPrice != null ? (hw.priceSuffix || t("hardware.perUnit")) : showRentOnly ? (hw.priceSuffix || t("hardware.perUnitMonth")) : "";
                    return (
                      // Mobile: ảnh nằm trên, nút CTA có chữ & rộng hết thẻ. Từ sm trở lên giữ
                      // bố cục ngang (ảnh trái – thông tin phải) như cũ.
                      <Card key={hw.key} className="relative flex h-full flex-col sm:flex-row overflow-hidden border-border hover:border-primary/40 transition-colors">
                        {hw.popular && (
                          <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700 shadow-sm">
                            🔥 {hwBestSeller}
                          </span>
                        )}
                        {/* Ảnh — nền trắng cho ảnh trong suốt, có bóng đổ mềm */}
                        <div className="relative flex h-40 w-full flex-none items-center justify-center bg-white p-3 sm:h-auto sm:w-[46%]">
                          {hw.imageUrl ? (
                            <img src={pricingImageSrc(hw.imageUrl)} alt={hw.name} loading="lazy" className="max-h-full max-w-full object-contain drop-shadow-[0_6px_12px_rgba(0,0,0,0.14)]" />
                          ) : (
                            <hw.icon className="h-10 w-10 text-primary" />
                          )}
                          {/* Mobile: nút xem chi tiết nổi trên ảnh (hàng nút bên dưới chỉ còn CTA) */}
                          <Button variant="outline" size="icon" className="absolute right-2 top-2 h-8 w-8 bg-card sm:hidden" title={t("addons.detail")}
                            onClick={() => openDetailModal("hardware", hw.key, hw.name, (hw.buyPrice ?? hw.rentValue) ?? 0, showRentOnly, contact, hw.detail)}>
                            <Info className="h-4 w-4" />
                          </Button>
                        </div>
                        {/* Thông tin */}
                        <div className="flex min-w-0 flex-1 flex-col p-4">
                          <h4 className="font-bold leading-snug text-foreground line-clamp-2">{hw.name}</h4>
                          {hw.description && <p className="mt-1 text-xs text-muted-foreground line-clamp-3">{hw.description}</p>}
                          <div className="mt-auto pt-3">
                            {contact ? (
                              <p className="mb-2 text-lg font-bold text-primary">{t("plans.contact")}</p>
                            ) : (
                              <div className="mb-2">
                                {priceOrig != null && <p className="text-xs text-muted-foreground line-through">{formatPrice(priceOrig)}₫</p>}
                                <p className="text-xl font-bold leading-tight text-primary">
                                  {formatPrice(price ?? 0)}₫
                                  {unit && <span className="ml-1 text-xs font-normal text-muted-foreground">{unit}</span>}
                                </p>
                              </div>
                            )}
                            <div className="flex gap-2">
                              <Button variant="outline" size="icon" className="hidden flex-none sm:inline-flex" title={t("addons.detail")}
                                onClick={() => openDetailModal("hardware", hw.key, hw.name, (hw.buyPrice ?? hw.rentValue) ?? 0, showRentOnly, contact, hw.detail)}>
                                <Info className="h-4 w-4" />
                              </Button>
                              {contact ? (
                                <Button asChild className="flex-1"><Link to="/contact">{t("plans.contact")}</Link></Button>
                              ) : (
                                <Button className="flex-1" title={t("cart.addToCart") || "Add to Cart"} onClick={() => handleAddHardwareToCart(hw, showRentOnly)}>
                                  <ShoppingCart className="h-4 w-4" />
                                  <span className="ml-2 sm:hidden">{t("cart.addToCart") || "Add to Cart"}</span>
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </HardwareCarousel>
              </div>

              {/* Thanh cam kết */}
              <div className="max-w-6xl mx-auto mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 rounded-2xl border border-border bg-card p-5 md:p-6 shadow-sm">
                {(HW_TRUST[language] || HW_TRUST.vi).map((it) => (
                  <div key={it.title} className="flex items-center gap-3">
                    <div className="h-10 w-10 flex-none rounded-lg bg-primary/10 flex items-center justify-center">
                      <it.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">{it.title}</p>
                      <p className="text-xs text-muted-foreground">{it.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Cost estimator CTA */}
      {/* <section className="px-4 pb-20">
        <div className="container mx-auto">
          <div className="rounded-2xl border border-border bg-muted/40 p-10 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{t("costEstimator.title")}</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">{t("costEstimator.subtitle")}</p>
            <Link to="/cost-estimator"><Button size="lg">{t("costEstimator.cta")}</Button></Link>
          </div>
        </div>
      </section> */}

      {/* FAQ */}
      {faqArray.length > 0 && (
        <section className="py-14 md:py-20 px-4">
          <div className="container mx-auto max-w-3xl">
            <div className="text-center mb-8 md:mb-12">
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
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-sm sm:max-w-none mx-auto">
            <CtaLink url={cta?.primaryUrl}>
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">{cta?.primary || t("cta.freeTrial")}</Button>
            </CtaLink>
            <CtaLink url={cta?.secondaryUrl}>
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">{cta?.secondary || t("cta.contactConsult")}</Button>
            </CtaLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Price;
