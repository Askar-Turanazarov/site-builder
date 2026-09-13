import type { Metadata } from "next";
import { Manrope, Onest, IBM_Plex_Mono } from "next/font/google";
import { getThemeMode } from "@/lib/theme-server";
import { THEME_SCRIPT } from "@/lib/theme";
import "./globals.css";

/**
 * Шрифты продукта. Заголовочный Manrope — геометрический гротеск, созвучный
 * крупным скруглениям HeroUI. Текстовый Onest выбран ради родной кириллицы:
 * у трёх языков проекта (ru/uz/en) набор должен выглядеть одинаково ровно.
 */
const display = Manrope({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700", "800"],
});

const body = Onest({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "SiteGo",
    template: "%s — SiteGo",
  },
  description:
    "Конструктор многоязычных сайтов: блочный редактор, новости, три языка и выгрузка в статику",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const theme = await getThemeMode();

  return (
    <html
      lang="ru"
      /* «Системная» — единственный режим, который сервер напечатать не может:
         настройка ОС ему неизвестна. Тогда атрибут не печатаем вовсе, а
         THEME_SCRIPT ставит его до первой отрисовки. */
      data-theme={theme === "system" ? undefined : theme}
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
