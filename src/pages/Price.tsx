import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useSimpleLanguage } from "@/contexts/SimpleLanguageContext";
import { useCart } from "@/contexts/CartContext";
import { Check, X, Plane, Droplets, Radio, Bot, BarChart3, TreePine, Sprout, MapPinned, Building2, Crown, ShoppingCart, Info, Loader2, type LucideIcon } from "lucide-react";
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
  priceValue: number | null; // giá bán (đã áp KM)
  priceDisplay: string;
  originalDisplay: string | null; // giá gốc gạch ngang khi có KM
  promoLabel: string;
  detail?: ProductDetailData;
}
interface HwView {
  key: string;
  icon: LucideIcon;
  name: string;
  description: string;
  specs: string[];
  buyPrice: number | null; // giá bán (đã áp KM)
  buyOriginal: number | null;
  rentValue: number | null; // giá bán (đã áp KM)
  rentOriginal: number | null;
  promoLabel: string;
  detail?: ProductDetailData;
}

// Nhãn KM: dùng promoLabel nếu có, ngược lại tính "-X%".
const promoBadge = (label: string, original: number | null, promo: number | null): string => {
  if (label) return label;
  if (original && promo && original > promo) return `-${Math.round((1 - promo / original) * 100)}%`;
  return "";
};
type ComparisonRow = { category: string } | { feature: string; values: (boolean | string)[] };

const Price = () => {
  const [billing, setBilling] = useState<BillingKey>("oneYear");
  const [detailModal, setDetailModal] = useState<{ open: boolean; title: string; type: string; key: string; price: number; isRental: boolean; detail?: ProductDetailData }>({
    open: false, title: "", type: "", key: "", price: 0, isRental: false, detail: undefined,
  });
  const { t, language } = useSimpleLanguage();
  const { catalog, loading } = usePricingCatalog(language);
  const { addItem } = useCart();
  const { toast } = useToast();

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
      const hasPromo = it.priceType === "paid" && promo != null && original != null && promo < original;
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
        promoLabel: hasPromo ? promoBadge(it.promoLabel, original, promo) : "",
      };
    });
  }, [catalog, billing]);

  // ---- Add-ons (từ catalog) ----
  const addons: AddonView[] = useMemo(() => {
    return (catalog?.items || []).filter((i) => i.kind === "addon").map((it) => {
      const original = it.prices?.[billing] ?? null;
      const promo = it.promoPrices?.[billing] ?? null;
      const hasPromo = promo != null && original != null && promo < original;
      const priceValue = hasPromo ? promo : original;
      const suffix = it.priceSuffix ? " " + it.priceSuffix : "";
      const priceDisplay = priceValue != null ? `${formatPrice(priceValue)}₫${suffix}` : (it.priceLabel || "");
      return {
        key: it.key, icon: iconFor(it.icon), name: it.name, description: it.description,
        priceValue, priceDisplay,
        originalDisplay: hasPromo ? `${formatPrice(original)}₫${suffix}` : null,
        promoLabel: hasPromo ? promoBadge(it.promoLabel, original, promo) : "",
        detail: detailFrom(it),
      };
    });
  }, [catalog, billing]);

  // ---- Hardware (từ catalog) ----
  const hardware: HwView[] = useMemo(() => {
    return (catalog?.items || []).filter((i) => i.kind === "hardware").map((it) => {
      const buyOrig = it.buyPrice ?? null;
      const buyPromo = it.buyPromoPrice ?? null;
      const hasBuyPromo = buyPromo != null && buyOrig != null && buyPromo < buyOrig;
      const rentOrig = it.rentPrices?.[billing] ?? null;
      const rentPromo = it.rentPromoPrices?.[billing] ?? null;
      const hasRentPromo = rentPromo != null && rentOrig != null && rentPromo < rentOrig;
      return {
        key: it.key, icon: iconFor(it.icon), name: it.name, description: it.description, specs: it.specs || [],
        buyPrice: hasBuyPromo ? buyPromo : buyOrig,
        buyOriginal: hasBuyPromo ? buyOrig : null,
        rentValue: hasRentPromo ? rentPromo : rentOrig,
        rentOriginal: hasRentPromo ? rentOrig : null,
        promoLabel: promoBadge(it.promoLabel, hasBuyPromo ? buyOrig : rentOrig, hasBuyPromo ? buyPromo : rentPromo),
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
          <div className="flex flex-wrap justify-center gap-5">
            {addons.map((addon) => (
              <Card key={addon.key} className="border-border hover:border-primary/40 transition-colors flex flex-col h-full w-full md:w-[calc(50%-0.625rem)] lg:w-[calc(25%-0.9375rem)]">
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
                            {hw.rentOriginal != null && <p className="text-xs text-muted-foreground line-through">{formatPrice(hw.rentOriginal)}₫</p>}
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
