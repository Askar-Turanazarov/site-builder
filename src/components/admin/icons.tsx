import type { SVGProps } from "react";

/**
 * Minimal 20x20 stroke icon set for the admin shell.
 * Kept hand-authored and consistent (1.5px stroke, rounded caps) rather than
 * pulling in a full icon library for a handful of nav glyphs.
 */
function Icon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    />
  );
}

export const IconDashboard = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <rect x="2.5" y="2.5" width="6.5" height="6.5" rx="1.3" />
    <rect x="11" y="2.5" width="6.5" height="4" rx="1.3" />
    <rect x="11" y="8.5" width="6.5" height="9" rx="1.3" />
    <rect x="2.5" y="11" width="6.5" height="6.5" rx="1.3" />
  </Icon>
);

export const IconPages = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M5 2.5h7L17 6v11.5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-14a1 1 0 0 1 1-1Z" />
    <path d="M12 2.5V6h4.5" />
    <path d="M6.5 10h7M6.5 13h7M6.5 16h4" />
  </Icon>
);

export const IconPosts = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <rect x="2.5" y="4" width="12" height="13.5" rx="1" />
    <path d="M15 7.5h2.5v8a1.8 1.8 0 0 1-1.8 1.8H15" />
    <path d="M5.5 7.5h6M5.5 10.5h6M5.5 13.5h4" />
  </Icon>
);

export const IconCategories = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M3 4.5A1.5 1.5 0 0 1 4.5 3h4.1a1.5 1.5 0 0 1 1.06.44l7.5 7.5a1.5 1.5 0 0 1 0 2.12l-4.6 4.6a1.5 1.5 0 0 1-2.12 0l-7.5-7.5A1.5 1.5 0 0 1 3 9.1V4.5Z" />
    <circle cx="7" cy="7.5" r="1.1" />
  </Icon>
);

export const IconMedia = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <rect x="2.5" y="3.5" width="15" height="13" rx="1.3" />
    <circle cx="7" cy="8" r="1.4" />
    <path d="M3 15.5 7.8 11a1.4 1.4 0 0 1 1.9-.05L12 13.2l1.7-1.7a1.4 1.4 0 0 1 1.95 0L17.5 13.5" />
  </Icon>
);

export const IconMenu = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M3 5.5h14M3 10h14M3 14.5h9" />
  </Icon>
);

export const IconDictionary = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <circle cx="10" cy="10" r="7.5" />
    <path d="M2.5 10h15M10 2.5c1.9 2 2.9 4.8 2.9 7.5s-1 5.5-2.9 7.5c-1.9-2-2.9-4.8-2.9-7.5S8.1 4.5 10 2.5Z" />
  </Icon>
);

export const IconSettings = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <circle cx="10" cy="10" r="2.6" />
    <path d="M10 2.7v2M10 15.3v2M17.3 10h-2M4.7 10h-2M15.2 4.8l-1.4 1.4M6.2 13.8l-1.4 1.4M15.2 15.2l-1.4-1.4M6.2 6.2 4.8 4.8" />
  </Icon>
);

export const IconExport = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M10 2.5v10.3M6.2 9l3.8 3.8L13.8 9" />
    <path d="M3.5 14v2.3a1.2 1.2 0 0 0 1.2 1.2h10.6a1.2 1.2 0 0 0 1.2-1.2V14" />
  </Icon>
);

export const IconTemplates = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <rect x="2.5" y="2.5" width="15" height="15" rx="1.4" />
    <path d="M2.5 7h15M7.5 7v10.5" />
  </Icon>
);

export const IconDesign = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <circle cx="10" cy="10" r="7.5" />
    <path d="M10 2.5v15M2.5 10h15" />
    <circle cx="10" cy="10" r="2.6" />
  </Icon>
);

export const IconLogout = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M8 17.5H4.7a1.2 1.2 0 0 1-1.2-1.2V3.7a1.2 1.2 0 0 1 1.2-1.2H8" />
    <path d="M13 14l4-4-4-4M17 10H7.5" />
  </Icon>
);
