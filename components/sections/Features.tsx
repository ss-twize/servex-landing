"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const layers = [
  {
    number: "01",
    title: "Входящий поток",
    description:
      "Сообщения из Telegram, WhatsApp и других каналов поступают в единую систему обработки. СЕРВЕКС автоматически определяет тип обращения и выбирает сценарий.",
  },
  {
    number: "02",
    title: "Логика обработки",
    description:
      "Каждый диалог следует настраиваемому сценарию: от приветствия до записи, переноса или передачи оператору. Система учитывает контекст и историю клиента.",
  },
  {
    number: "03",
    title: "Управление записями",
    description:
      "Интеграция с календарями и системами записи позволяет в реальном времени проверять доступность, создавать и изменять записи без участия человека.",
  },
  {
    number: "04",
    title: "Аналитика и контроль",
    description:
      "Каждое обращение, каждая запись, каждый отказ — всё фиксируется. Владелец видит конверсии, потери и качество обработки в едином интерфейсе.",
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} id="system" className="py-24 md:py-32 px-6">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-sx-cream">
            Как устроена система СЕРВЕКС
          </h2>
          <p className="text-lg md:text-xl text-sx-secondary mt-4 max-w-2xl">
            Архитектура сервисной автоматизации
          </p>
        </motion.div>

        <div className="mt-12 flex flex-col items-stretch">
          {layers.map((layer, i) => (
            <div key={layer.number} className="flex flex-col items-center">
              {/* Connecting line above (skip first) */}
              {i > 0 && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={inView ? { scaleY: 1 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="w-px h-8 bg-sx-accent/30 origin-top"
                />
              )}

              {/* Layer card */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="bg-sx-card border border-sx-border rounded-2xl p-6 w-full flex items-start gap-5 md:gap-8"
              >
                <span className="text-5xl font-heading font-extrabold text-sx-accent/15 leading-none select-none shrink-0">
                  {layer.number}
                </span>
                <div className="min-w-0">
                  <h3 className="font-heading font-bold text-xl text-sx-cream">
                    {layer.title}
                  </h3>
                  <p className="text-sx-secondary text-base leading-relaxed mt-2">
                    {layer.description}
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
