/**
 * Curated 24x24 stroke-icon set for FeaturesGrid blocks (referenced by key
 * in block data, e.g. data.items[i].icon === "shield"). Each value is the
 * inner SVG markup only — both the live component and the static-export
 * generator wrap it in an identical <svg> shell, so the two stay pixel
 * identical from one source. Deliberately not emoji: this project's design
 * baseline calls for a real icon system, not platform-inconsistent glyphs.
 */
export const FEATURE_ICONS: Record<string, string> = {
  spark:
    '<path d="M12 2.5 13.8 9 20 12l-6.2 3 -1.8 6.5L10.2 15 4 12l6.2-3Z"/>',
  shield:
    '<path d="M12 2.7 19.5 6v6c0 5-3.2 8-7.5 9.3C7.7 20 4.5 17 4.5 12V6Z"/><path d="m9 12 2 2 4-4.2"/>',
  rocket:
    '<path d="M14.5 3.5c3.2.3 5 2.1 5.3 5.3.3 3.3-2.3 7.3-5.3 9.7l-3.7-3.7c2.4-3 6.4-5.6 9.7-5.3"/><path d="M9.5 14.5 4 16l1.5-5.5"/><circle cx="15" cy="9" r="1.6"/><path d="M8 16c0 2-1.5 3.5-4 3.5 0-2.5 1.5-4 4-4"/>',
  heart:
    '<path d="M12 20.2s-7-4.4-9.2-8.6C1.3 8.6 2.7 5 6 4.3c2-.4 3.7.5 5 2.2 1.3-1.7 3-2.6 5-2.2 3.3.7 4.7 4.3 3.2 7.3C19 15.8 12 20.2 12 20.2Z"/>',
  chart:
    '<path d="M4 20V4M4 20h16"/><rect x="7" y="12" width="3" height="6"/><rect x="12.5" y="8" width="3" height="10"/><rect x="18" y="14.5" width="0" height="0"/><rect x="16" y="5" width="3" height="13"/>',
  users:
    '<circle cx="9" cy="8" r="3"/><path d="M3.5 19c.5-3.3 2.7-5 5.5-5s5 1.7 5.5 5"/><circle cx="17" cy="9" r="2.3"/><path d="M15.8 14c2.3.2 3.8 1.7 4.2 4.3"/>',
  clock:
    '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3.2 2"/>',
  check:
    '<circle cx="12" cy="12" r="8.5"/><path d="m8.3 12.3 2.5 2.5 5-5.2"/>',
  star:
    '<path d="m12 3 2.6 5.8 6.3.7-4.7 4.3 1.3 6.2L12 16.9l-5.5 3.1 1.3-6.2-4.7-4.3 6.3-.7Z"/>',
  gift:
    '<rect x="4" y="9.5" width="16" height="10.5" rx="1"/><path d="M4 13h16M12 9.5V20"/><path d="M12 9.5c-1-3-3-4.3-4.3-3.6-1.2.6-.7 3 1 3.6M12 9.5c1-3 3-4.3 4.3-3.6 1.2.6.7 3-1 3.6"/>',
  leaf:
    '<path d="M19.5 4.5c.6 7-3 13-11.7 14.8C7 12 11.5 6.4 19.5 4.5Z"/><path d="M5 19c1-3.3 2.7-6 5-8"/>',
  globe:
    '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.3 2.3 3.5 5.3 3.5 8.5s-1.2 6.2-3.5 8.5c-2.3-2.3-3.5-5.3-3.5-8.5S9.7 5.8 12 3.5Z"/>',
  message:
    '<path d="M4 5.5h16v11H9.5L5 20.5v-4H4Z"/>',
};

export const FEATURE_ICON_KEYS = Object.keys(FEATURE_ICONS);
