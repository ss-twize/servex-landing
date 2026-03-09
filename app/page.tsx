import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Solution from "@/components/sections/Solution";
import Features from "@/components/sections/Features";
import Platform from "@/components/sections/Platform";
import Ecosystem from "@/components/sections/Ecosystem";
import Integrations from "@/components/sections/Integrations";
import Calculator from "@/components/sections/Calculator";
import Comparison from "@/components/sections/Comparison";
import Pricing from "@/components/sections/Pricing";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Problem />
      <Solution />
      <Features />
      <Platform />
      <Ecosystem />
      <Integrations />
      <Calculator />
      <Comparison />
      <Pricing />
      <FinalCTA />
    </main>
  );
}
