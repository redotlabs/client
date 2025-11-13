import type { Section, GridConfig } from "@/shared/types";
import type { InteractionState } from "../interactions/types";

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
 * Editor State
 * 에디터의 전체 상태
 */
export interface EditorState {
  gridConfig: GridConfig;
  sections: Section[];

  selection: SelectionState;
  ui: UIState;

  /**
   * Interaction State
   * 인터랙션 중간 상태 (드래그, 리사이즈 등)
   * 실제 데이터에 반영되지 않으며, 미리보기 렌더링에만 사용됨
   */
  interaction: InteractionState;

  // TODO: 히스토리 구현 (undo/redo)
  history: {
    past: EditorState[];
    future: EditorState[];
  };
}

export const createInitialEditorState = (
  gridConfig: GridConfig,
  sections: Section[] = []
): EditorState => ({
  gridConfig,
  sections,
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
});

export type StateUpdater = (state: EditorState) => EditorState;

export type StateSelector<T> = (state: EditorState) => T;
