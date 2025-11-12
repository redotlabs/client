import type { Section, GridConfig } from "@/shared/types";

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
    selectedSectionId: sections.length > 0 ? sections[0].id : null,
  },
  ui: {
    isBlockDragging: false,
    isBlockResizing: false,
    isSectionResizing: false,
  },
  history: {
    past: [],
    future: [],
  },
});

export type StateUpdater = (state: EditorState) => EditorState;

export type StateSelector<T> = (state: EditorState) => T;
