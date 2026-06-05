import { FileCheck, Download, CheckCircle, Clock, Sparkles, XCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSimpleLanguage } from "@/contexts/SimpleLanguageContext";

const Traceability = () => {
  const { t } = useSimpleLanguage();

  const beforeItems = [
    t("traceability.before1"),
    t("traceability.before2"),
    t("traceability.before3"),
    t("traceability.before4"),
  ];

  const afterItems = [
    t("traceability.after1"),
    t("traceability.after2"),
    t("traceability.after3"),
    t("traceability.after4"),
  ];

  const readinessMarkets = [
    { market: "EU", score: 87 },
    { market: t("traceability.japan"), score: 72 },
    { market: "VietGAP", score: 95 },
  ];

  const logs = [
    { time: "14/04 08:30", action: t("traceability.log1") },
    { time: "13/04 14:00", action: t("traceability.log2") },
    { time: "12/04 09:15", action: t("traceability.log3") },
    { time: "11/04 16:00", action: t("traceability.log4") },
  ];

  const certs = ["GlobalGAP", "VietGAP", "EU Organic", "JAS"];

  return (
    <div className="min-h-screen bg-background pt-24">
      {/* Hero */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="container mx-auto px-4 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
            <Sparkles className="h-3 w-3" /> {t("traceability.badge")}
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-4 leading-tight">
            {t("traceability.heroTitle")}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t("traceability.heroHighlight")}
            </span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t("traceability.heroDesc")}
          </p>
        </div>
      </section>

      {/* Before / After */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-6">
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

      {/* Export Readiness Score */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            {t("traceability.readinessTitle")}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {readinessMarkets.map((m) => (
              <div key={m.market} className="bg-card rounded-xl border border-border p-6 text-center">
                <h3 className="font-semibold text-foreground mb-4">{m.market}</h3>
                <div className="relative inline-flex items-center justify-center">
                  <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                    <circle
                      cx="50" cy="50" r="42" fill="none"
                      stroke="url(#gaugeGradient)" strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${m.score * 2.64} 264`}
                    />
                    <defs>
                      <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(var(--primary))" />
                        <stop offset="100%" stopColor="hsl(var(--secondary))" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="absolute text-2xl font-bold text-foreground">{m.score}%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-3">{t("traceability.docCompleteness")}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activity Log */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            {t("traceability.logTitle")}
          </h2>
          <div className="relative border-l-2 border-primary/20 ml-4 space-y-6">
            {logs.map((log) => (
              <div key={log.time} className="relative pl-8">
                <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <CheckCircle size={10} className="text-primary-foreground" />
                </div>
                <div className="bg-card rounded-lg border border-border p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock size={10} /> {log.time}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      <Sparkles className="h-3 w-3" /> Verified by AI
                    </span>
                  </div>
                  <p className="text-sm text-foreground">{log.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Export Report Engine */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto text-center max-w-lg">
          <FileCheck size={48} className="mx-auto text-primary mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-3">{t("traceability.exportTitle")}</h2>
          <p className="text-muted-foreground text-sm mb-6">{t("traceability.exportDesc")}</p>
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {certs.map((cert) => (
              <span
                key={cert}
                className="px-3 py-1.5 rounded-lg border border-border bg-card text-sm text-foreground cursor-pointer hover:border-primary transition-colors"
              >
                {cert}
              </span>
            ))}
          </div>
          <Button size="lg" className="bg-gradient-to-r from-primary to-secondary gap-2">
            <Download size={18} /> {t("traceability.generateBtn")}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Traceability;
