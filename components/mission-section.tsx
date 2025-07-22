import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Plane, Bot, Cpu, BarChart3 } from "lucide-react";

export function MissionSection() {
  const technologies = [
    {
      icon: Plane,
      title: "Autonomous Drones",
      description: "Intelligent aerial monitoring and data collection"
    },
    {
      icon: Bot,
      title: "Smart Robotics", 
      description: "Automated farming operations and precision tasks"
    },
    {
      icon: Cpu,
      title: "IoT Sensors",
      description: "Real-time environmental monitoring and alerts"
    },
    {
      icon: BarChart3,
      title: "AI Analytics",
      description: "Data-driven insights for optimal decision making"
    }
  ];

  return (
    <Section className="bg-white dark:bg-gray-900" id="mission">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 flex items-center justify-center gap-3">
          🎯 Our Mission
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-green-600 mx-auto rounded-full mb-8"></div>
        
        <div className="max-w-4xl mx-auto">
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
            We empower farmers and agricultural businesses through a unified ecosystem of hardware and software — including autonomous drones, robotics, IoT sensors, and AI-powered analytics — to optimize every decision from soil to harvest.
          </p>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            Our mission is to transform agriculture through precision, automation, and insight, delivering measurable impact to both people and planet.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
        {technologies.map((tech, index) => (
          <Card key={index} className="group hover:shadow-xl transition-all duration-500 hover:scale-105 border-green-100 dark:border-green-800 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950 dark:to-green-950">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                <tech.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">{tech.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{tech.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}