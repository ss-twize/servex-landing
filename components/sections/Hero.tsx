"use client";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Button from "@/components/ui/Button";
import { useDemoBooking } from "@/components/ui/DemoBookingContext";

/* Lazy-load the 3D orb so it doesn't block initial paint */
const HeroOrb = dynamic(() => import("@/components/three/HeroOrb"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay },
});

export default function Hero() {
  const { openBooking } = useDemoBooking();
  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* ─── Orb background layer ─── */}
      <div
        className="
          absolute inset-0 z-0
          flex items-center justify-center
          md:justify-end md:pr-[5%]
          pointer-events-none
        "
      >
        <HeroOrb
          className="
            w-[90vw] h-[90vw]
            max-w-[700px] max-h-[700px]
            md:w-[50vw] md:h-[50vw]
            opacity-40 md:opacity-100
            pointer-events-auto
          "
        />
      </div>

      {/* Subtle radial gradient overlay for depth */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 75% 50%, rgba(1,222,130,0.04) 0%, transparent 70%)",
        }}
      />

      {/* ─── Content layer ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-24 pb-16 md:pt-0">
        <div className="max-w-2xl">
          {/* Headline */}
          <motion.h1
            {...fadeUp(0.1)}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight"
          >
            <span className="text-sx-cream">СЕРВЕКС</span>
            <span className="text-sx-accent">&nbsp;&mdash;&nbsp;</span>
            <br className="hidden sm:block" />
            <span className="text-sx-cream">
              цифровой администратор{" "}
            </span>
            <span className="text-sx-accent">нового поколения</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            {...fadeUp(0.3)}
            className="mt-6 text-base sm:text-lg text-sx-muted leading-relaxed max-w-xl"
          >
            Берёт на себя общение с клиентами, запись, переносы и отмены&nbsp;&mdash;
            чтобы бизнес перестал терять выручку на первой линии сервиса
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.5)}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Button
              size="lg"
              variant="primary"
              onClick={openBooking}
            >
              Записаться на демо
            </Button>
            <Button
              size="lg"
              variant="secondary"
              href="https://t.me/servex_bot"
            >
              Написать в Telegram
            </Button>
          </motion.div>

          {/* Trust line */}
          <motion.div
            {...fadeUp(0.7)}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-sx-muted"
          >
            {[
              "Запуск от 1 дня",
              "Прозрачная аналитика",
              "Работает 24/7",
            ].map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="inline-block w-1 h-1 rounded-full bg-sx-accent" />
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade for section transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sx-deep to-transparent z-[2] pointer-events-none" />
    </section>
  );
}
