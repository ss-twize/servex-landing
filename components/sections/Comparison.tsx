"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const rows = [
  {
    criterion: "Скорость ответа",
    chatbot: "Мгновенно, но шаблонно",
    admin: "Зависит от загрузки",
    servex: "Мгновенно и осмысленно",
  },
  {
    criterion: "Доступность",
    chatbot: "24/7",
    admin: "Только в смену",
    servex: "24/7",
  },
  {
    criterion: "Стабильность качества",
    chatbot: "Одинаково плохо",
    admin: "Зависит от настроения",
    servex: "Одинаково хорошо",
  },
  {
    criterion: "Запись / перенос / отмена",
    chatbot: "Не умеет",
    admin: "Умеет, но с ошибками",
    servex: "Полный цикл",
  },
  {
    criterion: "Аналитика",
    chatbot: "Нет",
    admin: "Нет",
    servex: "Встроенная",
  },
  {
    criterion: "Стоимость",
    chatbot: "Дёшево",
    admin: "Дорого (зарплата)",
    servex: "Предсказуемо",
  },
  {
    criterion: "Масштабируемость",
    chatbot: "Ограничена",
    admin: "Не масштабируется",
    servex: "Без ограничений",
  },
];

export default function Comparison() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      id="comparison"
      className="py-24 md:py-32 px-6"
    >
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl md:text-5xl font-heading font-bold text-sx-cream text-center"
        >
          Почему это лучше живого администратора
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 md:mt-16 overflow-x-auto rounded-2xl border border-sx-border bg-sx-card"
        >
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="bg-sx-surface">
                <th className="px-5 py-4 text-sm font-heading font-bold text-sx-cream">
                  Критерий
                </th>
                <th className="px-5 py-4 text-sm font-heading font-bold text-sx-cream">
                  Чат-бот
                </th>
                <th className="px-5 py-4 text-sm font-heading font-bold text-sx-cream">
                  Администратор
                </th>
                <th className="px-5 py-4 text-sm font-heading font-bold text-sx-cream bg-sx-accent/10">
                  СЕРВЕКС
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.criterion}
                  className="border-t border-sx-border"
                >
                  <td className="px-5 py-4 text-sm text-sx-cream font-medium">
                    {row.criterion}
                  </td>
                  <td className="px-5 py-4 text-sm text-sx-muted">
                    {row.chatbot}
                  </td>
                  <td className="px-5 py-4 text-sm text-sx-muted">
                    {row.admin}
                  </td>
                  <td className="px-5 py-4 text-sm text-sx-accent font-medium bg-sx-accent/5">
                    {row.servex}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
