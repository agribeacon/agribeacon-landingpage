import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plane, Radio, Cpu, Sparkles, Wifi, Battery, Cloud, Shield } from "lucide-react";
import droneTech from "@/assets/drone-tech.jpg";
import iotSensor from "@/assets/iot-sensor.jpg";
import robotFarming from "@/assets/robot-farming.jpg";

const Technology = () => {
  const technologies = [
    {
      id: "drones",
      name: "Autonomous Drones",
      icon: Plane,
      image: droneTech,
      description: "Advanced aerial intelligence for comprehensive farm monitoring and data collection",
      specs: [
        { label: "Flight Time", value: "45 minutes" },
        { label: "Coverage Area", value: "200 acres/flight" },
        { label: "Camera Resolution", value: "4K multispectral" },
        { label: "AI Processing", value: "Real-time onboard" },
      ],
      features: [
        "Autonomous flight planning and execution",
        "Multi-spectral imaging for crop health analysis",
        "Real-time pest and disease detection",
        "Precision spraying capabilities",
        "3D terrain mapping",
        "Weather-resistant design (IP54)",
      ],
    },
    {
      id: "sensors",
      name: "IoT Sensors",
      icon: Radio,
      image: iotSensor,
      description: "Comprehensive environmental monitoring with enterprise-grade reliability",
      specs: [
        { label: "Battery Life", value: "3+ years" },
        { label: "Range", value: "10km LoRaWAN" },
        { label: "Data Frequency", value: "Every 15 minutes" },
        { label: "Sensors per Unit", value: "8+ parameters" },
      ],
      features: [
        "Soil moisture, temperature, and pH monitoring",
        "Weather data (temp, humidity, rainfall, wind)",
        "Light intensity and UV index tracking",
        "Air quality and CO2 measurement",
        "Solar-powered with backup battery",
        "Waterproof and weatherproof (IP67)",
      ],
    },
    {
      id: "robotics",
      name: "Smart Robotics",
      icon: Cpu,
      image: robotFarming,
      description: "Autonomous robotic systems for precision farming tasks and labor automation",
      specs: [
        { label: "Operating Time", value: "8-12 hours" },
        { label: "Precision", value: "±2cm accuracy" },
        { label: "Payload", value: "50kg capacity" },
        { label: "Speed", value: "0.5-2 m/s" },
      ],
      features: [
        "Automated weeding with 99% accuracy",
        "Precision planting and seeding",
        "Selective harvesting capabilities",
        "Navigation via GPS + computer vision",
        "Obstacle detection and avoidance",
        "Autonomous charging and route planning",
      ],
    },
    {
      id: "ai",
      name: "AI Analytics",
      icon: Sparkles,
      image: iotSensor,
      description: "Machine learning-powered insights and predictive analytics for optimal farm management",
      specs: [
        { label: "Processing", value: "Cloud + Edge" },
        { label: "Predictions", value: "7-30 day forecast" },
        { label: "Accuracy", value: "92%+ average" },
        { label: "Data Points", value: "1M+ daily" },
      ],
      features: [
        "Yield prediction and optimization",
        "Disease outbreak early warning system",
        "Irrigation scheduling recommendations",
        "Harvest timing optimization",
        "Resource allocation planning",
        "Historical trend analysis and benchmarking",
      ],
    },
  ];

  const platformFeatures = [
    { icon: Cloud, title: "Cloud Platform", description: "Secure, scalable infrastructure" },
    { icon: Shield, title: "Data Security", description: "Bank-level encryption" },
    { icon: Wifi, title: "Multi-Network", description: "LoRaWAN, 4G, WiFi, Satellite" },
    { icon: Battery, title: "Energy Efficient", description: "Solar + long-life batteries" },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Our Technology
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Cutting-edge hardware and intelligent software working in perfect harmony
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
                    <h4 className="font-bold mb-4">Key Features</h4>
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
            <h2 className="text-3xl font-bold mb-4">Seamless Integration</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              All our technology works together through the AgriBeacon platform, providing a unified view
              of your farm operations with real-time data synchronization and intelligent automation.
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
