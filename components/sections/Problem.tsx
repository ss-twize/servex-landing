"use client";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const cards = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Медленные ответы",
    desc: "Клиент не ждёт — он уходит к конкуренту. Каждая минута задержки = потерянная запись.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <line x1="9" y1="9" x2="15" y2="15" />
        <line x1="15" y1="9" x2="9" y2="15" />
      </svg>
    ),
    title: "Пропущенные заявки",
    desc: "Вечерние и ночные обращения теряются. Это десятки записей в месяц.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        <path d="M19 8l2 2-2 2" />
        <path d="M21 10h-4" />
      </svg>
    ),
    title: "Нестабильное качество",
    desc: "Сегодня отвечает хорошо, завтра — забыла. Клиент не возвращается.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </svg>
    ),
    title: "Нет прозрачности",
    desc: "Вы не видите, сколько обращений потеряно. Нельзя управлять тем, что не измеряется.",
  },
];

export default function Problem() {
  return (
    <SectionWrapper id="problem">
      <AnimateOnScroll>
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-sx-cream text-center">
          Бизнес теряет деньги на первой линии сервиса
        </h2>
      </AnimateOnScroll>
      <AnimateOnScroll delay={0.1}>
        <p className="text-sx-muted text-lg md:text-xl text-center mt-4 max-w-2xl mx-auto">
          Финансовые потери начинаются там, где клиент не получает быстрый и качественный ответ
        </p>
      </AnimateOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        {cards.map((card, i) => (
          <AnimateOnScroll key={card.title} delay={0.15 + i * 0.1}>
            <div className="bg-sx-card border border-sx-border rounded-2xl p-6 transition-colors duration-300 hover:border-sx-accent/50 h-full">
              <div className="text-sx-accent mb-4">{card.icon}</div>
              <h3 className="font-heading text-xl font-semibold text-sx-cream mb-2">
                {card.title}
              </h3>
              <p className="text-sx-muted leading-relaxed">{card.desc}</p>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </SectionWrapper>
  );
}
