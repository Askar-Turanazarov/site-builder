import Link from "next/link";
import { LOCALES, type Locale } from "@/blocks/context";
import { getSiteSettings } from "@/lib/site-settings";
import { SiteFrame } from "@/components/site/SiteFrame";
import { CX, cx } from "@/blocks/classes";

/**
 * Страница 404 публичного сайта.
 *
 * Лежит в корне `app`, а не внутри `[locale]`: когда страница или статья не
 * найдена, Next заменяет всё поддерево ниже корневого layout — то есть каркас
 * сайта из `[locale]/layout.tsx` уже не отрисуется, и его нужно поставить
 * здесь самому. Язык берём из настроек сайта: компонент `not-found` не
 * получает параметров маршрута, поэтому адрес запроса ему недоступен.
 */

const TEXT: Record<Locale, { title: string; body: string; home: string; news: string }> = {
  ru: {
    title: "Страница не найдена",
    body: "Адрес набран с ошибкой или страницу удалили. Загляните на главную — оттуда открыты все разделы сайта.",
    home: "На главную",
    news: "Все новости",
  },
  uz: {
    title: "Sahifa topilmadi",
    body: "Manzil xato yozilgan yoki sahifa o'chirilgan. Bosh sahifaga qayting — u yerdan saytning barcha bo'limlari ochiladi.",
    home: "Bosh sahifaga",
    news: "Barcha yangiliklar",
  },
  en: {
    title: "Page not found",
    body: "The address is mistyped or the page has been removed. Start from the home page — every section is reachable from there.",
    home: "Go to the home page",
    news: "All news",
  },
};

export default async function NotFound() {
  const settings = await getSiteSettings();
  const locale = (LOCALES.includes(settings.defaultLocale as Locale)
    ? settings.defaultLocale
    : "ru") as Locale;
  const text = TEXT[locale];

  return (
    <SiteFrame locale={locale}>
      <section className={CX.section}>
        <div className={CX.containerNarrow}>
          <p className={CX.eyebrow}>404</p>
          <h1 className={cx(CX.h1, "mt-3")}>{text.title}</h1>
          <p className={cx(CX.lead, "mt-5")}>{text.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/${locale}`} className={cx(CX.button, CX.buttonSolid)}>
              {text.home}
            </Link>
            <Link href={`/${locale}/news`} className={cx(CX.button, CX.buttonOutline)}>
              {text.news}
            </Link>
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
