"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DAY_NAMES = ["Пн", "Вт", "Ср", "Чт", "Пт"];
const MONTH_NAMES = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря",
];

const TIME_SLOTS = [
  "10:00", "11:00", "12:00", "13:00", "14:00",
  "15:00", "16:00", "17:00", "18:00",
];

const BOT_USERNAME =
  process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || "servex_demo_bot";

function getNext14Weekdays(): Date[] {
  const dates: Date[] = [];
  const now = new Date();
  let current = new Date(now);
  current.setDate(current.getDate() + 1);
  while (dates.length < 14) {
    const day = current.getDay();
    if (day !== 0 && day !== 6) dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

function formatDateShort(date: Date): string {
  return `${date.getDate()} ${MONTH_NAMES[date.getMonth()]}`;
}

function getDayAbbr(date: Date): string {
  return DAY_NAMES[date.getDay() - 1] || "";
}

function generateCode(): string {
  return `SVX-${Math.floor(1000 + Math.random() * 9000)}`;
}

type FormData = {
  name: string;
  phone: string;
  business: string;
  telegram: string;
  email: string;
};

const inputCls =
  "w-full bg-sx-deep border border-sx-border rounded-lg px-4 py-3 text-sx-cream placeholder:text-sx-muted focus:border-sx-accent focus:outline-none transition-colors text-sm";

export default function CalendarWidget({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({
    name: "", phone: "", business: "", telegram: "", email: "",
  });
  const [confirmCode, setConfirmCode] = useState("");
  const dates = getNext14Weekdays();

  const slideVariants = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  const handleSubmit = () => {
    if (!form.name.trim() || !form.phone.trim()) return;

    const code = generateCode();
    setConfirmCode(code);

    // Send booking data to webhook (fire-and-forget)
    const webhookUrl = process.env.NEXT_PUBLIC_BOOKING_WEBHOOK_URL;
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          name: form.name,
          phone: form.phone,
          business: form.business || null,
          telegram: form.telegram || null,
          email: form.email || null,
          date: selectedDate ? formatDateShort(selectedDate) : "",
          time: selectedTime,
          status: "pending",
        }),
      }).catch(() => {});
    }

    setStep(4);
  };

  const tgUrl = `https://t.me/${BOT_USERNAME}?start=${confirmCode}`;

  return (
    <div className="min-h-[360px] flex flex-col">
      <AnimatePresence mode="wait">

        {/* ── Step 1: Date ── */}
        {step === 1 && (
          <motion.div
            key="step1"
            variants={slideVariants}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.25 }}
            className="flex flex-col flex-1"
          >
            <p className="text-sx-muted text-sm mb-4">Выберите дату</p>
            <div className="grid grid-cols-5 sm:grid-cols-7 gap-2">
              {dates.map((d, i) => {
                const isSelected = selectedDate?.toDateString() === d.toDateString();
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
                    <span className="text-[11px] uppercase opacity-70">{getDayAbbr(d)}</span>
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

        {/* ── Step 2: Time ── */}
        {step === 2 && (
          <motion.div
            key="step2"
            variants={slideVariants}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.25 }}
            className="flex flex-col flex-1"
          >
            <p className="text-sx-muted text-sm mb-1">Выберите время</p>
            <p className="text-sx-cream text-sm font-medium mb-4">
              {selectedDate && formatDateShort(selectedDate)}
            </p>
            <div className="grid grid-cols-3 gap-2">
              {TIME_SLOTS.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTime(t)}
                  className={`py-2.5 rounded-lg text-sm transition-all cursor-pointer border ${
                    selectedTime === t
                      ? "bg-sx-accent text-sx-deep border-sx-accent font-semibold"
                      : "bg-sx-deep border-sx-border text-sx-cream hover:border-sx-accent/50"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="mt-auto pt-6 flex justify-between">
              <button onClick={() => setStep(1)} className="px-6 py-2.5 rounded-lg font-heading font-medium text-sm text-sx-muted hover:text-sx-cream transition-colors cursor-pointer">
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

        {/* ── Step 3: Contacts ── */}
        {step === 3 && (
          <motion.div
            key="step3"
            variants={slideVariants}
            initial="enter" animate="center" exit="exit"
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
                className={inputCls}
              />
              <input
                type="tel"
                placeholder="Телефон *"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={inputCls}
              />
              <input
                type="text"
                placeholder="Название бизнеса"
                value={form.business}
                onChange={(e) => setForm({ ...form, business: e.target.value })}
                className={inputCls}
              />
              <input
                type="text"
                placeholder="Telegram (необязательно)"
                value={form.telegram}
                onChange={(e) => setForm({ ...form, telegram: e.target.value })}
                className={inputCls}
              />
              <input
                type="email"
                placeholder="Email (необязательно)"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputCls}
              />
            </div>
            <div className="mt-auto pt-6 flex justify-between">
              <button onClick={() => setStep(2)} className="px-6 py-2.5 rounded-lg font-heading font-medium text-sm text-sx-muted hover:text-sx-cream transition-colors cursor-pointer">
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

        {/* ── Step 4: Telegram confirmation ── */}
        {step === 4 && (
          <motion.div
            key="step4"
            variants={slideVariants}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.25 }}
            className="flex flex-col flex-1 items-center justify-center text-center py-4"
          >
            {/* Telegram icon */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 280, damping: 22, delay: 0.1 }}
              className="w-16 h-16 rounded-full bg-[#2AABEE]/10 border-2 border-[#2AABEE]/30 flex items-center justify-center mb-5"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-[#2AABEE]">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-heading text-xl font-bold text-sx-cream mb-2"
            >
              Запись почти готова
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 }}
              className="text-sx-muted text-sm mb-6 leading-relaxed"
            >
              Чтобы подтвердить запись на демо,<br />отправьте код в Telegram.
            </motion.p>

            {/* Confirmation code */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.36, type: "spring", stiffness: 260, damping: 20 }}
              className="bg-sx-deep border-2 border-sx-accent/25 rounded-2xl px-10 py-5 mb-6 w-full"
            >
              <p className="text-[11px] text-sx-muted uppercase tracking-[0.2em] mb-2">
                код подтверждения
              </p>
              <p className="font-heading text-4xl font-extrabold text-sx-accent tracking-widest">
                {confirmCode}
              </p>
            </motion.div>

            {/* Telegram button */}
            <motion.a
              href={tgUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.44 }}
              className="w-full flex items-center justify-center gap-2.5 bg-[#2AABEE] text-white rounded-xl py-3.5 font-heading font-semibold text-sm hover:bg-[#1d95d6] active:scale-[0.98] transition-all cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              Подтвердить в Telegram
            </motion.a>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="text-sx-muted/50 text-xs mt-4"
            >
              После подтверждения мы пришлём детали записи
            </motion.p>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
