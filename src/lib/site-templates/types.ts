import type { Locale } from "@/blocks/context";
import type { ThemeKey } from "@/blocks/palette";
import type { BlockStyle } from "@/blocks/style";
import { blockListSchema, type Block, type BlockDataOf } from "@/blocks/types";
import { templateArtId, type TemplateArtName } from "./art";

/**
 * Шаблон сайта целиком: страницы, рубрики, статьи, меню, тема и настройки.
 *
 * Тексты шаблонов хранятся сразу на трёх языках в виде `Tri` — так одна
 * структура блоков описывается один раз, а не трижды (как в пер-страничных
 * шаблонах из src/lib/templates). Перед применением или предпросмотром
 * `materializeBlocks` разворачивает структуру в обычный `Block[]` нужного
 * языка.
 */

export interface Tri {
  ru: string;
  uz: string;
  en: string;
}

/** Короткая запись локализованной строки: L("Ру", "Uz", "En"). */
export function L(ru: string, uz: string, en: string): Tri {
  return { ru, uz, en };
}

function isTri(value: unknown): value is Tri {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const keys = Object.keys(value);
  return (
    keys.length === 3 &&
    keys.includes("ru") &&
    keys.includes("uz") &&
    keys.includes("en") &&
    Object.values(value).every((v) => typeof v === "string")
  );
}

/** Рекурсивно заменяет все Tri внутри структуры на строку нужного языка. */
function localizeValue(value: unknown, locale: Locale): unknown {
  if (isTri(value)) return value[locale];
  if (Array.isArray(value)) return value.map((item) => localizeValue(item, locale));
  if (typeof value === "object" && value !== null) {
    return Object.fromEntries(
      Object.entries(value).map(([key, val]) => [key, localizeValue(val, locale)]),
    );
  }
  return value;
}

/** Блок шаблона: та же форма, что у Block, но текстовые поля — Tri. */
export interface TemplateBlock {
  id: string;
  type: Block["type"];
  data: Record<string, unknown>;
  /**
   * Пер-блочное оформление (см. src/blocks/style.ts). Задаётся частично:
   * недостающие поля дополнит blockStyleSchema своими дефолтами. Именно этим
   * шаблоны различаются не только палитрой, но и ритмом полос — тёмные врезки,
   * узкие текстовые блоки, крупные заголовки на первом экране.
   */
  style?: Partial<BlockStyle>;
}

/** Тот же блок, но с добавленным оформлением: S(B.hero(...), { bg: "ink" }). */
export function S(block: TemplateBlock, style: Partial<BlockStyle>): TemplateBlock {
  return { ...block, style: { ...block.style, ...style } };
}

/**
 * Разворачивает блоки шаблона в блоки нужного языка и прогоняет их через
 * ту же схему, что и содержимое из базы: ошибка в шаблоне обнаружится сразу,
 * а не превратится в пустую страницу (parseBlocks на сбое отдаёт []).
 */
export function materializeBlocks(
  blocks: TemplateBlock[],
  locale: Locale,
  artKey?: string,
): Block[] {
  const localized = blocks.map((block) => ({
    id: block.id,
    type: block.type,
    data: localizeValue(block.data, locale),
    ...(block.style ? { style: block.style } : {}),
  }));
  const parsed = blockListSchema.parse(localized) as Block[];
  return artKey ? withTemplateArt(parsed, artKey) : parsed;
}

/**
 * Расставляет картинки шаблона по блокам.
 *
 * Изображения не прописаны в 12 файлах шаблонов руками: их около полутора
 * сотен, и любая правка набора превратилась бы в ручную перестановку ссылок.
 * Вместо этого пустые медиа-поля заполняются по порядку из набора графики
 * шаблона (см. ./art.ts). Если в шаблоне поле всё-таки задано, оно побеждает.
 */
