import { PORTAL_CONTAINER } from "@/components/portal/container";
import Link from "next/link";
import type { PortalT } from "@/lib/portal-i18n";
import { Logo } from "@/components/brand/Logo";

/**
 * Подвал портала.
 *
 * Строка авторства на десктопе стоит прямо под описанием продукта: отдельная
 * полоса во всю ширину экрана там выглядела лишней и занимала место. На узких
 * экранах колонки идут друг под другом, и та же строка в отдельной полосе внизу
 * читается естественно — поэтому там она осталась прежней.
 */
export function PortalFooter({ t, siteHref }: { t: PortalT; siteHref: string }) {
  const copyright = `© ${new Date().getFullYear()} SiteGo — Askar Turanazarov`;

  return (
    <footer className="sg-glass mt-20 border-t border-separator">
      <div className={`${PORTAL_CONTAINER} flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between`}>
        <div className="max-w-sm">
          <Logo textClassName="text-base" />
          <p className="mt-3 text-sm leading-relaxed text-muted">{t("footer.tagline")}</p>
          <p className="mt-4 hidden text-xs text-muted lg:block">{copyright}</p>
        </div>

        <nav className="flex flex-col gap-2.5 text-sm">
          <Link href="/templates" className="focus-visible:focus-ring rounded text-ink-soft transition-colors hover:text-accent">
            {t("nav.templates")}
          </Link>
          <Link href={siteHref} className="focus-visible:focus-ring rounded text-ink-soft transition-colors hover:text-accent">
            {t("nav.mysite")}
          </Link>
          <Link href="/admin" className="focus-visible:focus-ring rounded text-ink-soft transition-colors hover:text-accent">
            {t("nav.admin")}
          </Link>
        </nav>
      </div>

      <div className="border-t border-separator lg:hidden">
        <div className={`${PORTAL_CONTAINER} py-5 text-xs text-muted`}>{copyright}</div>
      </div>
    </footer>
  );
}
