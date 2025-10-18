import type { BuilderBlock, GridConfig } from "@/shared/types/blocks";

export interface EditorData {
  grid: GridConfig;
  blocks: BuilderBlock[];
  metadata?: {
    version: string;
    lastModified: string;
    title?: string;
    description?: string;
  };
}
