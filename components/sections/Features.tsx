"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const features = [
  {
    number: "01",
    title: "Обработка обращений",
    description:
      "Автоматический приём и маршрутизация входящих сообщений из всех каналов",
  },
  {
    number: "02",
    title: "Логика записи",
    description:
      "Проверка доступности, подбор времени, подтверждение — без участия человека",
  },
  {
    number: "03",
    title: "Переносы и отмены",
    description: "Гибкая обработка изменений без потери клиента",
  },
  {
    number: "04",
    title: "Аналитика и отчёты",
    description:
      "Конверсии, загрузка, время ответа — всё в реальном времени",
  },
  {
    number: "05",
    title: "Контроль качества",
    description: "Внутренние системы мониторинга и оценки работы",
  },
  {
    number: "06",
    title: "Настраиваемые сценарии",
    description:
      "Адаптация логики общения под специфику вашего бизнеса",
  },
];

function FeatureItem({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative py-8"
    >
      <div className="flex items-start gap-5">
        {/* Ghost number */}
        <span className="text-5xl md:text-6xl font-heading font-extrabold text-sx-accent/15 group-hover:text-sx-accent/40 transition-colors duration-500 leading-none shrink-0 select-none">
          {feature.number}
        </span>

        <div className="flex-1 min-w-0 pt-2">
          {/* Line + title */}
          <div className="flex items-center gap-4 mb-2">
            <div className="h-px bg-sx-border flex-1 max-w-[40px] group-hover:bg-sx-accent/40 transition-colors duration-500" />
            <h3 className="text-xl md:text-2xl font-heading font-bold text-sx-cream">
              {feature.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-base text-sx-secondary mt-2 ml-[56px]">
            {feature.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Features() {
  const leftColumn = features.slice(0, 3);
  const rightColumn = features.slice(3, 6);

  return (
    <SectionWrapper id="features">
      <AnimateOnScroll>
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-sx-cream">
          Возможности
        </h2>
      </AnimateOnScroll>

      {/* Desktop: two columns */}
      <div className="hidden lg:grid grid-cols-2 gap-x-16 mt-12">
        <div>
          {leftColumn.map((f, i) => (
            <FeatureItem key={f.number} feature={f} index={i} />
          ))}
        </div>
        <div>
          {rightColumn.map((f, i) => (
            <FeatureItem key={f.number} feature={f} index={i + 3} />
          ))}
        </div>
      </div>

      {/* Mobile: single column */}
      <div className="lg:hidden mt-8">
        {features.map((f, i) => (
          <FeatureItem key={f.number} feature={f} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
