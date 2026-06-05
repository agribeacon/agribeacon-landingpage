import { Wifi, Thermometer, Droplets, Wind, Cpu } from "lucide-react";
import { useSimpleLanguage } from "@/contexts/SimpleLanguageContext";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import iotHero from "@/assets/iot-solution.jpg";

const IoT = () => {
  const { t } = useSimpleLanguage();

  const sensorData = [
    { label: "Soil pH", value: "6.2", status: "normal", icon: Droplets },
    { label: "Temperature", value: "28°C", status: "normal", icon: Thermometer },
    { label: "Humidity", value: "72%", status: "normal", icon: Wind },
    { label: "N-P-K", value: "15-8-12", status: "warning", icon: Wifi },
  ];

  const pipeline = [
    { icon: Wifi, label: t("iot.pipe1Label"), sub: t("iot.pipe1Sub") },
    { icon: Cpu, label: t("iot.pipe2Label"), sub: t("iot.pipe2Sub") },
    { icon: Droplets, label: t("iot.pipe3Label"), sub: t("iot.pipe3Sub") },
  ];

  const specs = [
    { q: t("iot.soilQ"), a: t("iot.soilA") },
    { q: t("iot.waterQ"), a: t("iot.waterA") },
    { q: t("iot.weatherQ"), a: t("iot.weatherA") },
    { q: t("iot.connectQ"), a: t("iot.connectA") },
  ];

  return (
    <div className="min-h-screen bg-background pt-32">
      {/* Hero */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
              {t("iot.badge")}
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-4 leading-tight">
              {t("iot.heroTitle")}
              <span className="text-primary">{t("iot.heroHighlight")}</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("iot.heroDesc")}
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-border">
            <img src={iotHero} alt="IoT Sensors" className="w-full" />
          </div>
        </div>
      </section>

      {/* Live Dashboard */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            {t("iot.dashTitle")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {sensorData.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="bg-card rounded-xl border border-border p-5 text-center hover:border-primary/40 hover:shadow-md transition-all"
                >
                  <Icon size={24} className="mx-auto text-primary mb-2" />
                  <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
                  <p className="text-xl font-bold text-foreground">{s.value}</p>
                  <span
                    className={`inline-block mt-2 text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      s.status === "normal"
                        ? "bg-primary/10 text-primary"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {s.status === "normal" ? t("iot.normal") : t("iot.attention")}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Pipeline */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            {t("iot.insightTitle")}
          </h2>
          <div className="max-w-2xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6">
            {pipeline.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="flex items-center gap-6">
                  <div className="text-center bg-card rounded-xl border border-border p-5 min-w-[150px] hover:border-primary/40 hover:shadow-md transition-all">
                    <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center mx-auto mb-3">
                      <Icon size={20} className="text-primary-foreground" />
                    </div>
                    <p className="font-semibold text-sm text-foreground">{s.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
                  </div>
                  {i < 2 && (
                    <span className="text-muted-foreground text-xl hidden md:block">→</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Specs Accordion */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            {t("iot.specsTitle")}
          </h2>
          <Accordion type="single" collapsible className="space-y-2">
            {specs.map((spec) => (
              <AccordionItem
                key={String(spec.q)}
                value={String(spec.q)}
                className="bg-card rounded-lg border border-border px-4"
              >
                <AccordionTrigger className="text-sm font-medium text-foreground">
                  {spec.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {spec.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
};

export default IoT;
