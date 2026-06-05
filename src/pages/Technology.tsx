import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plane, Radio, Cpu, Sparkles, Wifi, Battery, Cloud, Shield } from "lucide-react";
import droneTech from "@/assets/drone-tech.jpg";
import iotSensor from "@/assets/iot-sensor.jpg";
import robotFarming from "@/assets/robot-farming.jpg";
import { useSimpleLanguage } from "@/contexts/SimpleLanguageContext";

const Technology = () => {
  const { t } = useSimpleLanguage();
  const technologies = [
    {
      id: "drones",
      name: t('tech.drones.name'),
      icon: Plane,
      image: droneTech,
      description: t('tech.drones.description'),
      specs: [
        { label: t('tech.drones.spec1.label'), value: t('tech.drones.spec1.value') },
        { label: t('tech.drones.spec2.label'), value: t('tech.drones.spec2.value') },
        { label: t('tech.drones.spec3.label'), value: t('tech.drones.spec3.value') },
        { label: t('tech.drones.spec4.label'), value: t('tech.drones.spec4.value') },
      ],
      features: [
        t('tech.drones.feature1'),
        t('tech.drones.feature2'),
        t('tech.drones.feature3'),
        t('tech.drones.feature4'),
        t('tech.drones.feature5'),
        t('tech.drones.feature6'),
      ],
    },
    {
      id: "sensors",
      name: t('tech.sensors.name'),
      icon: Radio,
      image: iotSensor,
      description: t('tech.sensors.description'),
      specs: [
        { label: t('tech.sensors.spec1.label'), value: t('tech.sensors.spec1.value') },
        { label: t('tech.sensors.spec2.label'), value: t('tech.sensors.spec2.value') },
        { label: t('tech.sensors.spec3.label'), value: t('tech.sensors.spec3.value') },
        { label: t('tech.sensors.spec4.label'), value: t('tech.sensors.spec4.value') },
      ],
      features: [
        t('tech.sensors.feature1'),
        t('tech.sensors.feature2'),
        t('tech.sensors.feature3'),
        t('tech.sensors.feature4'),
        t('tech.sensors.feature5'),
        t('tech.sensors.feature6'),
      ],
    },
    {
      id: "robotics",
      name: t('tech.robotics.name'),
      icon: Cpu,
      image: robotFarming,
      description: t('tech.robotics.description'),
      specs: [
        { label: t('tech.robotics.spec1.label'), value: t('tech.robotics.spec1.value') },
        { label: t('tech.robotics.spec2.label'), value: t('tech.robotics.spec2.value') },
        { label: t('tech.robotics.spec3.label'), value: t('tech.robotics.spec3.value') },
        { label: t('tech.robotics.spec4.label'), value: t('tech.robotics.spec4.value') },
      ],
      features: [
        t('tech.robotics.feature1'),
        t('tech.robotics.feature2'),
        t('tech.robotics.feature3'),
        t('tech.robotics.feature4'),
        t('tech.robotics.feature5'),
        t('tech.robotics.feature6'),
      ],
    },
    {
      id: "ai",
      name: t('tech.ai.name'),
      icon: Sparkles,
      image: iotSensor,
      description: t('tech.ai.description'),
      specs: [
        { label: t('tech.ai.spec1.label'), value: t('tech.ai.spec1.value') },
        { label: t('tech.ai.spec2.label'), value: t('tech.ai.spec2.value') },
        { label: t('tech.ai.spec3.label'), value: t('tech.ai.spec3.value') },
        { label: t('tech.ai.spec4.label'), value: t('tech.ai.spec4.value') },
      ],
      features: [
        t('tech.ai.feature1'),
        t('tech.ai.feature2'),
        t('tech.ai.feature3'),
        t('tech.ai.feature4'),
        t('tech.ai.feature5'),
        t('tech.ai.feature6'),
      ],
    },
  ];

  const platformFeatures = [
    { icon: Cloud, title: t('tech.platform.cloud'), description: t('tech.platform.cloud.desc') },
    { icon: Shield, title: t('tech.platform.security'), description: t('tech.platform.security.desc') },
    { icon: Wifi, title: t('tech.platform.network'), description: t('tech.platform.network.desc') },
    { icon: Battery, title: t('tech.platform.energy'), description: t('tech.platform.energy.desc') },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t('tech.title')}
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            {t('tech.subtitle')}
          </p>
        </div>

        {/* Platform Features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {platformFeatures.map((feature, index) => (
            <Card
              key={feature.title}
              className="hover:shadow-card transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 text-center">
                <div className="bg-gradient-to-br from-primary to-secondary p-4 rounded-lg w-fit mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technology Details */}
        <Tabs defaultValue="drones" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8 h-auto">
            {technologies.map((tech) => (
              <TabsTrigger key={tech.id} value={tech.id} className="py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
                <tech.icon className="h-4 w-4 mr-2" />
                {tech.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {technologies.map((tech) => (
            <TabsContent key={tech.id} value={tech.id} className="animate-fade-in-up">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Image */}
                <div className="relative rounded-xl overflow-hidden h-[400px] group">
                  <img
                    src={tech.image}
                    alt={tech.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <div className="bg-gradient-to-br from-primary to-secondary p-3 rounded-lg mb-2">
                      <tech.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{tech.name}</h3>
                  </div>
                </div>

                {/* Details */}
                <div>
                  <p className="text-muted-foreground mb-6">{tech.description}</p>

                  {/* Specs */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {tech.specs.map((spec) => (
                      <Card key={spec.label} className="bg-muted/50">
                        <CardContent className="p-4">
                          <div className="text-sm text-muted-foreground mb-1">{spec.label}</div>
                          <div className="font-bold text-primary">{spec.value}</div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="font-bold mb-4">{t('tech.keyFeatures')}</h4>
                    <div className="grid gap-3">
                      {tech.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-3">
                          <div className="bg-primary/10 p-1 rounded-full mt-1">
                            <div className="h-2 w-2 bg-primary rounded-full" />
                          </div>
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Integration Section */}
        <Card className="mt-16 bg-gradient-to-br from-muted/50 to-background border-2 shadow-card">
          <CardContent className="p-8 sm:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">{t('tech.integration.title')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              {t('tech.integration.description')}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-primary/10 px-4 py-2 rounded-full">REST API</div>
              <div className="bg-primary/10 px-4 py-2 rounded-full">WebSocket Real-time</div>
              <div className="bg-primary/10 px-4 py-2 rounded-full">Third-party Integrations</div>
              <div className="bg-primary/10 px-4 py-2 rounded-full">Custom Webhooks</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Technology;
