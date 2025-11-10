import type {
  BuilderBlock,
  BlockPosition,
  BlockSize,
  Section,
} from "@/shared/types";

/**
 * Action Type
 * 에디터에서 발생할 수 있는 모든 액션 유형
 */
export type ActionType =
  // Section Actions
  | "section.create"
  | "section.insert"
  | "section.delete"
  | "section.reorder"
  | "section.update"
  | "section.resize"
  | "section.select"
  // Block Actions
  | "block.select"
  | "block.deselect"
  | "block.move"
  | "block.resize"
  | "block.create"
  | "block.delete"
  | "block.update"
  // UI Actions
  | "ui.setBlockDragging"
  | "ui.setBlockResizing"
  | "ui.setSectionResizing";

/**
 * Base Action
 * 모든 액션의 기본 구조
 */
export interface BaseAction {
  type: ActionType;
  timestamp: number;
}

// ============================================
// Section Actions
// ============================================

export interface SectionCreateAction extends BaseAction {
  type: "section.create";
  payload: {
    section?: Section;
  };
}

export interface SectionInsertAction extends BaseAction {
  type: "section.insert";
  payload: {
    section?: Section;
    targetIndex: number;
  };
}

export interface SectionDeleteAction extends BaseAction {
  type: "section.delete";
  payload: {
    sectionId: string;
  };
}

export interface SectionReorderAction extends BaseAction {
  type: "section.reorder";
  payload: {
    fromIndex: number;
    toIndex: number;
  };
}

export interface SectionUpdateAction extends BaseAction {
  type: "section.update";
  payload: {
    sectionId: string;
    updates: {
      name?: string;
    };
  };
}

export interface SectionResizeAction extends BaseAction {
  type: "section.resize";
  payload: {
    sectionId: string;
    rows: number;
  };
}

export interface SectionSelectAction extends BaseAction {
  type: "section.select";
  payload: {
    sectionId: string;
  };
}

// ============================================
// Block Actions
// ============================================

export interface BlockSelectAction extends BaseAction {
  type: "block.select";
  payload: {
    blockId: string;
    multiSelect?: boolean;
  };
}

export interface BlockDeselectAction extends BaseAction {
  type: "block.deselect";
  payload: {
    blockId?: string;
  };
}

export interface BlockMoveAction extends BaseAction {
  type: "block.move";
  payload: {
    blockId: string;
    position: BlockPosition;
  };
}

export interface BlockResizeAction extends BaseAction {
  type: "block.resize";
  payload: {
    blockId: string;
    size: BlockSize;
  };
}

export interface BlockCreateAction extends BaseAction {
  type: "block.create";
  payload: {
    sectionId: string;
    block: BuilderBlock;
  };
}

export interface BlockDeleteAction extends BaseAction {
  type: "block.delete";
  payload: {
    sectionId: string;
    blockId: string;
  };
}

export interface BlockUpdateAction extends BaseAction {
  type: "block.update";
  payload: {
    sectionId: string;
    blockId: string;
    updates: Omit<Partial<BuilderBlock>, "id" | "position" | "size">;
  };
}

// ============================================
// UI Actions
// ============================================

export interface UISetBlockDraggingAction extends BaseAction {
  type: "ui.setBlockDragging";
  payload: {
    isBlockDragging: boolean;
  };
}

export interface UISetBlockResizingAction extends BaseAction {
  type: "ui.setBlockResizing";
  payload: {
    isBlockResizing: boolean;
  };
}

export interface UISetSectionResizingAction extends BaseAction {
  type: "ui.setSectionResizing";
  payload: {
    isSectionResizing: boolean;
  };
}

export type EditorAction =
  // Section Actions
  | SectionCreateAction
  | SectionInsertAction
  | SectionDeleteAction
  | SectionReorderAction
  | SectionUpdateAction
  | SectionResizeAction
  | SectionSelectAction
  // Block Actions
  | BlockSelectAction
  | BlockDeselectAction
  | BlockMoveAction
  | BlockResizeAction
  | BlockCreateAction
  | BlockDeleteAction
  | BlockUpdateAction
  // UI Actions
  | UISetBlockDraggingAction
  | UISetBlockResizingAction
  | UISetSectionResizingAction;
