"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Button from "@/components/ui/Button";
import Marquee from "@/components/ui/Marquee";
import { useDemoBooking } from "@/components/ui/DemoBookingContext";

const HeroOrb = dynamic(() => import("@/components/three/HeroOrb"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

export default function Hero() {
  const { openBooking } = useDemoBooking();
  const [stage, setStage] = useState(0); // 0=orb centered large, 1=orb moving right, 2=text appears

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 1500);
    const t2 = setTimeout(() => setStage(2), 2500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Main content area — vertically centered */}
      <div className="flex-1 flex items-center justify-center w-full px-6">
        <div className="w-[85%] max-w-[1400px] flex items-center justify-between relative">
          {/* TEXT — left side */}
          <motion.div
            className="relative z-10 max-w-[55%]"
            initial={{ opacity: 0, x: -60 }}
            animate={
              stage >= 2
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: -60 }
            }
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Brand name */}
            <motion.h1
              className="font-heading text-5xl md:text-6xl lg:text-7xl font-extrabold text-sx-accent leading-none tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={stage >= 2 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              СЕРВЕКС
            </motion.h1>

            {/* Subheading */}
            <motion.p
              className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-sx-cream mt-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={stage >= 2 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              цифровой администратор
              <br />
              нового поколения
            </motion.p>

            {/* Description */}
            <motion.p
              className="text-base md:text-lg text-sx-secondary mt-6 max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={stage >= 2 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Берёт на себя общение с клиентами, запись, переносы и
              отмены&nbsp;&mdash; чтобы бизнес перестал терять выручку на первой
              линии сервиса
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="mt-8 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={stage >= 2 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Button size="lg" variant="primary" onClick={openBooking}>
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
              className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-sx-muted"
              initial={{ opacity: 0 }}
              animate={stage >= 2 ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              {[
                "Запуск за 1 день",
                "Прозрачная аналитика",
                "Работает 24/7",
              ].map((item, i) => (
                <span key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sx-accent" />
                  {item}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* ORB — right side, animated from center-large to right-normal */}
          <motion.div
            className="relative z-0"
            style={{ width: "clamp(300px, 35vw, 500px)", height: "clamp(300px, 35vw, 500px)" }}
            initial={{ scale: 1.8, x: "-30vw", y: 0, opacity: 1 }}
            animate={
              stage >= 1
                ? { scale: 1, x: 0, y: 0 }
                : { scale: 1.8, x: "-30vw", y: 0 }
            }
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Green ambient glow */}
            <div className="absolute inset-0 -m-12 bg-[radial-gradient(circle,rgba(0,240,144,0.1),transparent_70%)] blur-2xl" />
            <HeroOrb className="w-full h-full" />
          </motion.div>
        </div>
      </div>

      {/* Marquee at bottom */}
      <Marquee />
    </section>
  );
}
