"use client";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const cards = [
  {
    title: "Обрабатывает обращения клиентов",
    desc: "Отвечает на сообщения в мессенджерах и начинает диалог без задержек.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: "Записывает на услуги",
    desc: "Подбирает свободное время и фиксирует запись в календаре.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <polyline points="9 16 11 18 15 14" />
      </svg>
    ),
  },
  {
    title: "Управляет расписанием",
    desc: "Переносит и отменяет записи по запросу клиента.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1 4 1 10 7 10" />
        <polyline points="23 20 23 14 17 14" />
        <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15" />
      </svg>
    ),
  },
  {
    title: "Возвращает клиентов",
    desc: "Использует сценарии для возврата клиентов и заполнения свободных окон.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
        <polyline points="16 11 18 13 22 9" />
      </svg>
    ),
  },
];

export default function Solution() {
  return (
    <section id="solution" className="py-24 md:py-32 px-6">
      <div className="section-container">
        <AnimateOnScroll delay={0}>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-sx-cream">
            СЕРВЕКС управляет обращениями клиентов и записью на услуги
          </h2>
          <p className="text-lg md:text-xl text-sx-secondary mt-4 max-w-2xl">
            Система заменяет первую линию сервиса и берёт на себя общение с клиентами.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mt-12">
          {cards.map((card, i) => (
            <AnimateOnScroll key={card.title} delay={i * 0.1}>
              <div className="bg-sx-card border border-sx-border/50 rounded-xl p-6 h-full">
                <div className="w-10 h-10 rounded-lg bg-sx-accent/10 flex items-center justify-center mb-4 text-sx-accent">
                  {card.icon}
                </div>
                <h3 className="font-heading font-bold text-lg text-sx-cream mb-2">
                  {card.title}
                </h3>
                <p className="text-sx-secondary text-base leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
