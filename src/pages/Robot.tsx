import { Bot, Droplets, Scissors, Camera, Cpu, Check, X } from "lucide-react";
import { useSimpleLanguage } from "@/contexts/SimpleLanguageContext";
import robotHero from "@/assets/spraying-robot-vertical.webp";

const Robot = () => {
  const { t } = useSimpleLanguage();

  const capabilities = [
    { icon: Droplets, title: t("robot.cap1Title"), desc: t("robot.cap1Desc") },
    { icon: Scissors, title: t("robot.cap2Title"), desc: t("robot.cap2Desc") },
    { icon: Camera, title: t("robot.cap3Title"), desc: t("robot.cap3Desc") },
  ];

  const pipeline = [
    { icon: Camera, label: t("robot.pipe1Label"), sub: t("robot.pipe1Sub") },
    { icon: Cpu, label: t("robot.pipe2Label"), sub: t("robot.pipe2Sub") },
    { icon: Bot, label: t("robot.pipe3Label"), sub: t("robot.pipe3Sub") },
  ];

  const beforeItems = [t("robot.before1"), t("robot.before2"), t("robot.before3")];
  const afterItems = [t("robot.after1"), t("robot.after2"), t("robot.after3")];

  return (
    <div className="min-h-screen bg-background pt-32">
      {/* Hero */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
              {t("robot.badge")}
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-4 leading-tight">
              {t("robot.heroTitle")}
              <span className="text-primary">{t("robot.heroHighlight")}</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("robot.heroDesc")}
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-border">
            <img src={robotHero} alt="Autonomous Robot" className="w-full" />
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-10 text-center">
            {t("robot.capTitle")}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={String(cap.title)}
                  className="bg-card rounded-xl border border-border p-6 hover:border-primary/40 hover:shadow-md transition-all text-center"
                >
                  <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center mx-auto mb-4">
                    <Icon size={22} className="text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{cap.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{cap.desc}</p>
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
            {t("robot.pipelineTitle")}
          </h2>
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4">
            {pipeline.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="flex items-center gap-4">
                  <div className="text-center bg-card rounded-xl border border-border p-6 min-w-[180px] hover:border-primary/40 hover:shadow-md transition-all">
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

      {/* Before / After */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Before */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-destructive/10 flex items-center justify-center">
                  <X size={14} className="text-destructive" />
                </span>
                {t("robot.beforeTitle")}
              </h3>
              <ul className="space-y-3">
                {beforeItems.map((item) => (
                  <li key={String(item)} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <X size={14} className="text-destructive mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* After */}
            <div className="bg-card rounded-xl border border-primary/30 p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check size={14} className="text-primary" />
                </span>
                {t("robot.afterTitle")}
              </h3>
              <ul className="space-y-3">
                {afterItems.map((item) => (
                  <li key={String(item)} className="flex items-start gap-2.5 text-sm text-foreground">
                    <Check size={14} className="text-primary mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Robot;
