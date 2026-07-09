import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useSimpleLanguage } from "@/contexts/SimpleLanguageContext";
import { useCart } from "@/contexts/CartContext";
import { Check, X, Plane, Droplets, Radio, Bot, BarChart3, TreePine, Sprout, MapPinned, Building2, Crown, ShoppingCart, Info, type LucideIcon } from "lucide-react";
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

// Hệ số giảm dùng cho FALLBACK tĩnh (khi API chưa sẵn sàng). oneYear -10%, twoYears -20%.
const FALLBACK_DISCOUNT: Record<BillingKey, number> = { oneYear: 0.9, twoYears: 0.8 };

interface PlanView {
  key: string;
  name: string;
  subtitle: string;
  description: string;
  features: string[];
  excludedFeatures: string[];
  popular: boolean;
  priceType: "free" | "contact" | "paid";
  monthly: number | null; // đã resolve theo kỳ
  ctaLabel?: string;
}
interface AddonView {
  key: string;
  icon: LucideIcon;
  name: string;
  description: string;
  priceValue: number | null;
  priceDisplay: string;
  detail?: ProductDetailData;
}
interface HwView {
  key: string;
  icon: LucideIcon;
  name: string;
  description: string;
  specs: string[];
  buyPrice: number | null;
  rentValue: number | null;
  detail?: ProductDetailData;
}
type ComparisonRow = { category: string } | { feature: string; values: (boolean | string)[] };

