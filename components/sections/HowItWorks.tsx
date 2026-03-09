"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const steps = [
  {
    num: "01",
    title: "Демо",
    desc: "Знакомство с платформой и разбор ваших задач",
  },
  {
    num: "02",
    title: "Сбор данных",
    desc: "Услуги, расписание, сценарии общения с клиентами",
  },
  {
    num: "03",
    title: "Настройка",
    desc: "Конфигурация системы под ваш бизнес",
  },
  {
    num: "04",
    title: "Запуск",
    desc: "Подключение каналов и старт работы",
  },
  {
    num: "05",
    title: "Мониторинг",
    desc: "Контроль качества и постоянная оптимизация",
  },
];

function StepItem({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-20% 0px -20% 0px" });
  const reversed = index % 2 !== 0;

  return (
    <div
      ref={ref}
      className={`relative min-h-[40vh] flex items-center ${
        reversed ? "flex-row-reverse" : "flex-row"
      } gap-8 md:gap-16`}
    >
      {/* Step dot on the center line */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        aria-hidden="true"
      >
        <motion.div
          className="w-4 h-4 rounded-full border-2 border-sx-accent"
          animate={{
            backgroundColor: inView ? "#01DE82" : "transparent",
            boxShadow: inView
              ? "0 0 16px rgba(1,222,130,0.5)"
              : "none",
          }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Large step number */}
      <div className={`flex-1 flex ${reversed ? "justify-start" : "justify-end"}`}>
        <motion.span
          className="font-heading font-black text-sx-accent select-none pointer-events-none"
          style={{ fontSize: "15vw", lineHeight: 1 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 0.12 : 0 }}
          transition={{ duration: 0.5 }}
          aria-hidden="true"
        >
          {step.num}
        </motion.span>
      </div>

      {/* Content */}
      <motion.div
        className={`flex-1 ${reversed ? "text-right pr-4 md:pr-8" : "text-left pl-4 md:pl-8"}`}
        initial={{ opacity: 0, x: reversed ? 30 : -30 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: reversed ? 30 : -30 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-sx-accent font-heading text-sm font-semibold tracking-widest uppercase mb-2">
          {step.num}
        </p>
        <h3 className="font-heading text-2xl md:text-3xl font-bold text-sx-cream">
          {step.title}
        </h3>
        <p className="text-sx-muted text-base mt-3 max-w-xs leading-relaxed">
          {step.desc}
        </p>
      </motion.div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <SectionWrapper id="launch" className="relative overflow-hidden">
      {/* Subtle horizontal stripe background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-0 right-0 h-px bg-sx-accent"
            style={{ top: `${(i / 12) * 100}%`, opacity: 0.02 }}
            animate={{ x: ["-5%", "5%", "-5%"] }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <AnimateOnScroll>
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-sx-cream text-center relative z-10">
          Как проходит запуск
        </h2>
      </AnimateOnScroll>

      <div className="mt-16 relative z-10">
        {/* Vertical connecting line */}
        <div
          className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px pointer-events-none"
          style={{ backgroundColor: "rgba(0,61,58,0.5)" }}
          aria-hidden="true"
        />

        <div className="space-y-4">
          {steps.map((step, i) => (
            <StepItem key={step.num} step={step} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
