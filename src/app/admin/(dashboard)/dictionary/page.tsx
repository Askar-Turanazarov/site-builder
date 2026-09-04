import { prisma } from "@/lib/prisma";
import { DictionaryTable } from "./DictionaryTable";

export default async function DictionaryPage() {
  const entries = await prisma.dictionaryEntry.findMany({ orderBy: { key: "asc" } });

  return (
    <div className="mx-auto max-w-4xl px-8 py-10">
      <h1 className="font-display text-2xl font-semibold text-ink">Словарь переводов</h1>
      <p className="mt-1 text-sm text-muted">
        Статичные надписи публичного сайта (кнопки, меню, сообщения) — не путать с текстом страниц и статей,
        который редактируется прямо в блоках.
      </p>
      <div className="mt-6">
        <DictionaryTable entries={entries} />
      </div>
    </div>
  );
}
