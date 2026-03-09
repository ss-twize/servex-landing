"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";

const capabilities = [
  {
    title: "Принимает поток обращений",
    description:
      "Обрабатывает входящие сообщения клиентов и поддерживает диалог без потерь, пауз и ручной перегрузки команды.",
  },
  {
    title: "Ведёт клиента до записи",
    description:
      "Не просто отвечает на вопросы, а доводит обращение до конкретного действия: записи на услугу в удобное время.",
  },
  {
    title: "Управляет изменениями в расписании",
    description:
      "Переносы и отмены не превращаются в хаос: корректно обновляет запись и удерживает порядок в клиентском потоке.",
  },
  {
    title: "Работает без смен и выходных",
    description:
      "Первая линия сервиса остаётся активной 24/7 — независимо от времени суток, загрузки или человеческого ресурса.",
  },
  {
    title: "Встраивается в рабочий контур бизнеса",
    description:
      "Подключается к мессенджерам, календарям и системам записи, становясь частью реальной операционной модели.",
  },
  {
    title: "Делает сервис измеримым",
    description:
      "Показывает обращения, записи и аналитику первой линии — владелец видит не только факт работы, но и её результат.",
  },
];

function CapabilityCard({
  item,
  index,
  inView,
}: {
  item: (typeof capabilities)[number];
  index: number;
  inView: boolean;
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    },
    []
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="bg-sx-card border border-sx-border rounded-2xl p-6 md:p-8 transition-all duration-300 hover:border-sx-accent/50 hover:shadow-[0_0_30px_rgba(0,240,144,0.08)] relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, rgba(0,240,144,0.08), transparent)`,
          }}
        />
      )}
      <h3 className="relative z-10 font-heading font-bold text-xl text-sx-cream">
        {item.title}
      </h3>
      <p className="relative z-10 text-sx-secondary text-base leading-relaxed mt-3">
        {item.description}
      </p>
    </motion.div>
  );
}

export default function Solution() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} id="solution" className="py-24 md:py-32 px-6">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-sx-cream">
            Что делает СЕРВЕКС
          </h2>
          <p className="text-lg md:text-xl text-sx-secondary mt-4 max-w-2xl">
            Не просто отвечает клиентам. Управляет первой линией сервиса.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
          {capabilities.map((item, i) => (
            <CapabilityCard
              key={item.title}
              item={item}
              index={i}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
