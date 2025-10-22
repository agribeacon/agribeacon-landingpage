import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Users, TrendingUp } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Precision",
      description: "We believe in data-driven decisions and accurate measurements for optimal results.",
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "Constantly pushing boundaries with cutting-edge technology and fresh approaches.",
    },
    {
      icon: Users,
      title: "Partnership",
      description: "Working hand-in-hand with farmers to understand and solve real challenges.",
    },
    {
      icon: Eye,
      title: "Sustainability",
      description: "Building solutions that benefit both farms and the planet for generations to come.",
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              About AgriBeacon
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Guiding the future of agriculture with intelligent technology
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-2 shadow-card">
            <CardContent className="p-8">
              <div className="bg-gradient-to-br from-primary to-secondary p-3 rounded-lg w-fit mb-4">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-muted-foreground">
                To become the world's leading provider of intelligent, end-to-end agricultural technology
                solutions for perennial plant farms — enabling them to thrive economically, ecologically,
                and socially.
              </p>
              <p className="text-muted-foreground mt-4">
                We envision a resilient, data-driven farming future that champions sustainable growth,
                environmental responsibility, and long-term community impact — fully aligned with global ESG
                values.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/5 to-primary/5 border-2 shadow-card">
            <CardContent className="p-8">
              <div className="bg-gradient-to-br from-accent to-primary p-3 rounded-lg w-fit mb-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground">
                We empower farmers and agricultural businesses through a unified ecosystem of hardware and
                software — including autonomous drones, robotics, IoT sensors, and AI-powered analytics — to
                optimize every decision from soil to harvest.
              </p>
              <p className="text-muted-foreground mt-4">
                Our mission is to transform agriculture through precision, automation, and insight, delivering
                measurable impact to both people and planet.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Our Name */}
        <Card className="mb-16 bg-card shadow-card">
          <CardContent className="p-8 sm:p-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Why "AgriBeacon"?</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-6xl mb-4">🌾</div>
                <h3 className="text-xl font-bold mb-2 text-primary">Agri</h3>
                <p className="text-muted-foreground">
                  Agriculture, the foundation of our focus and the heart of everything we do.
                </p>
              </div>
              <div className="text-center">
                <div className="text-6xl mb-4">💡</div>
                <h3 className="text-xl font-bold mb-2 text-secondary">Beacon</h3>
                <p className="text-muted-foreground">
                  A guiding light or intelligent signal that shows the way forward.
                </p>
              </div>
            </div>
            <p className="text-center text-muted-foreground mt-8 max-w-2xl mx-auto">
              Together, the name reflects our commitment to providing clear direction, real-time insight, and
              smart automation in a complex and evolving farming environment.
            </p>
          </CardContent>
        </Card>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
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
            <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { value: "500+", label: "Active Farms" },
                { value: "50,000+", label: "Acres Monitored" },
                { value: "25%", label: "Avg. Yield Increase" },
                { value: "30%", label: "Water Savings" },
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
