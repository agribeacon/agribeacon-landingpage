import {
  MapPin, Layers, TreePine, Fence, Map, TrendingUp, Droplets,
  Monitor, BarChart3, Clock, Quote, ArrowRight, CheckCircle2, XCircle,
  Crosshair, Radio, Smartphone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSimpleLanguage } from "@/contexts/SimpleLanguageContext";
import heroImg from "@/assets/digital-farm-map-hero.jpg";
import baseImg from "@/assets/rtk-base-station.png";
import roverImg from "@/assets/rtk-rover-handheld.png";
import mapSample from "@/assets/digital-farm-map-sample.jpg";

const DigitalFarmMap = () => {
  const { t } = useSimpleLanguage();

  const problems = [
    t("digitalFarmMap.problem1"),
    t("digitalFarmMap.problem2"),
    t("digitalFarmMap.problem3"),
  ];

  const steps = [
    {
      num: "1",
      title: t("digitalFarmMap.step1Title"),
      desc: t("digitalFarmMap.step1Desc"),
      color: "bg-sky-500/10 text-sky-600 border-sky-500/20",
    },
    {
      num: "2",
      title: t("digitalFarmMap.step2Title"),
      desc: t("digitalFarmMap.step2Desc"),
      color: "bg-primary/10 text-primary border-primary/20",
    },
    {
      num: "3",
      title: t("digitalFarmMap.step3Title"),
      desc: t("digitalFarmMap.step3Desc"),
      color: "bg-teal-500/10 text-teal-600 border-teal-500/20",
    },
  ];

  const layers = [
    { icon: TreePine, title: t("digitalFarmMap.layer1Title"), desc: t("digitalFarmMap.layer1Desc") },
    { icon: Fence, title: t("digitalFarmMap.layer2Title"), desc: t("digitalFarmMap.layer2Desc") },
    { icon: Map, title: t("digitalFarmMap.layer3Title"), desc: t("digitalFarmMap.layer3Desc") },
    { icon: Layers, title: t("digitalFarmMap.layerAttrTitle"), desc: t("digitalFarmMap.layerAttrDesc") },
  ];

  const benefits = [
    { icon: TrendingUp, title: t("digitalFarmMap.benefit1Title"), desc: t("digitalFarmMap.benefit1Desc") },
    { icon: Droplets, title: t("digitalFarmMap.benefit2Title"), desc: t("digitalFarmMap.benefit2Desc") },
    { icon: Monitor, title: t("digitalFarmMap.benefit3Title"), desc: t("digitalFarmMap.benefit3Desc") },
    { icon: BarChart3, title: t("digitalFarmMap.benefit4Title"), desc: t("digitalFarmMap.benefit4Desc") },
    { icon: Clock, title: t("digitalFarmMap.benefit5Title"), desc: t("digitalFarmMap.benefit5Desc") },
  ];

  const testimonials = [
    {
      name: t("digitalFarmMap.testimonial1Name"),
      role: t("digitalFarmMap.testimonial1Role"),
      text: t("digitalFarmMap.testimonial1Text"),
    },
    {
      name: t("digitalFarmMap.testimonial2Name"),
      role: t("digitalFarmMap.testimonial2Role"),
      text: t("digitalFarmMap.testimonial2Text"),
    },
    {
      name: t("digitalFarmMap.testimonial3Name"),
      role: t("digitalFarmMap.testimonial3Role"),
      text: t("digitalFarmMap.testimonial3Text"),
    },
  ];

  const useCases = [
    t("digitalFarmMap.useCase1"),
    t("digitalFarmMap.useCase2"),
    t("digitalFarmMap.useCase3"),
  ];

  return (
    <div className="min-h-screen bg-background pt-24">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="RTK Farm Surveying"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/50" />
        </div>
        <div className="container mx-auto px-4 relative py-24 lg:py-36">
          <div className="max-w-2xl">
            <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-5 leading-tight">
              {t("digitalFarmMap.heroTitle")}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
              {t("digitalFarmMap.heroSub")}
            </p>
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary text-base px-8" asChild>
              <Link to="/contact">{t("digitalFarmMap.heroCta")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-10 text-center">
            {t("digitalFarmMap.problemTitle")}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {problems.map((p, i) => (
              <div
                key={i}
                className="rounded-xl border border-destructive/20 bg-destructive/5 p-6 flex gap-3"
              >
                <XCircle className="h-6 w-6 text-destructive shrink-0 mt-0.5" />
                <p className="text-sm text-foreground leading-relaxed">{p}</p>
              </div>
            ))}
          </div>
          <div className="max-w-3xl mx-auto rounded-xl border border-primary/20 bg-primary/5 p-8 flex gap-4 items-start">
            <CheckCircle2 className="h-8 w-8 text-primary shrink-0 mt-0.5" />
            <p className="text-foreground leading-relaxed">{t("digitalFarmMap.solutionText")}</p>
          </div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            {t("digitalFarmMap.serviceTitle")}
          </h2>
          <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 md:gap-8">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center gap-6 md:gap-8 flex-1">
                <div className={`rounded-xl border p-8 text-center flex-1 ${s.color}`}>
                  <div className="text-4xl font-bold mb-2">{s.num}</div>
                  <div className="font-semibold text-base mb-2">{s.title}</div>
                  <div className="text-sm opacity-80 leading-relaxed">{s.desc}</div>
                </div>
                {i < 2 && (
                  <ArrowRight size={24} className="text-muted-foreground hidden md:block shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology & Equipment */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            {t("digitalFarmMap.techTitle")}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="rounded-xl border border-border bg-card overflow-hidden hover:border-primary/40 hover:shadow-md transition-all">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={baseImg}
                  alt={t("digitalFarmMap.techBase")}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Radio className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">{t("digitalFarmMap.techBase")}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{t("digitalFarmMap.techBaseDesc")}</p>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card overflow-hidden hover:border-primary/40 hover:shadow-md transition-all">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={roverImg}
                  alt={t("digitalFarmMap.techRover")}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Smartphone className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">{t("digitalFarmMap.techRover")}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{t("digitalFarmMap.techRoverDesc")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Map Output */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">{t("digitalFarmMap.mapTitle")}</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">{t("digitalFarmMap.mapSub")}</p>
          </div>
          <div className="max-w-5xl mx-auto mb-12">
            <div className="rounded-xl border border-border overflow-hidden shadow-lg">
              <img src={mapSample} alt="Digital Farm Map GIS" className="w-full h-auto" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {layers.map((l, i) => {
              const Icon = l.icon;
              return (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-md transition-all"
                >
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center mb-3">
                    <Icon size={20} className="text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{l.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{l.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            {t("digitalFarmMap.benefitsTitle")}
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-card p-6 text-center hover:border-primary/40 hover:shadow-md transition-all"
                >
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mx-auto mb-4">
                    <Icon size={22} className="text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 text-sm">{b.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            {t("digitalFarmMap.socialTitle")}
          </h2>

          {/* Use cases */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {useCases.map((uc, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
              >
                <Crosshair size={14} /> {uc}
              </span>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((tm, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-6">
                <Quote className="h-6 w-6 text-primary/40 mb-3" />
                <p className="text-sm text-foreground leading-relaxed mb-4 italic">"{tm.text}"</p>
                <div>
                  <p className="text-sm font-semibold text-foreground">{tm.name}</p>
                  <p className="text-xs text-muted-foreground">{tm.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">{t("digitalFarmMap.ctaTitle")}</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">{t("digitalFarmMap.ctaDesc")}</p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary text-base px-10"
            asChild
          >
            <Link to="/contact">{t("digitalFarmMap.ctaBtn")}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default DigitalFarmMap;
