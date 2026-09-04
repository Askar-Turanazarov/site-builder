import { z } from "zod";

/**
 * The 14 user-addable block types available in the page/article editor.
 * Each Page/Post stores THREE full block trees (blocksRu/blocksUz/blocksEn) —
 * one per locale. A block's `data` therefore already belongs to one locale;
 * FieldSpec.localized below controls whether editing a field while a given
 * locale tab is active writes only that locale's copy, or is propagated to
 * all three locale trees for the same block id (used for non-text fields
 * like image pickers or layout options, which should not drift between
 * languages even though the text does).
 *
 * Note: the article header (title/date/category/cover) is NOT one of these
 * block types — it is always rendered by the post template itself directly
 * from the Post's own fields (see src/blocks/components/ArticleHeader.tsx),
 * so it never needs to live inside an editable block tree.
 */
export const BLOCK_TYPES = [
  "hero",
  "richText",
  "imageText",
  "gallery",
  "featuresGrid",
  "cta",
  "testimonials",
  "pricing",
  "team",
  "stats",
  "faq",
  "contactForm",
  "logosStrip",
  "videoEmbed",
] as const;

export type BlockType = (typeof BLOCK_TYPES)[number];

// ---------------------------------------------------------------------------
// Field specs — declarative shape used by BlockEditForm to render generic
// editor forms without per-block-type UI code.
// ---------------------------------------------------------------------------

interface FieldSpecBase {
  name: string;
  label: string;
  localized: boolean;
  placeholder?: string;
}

export type FieldSpec =
  | (FieldSpecBase & { kind: "text" })
  | (FieldSpecBase & { kind: "textarea" })
  | (FieldSpecBase & { kind: "richtext" })
  | (FieldSpecBase & { kind: "image" })
  | (FieldSpecBase & { kind: "url" })
  | (FieldSpecBase & { kind: "boolean" })
  | (FieldSpecBase & { kind: "select"; options: { value: string; label: string }[] })
  | (FieldSpecBase & {
      kind: "repeatable";
      itemLabel: string;
      min?: number;
      max?: number;
      fields: FieldSpec[];
    });

// ---------------------------------------------------------------------------
// Zod schemas — one per block type's `data` shape. Kept close to FIELD_SPECS
// below so the two stay in sync when a block type gains/loses a field.
// ---------------------------------------------------------------------------

const mediaId = z.string().nullable().default(null);

export const heroDataSchema = z.object({
  heading: z.string().default(""),
  subheading: z.string().default(""),
  imageMediaId: mediaId,
  ctaLabel: z.string().default(""),
  ctaLink: z.string().default(""),
  variant: z.enum(["centered", "split", "fullBleed"]).default("split"),
  overlayOpacity: z.number().min(0).max(0.9).default(0.35),
});

export const richTextDataSchema = z.object({
  html: z.string().default(""),
});

export const imageTextDataSchema = z.object({
  imageMediaId: mediaId,
  heading: z.string().default(""),
  body: z.string().default(""),
  imageSide: z.enum(["left", "right"]).default("right"),
  ctaLabel: z.string().default(""),
  ctaLink: z.string().default(""),
});

export const galleryItemSchema = z.object({
  imageMediaId: mediaId,
  caption: z.string().default(""),
});

export const galleryDataSchema = z.object({
  items: z.array(galleryItemSchema).default([]),
  columns: z.union([z.literal(2), z.literal(3), z.literal(4)]).default(3),
});

export const featureItemSchema = z.object({
  icon: z.string().default("spark"),
  title: z.string().default(""),
  body: z.string().default(""),
});

export const featuresGridDataSchema = z.object({
  heading: z.string().default(""),
  items: z.array(featureItemSchema).default([]),
  columns: z.union([z.literal(2), z.literal(3), z.literal(4)]).default(3),
});

export const ctaDataSchema = z.object({
  heading: z.string().default(""),
  body: z.string().default(""),
  buttonLabel: z.string().default(""),
  buttonLink: z.string().default(""),
  style: z.enum(["solid", "outline"]).default("solid"),
});