function withTemplateArt(blocks: Block[], artKey: string): Block[] {
  const next = { frame: 0, tile: 0, portrait: 0 };
  const pick = (kind: keyof typeof next, total: number): string => {
    const index = (next[kind] % total) + 1;
    next[kind] += 1;
    return templateArtId(artKey, `${kind}-${index}` as TemplateArtName);
  };

  // `Block` не размеченное объединение: тип блока лежит рядом с данными, а не
  // внутри них, поэтому сузить `data` проверкой `block.type` нельзя — приводим
  // тип явно в каждой ветке.
  return blocks.map((block) => {
    if (block.type === "hero") {
      const data = block.data as BlockDataOf<"hero">;
      if (data.imageMediaId) return block;
      return { ...block, data: { ...data, imageMediaId: templateArtId(artKey, "hero") } };
    }

    if (block.type === "imageText") {
      const data = block.data as BlockDataOf<"imageText">;
      if (data.imageMediaId) return block;
      return { ...block, data: { ...data, imageMediaId: pick("frame", 3) } };
    }

    if (block.type === "gallery") {
      const data = block.data as BlockDataOf<"gallery">;
      return {
        ...block,
        data: {
          ...data,
          items: data.items.map((item) => ({
            ...item,
            imageMediaId: item.imageMediaId ?? pick("tile", 8),
          })),
        },
      };
    }

    if (block.type === "team") {
      const data = block.data as BlockDataOf<"team">;
      return {
        ...block,
        data: {
          ...data,
          members: data.members.map((member) => ({
            ...member,
            photoMediaId: member.photoMediaId ?? pick("portrait", 6),
          })),
        },
      };
    }

    return block;
  }) as Block[];
}

/** Обложка статьи шаблона: по порядку из набора cover-1…cover-4. */
export function templatePostCover(artKey: string, index: number): string {
  return templateArtId(artKey, `cover-${(index % 4) + 1}` as TemplateArtName);
}

export interface SiteTemplatePage {
  slug: string;
  isHomepage?: boolean;
  title: Tri;
  metaDesc: Tri;
  blocks: TemplateBlock[];
}

export interface SiteTemplateCategory {
  slug: string;
  name: Tri;
  description: Tri;
  order: number;
}

export interface SiteTemplatePost {
  slug: string;
  categorySlug: string;
  title: Tri;
  excerpt: Tri;
  blocks: TemplateBlock[];
}

export interface SiteTemplateMenuItem {
  location: "header" | "footer";
  label: Tri;
  /** Слаг страницы или рубрики этого же шаблона, либо готовый адрес для custom. */
  target: string;
  linkType: "page" | "category" | "custom";
  order: number;
}

export interface SiteTemplateSettings {
  siteName: Tri;
  tagline: Tri;
  contactEmail: string;
  contactPhone: string;
  contactAddress: Tri;
  footerNote: Tri;
}

/**
 * Оформление шаблона поверх темы — те же поля, что у экрана «Дизайн сайта».
 * Благодаря им два шаблона на близких палитрах всё равно выглядят по-разному:
 * у одного гротеск и острые углы, у другого антиква и крупные скругления.
 */
export interface SiteTemplateDesign {
  /** Ключ стиля оформления из src/blocks/palette.ts (см. src/styles/skins.css). */
  skin?: string;
  fontDisplay?: string;
  fontBody?: string;
  radiusScale?: "none" | "sm" | "md" | "lg" | "full";
}

export interface SiteTemplate {
  key: string;
  label: Tri;
  /** Чем занимается демо-бизнес — показывается на карточке шаблона. */
  profile: Tri;
  description: Tri;
  themeKey: ThemeKey;
  design?: SiteTemplateDesign;
  settings: SiteTemplateSettings;
  pages: SiteTemplatePage[];
  categories: SiteTemplateCategory[];
  posts: SiteTemplatePost[];
  menu: SiteTemplateMenuItem[];
}

// ---------------------------------------------------------------------------
// Конструкторы блоков. Нужны только чтобы файлы шаблонов оставались читаемыми:
// содержательная часть в них должна быть видна без обёрток из служебных полей.
// ---------------------------------------------------------------------------

