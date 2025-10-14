import type { GridConfig } from '@/app/types';
import { BlockRenderer } from '@/app/utils/blockRenderer';

export const createBlockRenderer = (gridConfig: GridConfig): BlockRenderer => {
  return new BlockRenderer(gridConfig);
};
