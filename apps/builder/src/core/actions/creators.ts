import type {
  EditorAction,
  SectionCreateAction,
  SectionDeleteAction,
  SectionReorderAction,
  SectionUpdateAction,
  SectionSelectAction,
  BlockSelectAction,
  BlockDeselectAction,
  BlockMoveAction,
  BlockResizeAction,
  BlockCreateAction,
  BlockDeleteAction,
  BlockUpdateAction,
} from "./types";

/**
 * Base action creator helper
 */
function createAction<T extends EditorAction>(
  type: T["type"],
  payload: T["payload"]
): T {
  return {
    type,
    payload,
    timestamp: Date.now(),
  } as T;
}

// ============================================
// Section Action Creators
// ============================================

/**
 * Create a new section
 * - If section is provided, use it directly
 * - If section is undefined, the action handler will auto-generate name and order
 */
export const createSection = (
  section?: SectionCreateAction["payload"]["section"]
): SectionCreateAction =>
  createAction("section.create", { section });

export const deleteSection = (sectionId: string): SectionDeleteAction =>
  createAction("section.delete", { sectionId });

export const reorderSection = (
  sectionId: string,
  newOrder: number
): SectionReorderAction =>
  createAction("section.reorder", { sectionId, newOrder });

export const updateSection = (
  sectionId: string,
  updates: SectionUpdateAction["payload"]["updates"]
): SectionUpdateAction =>
  createAction("section.update", { sectionId, updates });

export const selectSection = (sectionId: string): SectionSelectAction =>
  createAction("section.select", { sectionId });

// ============================================
// Block Action Creators
// ============================================

export const selectBlock = (
  blockId: string,
  multiSelect = false
): BlockSelectAction => createAction("block.select", { blockId, multiSelect });

export const deselectBlock = (blockId?: string): BlockDeselectAction =>
  createAction("block.deselect", { blockId });

export const moveBlock = (
  blockId: string,
  position: BlockMoveAction["payload"]["position"]
): BlockMoveAction => createAction("block.move", { blockId, position });

export const resizeBlock = (
  blockId: string,
  size: BlockResizeAction["payload"]["size"]
): BlockResizeAction => createAction("block.resize", { blockId, size });

export const createBlock = (
  sectionId: string,
  block: BlockCreateAction["payload"]["block"]
): BlockCreateAction => createAction("block.create", { sectionId, block });

export const deleteBlock = (
  sectionId: string,
  blockId: string
): BlockDeleteAction => createAction("block.delete", { sectionId, blockId });

export const updateBlock = (
  sectionId: string,
  blockId: string,
  updates: BlockUpdateAction["payload"]["updates"]
): BlockUpdateAction =>
  createAction("block.update", { sectionId, blockId, updates });

export const setDragging = (isDragging: boolean) =>
  createAction("ui.setDragging", { isDragging });

export const setResizing = (isResizing: boolean) =>
  createAction("ui.setResizing", { isResizing });
