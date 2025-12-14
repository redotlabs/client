import type {
  BuilderBlock,
  BlockPosition,
  BlockSize,
  Section,
  AutoLayoutConfig,
} from '@repo/builder/renderer';
import type {
  DragInteractionState,
  ResizeInteractionState,
} from '@/core/state/types';

/**
 * Action Type
 * 에디터에서 발생할 수 있는 모든 액션 유형
 */
export type ActionType =
  // Site Actions
  // | 'site.update'
  // // Page Actions
  // | 'page.create'
  // | 'page.select'
  // | 'page.delete'
  // | 'page.update'
  // Section Actions
  | 'section.create'
  | 'section.insert'
  | 'section.delete'
  | 'section.reorder'
  | 'section.update'
  | 'section.resize'
  | 'section.select'
  // Block Actions
  | 'block.select'
  | 'block.deselect'
  | 'block.move'
  | 'block.resize'
  | 'block.create'
  | 'block.delete'
  | 'block.update'
  // Frame Actions
  | 'frame.addChild'
  | 'frame.removeChild'
  | 'frame.reorderChildren'
  | 'frame.updateLayout'
  // UI Actions
  | 'ui.setBlockDragging'
  | 'ui.setBlockResizing'
  | 'ui.setSectionResizing'
  // Interaction Actions (Preview)
  | 'interaction.startDrag'
  | 'interaction.updateDrag'
  | 'interaction.endDrag'
  | 'interaction.startResize'
  | 'interaction.updateResize'
  | 'interaction.endResize'
  | 'interaction.clear';

/**
 * Base Action
 * 모든 액션의 기본 구조
 */
export interface BaseAction {
  type: ActionType;
  timestamp: number;
}

// ============================================
// Site Actions
// ============================================

// export interface SiteUpdateAction extends BaseAction {
//   type: 'site.update';
//   payload: {
//     updates: {
//       name?: string;
//       description?: string;
//       favicon?: string;
//     };
//   };
// }

// ============================================
// Page Actions
// ============================================

// export interface PageCreateAction extends BaseAction {
//   type: 'page.create';
//   payload: {
//     page?: Page;
//   };
// }

// export interface PageSelectAction extends BaseAction {
//   type: 'page.select';
//   payload: {
//     pageId: string;
//   };
// }

// export interface PageDeleteAction extends BaseAction {
//   type: 'page.delete';
//   payload: {
//     pageId: string;
//   };
// }

// ============================================
// Section Actions
// ============================================

export interface SectionCreateAction extends BaseAction {
  type: 'section.create';
  payload: {
    section?: Section;
  };
}

export interface SectionInsertAction extends BaseAction {
  type: 'section.insert';
  payload: {
    section?: Section;
    targetIndex: number;
  };
}

export interface SectionDeleteAction extends BaseAction {
  type: 'section.delete';
  payload: {
    sectionId: string;
  };
}

export interface SectionReorderAction extends BaseAction {
  type: 'section.reorder';
  payload: {
    fromIndex: number;
    toIndex: number;
  };
}

export interface SectionUpdateAction extends BaseAction {
  type: 'section.update';
  payload: {
    sectionId: string;
    updates: {
      name?: string;
    };
  };
}

export interface SectionResizeAction extends BaseAction {
  type: 'section.resize';
  payload: {
    sectionId: string;
    rows: number;
  };
}

export interface SectionSelectAction extends BaseAction {
  type: 'section.select';
  payload: {
    sectionId: string;
  };
}

// ============================================
// Block Actions
// ============================================

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
    blockId?: string;
  };
}

export interface BlockMoveAction extends BaseAction {
  type: 'block.move';
  payload: {
    blockId: string;
    position: BlockPosition;
  };
}

export interface BlockResizeAction extends BaseAction {
  type: 'block.resize';
  payload: {
    blockId: string;
    size: BlockSize;
  };
}

export interface BlockCreateAction extends BaseAction {
  type: 'block.create';
  payload: {
    sectionId: string;
    block: BuilderBlock;
  };
}

