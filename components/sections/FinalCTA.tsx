"use client";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import ParallaxLayer from "@/components/ui/ParallaxLayer";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { useDemoBooking } from "@/components/ui/DemoBookingContext";

export default function FinalCTA() {
  const { openBooking } = useDemoBooking();

  return (
    <>
      {/* Decorative top line */}
      <div className="h-px w-full bg-sx-accent/30" />

      <section
        id="demo"
        className="relative py-28 md:py-40 px-6 overflow-hidden"
      >
        {/* Radial green glow at center */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(1,222,130,0.07), transparent)",
          }}
        />

        {/* Background watermark — slowly drifting via ParallaxLayer */}
        <div
          className="absolute inset-0 pointer-events-none select-none overflow-hidden flex items-center justify-center"
          aria-hidden
        >
          <ParallaxLayer speed={0.15} className="w-full flex items-center justify-center">
            <span
              className="font-heading font-black leading-none tracking-tighter text-sx-cream whitespace-nowrap"
              style={{ fontSize: "20vw", opacity: 0.06 }}
            >
              СЕРВЕКС
            </span>
          </ParallaxLayer>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <AnimateOnScroll>
            <h2 className="font-heading text-4xl md:text-6xl font-black text-sx-cream leading-tight tracking-tight">
              Перестаньте терять клиентов на первой линии
            </h2>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.1}>
            <p className="font-heading text-3xl md:text-5xl font-black text-sx-accent mt-4 leading-tight tracking-tight">
              Демо — бесплатно
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.2}>
            <p className="mt-6 text-sx-muted text-lg leading-relaxed">
              Покажем, как СЕРВЕКС работает с вашим бизнесом
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.3}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" onClick={openBooking}>
                Записаться на демо
              </Button>
              <Button variant="secondary" size="lg" href="https://t.me/servex_bot">
                Написать в Telegram
              </Button>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.4}>
            <p className="mt-10 text-sx-muted text-sm">
              Запуск от 1 дня · Без скрытых платежей · Бесплатная демонстрация
            </p>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
