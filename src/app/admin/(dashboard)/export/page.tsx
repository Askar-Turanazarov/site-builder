import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSiteSettings } from "@/lib/site-settings";

export default async function ExportPage() {
  const [pageCount, postCount, settings] = await Promise.all([
    prisma.page.count({ where: { status: "published" } }),
    prisma.post.count({ where: { status: "published" } }),
    getSiteSettings(),
  ]);

  return (
    <div className="mx-auto max-w-2xl px-8 py-10">
      <h1 className="font-display text-2xl font-semibold text-ink">Экспорт сайта</h1>
      <p className="mt-1 text-sm text-muted">
        Выгружает весь опубликованный сайт в статические HTML/CSS/JS-файлы — без бэкенда, готово к
        размещению на любом хостинге.
      </p>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <Stat label="Страниц" value={pageCount} />
        <Stat label="Статей" value={postCount} />
        <Stat label="Языков" value={3} />
      </div>

      <div className="mt-6 rounded-lg border border-border bg-surface p-6">
        <Link
          href="/admin/export/download"
          className="inline-block rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-surface hover:bg-accent-strong"
        >
          Скачать ZIP-архив
        </Link>

        <div className="mt-6 space-y-3 text-sm text-ink-soft">
          <p>
            <strong className="text-ink">Как размещать:</strong> распакуйте архив и загрузите содержимое в
            корень любого статического хостинга (Netlify, GitHub Pages, S3 и т. п.) — ссылки в архиве
            абсолютные, вида <code className="rounded bg-paper px-1 py-0.5 text-xs">/ru/about/</code>, и
            хостинг должен отдавать <code className="rounded bg-paper px-1 py-0.5 text-xs">index.html</code>{" "}
            для таких путей — это поведение по умолчанию почти у всех статических хостингов.
          </p>
          <p>
            <strong className="text-ink">Локальная проверка:</strong> открыть файлы напрямую двойным
            кликом (file://) не получится — абсолютные пути не разрешатся. Запустите локальный сервер в
            распакованной папке, например{" "}
            <code className="rounded bg-paper px-1 py-0.5 text-xs">npx serve .</code>, и откройте
            предложенный адрес.
          </p>
          <p>
            <strong className="text-ink">Форма обратной связи:</strong> в выгруженной статике форма не
            имеет сервера для обработки.{" "}
            {settings.contactFormAction ? (
              <>Сейчас настроен внешний адрес отправки — форма будет работать.</>
            ) : (
              <>
                Сейчас внешний адрес не настроен — форма откроет почтовый клиент посетителя. Укажите адрес
                сервиса вроде Formspree в{" "}
                <Link href="/admin/settings" className="underline">
                  настройках сайта
                </Link>
                , чтобы форма отправляла заявки напрямую.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <div className="font-display text-2xl font-bold tabular-nums text-ink">{value}</div>
      <div className="mt-0.5 text-xs text-muted">{label}</div>
    </div>
  );
}
