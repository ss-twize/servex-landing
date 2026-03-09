"use client";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const integrations = [
  "Telegram",
  "WhatsApp",
  "YCLIENTS",
  "Altegio",
  "Битрикс24",
  "amoCRM",
  "1С",
  "Google Calendar",
  "API",
];

export default function Integrations() {
  return (
    <section id="integrations" className="py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll>
          <p className="text-xs tracking-[0.3em] text-sx-muted uppercase mb-12">
            ИНТЕГРАЦИИ
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {integrations.map((name, i) => (
            <AnimateOnScroll key={name} delay={0.03 * i}>
              <div className="bg-sx-card border border-sx-border rounded-xl px-6 py-4 text-sx-secondary font-heading font-medium text-lg transition-all duration-300 hover:border-sx-accent/50 hover:text-sx-cream cursor-default">
                {name}
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
