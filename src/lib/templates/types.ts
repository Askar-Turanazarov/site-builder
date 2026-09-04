import type { Block } from "@/blocks/types";

export interface PageTemplate {
  key: string;
  labelRu: string;
  labelUz: string;
  labelEn: string;
  titleRu: string;
  titleUz: string;
  titleEn: string;
  blocksRu: Block[];
  blocksUz: Block[];
  blocksEn: Block[];
}
