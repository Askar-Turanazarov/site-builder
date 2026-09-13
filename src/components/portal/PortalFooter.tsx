import Link from "next/link";
import type { PortalT } from "@/lib/portal-i18n";
import { Logo } from "@/components/brand/Logo";

export function PortalFooter({ t, siteHref }: { t: PortalT; siteHref: string }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-separator bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <Logo textClassName="text-base" />
          <p className="mt-3 text-sm leading-relaxed text-muted">{t("footer.tagline")}</p>
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

      <div className="border-t border-separator">
        <div className="mx-auto max-w-6xl px-5 py-5 text-xs text-muted">© {year} SiteGo</div>
      </div>
    </footer>
  );
}
