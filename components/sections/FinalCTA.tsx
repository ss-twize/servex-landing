"use client";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import Button from "@/components/ui/Button";

export default function FinalCTA() {
  return (
    <section
      id="demo"
      className="relative py-24 md:py-32 px-6 overflow-hidden"
    >
      {/* Subtle radial green glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sx-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        <AnimateOnScroll>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-sx-cream">
            Перестаньте терять клиентов на первой линии
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1}>
          <p className="mt-6 text-sx-muted text-lg">
            Запишитесь на демо — покажем, как СЕРВЕКС работает с вашим бизнесом
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.2}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" href="#demo">
              Записаться на демо
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="https://t.me/servex_bot"
            >
              Написать в Telegram
            </Button>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.3}>
          <p className="mt-10 text-sx-muted text-sm">
            Запуск от 1 дня &middot; Без скрытых платежей &middot; Бесплатная
            демонстрация
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
