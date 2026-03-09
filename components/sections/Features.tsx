"use client";
import { useState } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

/* ── Icons ── */
const IconMessages = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <path d="M8 10h.01" />
    <path d="M12 10h.01" />
    <path d="M16 10h.01" />
  </svg>
);

const IconCalendar = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4" />
    <path d="M8 2v4" />
    <path d="M3 10h18" />
    <circle cx="16" cy="16" r="2" />
    <path d="M16 14v-1" />
    <path d="M16 18v1" />
    <path d="M14 16h-1" />
    <path d="M18 16h1" />
  </svg>
);

const IconRefresh = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-9-9" />
    <polyline points="21 3 21 9 15 9" />
    <path d="M21 3l-6 6" />
  </svg>
);

const IconBars = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="12" width="4" height="9" rx="1" />
    <rect x="10" y="7" width="4" height="14" rx="1" />
    <rect x="17" y="3" width="4" height="18" rx="1" />
  </svg>
);

const IconSliders = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="21" x2="4" y2="14" />
    <line x1="4" y1="10" x2="4" y2="3" />
    <line x1="12" y1="21" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12" y2="3" />
    <line x1="20" y1="21" x2="20" y2="16" />
    <line x1="20" y1="12" x2="20" y2="3" />
    <line x1="1" y1="14" x2="7" y2="14" />
    <line x1="9" y1="8" x2="15" y2="8" />
    <line x1="17" y1="16" x2="23" y2="16" />
  </svg>
);

const IconSettings = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.315 8.685a.98.98 0 0 1 .837-.276c.47.07.802.48.968.925a2.501 2.501 0 1 0 3.214-3.214c-.446-.166-.855-.497-.925-.968a.979.979 0 0 1 .276-.837l1.61-1.61a2.404 2.404 0 0 1 1.705-.707c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.969a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z" />
  </svg>
);

/* ── 3D Tilt Card ── */
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

