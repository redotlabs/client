import type {
  Site,
  GridConfig,
  BlockPosition,
  BlockSize,
} from "@/shared/types";
import type { ResizeDirection } from "@/core/events/handlers/types";
import { createEmptySite } from "@/shared/utils/site";

/**
 * Selection Type
 * Inspector에서 표시할 선택 타입
 */
export type SelectionType = "section" | "block" | null;

/**
 * Selection State
 * 선택된 블록들의 상태
 */
export interface SelectionState {
  selectionType: SelectionType;
  selectedBlockIds: Set<string>;
  lastSelectedId: string | null;
  selectedSectionId: string | null;
}

/**
 * UI State
 * 에디터 UI 관련 상태
 */
export interface UIState {
  isBlockDragging: boolean;
  isBlockResizing: boolean;
  isSectionResizing: boolean;
}

/**
 * Interaction Type
 * 사용자가 현재 진행 중인 인터랙션의 종류
 */
export type InteractionType = "drag" | "resize" | null;

/**
 * Drag Interaction State
 * 드래그 중간 상태 (Preview용)
 */
export interface DragInteractionState {
  blockId: string;
  startPosition: BlockPosition;
  currentPosition: BlockPosition;
  previewPosition: BlockPosition;
  startMousePosition: { x: number; y: number };
}

/**
 * Resize Interaction State
 * 리사이즈 중간 상태 (Preview용)
 */
export interface ResizeInteractionState {
  blockId: string;
  direction: ResizeDirection;
  startPosition: BlockPosition;
  startSize: BlockSize;
  currentSize: BlockSize;
  previewSize: BlockSize;
  startMousePosition: { x: number; y: number };
}

/**
 * Interaction State
 * Handler 레벨에서 관리하는 중간 상태
 *
 * 이 상태는 실제 EditorState에 반영되지 않으며,
 * 인터랙션이 완료될 때만 Action을 통해 데이터에 반영됨
 */
export interface InteractionState {
  type: InteractionType;
  drag: DragInteractionState | null;
  resize: ResizeInteractionState | null;
}

/**
 * Editor State
 * 에디터의 전체 상태
 */
export interface EditorState {
  site: Site;
  currentPageId: string; // 현재 편집 중인 페이지 ID
  gridConfig: GridConfig;

  selection: SelectionState;
  ui: UIState;

  interaction: InteractionState;

  // TODO: 히스토리 구현 (undo/redo)
  history: {
    past: EditorState[];
    future: EditorState[];
  };
}

export const createInitialEditorState = (
  gridConfig: GridConfig,
  site?: Site
): EditorState => {
  const initialSite = site || createEmptySite();
  const firstPageId = initialSite.pages[0]?.id || "";

  return {
    site: initialSite,
    currentPageId: firstPageId,
    gridConfig,
    selection: {
      selectionType: null,
      selectedBlockIds: new Set(),
      lastSelectedId: null,
      selectedSectionId: null,
    },
    ui: {
      isBlockDragging: false,
      isBlockResizing: false,
      isSectionResizing: false,
    },
    interaction: {
      type: null,
      drag: null,
      resize: null,
    },
    history: {
      past: [],
      future: [],
    },
  };
};

export type StateUpdater = (state: EditorState) => EditorState;

export type StateSelector<T> = (state: EditorState) => T;
