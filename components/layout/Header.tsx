"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const navItems = [
  { name: "Продукт", url: "#solution" },
  { name: "Тарифы", url: "#pricing" },
  { name: "Запуск", url: "#launch" },
  { name: "Вопросы", url: "#faq" },
  { name: "Контакты", url: "/contacts" },
];

export default function Header() {
  const [activeTab, setActiveTab] = useState(navItems[0].name);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Watch for hero intro animation to finish (stage 2)
    const check = () => {
      const stage = document.documentElement.getAttribute("data-hero-stage");
      if (stage === "2") {
        setVisible(true);
      }
    };
    // Check immediately and observe changes
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-hero-stage"],
    });
    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent, item: (typeof navItems)[0]) => {
    setActiveTab(item.name);
    if (item.url.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(item.url);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 pt-4 flex justify-center"
      initial={{ opacity: 0, y: -20 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className="flex items-center gap-1 bg-sx-deep/60 border border-sx-border/50 backdrop-blur-xl py-1.5 px-1.5 rounded-full shadow-lg">
        {/* Logo */}
        <Link
          href="/"
          className="px-5 py-2 font-heading font-bold text-sm text-sx-accent tracking-wide"
        >
          СЕРВЕКС
        </Link>

        {/* Nav items */}
        {navItems.map((item) => {
          const isActive = activeTab === item.name;
          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={(e) => handleClick(e, item)}
              className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                isActive
                  ? "text-sx-accent"
                  : "text-sx-secondary hover:text-sx-cream"
              }`}
            >
              {item.name}
              {isActive && (
                <motion.div
                  layoutId="tubelight"
                  className="absolute inset-0 w-full bg-sx-accent/5 rounded-full -z-10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {/* Tubelight glow effect */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-sx-accent rounded-t-full">
                    <div className="absolute w-12 h-6 bg-sx-accent/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-sx-accent/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-sx-accent/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          );
        })}
      </nav>
    </motion.header>
  );
}
