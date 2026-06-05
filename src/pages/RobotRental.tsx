import { Gamepad2, Shield, Target, Eye, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSimpleLanguage } from "@/contexts/SimpleLanguageContext";
import robotImg from "@/assets/spraying-robot-horizontal.png";
import gamepadImg from "@/assets/robot-gamepad-control.png";

const RobotRental = () => {
  const { t } = useSimpleLanguage();

  const features = [
    { icon: Gamepad2, emoji: "🎮", title: t("robotRental.feat1Title"), desc: t("robotRental.feat1Desc") },
    { icon: Shield, emoji: "🛡️", title: t("robotRental.feat2Title"), desc: t("robotRental.feat2Desc") },
    { icon: Target, emoji: "🎯", title: t("robotRental.feat3Title"), desc: t("robotRental.feat3Desc") },
    { icon: Eye, emoji: "👁️", title: t("robotRental.feat4Title"), desc: t("robotRental.feat4Desc") },
  ];

  return (
    <div className="min-h-screen bg-background pt-24">
      {/* Hero */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
              {t("robotRental.badge")}
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-4 leading-tight">
              {t("robotRental.heroTitle")}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {t("robotRental.heroSub")}
            </p>
            <Button
              className="bg-gradient-to-r from-primary to-secondary inline-flex items-center gap-2"
              asChild
            >
              <Link to="/contact">
                {t("robotRental.heroCta")} <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
          <div className="relative">
            <img
              src={robotImg}
              alt="AgriBeacon Spraying Robot"
              className="rounded-2xl shadow-2xl w-full object-cover border border-border"
            />
          </div>
        </div>
      </section>

      {/* App Control Mockup */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-2 text-center">
            {t("robotRental.appTitle")}
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
            {t("robotRental.appDesc")}
          </p>
          <div className="max-w-4xl mx-auto">
            <img
              src={gamepadImg}
              alt="Robot control gamepad interface"
              className="rounded-2xl shadow-2xl w-full object-cover border border-border"
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-10 text-center">
            {t("robotRental.featTitle")}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {features.map((f) => (
              <div
                key={String(f.title)}
                className="bg-card rounded-xl border border-border p-6 hover:border-primary/40 hover:shadow-md transition-all text-center"
              >
                <div className="text-3xl mb-3">{f.emoji}</div>
                <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {t("robotRental.heroTitle")}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            {t("robotRental.heroSub")}
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary text-base px-10"
            asChild
          >
            <Link to="/contact">{t("robotRental.heroCta")}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default RobotRental;
