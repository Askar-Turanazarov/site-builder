import Link from "next/link";
import type { ResolvedMenuItem } from "@/lib/menu";

export function Footer({
  siteName,
  tagline,
  footerNote,
  navItems,
  contactEmail,
  contactPhone,
  contactAddress,
  builderLabel,
}: {
  siteName: string;
  tagline: string | null;
  footerNote: string | null;
  navItems: ResolvedMenuItem[];
  contactEmail: string | null;
  contactPhone: string | null;
  contactAddress: string | null;
  /** Подпись «Сделано на Site Builder». Есть на живом сайте, нет в экспорте. */
  builderLabel?: string | null;
}) {
  return (
    <footer className="sb-footer border-t border-[var(--tpl-ink)]/10 bg-[var(--tpl-surface)]">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <div className="[font-family:var(--tpl-font-display)] text-base font-bold text-[var(--tpl-ink)]">
              {siteName}
            </div>
            {tagline && <p className="mt-2 text-sm text-[var(--tpl-ink-soft)]">{tagline}</p>}
          </div>

          {navItems.length > 0 && (
            <div>
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="text-sm text-[var(--tpl-ink-soft)] hover:text-[var(--tpl-ink)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {(contactEmail || contactPhone || contactAddress) && (
            <div className="space-y-1.5 text-sm text-[var(--tpl-ink-soft)]">
              {contactAddress && <p>{contactAddress}</p>}
              {contactPhone && <p>{contactPhone}</p>}
              {contactEmail && (
                <a href={`mailto:${contactEmail}`} className="hover:text-[var(--tpl-ink)]">
                  {contactEmail}
                </a>
              )}
            </div>
          )}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--tpl-ink)]/10 pt-6 text-xs text-[var(--tpl-ink-soft)]">
          {footerNote && <p>{footerNote}</p>}
          {builderLabel && (
            <Link href="/" className="hover:text-[var(--tpl-ink)]">
              {builderLabel}
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
}
