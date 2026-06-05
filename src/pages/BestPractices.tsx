import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Recycle, 
  Leaf, 
  TrendingUp, 
  Users, 
  Droplet, 
  Sun, 
  Cpu, 
  Target,
  CheckCircle2,
  ArrowRight,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSimpleLanguage } from "@/contexts/SimpleLanguageContext";

const BestPractices = () => {
  const { t } = useSimpleLanguage();
  const circularEconomyPractices = [
    {
      title: t('bestPractices.circular.waste.title'),
      description: t('bestPractices.circular.waste.description'),
      icon: Recycle,
      tips: [
        t('bestPractices.circular.waste.tip1'),
        t('bestPractices.circular.waste.tip2'),
        t('bestPractices.circular.waste.tip3'),
        t('bestPractices.circular.waste.tip4')
      ]
    },
    {
      title: t('bestPractices.circular.water.title'),
      description: t('bestPractices.circular.water.description'),
      icon: Droplet,
      tips: [
        t('bestPractices.circular.water.tip1'),
        t('bestPractices.circular.water.tip2'),
        t('bestPractices.circular.water.tip3'),
        t('bestPractices.circular.water.tip4')
      ]
    },
    {
      title: t('bestPractices.circular.regenerative.title'),
      description: t('bestPractices.circular.regenerative.description'),
      icon: Leaf,
      tips: [
        t('bestPractices.circular.regenerative.tip1'),
        t('bestPractices.circular.regenerative.tip2'),
        t('bestPractices.circular.regenerative.tip3'),
        t('bestPractices.circular.regenerative.tip4')
      ]
    },
    {
      title: t('bestPractices.circular.sharing.title'),
      description: t('bestPractices.circular.sharing.description'),
      icon: Users,
      tips: [
        t('bestPractices.circular.sharing.tip1'),
        t('bestPractices.circular.sharing.tip2'),
        t('bestPractices.circular.sharing.tip3'),
        t('bestPractices.circular.sharing.tip4')
      ]
    }
  ];

  const esgPrinciples = [
    {
      category: t('bestPractices.esg.environmental'),
      icon: Leaf,
      color: "from-primary to-secondary",
      practices: [
        {
          title: t('bestPractices.esg.env.carbon.title'),
          description: t('bestPractices.esg.env.carbon.description'),
          metrics: t('bestPractices.esg.env.carbon.metrics')
        },
        {
          title: t('bestPractices.esg.env.biodiversity.title'),
          description: t('bestPractices.esg.env.biodiversity.description'),
          metrics: t('bestPractices.esg.env.biodiversity.metrics')
        },
        {
          title: t('bestPractices.esg.env.energy.title'),
          description: t('bestPractices.esg.env.energy.description'),
          metrics: t('bestPractices.esg.env.energy.metrics')
        },
        {
          title: t('bestPractices.esg.env.pollution.title'),
          description: t('bestPractices.esg.env.pollution.description'),
          metrics: t('bestPractices.esg.env.pollution.metrics')
        }
      ]
    },
    {
      category: t('bestPractices.esg.social'),
      icon: Users,
      color: "from-secondary to-accent",
      practices: [
        {
          title: t('bestPractices.esg.social.labor.title'),
          description: t('bestPractices.esg.social.labor.description'),
          metrics: t('bestPractices.esg.social.labor.metrics')
        },
        {
          title: t('bestPractices.esg.social.community.title'),
          description: t('bestPractices.esg.social.community.description'),
          metrics: t('bestPractices.esg.social.community.metrics')
        },
        {
          title: t('bestPractices.esg.social.knowledge.title'),
          description: t('bestPractices.esg.social.knowledge.description'),
          metrics: t('bestPractices.esg.social.knowledge.metrics')
        },
        {
          title: t('bestPractices.esg.social.food.title'),
          description: t('bestPractices.esg.social.food.description'),
          metrics: t('bestPractices.esg.social.food.metrics')
        }
      ]
    },
    {
      category: t('bestPractices.esg.governance'),
      icon: Target,
      color: "from-accent to-primary",
      practices: [
        {
          title: t('bestPractices.esg.gov.reporting.title'),
          description: t('bestPractices.esg.gov.reporting.description'),
          metrics: t('bestPractices.esg.gov.reporting.metrics')
        },
        {
          title: t('bestPractices.esg.gov.supply.title'),
          description: t('bestPractices.esg.gov.supply.description'),
          metrics: t('bestPractices.esg.gov.supply.metrics')
        },
        {
          title: t('bestPractices.esg.gov.data.title'),
          description: t('bestPractices.esg.gov.data.description'),
          metrics: t('bestPractices.esg.gov.data.metrics')
        },
        {
          title: t('bestPractices.esg.gov.stakeholder.title'),
          description: t('bestPractices.esg.gov.stakeholder.description'),
          metrics: t('bestPractices.esg.gov.stakeholder.metrics')
        }
      ]
    }
  ];

  const techBestPractices = [
    {
      title: t('bestPractices.tech.precision.title'),
      icon: Target,
      description: t('bestPractices.tech.precision.description'),
      implementations: [
        t('bestPractices.tech.precision.impl1'),
        t('bestPractices.tech.precision.impl2'),
        t('bestPractices.tech.precision.impl3'),
        t('bestPractices.tech.precision.impl4')
      ]
    },
    {
      title: t('bestPractices.tech.iot.title'),
      icon: Cpu,
      description: t('bestPractices.tech.iot.description'),
      implementations: [
        t('bestPractices.tech.iot.impl1'),
        t('bestPractices.tech.iot.impl2'),
        t('bestPractices.tech.iot.impl3'),
        t('bestPractices.tech.iot.impl4')
      ]
    },
    {
      title: t('bestPractices.tech.renewable.title'),
      icon: Sun,
      description: t('bestPractices.tech.renewable.description'),
      implementations: [
        t('bestPractices.tech.renewable.impl1'),
        t('bestPractices.tech.renewable.impl2'),
        t('bestPractices.tech.renewable.impl3'),
        t('bestPractices.tech.renewable.impl4')
      ]
    },
    {
      title: t('bestPractices.tech.ai.title'),
      icon: TrendingUp,
      description: t('bestPractices.tech.ai.description'),
      implementations: [
        t('bestPractices.tech.ai.impl1'),
        t('bestPractices.tech.ai.impl2'),
        t('bestPractices.tech.ai.impl3'),
        t('bestPractices.tech.ai.impl4')
      ]
    }
  ];

  const farmingBestPractices = [
    {
      category: t('bestPractices.farming.soil'),
      practices: [
        t('bestPractices.farming.soil.practice1'),
        t('bestPractices.farming.soil.practice2'),
        t('bestPractices.farming.soil.practice3'),
        t('bestPractices.farming.soil.practice4'),
        t('bestPractices.farming.soil.practice5')
      ]
    },
    {
      category: t('bestPractices.farming.water'),
      practices: [
        t('bestPractices.farming.water.practice1'),
        t('bestPractices.farming.water.practice2'),
        t('bestPractices.farming.water.practice3'),
        t('bestPractices.farming.water.practice4'),
        t('bestPractices.farming.water.practice5')
      ]
    },
    {
      category: t('bestPractices.farming.pest'),
      practices: [
        t('bestPractices.farming.pest.practice1'),
        t('bestPractices.farming.pest.practice2'),
        t('bestPractices.farming.pest.practice3'),
        t('bestPractices.farming.pest.practice4'),
        t('bestPractices.farming.pest.practice5')
      ]
    },
    {
      category: t('bestPractices.farming.crop'),
      practices: [
        t('bestPractices.farming.crop.practice1'),
        t('bestPractices.farming.crop.practice2'),
        t('bestPractices.farming.crop.practice3'),
        t('bestPractices.farming.crop.practice4'),
        t('bestPractices.farming.crop.practice5')
      ]
    },
    {
      category: t('bestPractices.farming.record'),
      practices: [
        t('bestPractices.farming.record.practice1'),
        t('bestPractices.farming.record.practice2'),
        t('bestPractices.farming.record.practice3'),
        t('bestPractices.farming.record.practice4'),
        t('bestPractices.farming.record.practice5')
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <BookOpen className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">{t('bestPractices.badge')}</span>
          </div>
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t('bestPractices.title')}
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            {t('bestPractices.subtitle')}
          </p>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="circular" className="w-full mb-16">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8 h-auto">
            <TabsTrigger value="circular" className="py-3">
              <Recycle className="h-4 w-4 mr-2" />
              {t('bestPractices.tabs.circular')}
            </TabsTrigger>
            <TabsTrigger value="esg" className="py-3">
              <Leaf className="h-4 w-4 mr-2" />
              {t('bestPractices.tabs.esg')}
            </TabsTrigger>
            <TabsTrigger value="technology" className="py-3">
              <Cpu className="h-4 w-4 mr-2" />
              {t('bestPractices.tabs.technology')}
            </TabsTrigger>
            <TabsTrigger value="farming" className="py-3">
              <Sun className="h-4 w-4 mr-2" />
              {t('bestPractices.tabs.farming')}
            </TabsTrigger>
          </TabsList>

          {/* Circular Economy Tab */}
          <TabsContent value="circular" className="animate-fade-in-up">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">{t('bestPractices.circular.title')}</h2>
              <p className="text-lg text-muted-foreground max-w-3xl">
                {t('bestPractices.circular.description')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {circularEconomyPractices.map((practice, index) => (
                <Card 
                  key={practice.title} 
                  className="hover:shadow-card transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="bg-gradient-to-br from-primary to-secondary p-3 rounded-lg w-fit mb-4">
                      <practice.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{practice.title}</h3>
                    <p className="text-muted-foreground mb-4">{practice.description}</p>
                    <div className="space-y-2">
                      {practice.tips.map((tip) => (
                        <div key={tip} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* ESG Framework Tab */}
          <TabsContent value="esg" className="animate-fade-in-up">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">{t('bestPractices.esg.title')}</h2>
              <p className="text-lg text-muted-foreground max-w-3xl">
                {t('bestPractices.esg.description')}
              </p>
            </div>

            <div className="space-y-8">
              {esgPrinciples.map((category, index) => (
                <Card 
                  key={category.category}
                  className="shadow-card overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`bg-gradient-to-r ${category.color} p-4`}>
                    <div className="flex items-center gap-3 text-white">
                      <category.icon className="h-6 w-6" />
                      <h3 className="text-2xl font-bold">{category.category}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      {category.practices.map((practice) => (
                        <div key={practice.title} className="space-y-2">
                          <h4 className="font-bold text-lg">{practice.title}</h4>
                          <p className="text-sm text-muted-foreground">{practice.description}</p>
                          <div className="bg-muted/50 p-3 rounded-lg">
                            <p className="text-xs font-medium text-primary">{practice.metrics}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Technology Tab */}
          <TabsContent value="technology" className="animate-fade-in-up">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">{t('bestPractices.tech.title')}</h2>
              <p className="text-lg text-muted-foreground max-w-3xl">
                {t('bestPractices.tech.description')}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {techBestPractices.map((tech, index) => (
                <Card 
                  key={tech.title}
                  className="hover:shadow-tech transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-gradient-to-br from-primary to-secondary p-3 rounded-lg">
                        <tech.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{tech.title}</h3>
                        <p className="text-muted-foreground text-sm">{tech.description}</p>
                      </div>
                    </div>
                    <div className="space-y-2 pl-16">
                      {tech.implementations.map((impl) => (
                        <div key={impl} className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 text-secondary flex-shrink-0 mt-1" />
                          <span className="text-sm">{impl}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Farming Practices Tab */}
          <TabsContent value="farming" className="animate-fade-in-up">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">{t('bestPractices.farming.title')}</h2>
              <p className="text-lg text-muted-foreground max-w-3xl">
                {t('bestPractices.farming.description')}
              </p>
            </div>

            <div className="grid gap-6">
              {farmingBestPractices.map((section, index) => (
                <Card 
                  key={section.category}
                  className="hover:shadow-card transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <div className="h-2 w-2 bg-primary rounded-full" />
                      {section.category}
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {section.practices.map((practice) => (
                        <div key={practice} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{practice}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <Card className="bg-gradient-to-br from-primary to-secondary border-0 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
            <Leaf className="absolute top-10 right-10 h-40 w-40 animate-float" />
            <Recycle className="absolute bottom-10 right-40 h-32 w-32 animate-float" style={{ animationDelay: "1s" }} />
          </div>
          <CardContent className="p-12 sm:p-16 relative z-10">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold text-white mb-4">
                {t('bestPractices.cta.title')}
              </h2>
              <p className="text-white/90 text-lg mb-8">
                {t('bestPractices.cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/solutions">
                  <Button size="lg" variant="secondary" className="group">
                    {t('bestPractices.cta.button1')}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                    {t('bestPractices.cta.button2')}
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BestPractices;
