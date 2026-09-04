import type { PageTemplate } from "../types";

export const longformArticleTemplate: PageTemplate = {
  key: "article-longform",
  labelRu: "Лонгрид",
  labelUz: "Longrid",
  labelEn: "Longform",
  titleRu: "Заголовок статьи",
  titleUz: "Maqola sarlavhasi",
  titleEn: "Article title",

  blocksRu: [
    {
      id: "part1",
      type: "richText",
      data: {
        html: "<p>Начните с завязки — ситуации, вопроса или проблемы, которую раскрывает статья. Дайте читателю причину дочитать до конца.</p><h2>Первый раздел</h2><p>Разверните первую часть истории или аргумента.</p>",
      },
    },
    {
      id: "stats",
      type: "stats",
      data: {
        items: [
          { value: "—", label: "ключевая цифра 1" },
          { value: "—", label: "ключевая цифра 2" },
          { value: "—", label: "ключевая цифра 3" },
        ],
      },
    },
    {
      id: "part2",
      type: "richText",
      data: {
        html: "<h2>Второй раздел</h2><p>Продолжите повествование, добавьте детали, примеры или мнение эксперта.</p><p>Завершите статью выводом, который читатель унесёт с собой.</p>",
      },
    },
  ],

  blocksUz: [
    {
      id: "part1",
      type: "richText",
      data: {
        html: "<p>Kirish qismidan boshlang — maqola ochib beradigan vaziyat, savol yoki muammo. O'quvchiga oxirigacha o'qish uchun sabab bering.</p><h2>Birinchi bo'lim</h2><p>Hikoya yoki dalilning birinchi qismini yoying.</p>",
      },
    },
    {
      id: "stats",
      type: "stats",
      data: {
        items: [
          { value: "—", label: "1-asosiy raqam" },
          { value: "—", label: "2-asosiy raqam" },
          { value: "—", label: "3-asosiy raqam" },
        ],
      },
    },
    {
      id: "part2",
      type: "richText",
      data: {
        html: "<h2>Ikkinchi bo'lim</h2><p>Hikoyani davom ettiring, detallar, misollar yoki ekspert fikrini qo'shing.</p><p>Maqolani o'quvchi o'zi bilan olib ketadigan xulosa bilan yakunlang.</p>",
      },
    },
  ],

  blocksEn: [
    {
      id: "part1",
      type: "richText",
      data: {
        html: "<p>Open with the hook — the situation, question, or problem this piece unpacks. Give the reader a reason to keep going.</p><h2>First section</h2><p>Develop the first part of the story or argument.</p>",
      },
    },
    {
      id: "stats",
      type: "stats",
      data: {
        items: [
          { value: "—", label: "key figure 1" },
          { value: "—", label: "key figure 2" },
          { value: "—", label: "key figure 3" },
        ],
      },
    },
    {
      id: "part2",
      type: "richText",
      data: {
        html: "<h2>Second section</h2><p>Continue the narrative, add detail, examples, or expert opinion.</p><p>Close with a takeaway the reader leaves with.</p>",
      },
    },
  ],
};
