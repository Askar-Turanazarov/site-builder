import { BlockList } from "@/blocks/registry";
import type { Block } from "@/blocks/types";
import type { RenderContext } from "@/blocks/context";
import { themeStyleVars, THEME_KEYS, isThemeKey } from "@/blocks/palette";

// Dev-only sanity check for every block type in isolation, before the
// editor exists. Not linked from the sidebar; visit /admin/block-preview
// directly. Safe to delete once the editor + real pages can be inspected
// instead (kept for now as a quick regression check when tweaking classes.ts).

const PLACEHOLDER_MEDIA: Record<string, { url: string; alt: string; width: number | null; height: number | null }> = {
  img1: { url: "https://picsum.photos/seed/hero/1200/800", alt: "Демо-фото", width: 1200, height: 800 },
  img2: { url: "https://picsum.photos/seed/two/800/600", alt: "Демо-фото 2", width: 800, height: 600 },
  avatar1: { url: "https://picsum.photos/seed/face1/200/200", alt: "Автор отзыва", width: 200, height: 200 },
};

const ctx: RenderContext = {
  locale: "ru",
  media: PLACEHOLDER_MEDIA,
  t: (key) => ({ "pricing.recommended": "Рекомендуем" })[key] ?? key,
  pageSlug: "block-preview",
  contactEmail: "hello@example.com",
};

const sampleBlocks: Block[] = [
  { id: "1", type: "hero", data: { heading: "Растим бизнес вместе с вами", subheading: "Стратегия, дизайн и разработка для компаний, которые хотят расти", imageMediaId: "img1", ctaLabel: "Обсудить проект", ctaLink: "#", variant: "split", overlayOpacity: 0.35 } },
  { id: "2", type: "featuresGrid", data: { heading: "Почему выбирают нас", items: [
    { icon: "shield", title: "Надёжность", body: "Работаем по договору и соблюдаем сроки" },
    { icon: "rocket", title: "Скорость", body: "Первые результаты — уже через 2 недели" },
    { icon: "chart", title: "Результат", body: "Отчёты и метрики на каждом этапе" },
  ], columns: 3 } },
  { id: "3", type: "imageText", data: { imageMediaId: "img2", heading: "О нашей команде", body: "Мы — команда из 12 специалистов: дизайнеры, разработчики и маркетологи с опытом от 5 лет.", imageSide: "left", ctaLabel: "Узнать больше", ctaLink: "#" } },
  { id: "4", type: "stats", data: { items: [
    { value: "120+", label: "проектов" },
    { value: "8 лет", label: "на рынке" },
    { value: "98%", label: "довольных клиентов" },
    { value: "24/7", label: "поддержка" },
  ] } },
  { id: "5", type: "testimonials", data: { heading: "Отзывы клиентов", items: [
    { quote: "Отличная команда, сделали сайт быстрее, чем обещали.", authorName: "Анна Ким", authorRole: "Директор, ООО «Свет»", avatarMediaId: "avatar1" },
    { quote: "Профессиональный подход на всех этапах.", authorName: "Игорь Петров", authorRole: "CEO, Startify", avatarMediaId: null },
  ] } },
  { id: "6", type: "pricing", data: { heading: "Тарифы", plans: [
    { name: "Старт", price: "$490", period: "проект", features: ["Лендинг", "Базовая SEO-настройка", "1 месяц поддержки"], highlighted: false, ctaLabel: "Выбрать", ctaLink: "#" },
    { name: "Бизнес", price: "$1490", period: "проект", features: ["До 10 страниц", "Блог/новости", "3 месяца поддержки"], highlighted: true, ctaLabel: "Выбрать", ctaLink: "#" },
  ] } },
  { id: "7", type: "faq", data: { heading: "Вопросы и ответы", items: [
    { question: "Сколько длится разработка?", answer: "<p>В среднем от 3 до 6 недель в зависимости от объёма.</p>" },
  ] } },
  { id: "8", type: "cta", data: { heading: "Готовы начать?", body: "Оставьте заявку — обсудим задачу в течение дня", buttonLabel: "Связаться с нами", buttonLink: "#", style: "solid" } },
  { id: "9", type: "contactForm", data: { heading: "Напишите нам", fields: [
    { type: "text", label: "Имя", required: true },
    { type: "email", label: "Email", required: true },
    { type: "textarea", label: "Сообщение", required: false },
  ], submitLabel: "Отправить", successMessage: "Спасибо! Мы свяжемся с вами." } },
];

export default async function BlockPreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ theme?: string }>;
}) {
  const { theme } = await searchParams;
  const themeKey = theme && isThemeKey(theme) ? theme : "business";

  return (
    <div>
      <div className="border-b border-border bg-surface px-6 py-3 text-sm text-muted">
        Проверка блоков — тема:{" "}
        {THEME_KEYS.map((key) => (
          <a
            key={key}
            href={`?theme=${key}`}
            className={`mx-1 underline ${key === themeKey ? "text-accent" : ""}`}
          >
            {key}
          </a>
        ))}
      </div>
      <div style={themeStyleVars(themeKey)} className="bg-[var(--tpl-paper)]">
        <BlockList blocks={sampleBlocks} ctx={ctx} />
      </div>
    </div>
  );
}
