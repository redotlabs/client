import type { GridConfig } from './blocks';
import type { Block } from './blocks';

// 전체 에디터 데이터 구조
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