import * as React from "react";

/**
 * Обёртка над React `<ViewTransition>` — переходами между страницами.
 *
 * ЗАЧЕМ ОБЁРТКА, А НЕ ПРЯМОЙ ИМПОРТ. Компонент есть в той сборке React,
 * которую Next везёт с собой для App Router (19.3-canary), но его нет ни в
 * установленном пакете `react` 19.2, ни в `@types/react` 19.2. Прямой импорт
 * `import { ViewTransition } from "react"` не прошёл бы проверку типов, а при
 * смене версии Next мог бы молча исчезнуть в рантайме.
 *
 * Поэтому компонент берётся из React осторожно, а если его там нет — обёртка
 * просто отдаёт содержимое как есть. Переходы в этом случае не анимируются,
 * но ничего не ломается: ровно так же ведут себя браузеры без поддержки
 * View Transitions API.
 */

export interface TransitionProps {
  children: React.ReactNode;
  /** Общее имя на обеих страницах — по нему ищется пара для морфинга. */
  name?: string;
  /** Класс анимации для пары «старое → новое». */
  share?: string;
  enter?: string | Record<string, string>;
  exit?: string | Record<string, string>;
  /** "none" — не анимировать этот узел при посторонних переходах. */
  default?: string;
}

const ReactViewTransition = (
  React as unknown as { ViewTransition?: React.ComponentType<TransitionProps> }
).ViewTransition;

export function Transition({ children, ...props }: TransitionProps) {
  if (!ReactViewTransition) return <>{children}</>;
  return <ReactViewTransition {...props}>{children}</ReactViewTransition>;
}

/** Переходы «вглубь» и «назад» — направление задаётся ссылкой. */
export const NAV_FORWARD = "sg-forward";
export const NAV_BACK = "sg-back";

/**
 * Раскладка направленных переходов. `default: "none"` обязателен: без него
 * узел дёргался бы на каждом постороннем переходе, включая кнопку «назад»
 * в браузере и обновление данных.
 */
export const NAV_TRANSITION = {
  enter: { [NAV_FORWARD]: NAV_FORWARD, [NAV_BACK]: NAV_BACK, default: "none" },
  exit: { [NAV_FORWARD]: NAV_FORWARD, [NAV_BACK]: NAV_BACK, default: "none" },
  default: "none",
} as const;
