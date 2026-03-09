"use client";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const businessTypes = [
  {
    name: "Салоны красоты",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="3" />
        <path d="M6 3v18" />
        <path d="M20 6c0 6-6 4-6 10" />
        <circle cx="14" cy="19" r="2" />
      </svg>
    ),
  },
  {
    name: "Барбершопы",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2" />
        <path d="M6 8h12" />
        <path d="M10 18v4" />
        <path d="M14 18v4" />
      </svg>
    ),
  },
  {
    name: "СПА-центры",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2c.5 3.5-1.5 6-3 8.5C7.5 13 6 15.5 6 18a6 6 0 0 0 12 0c0-2.5-1.5-5-3-7.5C13.5 8 11.5 5.5 12 2Z" />
      </svg>
    ),
  },
  {
    name: "Массажные салоны",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
        <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" />
        <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" />
        <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
      </svg>
    ),
  },
  {
    name: "Стоматологии",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5.5c-1.5-2-4-2.5-5.5-1S4 7.5 5.5 10c1 1.5 2 3 2.5 5.5s1 5 2 5 1.5-2.5 2-5 1.5-4 2.5-5.5c1.5-2.5 1-4.5-.5-5.5s-4-1-5.5 1Z" />
      </svg>
    ),
  },
  {
    name: "Психологические центры",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7Z" />
        <path d="M9 21h6" />
        <path d="M10 21v1a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-1" />
        <path d="M12 7v4" />
        <path d="M10 9h4" />
      </svg>
    ),
  },
  {
    name: "Другие сервисные бизнесы",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <path d="M12 12h.01" />
      </svg>
    ),
  },
];

const situations = [
  "Много входящих обращений, не все обрабатываются вовремя",
  "Администраторы работают нестабильно",
  "Вечерние и ночные заявки остаются без ответа",
  "Бизнес масштабируется на несколько локаций",
  "Нет прозрачности в работе первой линии",
];

export default function ForWhom() {
  return (
    <SectionWrapper id="for-whom">
      <AnimateOnScroll>
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-sx-cream text-center">
          Подходит ли это моему бизнесу?
        </h2>
      </AnimateOnScroll>

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Part 1: Business types */}
        <div>
          <AnimateOnScroll delay={0.1}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {businessTypes.map((b, i) => (
                <AnimateOnScroll key={b.name} delay={0.1 + 0.06 * i}>
                  <div className="group bg-sx-card border border-sx-border rounded-xl p-4 flex items-center gap-3 transition-all duration-300 hover:border-sx-accent/40 hover:shadow-[0_0_20px_-6px_rgba(1,222,130,0.12)]">
                    <span className="text-sx-accent shrink-0">{b.icon}</span>
                    <span className="text-sx-cream text-sm font-medium leading-tight">
                      {b.name}
                    </span>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </AnimateOnScroll>
        </div>

        {/* Part 2: Situations */}
        <div>
          <AnimateOnScroll delay={0.2}>
            <h3 className="font-heading text-xl md:text-2xl font-semibold text-sx-cream mb-6">
              Особенно полезно, когда:
            </h3>
          </AnimateOnScroll>
          <ul className="space-y-4">
            {situations.map((s, i) => (
              <AnimateOnScroll key={i} delay={0.25 + 0.08 * i}>
                <li className="flex items-start gap-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-sx-accent shrink-0 mt-0.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-sx-muted text-base leading-relaxed">
                    {s}
                  </span>
                </li>
              </AnimateOnScroll>
            ))}
          </ul>
        </div>
      </div>
    </SectionWrapper>
  );
}
