import type { EditorState } from './types';
import type { BuilderBlock, BlockPosition, BlockSize } from '@/shared/types';

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

export const setDraggingState = (
  state: EditorState,
  isDragging: boolean
): EditorState => {
  return {
    ...state,
    ui: {
      ...state.ui,
      isDragging,
    },
  };
};
