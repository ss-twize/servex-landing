"use client";
import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const tabs = ["Аналитика", "Обращения", "Записи"] as const;
type Tab = (typeof tabs)[number];

/* ── Analytics Tab ── */
function AnalyticsView() {
  const metrics = [
    { label: "Обращений сегодня", value: "47", accent: false },
    { label: "Записей", value: "32", accent: false },
    { label: "Конверсия", value: "68%", accent: true },
    { label: "Время ответа", value: "12с", accent: false },
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
          <div
            key={m.label}
            className="bg-sx-deep rounded-lg p-4 border border-sx-border/40"
          >
            <p className="text-sx-muted text-xs mb-1">{m.label}</p>
            <p
              className={`text-2xl font-bold ${
                m.accent ? "text-sx-accent" : "text-sx-cream"
              }`}
            >
              {m.value}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-sx-deep rounded-lg p-5 border border-sx-border/40">
        <p className="text-sx-cream text-sm font-heading font-semibold mb-4">
          Обращения за неделю
        </p>
        <div className="flex items-end justify-between gap-2 h-32">
          {bars.map((b) => (
            <div
              key={b.day}
              className="flex-1 flex flex-col items-center gap-2"
            >
              <div
                className="w-full rounded-t-md bg-sx-accent"
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
      initials: "АМ",
      preview: "Здравствуйте, хочу записаться на стрижку на пятницу...",
      time: "2 мин",
      status: "Записан",
      statusColor: "bg-sx-accent/20 text-sx-accent",
    },
    {
      name: "Елена К.",
      initials: "ЕК",
      preview: "Можно перенести запись с четверга на субботу?",
      time: "8 мин",
      status: "Перенесён",
      statusColor: "bg-blue-500/20 text-blue-400",
    },
    {
      name: "Мария Д.",
      initials: "МД",
      preview: "Подскажите стоимость окрашивания и сколько по времени...",
      time: "15 мин",
      status: "Ожидает",
      statusColor: "bg-sx-hot/20 text-sx-hot",
    },
    {
      name: "Ольга С.",
      initials: "ОС",
      preview: "Спасибо! Буду в 14:00 как договорились",
      time: "32 мин",
      status: "Записан",
      statusColor: "bg-sx-accent/20 text-sx-accent",
    },
    {
      name: "Дарья В.",
      initials: "ДВ",
      preview: "А можно к мастеру Ирине попасть на маникюр?",
      time: "1 ч",
      status: "Ожидает",
      statusColor: "bg-sx-hot/20 text-sx-hot",
    },
  ];

  return (
    <div className="bg-sx-deep rounded-lg border border-sx-border/40 divide-y divide-sx-border/30">
      {messages.map((m) => (
        <div
          key={m.name + m.time}
          className="flex items-center gap-4 p-4"
        >
          <div className="w-9 h-9 rounded-full bg-sx-border/50 flex items-center justify-center text-sx-cream text-[10px] font-bold shrink-0">
            {m.initials}
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
  const hours = [
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];
  const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  type Appointment = {
    day: number;
    hour: number;
    span: number;
    label: string;
    color: string;
  };

  const appointments: Appointment[] = [
    { day: 0, hour: 0, span: 2, label: "Стрижка", color: "bg-sx-accent/30 border-sx-accent/50" },
    { day: 0, hour: 3, span: 1, label: "Укладка", color: "bg-blue-500/20 border-blue-500/40" },
    { day: 1, hour: 1, span: 3, label: "Окрашивание", color: "bg-purple-500/20 border-purple-500/40" },
    { day: 1, hour: 5, span: 2, label: "Маникюр", color: "bg-sx-accent/30 border-sx-accent/50" },
    { day: 2, hour: 0, span: 1, label: "Стрижка", color: "bg-sx-accent/30 border-sx-accent/50" },
    { day: 2, hour: 2, span: 2, label: "Уход за лицом", color: "bg-pink-500/20 border-pink-500/40" },
    { day: 3, hour: 1, span: 1, label: "Укладка", color: "bg-blue-500/20 border-blue-500/40" },
    { day: 3, hour: 3, span: 3, label: "Окрашивание", color: "bg-purple-500/20 border-purple-500/40" },
    { day: 4, hour: 0, span: 2, label: "Маникюр", color: "bg-sx-accent/30 border-sx-accent/50" },
    { day: 4, hour: 4, span: 2, label: "Стрижка", color: "bg-sx-accent/30 border-sx-accent/50" },
    { day: 5, hour: 0, span: 3, label: "Окрашивание", color: "bg-purple-500/20 border-purple-500/40" },
    { day: 5, hour: 4, span: 1, label: "Укладка", color: "bg-blue-500/20 border-blue-500/40" },
    { day: 6, hour: 1, span: 2, label: "Маникюр", color: "bg-sx-accent/30 border-sx-accent/50" },
    { day: 6, hour: 5, span: 2, label: "Стрижка", color: "bg-sx-accent/30 border-sx-accent/50" },
  ];

  return (
    <div className="bg-sx-deep rounded-lg border border-sx-border/40 overflow-x-auto">
      <div className="min-w-[580px]">
        <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-sx-border/30">
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
              className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-sx-border/10 h-10"
            >
              <div className="px-3 flex items-center text-sx-muted/50 text-[10px]">
                {h}
              </div>
              {days.map((_, di) => {
                const apt = appointments.find(
                  (a) => a.day === di && a.hour === hi
                );
                if (apt) {
                  return (
                    <div key={di} className="relative px-0.5 py-0.5">
                      <div
                        className={`absolute inset-x-0.5 rounded-md border ${apt.color} px-1.5 py-0.5 z-10`}
                        style={{ height: `${apt.span * 40 - 4}px` }}
                      >
                        <span className="text-sx-cream text-[10px] leading-tight block truncate">
                          {apt.label}
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

/* ── Dashboard Mockup ── */
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
    <div className="bg-sx-card border border-sx-border rounded-xl overflow-hidden shadow-2xl shadow-black/40">
      {/* Top bar with dots */}
      <div className="flex items-center gap-2 px-5 py-3 border-b border-sx-border/70 bg-sx-deep">
        <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
        <span className="w-3 h-3 rounded-full bg-[#28C840]" />
        <span className="ml-4 text-sx-muted/40 text-xs font-body tracking-wide">
          СЕРВЕКС Platform
        </span>
      </div>

      {/* Tab navigation */}
      <div className="flex bg-sx-deep border-b border-sx-border">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "text-sx-accent border-b-2 border-sx-accent"
                : "text-sx-muted hover:text-sx-cream"
            }`}
          >
            {tab}
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
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.6, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.4], [24, 8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);

  return (
    <div ref={containerRef} className="min-h-[250vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center px-4">
        <motion.div
          className="relative w-full max-w-5xl mx-auto"
          style={{ scale, borderRadius, opacity }}
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
      {/* Heading */}
      <div className="relative z-10 pt-24 pb-8 px-6 max-w-7xl mx-auto">
        <AnimateOnScroll>
          <p className="text-xs tracking-[0.3em] text-sx-muted uppercase mb-4">
            ПЛАТФОРМА
          </p>
        </AnimateOnScroll>
        <AnimateOnScroll delay={0.05}>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-sx-cream">
            Полный контроль
          </h2>
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
