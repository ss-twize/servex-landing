"use client";
import { useRef } from "react";
import { useInView } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import ParallaxLayer from "@/components/ui/ParallaxLayer";

const capabilities = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
    title: "Отвечает клиентам",
    desc: "Мгновенно, 24/7, без выходных и перерывов",
    num: "01",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="M9 16l2 2 4-4" />
      </svg>
    ),
    title: "Записывает на услуги",
    desc: "Проверяет свободные слоты, подтверждает запись",
    num: "02",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="M10 17l2-2 2 2" />
        <path d="M14 13l-2 2-2-2" />
      </svg>
    ),
    title: "Переносит и отменяет",
    desc: "Без потери клиента и без нагрузки на команду",
    num: "03",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: "Поддерживает первую линию",
    desc: "Профессионально, стабильно, по заданным сценариям",
    num: "04",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    title: "Даёт аналитику",
    desc: "Обращения, конверсии, загрузка — всё в одном месте",
    num: "05",
  },
];

function SolutionItem({
  item,
  index,
}: {
  item: (typeof capabilities)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isIndented = index % 2 !== 0; // items 2, 4 (0-indexed 1, 3) get indent

  return (
    <div
      ref={ref}
      className={`relative transition-all duration-700 ${isIndented ? "ml-[10%] md:ml-[15%]" : "ml-0"}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${index * 0.08}s`,
      }}
    >
      {/* Ghost step number behind the card */}
      <div
        className="absolute pointer-events-none select-none font-heading font-black leading-none text-sx-cream"
        style={{
          fontSize: "10vw",
          opacity: 0.025,
          top: "50%",
          right: "1rem",
          transform: "translateY(-50%)",
        }}
      >
        {item.num}
      </div>

      <div
        className={`relative bg-sx-card rounded-r-2xl rounded-bl-2xl px-6 py-5 transition-all duration-500 border-l-2 ${
          inView ? "border-sx-accent" : "border-sx-border"
        } border-t border-t-sx-border border-b border-b-sx-border border-r border-r-sx-border hover:border-l-sx-accent`}
      >
        <div className="flex items-start gap-4">
          <div className="text-sx-accent flex-shrink-0 mt-0.5">{item.icon}</div>
          <div>
            <h3 className="font-heading text-lg md:text-xl font-semibold text-sx-cream mb-1">
              {item.title}
            </h3>
            <p className="text-sx-muted leading-relaxed">{item.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Solution() {
  return (
    <SectionWrapper id="solution" className="relative overflow-hidden">
      {/* Large decorative step numbers as parallax background */}
      <ParallaxLayer speed={0.4} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="relative w-full h-full">
          {capabilities.map((cap, i) => (
            <div
              key={cap.num}
              className="absolute font-heading font-black leading-none text-sx-cream select-none"
              style={{
                fontSize: "10vw",
                opacity: 0.025,
                top: `${10 + i * 18}%`,
                left: i % 2 === 0 ? "5%" : "55%",
              }}
            >
              {cap.num}
            </div>
          ))}
        </div>
      </ParallaxLayer>

      <div className="relative">
        {/* Heading */}
        <AnimateOnScroll>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-sx-cream">
            Что делает СЕРВЕКС
          </h2>
        </AnimateOnScroll>
        <AnimateOnScroll delay={0.1}>
          <p className="text-sx-muted text-lg md:text-xl mt-4 max-w-xl">
            Полный цикл работы с клиентом — от первого обращения до записи
          </p>
        </AnimateOnScroll>

        {/* Cascading column with decorative vertical line */}
        <div className="relative mt-12 md:mt-16">
          {/* Decorative vertical line */}
          <div
            className="absolute left-0 top-0 bottom-0 w-px bg-sx-border"
            style={{ marginLeft: "0" }}
          />

          <div className="flex flex-col gap-4 pl-4">
            {capabilities.map((cap, i) => (
              <SolutionItem key={cap.title} item={cap} index={i} />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
