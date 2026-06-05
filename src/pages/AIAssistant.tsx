import { Mic, FileText, Bell, ArrowRight } from "lucide-react";
import { useSimpleLanguage } from "@/contexts/SimpleLanguageContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import aiHero from "@/assets/ai-assistant-hero.jpg";

const AIAssistant = () => {
  const { t } = useSimpleLanguage();

  const features = [
    { icon: Mic, title: t("aiAssistant.feat1Title"), desc: t("aiAssistant.feat1Desc") },
    { icon: FileText, title: t("aiAssistant.feat2Title"), desc: t("aiAssistant.feat2Desc") },
    { icon: Bell, title: t("aiAssistant.feat3Title"), desc: t("aiAssistant.feat3Desc") },
  ];

  const workflow = [
    { step: t("aiAssistant.wf1Step"), icon: "🎤", desc: t("aiAssistant.wf1Desc") },
    { step: t("aiAssistant.wf2Step"), icon: "🧠", desc: t("aiAssistant.wf2Desc") },
    { step: t("aiAssistant.wf3Step"), icon: "⚡", desc: t("aiAssistant.wf3Desc") },
  ];

  return (
    <div className="min-h-screen bg-background pt-32">
      {/* Hero */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
              {t("aiAssistant.badge")}
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-4 leading-tight">
              {t("aiAssistant.heroTitle")}
              <span className="text-primary">{t("aiAssistant.heroHighlight")}</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {t("aiAssistant.heroDesc")}
            </p>
            <Button asChild>
              <Link to="/contact">
                {t("aiAssistant.tryFree")} <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>

          {/* Hero image + floating chat bubble */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-border">
              <img src={aiHero} alt="AI Assistant Tiểu Thần Nông" className="w-full" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-card rounded-xl shadow-lg border border-border p-4 max-w-[260px]">
              <div className="flex items-start gap-2">
                <span className="text-lg">✨</span>
                <div>
                  <p className="text-xs font-semibold text-foreground">{t("aiAssistant.aiName")}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{t("aiAssistant.aiMsg")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">{t("aiAssistant.featuresTitle")}</h2>
            <p className="text-muted-foreground">{t("aiAssistant.featuresSub")}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={String(f.title)}
                  className="rounded-xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-md transition-all"
                >
                  <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center mb-4">
                    <Icon size={24} className="text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">{t("aiAssistant.workflowTitle")}</h2>
            <p className="text-muted-foreground">{t("aiAssistant.workflowSub")}</p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
            {workflow.map((s, i) => (
              <div key={i} className="flex items-center gap-6 md:gap-10">
                <div className="text-center">
                  <div className="text-4xl mb-3">{s.icon}</div>
                  <h4 className="font-semibold text-foreground text-sm">{s.step}</h4>
                  <p className="text-xs text-muted-foreground mt-1 max-w-[140px]">{s.desc}</p>
                </div>
                {i < 2 && (
                  <ArrowRight size={20} className="text-muted-foreground hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIAssistant;
