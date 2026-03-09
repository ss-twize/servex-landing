"use client";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const criteria = [
  "Скорость ответа",
  "Доступность",
  "Стабильность качества",
  "Запись / перенос / отмена",
  "Аналитика",
  "Стоимость",
  "Масштабируемость",
];

interface CardData {
  title: string;
  values: string[];
  translateY: number;
  hoverTranslateY: number;
  scale: number;
  opacity: number;
  isServex?: boolean;
}

const cards: CardData[] = [
  {
    title: "Обычный чат-бот",
    values: [
      "Мгновенно, но шаблонно",
      "24/7",
      "Одинаково плохо",
      "Не умеет",
      "Нет",
      "Дёшево",
      "Ограничена",
    ],
    translateY: 40,
    hoverTranslateY: 30,
    scale: 0.97,
    opacity: 0.85,
  },
  {
    title: "Администратор",
    values: [
      "Зависит от загрузки",
      "Только в смену",
      "Зависит от настроения",
      "Умеет, но с ошибками",
      "Нет",
      "Дорого (зарплата)",
      "Не масштабируется",
    ],
    translateY: 20,
    hoverTranslateY: 10,
    scale: 1,
    opacity: 0.85,
  },
  {
    title: "СЕРВЕКС",
    values: [
      "Мгновенно и осмысленно",
      "24/7",
      "Одинаково хорошо",
      "Полный цикл",
      "Встроенная",
      "Предсказуемо",
      "Без ограничений",
    ],
    translateY: 0,
    hoverTranslateY: 0,
    scale: 1,
    opacity: 1,
    isServex: true,
  },
];

function ComparisonCard({ card }: { card: CardData }) {
  return (
    <motion.div
      initial={{ translateY: card.translateY, scale: card.scale, opacity: 0 }}
      animate={{ translateY: card.translateY, scale: card.scale, opacity: card.opacity }}
      whileHover={
        !card.isServex
          ? {
              translateY: card.hoverTranslateY,
              scale: 1,
              opacity: 1,
              transition: { duration: 0.3, ease: "easeOut" },
            }
          : undefined
      }
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative flex flex-col rounded-2xl overflow-hidden"
      style={
        card.isServex
          ? {
              border: "1px solid #00F090",
              boxShadow:
                "0 0 40px rgba(0,240,144,0.12), 0 0 80px rgba(0,240,144,0.06)",
              background: "#111B1E",
            }
          : {
              border: "1px solid #2A4A47",
              background: "#111B1E",
            }
      }
    >
      {/* Badge for СЕРВЕКС */}
      {card.isServex && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <span className="block px-4 py-1 rounded-full text-xs font-heading font-bold tracking-widest uppercase bg-sx-accent text-sx-deep">
            СЕРВЕКС
          </span>
        </div>
      )}

      {/* Card header */}
      <div
        className={`px-6 pt-8 pb-5 border-b ${
          card.isServex ? "border-sx-accent/20" : "border-sx-border/50"
        }`}
      >
        <h3
          className={`font-heading text-lg font-bold ${
            card.isServex ? "text-sx-accent" : "text-sx-muted"
          }`}
        >
          {card.title}
        </h3>
      </div>

      {/* Criteria rows */}
      <div className="flex flex-col divide-y divide-sx-border/30 flex-1">
        {criteria.map((criterion, i) => (
          <div key={criterion} className="px-6 py-3.5 flex flex-col gap-1">
            <span className="text-sx-muted/60 text-[10px] uppercase tracking-wider font-heading">
              {criterion}
            </span>
            <span
              className={`text-sm font-medium ${
                card.isServex ? "text-sx-accent" : "text-sx-muted/70"
              }`}
            >
              {card.values[i]}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Comparison() {
  return (
    <SectionWrapper id="comparison">
      {/* Background ghost "VS" */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-heading font-black text-sx-cream"
          style={{ fontSize: "12vw", opacity: 0.03, letterSpacing: "0.1em" }}
        >
          VS
        </span>
      </div>

      <div className="relative z-10">
        <AnimateOnScroll>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-sx-cream text-left">
            Почему это не обычный чат-бот
          </h2>
        </AnimateOnScroll>
        <AnimateOnScroll delay={0.1}>
          <p className="text-sx-muted text-lg md:text-xl mt-4 max-w-2xl">
            СЕРВЕКС — это полноценная система обслуживания, а&nbsp;не&nbsp;автоответчик
          </p>
        </AnimateOnScroll>

        {/* Desktop: 3 elevated cards */}
        <div className="hidden lg:grid grid-cols-3 gap-5 mt-20 pb-12 items-start">
          {cards.map((card) => (
            <ComparisonCard key={card.title} card={card} />
          ))}
        </div>

        {/* Mobile: stacked */}
        <div className="lg:hidden mt-12 space-y-6">
          {[...cards].reverse().map((card, i) => (
            <AnimateOnScroll key={card.title} delay={0.1 * i}>
              <div
                className="rounded-2xl overflow-hidden"
                style={
                  card.isServex
                    ? {
                        border: "1px solid #00F090",
                        boxShadow:
                          "0 0 30px rgba(0,240,144,0.10), 0 0 60px rgba(0,240,144,0.05)",
                        background: "#111B1E",
                      }
                    : {
                        border: "1px solid #2A4A47",
                        background: "#111B1E",
                        opacity: card.opacity,
                      }
                }
              >
                <div
                  className={`px-5 py-4 border-b ${
                    card.isServex ? "border-sx-accent/20" : "border-sx-border/50"
                  }`}
                >
                  <h3
                    className={`font-heading text-base font-bold ${
                      card.isServex ? "text-sx-accent" : "text-sx-muted"
                    }`}
                  >
                    {card.title}
                  </h3>
                </div>
                <div className="divide-y divide-sx-border/20">
                  {criteria.map((criterion, ci) => (
                    <div key={criterion} className="px-5 py-3 flex items-center justify-between gap-4">
                      <span className="text-sx-muted/60 text-xs font-heading">
                        {criterion}
                      </span>
                      <span
                        className={`text-xs font-medium text-right ${
                          card.isServex ? "text-sx-accent" : "text-sx-muted/60"
                        }`}
                      >
                        {card.values[ci]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