export interface BlockDeleteAction extends BaseAction {
  type: 'block.delete';
  payload: {
    sectionId: string;
    blockId: string;
  };
}

export interface BlockUpdateAction extends BaseAction {
  type: 'block.update';
  payload: {
    sectionId: string;
    blockId: string;
    updates: Omit<Partial<BuilderBlock>, 'id' | 'position' | 'size'>;
  };
}

// ============================================
// Frame Actions
// ============================================

export interface FrameAddChildAction extends BaseAction {
  type: 'frame.addChild';
  payload: {
    sectionId: string;
    frameId: string;
    childBlock: BuilderBlock;
    index?: number; // 특정 위치에 삽입, undefined면 마지막에 추가
  };
}

export interface FrameRemoveChildAction extends BaseAction {
  type: 'frame.removeChild';
  payload: {
    sectionId: string;
    frameId: string;
    childId: string;
  };
}

export interface FrameReorderChildrenAction extends BaseAction {
  type: 'frame.reorderChildren';
  payload: {
    sectionId: string;
    frameId: string;
    fromIndex: number;
    toIndex: number;
  };
}

export interface FrameUpdateLayoutAction extends BaseAction {
  type: 'frame.updateLayout';
  payload: {
    sectionId: string;
    frameId: string;
    layout: Partial<AutoLayoutConfig>;
  };
}

// ============================================
// UI Actions
// ============================================

export interface UISetBlockDraggingAction extends BaseAction {
  type: 'ui.setBlockDragging';
  payload: {
    isBlockDragging: boolean;
  };
}

export interface UISetBlockResizingAction extends BaseAction {
  type: 'ui.setBlockResizing';
  payload: {
    isBlockResizing: boolean;
  };
}

export interface UISetSectionResizingAction extends BaseAction {
  type: 'ui.setSectionResizing';
  payload: {
    isSectionResizing: boolean;
  };
}

// ============================================
// Interaction Actions (Preview)
// ============================================

export interface InteractionStartDragAction extends BaseAction {
  type: 'interaction.startDrag';
  payload: {
    dragState: DragInteractionState;
  };
}

export interface InteractionUpdateDragAction extends BaseAction {
  type: 'interaction.updateDrag';
  payload: {
    dragState: Partial<DragInteractionState>;
  };
}

export interface InteractionEndDragAction extends BaseAction {
  type: 'interaction.endDrag';
}

export interface InteractionStartResizeAction extends BaseAction {
  type: 'interaction.startResize';
  payload: {
    resizeState: ResizeInteractionState;
  };
}

export interface InteractionUpdateResizeAction extends BaseAction {
  type: 'interaction.updateResize';
  payload: {
    resizeState: Partial<ResizeInteractionState>;
  };
}

export interface InteractionEndResizeAction extends BaseAction {
  type: 'interaction.endResize';
}

export interface InteractionClearAction extends BaseAction {
  type: 'interaction.clear';
}

export type EditorAction =
  // Site Actions
  // | SiteUpdateAction
  // // Page Actions
  // | PageCreateAction
  // | PageSelectAction
  // | PageDeleteAction
  // Section Actions
  | SectionCreateAction
  | SectionInsertAction
  | SectionDeleteAction
  | SectionReorderAction
  | SectionUpdateAction
  | SectionResizeAction
  | SectionSelectAction
  // Block Actions
  | BlockSelectAction
  | BlockDeselectAction
  | BlockMoveAction
  | BlockResizeAction
  | BlockCreateAction
  | BlockDeleteAction
  | BlockUpdateAction
  // Frame Actions
  | FrameAddChildAction
  | FrameRemoveChildAction
  | FrameReorderChildrenAction
  | FrameUpdateLayoutAction
  // UI Actions
  | UISetBlockDraggingAction
  | UISetBlockResizingAction
  | UISetSectionResizingAction
  // Interaction Actions
  | InteractionStartDragAction
  | InteractionUpdateDragAction
  | InteractionEndDragAction
  | InteractionStartResizeAction
  | InteractionUpdateResizeAction
  | InteractionEndResizeAction
  | InteractionClearAction;
