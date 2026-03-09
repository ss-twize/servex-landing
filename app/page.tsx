import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Calculator from "@/components/sections/Calculator";
import Solution from "@/components/sections/Solution";
import Comparison from "@/components/sections/Comparison";
import Platform from "@/components/sections/Platform";
import Features from "@/components/sections/Features";
import Integrations from "@/components/sections/Integrations";
import ForWhom from "@/components/sections/ForWhom";
import Pricing from "@/components/sections/Pricing";
import HowItWorks from "@/components/sections/HowItWorks";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Problem />
      <Calculator />
      <Solution />
      <Comparison />
      <Platform />
      <Features />
      <Integrations />
      <ForWhom />
      <Pricing />
      <HowItWorks />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
