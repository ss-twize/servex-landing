"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const comparisons = [
  {
    criterion: "Скорость ответа",
    chatbot: "Мгновенно, но шаблонно",
    admin: "Зависит от загрузки",
    servex: "Мгновенно и осмысленно",
  },
  {
    criterion: "Доступность",
    chatbot: "24/7, но без понимания",
    admin: "Только в рабочую смену",
    servex: "24/7 с полным пониманием контекста",
  },
  {
    criterion: "Стабильность качества",
    chatbot: "Одинаково плохо",
    admin: "Зависит от настроения",
    servex: "Одинаково хорошо, всегда",
  },
  {
    criterion: "Запись / перенос / отмена",
    chatbot: "Не умеет",
    admin: "Умеет, но с ошибками",
    servex: "Полный цикл без участия человека",
  },
  {
    criterion: "Аналитика",
    chatbot: "Отсутствует",
    admin: "Ручные отчёты, если успеет",
    servex: "Встроенная, в реальном времени",
  },
  {
    criterion: "Стоимость",
    chatbot: "Дёшево, но бесполезно",
    admin: "Дорого — зарплата, больничные, отпуска",
    servex: "Предсказуемо и окупаемо",
  },
  {
    criterion: "Масштабируемость",
    chatbot: "Ограничена шаблонами",
    admin: "Не масштабируется",
    servex: "Без ограничений",
  },
];

function ComparisonRow({
  item,
  index,
  isLast,
}: {
  item: (typeof comparisons)[0];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`py-6 md:py-8 ${!isLast ? "border-b border-sx-border" : ""}`}
    >
      <h3 className="text-xl md:text-2xl font-heading font-bold text-sx-cream mb-4">
        {item.criterion}
      </h3>

      <div className="space-y-1.5">
        <div className="flex items-baseline gap-3">
          <span className="text-sx-muted/50 text-xs font-heading uppercase tracking-wider shrink-0 w-28 md:w-36">
            Чат-бот
          </span>
          <span className="text-sm text-sx-muted">{item.chatbot}</span>
        </div>

        <div className="flex items-baseline gap-3">
          <span className="text-sx-muted/50 text-xs font-heading uppercase tracking-wider shrink-0 w-28 md:w-36">
            Администратор
          </span>
          <span className="text-sm text-sx-muted">{item.admin}</span>
        </div>

        <div className="flex items-baseline gap-3 mt-3">
          <span className="text-sx-accent/60 text-xs font-heading uppercase tracking-wider shrink-0 w-28 md:w-36">
            СЕРВЕКС
          </span>
          <span className="text-lg md:text-xl text-sx-accent font-medium border-l-2 border-sx-accent pl-4">
            {item.servex}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Comparison() {
  return (
    <SectionWrapper id="comparison">
      <AnimateOnScroll>
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-sx-cream">
          Почему это не обычный чат-бот
        </h2>
      </AnimateOnScroll>

      <div className="mt-12 md:mt-16">
        {comparisons.map((item, i) => (
          <ComparisonRow
            key={item.criterion}
            item={item}
            index={i}
            isLast={i === comparisons.length - 1}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
