"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import Button from "@/components/ui/Button";

const periods = [
  { label: "1 мес", months: 1 },
  { label: "3 мес", months: 3 },
  { label: "6 мес", months: 6 },
] as const;

const agentPricing: Record<number, { price: number; savings?: string }> = {
  1: { price: 25000 },
  3: { price: 22000, savings: "Экономия 9 000 \u20BD за период" },
  6: { price: 21000, savings: "Экономия 24 000 \u20BD за период" },
};

const agentFeatures = [
  "Обработка обращений 24/7",
  "Запись, перенос, отмена",
  "Аналитика и отчёты",
  "Интеграция с мессенджерами",
  "Настраиваемые сценарии",
  "Контроль качества",
];

const agentNotes = [
  "Дешевле штатного администратора",
  "Прозрачные условия",
  "Без скрытых платежей",
  "Запуск от 1 дня",
];

const voiceFeatures = [
  "Приём входящих звонков",
  "Запись по телефону",
  "Переключение на оператора",
];

const enterpriseFeatures = [
  "Мультилокационная поддержка",
  "Индивидуальная настройка",
  "Выделенный менеджер",
  "Кастомные интеграции",
  "SLA и приоритетная поддержка",
];

function CheckIcon({ muted = false }: { muted?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 mt-0.5 ${muted ? "text-sx-muted" : "text-sx-accent"}`}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function formatPrice(n: number) {
  return n.toLocaleString("ru-RU");
}

export default function Pricing() {
  const [selectedPeriod, setSelectedPeriod] = useState(3);
  const pricing = agentPricing[selectedPeriod];

  return (
    <SectionWrapper id="pricing">
      <AnimateOnScroll>
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-sx-cream text-center">
          Тарифы
        </h2>
      </AnimateOnScroll>

      {/* Billing toggle */}
      <AnimateOnScroll delay={0.1}>
        <div className="flex justify-center mt-10">
          <div className="inline-flex bg-sx-card border border-sx-border rounded-full p-1 gap-1">
            {periods.map((p) => (
              <button
                key={p.months}
                onClick={() => setSelectedPeriod(p.months)}
                className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer ${
                  selectedPeriod === p.months
                    ? "text-sx-deep"
                    : "text-sx-muted hover:text-sx-cream"
                }`}
              >
                {selectedPeriod === p.months && (
                  <motion.div
                    layoutId="pricing-pill"
                    className="absolute inset-0 bg-sx-accent rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{p.label}</span>
              </button>
            ))}
          </div>
        </div>
      </AnimateOnScroll>

      {/* Cards */}
      <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Card 1: Агент (featured) */}
        <AnimateOnScroll delay={0.15}>
          <div className="relative bg-sx-card border-2 border-sx-accent rounded-2xl p-8 shadow-[0_0_40px_-10px_rgba(1,222,130,0.2)]">
            {/* Badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-sx-accent text-sx-deep text-xs font-heading font-semibold px-4 py-1 rounded-full">
                Популярный
              </span>
            </div>

            <h3 className="font-heading text-2xl font-bold text-sx-cream mt-2">
              Агент
            </h3>
            <p className="text-sx-muted text-sm mt-1">
              Цифровой администратор для вашего бизнеса
            </p>

            {/* Price */}
            <div className="mt-6">
              <div className="flex items-baseline gap-2">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={selectedPeriod}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="font-heading text-4xl font-bold text-sx-cream"
                  >
                    {formatPrice(pricing.price)} &#8381;
                  </motion.span>
                </AnimatePresence>
                <span className="text-sx-muted text-sm">/ мес</span>
              </div>
              <AnimatePresence mode="wait">
                {pricing.savings && (
                  <motion.p
                    key={pricing.savings}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-sx-accent text-sm mt-2 font-medium"
                  >
                    {pricing.savings}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Features */}
            <ul className="mt-6 space-y-3">
              {agentFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-sx-cream text-sm">{f}</span>
                </li>
              ))}
            </ul>

            {/* Notes */}
            <div className="mt-6 pt-6 border-t border-sx-border space-y-2">
              {agentNotes.map((n) => (
                <p key={n} className="text-sx-muted text-xs">
                  {n}
                </p>
              ))}
            </div>

            <div className="mt-8">
              <Button href="#demo" className="w-full">
                Записаться на демо
              </Button>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Card 2: Голосовой агент */}
        <AnimateOnScroll delay={0.25}>
          <div className="relative bg-sx-card border border-sx-border rounded-2xl p-8 opacity-80">
            {/* Badge */}
            <div className="absolute top-4 right-4">
              <span className="bg-sx-accent text-sx-deep text-xs font-heading font-semibold px-3 py-1 rounded-full">
                Скоро
              </span>
            </div>

            <h3 className="font-heading text-2xl font-bold text-sx-cream mt-2">
              Голосовой агент
            </h3>
            <p className="text-sx-muted text-sm mt-1">
              Голосовой ассистент для входящих звонков
            </p>

            <ul className="mt-6 space-y-3">
              {voiceFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckIcon muted />
                  <span className="text-sx-muted text-sm">{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button variant="secondary" className="w-full">
                Узнать первым
              </Button>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Card 3: Enterprise */}
        <AnimateOnScroll delay={0.35}>
          <div className="relative bg-sx-card border border-sx-border rounded-2xl p-8">
            <h3 className="font-heading text-2xl font-bold text-sx-cream mt-2">
              Enterprise
            </h3>
            <p className="text-sx-muted text-sm mt-1">
              Для сетей и крупных компаний
            </p>

            <div className="mt-6">
              <span className="font-heading text-3xl font-bold text-sx-cream">
                По запросу
              </span>
            </div>

            <ul className="mt-6 space-y-3">
              {enterpriseFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-sx-cream text-sm">{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button variant="secondary" href="#demo" className="w-full">
                Связаться
              </Button>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </SectionWrapper>
  );
}
