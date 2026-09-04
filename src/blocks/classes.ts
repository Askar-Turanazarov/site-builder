/**
 * Shared Tailwind class strings for the public-site design system.
 *
 * These constants are imported by BOTH the live React block components
 * (src/blocks/components/*) and the pure-function static HTML generators
 * (src/blocks/static/*) used by the export pipeline, so the live site and
 * the exported static site render pixel-identical markup from one source
 * of truth. Never hardcode section/container/heading classes separately
 * in a component and its static counterpart — import from here.
 *
 * Section rhythm follows an 8px grid; palette comes from the CSS custom
 * properties defined per-template (see src/blocks/palette.ts), not from
 * literal Tailwind color utilities, so a template reskins by swapping ~5
 * CSS variables rather than editing every block.
 */

export const CX = {
  section: "py-16 md:py-24",
  container: "mx-auto max-w-6xl px-6",
  containerNarrow: "mx-auto max-w-3xl px-6",

  eyebrow: "text-sm font-semibold uppercase tracking-wide text-[var(--tpl-accent)]",
  h1: "[font-family:var(--tpl-font-display)] text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-tight text-[var(--tpl-ink)] text-balance",
  h2: "[font-family:var(--tpl-font-display)] text-3xl md:text-4xl font-bold leading-tight tracking-tight text-[var(--tpl-ink)] text-balance",
  h3: "[font-family:var(--tpl-font-display)] text-xl font-semibold text-[var(--tpl-ink)]",
  lead: "text-lg md:text-xl text-[var(--tpl-ink-soft)] leading-relaxed",
  body: "text-base text-[var(--tpl-ink-soft)] leading-relaxed",

  button:
    "inline-flex items-center justify-center rounded-[var(--tpl-radius)] px-6 py-3 text-sm font-semibold transition",
  buttonSolid: "bg-[var(--tpl-accent)] text-[var(--tpl-on-accent)] hover:opacity-90",
  buttonOutline:
    "border border-[var(--tpl-ink)]/20 text-[var(--tpl-ink)] hover:border-[var(--tpl-accent)] hover:text-[var(--tpl-accent)]",

  card: "rounded-[var(--tpl-radius)] border border-[var(--tpl-ink)]/10 bg-[var(--tpl-surface)] p-6 shadow-[var(--tpl-shadow)]",

  gridCols: {
    2: "grid grid-cols-1 gap-8 sm:grid-cols-2",
    3: "grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4",
  },
} as const;

/** Joins truthy class fragments — a minimal stand-in for `clsx`. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
