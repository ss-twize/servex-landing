"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import ParallaxLayer from "@/components/ui/ParallaxLayer";

function formatCurrency(value: number): string {
  return value.toLocaleString("ru-RU").replace(/,/g, " ") + " ₽";
}

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);
  const rafRef = useRef<number>(0);
  const startRef = useRef(value);
  const startTimeRef = useRef(0);

  const animate = useCallback(
    (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const duration = 500;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(
        startRef.current + (value - startRef.current) * eased
      );
      setDisplay(current);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    },
    [value]
  );

  useEffect(() => {
    startRef.current = display;
    startTimeRef.current = 0;
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, animate]);

  return <>{formatCurrency(display)}</>;
}

type SliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  onChange: (v: number) => void;
};

function Slider({ label, value, min, max, step, suffix = "", onChange }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="mb-8">
      <div className="flex justify-between items-baseline mb-3">
        <span className="text-sx-cream font-heading font-medium">{label}</span>
        <span className="text-sx-accent font-heading font-bold text-lg tabular-nums">
          {value.toLocaleString("ru-RU")}{suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #01DE82 0%, #01DE82 ${pct}%, #003D3A ${pct}%, #003D3A 100%)`,
        }}
      />
    </div>
  );
}

export default function Calculator() {
  const [inquiries, setInquiries] = useState(200);
  const [avgTicket, setAvgTicket] = useState(3000);
  const [lossPercent, setLossPercent] = useState(15);

  const potential = inquiries * avgTicket;
  const monthlyLoss = Math.round(potential * (lossPercent / 100));
  const savedMonthly = Math.round(monthlyLoss * 0.7);

  return (
    <SectionWrapper id="calculator" className="relative overflow-hidden">
      {/* Giant ghost ₽ background */}
      <ParallaxLayer speed={0.3} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 right-[-5vw] font-heading font-black leading-none select-none"
          style={{
            fontSize: "40vw",
            opacity: 0.03,
            color: "#FDFBED",
            lineHeight: 1,
          }}
        >
          ₽
        </div>
      </ParallaxLayer>

      <div className="relative">
        {/* Heading */}
        <AnimateOnScroll>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-sx-cream">
            Сколько теряет ваш бизнес
          </h2>
        </AnimateOnScroll>

        {/* Asymmetric two-column layout */}
        <div className="mt-12 md:mt-16 flex flex-col md:flex-row gap-8 md:gap-12 items-start">

          {/* Left 55%: sliders */}
          <div className="w-full md:w-[55%]">
            <AnimateOnScroll delay={0.1}>
              <div className="bg-sx-card border border-sx-border rounded-2xl p-6 md:p-8">
                <Slider
                  label="Заявок в месяц"
                  value={inquiries}
                  min={50}
                  max={1000}
                  step={10}
                  onChange={setInquiries}
                />
                <Slider
                  label="Средний чек"
                  value={avgTicket}
                  min={1000}
                  max={10000}
                  step={500}
                  suffix=" ₽"
                  onChange={setAvgTicket}
                />
                <Slider
                  label="Процент потерь без системы"
                  value={lossPercent}
                  min={5}
                  max={30}
                  step={1}
                  suffix="%"
                  onChange={setLossPercent}
                />

                {/* Supporting metrics below sliders */}
                <div className="mt-4 pt-6 border-t border-sx-border grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sx-muted text-xs mb-1">Потенциальная выручка</p>
                    <p className="text-sx-cream font-heading font-bold tabular-nums">
                      <AnimatedNumber value={potential} />
                    </p>
                  </div>
                  <div>
                    <p className="text-sx-muted text-xs mb-1">Потери в год</p>
                    <p className="text-red-400 font-heading font-bold tabular-nums">
                      −<AnimatedNumber value={monthlyLoss * 12} />
                    </p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Right 45%: giant animated number */}
          <div className="w-full md:w-[45%] flex flex-col items-start md:pt-4">
            <AnimateOnScroll delay={0.2}>
              <p className="text-sx-muted text-sm uppercase tracking-widest mb-3 font-body">
                Потери в месяц
              </p>

              {/* Ghost echo number (behind) */}
              <div className="relative">
                <div
                  className="absolute font-heading font-black leading-none text-sx-cream select-none pointer-events-none"
                  style={{
                    fontSize: "clamp(3rem, 8vw, 9vw)",
                    opacity: 0.06,
                    filter: "blur(2px)",
                    top: "-0.08em",
                    left: "0.05em",
                    whiteSpace: "nowrap",
                  }}
                >
                  <AnimatedNumber value={monthlyLoss} />
                </div>
                {/* Foreground number */}
                <div
                  className="relative font-heading font-black leading-none text-sx-cream tabular-nums"
                  style={{ fontSize: "clamp(2.5rem, 8vw, 9vw)", zIndex: 1 }}
                >
                  <AnimatedNumber value={monthlyLoss} />
                </div>
              </div>

              {/* С СЕРВЕКС savings */}
              <div className="mt-6 md:mt-8">
                <p className="text-sx-muted text-sm uppercase tracking-widest mb-2 font-body">
                  С СЕРВЕКС сохраните
                </p>
                <div className="text-3xl md:text-4xl text-sx-accent font-bold font-heading tabular-nums">
                  +<AnimatedNumber value={savedMonthly} />
                </div>
                <p className="text-sx-muted text-sm mt-1">в месяц (−70% потерь)</p>
              </div>
            </AnimateOnScroll>
          </div>

        </div>
      </div>

      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #01DE82;
          cursor: pointer;
          border: 2px solid #020E0E;
          box-shadow: 0 0 8px rgba(1, 222, 130, 0.3);
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #01DE82;
          cursor: pointer;
          border: 2px solid #020E0E;
          box-shadow: 0 0 8px rgba(1, 222, 130, 0.3);
        }
      `}</style>
    </SectionWrapper>
  );
}
