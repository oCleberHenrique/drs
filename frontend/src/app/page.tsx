import ServicesSection from "@/components/ServicesSection";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import DifferentialsSection from "@/components/DifferentialsSection";
import PracticeSection from "@/components/PracticeSection";
import HistorySection from "@/components/HistorySection";
import TeamHomeSection from "@/components/TeamHomeSection";
import BlogHomeSection from "@/components/BlogHomeSection";
import ContactHomeSection from "@/components/ContactHomeSection";

// Força renderização dinâmica (SSR) para que a API seja chamada em runtime na Vercel
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-jakarta bg-white text-gray-900">
      <HeroSection />
      <AboutSection/>
      <DifferentialsSection />
      <PracticeSection />
      <HistorySection/>
      <TeamHomeSection/>
      <BlogHomeSection/>
      <ContactHomeSection/>
    </div>
  );
}