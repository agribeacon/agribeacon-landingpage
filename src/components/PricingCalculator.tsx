import { useState, useMemo } from "react";
import { useSimpleLanguage } from "@/contexts/SimpleLanguageContext";
import { Calculator, Check, Plus, Minus, RotateCcw, ShoppingCart, CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("vi-VN").format(price);

// Calculator addon id (kebab) -> cart/translation key (camelCase)
const addonKeyMap: Record<string, string> = {
  "extra-site": "extraSite",
  "extra-user": "extraUser",
  "ai-1000": "ai1000",
  "ai-5000": "ai5000",
  "ai-10000": "ai10000",
  "sensor-data": "sensorData",
  "gateway-data": "gatewayData",
};

const saasPlans = [
  { id: "monitor", price: 0, farms: 1 },
  { id: "manage", price: 399000, farms: 1 },
  { id: "optimize", price: 699000, farms: 5 },
  { id: "enterprise", price: -1, farms: -1 },
];

const addonModules = [
  { id: "extra-site", price: 99000, isQueryPack: false, isRevShare: false, isPerArea: false },
  { id: "extra-user", price: 29000, isQueryPack: false, isRevShare: false, isPerArea: false },
  { id: "ai-1000", price: 99000, isQueryPack: false, isRevShare: false, isPerArea: false },
  { id: "ai-5000", price: 299000, isQueryPack: false, isRevShare: false, isPerArea: false },
  { id: "ai-10000", price: 499000, isQueryPack: false, isRevShare: false, isPerArea: false },
  { id: "sensor-data", price: 79000, isQueryPack: false, isRevShare: false, isPerArea: false },
  { id: "gateway-data", price: 199000, isQueryPack: false, isRevShare: false, isPerArea: false },
];

const hardwareItems = [
  { id: "drone", buyPrice: 62000000, rentPrice: 0, unit: "chiếc" },
  { id: "robot", buyPrice: 180000000, rentPrice: 16800000, unit: "chiếc" },
  { id: "soil-sensor", buyPrice: 4200000, rentPrice: 0, unit: "chiếc" },
  { id: "water-sensor", buyPrice: 45000000, rentPrice: 0, unit: "chiếc" },
  { id: "rtk", buyPrice: 25000000, rentPrice: 0, unit: "chiếc" },
];

const hwNameMap: Record<string, string> = {
  "drone": "drone",
  "robot": "robot",
  "soil-sensor": "soilSensor",
  "water-sensor": "waterSensor",
  "rtk": "rtk",
};

type HardwareMode = "buy" | "rent";

const PricingCalculator = () => {
  const { t } = useSimpleLanguage();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [billing, setBilling] = useState<"sixMonths" | "oneYear" | "twoYears">("sixMonths");
  const [selectedPlan, setSelectedPlan] = useState("manage");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [hardwareQty, setHardwareQty] = useState<Record<string, number>>({});
  const [hardwareMode, setHardwareMode] = useState<Record<string, HardwareMode>>({});

  const billingTerms = ["sixMonths", "oneYear", "twoYears"] as const;
  const discountMap: Record<typeof billing, number> = { sixMonths: 1, oneYear: 1, twoYears: 1 };
  const billingDiscountLabel: Record<typeof billing, string> = { sixMonths: "", oneYear: "", twoYears: "" };
  const billingMultiplier = discountMap[billing];

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const setQty = (id: string, delta: number) => {
    setHardwareQty((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const getMode = (id: string): HardwareMode => hardwareMode[id] || "buy";

  const toggleMode = (id: string, mode: HardwareMode) => {
    setHardwareMode((prev) => ({ ...prev, [id]: mode }));
  };

  const reset = () => {
    setSelectedPlan("manage");
    setSelectedAddons([]);
    setHardwareQty({});
    setHardwareMode({});
    setBilling("sixMonths");
  };

  // Push the current selection into the cart, then go to checkout.
  // Enterprise has no self-serve price, so route to the sales form instead.
  const handleStartTrial = () => {
    const plan = saasPlans.find((p) => p.id === selectedPlan);
    if (plan?.id === "enterprise") {
      navigate("/contact-sales");
      return;
    }

    if (plan && plan.price > 0) {
      addItem({
        id: `plan-${plan.id}-${billing}`,
        type: "plan",
        name: t(`plans.${plan.id}.name`),
        price: Math.round(plan.price * billingMultiplier),
        billing,
        metadata: { key: plan.id },
      });
    }

    selectedAddons.forEach((id) => {
      const addon = addonModules.find((a) => a.id === id);
      if (!addon) return;
      const key = addonKeyMap[id];
      addItem({
        id: `addon-${key}-${billing}`,
        type: "addon",
        name: t(`addons.${key}.name`),
        price: Math.round(addon.price * billingMultiplier),
        billing,
        metadata: { key },
      });
    });

    hardwareItems.forEach((hw) => {
      const qty = hardwareQty[hw.id] || 0;
      if (qty <= 0) return;
      const key = hwNameMap[hw.id];
      if (getMode(hw.id) === "rent" && hw.rentPrice > 0) {
        addItem({
          id: `hardware-${key}-rent-${billing}`,
          type: "hardware",
          name: t(`hardware.${key}.name`),
          price: Math.round(hw.rentPrice * billingMultiplier),
          billing,
          quantity: qty,
          metadata: { key, isRental: true },
        });
      } else {
        addItem({
          id: `hardware-${key}-buy-onetime`,
          type: "hardware",
          name: t(`hardware.${key}.name`),
          price: hw.buyPrice,
          quantity: qty,
          metadata: { key, isRental: false },
        });
      }
    });

    navigate("/cart");
  };

  const estimate = useMemo(() => {
    const plan = saasPlans.find((p) => p.id === selectedPlan);
    const planPrice = plan && plan.price > 0 ? Math.round(plan.price * billingMultiplier) : 0;
    const isEnterprise = selectedPlan === "enterprise";

    const addonsTotal = selectedAddons.reduce((sum, id) => {
      const addon = addonModules.find((a) => a.id === id);
      if (!addon || addon.isQueryPack || addon.isRevShare || addon.isPerArea) return sum;
      return sum + Math.round(addon.price * billingMultiplier);
    }, 0);

    const hwBuyTotal = Object.entries(hardwareQty).reduce((sum, [id, qty]) => {
      if (getMode(id) !== "buy" || qty === 0) return sum;
      const hw = hardwareItems.find((h) => h.id === id);
      return sum + (hw?.buyPrice || 0) * qty;
    }, 0);

    const hwRentTotal = Object.entries(hardwareQty).reduce((sum, [id, qty]) => {
      if (getMode(id) !== "rent" || qty === 0) return sum;
      const hw = hardwareItems.find((h) => h.id === id);
      return sum + (hw?.rentPrice || 0) * qty;
    }, 0);

    const monthlyTotal = planPrice + addonsTotal + hwRentTotal;
    const yearlyTotal = monthlyTotal * 12;
    const savingsPerMonth = billingMultiplier < 1
      ? Math.round((planPrice + addonsTotal) / billingMultiplier * (1 - billingMultiplier))
      : 0;

    return {
      planPrice,
      addonsTotal,
      hwBuyTotal,
      hwRentTotal,
      monthlyTotal,
      yearlyTotal,
      savingsPerMonth,
      isEnterprise,
    };
  }, [selectedPlan, selectedAddons, hardwareQty, hardwareMode, billing, billingMultiplier]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <Badge variant="outline" className="mb-4">
            <Calculator className="h-3 w-3 mr-1" />
            {t("costEstimator.badge")}
          </Badge>
          <h1 className="text-4xl font-bold mb-3">{t("costEstimator.calcTitle")}</h1>
          <p className="text-muted-foreground text-lg">{t("costEstimator.calcSubtitle")}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Billing Cycle */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarClock className="h-5 w-5" />
                  {t("costEstimator.billingCycle")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  {billingTerms.map((term) => (
                    <Button
                      key={term}
                      variant={billing === term ? "default" : "outline"}
                      onClick={() => setBilling(term)}
                      className="flex-1"
                    >
                      {t(`hero.${term}`)}
                      {billingDiscountLabel[term] && (
                        <Badge variant="secondary" className="ml-2">
                          {billingDiscountLabel[term]}
                        </Badge>
                      )}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* SaaS Plan Selection */}
            <Card>
              <CardHeader>
                <CardTitle>{t("costEstimator.selectPlan")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-3">
                  {saasPlans.map((plan) => (
                    <Button
                      key={plan.id}
                      variant={selectedPlan === plan.id ? "default" : "outline"}
                      onClick={() => setSelectedPlan(plan.id)}
                      className="h-auto py-4 flex-col items-start"
                    >
                      <span className="font-semibold">{t(`plans.${plan.id}.name`)}</span>
                      <span className="text-xs opacity-80">
                        {plan.price === 0
                          ? t("plans.free")
                          : plan.price === -1
                          ? t("plans.contact")
                          : `${formatPrice(Math.round(plan.price * billingMultiplier))}₫${t("plans.perMonth")}`}
                      </span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Add-on Modules */}
            <Card>
              <CardHeader>
                <CardTitle>{t("costEstimator.addonModules")}</CardTitle>
                <p className="text-sm text-muted-foreground">{t("costEstimator.addonModulesDesc")}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {addonModules.map((addon) => (
                  <div key={addon.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedAddons.includes(addon.id)}
                        onChange={() => toggleAddon(addon.id)}
                        className="h-4 w-4"
                      />
                      <div>
                        <p className="font-medium">{t(`addons.${addonKeyMap[addon.id]}.name`)}</p>
                        <p className="text-xs text-muted-foreground">{t(`addons.${addonKeyMap[addon.id]}.shortDesc`)}</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold">
                      {addon.isRevShare
                        ? t("costEstimator.fromRevenue")
                        : addon.isPerArea
                        ? t("costEstimator.fromArea")
                        : addon.isQueryPack
                        ? t(`addons.${addonKeyMap[addon.id]}.priceLabel`)
                        : `${formatPrice(Math.round(addon.price * billingMultiplier))}₫${t("plans.perMonth")}`}
                    </span>
                  </div>
                ))}

              </CardContent>
            </Card>

            {/* Hardware */}
            <Card>
              <CardHeader>
                <CardTitle>{t("costEstimator.hardwareTitle")}</CardTitle>
                <p className="text-sm text-muted-foreground">{t("costEstimator.hardwareDesc")}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {hardwareItems.map((hw) => {
                  const qty = hardwareQty[hw.id] || 0;
                  const mode = getMode(hw.id);
                  return (
                    <div key={hw.id} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{t(`hardware.${hwNameMap[hw.id]}.name`)}</p>
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="outline" onClick={() => setQty(hw.id, -1)} disabled={qty === 0}>
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center font-semibold">{qty}</span>
                          <Button size="icon" variant="outline" onClick={() => setQty(hw.id, 1)}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {qty > 0 && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant={mode === "buy" ? "default" : "outline"}
                            onClick={() => toggleMode(hw.id, "buy")}
                            className="flex-1"
                          >
                            {t("hardware.buyOutright")} - {formatPrice(hw.buyPrice)}₫
                          </Button>
                          {hw.rentPrice > 0 && (
                            <Button
                              size="sm"
                              variant={mode === "rent" ? "default" : "outline"}
                              onClick={() => toggleMode(hw.id, "rent")}
                              className="flex-1"
                            >
                              {t("hardware.rentBundle")} - {formatPrice(hw.rentPrice)}₫/tháng
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Estimate Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  {t("costEstimator.estimateTitle")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {estimate.planPrice > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>{t("costEstimator.saasPackage")}</span>
                    <span className="font-semibold">{formatPrice(estimate.planPrice)}₫</span>
                  </div>
                )}

                {estimate.addonsTotal > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>{t("costEstimator.addonsLabel")}</span>
                    <span className="font-semibold">{formatPrice(estimate.addonsTotal)}₫</span>
                  </div>
                )}

                {estimate.hwBuyTotal > 0 && (
                  <>
                    <Separator />
                    <div className="flex justify-between text-sm">
                      <span>{t("costEstimator.hardwareBuy")}</span>
                      <span className="font-semibold">{formatPrice(estimate.hwBuyTotal)}₫</span>
                    </div>
                  </>
                )}

                {estimate.hwRentTotal > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>{t("costEstimator.hardwareRent")}</span>
                    <span className="font-semibold">{formatPrice(estimate.hwRentTotal)}₫</span>
                  </div>
                )}

                <Separator />

                <div className="flex justify-between font-semibold">
                  <span>{t("costEstimator.monthlyCost")}</span>
                  <span className="text-lg">{formatPrice(estimate.monthlyTotal)}₫</span>
                </div>

                {billingMultiplier < 1 && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span>{t("costEstimator.yearlyCost")}</span>
                      <span className="font-semibold">{formatPrice(estimate.yearlyTotal)}₫</span>
                    </div>
                    {estimate.savingsPerMonth > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>{t("costEstimator.savingsPerMonth")}</span>
                        <span className="font-semibold">-{formatPrice(estimate.savingsPerMonth)}₫</span>
                      </div>
                    )}
                  </>
                )}

                {estimate.hwBuyTotal > 0 && (
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{t("costEstimator.hardwareOneTime")}</span>
                    <span>{formatPrice(estimate.hwBuyTotal)}₫</span>
                  </div>
                )}

                <Separator />

                <div className="space-y-2">
                  <Button className="w-full" onClick={handleStartTrial}>
                    {estimate.isEnterprise ? t("costEstimator.contactConsult") : t("costEstimator.startTrial")}
                  </Button>
                  <Button variant="outline" className="w-full" onClick={reset}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    {t("costEstimator.reset")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCalculator;
