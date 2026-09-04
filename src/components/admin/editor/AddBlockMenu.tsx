"use client";

import { BLOCK_TYPES, BLOCK_LABELS, type BlockType } from "@/blocks/types";

const DESCRIPTIONS: Record<BlockType, string> = {
  hero: "Крупная обложка с заголовком и кнопкой",
  richText: "Свободный текст с форматированием",
  imageText: "Изображение рядом с текстом",
  gallery: "Сетка фотографий",
  featuresGrid: "Карточки с иконкой, заголовком и текстом",
  cta: "Акцентная плашка с призывом к действию",
  testimonials: "Отзывы клиентов",
  pricing: "Карточки тарифов/цен",
  team: "Карточки участников команды",
  stats: "Крупные цифры-показатели",
  faq: "Раскрывающиеся вопросы и ответы",
  contactForm: "Форма для заявок/обращений",
  logosStrip: "Ряд логотипов партнёров/клиентов",
  videoEmbed: "Видео с YouTube или Vimeo",
};

export function AddBlockMenu({
  onPick,
  onClose,
}: {
  onPick: (type: BlockType) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-6" onClick={onClose}>
      <div
        className="max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-surface p-5 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-ink">Добавить блок</h2>
          <button type="button" onClick={onClose} className="rounded-md p-1.5 text-muted hover:bg-paper">
            ✕
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {BLOCK_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => onPick(type)}
              className="rounded-md border border-border p-3 text-left transition hover:border-accent hover:bg-accent-tint"
            >
              <div className="text-sm font-medium text-ink">{BLOCK_LABELS[type]}</div>
              <div className="mt-1 text-xs text-muted">{DESCRIPTIONS[type]}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
