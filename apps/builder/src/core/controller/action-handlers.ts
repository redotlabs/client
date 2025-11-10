import type { EditorAction, ActionType } from "@/core/actions";
import type { EditorState } from "@/core/state";
import * as stateUpdaters from "@/core/state/updaters";

/**
 * Action Handler Type
 * 각 action을 처리하는 함수의 타입
 */
type ActionHandler = (state: EditorState, action: EditorAction) => EditorState;

/**
 * Action Handlers Map
 * 각 action type에 대응하는 state updater 매핑
 */
export const actionHandlers: Record<ActionType, ActionHandler> = {
  // Section Handlers
  "section.create": (state, action) => {
    if (action.type !== "section.create") return state;
    return stateUpdaters.createSectionState(state, action.payload.section);
  },

  "section.insert": (state, action) => {
    if (action.type !== "section.insert") return state;
    return stateUpdaters.insertSectionState(
      state,
      action.payload.targetIndex,
      action.payload.section
    );
  },

  "section.delete": (state, action) => {
    if (action.type !== "section.delete") return state;
    return stateUpdaters.deleteSectionState(state, action.payload.sectionId);
  },

  "section.reorder": (state, action) => {
    if (action.type !== "section.reorder") return state;
    return stateUpdaters.reorderSectionState(
      state,
      action.payload.fromIndex,
      action.payload.toIndex
    );
  },

  "section.update": (state, action) => {
    if (action.type !== "section.update") return state;
    return stateUpdaters.updateSectionState(
      state,
      action.payload.sectionId,
      action.payload.updates
    );
  },

  "section.resize": (state, action) => {
    if (action.type !== "section.resize") return state;
    return stateUpdaters.resizeSectionState(
      state,
      action.payload.sectionId,
      action.payload.rows
    );
  },

  "section.select": (state, action) => {
    if (action.type !== "section.select") return state;
    return stateUpdaters.selectSectionState(state, action.payload.sectionId);
  },

  // Block Handlers
  "block.select": (state, action) => {
    if (action.type !== "block.select") return state;
    return stateUpdaters.selectBlockState(
      state,
      action.payload.blockId,
      action.payload.multiSelect ?? false
    );
  },

  "block.deselect": (state, action) => {
    if (action.type !== "block.deselect") return state;
    return stateUpdaters.deselectBlockState(state, action.payload.blockId);
  },

  "block.move": (state, action) => {
    if (action.type !== "block.move") return state;
    return stateUpdaters.moveBlockState(
      state,
      action.payload.blockId,
      action.payload.position
    );
  },

  "block.resize": (state, action) => {
    if (action.type !== "block.resize") return state;
    return stateUpdaters.resizeBlockState(
      state,
      action.payload.blockId,
      action.payload.size
    );
  },

  "block.create": (state, action) => {
    if (action.type !== "block.create") return state;
    return stateUpdaters.createBlockState(
      state,
      action.payload.sectionId,
      action.payload.block
    );
  },

  "block.delete": (state, action) => {
    if (action.type !== "block.delete") return state;
    return stateUpdaters.deleteBlockState(
      state,
      action.payload.sectionId,
      action.payload.blockId
    );
  },

  "block.update": (state, action) => {
    if (action.type !== "block.update") return state;
    return stateUpdaters.updateBlockState(
      state,
      action.payload.sectionId,
      action.payload.blockId,
      action.payload.updates
    );
  },

  // UI Handlers
  "ui.setBlockDragging": (state, action) => {
    if (action.type !== "ui.setBlockDragging") return state;
    return stateUpdaters.setBlockDraggingState(
      state,
      action.payload.isBlockDragging
    );
  },

  "ui.setBlockResizing": (state, action) => {
    if (action.type !== "ui.setBlockResizing") return state;
    return stateUpdaters.setBlockResizingState(
      state,
      action.payload.isBlockResizing
    );
  },

  "ui.setSectionResizing": (state, action) => {
    if (action.type !== "ui.setSectionResizing") return state;
    return stateUpdaters.setSectionResizingState(
      state,
      action.payload.isSectionResizing
    );
  },
};
