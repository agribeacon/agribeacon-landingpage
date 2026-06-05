import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import MapComponent from "@/components/Map";
import { useSimpleLanguage } from "@/contexts/SimpleLanguageContext";

const Contact = () => {
  const { toast } = useToast();
  const { t } = useSimpleLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    farmSize: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t('contact.form.success.title'),
      description: t('contact.form.success.description'),
    });
    setFormData({ name: "", email: "", phone: "", farmSize: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t('contact.title')}
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">{t('contact.form.title')}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t('contact.form.name')} *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder={t('contact.form.name.placeholder')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t('contact.form.email')} *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder={t('contact.form.email.placeholder')}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t('contact.form.phone')}</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={t('contact.form.phone.placeholder')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="farmSize">{t('contact.form.farmSize')}</Label>
                      <Input
                        id="farmSize"
                        name="farmSize"
                        value={formData.farmSize}
                        onChange={handleChange}
                        placeholder={t('contact.form.farmSize.placeholder')}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{t('contact.form.message')} *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder={t('contact.form.message.placeholder')}
                      rows={6}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-glow group"
                  >
                    {t('contact.form.submit')}
                    <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-gradient-to-br from-primary to-secondary p-3 rounded-lg">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{t('contact.info.email')}</h3>
                    <a
                      href="mailto:info@agribeacon.tech"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      info@agribeacon.tech
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-gradient-to-br from-primary to-secondary p-3 rounded-lg">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{t('contact.info.phone')}</h3>
                    <a
                      href="tel:+84962709987"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      +84 962 709 987
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-primary to-secondary p-3 rounded-lg">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{t('contact.info.location')}</h3>
                    <p className="text-muted-foreground">
                      KĐT Geleximco, Hoài Đức
                      <br />
                      Hà Nội, Việt Nam
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary to-secondary border-0 text-white shadow-tech">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">{t('contact.support.title')}</h3>
                <div className="space-y-2 text-white/90">
                  <p>{t('contact.support.weekday')}</p>
                  <p>{t('contact.support.saturday')}</p>
                  <p>{t('contact.support.sunday')}</p>
                </div>
                <p className="text-sm text-white/80 mt-4">
                  {t('contact.support.urgent')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <MapComponent />
        </div>
      </div>
    </div>
  );
};

export default Contact;
