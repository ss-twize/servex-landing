"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import dynamic from "next/dynamic";
import Button from "@/components/ui/Button";
import Marquee from "@/components/ui/Marquee";
import PerspectiveGrid from "@/components/ui/PerspectiveGrid";
import { useDemoBooking } from "@/components/ui/DemoBookingContext";

const HeroOrb = dynamic(() => import("@/components/three/HeroOrb"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

/* ── Letter stagger animation ── */
const letterContainer: Variants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: { staggerChildren: 0.02, delayChildren: delay },
  }),
};

const letterChild: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

function StaggerText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.span
      className={`inline-block ${className ?? ""}`}
      variants={letterContainer}
      initial="hidden"
      animate="visible"
      custom={delay}
      aria-label={text}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={letterChild}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : undefined }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ── Fade-up helper ── */
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay },
});

export default function Hero() {
  const { openBooking } = useDemoBooking();
  const sectionRef = useRef<HTMLElement>(null);

  /* Scroll-driven dissolve + parallax */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const headlineOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const headlineY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* ─── Background: perspective grid at parallax speed ─── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <PerspectiveGrid />
      </motion.div>

      {/* ─── Orb: centered behind text ─── */}
      <div
        className="absolute z-[1] pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: "min(40vw, 500px)", height: "min(40vw, 500px)" }}
      >
        {/* Radial glow */}
        <div
          className="absolute inset-0 -inset-x-16 -inset-y-16"
          style={{
            background:
              "radial-gradient(circle 300px, rgba(0,240,144,0.1), transparent)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full"
        >
          <HeroOrb className="w-full h-full pointer-events-auto" />
        </motion.div>
      </div>

      {/* ─── Main content: headline + sub ─── */}
      <motion.div
        style={{ opacity: headlineOpacity, y: headlineY }}
        className="relative z-10 flex-1 flex flex-col justify-center px-4 sm:px-6"
      >
        {/* Top breathing space — pushes content down ~30vh */}
        <div className="h-[20vh] sm:h-[28vh] shrink-0" />

        {/* ── Headline block: grid-breaking, full-width ── */}
        <div className="w-full">
          {/* СЕРВЕКС — left aligned, massive */}
          <div className="text-left">
            <h1>
              <StaggerText
                text="СЕРВЕКС"
                className="font-heading font-extrabold tracking-tight text-sx-accent text-[clamp(4rem,12vw,10rem)] leading-[0.9]"
                delay={0}
              />
            </h1>
          </div>

          {/* цифровой администратор — right aligned */}
          <div className="text-right mt-2 sm:mt-4">
            <StaggerText
              text="цифровой администратор"
              className="font-heading font-bold text-sx-cream text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.05]"
              delay={0.3}
            />
          </div>

          {/* нового поколения — right aligned, slightly lower */}
          <div className="text-right mt-1 sm:mt-2">
            <StaggerText
              text="нового поколения"
              className="font-heading font-bold text-sx-cream text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.05]"
              delay={0.55}
            />
          </div>
        </div>

        {/* ── Subheadline ── */}
        <motion.p
          {...fadeUp(0.8)}
          className="mt-10 sm:mt-14 text-lg md:text-xl text-sx-secondary max-w-2xl mx-auto text-center leading-relaxed"
        >
          Берёт на себя общение с клиентами, запись, переносы и
          отмены&nbsp;&mdash; чтобы бизнес перестал терять выручку на первой
          линии сервиса
        </motion.p>

        {/* ── CTAs ── */}
        <motion.div
          {...fadeUp(0.9)}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <Button size="lg" variant="primary" onClick={openBooking}>
            Записаться на демо
          </Button>
          <Button size="lg" variant="secondary" href="https://t.me/servex_bot">
            Написать в Telegram
          </Button>
        </motion.div>

        {/* ── Trust line ── */}
        <motion.div
          {...fadeUp(1.0)}
          className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-sx-muted"
        >
          {["Запуск от 1 дня", "Прозрачная аналитика", "Работает 24/7"].map(
            (item, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-sx-accent" />
                {item}
              </span>
            )
          )}
        </motion.div>

        {/* Bottom spacer */}
        <div className="h-12 sm:h-20 shrink-0" />
      </motion.div>

      {/* ─── Marquee strip at the very bottom ─── */}
      <div className="relative z-10">
        <Marquee />
      </div>
    </section>
  );
}
