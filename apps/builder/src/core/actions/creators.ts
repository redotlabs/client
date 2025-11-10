import type {
  EditorAction,
  SectionCreateAction,
  SectionInsertAction,
  SectionDeleteAction,
  SectionReorderAction,
  SectionUpdateAction,
  SectionResizeAction,
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
 * Create a new section at the end of the list
 * - If section is provided, use it directly
 * - If section is undefined, the action handler will auto-generate name
 */
export const createSection = (
  section?: SectionCreateAction["payload"]["section"]
): SectionCreateAction =>
  createAction("section.create", { section });

/**
 * Insert a new section at a specific position
 * - If section is provided, use it directly
 * - If section is undefined, the action handler will auto-generate name
 */
export const insertSection = (
  targetIndex: number,
  section?: SectionInsertAction["payload"]["section"]
): SectionInsertAction =>
  createAction("section.insert", { section, targetIndex });

export const deleteSection = (sectionId: string): SectionDeleteAction =>
  createAction("section.delete", { sectionId });

export const reorderSection = (
  fromIndex: number,
  toIndex: number
): SectionReorderAction =>
  createAction("section.reorder", { fromIndex, toIndex });

export const updateSection = (
  sectionId: string,
  updates: SectionUpdateAction["payload"]["updates"]
): SectionUpdateAction =>
  createAction("section.update", { sectionId, updates });

export const resizeSection = (
  sectionId: string,
  rows: number
): SectionResizeAction =>
  createAction("section.resize", { sectionId, rows });

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

export const setBlockDragging = (isBlockDragging: boolean) =>
  createAction("ui.setBlockDragging", { isBlockDragging });

export const setBlockResizing = (isBlockResizing: boolean) =>
  createAction("ui.setBlockResizing", { isBlockResizing });

export const setSectionResizing = (isSectionResizing: boolean) =>
  createAction("ui.setSectionResizing", { isSectionResizing });
