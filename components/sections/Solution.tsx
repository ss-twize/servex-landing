"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const items = [
  {
    title: "Отвечает клиентам",
    desc: "Мгновенно, 24/7, без выходных и перерывов",
  },
  {
    title: "Записывает на услуги",
    desc: "Проверяет свободные слоты, подтверждает запись",
  },
  {
    title: "Переносит и отменяет",
    desc: "Без потери клиента и без нагрузки на команду",
  },
  {
    title: "Первая линия сервиса",
    desc: "Профессионально, стабильно, по заданным сценариям",
  },
  {
    title: "Аналитика",
    desc: "Обращения, конверсии, загрузка — всё в одном месте",
  },
];

export default function Solution() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      id="solution"
      className="py-24 md:py-32 px-6"
    >
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-sx-cream"
        >
          Что делает СЕРВЕКС
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`bg-sx-card border border-sx-border rounded-2xl p-6 transition-all duration-300 hover:border-sx-accent/50 hover:shadow-[0_0_30px_rgba(0,240,144,0.08)]${
                i === items.length - 1 ? " md:col-span-2 md:max-w-[calc(50%-0.5rem)]  md:mx-auto" : ""
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-sx-accent mt-2 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-heading font-bold text-sx-cream">
                    {item.title}
                  </h3>
                  <p className="text-base text-sx-secondary mt-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
