import sanitizeHtml from "sanitize-html";
import type { Block } from "./types";

/**
 * Очистка HTML, который приходит из редактора.
 *
 * Два поля блоков попадают в `dangerouslySetInnerHTML`: текст блока «Текст» и
 * ответ в блоке «Вопрос-ответ». Редактор TipTap сам по себе выдаёт безопасную
 * разметку, но вставка из буфера обмена приносит чужой HTML как есть, и он
 * уедет и на живой сайт, и в выгруженную статику. Поэтому на записи оставляем
 * ровно те теги, которые редактор умеет создавать, — всё остальное вырезаем.
 *
 * Чистим при сохранении, а не при показе: страницу читают на порядок чаще,
 * чем правят, и хранить в базе уже безопасное значение надёжнее.
 */
const OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: ["p", "br", "strong", "b", "em", "i", "u", "s", "a", "ul", "ol", "li", "h2", "h3", "blockquote", "code"],
  allowedAttributes: {
    a: ["href", "title", "target", "rel"],
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  // Ссылка, открывающаяся в новой вкладке, без rel даёт доступ к странице
  // через window.opener.
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }),
  },
  disallowedTagsMode: "discard",
};

export function sanitizeRichHtml(html: string): string {
  return sanitizeHtml(html, OPTIONS);
}

/** Прогоняет через очистку все HTML-поля дерева блоков. */
export function sanitizeBlocks(blocks: Block[]): Block[] {
  return blocks.map((block) => {
    if (block.type === "richText") {
      const data = block.data as { html: string };
      return { ...block, data: { ...data, html: sanitizeRichHtml(data.html) } };
    }
    if (block.type === "faq") {
      const data = block.data as { heading: string; items: { question: string; answer: string }[] };
      return {
        ...block,
        data: {
          ...data,
          items: data.items.map((item) => ({ ...item, answer: sanitizeRichHtml(item.answer) })),
        },
      };
    }
    return block;
  }) as Block[];
}
