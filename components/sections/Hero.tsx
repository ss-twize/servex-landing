"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Button from "@/components/ui/Button";
import Marquee from "@/components/ui/Marquee";
import { useDemoBooking } from "@/components/ui/DemoBookingContext";

const HeroOrb = dynamic(() => import("@/components/three/HeroOrb"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

/*
  Animation stages:
  0 — Big orb centered on full-screen black overlay. Nothing else visible.       (0–2.0s)
  1 — Overlay fades out, orb shrinks+fades with it.                              (2.0–2.8s)
  2 — Layout orb appears in final position (right), text slides in, header shows. (2.8s+)
*/

export default function Hero() {
  const { openBooking } = useDemoBooking();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 2000);
    const t2 = setTimeout(() => setStage(2), 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Signal header
  useEffect(() => {
    document.documentElement.setAttribute("data-hero-stage", String(stage));
  }, [stage]);

  return (
    <section className="relative min-h-screen flex flex-col">

      {/* ── Full-screen overlay (stages 0–1) ── */}
      <AnimatePresence>
        {stage < 2 && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-sx-deep"
            initial={{ opacity: 1 }}
            animate={stage === 1 ? { opacity: 0 } : { opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <motion.div
              style={{ overflow: "visible" }}
              initial={{ width: "min(80vw, 80vh)", height: "min(80vw, 80vh)", scale: 1 }}
              animate={
                stage === 1
                  ? { scale: 0.6, width: "min(80vw, 80vh)", height: "min(80vw, 80vh)" }
                  : { scale: 1,   width: "min(80vw, 80vh)", height: "min(80vw, 80vh)" }
              }
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="absolute inset-0 -m-16 bg-[radial-gradient(circle,rgba(0,240,144,0.14),transparent_70%)] blur-3xl pointer-events-none" />
              <HeroOrb className="w-full h-full" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Final hero layout (stage 2) ── */}
      <div className="flex-1 flex items-center justify-center w-full px-6">
        <div className="w-[85%] max-w-[1400px] flex items-center justify-between relative">

          {/* TEXT — left */}
          <motion.div
            className="relative z-10 max-w-[55%]"
            initial={{ opacity: 0, x: -40 }}
            animate={stage >= 2 ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h1
              className="font-heading text-5xl md:text-6xl lg:text-7xl font-extrabold text-sx-accent leading-none tracking-tight"
              initial={{ opacity: 0, y: 24 }}
              animate={stage >= 2 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              СЕРВЕКС
            </motion.h1>

            <motion.p
              className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-sx-cream mt-4 leading-tight"
              initial={{ opacity: 0, y: 24 }}
              animate={stage >= 2 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              цифровой администратор
              <br />
              нового поколения
            </motion.p>

            <motion.p
              className="text-base md:text-lg text-sx-secondary mt-6 max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 24 }}
              animate={stage >= 2 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              Берёт на себя общение с клиентами, запись, переносы и
              отмены&nbsp;&mdash; чтобы бизнес перестал терять выручку на первой
              линии сервиса
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 24 }}
              animate={stage >= 2 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
            >
              <Button size="lg" variant="primary" onClick={openBooking}>
                Записаться на демо
              </Button>
              <Button size="lg" variant="secondary" href="https://t.me/servex_bot">
                Написать в Telegram
              </Button>
            </motion.div>

            <motion.div
              className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-sx-muted"
              initial={{ opacity: 0 }}
              animate={stage >= 2 ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.58 }}
            >
              {["Запуск за 1 день", "Прозрачная аналитика", "Работает 24/7"].map(
                (item) => (
                  <span key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sx-accent" />
                    {item}
                  </span>
                )
              )}
            </motion.div>
          </motion.div>

          {/* ORB — right (appears after overlay is gone) */}
          <motion.div
            className="relative z-0"
            style={{
              width: "clamp(300px, 35vw, 500px)",
              height: "clamp(300px, 35vw, 500px)",
              overflow: "visible",
            }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={stage >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-0 -m-12 bg-[radial-gradient(circle,rgba(0,240,144,0.1),transparent_70%)] blur-2xl" />
            <HeroOrb className="w-full h-full" />
          </motion.div>
        </div>
      </div>

      {/* Marquee at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={stage >= 2 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <Marquee />
      </motion.div>
    </section>
  );
}
