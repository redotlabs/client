import type { GridConfig } from './blocks';
import type { Block } from './blocks';

export interface EditorData {
  grid: GridConfig;
  blocks: Block[];
  metadata?: {
    version: string;
    lastModified: string;
    title?: string;
    description?: string;
  };
}