import { prisma } from "@/lib/prisma";
import { DictionaryTable } from "./DictionaryTable";
import { getAdminT } from "@/lib/admin-i18n/server";

export default async function DictionaryPage() {
  const t = await getAdminT();
  const entries = await prisma.dictionaryEntry.findMany({ orderBy: { key: "asc" } });

  return (
    <div className="mx-auto max-w-4xl px-8 py-10">
      <h1 className="font-display text-2xl font-semibold text-ink">{t("dictionary.title")}</h1>
      <p className="mt-1 text-sm text-muted">{t("dictionary.subtitle")}</p>
      <div className="mt-6">
        <DictionaryTable entries={entries} />
      </div>
    </div>
  );
}
