"use client";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const faqs = [
  {
    q: "Подходит ли СЕРВЕКС для моего бизнеса?",
    a: "СЕРВЕКС создан для сервисных бизнесов, работающих по записи: салоны красоты, барбершопы, стоматологии, СПА, массажные салоны, психологические центры и другие. Если ваш бизнес принимает клиентов по записи — СЕРВЕКС вам подходит.",
  },
  {
    q: "Как быстро можно запуститься?",
    a: "Запуск занимает от 1 рабочего дня. После демо и сбора данных мы настраиваем систему и подключаем каналы. Большинство клиентов начинают работать в течение 1\u20133 дней.",
  },
  {
    q: "Как устроены тарифы?",
    a: "Фиксированная ежемесячная подписка без скрытых платежей. Чем дольше период — тем выгоднее. Стоимость значительно ниже зарплаты штатного администратора.",
  },
  {
    q: "Как я контролирую систему?",
    a: "Через личный кабинет с аналитикой, историей обращений и записей. Вы видите всё: конверсии, время ответа, загрузку. Полная прозрачность.",
  },
  {
    q: "Что происходит с нестандартными запросами?",
    a: "СЕРВЕКС работает по настраиваемым сценариям. Нестандартные запросы передаются живому оператору с полным контекстом переписки.",
  },
  {
    q: "Какие интеграции доступны?",
    a: "Telegram, WhatsApp, YCLIENTS, Altegio, Битрикс24, amoCRM, 1С, Google Calendar. Также доступно подключение через API.",
  },
  {
    q: "Можно ли начать с одной локации?",
    a: "Да. Вы можете начать с одной точки и масштабировать на другие локации по мере готовности. Тариф Enterprise предусматривает мультилокационную поддержку.",
  },
  {
    q: "Чем это отличается от обычного чат-бота?",
    a: "Обычный чат-бот отвечает по шаблону и не умеет записывать. СЕРВЕКС — полноценная система: понимает контекст, управляет записями, даёт аналитику и работает стабильно.",
  },
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <motion.svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-sx-muted shrink-0"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.25 }}
    >
      <polyline points="6 9 12 15 18 9" />
    </motion.svg>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="py-24 md:py-32 px-6 relative overflow-hidden" ref={sectionRef}>
      {/* Giant rotating "?" background */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <motion.span
          className="font-heading font-black text-sx-cream"
          style={{
            fontSize: "40vw",
            lineHeight: 1,
            opacity: 0.025,
            rotate,
          }}
        >
          ?
        </motion.span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <AnimateOnScroll>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-sx-cream text-center">
            Частые вопросы
          </h2>
        </AnimateOnScroll>

        <div className="mt-14 max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <AnimateOnScroll key={i} delay={0.05 + i * 0.04}>
              <div
                className={`rounded-xl overflow-hidden transition-colors duration-300 ${
                  openIndex === i
                    ? "bg-sx-card/70 border-l-2 border-sx-accent border-t border-r border-b border-sx-border"
                    : "bg-sx-card border border-sx-border"
                }`}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
                >
                  <span className="font-heading text-sm md:text-base font-medium text-sx-cream">
                    {faq.q}
                  </span>
                  <ChevronIcon open={openIndex === i} />
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === i ? "auto" : 0,
                    opacity: openIndex === i ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="px-6 pb-5">
                    <p className="text-sx-muted text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </motion.div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