export const testimonialItemSchema = z.object({
  quote: z.string().default(""),
  authorName: z.string().default(""),
  authorRole: z.string().default(""),
  avatarMediaId: mediaId,
});

export const testimonialsDataSchema = z.object({
  heading: z.string().default(""),
  items: z.array(testimonialItemSchema).default([]),
});

export const pricingPlanSchema = z.object({
  name: z.string().default(""),
  price: z.string().default(""),
  period: z.string().default(""),
  features: z.array(z.string()).default([]),
  highlighted: z.boolean().default(false),
  ctaLabel: z.string().default(""),
  ctaLink: z.string().default(""),
});

export const pricingDataSchema = z.object({
  heading: z.string().default(""),
  plans: z.array(pricingPlanSchema).default([]),
});

export const teamMemberSchema = z.object({
  name: z.string().default(""),
  role: z.string().default(""),
  photoMediaId: mediaId,
  bio: z.string().default(""),
});

export const teamDataSchema = z.object({
  heading: z.string().default(""),
  members: z.array(teamMemberSchema).default([]),
});

export const statItemSchema = z.object({
  value: z.string().default(""),
  label: z.string().default(""),
});

export const statsDataSchema = z.object({
  items: z.array(statItemSchema).default([]),
});

export const faqItemSchema = z.object({
  question: z.string().default(""),
  answer: z.string().default(""),
});

export const faqDataSchema = z.object({
  heading: z.string().default(""),
  items: z.array(faqItemSchema).default([]),
});

export const contactFormFieldSchema = z.object({
  type: z.enum(["text", "email", "textarea", "tel"]).default("text"),
  label: z.string().default(""),
  required: z.boolean().default(true),
});

export const contactFormDataSchema = z.object({
  heading: z.string().default(""),
  fields: z.array(contactFormFieldSchema).default([]),
  submitLabel: z.string().default(""),
  successMessage: z.string().default(""),
});

export const logoItemSchema = z.object({
  imageMediaId: mediaId,
  link: z.string().default(""),
});

export const logosStripDataSchema = z.object({
  heading: z.string().default(""),
  logos: z.array(logoItemSchema).default([]),
});

export const videoEmbedDataSchema = z.object({
  url: z.string().default(""),
  caption: z.string().default(""),
});

export const BLOCK_DATA_SCHEMAS = {
  hero: heroDataSchema,
  richText: richTextDataSchema,
  imageText: imageTextDataSchema,
  gallery: galleryDataSchema,
  featuresGrid: featuresGridDataSchema,
  cta: ctaDataSchema,
  testimonials: testimonialsDataSchema,
  pricing: pricingDataSchema,
  team: teamDataSchema,
  stats: statsDataSchema,
  faq: faqDataSchema,
  contactForm: contactFormDataSchema,
  logosStrip: logosStripDataSchema,
  videoEmbed: videoEmbedDataSchema,
} satisfies Record<BlockType, z.ZodTypeAny>;

export type BlockDataOf<T extends BlockType> = z.infer<(typeof BLOCK_DATA_SCHEMAS)[T]>;

export interface Block<T extends BlockType = BlockType> {
  id: string;
  type: T;
  data: BlockDataOf<T>;
}

export const blockSchema = z.union(
  BLOCK_TYPES.map((type) =>
    z.object({ id: z.string(), type: z.literal(type), data: BLOCK_DATA_SCHEMAS[type] }),
  ) as unknown as [z.ZodTypeAny, ...z.ZodTypeAny[]],
);

export const blockListSchema = z.array(blockSchema);

export function parseBlocks(json: string): Block[] {
  try {
    const raw = JSON.parse(json);
    const result = blockListSchema.safeParse(raw);
    return result.success ? (result.data as Block[]) : [];
  } catch {
    return [];
  }
}

export function serializeBlocks(blocks: Block[]): string {
  return JSON.stringify(blocks);
}

// ---------------------------------------------------------------------------
// FIELD_SPECS — drives the generic block edit form.
// ---------------------------------------------------------------------------