const Price = () => {
  const [billing, setBilling] = useState<BillingKey>("oneYear");
  const [detailModal, setDetailModal] = useState<{ open: boolean; title: string; type: string; key: string; price: number; isRental: boolean; detail?: ProductDetailData }>({
    open: false, title: "", type: "", key: "", price: 0, isRental: false, detail: undefined,
  });
  const { t, language } = useSimpleLanguage();
  const { catalog } = usePricingCatalog(language);
  const { addItem } = useCart();
  const { toast } = useToast();

  const detailFrom = (it: PricingItem): ProductDetailData | undefined => (it.detail ? (it.detail as ProductDetailData) : undefined);

  // ---- Billing terms (chỉ 1 năm / 2 năm) ----
  const terms: { key: BillingKey; label: string }[] = useMemo(() => {
    const fromCatalog = catalog?.config?.billingTerms;
    if (fromCatalog?.length) return fromCatalog.map((bt) => ({ key: bt.key, label: bt.label || t(`hero.${bt.key}`) }));
    return [{ key: "oneYear", label: t("hero.oneYear") }, { key: "twoYears", label: t("hero.twoYears") }];
  }, [catalog, t]);

  // ---- Plans ----
  const plans: PlanView[] = useMemo(() => {
    const cat = (catalog?.items || []).filter((i) => i.kind === "plan");
    if (cat.length) {
      return cat.map((it) => ({
        key: it.key,
        name: it.name,
        subtitle: it.subtitle,
        description: it.description,
        features: it.features || [],
        excludedFeatures: it.excludedFeatures || [],
        popular: it.popular,
        priceType: it.priceType,
        monthly: it.priceType === "free" ? 0 : it.priceType === "contact" ? -1 : (it.prices?.[billing] ?? null),
      }));
    }
    // FALLBACK tĩnh
    const keys = ["starter", "professional", "business", "enterprise"] as const;
    const base = [0, 599000, 2400000, -1];
    const popular = [false, true, false, false];
    return keys.map((key, idx) => {
      const b = base[idx];
      const monthly = b === 0 ? 0 : b === -1 ? -1 : Math.round(b * FALLBACK_DISCOUNT[billing]);
      const features = t(`plans.${key}.features`);
      const excluded = t(`plans.${key}.excludedFeatures`);
      return {
        key,
        name: t(`plans.${key}.name`) as string,
        subtitle: t(`plans.${key}.subtitle`) as string,
        description: t(`plans.${key}.description`) as string,
        features: Array.isArray(features) ? features : [],
        excludedFeatures: Array.isArray(excluded) ? excluded : [],
        popular: popular[idx],
        priceType: b === 0 ? "free" : b === -1 ? "contact" : "paid",
        monthly,
        ctaLabel: t(`plans.${key}.cta`) as string,
      };
    });
  }, [catalog, billing, t]);

  // ---- Add-ons ----
  const addons: AddonView[] = useMemo(() => {
    const cat = (catalog?.items || []).filter((i) => i.kind === "addon");
    if (cat.length) {
      return cat.map((it) => {
        const priceValue = it.prices?.[billing] ?? null;
        const priceDisplay = priceValue != null ? `${formatPrice(priceValue)}₫${it.priceSuffix ? " " + it.priceSuffix : ""}` : (it.priceLabel || "");
        return { key: it.key, icon: iconFor(it.icon), name: it.name, description: it.description, priceValue, priceDisplay, detail: detailFrom(it) };
      });
    }
    // FALLBACK tĩnh
    const cfgs = [
      { icon: BarChart3, key: "aiAnalytics", price: 120000, suffixKey: "addons.aiAnalytics.priceSuffix" },
      { icon: Bot, key: "aiAssistant", price: null, suffixKey: "" },
      { icon: TreePine, key: "buyTree", price: null, suffixKey: "" },
      { icon: MapPinned, key: "vector", price: null, suffixKey: "addons.vector.priceSuffix" },
    ] as const;
    return cfgs.map((c) => {
      const priceDisplay = c.price != null
        ? `${formatPrice(c.price)}₫${c.suffixKey ? " " + (t(c.suffixKey) as string) : ""}`
        : (t(`addons.${c.key}.priceLabel`) as string);
      return { key: c.key, icon: c.icon, name: t(`addons.${c.key}.name`) as string, description: t(`addons.${c.key}.description`) as string, priceValue: c.price, priceDisplay };
    });
  }, [catalog, billing, t]);

  // ---- Hardware ----
  const hardware: HwView[] = useMemo(() => {
    const cat = (catalog?.items || []).filter((i) => i.kind === "hardware");
    if (cat.length) {
      return cat.map((it) => ({
        key: it.key, icon: iconFor(it.icon), name: it.name, description: it.description,
        specs: it.specs || [], buyPrice: it.buyPrice ?? null, rentValue: it.rentPrices?.[billing] ?? null, detail: detailFrom(it),
      }));
    }
    // FALLBACK tĩnh
    const cfgs = [
      { icon: Plane, key: "drone", buyPrice: 62000000, rent: null },
      { icon: Bot, key: "robot", buyPrice: 180000000, rent: 16800000 },
      { icon: Sprout, key: "soilSensor", buyPrice: 4200000, rent: null },
      { icon: Droplets, key: "waterSensor", buyPrice: 45000000, rent: null },
      { icon: Radio, key: "rtk", buyPrice: 25000000, rent: null },
    ] as const;
    return cfgs.map((c) => {
      const specs = t(`hardware.${c.key}.specs`);
      return {
        key: c.key, icon: c.icon, name: t(`hardware.${c.key}.name`) as string, description: t(`hardware.${c.key}.description`) as string,
        specs: Array.isArray(specs) ? specs : [], buyPrice: c.buyPrice, rentValue: c.rent != null ? Math.round(c.rent * FALLBACK_DISCOUNT[billing]) : null,
      };
    });
  }, [catalog, billing, t]);

  // ---- Comparison ----
  const comparisonTitle = catalog?.config?.comparison?.title || (t("comparison.title") as string);
  const comparisonSubtitle = catalog?.config?.comparison?.subtitle || (t("comparison.subtitle") as string);
  const comparisonData: ComparisonRow[] = useMemo(() => {
    const groups = catalog?.config?.comparison?.groups;
    if (groups?.length) {
      const rows: ComparisonRow[] = [];
      for (const g of groups) {
        rows.push({ category: g.label });
        for (const r of g.rows) rows.push({ feature: r.label, values: r.values });
      }
      return rows;
    }
    // FALLBACK tĩnh
    const cat = (k: string) => ({ category: t(`comparison.categories.${k}`) as string });
    const val = (k: string) => t(`comparison.values.${k}`) as string;
    const unl = () => t("comparison.unlimited") as string;
    const f = (k: string, values: (boolean | string)[]) => ({ feature: t(`comparison.features.${k}`) as string, values });
    return [
      cat("scaleAndLimits"),
      f("organization", [val("org1"), val("org1"), val("org2"), unl()]),
      f("farmCount", [val("farm1"), val("farm2"), val("farm5perOrg"), unl()]),
      f("area", [val("areaStarter"), val("areaPro"), val("areaBusiness"), val("areaEnterprise")]),
      f("storage", [val("storage500mb"), val("storage5gb"), val("storage20gb"), unl()]),
      f("aiAssistant", [val("ai20"), val("ai100"), val("ai500"), unl()]),
      cat("dashboardPlanning"),
      f("farmDashboard", [true, true, true, true]),
      f("gisView", [true, true, true, true]),
      f("gisEdit", [false, true, true, true]),
      f("gisSpatial", [false, false, true, true]),
      cat("cropManagement"),
      f("zones", [true, true, true, true]),
      f("soilNutrition", [true, true, true, true]),
      f("labData", [true, true, true, true]),
      f("waterSource", [true, true, true, true]),
      cat("inventoryPurchasing"),
      f("consumables", [false, true, true, true]),
      f("warehouseManagement", [false, true, true, true]),
      f("purchasing", [false, true, true, true]),
      cat("integrationData"),
      f("dataSync", [false, true, true, true]),
      f("apiIntegration", [false, true, true, true]),
    ];
  }, [catalog, t]);

  // ---- FAQ ----
  const faqArray: Array<{ q: string; a: string }> = useMemo(() => {
    if (catalog?.config?.faq?.length) return catalog.config.faq;
    const items = t("faq.items");
    return Array.isArray(items) ? items : [];
  }, [catalog, t]);

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
  const handleAddHardwareToCart = (h: HwView, isRental: boolean) => {
    const price = isRental ? (h.rentValue ?? 0) : (h.buyPrice ?? 0);
    addItem({ id: `hardware-${h.key}-${isRental ? "rent" : "buy"}-${isRental ? billing : "onetime"}`, type: "hardware", name: h.name, price, billing: isRental ? billing : undefined, metadata: { key: h.key, isRental } });
    toast({ title: t("cart.added") || "Added to cart", description: `${h.name} (${isRental ? terms.find((x) => x.key === billing)?.label : t("hardware.buyOutright")})`, duration: 2000 });
  };

  const openDetailModal = (type: string, key: string, title: string, price: number, isRental: boolean, detail?: ProductDetailData) => {
    setDetailModal({ open: true, type, key, title, price, isRental, detail });
  };

  const planPriceLabel = (p: PlanView) => {
    if (p.priceType === "free" || p.monthly === 0) return <span className="text-3xl font-bold text-foreground">{t("plans.free")}</span>;
    if (p.priceType === "contact" || p.monthly === -1 || p.monthly == null) return <span className="text-3xl font-bold text-foreground">{t("plans.contact")}</span>;
    return (
      <div>
        <span className="text-3xl font-bold text-foreground">{formatPrice(p.monthly)}₫</span>
        <span className="text-sm text-muted-foreground">{t("plans.perMonth")}</span>
      </div>
    );
  };

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
        onAddToCart={() => {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map((p) => (
            <Card key={p.key} className={`relative flex flex-col ${p.popular ? "border-primary shadow-lg shadow-primary/10 scale-[1.02]" : "border-border"}`}>
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
                <Button
                  variant={p.popular ? "default" : "outline"}
                  className="w-full"
                  onClick={() => handleAddPlanToCart(p)}
                  disabled={p.priceType === "contact"}
                >
                  {p.priceType === "contact" ? (p.ctaLabel || t("plans.enterprise.cta")) : (<><ShoppingCart className="h-4 w-4 mr-2" />{t("cart.addToCart") || "Add to Cart"}</>)}
                </Button>
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
                      {row.values.map((val, j) => (
                        <td key={j} className="text-center py-3 px-4">
                          {val === true ? <Check className="h-4 w-4 text-primary mx-auto" /> : val === false ? <X className="h-4 w-4 text-muted-foreground/30 mx-auto" /> : <span className="text-xs text-muted-foreground font-medium">{val}</span>}
                        </td>
                      ))}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {addons.map((addon) => (
              <Card key={addon.key} className="border-border hover:border-primary/40 transition-colors flex flex-col h-full">
                <CardHeader className="pb-3">
                  <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center mb-2">
                    <addon.icon className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <CardTitle className="text-base">{addon.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="mb-3"><span className="text-2xl font-bold text-foreground">{addon.priceDisplay}</span></div>
                  <p className="text-sm text-muted-foreground">{addon.description}</p>
                </CardContent>
                <CardFooter className="flex gap-2 mt-auto">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => openDetailModal("addon", addon.key, addon.name, addon.priceValue ?? 0, false, addon.detail)}>{t("addons.detail")}</Button>
                  <Button size="sm" className="flex-1" onClick={() => handleAddAddonToCart(addon)}><ShoppingCart className="h-4 w-4 mr-2" />{t("cart.addToCart") || "Add to Cart"}</Button>
                </CardFooter>
              </Card>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {hardware.map((hw) => (
              <Card key={hw.key} className="border-border hover:border-primary/40 transition-colors flex flex-col h-full">
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
                            <p className="text-lg font-bold text-foreground whitespace-nowrap">{formatPrice(hw.buyPrice)}₫</p>
                            <p className="text-xs text-muted-foreground">{t("hardware.perUnit")}</p>
                          </div>
                        </div>
                        <div className="flex justify-end gap-1.5 mt-2">
                          <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => openDetailModal("hardware", hw.key, hw.name, hw.buyPrice ?? 0, false, hw.detail)}><Info className="h-3.5 w-3.5" /></Button>
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
                            <p className="text-lg font-bold text-foreground whitespace-nowrap">{formatPrice(hw.rentValue)}₫</p>
                            <p className="text-xs text-muted-foreground">{t("hardware.perUnitMonth")}</p>
                          </div>
                        </div>
                        <div className="flex justify-end gap-1.5 mt-2">
                          <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => openDetailModal("hardware", hw.key, hw.name, hw.rentValue ?? 0, true, hw.detail)}><Info className="h-3.5 w-3.5" /></Button>
                          <Button size="icon" className="h-7 w-7" onClick={() => handleAddHardwareToCart(hw, true)}><ShoppingCart className="h-3.5 w-3.5" /></Button>
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
            <Button variant="secondary" size="lg">{cta?.primary || t("cta.freeTrial")}</Button>
            <Button variant="outline" size="lg" className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">{cta?.secondary || t("cta.contactConsult")}</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Price;
