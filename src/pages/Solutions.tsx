import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useSimpleLanguage } from "@/contexts/SimpleLanguageContext";

const Solutions = () => {
  const { t } = useSimpleLanguage();

  const packages = [
    {
      name: t('solutions.package.starter.name'),
      price: t('solutions.package.starter.price'),
      description: t('solutions.package.starter.description'),
      features: [
        t('solutions.package.starter.feature1'),
        t('solutions.package.starter.feature2'),
        t('solutions.package.starter.feature3'),
        t('solutions.package.starter.feature4'),
        t('solutions.package.starter.feature5'),
        t('solutions.package.starter.feature6'),
      ],
      popular: false,
    },
    {
      name: t('solutions.package.professional.name'),
      price: t('solutions.package.professional.price'),
      description: t('solutions.package.professional.description'),
      features: [
        t('solutions.package.professional.feature1'),
        t('solutions.package.professional.feature2'),
        t('solutions.package.professional.feature3'),
        t('solutions.package.professional.feature4'),
        t('solutions.package.professional.feature5'),
        t('solutions.package.professional.feature6'),
        t('solutions.package.professional.feature7'),
      ],
      popular: true,
    },
    {
      name: t('solutions.package.enterprise.name'),
      price: t('solutions.package.enterprise.price'),
      description: t('solutions.package.enterprise.description'),
      features: [
        t('solutions.package.enterprise.feature1'),
        t('solutions.package.enterprise.feature2'),
        t('solutions.package.enterprise.feature3'),
        t('solutions.package.enterprise.feature4'),
        t('solutions.package.enterprise.feature5'),
        t('solutions.package.enterprise.feature6'),
        t('solutions.package.enterprise.feature7'),
        t('solutions.package.enterprise.feature8'),
      ],
      popular: false,
    },
  ];

  const saasFeatures = [
    t('solutions.platform.feature1'),
    t('solutions.platform.feature2'),
    t('solutions.platform.feature3'),
    t('solutions.platform.feature4'),
    t('solutions.platform.feature5'),
    t('solutions.platform.feature6'),
    t('solutions.platform.feature7'),
    t('solutions.platform.feature8'),
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t('solutions.title')}
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            {t('solutions.subtitle')}
          </p>
        </div>

        {/* SaaS Platform Highlight */}
        <Card className="mb-16 bg-gradient-to-br from-muted/50 to-background border-2 shadow-card">
          <CardContent className="p-8 sm:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">{t('solutions.platform.title')}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('solutions.platform.subtitle')}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {saasFeatures.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm">
                  <Check className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pricing Packages */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg, index) => (
            <Card
              key={pkg.name}
              className={`relative overflow-hidden transition-all duration-300 hover:-translate-y-2 ${
                pkg.popular ? "border-primary border-2 shadow-tech" : "hover:shadow-card"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 text-sm font-medium">
                  {t('solutions.badge.popular')}
                </div>
              )}
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <div className="mb-4">
                  <span className={`${pkg.price === 'Contact us' ? 'text-3xl' : 'text-4xl'} font-bold text-primary`}>{pkg.price}</span>
                  {pkg.price.startsWith && pkg.price.startsWith('$') && <span className="text-muted-foreground ml-2">one-time</span>}
                </div>
                <p className="text-muted-foreground mb-6 min-h-[3rem]">{pkg.description}</p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact">
                  <Button
                    className={`w-full ${
                      pkg.popular
                        ? "bg-gradient-to-r from-primary to-secondary hover:shadow-glow"
                        : ""
                    }`}
                    variant={pkg.popular ? "default" : "outline"}
                  >
                    {t('solutions.button.tryFree')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="max-w-2xl mx-auto">
          <Card className="bg-gradient-to-br from-primary to-secondary border-0 text-white shadow-tech">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">{t('solutions.cta.title')}</h3>
              <p className="text-white/90 mb-6">
                {t('solutions.cta.description')}
              </p>
              <Link to="/contact">
                <Button variant="secondary" className="group">
                  {t('solutions.cta.button')}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Solutions;
