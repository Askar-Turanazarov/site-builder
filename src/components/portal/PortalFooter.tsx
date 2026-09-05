import Link from "next/link";
import type { PortalT } from "@/lib/portal-i18n";

export function PortalFooter({ t, siteHref }: { t: PortalT; siteHref: string }) {
  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <div className="font-display text-base font-semibold text-ink">Site Builder</div>
          <p className="mt-2 text-sm text-muted">{t("footer.tagline")}</p>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <Link href="/templates" className="text-ink-soft hover:text-ink">
            {t("nav.templates")}
          </Link>
          <Link href={siteHref} className="text-ink-soft hover:text-ink">
            {t("nav.mysite")}
          </Link>
          <Link href="/admin" className="text-ink-soft hover:text-ink">
            {t("nav.admin")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
