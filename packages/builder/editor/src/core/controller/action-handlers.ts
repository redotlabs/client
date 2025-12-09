import type {
  ActionType,
  EditorAction,
  // SiteUpdateAction,
  // PageCreateAction,
  // PageSelectAction,
  // PageDeleteAction,
  // PageUpdateAction,
  SectionCreateAction,
  SectionInsertAction,
  SectionDeleteAction,
  SectionReorderAction,
  SectionUpdateAction,
  SectionResizeAction,
  SectionSelectAction,
  BlockSelectAction,
  BlockDeselectAction,
  BlockMoveAction,
  BlockResizeAction,
  BlockCreateAction,
  BlockDeleteAction,
  BlockUpdateAction,
  UISetBlockDraggingAction,
  UISetBlockResizingAction,
  UISetSectionResizingAction,
  InteractionStartDragAction,
  InteractionUpdateDragAction,
  InteractionStartResizeAction,
  InteractionUpdateResizeAction,
} from '@/core/actions';
import type { EditorState } from '@/core/state';
import * as stateUpdaters from '@/core/state/updaters';

/**
 * Action Handler Type
 * 각 action을 처리하는 함수의 타입
 */
type ActionHandler<T extends EditorAction = EditorAction> = (
  state: EditorState,
  action: T
) => EditorState;

/**
 * Action Handlers Map
 * 각 action type에 대응하는 state updater 매핑
 */
export const actionHandlers: Record<ActionType, ActionHandler> = {
  // Site Handlers
  // 'site.update': ((state, action: SiteUpdateAction) => {
  //   return stateUpdaters.updateSiteState(state, action.payload.updates);
  // }) as ActionHandler,

  // // Page Handlers
  // 'page.create': ((state, action: PageCreateAction) => {
  //   return stateUpdaters.createPageState(state, action.payload.page);
  // }) as ActionHandler,

  // 'page.select': ((state, action: PageSelectAction) => {
  //   return stateUpdaters.selectPageState(state, action.payload.pageId);
  // }) as ActionHandler,

  // 'page.delete': ((state, action: PageDeleteAction) => {
  //   return stateUpdaters.deletePageState(state, action.payload.pageId);
  // }) as ActionHandler,

  // 'page.update': ((state) => {
  //   return stateUpdaters.updatePageState(state);
  // }) as ActionHandler,

  // Section Handlers
  'section.create': ((state, action: SectionCreateAction) => {
    return stateUpdaters.createSectionState(state, action.payload.section);
  }) as ActionHandler,

  'section.insert': ((state, action: SectionInsertAction) => {
    return stateUpdaters.insertSectionState(
      state,
      action.payload.targetIndex,
      action.payload.section
    );
  }) as ActionHandler,

  'section.delete': ((state, action: SectionDeleteAction) => {
    return stateUpdaters.deleteSectionState(state, action.payload.sectionId);
  }) as ActionHandler,

  'section.reorder': ((state, action: SectionReorderAction) => {
    return stateUpdaters.reorderSectionState(
      state,
      action.payload.fromIndex,
      action.payload.toIndex
    );
  }) as ActionHandler,

  'section.update': ((state, action: SectionUpdateAction) => {
    return stateUpdaters.updateSectionState(
      state,
      action.payload.sectionId,
      action.payload.updates
    );
  }) as ActionHandler,

  'section.resize': ((state, action: SectionResizeAction) => {
    return stateUpdaters.resizeSectionState(
      state,
      action.payload.sectionId,
      action.payload.rows
    );
  }) as ActionHandler,

  'section.select': ((state, action: SectionSelectAction) => {
    return stateUpdaters.selectSectionState(state, action.payload.sectionId);
  }) as ActionHandler,

  // Block Handlers
  'block.select': ((state, action: BlockSelectAction) => {
    return stateUpdaters.selectBlockState(
      state,
      action.payload.blockId,
      action.payload.multiSelect ?? false
    );
  }) as ActionHandler,

  'block.deselect': ((state, action: BlockDeselectAction) => {
    return stateUpdaters.deselectBlockState(state, action.payload.blockId);
  }) as ActionHandler,

  'block.move': ((state, action: BlockMoveAction) => {
    return stateUpdaters.moveBlockState(
      state,
      action.payload.blockId,
      action.payload.position
    );
  }) as ActionHandler,

  'block.resize': ((state, action: BlockResizeAction) => {
    return stateUpdaters.resizeBlockState(
      state,
      action.payload.blockId,
      action.payload.size
    );
  }) as ActionHandler,

  'block.create': ((state, action: BlockCreateAction) => {
    return stateUpdaters.createBlockState(
      state,
      action.payload.sectionId,
      action.payload.block
    );
  }) as ActionHandler,

  'block.delete': ((state, action: BlockDeleteAction) => {
    return stateUpdaters.deleteBlockState(
      state,
      action.payload.sectionId,
      action.payload.blockId
    );
  }) as ActionHandler,

  'block.update': ((state, action: BlockUpdateAction) => {
    return stateUpdaters.updateBlockState(
      state,
      action.payload.sectionId,
      action.payload.blockId,
      action.payload.updates
    );
  }) as ActionHandler,

  // UI Handlers
  'ui.setBlockDragging': ((state, action: UISetBlockDraggingAction) => {
    return stateUpdaters.setBlockDraggingState(
      state,
      action.payload.isBlockDragging
    );
  }) as ActionHandler,

  'ui.setBlockResizing': ((state, action: UISetBlockResizingAction) => {
    return stateUpdaters.setBlockResizingState(
      state,
      action.payload.isBlockResizing
    );
  }) as ActionHandler,

  'ui.setSectionResizing': ((state, action: UISetSectionResizingAction) => {
    return stateUpdaters.setSectionResizingState(
      state,
      action.payload.isSectionResizing
    );
  }) as ActionHandler,

  // Interaction Handlers (Preview)
  'interaction.startDrag': ((state, action: InteractionStartDragAction) => {
    return stateUpdaters.startDragInteractionState(
      state,
      action.payload.dragState
    );
  }) as ActionHandler,

  'interaction.updateDrag': ((state, action: InteractionUpdateDragAction) => {
    return stateUpdaters.updateDragInteractionState(
      state,
      action.payload.dragState
    );
  }) as ActionHandler,

  'interaction.endDrag': ((state) => {
    return stateUpdaters.endDragInteractionState(state);
  }) as ActionHandler,

  'interaction.startResize': ((state, action: InteractionStartResizeAction) => {
    return stateUpdaters.startResizeInteractionState(
      state,
      action.payload.resizeState
    );
  }) as ActionHandler,

  'interaction.updateResize': ((
    state,
    action: InteractionUpdateResizeAction
  ) => {
    return stateUpdaters.updateResizeInteractionState(
      state,
      action.payload.resizeState
    );
  }) as ActionHandler,

  'interaction.endResize': ((state) => {
    return stateUpdaters.endResizeInteractionState(state);
  }) as ActionHandler,

  'interaction.clear': ((state) => {
    return stateUpdaters.clearInteractionState(state);
  }) as ActionHandler,
};
