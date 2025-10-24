import type { BuilderBlock, BlockPosition, BlockSize } from '@/shared/types';

/**
 * Action Phase
 * - Preview: 임시 상태 변경 (시각적 피드백, 아직 확정 전)
 * - Commit: 실제 상태 변경 (확정)
 */
export type ActionPhase = 'preview' | 'commit';

/**
 * Action Type
 * 에디터에서 발생할 수 있는 모든 액션 유형
 */
export type ActionType =
  | 'block.select'
  | 'block.deselect'
  | 'block.move'
  | 'block.resize'
  | 'block.create'
  | 'block.delete'
  | 'block.update'
  | 'editor.mode.change';

/**
 * Base Action
 * 모든 액션의 기본 구조
 */
export interface BaseAction {
  type: ActionType;
  phase: ActionPhase;
  timestamp: number;
}

/**
 * Block Selection Action
 */
export interface BlockSelectAction extends BaseAction {
  type: 'block.select';
  payload: {
    blockId: string;
    multiSelect?: boolean;
  };
}

export interface BlockDeselectAction extends BaseAction {
  type: 'block.deselect';
  payload: {
    blockId?: string; // undefined면 전체 선택 해제
  };
}

/**
 * Block Move Action
 */
export interface BlockMoveAction extends BaseAction {
  type: 'block.move';
  payload: {
    blockId: string;
    position: BlockPosition;
  };
}

/**
 * Block Resize Action
 */
export interface BlockResizeAction extends BaseAction {
  type: 'block.resize';
  payload: {
    blockId: string;
    size: BlockSize;
  };
}

/**
 * Block Create Action
 */
export interface BlockCreateAction extends BaseAction {
  type: 'block.create';
  payload: {
    block: BuilderBlock;
  };
}

/**
 * Block Delete Action
 */
export interface BlockDeleteAction extends BaseAction {
  type: 'block.delete';
  payload: {
    blockId: string;
  };
}

/**
 * Block Update Action
 */
export interface BlockUpdateAction extends BaseAction {
  type: 'block.update';
  payload: {
    blockId: string;
    updates: Partial<BuilderBlock>;
  };
}

/**
 * Editor Mode Change Action
 */
export type EditorMode = 'edit' | 'preview' | 'readonly';

export interface EditorModeChangeAction extends BaseAction {
  type: 'editor.mode.change';
  payload: {
    mode: EditorMode;
  };
}

/**
 * Union type of all actions
 */
export type EditorAction =
  | BlockSelectAction
  | BlockDeselectAction
  | BlockMoveAction
  | BlockResizeAction
  | BlockCreateAction
  | BlockDeleteAction
  | BlockUpdateAction
  | EditorModeChangeAction;

/**
 * Action Creator
 * Action을 생성하는 헬퍼 함수들의 타입
 */
export type ActionCreator<T extends EditorAction> = (
  payload: T['payload'],
  phase?: ActionPhase
) => T;
