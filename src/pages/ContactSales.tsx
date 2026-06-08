import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSimpleLanguage } from "@/contexts/SimpleLanguageContext";

const emptyForm = {
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  farmSize: "",
  location: "",
  cropTypes: "",
  currentChallenges: "",
  needs: "",
};

const ContactSales = () => {
  const { toast } = useToast();
  const { t } = useSimpleLanguage();
  const [formData, setFormData] = useState(emptyForm);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: "🏢 Yêu cầu Contact Sales (B2B)",
          color: 0x38bdf8,
          fields: [
            { name: "🏢 Công ty", value: formData.companyName },
            { name: "👤 Người liên hệ", value: formData.contactName },
            { name: "✉️ Email", value: formData.email },
            { name: "📞 Số điện thoại", value: formData.phone },
            { name: "🌾 Quy mô farm", value: formData.farmSize ? `${formData.farmSize} ha` : "" },
            { name: "📍 Địa điểm", value: formData.location },
            { name: "🌱 Loại cây trồng", value: formData.cropTypes },
            { name: "⚠️ Thách thức hiện tại", value: formData.currentChallenges },
            { name: "🎯 Nhu cầu cụ thể", value: formData.needs },
          ],
        }),
      });
      if (!response.ok) throw new Error("Request failed");

      toast({
        title: t("contactSales.success.title"),
        description: t("contactSales.success.description"),
      });
      setFormData(emptyForm);
    } catch {
      toast({
        title: "Gửi thất bại",
        description: "Vui lòng thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto max-w-3xl px-4">
        <Link
          to="/price"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("nav.pricing") || "Pricing"}
        </Link>

        <div className="rounded-2xl border border-border bg-card p-6 md:p-10 shadow-sm">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            {t("contactSales.title")}
          </h1>
          <p className="mt-2 text-muted-foreground">{t("contactSales.description")}</p>

          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">{t("contactSales.companyName")} *</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  placeholder={t("contactSales.companyName.placeholder")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactName">{t("contactSales.contactName")} *</Label>
                <Input
                  id="contactName"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  required
                  placeholder={t("contactSales.contactName.placeholder")}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t("contactSales.email")} *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder={t("contactSales.email.placeholder")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{t("contactSales.phone")} *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder={t("contactSales.phone.placeholder")}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="farmSize">{t("contactSales.farmSize")} *</Label>
                <Input
                  id="farmSize"
                  name="farmSize"
                  value={formData.farmSize}
                  onChange={handleChange}
                  required
                  placeholder={t("contactSales.farmSize.placeholder")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">{t("contactSales.location")} *</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder={t("contactSales.location.placeholder")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cropTypes">{t("contactSales.cropTypes")} *</Label>
              <Input
                id="cropTypes"
                name="cropTypes"
                value={formData.cropTypes}
                onChange={handleChange}
                required
                placeholder={t("contactSales.cropTypes.placeholder")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentChallenges">{t("contactSales.challenges")}</Label>
              <Textarea
                id="currentChallenges"
                name="currentChallenges"
                value={formData.currentChallenges}
                onChange={handleChange}
                placeholder={t("contactSales.challenges.placeholder")}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="needs">{t("contactSales.needs")} *</Label>
              <Textarea
                id="needs"
                name="needs"
                value={formData.needs}
                onChange={handleChange}
                required
                placeholder={t("contactSales.needs.placeholder")}
                rows={4}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={sending}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-glow group"
            >
              {t("contactSales.submit")}
              <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSales;
