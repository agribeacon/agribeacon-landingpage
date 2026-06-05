import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSimpleLanguage } from "@/contexts/SimpleLanguageContext";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, Package, Plane, Bot, Sprout, Droplets, Radio, BarChart3, TreePine, MapPinned, LucideIcon, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

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
  const { items, removeItem, updateQuantity, clearCart } = useCart();
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const handleSend = async () => {
    if (!name.trim() || !phone.trim()) {
      toast({ title: "Vui lòng nhập đầy đủ họ tên và số điện thoại", variant: "destructive", duration: 3000 });
      return;
    }

    setSending(true);
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          items: items.map((item) => ({
            name: item.name,
            quantity: item.quantity || 1,
            billing: item.billing,
            isRental: item.metadata?.isRental ?? false,
          })),
        }),
      });

      if (!response.ok) throw new Error("Request failed");

      setModalOpen(false);
      setName("");
      setPhone("");
      clearCart();
      toast({ title: "Gửi yêu cầu thành công!", description: "Chúng tôi sẽ liên hệ bạn sớm nhất.", duration: 4000 });
    } catch {
      toast({ title: "Gửi thất bại", description: "Vui lòng thử lại sau.", variant: "destructive", duration: 3000 });
    } finally {
      setSending(false);
    }
  };

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

        <div className="space-y-4">
          {items.map((item) => {
            const badge = getTypeBadge(item.type);
            return (
              <Card key={item.id} className="border-border">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
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
                    </div>

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

          <div className="flex items-center justify-between pt-2">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive" onClick={clearCart}>
              <Trash2 className="h-4 w-4 mr-2" />
              {t("cart.clearAll")}
            </Button>
            <Button size="lg" onClick={() => setModalOpen(true)}>
              {t("cart.checkout")}
            </Button>
          </div>
        </div>
      </div>

      {/* Quote Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t("cart.checkout")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">{t("cart.name")}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={String(t("cart.namePlaceholder"))}
                className="w-full h-10 rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">{t("cart.phone")}</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={String(t("cart.phonePlaceholder"))}
                className="w-full h-10 rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalOpen(false)} disabled={sending}>
              Hủy
            </Button>
            <Button onClick={handleSend} disabled={sending}>
              {sending ? "Đang gửi..." : "Gửi"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Cart;
