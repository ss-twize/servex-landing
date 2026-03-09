"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    title: "Принимает поток обращений",
    description:
      "СЕРВЕКС обрабатывает входящие сообщения клиентов и поддерживает диалог без потерь, пауз и ручной перегрузки команды.",
  },
  {
    title: "Ведёт клиента до записи",
    description:
      "Система не просто отвечает на вопросы, а доводит обращение до конкретного действия: записи на услугу в удобное время.",
  },
  {
    title: "Управляет изменениями в расписании",
    description:
      "Переносы и отмены не превращаются в хаос: СЕРВЕКС корректно обновляет запись и удерживает порядок в клиентском потоке.",
  },
  {
    title: "Работает без смен и выходных",
    description:
      "Первая линия сервиса остаётся активной 24/7 — независимо от времени суток, загрузки или человеческого ресурса.",
  },
  {
    title: "Встраивается в рабочий контур бизнеса",
    description:
      "СЕРВЕКС подключается к мессенджерам, календарям и системам записи, становясь частью реальной операционной модели бизнеса.",
  },
  {
    title: "Делает сервис измеримым",
    description:
      "Платформа показывает обращения, записи и аналитику первой линии, чтобы владелец видел не только факт работы, но и её результат.",
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      id="features"
      className="py-24 md:py-32 px-6"
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-sx-cream">
            Возможности
          </h2>
          <p className="text-lg md:text-xl text-sx-secondary mt-4 max-w-2xl mx-auto">
            Не просто отвечает клиентам. Управляет первой линией сервиса.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="bg-sx-card border border-sx-border rounded-2xl p-6 md:p-8 transition-all duration-300 hover:border-sx-accent/50 hover:shadow-[0_0_30px_rgba(0,240,144,0.08)]"
            >
              <h3 className="font-heading font-bold text-xl text-sx-cream">
                {feature.title}
              </h3>
              <p className="text-sx-secondary text-base leading-relaxed mt-3">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
