import type { BuilderBlock, GridConfig } from '@/shared/types';

/**
 * Editor Mode
 * 에디터의 동작 모드
 */
export type EditorMode = 'edit' | 'preview' | 'readonly';

/**
 * Selection State
 * 선택된 블록들의 상태
 */
export interface SelectionState {
  selectedBlockIds: Set<string>;
  lastSelectedId: string | null;
}

/**
 * Preview State
 * 임시 상태 (드래그 중, 리사이즈 중 등)
 */
export interface PreviewState {
  isDragging: boolean;
  isResizing: boolean;
  draggedBlockId: string | null;
  resizedBlockId: string | null;
  previewBlocks: Map<string, Partial<BuilderBlock>>; // blockId -> 임시 변경사항
}

/**
 * Editor State
 * 에디터의 전체 상태
 */
export interface EditorState {
  // 데이터
  blocks: Map<string, BuilderBlock>;
  gridConfig: GridConfig;

  // 모드
  mode: EditorMode;

  // 선택
  selection: SelectionState;

  // 프리뷰 (임시 상태)
  preview: PreviewState;

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
  mode: 'edit',
  selection: {
    selectedBlockIds: new Set(),
    lastSelectedId: null,
  },
  preview: {
    isDragging: false,
    isResizing: false,
    draggedBlockId: null,
    resizedBlockId: null,
    previewBlocks: new Map(),
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
