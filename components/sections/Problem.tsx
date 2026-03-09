"use client";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const cards = [
  {
    title: "Пропущенные сообщения",
    desc: "Клиент написал — но ему ответили слишком поздно.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <line x1="9" y1="10" x2="9" y2="10" />
        <line x1="12" y1="10" x2="12" y2="10" />
        <line x1="15" y1="10" x2="15" y2="10" />
      </svg>
    ),
  },
  {
    title: "Потерянные записи",
    desc: "Клиент хотел записаться, но не получил удобное время.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <line x1="9" y1="15" x2="15" y2="19" />
        <line x1="15" y1="15" x2="9" y2="19" />
      </svg>
    ),
  },
  {
    title: "Человеческий фактор",
    desc: "Администратор устал, заболел или не успел обработать обращение.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    title: "Пустые окна в расписании",
    desc: "Клиенты отменяют записи — и время остаётся незаполненным.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

export default function Problem() {
  return (
    <section id="problem" className="py-24 md:py-32 px-6">
      <div className="section-container">
        <AnimateOnScroll delay={0}>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-sx-cream text-center">
            Бизнес теряет клиентов на первой линии сервиса
          </h2>
          <p className="text-lg md:text-xl text-sx-secondary mt-4 text-center max-w-2xl mx-auto">
            Каждый день клиенты пишут в мессенджеры или звонят, чтобы записаться. Но из-за человеческого фактора часть обращений теряется.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mt-12">
          {cards.map((card, i) => (
            <AnimateOnScroll key={card.title} delay={i * 0.1}>
              <div className="bg-sx-card border border-sx-border/50 rounded-xl p-6 h-full">
                <div className="w-10 h-10 rounded-lg bg-sx-hot/10 flex items-center justify-center mb-4 text-sx-hot">
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
