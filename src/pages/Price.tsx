import { useState } from "react";
import { useSimpleLanguage } from "@/contexts/SimpleLanguageContext";
import { useCart } from "@/contexts/CartContext";
import { Check, X, Plane, Droplets, Radio, Bot, BarChart3, TreePine, Sprout, MapPinned, ShoppingCart, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ProductDetailModal } from "@/components/ProductDetailModal";
import { useToast } from "@/hooks/use-toast";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("vi-VN").format(price);

const Price = () => {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [detailModal, setDetailModal] = useState<{ open: boolean; title: string; type: string; key: string; price: number; isRental: boolean }>({
    open: false,
    title: "",
    type: "",
    key: "",
    price: 0,
    isRental: false,
  });
  const { t } = useSimpleLanguage();
  const { addItem } = useCart();
  const { toast } = useToast();
  const yearlyDiscount = 0.8;

  const planKeys = ["starter", "professional", "business", "enterprise"] as const;
  const planPrices = [0, -1, -1, -1];
  const planPopular = [false, true, false, false];
  const planCtaVariants = ["outline", "default", "outline", "outline"] as const;

  const addonConfigs = [
    { icon: BarChart3, key: "aiAnalytics", price: 120000, useFormatted: false, priceSuffixKey: "addons.aiAnalytics.priceSuffix" },
    { icon: Bot, key: "aiAssistant", price: 130000, useFormatted: true, priceSuffixKey: "" },
    { icon: TreePine, key: "buyTree", price: 0, useFormatted: true, priceSuffixKey: "" },
    { icon: MapPinned, key: "vector", price: 0, useFormatted: true, priceSuffixKey: "addons.vector.priceSuffix" },
  ];

  const hwConfigs = [
    { icon: Plane, key: "drone", buyPrice: 62000000, rentPrice: null },
    { icon: Bot, key: "robot", buyPrice: 136000000, rentPrice: 9900000 },
    { icon: Sprout, key: "soilSensor", buyPrice: 4200000, rentPrice: null },
    { icon: Droplets, key: "waterSensor", buyPrice: 16000000, rentPrice: null },
    { icon: Radio, key: "rtk", buyPrice: 25000000, rentPrice: null },
  ];

  const comparisonData = [
    { category: t("comparison.categories.scaleAndLimits") },
    { feature: t("comparison.features.organization"), values: [t("comparison.values.org1"), t("comparison.values.org1"), t("comparison.values.org2"), t("comparison.unlimited")] },
    { feature: t("comparison.features.farmCount"), values: [t("comparison.values.farm1"), t("comparison.values.farm2"), t("comparison.values.farm5perOrg"), t("comparison.unlimited")] },
    { feature: t("comparison.features.area"), values: [t("comparison.values.areaStarter"), t("comparison.values.areaPro"), t("comparison.values.areaBusiness"), t("comparison.values.areaEnterprise")] },
    { feature: t("comparison.features.storage"), values: [t("comparison.values.storage500mb"), t("comparison.values.storage5gb"), t("comparison.values.storage20gb"), t("comparison.unlimited")] },
    { feature: t("comparison.features.aiAssistant"), values: [t("comparison.values.ai20"), t("comparison.values.ai100"), t("comparison.values.ai500"), t("comparison.unlimited")] },

    { category: t("comparison.categories.dashboardPlanning") },
    { feature: t("comparison.features.farmDashboard"), values: [true, true, true, true] },
    { feature: t("comparison.features.gisView"), values: [true, true, true, true] },
    { feature: t("comparison.features.gisEdit"), values: [false, true, true, true] },
    { feature: t("comparison.features.gisSpatial"), values: [false, false, true, true] },

    { category: t("comparison.categories.cropManagement") },
    { feature: t("comparison.features.zones"), values: [true, true, true, true] },
    { feature: t("comparison.features.soilNutrition"), values: [true, true, true, true] },
    { feature: t("comparison.features.labData"), values: [true, true, true, true] },
    { feature: t("comparison.features.waterSource"), values: [true, true, true, true] },

    { category: t("comparison.categories.tasksRecommendations") },
    { feature: t("comparison.features.dailyTasks"), values: [true, true, true, true] },
    { feature: t("comparison.features.recommendations"), values: [true, true, true, true] },

    { category: t("comparison.categories.inventoryPurchasing") },
    { feature: t("comparison.features.consumables"), values: [false, true, true, true] },
    { feature: t("comparison.features.warehouseManagement"), values: [false, true, true, true] },
    { feature: t("comparison.features.purchasing"), values: [false, true, true, true] },

    { category: t("comparison.categories.laborFinance") },
    { feature: t("comparison.features.laborManagement"), values: [false, true, true, true] },
    { feature: t("comparison.features.incomeExpense"), values: [false, true, true, true] },

    { category: t("comparison.categories.productionSales") },
    { feature: t("comparison.features.seasonManagement"), values: [false, false, true, true] },
    { feature: t("comparison.features.harvestManagement"), values: [false, false, true, true] },
    { feature: t("comparison.features.retailTreeList"), values: [false, false, true, true] },
    { feature: t("comparison.features.retailB2C"), values: [false, false, true, true] },
    { feature: t("comparison.features.wholesaleB2B"), values: [false, false, true, true] },
    { feature: t("comparison.features.crm"), values: [false, false, true, true] },

    { category: t("comparison.categories.finance") },
    { feature: t("comparison.features.cashFund"), values: [false, false, true, true] },
    { feature: t("comparison.features.farmBudget"), values: [false, false, true, true] },
    { feature: t("comparison.features.paymentRequest"), values: [false, false, true, true] },
    { feature: t("comparison.features.advanceList"), values: [false, false, true, true] },

    { category: t("comparison.categories.hrAssets") },
    { feature: t("comparison.features.hrProfile"), values: [false, false, false, true] },
    { feature: t("comparison.features.attendanceSummary"), values: [false, false, false, true] },
    { feature: t("comparison.features.overtimeSummary"), values: [false, false, false, true] },
    { feature: t("comparison.features.leaveSummary"), values: [false, false, false, true] },
    { feature: t("comparison.features.payrollSheet"), values: [false, false, false, true] },
    { feature: t("comparison.features.paymentHistory"), values: [false, false, false, true] },
    { feature: t("comparison.features.assetManagement"), values: [false, false, false, true] },

    { category: t("comparison.categories.reports") },
    { feature: t("comparison.features.inventoryReport"), values: [false, true, true, true] },
    { feature: t("comparison.features.soilQualityReport"), values: [false, true, true, true] },
    { feature: t("comparison.features.waterQualityReport"), values: [false, true, true, true] },
    { feature: t("comparison.features.incomeExpenseReport"), values: [false, true, true, true] },
    { feature: t("comparison.features.operatingCostReport"), values: [false, false, true, true] },
    { feature: t("comparison.features.customReport"), values: [false, false, false, true] },

    { category: t("comparison.categories.settings") },
    { feature: t("comparison.features.unitDeclaration"), values: [true, true, true, true] },
    { feature: t("comparison.features.cropVariety"), values: [true, true, true, true] },
    { feature: t("comparison.features.userPermissions"), values: [true, true, true, true] },
    { feature: t("comparison.features.warehouseDeclaration"), values: [false, true, true, true] },
    { feature: t("comparison.features.recommendationApproval"), values: [false, true, true, true] },
    { feature: t("comparison.features.purchaseApproval"), values: [false, true, true, true] },
    { feature: t("comparison.features.taskPricing"), values: [false, true, true, true] },
    { feature: t("comparison.features.shiftConfig"), values: [false, true, true, true] },
    { feature: t("comparison.features.harvestQuality"), values: [false, false, true, true] },
    { feature: t("comparison.features.assetTypeConfig"), values: [false, false, false, true] },

    { category: t("comparison.categories.integrationData") },
    { feature: t("comparison.features.dataSync"), values: [false, true, true, true] },
    { feature: t("comparison.features.apiIntegration"), values: [false, true, true, true] },
  ];

  const faqItems = t("faq.items");
  const faqArray: Array<{ q: string; a: string }> = Array.isArray(faqItems) ? faqItems : [];

  const handleAddPlanToCart = (planKey: string, price: number) => {
    addItem({
      id: `plan-${planKey}-${billing}`,
      type: 'plan',
      name: t(`plans.${planKey}.name`),
      price: billing === 'yearly' ? Math.round(price * yearlyDiscount) : price,
      billing,
      metadata: { key: planKey },
    });
    toast({
      title: t('cart.added') || 'Added to cart',
      description: `${t(`plans.${planKey}.name`)} (${billing === 'yearly' ? t('hero.yearly') : t('hero.monthly')})`,
      duration: 2000,
    });
  };

  const handleAddAddonToCart = (addonKey: string, price: number) => {
    addItem({
      id: `addon-${addonKey}-${billing}`,
      type: 'addon',
      name: t(`addons.${addonKey}.name`),
      price: billing === 'yearly' ? Math.round(price * yearlyDiscount) : price,
      billing,
      metadata: { key: addonKey },
    });
    toast({
      title: t('cart.added') || 'Added to cart',
      description: t(`addons.${addonKey}.name`),
      duration: 2000,
    });
  };

  const handleAddHardwareToCart = (hwKey: string, price: number, isRental: boolean = false) => {
    addItem({
      id: `hardware-${hwKey}-${isRental ? 'rent' : 'buy'}-${isRental ? billing : 'onetime'}`,
      type: 'hardware',
      name: t(`hardware.${hwKey}.name`),
      price: isRental && billing === 'yearly' ? Math.round(price * yearlyDiscount) : price,
      billing: isRental ? billing : undefined,
      metadata: { key: hwKey, isRental },
    });
    toast({
      title: t('cart.added') || 'Added to cart',
      description: `${t(`hardware.${hwKey}.name`)} (${isRental ? (billing === 'yearly' ? t('hero.yearly') : t('hero.monthly')) : t('hardware.buyOutright')})`,
      duration: 2000,
    });
  };

  const openDetailModal = (type: string, key: string, title: string, price: number = 0, isRental: boolean = false) => {
    setDetailModal({ open: true, type, key, title, price, isRental });
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
        priceLabel={detailModal.price > 0 ? `${detailModal.type === 'hardware' ? t('hardware.fromPrice') + ' ' : ''}${formatPrice(detailModal.price)}₫${detailModal.isRental ? (billing === 'yearly' ? '/' + t('cart.year') : '/' + t('cart.month')) : ''}` : undefined}
        onAddToCart={() => {
          if (detailModal.type === 'hardware') {
            handleAddHardwareToCart(detailModal.key, detailModal.price, detailModal.isRental);
          } else {
            handleAddAddonToCart(detailModal.key, detailModal.price);
          }
        }}
      />

      {/* Hero */}
      <section className="py-16 md:py-24 text-center px-4">
        <Badge variant="secondary" className="mb-4 text-sm px-4 py-1.5">
          {t("hero.badge")}
        </Badge>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 max-w-3xl mx-auto leading-tight">
          {t("hero.titleStart")}
          <span className="text-primary">{t("hero.titleHighlight")}</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
          {t("hero.subtitle")}
        </p>

        <div className="inline-flex items-center gap-1 bg-muted rounded-full p-1">
          <button
            onClick={() => setBilling("monthly")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              billing === "monthly"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t("hero.monthly")}
          </button>
          <button
            onClick={() => setBilling("yearly")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              billing === "yearly"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t("hero.yearly")}
            <span className="ml-1.5 text-xs opacity-80">{t("hero.yearlyDiscount")}</span>
          </button>
        </div>
      </section>

      {/* SaaS Plans - EXACT COPY FROM PROJECT 2 */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {planKeys.map((key, idx) => {
            const price = planPrices[idx];
            const popular = planPopular[idx];
            const features = t(`plans.${key}.features`);
            const featuresArray = Array.isArray(features) ? features : [];
            const excludedFeatures = t(`plans.${key}.excludedFeatures`);
            const excludedArray = Array.isArray(excludedFeatures) ? excludedFeatures : [];

            return (
              <Card
                key={key}
                className={`relative flex flex-col ${
                  popular
                    ? "border-primary shadow-lg shadow-primary/10 scale-[1.02]"
                    : "border-border"
                }`}
              >
                {popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground shadow-sm">
                      {t("plans.popular")}
                    </Badge>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{t(`plans.${key}.name`)}</CardTitle>
                    <Badge variant="outline" className="text-xs font-normal">
                      {t(`plans.${key}.subtitle`)}
                    </Badge>
                  </div>
                  <CardDescription>{t(`plans.${key}.description`)}</CardDescription>
                  <div className="pt-3">
                    {price === 0 ? (
                      <span className="text-3xl font-bold text-foreground">{t("plans.free")}</span>
                    ) : price === -1 ? (
                      <span className="text-3xl font-bold text-foreground">{t("plans.contact")}</span>
                    ) : (
                      <div>
                        <span className="text-3xl font-bold text-foreground">
                          {formatPrice(
                            billing === "yearly"
                              ? Math.round(price * yearlyDiscount)
                              : price
                          )}
                          ₫
                        </span>
                        <span className="text-sm text-muted-foreground">{t("plans.perMonth")}</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2.5">
                    {featuresArray.map((text: string) => (
                      <li key={text} className="flex items-start gap-2.5 text-sm">
                        <Check className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                        <span className="text-foreground">{text}</span>
                      </li>
                    ))}
                    {excludedArray.map((text: string) => (
                      <li key={text} className="flex items-start gap-2.5 text-sm">
                        <Check className="h-4 w-4 mt-0.5 shrink-0 text-border" />
                        <span className="text-muted-foreground/50 line-through">{text}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    variant={planCtaVariants[idx]}
                    className="w-full"
                    onClick={() => handleAddPlanToCart(key, price)}
                    disabled={price === -1}
                  >
                    {price === -1 ? t(`plans.${key}.cta`) : (
                      <>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {t('cart.addToCart') || 'Add to Cart'}
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-3">{t("comparison.badge")}</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {t("comparison.title")}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {t("comparison.subtitle")}
            </p>
          </div>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/60">
                  <th className="text-left py-4 px-5 font-semibold text-foreground min-w-[220px]">{t("comparison.title")}</th>
                  {planKeys.map((key) => (
                    <th key={key} className="text-center py-4 px-4 font-semibold text-foreground min-w-[130px]">
                      {t(`plans.${key}.name`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => {
                  if ("category" in row && !("feature" in row)) {
                    return (
                      <tr key={i} className="bg-muted/30 border-t border-border">
                        <td colSpan={5} className="py-3 px-5 font-semibold text-foreground text-xs uppercase tracking-wider">
                          {row.category}
                        </td>
                      </tr>
                    );
                  }
                  return (
                    <tr key={i} className="border-t border-border hover:bg-muted/20 transition-colors">
                      <td className="py-3 px-5 text-foreground">{"feature" in row ? String(row.feature) : ""}</td>
                      {("values" in row && Array.isArray(row.values)) && row.values.map((val: string | boolean, j: number) => (
                        <td key={j} className="text-center py-3 px-4">
                          {val === true ? (
                            <Check className="h-4 w-4 text-primary mx-auto" />
                          ) : val === false ? (
                            <X className="h-4 w-4 text-muted-foreground/30 mx-auto" />
                          ) : (
                            <span className="text-xs text-muted-foreground font-medium">{val}</span>
                          )}
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {t("addons.title")}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {t("addons.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {addonConfigs.map((addon) => {
              return (
                <Card key={addon.key} className="border-border hover:border-primary/40 transition-colors flex flex-col h-full">
                  <CardHeader className="pb-3">
                    <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center mb-2">
                      <addon.icon className="h-5 w-5 text-accent-foreground" />
                    </div>
                    <CardTitle className="text-base">{t(`addons.${addon.key}.name`)}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm text-muted-foreground">{t(`addons.${addon.key}.description`)}</p>
                  </CardContent>
                  <CardFooter className="flex gap-2 mt-auto">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => openDetailModal('addon', addon.key, t(`addons.${addon.key}.name`), addon.price)}
                    >
                      {t("addons.detail")}
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleAddAddonToCart(addon.key, addon.price)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {t('cart.addToCart') || 'Add to Cart'}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hardware */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-3">{t("hardware.badge")}</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {t("hardware.title")}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {t("hardware.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {hwConfigs.map((hw) => {
              const specs = t(`hardware.${hw.key}.specs`);
              const specsArray = Array.isArray(specs) ? specs : [];
              return (
                <Card key={hw.key} className="border-border hover:border-primary/40 transition-colors flex flex-col h-full">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                      <hw.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-base">{t(`hardware.${hw.key}.name`)}</CardTitle>
                    <CardDescription>{t(`hardware.${hw.key}.description`)}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {specsArray.map((spec: string) => (
                        <Badge key={spec} variant="secondary" className="text-xs font-normal">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                    <div className="space-y-3">
                      {/* Buy outright option */}
                      <div className="rounded-lg border border-border bg-muted/40 p-3">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-medium text-foreground">{t("hardware.buyOutright")}</p>
                            <p className="text-xs text-muted-foreground">{t("hardware.buyDesc")}</p>
                          </div>
                          <div className="flex flex-col gap-1.5 shrink-0">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => openDetailModal('hardware', hw.key, String(t(`hardware.${hw.key}.name`)), hw.buyPrice, false)}
                            >
                              <Info className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => handleAddHardwareToCart(hw.key, hw.buyPrice, false)}
                            >
                              <ShoppingCart className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Rent bundle option */}
                      {hw.rentPrice && (
                        <div className="rounded-lg border border-primary/30 bg-accent p-3">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-medium text-foreground">{t("hardware.rentBundle")}</p>
                                <Badge className="text-[10px]">{t("hardware.rentBadge")}</Badge>
                              </div>
                              <p className="text-xs text-muted-foreground">{t("hardware.rentDesc")}</p>
                            </div>
                            <div className="flex flex-col gap-1.5 shrink-0">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => openDetailModal('hardware', hw.key, String(t(`hardware.${hw.key}.name`)), hw.rentPrice!, true)}
                              >
                                <Info className="h-3.5 w-3.5" />
                              </Button>
                              <Button
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => handleAddHardwareToCart(hw.key, hw.rentPrice!, true)}
                              >
                                <ShoppingCart className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faqArray.length > 0 && (
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-3">{t("faq.badge")}</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                {t("faq.title")}
              </h2>
              <p className="text-muted-foreground">
                {t("faq.subtitle")}
              </p>
            </div>
            <Accordion type="single" collapsible className="space-y-3">
              {faqArray.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-lg px-5 data-[state=open]:bg-muted/30">
                  <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-4">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("cta.title")}
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            {t("cta.subtitle")}
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button variant="secondary" size="lg">
              {t("cta.freeTrial")}
            </Button>
            <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              {t("cta.contactConsult")}
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          {t("footer.copyright")}
        </div>
      </footer>
    </div>
  );
};

export default Price;
