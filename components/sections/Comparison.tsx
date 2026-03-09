"use client";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

type RowValue = "yes" | "no" | "partial";

const rows: { criterion: string; admin: RowValue; chatbot: RowValue; servex: RowValue }[] = [
  { criterion: "Работает 24/7", admin: "no", chatbot: "yes", servex: "yes" },
  { criterion: "Понимает клиента", admin: "yes", chatbot: "no", servex: "yes" },
  { criterion: "Не болеет и не устаёт", admin: "no", chatbot: "yes", servex: "yes" },
  { criterion: "Интеграции с CRM", admin: "no", chatbot: "no", servex: "yes" },
  { criterion: "Аналитика", admin: "no", chatbot: "no", servex: "yes" },
  { criterion: "Дешевле 25 000 ₽/мес", admin: "no", chatbot: "partial", servex: "yes" },
];

function Cell({ value }: { value: RowValue }) {
  if (value === "yes") return <span className="text-sx-accent text-lg">✓</span>;
  if (value === "no") return <span className="text-sx-hot text-lg">✗</span>;
  return <span className="text-sx-muted text-lg">—</span>;
}

export default function Comparison() {
  return (
    <section id="comparison" className="py-24 md:py-32 px-6">
      <div className="section-container">
        <AnimateOnScroll>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-sx-cream text-center">
            СЕРВЕКС vs администратор vs чат-бот
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.2}>
          <div className="overflow-x-auto mt-12">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left p-4 text-sx-muted text-sm font-normal w-[40%]">Критерий</th>
                  <th className="p-4 text-sx-secondary text-sm font-heading text-center">Администратор</th>
                  <th className="p-4 text-sx-secondary text-sm font-heading text-center">Чат-бот</th>
                  <th className="p-4 text-sx-accent text-sm font-heading text-center rounded-t-xl bg-sx-accent/5 border-x border-t border-sx-accent/20">СЕРВЕКС</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sx-border/30">
                {rows.map((row, i) => {
                  const isLast = i === rows.length - 1;
                  return (
                    <tr key={row.criterion}>
                      <td className="p-4 text-sm text-sx-cream font-medium">{row.criterion}</td>
                      <td className="p-4 text-center"><Cell value={row.admin} /></td>
                      <td className="p-4 text-center"><Cell value={row.chatbot} /></td>
                      <td
                        className={`p-4 text-center bg-sx-accent/5 border-x border-sx-accent/20${isLast ? " border-b rounded-b-xl border-sx-accent/20" : ""}`}
                      >
                        <Cell value={row.servex} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
