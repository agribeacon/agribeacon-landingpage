import { Monitor, Smartphone, Map, Users, Warehouse, BarChart3, CalendarDays, ShoppingCart, Wifi } from "lucide-react";
import { useSimpleLanguage } from "@/contexts/SimpleLanguageContext";
import farmOsHero from "@/assets/farm-os-card.jpg";

const FarmOS = () => {
  const { t } = useSimpleLanguage();

  const modules = [
    { icon: Map, title: t("farmOs.mod1Title"), desc: t("farmOs.mod1Desc") },
    { icon: CalendarDays, title: t("farmOs.mod2Title"), desc: t("farmOs.mod2Desc") },
    { icon: Users, title: t("farmOs.mod3Title"), desc: t("farmOs.mod3Desc") },
    { icon: Warehouse, title: t("farmOs.mod4Title"), desc: t("farmOs.mod4Desc") },
    { icon: ShoppingCart, title: t("farmOs.mod5Title"), desc: t("farmOs.mod5Desc") },
    { icon: Wifi, title: t("farmOs.mod6Title"), desc: t("farmOs.mod6Desc") },
    { icon: BarChart3, title: t("farmOs.mod7Title"), desc: t("farmOs.mod7Desc") },
  ];

  const farmModels = [
    { label: t("farmOs.model1Label"), desc: t("farmOs.model1Desc") },
    { label: t("farmOs.model2Label"), desc: t("farmOs.model2Desc") },
    { label: t("farmOs.model3Label"), desc: t("farmOs.model3Desc") },
  ];

  return (
    <div className="min-h-screen bg-background pt-32">
      {/* Hero */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
              {t("farmOs.badge")}
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-4 leading-tight">
              {t("farmOs.heroTitle")}
              <span className="text-primary">{t("farmOs.heroHighlight")}</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("farmOs.heroDesc")}
            </p>
            <div className="flex items-center gap-3 mt-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                <Monitor size={14} /> Web
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                <Smartphone size={14} /> iOS & Android
              </span>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-border">
            <img src={farmOsHero} alt="Farm Management OS" className="w-full" />
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-2 text-center">
            {t("farmOs.modulesTitle")}
          </h2>
          <p className="text-muted-foreground text-center mb-10">{t("farmOs.modulesSub")}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {modules.map((m) => {
              const Icon = m.icon;
              return (
                <div
                  key={String(m.title)}
                  className="bg-card rounded-xl border border-border p-6 hover:border-primary/40 hover:shadow-md transition-all"
                >
                  <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center mb-4">
                    <Icon size={20} className="text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{m.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Farm Models */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            {t("farmOs.modelsTitle")}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {farmModels.map((f) => (
              <div
                key={String(f.label)}
                className="bg-card rounded-xl border border-border p-6 text-center hover:border-primary/40 hover:shadow-md transition-all"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">{f.label}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FarmOS;
