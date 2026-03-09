"use client";
import ParallaxLayer from "@/components/ui/ParallaxLayer";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

// Icons
const ClockIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const MissedIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <line x1="9" y1="9" x2="15" y2="15" />
    <line x1="15" y1="9" x2="9" y2="15" />
  </svg>
);

const QualityIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    <path d="M19 8l2 2-2 2" />
    <path d="M21 10h-4" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

// Mini bar chart for Card D
const barData = [
  { label: "Пн", height: 40, loss: true },
  { label: "Вт", height: 65, loss: true },
  { label: "Ср", height: 30, loss: true },
  { label: "Чт", height: 80, loss: true },
  { label: "Пт", height: 55, loss: true },
  { label: "Сб", height: 90, loss: true },
  { label: "Вс", height: 70, loss: true },
];

export default function Problem() {
  return (
    <section
      id="problem"
      className="relative overflow-hidden -mt-20 md:-mt-32 py-24 md:py-32 px-6"
      style={{ zIndex: 10 }}
    >
      {/* Scan lines background */}
      <ParallaxLayer speed={0.3} className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(1,222,130,0.025) 0px, rgba(1,222,130,0.025) 1px, transparent 1px, transparent 60px)",
          }}
        />
      </ParallaxLayer>

      <div className="max-w-7xl mx-auto relative">
        {/* Heading */}
        <AnimateOnScroll>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-sx-cream">
            Бизнес теряет деньги на первой линии
          </h2>
        </AnimateOnScroll>
        <AnimateOnScroll delay={0.1}>
          <p className="text-sx-muted text-lg md:text-xl mt-4 max-w-xl">
            Финансовые потери начинаются там, где клиент не получает быстрый и качественный ответ
          </p>
        </AnimateOnScroll>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mt-12">

          {/* Card A — wide (col-span-2): Пропущенные заявки */}
          <AnimateOnScroll delay={0.15} className="md:col-span-2">
            <div className="bg-sx-card/80 backdrop-blur-sm border border-sx-border rounded-2xl p-6 md:p-8 h-full hover:border-sx-accent/50 transition-colors duration-300 flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <div className="text-sx-accent mb-4">
                  <MissedIcon />
                </div>
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-sx-cream mb-3">
                  Пропущенные заявки
                </h3>
                <p className="text-sx-muted leading-relaxed text-base md:text-lg">
                  Вечерние и ночные обращения теряются. Это десятки записей в месяц, которые вы не видите и не считаете.
                </p>
              </div>
              {/* Big stat */}
              <div className="flex-shrink-0 text-right">
                <div
                  className="font-heading font-black leading-none text-sx-accent"
                  style={{ fontSize: "clamp(4rem, 7vw, 7rem)" }}
                >
                  до 30%
                </div>
                <p className="text-sx-muted text-sm mt-1">заявок теряется</p>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Card B — Медленные ответы */}
          <AnimateOnScroll delay={0.25}>
            <div className="bg-sx-card/80 backdrop-blur-sm border border-sx-border rounded-2xl p-6 md:p-8 h-full hover:border-sx-accent/50 transition-colors duration-300">
              <div className="text-sx-accent mb-4">
                <ClockIcon />
              </div>
              <h3 className="font-heading text-xl font-semibold text-sx-cream mb-2">
                Медленные ответы
              </h3>
              <p className="text-sx-muted leading-relaxed">
                Клиент не ждёт — он уходит к конкуренту. Каждая минута задержки = потерянная запись.
              </p>
            </div>
          </AnimateOnScroll>

          {/* Card C — Нестабильное качество */}
          <AnimateOnScroll delay={0.3}>
            <div className="bg-sx-card/80 backdrop-blur-sm border border-sx-border rounded-2xl p-6 md:p-8 h-full hover:border-sx-accent/50 transition-colors duration-300">
              <div className="text-sx-accent mb-4">
                <QualityIcon />
              </div>
              <h3 className="font-heading text-xl font-semibold text-sx-cream mb-2">
                Нестабильное качество
              </h3>
              <p className="text-sx-muted leading-relaxed">
                Сегодня отвечает хорошо, завтра — забыла. Клиент не возвращается.
              </p>
            </div>
          </AnimateOnScroll>

          {/* Card D — Нет прозрачности (row-span-2 on md) */}
          <AnimateOnScroll delay={0.35} className="md:col-span-2 md:row-span-1">
            <div className="bg-sx-card/80 backdrop-blur-sm border border-sx-border rounded-2xl p-6 md:p-8 h-full hover:border-sx-accent/50 transition-colors duration-300 flex flex-col">
              <div className="text-sx-accent mb-4">
                <EyeOffIcon />
              </div>
              <h3 className="font-heading text-xl font-semibold text-sx-cream mb-2">
                Нет прозрачности
              </h3>
              <p className="text-sx-muted leading-relaxed mb-6">
                Вы не видите, сколько обращений потеряно. Нельзя управлять тем, что не измеряется.
              </p>
              {/* Mini bar visualization — "невидимые потери" */}
              <div className="mt-auto">
                <p className="text-sx-muted text-xs mb-3 uppercase tracking-widest">
                  Невидимые потери по дням
                </p>
                <div className="flex items-end gap-2 h-20">
                  {barData.map((bar) => (
                    <div key={bar.label} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-sm bg-red-500/60 transition-all duration-500"
                        style={{ height: `${bar.height}%` }}
                      />
                      <span className="text-sx-muted text-[10px]">{bar.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimateOnScroll>

        </div>
      </div>
    </section>
  );
}
