import type { EditorState, StateUpdater } from './types';
import type { BuilderBlock, BlockPosition, BlockSize } from '@/shared/types';
import type { EditorMode } from './types';

/**
 * Block Selection Updaters
 */
export const selectBlockState = (
  state: EditorState,
  blockId: string,
  multiSelect: boolean
): EditorState => {
  const selectedBlockIds = multiSelect
    ? new Set(state.selection.selectedBlockIds).add(blockId)
    : new Set([blockId]);

  return {
    ...state,
    selection: {
      selectedBlockIds,
      lastSelectedId: blockId,
    },
  };
};

export const deselectBlockState = (
  state: EditorState,
  blockId?: string
): EditorState => {
  if (!blockId) {
    return {
      ...state,
      selection: {
        selectedBlockIds: new Set(),
        lastSelectedId: null,
      },
    };
  }

  const selectedBlockIds = new Set(state.selection.selectedBlockIds);
  selectedBlockIds.delete(blockId);

  return {
    ...state,
    selection: {
      selectedBlockIds,
      lastSelectedId:
        state.selection.lastSelectedId === blockId
          ? null
          : state.selection.lastSelectedId,
    },
  };
};

/**
 * Block Movement & Resize Updaters
 */
export const moveBlockState = (
  state: EditorState,
  blockId: string,
  position: BlockPosition
): EditorState => {
  const block = state.blocks.get(blockId);
  if (!block) return state;

  const newBlocks = new Map(state.blocks);
  newBlocks.set(blockId, { ...block, position });

  return {
    ...state,
    blocks: newBlocks,
  };
};

export const resizeBlockState = (
  state: EditorState,
  blockId: string,
  size: BlockSize
): EditorState => {
  const block = state.blocks.get(blockId);
  if (!block) return state;

  const newBlocks = new Map(state.blocks);
  newBlocks.set(blockId, { ...block, size });

  return {
    ...state,
    blocks: newBlocks,
  };
};

/**
 * Block CRUD Updaters
 */
export const createBlockState = (
  state: EditorState,
  block: BuilderBlock
): EditorState => {
  const newBlocks = new Map(state.blocks);
  newBlocks.set(block.id, block);

  return {
    ...state,
    blocks: newBlocks,
  };
};

export const deleteBlockState = (
  state: EditorState,
  blockId: string
): EditorState => {
  const newBlocks = new Map(state.blocks);
  newBlocks.delete(blockId);

  // 선택도 제거
  const selectedBlockIds = new Set(state.selection.selectedBlockIds);
  selectedBlockIds.delete(blockId);

  return {
    ...state,
    blocks: newBlocks,
    selection: {
      selectedBlockIds,
      lastSelectedId:
        state.selection.lastSelectedId === blockId
          ? null
          : state.selection.lastSelectedId,
    },
  };
};

export const updateBlockState = (
  state: EditorState,
  blockId: string,
  updates: Omit<Partial<BuilderBlock>, 'id' | 'position' | 'size'>
): EditorState => {
  const block = state.blocks.get(blockId);
  if (!block) return state;

  const newBlocks = new Map(state.blocks);
  newBlocks.set(blockId, { ...block, ...updates });

  return {
    ...state,
    blocks: newBlocks,
  };
};

/**
 * Editor Mode Updater
 */
export const changeEditorModeState = (
  state: EditorState,
  mode: EditorMode
): EditorState => {
  return {
    ...state,
    mode,
  };
};

/**
 * Preview Updaters
 */
export const setPreviewBlock =
  (blockId: string, preview: Partial<BuilderBlock>): StateUpdater =>
  (state) => ({
    ...state,
    preview: {
      ...state.preview,
      previewBlocks: new Map(state.preview.previewBlocks).set(blockId, preview),
    },
  });

export const clearPreviewBlock =
  (blockId: string): StateUpdater =>
  (state) => {
    const previewBlocks = new Map(state.preview.previewBlocks);
    previewBlocks.delete(blockId);
    return {
      ...state,
      preview: {
        ...state.preview,
        previewBlocks,
      },
    };
  };

export const clearAllPreviews: StateUpdater = (state) => ({
  ...state,
  preview: {
    isDragging: false,
    isResizing: false,
    draggedBlockId: null,
    resizedBlockId: null,
    previewBlocks: new Map(),
  },
});

export const setDragging =
  (isDragging: boolean, blockId: string | null = null): StateUpdater =>
  (state) => ({
    ...state,
    preview: {
      ...state.preview,
      isDragging,
      draggedBlockId: blockId,
    },
  });

export const setResizing =
  (isResizing: boolean, blockId: string | null = null): StateUpdater =>
  (state) => ({
    ...state,
    preview: {
      ...state.preview,
      isResizing,
      resizedBlockId: blockId,
    },
  });

/**
 * Mode Updaters
 */
export const setEditorMode =
  (mode: EditorMode): StateUpdater =>
  (state) => ({
    ...state,
    mode,
  });
