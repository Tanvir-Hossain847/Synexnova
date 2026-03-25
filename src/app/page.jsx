import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import StartupSection from "@/components/StartupSection";
import StatsSection from "@/components/StatsSection";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Slider from "@/components/Slider";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Slider/>
      <Features />
      <StartupSection />
      <StatsSection />
      <Testimonials />
      <FAQ />
    </main>
  );
}
