import Link from "next/link";

const productLinks = [
  { label: "Возможности", href: "#features" },
  { label: "Тарифы", href: "#pricing" },
  { label: "Калькулятор", href: "#calculator" },
];

const companyLinks = [
  { label: "Контакты", href: "/contacts" },
  { label: "О нас", href: "#solution" },
];

const docsLinks = [
  { label: "Политика конфиденциальности", href: "/privacy" },
  { label: "Оферта", href: "/offer" },
];

export default function Footer() {
  return (
    <footer className="bg-sx-card border-t border-sx-border/50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="font-heading text-xl font-bold text-sx-cream tracking-tight flex items-center gap-1 mb-4">
              СЕРВЕКС
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-sx-accent" />
            </div>
            <p className="font-body text-sm text-sx-muted max-w-xs leading-relaxed">
              Цифровой администратор для сервисного бизнеса. Берёт на себя
              общение с клиентами, запись и управление.
            </p>
            {/* Telegram */}
            <a
              href="https://t.me/servex"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-sm text-sx-muted hover:text-sx-accent transition-colors font-body"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
              Телеграм
            </a>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-sx-cream mb-4">
              Продукт
            </h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-sx-muted hover:text-sx-cream transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-sx-cream mb-4">
              Компания
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-sx-muted hover:text-sx-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Docs */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-sx-cream mb-4">
              Документы
            </h4>
            <ul className="space-y-3">
              {docsLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-sx-muted hover:text-sx-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-sx-border/30">
          <p className="font-body text-xs text-sx-muted text-center">
            &copy; 2026 СЕРВЕКС. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
