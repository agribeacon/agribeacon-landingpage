import { HeroSection } from "@/components/hero-section";
import { MissionSection } from "@/components/mission-section";
import { NameStorySection } from "@/components/name-story-section";
import { ValuesSection } from "@/components/values-section";
import { AppStoreSupportSection } from "@/components/app-store-support-section";
import { FooterSection } from "@/components/footer-section";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <MissionSection />
      <NameStorySection />
      <ValuesSection />
      <AppStoreSupportSection />
      <FooterSection />
    </main>
  );
}