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

const BestPractices = () => {
  const circularEconomyPractices = [
    {
      title: "Waste-to-Resource Systems",
      description: "Transform agricultural waste into valuable resources through composting, biogas production, and organic fertilizer creation.",
      icon: Recycle,
      tips: [
        "Implement on-farm composting systems for organic waste",
        "Convert crop residues into bioenergy or biochar",
        "Use animal waste for biogas and natural fertilizers",
        "Establish closed-loop nutrient cycles"
      ]
    },
    {
      title: "Water循環 & Reuse",
      description: "Maximize water efficiency through recycling, rainwater harvesting, and precision irrigation systems.",
      icon: Droplet,
      tips: [
        "Install rainwater collection and storage systems",
        "Implement drip irrigation with moisture sensors",
        "Reuse treated wastewater for non-food crops",
        "Monitor and minimize water evaporation losses"
      ]
    },
    {
      title: "Regenerative Agriculture",
      description: "Build soil health and biodiversity while producing food, creating a self-sustaining ecosystem.",
      icon: Leaf,
      tips: [
        "Practice crop rotation and cover cropping",
        "Minimize soil disturbance with no-till methods",
        "Integrate livestock for natural fertilization",
        "Preserve and enhance biodiversity corridors"
      ]
    },
    {
      title: "Resource Sharing Economy",
      description: "Optimize equipment utilization and reduce costs through collaborative farming models.",
      icon: Users,
      tips: [
        "Share expensive machinery with neighboring farms",
        "Participate in cooperative buying programs",
        "Exchange knowledge and best practices locally",
        "Pool resources for bulk renewable energy investments"
      ]
    }
  ];

  const esgPrinciples = [
    {
      category: "Environmental",
      icon: Leaf,
      color: "from-primary to-secondary",
      practices: [
        {
          title: "Carbon Sequestration",
          description: "Capture and store atmospheric CO2 through soil management and tree planting",
          metrics: "Target: Net-zero or carbon-negative operations"
        },
        {
          title: "Biodiversity Protection",
          description: "Preserve native species, create wildlife habitats, and maintain ecological balance",
          metrics: "Measure: Species diversity index and habitat area"
        },
        {
          title: "Clean Energy Transition",
          description: "Adopt solar, wind, and biogas to power farm operations sustainably",
          metrics: "Goal: 80%+ renewable energy by 2030"
        },
        {
          title: "Pollution Prevention",
          description: "Eliminate chemical runoff, reduce pesticide use, and minimize plastic waste",
          metrics: "Track: Water quality and chemical usage reduction"
        }
      ]
    },
    {
      category: "Social",
      icon: Users,
      color: "from-secondary to-accent",
      practices: [
        {
          title: "Fair Labor Practices",
          description: "Ensure safe working conditions, fair wages, and worker well-being",
          metrics: "Certify: Fair Trade or equivalent standards"
        },
        {
          title: "Community Engagement",
          description: "Support local communities, create jobs, and contribute to regional development",
          metrics: "Measure: Local employment rate and community investment"
        },
        {
          title: "Knowledge Transfer",
          description: "Train next-generation farmers and share sustainable practices",
          metrics: "Target: Annual training programs and apprenticeships"
        },
        {
          title: "Food Security",
          description: "Contribute to local and regional food availability and accessibility",
          metrics: "Track: Production volume and distribution reach"
        }
      ]
    },
    {
      category: "Governance",
      icon: Target,
      color: "from-accent to-primary",
      practices: [
        {
          title: "Transparent Reporting",
          description: "Publish sustainability reports and share environmental impact data",
          metrics: "Annual ESG disclosure and third-party audits"
        },
        {
          title: "Ethical Supply Chains",
          description: "Partner with responsible suppliers and ensure traceability",
          metrics: "100% supplier compliance verification"
        },
        {
          title: "Data-Driven Decisions",
          description: "Use analytics and monitoring to guide sustainability improvements",
          metrics: "Real-time dashboards and quarterly reviews"
        },
        {
          title: "Stakeholder Engagement",
          description: "Involve farmers, investors, and communities in decision-making",
          metrics: "Regular stakeholder consultations and feedback loops"
        }
      ]
    }
  ];

  const techBestPractices = [
    {
      title: "Precision Agriculture",
      icon: Target,
      description: "Use data and technology to optimize inputs and maximize yields",
      implementations: [
        "GPS-guided equipment for precise planting and spraying",
        "Variable rate technology (VRT) for fertilizer application",
        "Yield mapping to identify high and low-performing zones",
        "Soil sampling and analysis for targeted amendments"
      ]
    },
    {
      title: "IoT Sensor Networks",
      icon: Cpu,
      description: "Deploy connected sensors for real-time farm monitoring",
      implementations: [
        "Soil moisture sensors for irrigation optimization",
        "Weather stations for microclimate tracking",
        "Livestock monitoring for health and behavior",
        "Equipment sensors for predictive maintenance"
      ]
    },
    {
      title: "Renewable Energy Integration",
      icon: Sun,
      description: "Harness clean energy sources to power operations",
      implementations: [
        "Solar panels on barn roofs and unused land",
        "Wind turbines in suitable locations",
        "Biogas digesters for waste-to-energy conversion",
        "Energy storage systems for 24/7 availability"
      ]
    },
    {
      title: "Data Analytics & AI",
      icon: TrendingUp,
      description: "Leverage artificial intelligence for predictive insights",
      implementations: [
        "Crop disease prediction and early detection",
        "Yield forecasting based on historical and weather data",
        "Market price prediction for optimal selling times",
        "Automated decision support systems"
      ]
    }
  ];

  const farmingBestPractices = [
    {
      category: "Soil Health",
      practices: [
        "Test soil regularly (at least annually) for nutrient levels and pH",
        "Practice crop rotation to prevent nutrient depletion",
        "Use cover crops to prevent erosion and add organic matter",
        "Apply compost and organic amendments instead of synthetic fertilizers",
        "Minimize tillage to preserve soil structure and microbiomes"
      ]
    },
    {
      category: "Water Management",
      practices: [
        "Install drip or micro-sprinkler irrigation for efficiency",
        "Schedule irrigation based on actual crop needs, not routines",
        "Mulch around plants to reduce evaporation",
        "Capture and store rainwater for dry periods",
        "Monitor soil moisture continuously with sensors"
      ]
    },
    {
      category: "Pest & Disease Control",
      practices: [
        "Implement Integrated Pest Management (IPM) strategies",
        "Use biological controls (beneficial insects, microbes) first",
        "Scout fields regularly for early pest detection",
        "Rotate crops to break pest and disease cycles",
        "Choose disease-resistant varieties when available"
      ]
    },
    {
      category: "Crop Management",
      practices: [
        "Select varieties suited to your climate and soil",
        "Plant at optimal times based on weather and soil conditions",
        "Maintain proper spacing for air circulation and light",
        "Monitor growth stages and adjust inputs accordingly",
        "Harvest at peak maturity for maximum quality and shelf life"
      ]
    },
    {
      category: "Record Keeping",
      practices: [
        "Document all planting, treatment, and harvest activities",
        "Track input costs and yields for profitability analysis",
        "Maintain equipment maintenance logs",
        "Record weather patterns and their impact on crops",
        "Use farm management software for centralized data"
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
            <span className="text-sm font-medium text-primary">Knowledge Hub</span>
          </div>
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Best Practices
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Modern farming strategies for sustainability, profitability, and environmental stewardship
          </p>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="circular" className="w-full mb-16">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8 h-auto">
            <TabsTrigger value="circular" className="py-3">
              <Recycle className="h-4 w-4 mr-2" />
              Circular Economy
            </TabsTrigger>
            <TabsTrigger value="esg" className="py-3">
              <Leaf className="h-4 w-4 mr-2" />
              ESG Framework
            </TabsTrigger>
            <TabsTrigger value="technology" className="py-3">
              <Cpu className="h-4 w-4 mr-2" />
              Technology
            </TabsTrigger>
            <TabsTrigger value="farming" className="py-3">
              <Sun className="h-4 w-4 mr-2" />
              Farming Practices
            </TabsTrigger>
          </TabsList>

          {/* Circular Economy Tab */}
          <TabsContent value="circular" className="animate-fade-in-up">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">Circular Economy for Modern Farms</h2>
              <p className="text-lg text-muted-foreground max-w-3xl">
                Transform your farm into a closed-loop system where waste becomes a resource, 
                reducing costs and environmental impact while improving resilience.
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
              <h2 className="text-3xl font-bold mb-4">ESG Framework for Agriculture</h2>
              <p className="text-lg text-muted-foreground max-w-3xl">
                Adopt Environmental, Social, and Governance principles to build a sustainable, 
                responsible farm that meets modern investor and consumer expectations.
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
              <h2 className="text-3xl font-bold mb-4">Technology Best Practices</h2>
              <p className="text-lg text-muted-foreground max-w-3xl">
                Leverage cutting-edge agricultural technology to optimize operations, 
                reduce waste, and make data-driven decisions.
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
              <h2 className="text-3xl font-bold mb-4">Core Farming Best Practices</h2>
              <p className="text-lg text-muted-foreground max-w-3xl">
                Time-tested and science-backed agricultural practices that form the foundation 
                of successful, sustainable farming operations.
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
                Ready to Implement These Practices?
              </h2>
              <p className="text-white/90 text-lg mb-8">
                AgriBeacon's intelligent platform helps you track, measure, and optimize all these 
                best practices with real-time data and actionable insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/solutions">
                  <Button size="lg" variant="secondary" className="group">
                    Explore Solutions
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                    Get Expert Guidance
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
