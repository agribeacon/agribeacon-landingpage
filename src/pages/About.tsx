import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Users, TrendingUp } from "lucide-react";
import { useSimpleLanguage } from "@/contexts/SimpleLanguageContext";

const About = () => {
  const { t } = useSimpleLanguage();
  
  const values = [
    {
      icon: Target,
      title: t('about.values.precision'),
      description: t('about.values.precision.desc'),
    },
    {
      icon: TrendingUp,
      title: t('about.values.innovation'),
      description: t('about.values.innovation.desc'),
    },
    {
      icon: Users,
      title: t('about.values.partnership'),
      description: t('about.values.partnership.desc'),
    },
    {
      icon: Eye,
      title: t('about.values.sustainability'),
      description: t('about.values.sustainability.desc'),
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t('about.title')}
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            {t('about.subtitle')}
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-2 shadow-card">
            <CardContent className="p-8">
              <div className="bg-gradient-to-br from-primary to-secondary p-3 rounded-lg w-fit mb-4">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4">{t('about.vision.title')}</h2>
              <p className="text-muted-foreground">
                {t('about.vision.text1')}
              </p>
              <p className="text-muted-foreground mt-4">
                {t('about.vision.text2')}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/5 to-primary/5 border-2 shadow-card">
            <CardContent className="p-8">
              <div className="bg-gradient-to-br from-accent to-primary p-3 rounded-lg w-fit mb-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4">{t('about.mission.title')}</h2>
              <p className="text-muted-foreground">
                {t('about.mission.text1')}
              </p>
              <p className="text-muted-foreground mt-4">
                {t('about.mission.text2')}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Our Name */}
        <Card className="mb-16 bg-card shadow-card">
          <CardContent className="p-8 sm:p-12">
            <h2 className="text-3xl font-bold mb-6 text-center">{t('about.name.title')}</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-6xl mb-4">🌾</div>
                <h3 className="text-xl font-bold mb-2 text-primary">{t('about.name.agri')}</h3>
                <p className="text-muted-foreground">
                  {t('about.name.agri.desc')}
                </p>
              </div>
              <div className="text-center">
                <div className="text-6xl mb-4">💡</div>
                <h3 className="text-xl font-bold mb-2 text-secondary">{t('about.name.beacon')}</h3>
                <p className="text-muted-foreground">
                  {t('about.name.beacon.desc')}
                </p>
              </div>
            </div>
            <p className="text-center text-muted-foreground mt-8 max-w-2xl mx-auto">
              {t('about.name.together')}
            </p>
          </CardContent>
        </Card>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">{t('about.values.title')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={value.title}
                className="hover:shadow-card transition-all duration-300 hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="bg-gradient-to-br from-primary to-secondary p-4 rounded-lg w-fit mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Impact Stats */}
        <Card className="bg-gradient-to-br from-primary to-secondary border-0 text-white shadow-tech">
          <CardContent className="p-8 sm:p-12">
            <h2 className="text-3xl font-bold text-center mb-12">{t('about.impact.title')}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { value: "500+", label: t('about.impact.farms') },
                { value: "50,000+", label: t('about.impact.acres') },
                { value: "25%", label: t('about.impact.yield') },
                { value: "30%", label: t('about.impact.water') },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-5xl font-bold mb-2">{stat.value}</div>
                  <div className="text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