export const FIELD_SPECS: Record<BlockType, FieldSpec[]> = {
  hero: [
    { kind: "text", name: "heading", label: "Заголовок", localized: true },
    { kind: "textarea", name: "subheading", label: "Подзаголовок", localized: true },
    { kind: "image", name: "imageMediaId", label: "Фоновое изображение", localized: false },
    { kind: "text", name: "ctaLabel", label: "Текст кнопки", localized: true },
    { kind: "url", name: "ctaLink", label: "Ссылка кнопки", localized: false, placeholder: "/about или https://…" },
    {
      kind: "select",
      name: "variant",
      label: "Вариант вёрстки",
      localized: false,
      options: [
        { value: "split", label: "Разделённый (текст + фото)" },
        { value: "centered", label: "По центру" },
        { value: "fullBleed", label: "Во всю ширину с фоном" },
      ],
    },
  ],
  richText: [{ kind: "richtext", name: "html", label: "Текст", localized: true }],
  imageText: [
    { kind: "image", name: "imageMediaId", label: "Изображение", localized: false },
    { kind: "text", name: "heading", label: "Заголовок", localized: true },
    { kind: "richtext", name: "body", label: "Текст", localized: true },
    {
      kind: "select",
      name: "imageSide",
      label: "Сторона изображения",
      localized: false,
      options: [
        { value: "left", label: "Слева" },
        { value: "right", label: "Справа" },
      ],
    },
    { kind: "text", name: "ctaLabel", label: "Текст кнопки", localized: true },
    { kind: "url", name: "ctaLink", label: "Ссылка кнопки", localized: false, placeholder: "/about или https://…" },
  ],
  gallery: [
    {
      kind: "repeatable",
      localized: false,
      name: "items",
      label: "Изображения",
      itemLabel: "Изображение",
      fields: [
        { kind: "image", name: "imageMediaId", label: "Файл", localized: false },
        { kind: "text", name: "caption", label: "Подпись", localized: true },
      ],
    },
    {
      kind: "select",
      name: "columns",
      label: "Колонок",
      localized: false,
      options: [
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
      ],
    },
  ],
  featuresGrid: [
    { kind: "text", name: "heading", label: "Заголовок блока", localized: true },
    {
      kind: "repeatable",
      localized: false,
      name: "items",
      label: "Пункты",
      itemLabel: "Пункт",
      fields: [
        { kind: "text", name: "icon", label: "Иконка", localized: false },
        { kind: "text", name: "title", label: "Заголовок", localized: true },
        { kind: "textarea", name: "body", label: "Описание", localized: true },
      ],
    },
    {
      kind: "select",
      name: "columns",
      label: "Колонок",
      localized: false,
      options: [
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
      ],
    },
  ],
  cta: [
    { kind: "text", name: "heading", label: "Заголовок", localized: true },
    { kind: "textarea", name: "body", label: "Текст", localized: true },
    { kind: "text", name: "buttonLabel", label: "Текст кнопки", localized: true },
    { kind: "url", name: "buttonLink", label: "Ссылка кнопки", localized: false, placeholder: "/about или https://…" },
    {
      kind: "select",
      name: "style",
      label: "Стиль",
      localized: false,
      options: [
        { value: "solid", label: "Заливка" },
        { value: "outline", label: "Контур" },
      ],
    },
  ],
  testimonials: [
    { kind: "text", name: "heading", label: "Заголовок блока", localized: true },
    {
      kind: "repeatable",
      localized: false,
      name: "items",
      label: "Отзывы",
      itemLabel: "Отзыв",
      fields: [
        { kind: "textarea", name: "quote", label: "Текст отзыва", localized: true },
        { kind: "text", name: "authorName", label: "Имя автора", localized: true },
        { kind: "text", name: "authorRole", label: "Должность/роль", localized: true },
        { kind: "image", name: "avatarMediaId", label: "Фото", localized: false },
      ],
    },
  ],
  pricing: [
    { kind: "text", name: "heading", label: "Заголовок блока", localized: true },
    {
      kind: "repeatable",
      localized: false,
      name: "plans",
      label: "Тарифы",
      itemLabel: "Тариф",
      fields: [
        { kind: "text", name: "name", label: "Название", localized: true },
        { kind: "text", name: "price", label: "Цена", localized: true },
        { kind: "text", name: "period", label: "Период", localized: true },
        {
          kind: "textarea",
          name: "features",
          label: "Возможности (по одной строке на пункт)",
          localized: true,
        },
        { kind: "boolean", name: "highlighted", label: "Выделить как рекомендуемый", localized: false },
        { kind: "text", name: "ctaLabel", label: "Текст кнопки", localized: true },
        { kind: "url", name: "ctaLink", label: "Ссылка кнопки", localized: false, placeholder: "/about или https://…" },
      ],
    },
  ],
  team: [
    { kind: "text", name: "heading", label: "Заголовок блока", localized: true },
    {
      kind: "repeatable",
      localized: false,
      name: "members",
      label: "Участники",
      itemLabel: "Участник",
      fields: [
        { kind: "image", name: "photoMediaId", label: "Фото", localized: false },
        { kind: "text", name: "name", label: "Имя", localized: true },
        { kind: "text", name: "role", label: "Должность", localized: true },
        { kind: "textarea", name: "bio", label: "Краткое био", localized: true },
      ],
    },
  ],
  stats: [
    {
      kind: "repeatable",
      localized: false,
      name: "items",
      label: "Показатели",
      itemLabel: "Показатель",
      fields: [
        { kind: "text", name: "value", label: "Значение", localized: true },
        { kind: "text", name: "label", label: "Подпись", localized: true },
      ],
    },
  ],
  faq: [
    { kind: "text", name: "heading", label: "Заголовок блока", localized: true },
    {
      kind: "repeatable",
      localized: false,
      name: "items",
      label: "Вопросы",
      itemLabel: "Вопрос",
      fields: [
        { kind: "text", name: "question", label: "Вопрос", localized: true },
        { kind: "richtext", name: "answer", label: "Ответ", localized: true },
      ],
    },
  ],
  contactForm: [
    { kind: "text", name: "heading", label: "Заголовок", localized: true },
    {
      kind: "repeatable",
      localized: false,
      name: "fields",
      label: "Поля формы",
      itemLabel: "Поле",
      fields: [
        {
          kind: "select",
          name: "type",
          label: "Тип поля",
          localized: false,
          options: [
            { value: "text", label: "Текст" },
            { value: "email", label: "Email" },
            { value: "tel", label: "Телефон" },
            { value: "textarea", label: "Многострочный текст" },
          ],
        },
        { kind: "text", name: "label", label: "Подпись поля", localized: true },
        { kind: "boolean", name: "required", label: "Обязательное", localized: false },
      ],
    },
    { kind: "text", name: "submitLabel", label: "Текст кнопки отправки", localized: true },
    { kind: "text", name: "successMessage", label: "Сообщение после отправки", localized: true },
  ],
  logosStrip: [
    { kind: "text", name: "heading", label: "Заголовок блока", localized: true },
    {
      kind: "repeatable",
      localized: false,
      name: "logos",
      label: "Логотипы",
      itemLabel: "Логотип",
      fields: [
        { kind: "image", name: "imageMediaId", label: "Файл", localized: false },
        { kind: "url", name: "link", label: "Ссылка", localized: false },
      ],
    },
  ],
  videoEmbed: [
    { kind: "url", name: "url", label: "Ссылка на видео (YouTube/Vimeo)", localized: false },
    { kind: "text", name: "caption", label: "Подпись", localized: true },
  ],
};

export const BLOCK_LABELS: Record<BlockType, string> = {
  hero: "Hero — обложка",
  richText: "Текстовый блок",
  imageText: "Изображение + текст",
  gallery: "Галерея",
  featuresGrid: "Сетка преимуществ",
  cta: "Призыв к действию",
  testimonials: "Отзывы",
  pricing: "Тарифы",
  team: "Команда",
  stats: "Цифры/статистика",
  faq: "Вопрос-ответ",
  contactForm: "Форма обратной связи",
  logosStrip: "Лента логотипов",
  videoEmbed: "Видео",
};
