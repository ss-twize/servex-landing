"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DAY_NAMES = ["Пн", "Вт", "Ср", "Чт", "Пт"];
const MONTH_NAMES = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря",
];

const TELEGRAM_BOT_USERNAME =
  (process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || "servex_bot").replace(/^@/, "");

const TIME_SLOTS = [
  "10:00", "11:00", "12:00", "13:00", "14:00",
  "15:00", "16:00", "17:00", "18:00",
];

function getNext14Weekdays(): Date[] {
  const dates: Date[] = [];
  const now = new Date();
  let current = new Date(now);
  current.setDate(current.getDate() + 1); // start from tomorrow

  while (dates.length < 14) {
    const day = current.getDay();
    if (day !== 0 && day !== 6) {
      dates.push(new Date(current));
    }
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

function formatDateShort(date: Date): string {
  return `${date.getDate()} ${MONTH_NAMES[date.getMonth()]}`;
}

function getDayAbbr(date: Date): string {
  const day = date.getDay();
  // getDay: 0=Sun 1=Mon ... mapping to our DAY_NAMES (Mon=0)
  return DAY_NAMES[day - 1] || "";
}

type FormData = {
  name: string;
  phone: string;
  business: string;
};

export default function CalendarWidget({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({ name: "", phone: "", business: "" });
  const dates = getNext14Weekdays();

  const slideVariants = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  const handleSubmit = () => {
    if (!form.name.trim() || !form.phone.trim()) return;
    setStep(4);
  };

  const confirmCode = `${selectedDate ? selectedDate.toISOString().slice(0, 10) : "date"}-${selectedTime || "time"}-${form.phone.replace(/\D/g, "").slice(-4) || "0000"}`;
  const tgUrl = `https://t.me/${TELEGRAM_BOT_USERNAME}?start=${encodeURIComponent(confirmCode)}`;

  return (
    <div className="min-h-[360px] flex flex-col">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25 }}
            className="flex flex-col flex-1"
          >
            <p className="text-sx-muted text-sm mb-4">Выберите дату</p>
            <div className="grid grid-cols-5 sm:grid-cols-7 gap-2">
              {dates.map((d, i) => {
                const isSelected =
                  selectedDate &&
                  d.toDateString() === selectedDate.toDateString();
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(d)}
                    className={`flex flex-col items-center py-2.5 px-1 rounded-lg text-sm transition-all cursor-pointer border ${
                      isSelected
                        ? "bg-sx-accent text-sx-deep border-sx-accent font-semibold"
                        : "bg-sx-deep border-sx-border text-sx-cream hover:border-sx-accent/50"
                    }`}
                  >
                    <span className="text-[11px] uppercase opacity-70">
                      {getDayAbbr(d)}
                    </span>
                    <span className="font-medium">{d.getDate()}</span>
                  </button>
                );
              })}
            </div>
            <div className="mt-auto pt-6 flex justify-end">
              <button
                onClick={() => selectedDate && setStep(2)}
                disabled={!selectedDate}
                className={`px-6 py-2.5 rounded-lg font-heading font-medium text-sm transition-all cursor-pointer ${
                  selectedDate
                    ? "bg-sx-accent text-sx-deep hover:bg-sx-accent-hover"
                    : "bg-sx-border text-sx-muted cursor-not-allowed"
                }`}
              >
                Далее
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25 }}
            className="flex flex-col flex-1"
          >
            <p className="text-sx-muted text-sm mb-1">Выберите время</p>
            <p className="text-sx-cream text-sm font-medium mb-4">
              {selectedDate && formatDateShort(selectedDate)}
            </p>
            <div className="grid grid-cols-3 gap-2">
              {TIME_SLOTS.map((t) => {
                const isSelected = selectedTime === t;
                return (
                  <button
                    key={t}
                    onClick={() => setSelectedTime(t)}
                    className={`py-2.5 rounded-lg text-sm transition-all cursor-pointer border ${
                      isSelected
                        ? "bg-sx-accent text-sx-deep border-sx-accent font-semibold"
                        : "bg-sx-deep border-sx-border text-sx-cream hover:border-sx-accent/50"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
            <div className="mt-auto pt-6 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-2.5 rounded-lg font-heading font-medium text-sm text-sx-muted hover:text-sx-cream transition-colors cursor-pointer"
              >
                Назад
              </button>
              <button
                onClick={() => selectedTime && setStep(3)}
                disabled={!selectedTime}
                className={`px-6 py-2.5 rounded-lg font-heading font-medium text-sm transition-all cursor-pointer ${
                  selectedTime
                    ? "bg-sx-accent text-sx-deep hover:bg-sx-accent-hover"
                    : "bg-sx-border text-sx-muted cursor-not-allowed"
                }`}
              >
                Далее
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25 }}
            className="flex flex-col flex-1"
          >
            <p className="text-sx-muted text-sm mb-4">Контактные данные</p>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Имя *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-sx-deep border border-sx-border rounded-lg px-4 py-3 text-sx-cream placeholder:text-sx-muted focus:border-sx-accent focus:outline-none transition-colors"
              />
              <input
                type="tel"
                placeholder="Телефон *"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full bg-sx-deep border border-sx-border rounded-lg px-4 py-3 text-sx-cream placeholder:text-sx-muted focus:border-sx-accent focus:outline-none transition-colors"
              />
              <input
                type="text"
                placeholder="Название бизнеса"
                value={form.business}
                onChange={(e) => setForm({ ...form, business: e.target.value })}
                className="w-full bg-sx-deep border border-sx-border rounded-lg px-4 py-3 text-sx-cream placeholder:text-sx-muted focus:border-sx-accent focus:outline-none transition-colors"
              />
            </div>
            <div className="mt-auto pt-6 flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2.5 rounded-lg font-heading font-medium text-sm text-sx-muted hover:text-sx-cream transition-colors cursor-pointer"
              >
                Назад
              </button>
              <button
                onClick={handleSubmit}
                disabled={!form.name.trim() || !form.phone.trim()}
                className={`px-6 py-2.5 rounded-lg font-heading font-medium text-sm transition-all cursor-pointer ${
                  form.name.trim() && form.phone.trim()
                    ? "bg-sx-accent text-sx-deep hover:bg-sx-accent-hover"
                    : "bg-sx-border text-sx-muted cursor-not-allowed"
                }`}
              >
                Записаться
              </button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25 }}
            className="flex flex-col flex-1 items-center justify-center text-center py-8"
          >
            {/* Animated checkmark */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
              className="w-16 h-16 rounded-full bg-sx-accent/10 border-2 border-sx-accent flex items-center justify-center mb-6"
            >
              <motion.svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-sx-accent"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <motion.polyline
                  points="20 6 9 17 4 12"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                />
              </motion.svg>
            </motion.div>

            <h3 className="font-heading text-xl font-bold text-sx-cream mb-2">
              Спасибо!
            </h3>
            <p className="text-sx-muted text-sm mb-4">
              Мы свяжемся с вами для подтверждения.
            </p>
            <div className="bg-sx-deep border border-sx-border rounded-lg px-4 py-3 text-sm">
              <span className="text-sx-muted">Дата: </span>
              <span className="text-sx-cream font-medium">
                {selectedDate && formatDateShort(selectedDate)}
              </span>
              <span className="text-sx-border mx-2">|</span>
              <span className="text-sx-muted">Время: </span>
              <span className="text-sx-cream font-medium">{selectedTime}</span>
            </div>

            <a
              href={tgUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 px-8 py-2.5 rounded-lg font-heading font-medium text-sm bg-sx-accent text-sx-deep hover:bg-sx-accent-hover transition-all cursor-pointer"
            >
              Подтвердить в Telegram
            </a>
            <button
              onClick={onClose}
              className="mt-3 px-8 py-2.5 rounded-lg font-heading font-medium text-sm bg-sx-deep text-sx-cream hover:border-sx-accent/50 border border-sx-border transition-all cursor-pointer"
            >
              Закрыть
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
