import { useNavigate } from "react-router-dom";
import { useSimpleLanguage } from "@/contexts/SimpleLanguageContext";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, Package, Plane, Bot, Sprout, Droplets, Radio, BarChart3, TreePine, MapPinned, LucideIcon, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("vi-VN").format(price);

const productIconMap: Record<string, LucideIcon> = {
  drone: Plane,
  robot: Bot,
  soilSensor: Sprout,
  waterSensor: Droplets,
  rtk: Radio,
  aiAnalytics: BarChart3,
  aiAssistant: Bot,
  buyTree: TreePine,
  vector: MapPinned,
};

const typeIconMap: Record<string, LucideIcon> = {
  plan: CreditCard,
  addon: Package,
  hardware: Package,
};

const getItemIcon = (item: { type: string; metadata?: { key?: string } }): LucideIcon => {
  if (item.metadata?.key && productIconMap[item.metadata.key]) {
    return productIconMap[item.metadata.key];
  }
  return typeIconMap[item.type] || Package;
};

const Cart = () => {
  const navigate = useNavigate();
  const { t } = useSimpleLanguage();
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background pt-32">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto text-center">
            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-3">
              {t("cart.emptyTitle")}
            </h1>
            <p className="text-muted-foreground mb-8">
              {t("cart.emptyDescription")}
            </p>
            <Button onClick={() => navigate("/price")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("cart.continueShopping")}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const getTypeBadge = (type: string) => {
    const labels: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
      plan: { label: t("cart.typePlan"), variant: "default" },
      addon: { label: t("cart.typeAddon"), variant: "secondary" },
      hardware: { label: t("cart.typeHardware"), variant: "outline" },
    };
    return labels[type] || { label: type, variant: "outline" as const };
  };

  return (
    <div className="min-h-screen bg-background pt-32">
      <div className="container mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <ShoppingCart className="h-8 w-8" />
              {t("cart.title")}
            </h1>
            <p className="text-muted-foreground mt-1">
              {t("cart.itemCount").replace("{count}", String(items.length))}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate("/price")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("cart.continueShopping")}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const badge = getTypeBadge(item.type);
              return (
                <Card key={item.id} className="border-border">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      {/* Product Icon */}
                      {(() => {
                        const Icon = getItemIcon(item);
                        return (
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                        );
                      })()}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant={badge.variant} className="text-xs">
                            {badge.label}
                          </Badge>
                          {item.billing && (
                            <Badge variant="outline" className="text-xs">
                              {item.billing === "yearly" ? t("cart.yearly") : t("cart.monthly")}
                            </Badge>
                          )}
                          {item.metadata?.isRental && (
                            <Badge className="text-xs bg-amber-100 text-amber-800 hover:bg-amber-100">
                              {t("cart.rental")}
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-semibold text-foreground truncate">{item.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {formatPrice(item.price)}₫
                          {item.billing && (
                            <span>/{item.billing === "yearly" ? t("cart.year") : t("cart.month")}</span>
                          )}
                        </p>
                      </div>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-3">
                        {item.type === "hardware" && (
                          <div className="flex items-center gap-1.5 border border-border rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                              className="p-1.5 hover:bg-muted rounded-l-lg transition-colors"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="text-sm font-medium w-8 text-center">
                              {item.quantity || 1}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                              className="p-1.5 hover:bg-muted rounded-r-lg transition-colors"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        )}

                        <div className="text-right min-w-[120px]">
                          <p className="font-bold text-foreground">
                            {formatPrice(item.price * (item.quantity || 1))}₫
                          </p>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {/* Clear cart */}
            <div className="flex justify-end">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive" onClick={clearCart}>
                <Trash2 className="h-4 w-4 mr-2" />
                {t("cart.clearAll")}
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border-border sticky top-32">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  {t("cart.orderSummary")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground truncate max-w-[180px]">
                      {item.name} {(item.quantity || 1) > 1 && `×${item.quantity}`}
                    </span>
                    <span className="text-foreground font-medium">
                      {formatPrice(item.price * (item.quantity || 1))}₫
                    </span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span className="text-foreground">{t("cart.total")}</span>
                  <span className="text-primary">{formatPrice(totalPrice)}₫</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {t("cart.taxNote")}
                </p>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <Button className="w-full" size="lg" onClick={() => navigate("/contact")}>
                  {t("cart.checkout")}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  {t("cart.checkoutNote")}
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
