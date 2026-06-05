import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Plane, Leaf, Sparkles, Bot, Wifi, BarChart3, Monitor, Users, Shield, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import farmOsCard from "@/assets/farm-os-card.jpg";
import droneCard from "@/assets/drone-card.png";
import robotCard from "@/assets/spraying-robot-agribeacon.webp";
import iotCard from "@/assets/iot-soil-sensor.png";
import aiCard from "@/assets/ai-analytics-card.jpg";
import { useSimpleLanguage } from "@/contexts/SimpleLanguageContext";
import { useState, useEffect } from "react";

const Home = () => {
  const { t } = useSimpleLanguage();
  const [heroVideoUrl, setHeroVideoUrl] = useState<string>("");

  useEffect(() => {
    fetch("/api/hero-video")
      .then((r) => r.json())
      .then((data) => { if (data.url) setHeroVideoUrl(data.url); })
      .catch(console.error);
  }, []);
  
  const coreProducts: Array<{
    icon: LucideIcon;
    title: string;
    desc: string;
    badge?: string;
    image: string;
    path: string;
  }> = [
    {
      icon: Plane,
      title: t('home.products.uavTitle') as string,
      desc: t('home.products.uavDesc') as string,
      badge: t('home.products.uavBadge') as string,
      image: droneCard,
      path: '/products/uav',
    },
    {
      icon: Bot,
      title: t('home.products.robotTitle') as string,
      desc: t('home.products.robotDesc') as string,
      badge: t('home.products.robotBadge') as string,
      image: robotCard,
      path: '/products/robot',
    },
    {
      icon: Wifi,
      title: t('home.products.iotTitle') as string,
      desc: t('home.products.iotDesc') as string,
      image: iotCard,
      path: '/products/iot',
    },
    {
      icon: BarChart3,
      title: t('home.products.aiTitle') as string,
      desc: t('home.products.aiDesc') as string,
      badge: t('home.products.aiBadge') as string,
      image: aiCard,
      path: '/products/ai-assistant',
    },
  ];

  const aiInAction: Array<{
    icon: LucideIcon;
    title: string;
    subtitle: string;
    desc: string;
    path?: string;
  }> = [
    {
      icon: BarChart3,
      title: t('home.aiInAction.yieldTitle') as string,
      subtitle: t('home.aiInAction.yieldSub') as string,
      desc: t('home.aiInAction.yieldDesc') as string,
      path: '/ai/yield-planning',
    },
    {
      icon: Users,
      title: t('home.aiInAction.resourceTitle') as string,
      subtitle: t('home.aiInAction.resourceSub') as string,
      desc: t('home.aiInAction.resourceDesc') as string,
      path: '/ai/resource-management',
    },
    {
      icon: Shield,
      title: t('home.aiInAction.traceTitle') as string,
      subtitle: t('home.aiInAction.traceSub') as string,
      desc: t('home.aiInAction.traceDesc') as string,
      path: '/ai/traceability',
    },
  ];

  const flowSteps = [
    {
      step: '1',
      label: t('home.flow.step1') as string,
      sub: t('home.flow.step1Sub') as string,
      color: 'bg-sky-500/10 text-sky-600 border-sky-500/20 dark:text-sky-400',
    },
    {
      step: '2',
      label: t('home.flow.step2') as string,
      sub: t('home.flow.step2Sub') as string,
      color: 'bg-primary/10 text-primary border-primary/20',
    },
    {
      step: '3',
      label: t('home.flow.step3') as string,
      sub: t('home.flow.step3Sub') as string,
      color: 'bg-teal-500/10 text-teal-600 border-teal-500/20 dark:text-teal-400',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-6rem)]">
            {/* Left Side - Text Content */}
            <div className="animate-fade-in-up z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Leaf className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">{t('home.hero.badge')}</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {t('home.hero.title1')}
                </span>
                <br />
                <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                  {t('home.hero.title2')}
                </span>
                <br />
                <span className="text-foreground">{t('home.hero.title3')}</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                {t('home.hero.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/solutions">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-secondary hover:shadow-glow transition-all group"
                  >
                    {t('home.hero.explore')}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-2">
                    {t('home.hero.demo')}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Side - Video */}
            <div className="relative h-[500px] lg:h-[700px] rounded-2xl overflow-hidden shadow-2xl">
              {heroVideoUrl && (
                <video
                  key={heroVideoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={heroVideoUrl} type="video/mp4" />
                </video>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t('home.vision.title')}
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('home.vision.subtitle')}
            </p>
          </div>

          <Card className="bg-gradient-to-br from-card to-muted/30 border-2 shadow-card">
            <CardContent className="p-8 sm:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">{t('home.mission.title')}</h3>
                  <p className="text-muted-foreground">
                    {t('home.mission.text1')}
                  </p>
                  <p className="text-muted-foreground mt-4">
                    {t('home.mission.text2')}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: t('home.stats.farms'), value: "500+" },
                    { label: t('home.stats.data'), value: "1M+" },
                    { label: t('home.stats.yield'), value: "25%" },
                    { label: t('home.stats.water'), value: "30%" },
                  ].map((stat) => (
                    <Card key={stat.label} className="bg-background/50 backdrop-blur">
                      <CardContent className="p-4 text-center">
                        <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Our Products Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t('home.products.title')}
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('home.products.subtitle')}
            </p>
          </div>

          {/* Farm Management OS featured card */}
          <Link to="/products/farm-os" className="group block mb-12">
            <Card className="overflow-hidden border-2 hover:shadow-tech transition-all duration-300 hover:-translate-y-1">
              <div className="grid md:grid-cols-2">
                <div className="aspect-[16/10] md:aspect-auto overflow-hidden">
                  <img
                    src={farmOsCard}
                    alt={t('home.products.farmOsTitle') as string}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-8 sm:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-11 w-11 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <Monitor className="h-5 w-5 text-white" />
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                      <Sparkles className="h-3 w-3" />
                      {t('home.products.farmOsBadge')}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{t('home.products.farmOsTitle')}</h3>
                  <p className="text-muted-foreground mb-5 leading-relaxed">
                    {t('home.products.farmOsDesc')}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                    {t('home.products.learnMore')}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </CardContent>
              </div>
            </Card>
          </Link>

          {/* Core technology grid */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-2">{t('home.products.coreTitle')}</h3>
            <p className="text-muted-foreground">{t('home.products.coreSubtitle')}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreProducts.map((product) => {
              const Icon = product.icon;
              return (
                <Link key={product.path} to={product.path} className="group block">
                  <Card className="overflow-hidden h-full hover:shadow-tech transition-all duration-300 hover:-translate-y-2">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        {product.badge && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                            <Sparkles className="h-3 w-3" />
                            {product.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{product.desc}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI in Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-2">{t('home.aiInAction.title')}</h2>
            <p className="text-muted-foreground">{t('home.aiInAction.subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {aiInAction.map((item) => {
              const Icon = item.icon;
              const card = (
                <Card
                  key={item.title}
                  className={`p-6 hover:shadow-tech transition-all duration-300 hover:-translate-y-1 ${item.path ? 'cursor-pointer' : ''}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                      <Sparkles className="h-3 w-3" />
                      AI in Action
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-xs font-medium text-secondary mb-2">{item.subtitle}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </Card>
              );
              return item.path ? (
                <Link key={item.title} to={item.path}>{card}</Link>
              ) : (
                <div key={item.title}>{card}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* System Flow */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">{t('home.flow.title')}</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">{t('home.flow.subtitle')}</p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            {flowSteps.map((s, i) => (
              <div key={s.step} className="flex items-center gap-4 md:gap-8">
                <div className={`rounded-xl border p-6 text-center min-w-[180px] ${s.color}`}>
                  <div className="text-2xl font-bold mb-1">{s.step}</div>
                  <div className="font-semibold text-sm">{s.label}</div>
                  <div className="text-xs mt-1 opacity-70">{s.sub}</div>
                </div>
                {i < flowSteps.length - 1 && (
                  <ArrowRight className="h-6 w-6 text-muted-foreground hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <Card className="bg-gradient-to-br from-primary to-secondary border-0 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
              <Leaf className="absolute top-10 right-10 h-40 w-40 animate-float" />
              <Plane className="absolute bottom-10 right-40 h-32 w-32 animate-float" style={{ animationDelay: "1s" }} />
            </div>
            <CardContent className="p-12 sm:p-16 relative z-10">
              <div className="max-w-2xl">
                <h2 className="text-4xl font-bold text-white mb-4">
                  {t('home.cta.title')}
                </h2>
                <p className="text-white/90 text-lg mb-8">
                  {t('home.cta.subtitle')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/contact">
                    <Button size="lg" variant="secondary" className="group">
                      {t('home.cta.demo')}
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link to="/about">
                    <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                      {t('home.cta.learn')}
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;
