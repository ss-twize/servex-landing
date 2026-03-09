"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

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
  const yearlyLoss = monthlyLoss * 12;
  const savedMonthly = Math.round(monthlyLoss * 0.7);
  const savedYearly = savedMonthly * 12;

  return (
    <SectionWrapper id="calculator">
      <AnimateOnScroll>
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-sx-cream text-center">
          Сколько теряет ваш бизнес
        </h2>
      </AnimateOnScroll>

      <div className="mt-16 max-w-4xl mx-auto">
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
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <AnimateOnScroll delay={0.2}>
            <div className="bg-sx-card border border-sx-border rounded-2xl p-6 md:p-8 h-full">
              <h3 className="font-heading text-lg font-semibold text-sx-muted mb-6">
                Без СЕРВЕКС
              </h3>
              <div className="space-y-5">
                <div>
                  <p className="text-sx-muted text-sm mb-1">Потенциальная выручка</p>
                  <p className="text-sx-cream font-heading text-xl font-bold tabular-nums">
                    <AnimatedNumber value={potential} />
                  </p>
                </div>
                <div>
                  <p className="text-sx-muted text-sm mb-1">Потери в месяц</p>
                  <p className="text-red-400 font-heading text-xl font-bold tabular-nums">
                    −<AnimatedNumber value={monthlyLoss} />
                  </p>
                </div>
                <div>
                  <p className="text-sx-muted text-sm mb-1">Потери в год</p>
                  <p className="text-red-400 font-heading text-2xl font-bold tabular-nums">
                    −<AnimatedNumber value={yearlyLoss} />
                  </p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.3}>
            <div className="bg-sx-card border border-sx-border rounded-2xl p-6 md:p-8 h-full hover:border-sx-accent/50 transition-colors duration-300">
              <h3 className="font-heading text-lg font-semibold text-sx-accent mb-6">
                С СЕРВЕКС
              </h3>
              <div className="space-y-5">
                <div>
                  <p className="text-sx-muted text-sm mb-1">Сокращение потерь на 70%</p>
                  <p className="text-sx-cream font-heading text-xl font-bold tabular-nums">
                    <AnimatedNumber value={potential} />
                  </p>
                </div>
                <div>
                  <p className="text-sx-muted text-sm mb-1">Сохранённая выручка в месяц</p>
                  <p className="text-sx-accent font-heading text-xl font-bold tabular-nums">
                    +<AnimatedNumber value={savedMonthly} />
                  </p>
                </div>
                <div>
                  <p className="text-sx-muted text-sm mb-1">Сохранённая выручка в год</p>
                  <p className="text-sx-accent font-heading text-2xl font-bold tabular-nums">
                    +<AnimatedNumber value={savedYearly} />
                  </p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
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
