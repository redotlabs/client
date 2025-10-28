import type { BuilderBlock, GridConfig } from '@/shared/types';

/**
 * Selection State
 * 선택된 블록들의 상태
 */
export interface SelectionState {
  selectedBlockIds: Set<string>;
  lastSelectedId: string | null;
}

/**
 * Editor State
 * 에디터의 전체 상태
 */
export interface EditorState {
  blocks: Map<string, BuilderBlock>;
  gridConfig: GridConfig;

  selection: SelectionState;

  // 히스토리 (undo/redo를 위한 준비)
  history: {
    past: EditorState[];
    future: EditorState[];
  };
}

/**
 * Initial Editor State
 */
export const createInitialEditorState = (
  blocks: BuilderBlock[] = [],
  gridConfig: GridConfig
): EditorState => ({
  blocks: new Map(blocks.map((block) => [block.id, block])),
  gridConfig,
  selection: {
    selectedBlockIds: new Set(),
    lastSelectedId: null,
  },
  history: {
    past: [],
    future: [],
  },
});

/**
 * State Updater
 * 상태를 업데이트하는 함수의 타입
 */
export type StateUpdater = (state: EditorState) => EditorState;

/**
 * State Selector
 * 상태에서 특정 값을 추출하는 함수의 타입
 */
export type StateSelector<T> = (state: EditorState) => T;
