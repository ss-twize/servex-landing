"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import Button from "@/components/ui/Button";
import { useDemoBooking } from "@/components/ui/DemoBookingContext";

const periods = [
  { label: "1 мес", months: 1 },
  { label: "3 мес", months: 3 },
  { label: "6 мес", months: 6 },
] as const;

const agentPricing: Record<number, { price: number; savings?: string }> = {
  1: { price: 25000 },
  3: { price: 22000, savings: "9 000 ₽ за период" },
  6: { price: 21000, savings: "24 000 ₽ за период" },
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
  const { openBooking } = useDemoBooking();
  const [selectedPeriod, setSelectedPeriod] = useState(3);
  const pricing = agentPricing[selectedPeriod];

  return (
    <section id="pricing" className="py-24 md:py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
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

        {/* Mobile: stacked cards (Agent first) */}
        <div className="lg:hidden mt-14 space-y-6">
          {/* Agent card — mobile */}
          <AgentCard
            pricing={pricing}
            selectedPeriod={selectedPeriod}
            openBooking={openBooking}
          />
          {/* Enterprise card — mobile */}
          <EnterpriseCard openBooking={openBooking} />
          {/* Voice Agent card — mobile */}
          <VoiceAgentCard />
        </div>

        {/* Desktop: sticky stacking cards */}
        <div className="hidden lg:block mt-14 min-h-[200vh] relative">
          {/* Card 1 — Voice Agent (appears first, gets pushed under) */}
          <div className="sticky top-24 z-10 pb-4">
            <VoiceAgentCard />
          </div>

          {/* Card 2 — Enterprise (appears second) */}
          <div className="sticky top-24 z-20 pb-4">
            <EnterpriseCard openBooking={openBooking} />
          </div>

          {/* Card 3 — Agent (appears last, sits on TOP) */}
          <div className="sticky top-24 z-30 pb-4">
            <AgentCard
              pricing={pricing}
              selectedPeriod={selectedPeriod}
              openBooking={openBooking}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function AgentCard({
  pricing,
  selectedPeriod,
  openBooking,
}: {
  pricing: { price: number; savings?: string };
  selectedPeriod: number;
  openBooking: () => void;
}) {
  return (
    <div className="max-w-xl mx-auto bg-sx-card border border-sx-accent/50 rounded-2xl p-8 md:p-10 shadow-[0_0_40px_rgba(0,240,144,0.1)]">
      <h3 className="font-heading text-2xl font-bold text-sx-cream">Агент</h3>
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
              className="font-heading text-4xl md:text-5xl font-extrabold text-sx-cream"
            >
              {formatPrice(pricing.price)} &#8381;
            </motion.span>
          </AnimatePresence>
          <span className="text-sx-muted text-sm">/ мес</span>
        </div>
        <AnimatePresence mode="wait">
          {pricing.savings && (
            <motion.div
              key={pricing.savings}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2"
            >
              <span className="bg-sx-accent/10 text-sx-accent text-sm rounded-full px-4 py-1 inline-block">
                {pricing.savings}
              </span>
            </motion.div>
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
          <p key={n} className="text-sm text-sx-muted">{n}</p>
        ))}
      </div>

      <div className="mt-8">
        <Button onClick={openBooking} className="w-full">
          Записаться на демо
        </Button>
      </div>
    </div>
  );
}

function VoiceAgentCard() {
  return (
    <div className="max-w-xl mx-auto bg-sx-card border border-sx-border rounded-2xl p-8 md:p-10 shadow-2xl">
      <div className="flex items-center gap-3">
        <h3 className="font-heading text-2xl font-bold text-sx-cream">
          Голосовой агент
        </h3>
        <span className="bg-sx-accent/10 text-sx-accent text-xs px-3 py-1 rounded-full">
          Скоро
        </span>
      </div>
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
    </div>
  );
}

function EnterpriseCard({ openBooking }: { openBooking: () => void }) {
  return (
    <div className="max-w-xl mx-auto bg-sx-card border border-sx-border rounded-2xl p-8 md:p-10 shadow-2xl">
      <h3 className="font-heading text-2xl font-bold text-sx-cream">Enterprise</h3>
      <p className="text-sx-muted text-sm mt-1">Для сетей и крупных компаний</p>

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
        <Button variant="secondary" onClick={openBooking} className="w-full">
          Связаться
        </Button>
      </div>
    </div>
  );
}
