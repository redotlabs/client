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
 * Preview Selectors
 */
export const isDragging: StateSelector<boolean> = (state) =>
  state.preview.isDragging;

export const isResizing: StateSelector<boolean> = (state) =>
  state.preview.isResizing;

export const getPreviewBlock: (
  blockId: string
) => StateSelector<Partial<BuilderBlock> | undefined> = (blockId) => (state) =>
  state.preview.previewBlocks.get(blockId);

/**
 * Mode Selectors
 */
export const getEditorMode: StateSelector<EditorState['mode']> = (state) =>
  state.mode;

export const isEditable: StateSelector<boolean> = (state) =>
  state.mode === 'edit';

export const isReadonly: StateSelector<boolean> = (state) =>
  state.mode === 'readonly';

/**
 * Grid Selectors
 */
export const getGridConfig: StateSelector<EditorState['gridConfig']> = (
  state
) => state.gridConfig;
