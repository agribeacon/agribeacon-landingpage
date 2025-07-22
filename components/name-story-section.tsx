import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Navigation } from "lucide-react";

export function NameStorySection() {
  return (
    <Section className="bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50 dark:from-emerald-950 dark:via-green-950 dark:to-lime-950" id="name-story">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 flex items-center justify-center gap-3">
          🔦 Our Name: AgriBeacon
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-green-600 mx-auto rounded-full mb-8"></div>
        
        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
          'AgriBeacon' blends two powerful ideas that define our purpose and approach.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card className="group hover:shadow-xl transition-all duration-500 hover:scale-105 border-green-200 dark:border-green-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardContent className="p-10 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
              <span className="text-4xl">🌾</span>
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4">Agri</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Agriculture, the foundation of our focus and the heart of everything we do.
            </p>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-xl transition-all duration-500 hover:scale-105 border-green-200 dark:border-green-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardContent className="p-10 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
              <Navigation className="h-10 w-10 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h3 className="text-2xl font-bold text-accent mb-4">Beacon</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              A guiding light or intelligent signal that shows the way forward.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="max-w-4xl mx-auto border-green-200 dark:border-green-700 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl">
        <CardContent className="p-10 md:p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-400 to-yellow-400 flex items-center justify-center">
            <Lightbulb className="h-8 w-8 text-white" />
          </div>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Together, the name reflects our commitment to providing clear direction, real-time insight, and smart automation in a complex and evolving farming environment.
          </p>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
            Just as a beacon lights the way through uncertainty, <span className="text-primary font-bold">AgriBeacon</span> empowers farms with the tools to navigate challenges, scale sustainably, and unlock new possibilities.
          </p>
        </CardContent>
      </Card>
    </Section>
  );
}