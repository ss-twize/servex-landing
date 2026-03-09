"use client";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const steps = [
  {
    number: 1,
    label: "Клиент пишет или звонит",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    number: 2,
    label: "СЕРВЕКС отвечает и начинает диалог",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        <circle cx="12" cy="16" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    number: 3,
    label: "Понимает запрос клиента",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="11" y1="8" x2="11" y2="14" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </svg>
    ),
  },
  {
    number: 4,
    label: "Предлагает свободное время",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <polyline points="8 14 10 16 16 12" />
      </svg>
    ),
  },
  {
    number: 5,
    label: "Записывает клиента в систему",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section id="system" className="py-24 md:py-32 px-6">
      <div className="section-container">
        <AnimateOnScroll>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-sx-cream">
            Как работает СЕРВЕКС
          </h2>
          <p className="text-lg md:text-xl text-sx-secondary mt-4 max-w-2xl">
            Весь процесс происходит автоматически и без участия администратора.
          </p>
        </AnimateOnScroll>

        <div className="mt-12 max-w-2xl mx-auto">
          {steps.map((step, i) => (
            <div key={step.number} className="flex flex-col items-center">
              {i > 0 && (
                <div className="w-px h-8 bg-sx-accent/30 mx-auto" />
              )}
              <AnimateOnScroll delay={i * 0.1} className="w-full">
                <div className="bg-sx-card border border-sx-border/50 rounded-xl p-6 flex items-center gap-5 w-full">
                  <div className="w-10 h-10 rounded-full bg-sx-accent text-sx-deep font-heading font-bold flex items-center justify-center shrink-0 text-base">
                    {step.number}
                  </div>
                  <div className="text-sx-accent shrink-0">
                    {step.icon}
                  </div>
                  <p className="text-sx-cream font-heading font-semibold text-sm leading-snug">
                    {step.label}
                  </p>
                </div>
              </AnimateOnScroll>
            </div>
          ))}
        </div>

        <AnimateOnScroll delay={0.5}>
          <div className="mt-12 bg-sx-accent/5 border border-sx-accent/20 rounded-xl p-6 text-center max-w-2xl mx-auto">
            <p className="text-sx-cream">
              Клиент →{" "}
              <span className="text-sx-accent font-semibold">СЕРВЕКС</span>{" "}
              → Календарь / CRM →{" "}
              <span className="text-sx-accent font-semibold">Запись</span>
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
