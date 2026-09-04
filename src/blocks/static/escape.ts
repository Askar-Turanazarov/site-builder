/** Escapes text for safe interpolation into the static-export HTML strings. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Escapes an attribute value (href/src). */
export function escapeAttr(value: string): string {
  return escapeHtml(value);
}
