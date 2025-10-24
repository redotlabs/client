import type { StateUpdater } from './types';
import type { BuilderBlock } from '@/shared/types';
import type { EditorMode } from '@/core/actions';

/**
 * Block Updaters
 */
export const addBlock =
  (block: BuilderBlock): StateUpdater =>
  (state) => ({
    ...state,
    blocks: new Map(state.blocks).set(block.id, block),
  });

export const removeBlock =
  (blockId: string): StateUpdater =>
  (state) => {
    const newBlocks = new Map(state.blocks);
    newBlocks.delete(blockId);
    return {
      ...state,
      blocks: newBlocks,
    };
  };

export const updateBlock =
  (blockId: string, updates: Partial<BuilderBlock>): StateUpdater =>
  (state) => {
    const block = state.blocks.get(blockId);
    if (!block) return state;

    return {
      ...state,
      blocks: new Map(state.blocks).set(blockId, { ...block, ...updates }),
    };
  };

/**
 * Selection Updaters
 */
export const selectBlock =
  (blockId: string, multiSelect = false): StateUpdater =>
  (state) => {
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

export const deselectBlock =
  (blockId?: string): StateUpdater =>
  (state) => {
    if (!blockId) {
      // 전체 선택 해제
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
