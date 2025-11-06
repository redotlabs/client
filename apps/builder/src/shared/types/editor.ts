import type { Section } from "@/shared/types/section";
import type { GridConfig } from "@/shared/types/blocks";

export interface EditorData {
  gridConfig: GridConfig;
  sections: Section[];
  metadata?: {
    version: string;
    lastModified: string;
    title?: string;
    description?: string;
  };
}
