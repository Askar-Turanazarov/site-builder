import type { PageTemplate } from "../types";

export const standardArticleTemplate: PageTemplate = {
  key: "article-standard",
  labelRu: "Стандартный",
  labelUz: "Standart",
  labelEn: "Standard",
  titleRu: "Заголовок статьи",
  titleUz: "Maqola sarlavhasi",
  titleEn: "Article title",

  blocksRu: [
    {
      id: "intro",
      type: "richText",
      data: {
        html: "<p>Начните с абзаца, который объясняет, о чём статья и почему это важно читателю прямо сейчас.</p>",
      },
    },
    {
      id: "image",
      type: "imageText",
      data: {
        imageMediaId: null,
        heading: "Подзаголовок раздела",
        body: "Раскройте одну конкретную мысль или деталь истории — с примером, цифрой или цитатой, если это уместно.",
        imageSide: "right",
        ctaLabel: "",
        ctaLink: "",
      },
    },
    {
      id: "outro",
      type: "richText",
      data: {
        html: "<p>Завершите статью выводом или следующим шагом для читателя — что сделать, куда посмотреть, о чём подумать.</p>",
      },
    },
  ],

  blocksUz: [
    {
      id: "intro",
      type: "richText",
      data: {
        html: "<p>Maqola nima haqida ekanini va bu nima uchun o'quvchiga hozir muhimligini tushuntiruvchi abzatsdan boshlang.</p>",
      },
    },
    {
      id: "image",
      type: "imageText",
      data: {
        imageMediaId: null,
        heading: "Bo'lim sarlavhasi",
        body: "Bitta aniq fikr yoki hikoya detalini oching — agar mos bo'lsa, misol, raqam yoki iqtibos bilan.",
        imageSide: "right",
        ctaLabel: "",
        ctaLink: "",
      },
    },
    {
      id: "outro",
      type: "richText",
      data: {
        html: "<p>Maqolani xulosa yoki o'quvchi uchun keyingi qadam bilan yakunlang — nima qilish kerak, qayerga qarash kerak, nima haqida o'ylash kerak.</p>",
      },
    },
  ],

  blocksEn: [
    {
      id: "intro",
      type: "richText",
      data: {
        html: "<p>Open with a paragraph that explains what this piece is about and why it matters to the reader right now.</p>",
      },
    },
    {
      id: "image",
      type: "imageText",
      data: {
        imageMediaId: null,
        heading: "Section subheading",
        body: "Unpack one specific idea or detail of the story — with an example, a number, or a quote if it fits.",
        imageSide: "right",
        ctaLabel: "",
        ctaLink: "",
      },
    },
    {
      id: "outro",
      type: "richText",
      data: {
        html: "<p>Close with a takeaway or a next step for the reader — what to do, where to look, what to think about.</p>",
      },
    },
  ],
};
