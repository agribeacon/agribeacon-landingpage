import { MapPin, ScanSearch, BarChart3, Navigation, Camera, Bot, RotateCcw, Gauge } from "lucide-react";
import { useSimpleLanguage } from "@/contexts/SimpleLanguageContext";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import uavHero from "@/assets/uav-rtk-monitoring.jpg";

const UAV = () => {
  const { t } = useSimpleLanguage();

  const workflowCards = [
    { icon: Navigation, title: t("uav.card1Title"), desc: t("uav.card1Desc"), step: "01" },
    { icon: ScanSearch, title: t("uav.card2Title"), desc: t("uav.card2Desc"), step: "02" },
    { icon: BarChart3, title: t("uav.card3Title"), desc: t("uav.card3Desc"), step: "03" },
  ];

  const specs = [
    { icon: MapPin, q: t("uav.positioningQ"), a: t("uav.positioningA") },
    { icon: Camera, q: t("uav.cameraQ"), a: t("uav.cameraA") },
    { icon: Bot, q: t("uav.autonomyQ"), a: t("uav.autonomyA") },
    { icon: Gauge, q: t("uav.coverageQ"), a: t("uav.coverageA") },
    { icon: RotateCcw, q: t("uav.flightQ"), a: t("uav.flightA") },
  ];

  return (
    <div className="min-h-screen bg-background pt-32">
      {/* Hero */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase text-primary bg-primary/10 px-3 py-1.5 rounded-full">
              {t("uav.badge")}
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mt-6 mb-5 leading-tight tracking-tight">
              <span className="text-primary">UAV</span> — {t("uav.heroTitle").toString().replace("UAV — ", "")}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              {t("uav.heroDesc")}
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-border">
            <img src={uavHero} alt="RTK-Precision UAV" className="w-full" />
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <p className="text-center text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
            {t("uav.howItWorks")}
          </p>
          <h2 className="text-2xl font-bold text-foreground mb-12 text-center tracking-tight">
            {t("uav.workflowTitle")}
          </h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
            {workflowCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.step}
                  className="relative bg-card rounded-2xl border border-border p-8 hover:border-primary/40 hover:shadow-md transition-all group"
                >
                  <span className="absolute top-4 right-5 text-[3rem] font-extrabold leading-none text-muted-foreground/10 select-none">
                    {card.step}
                  </span>
                  <div className="h-11 w-11 rounded-xl bg-primary flex items-center justify-center mb-5">
                    <Icon size={20} className="text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 tracking-tight">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-2xl">
          <p className="text-center text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
            {t("uav.specsLabel")}
          </p>
          <h2 className="text-2xl font-bold text-foreground mb-10 text-center tracking-tight">
            {t("uav.specsTitle")}
          </h2>
          <Accordion type="single" collapsible className="space-y-2">
            {specs.map((spec) => {
              const Icon = spec.icon;
              return (
                <AccordionItem
                  key={String(spec.q)}
                  value={String(spec.q)}
                  className="bg-card rounded-lg border border-border px-5"
                >
                  <AccordionTrigger className="text-sm font-medium text-foreground gap-3">
                    <span className="flex items-center gap-3">
                      <Icon size={16} className="text-primary shrink-0" />
                      {spec.q}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed pl-7">
                    {spec.a}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </section>
    </div>
  );
};

export default UAV;
