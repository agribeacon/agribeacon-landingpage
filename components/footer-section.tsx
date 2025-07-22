import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";

export function FooterSection() {
  return (
    <Section className="bg-gradient-to-br from-emerald-800 via-green-800 to-lime-800 dark:from-emerald-900 dark:via-green-900 dark:to-lime-900 text-white">
      <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
        <CardContent className="p-12 text-center">
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-white">
              🌱 WELCOME TO AGRIBEACON
            </h2>
            <div className="h-1 w-32 bg-gradient-to-r from-yellow-400 to-green-400 mx-auto rounded-full mb-8"></div>
          </div>
          
          <p className="text-2xl md:text-3xl font-semibold mb-8 text-yellow-100">
            HOPE YOU ENJOY THE JOURNEY WITH US!
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 text-center text-lg">
            <div>
              <div className="text-2xl mb-2">🌾</div>
              <p className="text-green-100">Precision Agriculture</p>
            </div>
            <div>
              <div className="text-2xl mb-2">🤖</div>
              <p className="text-green-100">Smart Technology</p>
            </div>
            <div>
              <div className="text-2xl mb-2">🌍</div>
              <p className="text-green-100">Sustainable Future</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="text-center mt-12 text-green-200">
        <p>&copy; 2025 AgriBeacon. All rights reserved.</p>
      </div>
    </Section>
  );
}