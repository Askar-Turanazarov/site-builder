import type { AdminDict, AdminT } from "@/lib/admin-i18n";
import type { BlockType, FieldSpec } from "./types";

/**
 * Подписи блоков и их полей для интерфейса редактора.
 *
 * Ключи собираются динамически (`block.hero.label`, `field.hero.imageMediaId`),
 * поэтому здесь используется приведение типа: `adminT` возвращает сам ключ,
 * если перевода нет, и по этому признаку выбирается запасной вариант.
 * Так частичный словарь не приводит к пустым подписям.
 */
function lookup(t: AdminT, key: string): string | null {
  const value = t(key as keyof AdminDict);
  return value === key ? null : value;
}

export function blockLabel(t: AdminT, type: BlockType): string {
  return lookup(t, `block.${type}.label`) ?? type;
}

export function blockDescription(t: AdminT, type: BlockType): string {
  return lookup(t, `block.${type}.desc`) ?? "";
}

/**
 * Подпись поля: сначала уточнение для конкретного блока (у одного и того же
 * `imageMediaId` в Hero это «Фоновое изображение», а в галерее — «Файл»),
 * затем общий перевод по имени поля, затем русская подпись из спецификации.
 */
export function fieldLabel(t: AdminT, blockType: BlockType, spec: FieldSpec): string {
  return (
    lookup(t, `field.${blockType}.${spec.name}`) ??
    lookup(t, `field.${spec.name}`) ??
    spec.label
  );
}

/** Подпись элемента повторяющегося списка («Отзыв 2», «Тариф 1»). */
export function repeatableItemLabel(t: AdminT, blockType: BlockType, spec: FieldSpec): string {
  if (spec.kind !== "repeatable") return "";
  return (
    lookup(t, `item.${blockType}.${spec.name}`) ??
    lookup(t, `item.${spec.name}`) ??
    spec.itemLabel
  );
}
