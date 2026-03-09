"use client";
import SectionWrapper from "@/components/ui/SectionWrapper";
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
    <SectionWrapper id="launch">
      <AnimateOnScroll>
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-sx-cream text-center">
          Как проходит запуск
        </h2>
      </AnimateOnScroll>

      <div className="mt-16 max-w-2xl mx-auto">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-5 bottom-5 w-px bg-sx-accent/30" />

          <div className="space-y-10">
            {steps.map((step, i) => (
              <AnimateOnScroll key={step.num} delay={0.1 + i * 0.1}>
                <div className="relative flex items-start gap-6">
                  {/* Number circle */}
                  <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-sx-accent text-sx-deep font-heading font-bold text-sm shrink-0">
                    {step.num}
                  </div>

                  <div className="pt-1">
                    <h3 className="font-heading text-lg font-semibold text-sx-cream">
                      {step.title}
                    </h3>
                    <p className="text-sx-muted text-sm mt-1">{step.desc}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