function TiltCard({ children, className = "" }: TiltCardProps) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({ x: -y * 8, y: x * 8 });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`bg-sx-card border border-sx-border rounded-2xl transition-[border-color,box-shadow] duration-300 hover:border-sx-accent/40 hover:shadow-[0_0_24px_-6px_rgba(1,222,130,0.15)] ${className}`}
      style={{
        transform: `perspective(800px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: isHovered
          ? "border-color 0.3s, box-shadow 0.3s"
          : "transform 0.5s ease, border-color 0.3s, box-shadow 0.3s",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}

/* ── Feature data ── */
const features = [
  {
    id: 1,
    title: "Обработка обращений",
    description:
      "Автоматический приём и маршрутизация входящих сообщений из всех каналов — Telegram, WhatsApp, ВКонтакте, сайт",
    icon: <IconMessages />,
    stat: { value: "47", label: "обращений сегодня", trend: "+12%" },
    wide: true,
  },
  {
    id: 2,
    title: "Логика записи",
    description:
      "Проверка доступности, подбор времени, подтверждение — без участия человека",
    icon: <IconCalendar />,
  },
  {
    id: 3,
    title: "Переносы и отмены",
    description: "Гибкая обработка изменений без потери клиента",
    icon: <IconRefresh />,
  },
  {
    id: 4,
    title: "Аналитика и отчёты",
    description:
      "Конверсии, загрузка, время ответа — всё в реальном времени",
    icon: <IconBars />,
  },
  {
    id: 5,
    title: "Контроль качества",
    description: "Внутренние системы мониторинга и оценки работы",
    icon: <IconSliders />,
    tall: true,
    metrics: [
      { label: "Конверсия", value: "68%" },
      { label: "Время ответа", value: "12с" },
      { label: "Отток", value: "2%" },
      { label: "Рейтинг", value: "4.9" },
    ],
  },
  {
    id: 6,
    title: "Настраиваемые сценарии",
    description: "Адаптация логики общения под специфику бизнеса",
    icon: <IconSettings />,
  },
] as const;

export default function Features() {
  return (
    <SectionWrapper id="features">
      {/* Background ghost word */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-0 flex items-center overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-heading font-black text-sx-cream whitespace-nowrap"
          style={{
            fontSize: "clamp(60px, 10vw, 140px)",
            opacity: 0.02,
            letterSpacing: "0.1em",
            transform: "translateX(-5%)",
          }}
        >
          ВОЗМОЖНОСТИ
        </span>
      </div>

      <div className="relative z-10">
        <AnimateOnScroll>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-sx-cream text-center">
            Возможности платформы
          </h2>
        </AnimateOnScroll>

        {/* Desktop bento grid */}
        <div className="hidden lg:grid grid-cols-3 grid-rows-[auto_auto] gap-5 mt-16">
          {/* Feature 1 — col-span-2, wide */}
          <AnimateOnScroll delay={0.05} className="col-span-2">
            <TiltCard className="p-8 h-full">
              <div className="flex flex-col h-full">
                <div className="text-sx-accent mb-5">{features[0].icon}</div>
                <h3 className="font-heading text-xl font-semibold text-sx-cream mb-2">
                  {features[0].title}
                </h3>
                <p className="text-sx-muted text-sm leading-relaxed mb-6">
                  {features[0].description}
                </p>
                {/* Stat visual */}
                <div className="mt-auto flex items-end gap-6">
                  <div className="bg-sx-deep/60 rounded-xl px-5 py-4 border border-sx-border/40">
                    <span className="font-heading text-4xl font-bold text-sx-accent">
                      {features[0].stat.value}
                    </span>
                    <p className="text-sx-muted text-xs mt-1">{features[0].stat.label}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sx-accent text-sm font-medium">
                      {features[0].stat.trend}
                    </span>
                    <span className="text-sx-muted/50 text-xs">к вчера</span>
                  </div>
                  {/* Mini bar chart */}
                  <div className="flex items-end gap-1 h-10 ml-2">
                    {[40, 65, 50, 80, 60, 90, 75].map((h, i) => (
                      <div
                        key={i}
                        className="w-2 rounded-t-sm bg-sx-accent/50"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
          </AnimateOnScroll>

          {/* Feature 2 */}
          <AnimateOnScroll delay={0.1}>
            <TiltCard className="p-7 h-full">
              <div className="text-sx-accent mb-5">{features[1].icon}</div>
              <h3 className="font-heading text-lg font-semibold text-sx-cream mb-2">
                {features[1].title}
              </h3>
              <p className="text-sx-muted text-sm leading-relaxed">
                {features[1].description}
              </p>
            </TiltCard>
          </AnimateOnScroll>

          {/* Feature 3 */}
          <AnimateOnScroll delay={0.15}>
            <TiltCard className="p-7 h-full">
              <div className="text-sx-accent mb-5">{features[2].icon}</div>
              <h3 className="font-heading text-lg font-semibold text-sx-cream mb-2">
                {features[2].title}
              </h3>
              <p className="text-sx-muted text-sm leading-relaxed">
                {features[2].description}
              </p>
            </TiltCard>
          </AnimateOnScroll>

          {/* Feature 4 + Feature 6 stacked in middle column */}
          <div className="flex flex-col gap-5">
            <AnimateOnScroll delay={0.2} className="flex-1">
              <TiltCard className="p-7 h-full">
                <div className="text-sx-accent mb-5">{features[3].icon}</div>
                <h3 className="font-heading text-lg font-semibold text-sx-cream mb-2">
                  {features[3].title}
                </h3>
                <p className="text-sx-muted text-sm leading-relaxed">
                  {features[3].description}
                </p>
              </TiltCard>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.3} className="flex-1">
              <TiltCard className="p-7 h-full">
                <div className="text-sx-accent mb-5">{features[5].icon}</div>
                <h3 className="font-heading text-lg font-semibold text-sx-cream mb-2">
                  {features[5].title}
                </h3>
                <p className="text-sx-muted text-sm leading-relaxed">
                  {features[5].description}
                </p>
              </TiltCard>
            </AnimateOnScroll>
          </div>

          {/* Feature 5 — row-span-2 tall */}
          <AnimateOnScroll delay={0.25} className="row-span-2">
            <TiltCard className="p-7 h-full flex flex-col">
              <div className="text-sx-accent mb-5">{features[4].icon}</div>
              <h3 className="font-heading text-lg font-semibold text-sx-cream mb-2">
                {features[4].title}
              </h3>
              <p className="text-sx-muted text-sm leading-relaxed mb-8">
                {features[4].description}
              </p>

              {/* Metrics grid */}
              <div className="grid grid-cols-2 gap-3 mt-auto">
                {features[4].metrics.map((m) => (
                  <div
                    key={m.label}
                    className="bg-sx-deep/50 rounded-xl p-4 border border-sx-border/30 flex flex-col gap-1"
                  >
                    <span className="font-heading text-2xl font-bold text-sx-accent">
                      {m.value}
                    </span>
                    <span className="text-sx-muted text-xs">{m.label}</span>
                  </div>
                ))}
              </div>

              {/* Quality bar */}
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-xs text-sx-muted/60">
                  <span>Общий рейтинг</span>
                  <span className="text-sx-accent">98%</span>
                </div>
                <div className="h-1.5 rounded-full bg-sx-border/40 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sx-accent/70 to-sx-accent"
                    style={{ width: "98%" }}
                  />
                </div>
              </div>
            </TiltCard>
          </AnimateOnScroll>
        </div>

        {/* Mobile: regular grid */}
        <div className="lg:hidden mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
          {features.map((f, i) => (
            <AnimateOnScroll key={f.title} delay={0.08 * i}>
              <div className="group bg-sx-card border border-sx-border rounded-2xl p-6 transition-all duration-300 hover:border-sx-accent/40 hover:shadow-[0_0_24px_-6px_rgba(1,222,130,0.12)] h-full">
                <div className="text-sx-accent mb-5">{f.icon}</div>
                <h3 className="font-heading text-lg font-semibold text-sx-cream mb-2">
                  {f.title}
                </h3>
                <p className="text-sx-muted text-sm leading-relaxed">
                  {f.description}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
