"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";
import Button from "@/components/ui/Button";
import PerspectiveGrid from "@/components/ui/PerspectiveGrid";
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
  const sectionRef = useRef<HTMLElement>(null);

  /* Scroll-driven parallax for the background plane */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgTextY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center"
      style={{ overflow: "visible" }}
    >
      {/* ─── Background plane: perspective grid at 0.3× scroll speed ─── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <PerspectiveGrid />
      </motion.div>

      {/* ─── Background watermark text drifting at 0.3× speed ─── */}
      <motion.div
        style={{ y: bgTextY }}
        className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden flex items-center"
        aria-hidden
      >
        <span
          className="font-heading font-black text-[18vw] leading-none tracking-tighter text-sx-cream whitespace-nowrap"
          style={{ opacity: 0.025 }}
        >
          СЕРВЕКС
        </span>
      </motion.div>

      {/* ─── Ambient green glow behind orb ─── */}
      <div
        className="absolute pointer-events-none z-[1]"
        style={{
          right: "-5%",
          bottom: "-10%",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(1,222,130,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* ─── Orb: massive, bleeds out of section boundaries ─── */}
      <div
        className="absolute pointer-events-none z-[2]"
        style={{
          right: "-5%",
          bottom: "-10%",
          width: "80vh",
          height: "80vh",
        }}
      >
        <HeroOrb className="w-full h-full pointer-events-auto" />
      </div>

      {/* ─── Content layer ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-28 pb-24 md:pt-32 md:pb-32">
        <div className="max-w-2xl">
          {/* Brand name — full accent green */}
          <motion.div
            {...fadeUp(0.1)}
            className="font-heading text-5xl sm:text-7xl font-black leading-none tracking-tight text-sx-accent mb-3"
          >
            СЕРВЕКС
          </motion.div>

          {/* Divider line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="origin-left h-px bg-sx-accent/40 w-full max-w-md mb-5"
          />

          {/* Main headline — cream */}
          <motion.h1
            {...fadeUp(0.25)}
            className="font-heading text-4xl sm:text-6xl font-bold leading-[1.08] tracking-tight text-sx-cream"
          >
            цифровой администратор
            <br />
            нового поколения
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            {...fadeUp(0.4)}
            className="mt-6 text-base sm:text-lg text-sx-muted leading-relaxed max-w-xl"
          >
            Берёт на себя общение с клиентами, запись, переносы и отмены&nbsp;&mdash;
            чтобы бизнес перестал терять выручку на первой линии сервиса
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.55)}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Button size="lg" variant="primary" onClick={openBooking}>
              Записаться на демо
            </Button>
            <Button size="lg" variant="secondary" href="https://t.me/servex_bot">
              Написать в Telegram
            </Button>
          </motion.div>

          {/* Trust line */}
          <motion.div
            {...fadeUp(0.7)}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-sx-muted"
          >
            {["Запуск от 1 дня", "Прозрачная аналитика", "Работает 24/7"].map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="inline-block w-1 h-1 rounded-full bg-sx-accent" />
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
