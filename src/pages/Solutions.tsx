import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Solutions = () => {
  const packages = [
    {
      name: "Starter Package",
      price: "Contact us",
      description: "Perfect for small to medium farms starting their precision agriculture journey",
      features: [
        "5 IoT Soil Sensors",
        "Real-time monitoring dashboard",
        "Basic weather integration",
        "Mobile app access",
        "Email support",
        "Monthly analytics reports",
      ],
      popular: false,
    },
    {
      name: "Professional Package",
      price: "Contact us",
      description: "Complete solution for serious farmers ready to optimize operations",
      features: [
        "15 IoT Multi-sensor stations",
        "1 Autonomous drone with AI vision",
        "Advanced analytics & predictions",
        "Automated irrigation control",
        "Priority support & training",
        "Custom integration options",
        "Weekly optimization reports",
      ],
      popular: true,
    },
    {
      name: "Enterprise Package",
      price: "Custom",
      description: "Full-scale deployment for large agricultural operations",
      features: [
        "Unlimited sensor network",
        "Multiple autonomous drones",
        "Fleet of smart robots",
        "Dedicated AI farm manager",
        "24/7 premium support",
        "On-site installation & training",
        "Custom software development",
        "Real-time consultant access",
      ],
      popular: false,
    },
  ];

  const saasFeatures = [
    "Real-time Farm Dashboard",
    "Predictive Analytics & Forecasting",
    "Automated Alerts & Notifications",
    "Historical Data & Trend Analysis",
    "Resource Optimization Recommendations",
    "Multi-farm Management",
    "API Access for Integrations",
    "Mobile & Desktop Applications",
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Complete Solutions
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Hardware + Software packages designed to transform your agricultural operations from day one
          </p>
        </div>

        {/* SaaS Platform Highlight */}
        <Card className="mb-16 bg-gradient-to-br from-muted/50 to-background border-2 shadow-card">
          <CardContent className="p-8 sm:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">AgriBeacon Farm Management Platform</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Cloud-based SaaS platform included with every package. Monitor, analyze, and optimize your entire farm from anywhere.
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
                  Most Popular
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
                    Try for FREE
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
              <h3 className="text-2xl font-bold mb-4">Need Custom Solutions?</h3>
              <p className="text-white/90 mb-6">
                We work with farms of all sizes to create tailored solutions that meet your specific needs.
                Contact our team to discuss your requirements.
              </p>
              <Link to="/contact">
                <Button variant="secondary" className="group">
                  Contact Sales
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
