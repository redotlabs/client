import type { BuilderBlock, BlockPosition, BlockSize } from "@/shared/types";

/**
 * Action Type
 * 에디터에서 발생할 수 있는 모든 액션 유형
 */
export type ActionType =
  | "block.select"
  | "block.deselect"
  | "block.move"
  | "block.resize"
  | "block.create"
  | "block.delete"
  | "block.update"
  | "ui.setDragging"
  | "ui.setResizing";

/**
 * Base Action
 * 모든 액션의 기본 구조
 */
export interface BaseAction {
  type: ActionType;
  timestamp: number;
}

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
    block: BuilderBlock;
  };
}

export interface BlockDeleteAction extends BaseAction {
  type: "block.delete";
  payload: {
    blockId: string;
  };
}

export interface BlockUpdateAction extends BaseAction {
  type: "block.update";
  payload: {
    blockId: string;
    updates: Omit<Partial<BuilderBlock>, "id" | "position" | "size">;
  };
}

export interface UISetDraggingAction extends BaseAction {
  type: "ui.setDragging";
  payload: {
    isDragging: boolean;
  };
}

export interface UISetResizingAction extends BaseAction {
  type: "ui.setResizing";
  payload: {
    isResizing: boolean;
  };
}

export type EditorAction =
  | BlockSelectAction
  | BlockDeselectAction
  | BlockMoveAction
  | BlockResizeAction
  | BlockCreateAction
  | BlockDeleteAction
  | BlockUpdateAction
  | UISetDraggingAction
  | UISetResizingAction;
