import { prisma } from "@/lib/prisma";
import { getAdminT } from "@/lib/admin-i18n/server";
import { MessageList, type MessageItem } from "./MessageList";

/**
 * Заявки с формы обратной связи.
 *
 * Блок «Форма» пишет отправления в базу, но до этого экрана их негде было
 * прочитать — форма на сайте работала «в стол». Значения выводятся как текст:
 * их прислал посетитель, и доверять им нельзя.
 */
export default async function MessagesPage() {
  const [t, rows] = await Promise.all([
    getAdminT(),
    prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 200 }),
  ]);

  const messages: MessageItem[] = rows.map((row) => ({
    id: row.id,
    locale: row.locale,
    pageSlug: row.pageSlug,
    createdAt: row.createdAt.toISOString(),
    fields: parseFields(row.fieldsRaw),
  }));

  return (
    <div className="mx-auto max-w-3xl px-8 py-10">
      <h1 className="font-display text-2xl font-semibold text-ink">{t("messages.title")}</h1>
      <p className="mt-1 text-sm text-muted">{t("messages.subtitle")}</p>

      <div className="mt-6">
        <MessageList
          messages={messages}
          labels={{
            empty: t("messages.empty"),
            delete: t("common.delete"),
            clear: t("messages.clear"),
            page: t("messages.page"),
          }}
        />
      </div>
    </div>
  );
}

/** Поля хранятся строкой JSON: разбираем осторожно, содержимое пришло извне. */
function parseFields(raw: string): { label: string; value: string }[] {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item): item is { label: unknown; value: unknown } => !!item && typeof item === "object")
      .map((item) => ({ label: String(item.label ?? ""), value: String(item.value ?? "") }));
  } catch {
    return [];
  }
}
