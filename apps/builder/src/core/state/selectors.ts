import type { EditorState, StateSelector } from './types';
import type { BuilderBlock } from '@/shared/types';

/**
 * Block Selectors
 */
export const getBlock: (blockId: string) => StateSelector<BuilderBlock | undefined> =
  (blockId) => (state) =>
    state.blocks.get(blockId);

export const getAllBlocks: StateSelector<BuilderBlock[]> = (state) =>
  Array.from(state.blocks.values());

export const getBlockCount: StateSelector<number> = (state) =>
  state.blocks.size;

/**
 * Selection Selectors
 */
export const getSelectedBlockIds: StateSelector<string[]> = (state) =>
  Array.from(state.selection.selectedBlockIds);

export const getSelectedBlocks: StateSelector<BuilderBlock[]> = (state) => {
  const selectedIds = state.selection.selectedBlockIds;
  return Array.from(selectedIds)
    .map((id) => state.blocks.get(id))
    .filter((block): block is BuilderBlock => block !== undefined);
};

export const isBlockSelected: (blockId: string) => StateSelector<boolean> =
  (blockId) => (state) =>
    state.selection.selectedBlockIds.has(blockId);

export const getSelectionCount: StateSelector<number> = (state) =>
  state.selection.selectedBlockIds.size;


/**
 * Grid Selectors
 */
export const getGridConfig: StateSelector<EditorState['gridConfig']> = (
  state
) => state.gridConfig;
