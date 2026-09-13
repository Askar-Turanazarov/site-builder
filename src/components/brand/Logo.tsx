/**
 * Знак и логотип SiteGo.
 *
 * Один источник на весь продукт: шапка портала, подвал, сайдбар админки,
 * экран входа. Раньше плитка с литерой «S» была скопирована в четыре места
 * и расходилась при каждой правке.
 *
 * Смысл знака: три полосы — блоки страницы, шеврон — «Go», отправка сайта в
 * мир. Ровно то, что делает конструктор: собирает страницу из блоков и
 * выгружает её статикой.
 *
 * Компонент без состояния и хуков, поэтому одинаково годится и серверным, и
 * клиентским разделам.
 */

export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="9" fill="var(--accent)" />
      <rect x="7" y="8" width="18" height="4.2" rx="2.1" fill="var(--accent-foreground)" />
      <rect x="7" y="14.2" width="11" height="4.2" rx="2.1" fill="var(--accent-foreground)" opacity="0.72" />
      <rect x="7" y="20.4" width="6.5" height="4.2" rx="2.1" fill="var(--accent-foreground)" opacity="0.45" />
      <path
        d="m18.4 19.6 4.2 3.9-4.2 3.9"
        fill="none"
        stroke="var(--accent-foreground)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Знак вместе с названием. `href` делает логотип ссылкой — как в шапке. */
export function Logo({
  className = "",
  markClassName = "h-8 w-8",
  textClassName = "text-[15px]",
}: {
  className?: string;
  markClassName?: string;
  textClassName?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className={markClassName} />
      <span className={`font-display font-bold tracking-tight text-ink ${textClassName}`}>
        Site<span className="text-accent">Go</span>
      </span>
    </span>
  );
}
