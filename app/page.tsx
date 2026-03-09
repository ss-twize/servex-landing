import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Calculator from "@/components/sections/Calculator";
import Solution from "@/components/sections/Solution";
import Comparison from "@/components/sections/Comparison";
import Platform from "@/components/sections/Platform";

export default function Home() {
  return (
    <main>
      <Hero />
      <Problem />
      <Calculator />
      <Solution />
      <Comparison />
      <Platform />
    </main>
  );
}