export const B = {
  hero(
    id: string,
    o: {
      heading: Tri;
      subheading: Tri;
      ctaLabel?: Tri;
      ctaLink?: string;
      variant?: "centered" | "split" | "fullBleed";
      overlayOpacity?: number;
    },
  ): TemplateBlock {
    return {
      id,
      type: "hero",
      data: {
        heading: o.heading,
        subheading: o.subheading,
        imageMediaId: null,
        ctaLabel: o.ctaLabel ?? L("", "", ""),
        ctaLink: o.ctaLink ?? "",
        variant: o.variant ?? "split",
        overlayOpacity: o.overlayOpacity ?? 0.35,
      },
    };
  },

  richText(id: string, html: Tri): TemplateBlock {
    return { id, type: "richText", data: { html } };
  },

  imageText(
    id: string,
    o: {
      heading: Tri;
      body: Tri;
      imageSide?: "left" | "right";
      ctaLabel?: Tri;
      ctaLink?: string;
    },
  ): TemplateBlock {
    return {
      id,
      type: "imageText",
      data: {
        imageMediaId: null,
        heading: o.heading,
        body: o.body,
        imageSide: o.imageSide ?? "right",
        ctaLabel: o.ctaLabel ?? L("", "", ""),
        ctaLink: o.ctaLink ?? "",
      },
    };
  },

  gallery(id: string, captions: Tri[], columns: 2 | 3 | 4 = 3): TemplateBlock {
    return {
      id,
      type: "gallery",
      data: {
        items: captions.map((caption) => ({ imageMediaId: null, caption })),
        columns,
      },
    };
  },

  features(
    id: string,
    heading: Tri,
    items: { icon: string; title: Tri; body: Tri }[],
    columns: 2 | 3 | 4 = 3,
  ): TemplateBlock {
    return { id, type: "featuresGrid", data: { heading, items, columns } };
  },

  cta(
    id: string,
    o: { heading: Tri; body: Tri; buttonLabel: Tri; buttonLink: string; style?: "solid" | "outline" },
  ): TemplateBlock {
    return {
      id,
      type: "cta",
      data: {
        heading: o.heading,
        body: o.body,
        buttonLabel: o.buttonLabel,
        buttonLink: o.buttonLink,
        style: o.style ?? "solid",
      },
    };
  },

  testimonials(
    id: string,
    heading: Tri,
    items: { quote: Tri; authorName: Tri; authorRole: Tri }[],
  ): TemplateBlock {
    return {
      id,
      type: "testimonials",
      data: {
        heading,
        items: items.map((item) => ({ ...item, avatarMediaId: null })),
      },
    };
  },

  pricing(
    id: string,
    heading: Tri,
    plans: {
      name: Tri;
      price: Tri;
      period: Tri;
      features: Tri[];
      highlighted?: boolean;
      ctaLabel: Tri;
      ctaLink: string;
    }[],
  ): TemplateBlock {
    return {
      id,
      type: "pricing",
      data: {
        heading,
        plans: plans.map((plan) => ({ ...plan, highlighted: plan.highlighted ?? false })),
      },
    };
  },

  team(
    id: string,
    heading: Tri,
    members: { name: Tri; role: Tri; bio: Tri }[],
  ): TemplateBlock {
    return {
      id,
      type: "team",
      data: { heading, members: members.map((m) => ({ ...m, photoMediaId: null })) },
    };
  },

  stats(id: string, items: { value: Tri; label: Tri }[]): TemplateBlock {
    return { id, type: "stats", data: { items } };
  },

  faq(id: string, heading: Tri, items: { question: Tri; answer: Tri }[]): TemplateBlock {
    return { id, type: "faq", data: { heading, items } };
  },

  contactForm(
    id: string,
    o: {
      heading: Tri;
      submitLabel: Tri;
      successMessage: Tri;
      fields?: { type: "text" | "email" | "tel" | "textarea"; label: Tri; required?: boolean }[];
    },
  ): TemplateBlock {
    const fields =
      o.fields ??
      [
        { type: "text" as const, label: L("Имя", "Ism", "Name"), required: true },
        { type: "tel" as const, label: L("Телефон", "Telefon", "Phone"), required: true },
        { type: "textarea" as const, label: L("Сообщение", "Xabar", "Message"), required: false },
      ];
    return {
      id,
      type: "contactForm",
      data: {
        heading: o.heading,
        fields: fields.map((f) => ({ ...f, required: f.required ?? true })),
        submitLabel: o.submitLabel,
        successMessage: o.successMessage,
      },
    };
  },

  videoEmbed(id: string, url: string, caption: Tri): TemplateBlock {
    return { id, type: "videoEmbed", data: { url, caption } };
  },
};

/** Стандартный «текстовый» блок статьи из нескольких абзацев. */
export function paragraphs(...items: Tri[]): Tri {
  return {
    ru: items.map((p) => `<p>${p.ru}</p>`).join(""),
    uz: items.map((p) => `<p>${p.uz}</p>`).join(""),
    en: items.map((p) => `<p>${p.en}</p>`).join(""),
  };
}
