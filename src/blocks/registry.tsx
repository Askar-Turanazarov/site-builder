import { createElement, Fragment, type ReactElement } from "react";
import type { Block, BlockType, BlockDataOf } from "./types";
import type { RenderContext } from "./context";

import { HeroBlock } from "./components/Hero";
import { heroToHtml } from "./static/hero";
import { RichTextBlock } from "./components/RichText";
import { richTextToHtml } from "./static/richText";
import { ImageTextBlock } from "./components/ImageText";
import { imageTextToHtml } from "./static/imageText";
import { GalleryBlock } from "./components/Gallery";
import { galleryToHtml } from "./static/gallery";
import { FeaturesGridBlock } from "./components/FeaturesGrid";
import { featuresGridToHtml } from "./static/featuresGrid";
import { CtaBlock } from "./components/Cta";
import { ctaToHtml } from "./static/cta";
import { TestimonialsBlock } from "./components/Testimonials";
import { testimonialsToHtml } from "./static/testimonials";
import { PricingBlock } from "./components/Pricing";
import { pricingToHtml } from "./static/pricing";
import { TeamBlock } from "./components/Team";
import { teamToHtml } from "./static/team";
import { StatsBlock } from "./components/Stats";
import { statsToHtml } from "./static/stats";
import { FaqBlock } from "./components/Faq";
import { faqToHtml } from "./static/faq";
import { ContactFormBlock } from "./components/ContactForm";
import { contactFormToHtml } from "./static/contactForm";
import { LogosStripBlock } from "./components/LogosStrip";
import { logosStripToHtml } from "./static/logosStrip";
import { VideoEmbedBlock } from "./components/VideoEmbed";
import { videoEmbedToHtml } from "./static/videoEmbed";

interface RegistryEntry<T extends BlockType> {
  Component: (props: { data: BlockDataOf<T>; ctx: RenderContext }) => ReactElement | null;
  toHtml: (data: BlockDataOf<T>, ctx: RenderContext) => string;
}

type Registry = { [K in BlockType]: RegistryEntry<K> };

export const BLOCK_REGISTRY: Registry = {
  hero: { Component: HeroBlock, toHtml: heroToHtml },
  richText: { Component: RichTextBlock, toHtml: richTextToHtml },
  imageText: { Component: ImageTextBlock, toHtml: imageTextToHtml },
  gallery: { Component: GalleryBlock, toHtml: galleryToHtml },
  featuresGrid: { Component: FeaturesGridBlock, toHtml: featuresGridToHtml },
  cta: { Component: CtaBlock, toHtml: ctaToHtml },
  testimonials: { Component: TestimonialsBlock, toHtml: testimonialsToHtml },
  pricing: { Component: PricingBlock, toHtml: pricingToHtml },
  team: { Component: TeamBlock, toHtml: teamToHtml },
  stats: { Component: StatsBlock, toHtml: statsToHtml },
  faq: { Component: FaqBlock, toHtml: faqToHtml },
  contactForm: { Component: ContactFormBlock, toHtml: contactFormToHtml },
  logosStrip: { Component: LogosStripBlock, toHtml: logosStripToHtml },
  videoEmbed: { Component: VideoEmbedBlock, toHtml: videoEmbedToHtml },
};

/**
 * Renders a single Block via its registered live component.
 * Uses createElement (not a direct function call) so each block mounts as
 * its own Fiber — required for blocks like ContactForm that call hooks
 * internally; calling `Component(props)` directly would attribute those
 * hooks to the caller's fiber instead and break the rules of hooks.
 */
export function renderBlock(block: Block, ctx: RenderContext): ReactElement | null {
  const entry = BLOCK_REGISTRY[block.type] as RegistryEntry<BlockType>;
  return createElement(entry.Component, { data: block.data, ctx });
}

/** Renders an ordered block list as React (used by the live Next.js site and the editor preview). */
export function BlockList({ blocks, ctx }: { blocks: Block[]; ctx: RenderContext }) {
  return (
    <>
      {blocks.map((block) => (
        <Fragment key={block.id}>{renderBlock(block, ctx)}</Fragment>
      ))}
    </>
  );
}

/** Renders an ordered block list to static HTML (used by the export pipeline). */
export function blockListToHtml(blocks: Block[], ctx: RenderContext): string {
  return blocks
    .map((block) => {
      const entry = BLOCK_REGISTRY[block.type] as RegistryEntry<BlockType>;
      return entry.toHtml(block.data, ctx);
    })
    .join("\n");
}
