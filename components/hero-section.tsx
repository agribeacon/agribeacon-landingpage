"use client";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Leaf, Zap, Target, TrendingUp } from "lucide-react";

export function HeroSection() {
  return (
    <Section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50 dark:from-emerald-950 dark:via-green-950 dark:to-lime-950">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <Leaf className="h-8 w-8 text-emerald-400 opacity-60" />
      </div>
      <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '1s' }}>
        <Zap className="h-6 w-6 text-yellow-400 opacity-60" />
      </div>
      <div className="absolute bottom-40 left-20 animate-float" style={{ animationDelay: '2s' }}>
        <Target className="h-7 w-7 text-green-400 opacity-60" />
      </div>
      <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: '0.5s' }}>
        <TrendingUp className="h-8 w-8 text-emerald-500 opacity-60" />
      </div>
      
      <div className="text-center z-10 max-w-5xl">
        <div className="mb-6">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-4 animate-in slide-in-from-bottom duration-1000">
            <span className="text-gradient">🌱 AgriBeacon</span>
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-emerald-400 to-green-600 mx-auto rounded-full"></div>
        </div>
        
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-700 dark:text-gray-300 mb-8 animate-in slide-in-from-bottom duration-1000 delay-200">
          Precise signals. Smarter sensing. Sustainable growth.
        </h2>
        
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-green-100 dark:border-green-800 animate-in slide-in-from-bottom duration-1000 delay-400">
          <h3 className="text-xl md:text-2xl font-semibold text-primary mb-6 flex items-center justify-center gap-2">
            🌍 Our Vision
          </h3>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
            To become the world's leading provider of intelligent, end-to-end agricultural technology solutions for perennial plant farms — enabling them to thrive economically, ecologically, and socially.
          </p>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            We envision a resilient, data-driven farming future that champions sustainable growth, environmental responsibility, and long-term community impact — fully aligned with global ESG values.
          </p>
        </div>
        
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center animate-in slide-in-from-bottom duration-1000 delay-600">
          <Button size="lg" className="text-lg px-8 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            Explore Solutions
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/50 dark:bg-gray-800/50">
            Learn More
          </Button>
        </div>
      </div>
    </Section>
  );
}