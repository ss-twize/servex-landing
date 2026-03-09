"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const LOGO_ID = "СЕРВЕКС";

const navItems = [
  { name: "Решение",      url: "#solution"  },
  { name: "Тарифы",       url: "#pricing"   },
  { name: "Подключение",  url: "#demo"      },
  { name: "Контакты",     url: "#footer"    },
];

/* Map every section ID (page order) → nav item that should be highlighted */
const sectionToNav: { id: string; nav: string }[] = [
  { id: "problem",     nav: "Решение"     },
  { id: "solution",    nav: "Решение"     },
  { id: "system",      nav: "Решение"     },
  { id: "platform",    nav: "Решение"     },
  { id: "ecosystem",   nav: "Решение"     },
  { id: "integrations",nav: "Решение"     },
  { id: "calculator",  nav: "Решение"     },
  { id: "comparison",  nav: "Решение"     },
  { id: "pricing",     nav: "Тарифы"      },
  { id: "demo",        nav: "Подключение" },
];

function TubelightGlow() {
  return (
    <motion.div
      layoutId="tubelight"
      className="absolute inset-0 w-full bg-sx-accent/5 rounded-full -z-10"
      initial={false}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-sx-accent rounded-t-full">
        <div className="absolute w-12 h-6 bg-sx-accent/20 rounded-full blur-md -top-2 -left-2" />
        <div className="absolute w-8 h-6 bg-sx-accent/20 rounded-full blur-md -top-1" />
        <div className="absolute w-4 h-4 bg-sx-accent/20 rounded-full blur-sm top-0 left-2" />
      </div>
    </motion.div>
  );
}

export default function Header() {
  const [activeTab, setActiveTab] = useState(LOGO_ID);
  const [visible, setVisible] = useState(false);

  /* Detect hero stage for visibility */
  useEffect(() => {
    const check = () => {
      const stage = document.documentElement.getAttribute("data-hero-stage");
      if (stage === "2") setVisible(true);
    };
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-hero-stage"],
    });
    return () => observer.disconnect();
  }, []);

  /* Track scroll position to highlight active section */
  const updateActiveOnScroll = useCallback(() => {
    const offset = 200;
    let found = false;

    for (let i = sectionToNav.length - 1; i >= 0; i--) {
      const el = document.getElementById(sectionToNav[i].id);
      if (el && el.getBoundingClientRect().top <= offset) {
        setActiveTab(sectionToNav[i].nav);
        found = true;
        break;
      }
    }

    if (!found) setActiveTab(LOGO_ID);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", updateActiveOnScroll, { passive: true });
    updateActiveOnScroll();
    return () => window.removeEventListener("scroll", updateActiveOnScroll);
  }, [updateActiveOnScroll]);

  const handleClick = (e: React.MouseEvent, item: (typeof navItems)[0]) => {
    e.preventDefault();
    setActiveTab(item.name);

    if (item.url === "#footer") {
      // Scroll to footer
      const footer = document.querySelector("footer");
      if (footer) footer.scrollIntoView({ behavior: "smooth" });
    } else if (item.url.startsWith("#")) {
      const el = document.querySelector(item.url);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveTab(LOGO_ID);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
          onClick={handleLogoClick}
          className={`relative px-5 py-2 rounded-full font-heading font-bold text-sm tracking-wide transition-colors ${
            activeTab === LOGO_ID
              ? "text-sx-accent"
              : "text-sx-accent/70 hover:text-sx-accent"
          }`}
        >
          СЕРВЕКС
          {activeTab === LOGO_ID && <TubelightGlow />}
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
              {isActive && <TubelightGlow />}
            </Link>
          );
        })}
      </nav>
    </motion.header>
  );
}
