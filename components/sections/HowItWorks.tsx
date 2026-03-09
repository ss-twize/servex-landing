"use client";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const steps = [
  {
    num: 1,
    title: "Демо",
    desc: "Знакомство с платформой и разбор ваших задач",
  },
  {
    num: 2,
    title: "Сбор данных",
    desc: "Услуги, расписание, сценарии общения с клиентами",
  },
  {
    num: 3,
    title: "Настройка",
    desc: "Конфигурация системы под ваш бизнес",
  },
  {
    num: 4,
    title: "Запуск",
    desc: "Подключение каналов и старт работы",
  },
  {
    num: 5,
    title: "Мониторинг",
    desc: "Контроль качества и постоянная оптимизация",
  },
];

export default function HowItWorks() {
  return (
    <section id="launch" className="py-24 md:py-32 px-6">
      <div className="section-container">
        <AnimateOnScroll>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-sx-cream text-center mb-14">
            Как проходит запуск
          </h2>
        </AnimateOnScroll>

        <div className="max-w-lg mx-auto">
          {steps.map((step, i) => (
            <AnimateOnScroll key={step.num} delay={0.1 * i}>
              <div className="flex gap-5">
                {/* Left column: circle + line */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-sx-accent/10 border border-sx-accent/30 flex items-center justify-center shrink-0">
                    <span className="text-sx-accent font-heading font-bold text-sm">
                      {step.num}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px bg-sx-border flex-1 min-h-[2rem]" />
                  )}
                </div>

                {/* Right column: text */}
                <div className={i < steps.length - 1 ? "pb-8" : ""}>
                  <h3 className="text-lg font-heading font-bold text-sx-cream">
                    {step.title}
                  </h3>
                  <p className="text-sm text-sx-secondary mt-1">
                    {step.desc}
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
