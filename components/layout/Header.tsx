"use client";
import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import MobileMenu from "./MobileMenu";

const navItems = [
  { label: "Продукт", href: "#solution" },
  { label: "Калькулятор", href: "#calculator" },
  { label: "Возможности", href: "#features" },
  { label: "Тарифы", href: "#pricing" },
  { label: "Контакты", href: "#contacts" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-sx-deep/90 backdrop-blur-lg border-b border-sx-border/50 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="font-heading text-xl font-bold text-sx-cream tracking-tight flex items-center gap-1"
          >
            СЕРВЕКС
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-sx-accent" />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="font-body text-sm text-sx-muted hover:text-sx-cream transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button href="#contacts" size="default">
              Записаться на демо
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-sx-cream hover:text-sx-accent transition-colors"
            onClick={() => setMenuOpen(true)}
            aria-label="Открыть меню"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
