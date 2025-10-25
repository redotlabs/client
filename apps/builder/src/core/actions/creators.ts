import type {
  EditorAction,
  ActionPhase,
  BlockSelectAction,
  BlockDeselectAction,
  BlockMoveAction,
  BlockResizeAction,
  BlockCreateAction,
  BlockDeleteAction,
  BlockUpdateAction,
  EditorModeChangeAction,
} from './types';

/**
 * Base action creator helper
 */
function createAction<T extends EditorAction>(
  type: T['type'],
  payload: T['payload'],
  phase: ActionPhase = 'commit'
): T {
  return {
    type,
    payload,
    phase,
    timestamp: Date.now(),
  } as T;
}

/**
 * Block Selection Actions
 */
export const selectBlock = (
  blockId: string,
  multiSelect = false,
  phase: ActionPhase = 'commit'
): BlockSelectAction =>
  createAction('block.select', { blockId, multiSelect }, phase);

export const deselectBlock = (
  blockId?: string,
  phase: ActionPhase = 'commit'
): BlockDeselectAction =>
  createAction('block.deselect', { blockId }, phase);

/**
 * Block Movement Actions
 */
export const moveBlock = (
  blockId: string,
  position: BlockMoveAction['payload']['position'],
  phase: ActionPhase = 'commit'
): BlockMoveAction =>
  createAction('block.move', { blockId, position }, phase);

/**
 * Block Resize Actions
 */
export const resizeBlock = (
  blockId: string,
  size: BlockResizeAction['payload']['size'],
  phase: ActionPhase = 'commit'
): BlockResizeAction =>
  createAction('block.resize', { blockId, size }, phase);

/**
 * Block CRUD Actions
 */
export const createBlock = (
  block: BlockCreateAction['payload']['block'],
  phase: ActionPhase = 'commit'
): BlockCreateAction =>
  createAction('block.create', { block }, phase);

export const deleteBlock = (
  blockId: string,
  phase: ActionPhase = 'commit'
): BlockDeleteAction =>
  createAction('block.delete', { blockId }, phase);

export const updateBlock = (
  blockId: string,
  updates: BlockUpdateAction['payload']['updates'],
  phase: ActionPhase = 'commit'
): BlockUpdateAction =>
  createAction('block.update', { blockId, updates }, phase);

/**
 * Editor Mode Actions
 */
export const changeEditorMode = (
  mode: EditorModeChangeAction['payload']['mode'],
  phase: ActionPhase = 'commit'
): EditorModeChangeAction =>
  createAction('editor.mode.change', { mode }, phase);
