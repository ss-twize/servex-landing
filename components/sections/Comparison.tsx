"use client";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="10" fill="rgba(1,222,130,0.15)" />
    <path d="M6 10.5l2.5 2.5 5.5-5.5" stroke="#01DE82" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const NeutralIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="10" fill="rgba(122,138,138,0.2)" />
    <path d="M6 10h8" stroke="#7A8A8A" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const CrossIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="10" fill="rgba(255,80,80,0.15)" />
    <path d="M7 7l6 6M13 7l-6 6" stroke="#FF5050" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

type RowIndicator = "good" | "neutral" | "bad";

interface ComparisonRow {
  criterion: string;
  chatbot: { text: string; type: RowIndicator };
  admin: { text: string; type: RowIndicator };
  servex: { text: string; type: RowIndicator };
}

const rows: ComparisonRow[] = [
  {
    criterion: "Скорость ответа",
    chatbot: { text: "Мгновенно, но шаблонно", type: "bad" },
    admin: { text: "Зависит от загрузки", type: "neutral" },
    servex: { text: "Мгновенно и осмысленно", type: "good" },
  },
  {
    criterion: "Доступность",
    chatbot: { text: "24/7", type: "neutral" },
    admin: { text: "Только в смену", type: "bad" },
    servex: { text: "24/7", type: "good" },
  },
  {
    criterion: "Стабильность качества",
    chatbot: { text: "Одинаково плохо", type: "bad" },
    admin: { text: "Зависит от настроения", type: "neutral" },
    servex: { text: "Одинаково хорошо", type: "good" },
  },
  {
    criterion: "Запись / перенос / отмена",
    chatbot: { text: "Не умеет", type: "bad" },
    admin: { text: "Умеет, но с ошибками", type: "neutral" },
    servex: { text: "Полный цикл", type: "good" },
  },
  {
    criterion: "Аналитика",
    chatbot: { text: "Нет", type: "bad" },
    admin: { text: "Нет", type: "bad" },
    servex: { text: "Встроенная", type: "good" },
  },
  {
    criterion: "Стоимость",
    chatbot: { text: "Дёшево", type: "neutral" },
    admin: { text: "Дорого (зарплата)", type: "bad" },
    servex: { text: "Предсказуемо", type: "good" },
  },
  {
    criterion: "Масштабируемость",
    chatbot: { text: "Ограничена", type: "bad" },
    admin: { text: "Не масштабируется", type: "bad" },
    servex: { text: "Без ограничений", type: "good" },
  },
];

const columns = ["Обычный чат-бот", "Администратор", "СЕРВЕКС"] as const;

function Indicator({ type }: { type: RowIndicator }) {
  if (type === "good") return <CheckIcon />;
  if (type === "neutral") return <NeutralIcon />;
  return <CrossIcon />;
}

function CellValue({ text, type }: { text: string; type: RowIndicator }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 shrink-0">
        <Indicator type={type} />
      </span>
      <span
        className={
          type === "good"
            ? "text-sx-cream"
            : type === "neutral"
            ? "text-sx-muted"
            : "text-sx-muted/70"
        }
      >
        {text}
      </span>
    </div>
  );
}

export default function Comparison() {
  return (
    <SectionWrapper id="comparison">
      <AnimateOnScroll>
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-sx-cream text-center">
          Почему это не обычный чат-бот
        </h2>
      </AnimateOnScroll>
      <AnimateOnScroll delay={0.1}>
        <p className="text-sx-muted text-lg md:text-xl text-center mt-4 max-w-2xl mx-auto">
          СЕРВЕКС — это полноценная система обслуживания, а&nbsp;не&nbsp;автоответчик
        </p>
      </AnimateOnScroll>

      {/* Desktop table */}
      <AnimateOnScroll delay={0.2}>
        <div className="hidden lg:block mt-16 bg-sx-card border border-sx-border rounded-2xl overflow-hidden">
          {/* Header row */}
          <div className="grid grid-cols-4 border-b border-sx-border">
            <div className="p-5 font-heading font-semibold text-sx-muted text-sm uppercase tracking-wider">
              Критерий
            </div>
            {columns.map((col, i) => (
              <div
                key={col}
                className={`p-5 font-heading font-semibold text-sm uppercase tracking-wider ${
                  i === 2
                    ? "text-sx-accent bg-sx-accent/[0.04]"
                    : "text-sx-muted"
                }`}
              >
                {col}
              </div>
            ))}
          </div>

          {/* Data rows */}
          {rows.map((row, idx) => (
            <div
              key={row.criterion}
              className={`grid grid-cols-4 ${
                idx < rows.length - 1 ? "border-b border-sx-border/50" : ""
              } transition-colors hover:bg-sx-accent/[0.02]`}
            >
              <div className="p-5 font-heading text-sx-cream font-medium text-sm">
                {row.criterion}
              </div>
              <div className="p-5 text-sm">
                <CellValue {...row.chatbot} />
              </div>
              <div className="p-5 text-sm">
                <CellValue {...row.admin} />
              </div>
              <div className="p-5 text-sm bg-sx-accent/[0.04] border-l border-r border-sx-accent/10 shadow-[inset_0_0_30px_rgba(1,222,130,0.03)]">
                <CellValue {...row.servex} />
              </div>
            </div>
          ))}
        </div>
      </AnimateOnScroll>

      {/* Mobile cards */}
      <div className="lg:hidden mt-12 space-y-4">
        {rows.map((row, idx) => (
          <AnimateOnScroll key={row.criterion} delay={0.15 + idx * 0.05}>
            <div className="bg-sx-card border border-sx-border rounded-xl p-5">
              <h4 className="font-heading text-sx-cream font-semibold text-sm mb-4">
                {row.criterion}
              </h4>
              <div className="space-y-3">
                <div>
                  <span className="text-sx-muted/60 text-xs uppercase tracking-wider">
                    {columns[0]}
                  </span>
                  <div className="mt-1 text-sm">
                    <CellValue {...row.chatbot} />
                  </div>
                </div>
                <div>
                  <span className="text-sx-muted/60 text-xs uppercase tracking-wider">
                    {columns[1]}
                  </span>
                  <div className="mt-1 text-sm">
                    <CellValue {...row.admin} />
                  </div>
                </div>
                <div className="bg-sx-accent/[0.05] -mx-5 px-5 py-3 border-t border-sx-accent/10 rounded-b-xl mt-3">
                  <span className="text-sx-accent text-xs uppercase tracking-wider font-semibold">
                    {columns[2]}
                  </span>
                  <div className="mt-1 text-sm">
                    <CellValue {...row.servex} />
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </SectionWrapper>
  );
}
