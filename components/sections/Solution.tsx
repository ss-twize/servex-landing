"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";

const cards = [
  {
    num: "01",
    title: "Отвечает клиентам",
    desc: "Мгновенно, 24/7, без выходных и перерывов",
  },
  {
    num: "02",
    title: "Записывает на услуги",
    desc: "Проверяет свободные слоты, подтверждает запись",
  },
  {
    num: "03",
    title: "Переносит и отменяет",
    desc: "Без потери клиента и без нагрузки на команду",
  },
  {
    num: "04",
    title: "Первая линия сервиса",
    desc: "Профессионально, стабильно, по заданным сценариям",
  },
  {
    num: "05",
    title: "Аналитика",
    desc: "Обращения, конверсии, загрузка — всё в одном месте",
  },
];

function ScrollDots({ count, active }: { count: number; active: number }) {
  return (
    <div className="flex gap-2 justify-center mt-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            i === active
              ? "w-6 bg-sx-accent"
              : "w-1.5 bg-sx-border"
          }`}
        />
      ))}
    </div>
  );
}

export default function Solution() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth
      : 1;
    const gap = 20; // ~gap-5
    setActiveIndex(Math.round(scrollLeft / (cardWidth + gap)));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <section
      ref={sectionRef}
      id="solution"
      className="py-24 md:py-32 px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-sx-cream"
        >
          Что делает СЕРВЕКС
        </motion.h2>
      </div>

      {/* Horizontal carousel */}
      <div
        ref={scrollRef}
        className="flex gap-5 mt-12 overflow-x-auto scroll-snap-x-mandatory hide-scrollbar pl-6 md:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {cards.map((card, i) => (
          <motion.div
            key={card.num}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative min-w-[80vw] md:min-w-[400px] flex-shrink-0 bg-sx-card border border-sx-border rounded-2xl p-8 md:p-10 transition-all duration-300 hover:border-sx-accent/50 hover:shadow-[0_0_30px_rgba(0,240,144,0.08)]"
            style={{ scrollSnapAlign: "start" }}
          >
            {/* Top accent bar */}
            <div className="absolute top-0 left-8 right-8 h-px bg-sx-border group-hover:bg-sx-accent transition-colors duration-300" />

            {/* Ghost number */}
            <div
              className="absolute top-4 right-6 font-heading font-extrabold leading-none text-sx-accent/10 select-none pointer-events-none"
              style={{ fontSize: "8rem" }}
              aria-hidden
            >
              {card.num}
            </div>

            <div className="relative mt-16">
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-sx-cream mb-3">
                {card.title}
              </h3>
              <p className="text-lg text-sx-secondary leading-relaxed">
                {card.desc}
              </p>
            </div>
          </motion.div>
        ))}
        {/* Spacer for last card padding */}
        <div className="min-w-[1.5rem] flex-shrink-0" aria-hidden />
      </div>

      <ScrollDots count={cards.length} active={activeIndex} />
    </section>
  );
}
