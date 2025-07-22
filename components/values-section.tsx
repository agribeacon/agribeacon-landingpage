import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Users, Target, RotateCcw, TrendingUp } from "lucide-react";

export function ValuesSection() {
  const values = [
    {
      icon: Lightbulb,
      title: "INVENT",
      subtitle: "Ideas are our seeds. We plant them every day.",
      description: "We cultivate curiosity, innovation, and experimentation — because progress starts with imagination.",
      color: "from-blue-400 to-purple-600",
      bgColor: "bg-blue-50 dark:bg-blue-950"
    },
    {
      icon: Users,
      title: "COLLABORATE",
      subtitle: "We listen. We lift. We win together.",
      description: "We build with empathy and teamwork. Success is shared — across people, partners, and the planet.",
      color: "from-emerald-400 to-teal-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-950"
    },
    {
      icon: Target,
      title: "DELIVER",
      subtitle: "Results matter. Impact speaks louder than plans.",
      description: "We take action. We measure outcomes. We don't just promise value — we create it.",
      color: "from-orange-400 to-red-600",
      bgColor: "bg-orange-50 dark:bg-orange-950"
    },
    {
      icon: RotateCcw,
      title: "ADAPT",
      subtitle: "We flex. We learn. We lead the changes.",
      description: "The world keeps moving, and so do we. With resilience and reflection, we turn change into opportunity.",
      color: "from-cyan-400 to-blue-600",
      bgColor: "bg-cyan-50 dark:bg-cyan-950"
    },
    {
      icon: TrendingUp,
      title: "RISE",
      subtitle: "We rise above. We raise our game. We aim higher.",
      description: "We go beyond the expected — challenging limits, inspiring each other, and always reaching upward.",
      color: "from-yellow-400 to-orange-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-950"
    }
  ];

  return (
    <Section className="bg-white dark:bg-gray-900" id="values">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 flex items-center justify-center gap-3">
          ⭐ Our Core Values
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-green-600 mx-auto rounded-full mb-8"></div>
        
        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
          Five principles that guide everything we do and inspire how we grow together.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {values.map((value, index) => (
          <Card key={index} className={`group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-2 border-gray-100 dark:border-gray-700 overflow-hidden ${value.bgColor}`}>
            <CardContent className="p-8 h-full">
              <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <value.icon className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 text-center">{value.title}</h3>
              
              <p className="text-lg font-medium text-primary mb-4 text-center italic">
                "{value.subtitle}"
              </p>
              
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-center">
                {value.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}