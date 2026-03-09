"use client";
import { motion } from "framer-motion";
import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  href?: string;
  onClick?: () => void;
  className?: string;
  size?: "default" | "lg";
};

export default function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
  size = "default",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-heading font-medium rounded-lg transition-all duration-200 cursor-pointer";
  const sizes = {
    default: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };
  const variants = {
    primary:
      "bg-sx-accent text-sx-deep hover:bg-sx-accent-hover shadow-[0_0_20px_rgba(1,222,130,0.15)] hover:shadow-[0_0_30px_rgba(1,222,130,0.25)]",
    secondary:
      "border border-sx-border text-sx-cream hover:border-sx-accent hover:text-sx-accent",
  };
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  const MotionComp = motion.span;

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("tg:");
    if (isExternal) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cls}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {children}
        </motion.a>
      );
    }
    return (
      <Link href={href}>
        <MotionComp
          className={cls}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {children}
        </MotionComp>
      </Link>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={cls}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}
