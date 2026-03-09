"use client";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const capabilities = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
    title: "Отвечает клиентам",
    desc: "Мгновенно, 24/7, без выходных и перерывов",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="M9 16l2 2 4-4" />
      </svg>
    ),
    title: "Записывает на услуги",
    desc: "Проверяет свободные слоты, подтверждает запись",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: "Поддерживает первую линию",
    desc: "Профессионально, стабильно, по заданным сценариям",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    title: "Даёт аналитику",
    desc: "Обращения, конверсии, загрузка — всё в одном месте",
  },
];

export default function Solution() {
  return (
    <SectionWrapper id="solution">
      <AnimateOnScroll>
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-sx-cream text-center">
          Что делает СЕРВЕКС
        </h2>
      </AnimateOnScroll>
      <AnimateOnScroll delay={0.1}>
        <p className="text-sx-muted text-lg md:text-xl text-center mt-4 max-w-2xl mx-auto">
          Полный цикл работы с клиентом — от первого обращения до записи
        </p>
      </AnimateOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
        {capabilities.slice(0, 3).map((cap, i) => (
          <AnimateOnScroll key={cap.title} delay={0.15 + i * 0.1}>
            <div className="bg-sx-card border border-sx-border rounded-2xl p-6 transition-all duration-300 hover:border-sx-accent/50 hover:shadow-[0_0_15px_rgba(1,222,130,0.08)] h-full">
              <div className="text-sx-accent mb-4">{cap.icon}</div>
              <h3 className="font-heading text-xl font-semibold text-sx-cream mb-2">
                {cap.title}
              </h3>
              <p className="text-sx-muted leading-relaxed">{cap.desc}</p>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 md:max-w-[66%] lg:max-w-[66.666%] mx-auto">
        {capabilities.slice(3).map((cap, i) => (
          <AnimateOnScroll key={cap.title} delay={0.45 + i * 0.1}>
            <div className="bg-sx-card border border-sx-border rounded-2xl p-6 transition-all duration-300 hover:border-sx-accent/50 hover:shadow-[0_0_15px_rgba(1,222,130,0.08)] h-full">
              <div className="text-sx-accent mb-4">{cap.icon}</div>
              <h3 className="font-heading text-xl font-semibold text-sx-cream mb-2">
                {cap.title}
              </h3>
              <p className="text-sx-muted leading-relaxed">{cap.desc}</p>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </SectionWrapper>
  );
}
