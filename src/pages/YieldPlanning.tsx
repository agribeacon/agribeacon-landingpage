import { BarChart3, Calendar, Sparkles, XCircle, CheckCircle2 } from "lucide-react";
import { useSimpleLanguage } from "@/contexts/SimpleLanguageContext";

const YieldPlanning = () => {
  const { t } = useSimpleLanguage();

  const beforeItems = [
    t("yieldPlanning.before1"),
    t("yieldPlanning.before2"),
    t("yieldPlanning.before3"),
    t("yieldPlanning.before4"),
  ];

  const afterItems = [
    t("yieldPlanning.after1"),
    t("yieldPlanning.after2"),
    t("yieldPlanning.after3"),
    t("yieldPlanning.after4"),
  ];

  const planCards = [
    { title: t("yieldPlanning.card1Title"), time: t("yieldPlanning.card1Time"), desc: t("yieldPlanning.card1Desc") },
    { title: t("yieldPlanning.card2Title"), time: t("yieldPlanning.card2Time"), desc: t("yieldPlanning.card2Desc") },
    { title: t("yieldPlanning.card3Title"), time: t("yieldPlanning.card3Time"), desc: t("yieldPlanning.card3Desc") },
  ];

  const chartBars = [40, 55, 62, 70, 75, 80, 78, 85];

  return (
    <div className="min-h-screen bg-background pt-24">
      {/* Hero */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
              <Sparkles className="h-3 w-3" /> {t("yieldPlanning.badge")}
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-4 leading-tight">
              {t("yieldPlanning.heroTitle")}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t("yieldPlanning.heroHighlight")}
              </span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("yieldPlanning.heroDesc")}
            </p>
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            {t("yieldPlanning.painTitle")}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Before */}
            <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6">
              <p className="text-xs font-semibold uppercase text-destructive mb-4 tracking-wide">Before</p>
              <div className="space-y-3">
                {beforeItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* After */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
              <p className="text-xs font-semibold uppercase text-primary mb-4 tracking-wide">After</p>
              <div className="space-y-3">
                {afterItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Predictive Dashboard */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3 flex items-center justify-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              {t("yieldPlanning.dashTitle")}
            </h2>
            <p className="text-muted-foreground">{t("yieldPlanning.dashSub")}</p>
          </div>
          <div className="max-w-3xl mx-auto bg-card rounded-xl border border-border p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-foreground">{t("yieldPlanning.chartTitle")}</h3>
                <p className="text-xs text-muted-foreground">{t("yieldPlanning.chartSub")}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                <Sparkles className="h-3 w-3" /> AI Forecast
              </span>
            </div>
            <div className="h-48 flex items-end gap-2">
              {chartBars.map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className={`w-full rounded-t-sm ${
                      i >= 5
                        ? "border-2 border-dashed border-primary/50 bg-primary/10"
                        : "bg-gradient-to-t from-primary to-secondary"
                    }`}
                    style={{ height: `${h}%` }}
                  />
                  <span className="text-[10px] text-muted-foreground">T{i + 1}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-6 mt-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="w-3 h-2 bg-gradient-to-r from-primary to-secondary rounded-sm" />
                {t("yieldPlanning.actual")}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-2 border-2 border-dashed border-primary/50 rounded-sm" />
                {t("yieldPlanning.forecast")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* AI Planning Cards */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center flex items-center justify-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            {t("yieldPlanning.planTitle")}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {planCards.map((card) => (
              <div
                key={card.title}
                className="rounded-xl border border-primary/20 bg-primary/5 p-5 hover:border-primary/40 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-medium text-primary">{card.time}</span>
                </div>
                <h4 className="font-semibold text-foreground text-sm mb-2">{card.title}</h4>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{card.desc}</p>
                <button className="text-xs font-medium text-primary flex items-center gap-1 hover:gap-2 transition-all">
                  <Calendar size={12} /> {t("yieldPlanning.applyCalendar")}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default YieldPlanning;
