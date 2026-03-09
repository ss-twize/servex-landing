"use client";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const steps = [
  {
    num: "01",
    title: "Демо",
    desc: "Знакомство с платформой и разбор ваших задач",
  },
  {
    num: "02",
    title: "Сбор данных",
    desc: "Услуги, расписание, сценарии общения с клиентами",
  },
  {
    num: "03",
    title: "Настройка",
    desc: "Конфигурация системы под ваш бизнес",
  },
  {
    num: "04",
    title: "Запуск",
    desc: "Подключение каналов и старт работы",
  },
  {
    num: "05",
    title: "Мониторинг",
    desc: "Контроль качества и постоянная оптимизация",
  },
];

export default function HowItWorks() {
  return (
    <section id="launch" className="py-24 md:py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-sx-cream">
            Как проходит запуск
          </h2>
          <p className="text-sx-secondary text-lg mt-3">
            От демо до результата — 5 шагов
          </p>
        </AnimateOnScroll>

        {/* Horizontal scrollable timeline */}
        <div className="mt-14 overflow-x-auto hide-scrollbar" style={{ scrollSnapType: "x mandatory" }}>
          <div className="flex gap-6 pb-4" style={{ minWidth: "max-content" }}>
            {steps.map((step, i) => (
              <AnimateOnScroll key={step.num} delay={0.08 * i}>
                <div
                  className="min-w-[70vw] md:min-w-[350px] bg-sx-card border border-sx-border rounded-2xl p-8 flex flex-col"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <div className="h-1 w-16 bg-sx-accent rounded-full mb-6" />
                  <span className="text-[6rem] font-heading font-extrabold text-sx-accent/10 leading-none select-none">
                    {step.num}
                  </span>
                  <h3 className="text-2xl font-heading font-bold text-sx-cream mt-4">
                    {step.title}
                  </h3>
                  <p className="text-base text-sx-secondary mt-3">
                    {step.desc}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
