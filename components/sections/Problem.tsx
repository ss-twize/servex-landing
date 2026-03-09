"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const painPoints = [
  { stat: "30%", lines: ["заявок теряется", "вечером и ночью"] },
  { stat: "73%", lines: ["клиентов не ждут", "ответа дольше 5 минут"] },
  { stat: "×3", lines: ["стоимость ошибки", "администратора за месяц"] },
  { stat: "0₽", lines: ["аналитики по", "потерянным обращениям"] },
];

function PainCard({
  item,
  index,
}: {
  item: (typeof painPoints)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group bg-sx-card border border-sx-border rounded-2xl p-8 md:p-12 cursor-default"
    >
      <div
        className="font-heading font-extrabold text-sx-hot leading-none group-hover:animate-[shake_0.3s_ease-in-out]"
        style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
      >
        {item.stat}
      </div>
      <div className="mt-4 space-y-0.5">
        {item.lines.map((line) => (
          <p key={line} className="text-sx-secondary text-lg leading-snug">
            {line}
          </p>
        ))}
      </div>
    </motion.div>
  );
}

export default function Problem() {
  return (
    <section id="problem" className="py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-3xl md:text-5xl font-bold text-sx-cream"
        >
          Ваш бизнес теряет деньги прямо сейчас
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mt-12">
          {painPoints.map((item, i) => (
            <PainCard key={item.stat} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
