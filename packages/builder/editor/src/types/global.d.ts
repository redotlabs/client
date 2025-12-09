import type { BlockTemplate } from '@/core/blocks';

declare global {
  interface Window {
    __draggedTemplate?: BlockTemplate;
  }
}

export {};
