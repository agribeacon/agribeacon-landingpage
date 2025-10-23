import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Cpu, Plane, Leaf, Radio, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import iotSensor from "@/assets/iot-sensor.jpg";
import droneTech from "@/assets/drone-tech.jpg";
import robotFarming from "@/assets/robot-farming.jpg";
import { useSimpleLanguage } from "@/contexts/SimpleLanguageContext";

const heroVideoUrl = "https://s3-dev.cacao-farm.online/farm-store/video.mp4";

const Home = () => {
  const { t } = useSimpleLanguage();
  
  const solutions = [
    {
      icon: Plane,
      title: t('home.solutions.autonomous'),
      description: t('home.solutions.autonomous.desc'),
      image: droneTech,
    },
    {
      icon: Cpu,
      title: t('home.solutions.robotics'),
      description: t('home.solutions.robotics.desc'),
      image: robotFarming,
    },
    {
      icon: Radio,
      title: t('home.solutions.iot'),
      description: t('home.solutions.iot.desc'),
      image: iotSensor,
    },
    {
      icon: Sparkles,
      title: t('home.solutions.ai'),
      description: t('home.solutions.ai.desc'),
      image: iotSensor,
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
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={heroVideoUrl} type="video/mp4" />
              </video>
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

      {/* Solutions Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t('home.solutions.title')}
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('home.solutions.subtitle')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((solution, index) => (
              <Card
                key={solution.title}
                className="group hover:shadow-tech transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={solution.image}
                    alt={solution.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                </div>
                <CardContent className="p-6">
                  <div className="bg-gradient-to-br from-primary to-secondary p-3 rounded-lg w-fit mb-4 group-hover:animate-pulse-glow">
                    <solution.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{solution.title}</h3>
                  <p className="text-muted-foreground">{solution.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/solutions">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:shadow-glow group"
              >
                {t('home.solutions.viewAll')}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
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
