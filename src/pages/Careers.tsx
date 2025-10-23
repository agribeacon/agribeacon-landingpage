import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Zap, TrendingUp, MapPin, Clock, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useSimpleLanguage } from "@/contexts/SimpleLanguageContext";

const Careers = () => {
  const { t } = useSimpleLanguage();
  
  const positions = [
    {
      title: t('careers.position.robotics.title'),
      description: t('careers.position.robotics.desc'),
      location: t('careers.position.location'),
      type: t('careers.position.type.fulltime'),
      equity: true,
      onsite: true,
    },
  ];

  const benefits = [
    {
      icon: Users,
      title: t('careers.benefits.impact'),
      description: t('careers.benefits.impact.desc'),
    },
    {
      icon: Zap,
      title: t('careers.benefits.tech'),
      description: t('careers.benefits.tech.desc'),
    },
    {
      icon: TrendingUp,
      title: t('careers.benefits.growth'),
      description: t('careers.benefits.growth.desc'),
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 animate-fade-in-up">
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t('careers.title')}
            </span>
          </h1>
          <h2 className="text-3xl font-semibold mb-6 text-foreground">
            {t('careers.subtitle')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('careers.description')}
          </p>
        </div>

        {/* Why AgriBeacon Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">
            {t('careers.why.title')}
          </h3>
          <p className="text-lg text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            {t('careers.why.subtitle')}
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-card transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                    <benefit.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="text-xl font-semibold mb-4">{benefit.title}</h4>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-4">
            {t('careers.positions.title')}
          </h3>
          <p className="text-lg text-center text-muted-foreground mb-12">
            {t('careers.positions.subtitle')}
          </p>

          <div className="max-w-4xl mx-auto">
            {positions.map((position, index) => (
              <Card key={index} className="mb-6 hover:shadow-card transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="text-2xl font-semibold mb-3">{position.title}</h4>
                      <p className="text-muted-foreground mb-4">{position.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {position.location}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {position.type}
                        </Badge>
                        {position.equity && (
                          <Badge variant="default" className="flex items-center gap-1">
                            <Award className="h-3 w-3" />
                            {t('careers.position.equity')}
                          </Badge>
                        )}
                        {position.onsite && (
                          <Badge variant="secondary">{t('careers.position.onsite')}</Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0">
                      <Link to="/careers/robotics-engineer">
                        <Button className="group">
                          {t('careers.position.viewDetails')}
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Don't See Your Role Section */}
        <Card className="bg-gradient-to-br from-muted/50 to-background border-2 shadow-card">
          <CardContent className="p-8 sm:p-12 text-center">
            <h3 className="text-3xl font-bold mb-4">{t('careers.noRole.title')}</h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('careers.noRole.description')}
            </p>
            <Link to="/contact">
              <Button size="lg" className="group">
                {t('careers.noRole.contact')}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Careers;
