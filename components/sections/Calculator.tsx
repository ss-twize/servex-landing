"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

function formatRub(value: number): string {
  return value.toLocaleString("ru-RU").replace(/,/g, " ") + " ₽";
}

function useAnimatedNumber(target: number, duration = 400): string {
  const [display, setDisplay] = useState(target);
  const rafRef = useRef(0);
  const startRef = useRef(target);
  const startTimeRef = useRef(0);

  const animate = useCallback(
    (ts: number) => {
      if (!startTimeRef.current) startTimeRef.current = ts;
      const progress = Math.min((ts - startTimeRef.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(startRef.current + (target - startRef.current) * eased));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    },
    [target, duration]
  );

  useEffect(() => {
    startRef.current = display;
    startTimeRef.current = 0;
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, animate]);

  return formatRub(display);
}

type SliderDef = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  onChange: (v: number) => void;
};

function CalcSlider({ label, value, min, max, step, suffix = "", onChange }: SliderDef) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-sx-cream font-heading font-medium text-sm md:text-base">{label}</span>
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
        className="calc-slider w-full h-2 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #00F090 0%, #00F090 ${pct}%, #2A4A47 ${pct}%, #2A4A47 100%)`,
        }}
      />
    </div>
  );
}

export default function Calculator() {
  const [inquiries, setInquiries] = useState(200);
  const [avgTicket, setAvgTicket] = useState(3000);
  const [lossPercent, setLossPercent] = useState(15);

  const monthlyLoss = Math.round(inquiries * avgTicket * (lossPercent / 100));
  const saved = Math.round(monthlyLoss * 0.7);

  const lossDisplay = useAnimatedNumber(monthlyLoss);
  const savedDisplay = useAnimatedNumber(saved);

  return (
    <section id="calculator" className="py-24 md:py-40 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        {/* Section label */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-2xl md:text-3xl font-heading font-bold text-sx-secondary text-center"
        >
          Сколько вы теряете
        </motion.h2>

        {/* Giant number centerpiece */}
        <div className="relative flex flex-col items-center mt-10 md:mt-16">
          {/* Ghost behind */}
          <div
            className="absolute pointer-events-none select-none font-heading font-extrabold text-sx-cream leading-none whitespace-nowrap"
            style={{
              fontSize: "20vw",
              opacity: 0.04,
              filter: "blur(3px)",
              top: "-10px",
            }}
            aria-hidden
          >
            {lossDisplay}
          </div>

          {/* Main number */}
          <div
            className="relative font-heading font-extrabold text-sx-hot leading-none tabular-nums text-center"
            style={{ fontSize: "clamp(4rem, 15vw, 12rem)" }}
          >
            {lossDisplay}
          </div>
          <p className="text-xl text-sx-muted mt-2">потерь в месяц</p>

          {/* Saved counterpoint */}
          <div className="mt-8 flex flex-col items-center">
            <div
              className="font-heading font-bold text-sx-accent leading-none tabular-nums text-center"
              style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
            >
              +{savedDisplay}
            </div>
            <p className="text-sx-muted text-lg mt-1">сохранённой выручки с СЕРВЕКС</p>
          </div>
        </div>

        {/* Sliders row */}
        <div className="mt-12 md:mt-16 flex flex-col md:flex-row gap-8 md:gap-10">
          <CalcSlider
            label="Заявок в месяц"
            value={inquiries}
            min={50}
            max={1000}
            step={10}
            onChange={setInquiries}
          />
          <CalcSlider
            label="Средний чек"
            value={avgTicket}
            min={1000}
            max={10000}
            step={500}
            suffix=" ₽"
            onChange={setAvgTicket}
          />
          <CalcSlider
            label="Потери без системы"
            value={lossPercent}
            min={5}
            max={30}
            step={1}
            suffix="%"
            onChange={setLossPercent}
          />
        </div>
      </div>

      <style jsx>{`
        .calc-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #00F090;
          cursor: pointer;
          border: 2px solid #050A0A;
          box-shadow: 0 0 10px rgba(0, 240, 144, 0.4);
        }
        .calc-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #00F090;
          cursor: pointer;
          border: 2px solid #050A0A;
          box-shadow: 0 0 10px rgba(0, 240, 144, 0.4);
        }
      `}</style>
    </section>
  );
}
