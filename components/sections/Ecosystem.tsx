"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const modules = [
  {
    title: "Коммуникация с клиентами",
    description:
      "Мгновенные ответы во всех каналах: Telegram, WhatsApp, другие мессенджеры",
  },
  {
    title: "Запись на услуги",
    description:
      "Проверка доступности, подбор времени, автоматическое подтверждение",
  },
  {
    title: "Управление расписанием",
    description:
      "Переносы, отмены, оптимизация загрузки — без ручного вмешательства",
  },
  {
    title: "Напоминания и уведомления",
    description:
      "Автоматические напоминания о визитах, снижение процента неявок",
  },
  {
    title: "Возврат клиентов",
    description:
      "Реактивация клиентов, которые давно не записывались",
  },
  {
    title: "Аналитика и отчёты",
    description:
      "Обращения, конверсии, загрузка, потери — полная картина сервиса",
  },
];

const foundation = {
  title: "Интеграционный слой",
  description:
    "Связь с CRM, календарями, мессенджерами и системами записи",
};

export default function Ecosystem() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} id="ecosystem" className="py-24 md:py-32 px-6">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-sx-cream">
            Инфраструктура СЕРВЕКС
          </h2>
          <p className="text-lg md:text-xl text-sx-secondary mt-4 max-w-2xl">
            Модульная система, которая покрывает каждый этап работы с клиентом
          </p>
        </motion.div>

        {/* Module grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 relative">
          {/* Connector dots between cards (desktop only) */}
          <div className="hidden md:block absolute inset-0 pointer-events-none" aria-hidden="true">
            {/* Horizontal connectors - row 1 */}
            <div className="absolute top-1/4 left-[33.33%] w-1 h-1 rounded-full bg-sx-accent/30 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute top-1/4 left-[66.66%] w-1 h-1 rounded-full bg-sx-accent/30 -translate-x-1/2 -translate-y-1/2" />
            {/* Horizontal connectors - row 2 */}
            <div className="absolute top-[70%] left-[33.33%] w-1 h-1 rounded-full bg-sx-accent/30 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute top-[70%] left-[66.66%] w-1 h-1 rounded-full bg-sx-accent/30 -translate-x-1/2 -translate-y-1/2" />
          </div>

          {modules.map((mod, i) => (
            <motion.div
              key={mod.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="bg-sx-card border border-sx-border rounded-2xl p-5 relative"
            >
              <div className="w-2 h-2 rounded-full bg-sx-accent absolute top-5 left-5" />
              <div className="pl-5">
                <h3 className="font-heading font-bold text-base text-sx-cream">
                  {mod.title}
                </h3>
                <p className="text-sm text-sx-secondary mt-2 leading-relaxed">
                  {mod.description}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Foundation layer - spans all columns */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: modules.length * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="md:col-span-3 bg-sx-surface border border-sx-accent/20 rounded-2xl p-5 relative"
          >
            <div className="w-2 h-2 rounded-full bg-sx-accent absolute top-5 left-5" />
            <div className="pl-5">
              <h3 className="font-heading font-bold text-base text-sx-cream">
                {foundation.title}
              </h3>
              <p className="text-sm text-sx-secondary mt-2 leading-relaxed">
                {foundation.description}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
