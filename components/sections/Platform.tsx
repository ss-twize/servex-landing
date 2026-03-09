"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const tabs = ["Аналитика", "Обращения", "Записи"] as const;
type Tab = (typeof tabs)[number];

/* ── Metric Card ── */
function MetricCard({
  label,
  value,
  trend,
}: {
  label: string;
  value: string;
  trend: string;
}) {
  return (
    <div className="bg-[#0A1214] rounded-lg p-4 border border-sx-border/50">
      <p className="text-sx-muted text-xs mb-1">{label}</p>
      <p className="font-heading text-sx-cream text-xl font-bold">{value}</p>
      <p className="text-sx-accent text-xs mt-1">{trend}</p>
    </div>
  );
}

/* ── Analytics Tab ── */
function AnalyticsView() {
  const metrics = [
    { label: "Обращений сегодня", value: "47", trend: "+12% к вчера" },
    { label: "Записей", value: "32", trend: "+8% к вчера" },
    { label: "Конверсия", value: "68%", trend: "+3% за неделю" },
    { label: "Среднее время ответа", value: "12с", trend: "-2с к вчера" },
  ];

  const bars = [
    { day: "Пн", h: 65 },
    { day: "Вт", h: 80 },
    { day: "Ср", h: 55 },
    { day: "Чт", h: 90 },
    { day: "Пт", h: 75 },
    { day: "Сб", h: 100 },
    { day: "Вс", h: 45 },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {metrics.map((m) => (
          <MetricCard key={m.label} {...m} />
        ))}
      </div>

      <div className="bg-[#0A1214] rounded-lg p-5 border border-sx-border/50">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sx-cream text-sm font-heading font-semibold">
            Обращения за неделю
          </p>
          <span className="text-sx-accent text-xs">+18% общий рост</span>
        </div>
        <div className="flex items-end justify-between gap-2 h-32">
          {bars.map((b) => (
            <div key={b.day} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full rounded-t-md bg-gradient-to-t from-sx-accent/60 to-sx-accent"
                style={{ height: `${b.h}%` }}
              />
              <span className="text-sx-muted text-[10px]">{b.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Messages Tab ── */
function MessagesView() {
  const messages = [
    {
      name: "Анна М.",
      preview: "Здравствуйте, хочу записаться на стрижку на пятницу...",
      time: "2 мин",
      status: "Записан",
      statusColor: "bg-sx-accent/20 text-sx-accent",
    },
    {
      name: "Елена К.",
      preview: "Можно перенести запись с четверга на субботу?",
      time: "8 мин",
      status: "Перенесён",
      statusColor: "bg-blue-500/20 text-blue-400",
    },
    {
      name: "Мария Д.",
      preview: "Подскажите стоимость окрашивания и сколько по времени...",
      time: "15 мин",
      status: "Ожидает",
      statusColor: "bg-yellow-500/20 text-yellow-400",
    },
    {
      name: "Ольга С.",
      preview: "Спасибо! Буду в 14:00 как договорились",
      time: "32 мин",
      status: "Записан",
      statusColor: "bg-sx-accent/20 text-sx-accent",
    },
    {
      name: "Дарья В.",
      preview: "А можно к мастеру Ирине попасть на маникюр?",
      time: "1 ч",
      status: "Ожидает",
      statusColor: "bg-yellow-500/20 text-yellow-400",
    },
  ];

  return (
    <div className="bg-[#0A1214] rounded-lg border border-sx-border/50 divide-y divide-sx-border/30">
      {messages.map((m) => (
        <div
          key={m.name + m.time}
          className="flex items-center gap-4 p-4 hover:bg-sx-accent/[0.02] transition-colors"
        >
          <div className="w-9 h-9 rounded-full bg-sx-border/50 flex items-center justify-center text-sx-cream text-xs font-bold shrink-0">
            {m.name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sx-cream text-sm font-medium">
                {m.name}
              </span>
              <span className="text-sx-muted/50 text-xs">{m.time} назад</span>
            </div>
            <p className="text-sx-muted text-xs mt-0.5 truncate">
              {m.preview}
            </p>
          </div>
          <span
            className={`px-2.5 py-1 rounded-full text-[11px] font-medium shrink-0 ${m.statusColor}`}
          >
            {m.status}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── Calendar/Booking Tab ── */
function BookingsView() {
  const hours = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];
  const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

  type Appointment = [number, number, number, string, string];
  const appointments: Appointment[] = [
    [0, 0, 2, "Стрижка", "bg-sx-accent/30 border-sx-accent/50"],
    [0, 3, 1, "Укладка", "bg-blue-500/20 border-blue-500/40"],
    [1, 1, 3, "Окрашивание", "bg-purple-500/20 border-purple-500/40"],
    [1, 5, 2, "Маникюр", "bg-sx-accent/30 border-sx-accent/50"],
    [2, 0, 1, "Стрижка", "bg-sx-accent/30 border-sx-accent/50"],
    [2, 2, 2, "Уход за лицом", "bg-pink-500/20 border-pink-500/40"],
    [3, 1, 1, "Укладка", "bg-blue-500/20 border-blue-500/40"],
    [3, 3, 3, "Окрашивание", "bg-purple-500/20 border-purple-500/40"],
    [4, 0, 2, "Маникюр", "bg-sx-accent/30 border-sx-accent/50"],
    [4, 4, 2, "Стрижка", "bg-sx-accent/30 border-sx-accent/50"],
    [5, 0, 3, "Окрашивание", "bg-purple-500/20 border-purple-500/40"],
    [5, 4, 1, "Укладка", "bg-blue-500/20 border-blue-500/40"],
  ];

  return (
    <div className="bg-[#0A1214] rounded-lg border border-sx-border/50 overflow-x-auto">
      <div className="min-w-[540px]">
        <div className="grid grid-cols-[60px_repeat(6,1fr)] border-b border-sx-border/30">
          <div className="p-3" />
          {days.map((d) => (
            <div
              key={d}
              className="p-3 text-center text-sx-muted text-xs font-medium"
            >
              {d}
            </div>
          ))}
        </div>

        <div className="relative">
          {hours.map((h, hi) => (
            <div
              key={h}
              className="grid grid-cols-[60px_repeat(6,1fr)] border-b border-sx-border/10 h-10"
            >
              <div className="px-3 flex items-center text-sx-muted/50 text-[10px]">
                {h}
              </div>
              {days.map((_, di) => {
                const apt = appointments.find(
                  (a) => a[0] === di && a[1] === hi
                );
                if (apt) {
                  return (
                    <div key={di} className="relative px-0.5 py-0.5">
                      <div
                        className={`absolute inset-x-0.5 rounded-md border ${apt[4]} px-1.5 py-0.5 z-10`}
                        style={{ height: `${apt[2] * 40 - 4}px` }}
                      >
                        <span className="text-sx-cream text-[10px] leading-tight block truncate">
                          {apt[3]}
                        </span>
                      </div>
                    </div>
                  );
                }
                return <div key={di} />;
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Dashboard Mockup (shared between sticky and mobile) ── */
function DashboardMockup({
  activeTab,
  setActiveTab,
}: {
  activeTab: Tab;
  setActiveTab: (t: Tab) => void;
}) {
  const tabContent: Record<Tab, React.ReactNode> = {
    Аналитика: <AnalyticsView />,
    Обращения: <MessagesView />,
    Записи: <BookingsView />,
  };

  return (
    <div className="bg-sx-card border border-sx-border rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
      {/* Fake browser bar */}
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-sx-border/70 bg-[#080F11]">
        <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
        <span className="w-3 h-3 rounded-full bg-[#28C840]" />
        <span className="ml-4 text-sx-muted/40 text-xs font-body">
          app.servex.pro
        </span>
      </div>

      {/* Tab navigation */}
      <div className="flex border-b border-sx-border/50 bg-[#080F11]">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "text-sx-accent"
                : "text-sx-muted hover:text-sx-cream"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="platform-tab-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-sx-accent"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-5 min-h-[340px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {tabContent[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── Sticky Scroll Platform (desktop) ── */
function StickyPlatform() {
  const [activeTab, setActiveTab] = useState<Tab>("Аналитика");
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: containerRef });
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.55, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.4], [24, 12]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <div ref={containerRef} style={{ height: "300vh" }} className="relative">
      <div
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
        style={{ pointerEvents: "auto" }}
      >
        {/* Background fade */}
        <motion.div
          className="absolute inset-0 bg-sx-deep"
          style={{ opacity: bgOpacity }}
        />

        <motion.div
          className="relative w-full max-w-5xl mx-auto px-6"
          style={{ scale, borderRadius }}
        >
          <DashboardMockup activeTab={activeTab} setActiveTab={setActiveTab} />
        </motion.div>
      </div>
    </div>
  );
}

/* ── Main Platform Section ── */
export default function Platform() {
  const [activeTab, setActiveTab] = useState<Tab>("Аналитика");

  return (
    <section id="platform" className="relative">
      {/* Heading — outside the sticky container */}
      <div className="relative z-10 pt-24 pb-8 px-6 max-w-7xl mx-auto">
        <AnimateOnScroll>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-sx-cream text-center">
            Полный контроль в одном интерфейсе
          </h2>
        </AnimateOnScroll>
        <AnimateOnScroll delay={0.1}>
          <p className="text-sx-muted text-lg md:text-xl text-center mt-4 max-w-2xl mx-auto">
            Аналитика, обращения, записи — всё видно и управляемо
          </p>
        </AnimateOnScroll>
      </div>

      {/* Desktop: sticky scroll expansion */}
      <div className="hidden md:block">
        <StickyPlatform />
      </div>

      {/* Mobile: normal layout */}
      <div className="md:hidden px-6 pb-24 max-w-7xl mx-auto">
        <AnimateOnScroll delay={0.2}>
          <DashboardMockup activeTab={activeTab} setActiveTab={setActiveTab} />
        </AnimateOnScroll>
      </div>
    </section>
  );
}
