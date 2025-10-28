import type {
  EditorAction,
  BlockSelectAction,
  BlockDeselectAction,
  BlockMoveAction,
  BlockResizeAction,
  BlockCreateAction,
  BlockDeleteAction,
  BlockUpdateAction,
} from './types';

/**
 * Base action creator helper
 */
function createAction<T extends EditorAction>(
  type: T['type'],
  payload: T['payload']
): T {
  return {
    type,
    payload,
    timestamp: Date.now(),
  } as T;
}

/**
 * Block Selection Actions
 */
export const selectBlock = (
  blockId: string,
  multiSelect = false
): BlockSelectAction =>
  createAction('block.select', { blockId, multiSelect });

export const deselectBlock = (blockId?: string): BlockDeselectAction =>
  createAction('block.deselect', { blockId });

/**
 * Block Movement Actions
 */
export const moveBlock = (
  blockId: string,
  position: BlockMoveAction['payload']['position']
): BlockMoveAction =>
  createAction('block.move', { blockId, position });

/**
 * Block Resize Actions
 */
export const resizeBlock = (
  blockId: string,
  size: BlockResizeAction['payload']['size']
): BlockResizeAction =>
  createAction('block.resize', { blockId, size });

/**
 * Block CRUD Actions
 */
export const createBlock = (
  block: BlockCreateAction['payload']['block']
): BlockCreateAction =>
  createAction('block.create', { block });

export const deleteBlock = (blockId: string): BlockDeleteAction =>
  createAction('block.delete', { blockId });

export const updateBlock = (
  blockId: string,
  updates: BlockUpdateAction['payload']['updates']
): BlockUpdateAction =>
  createAction('block.update', { blockId, updates });
