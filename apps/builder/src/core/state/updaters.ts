import type { EditorState } from "./types";
import type {
  BuilderBlock,
  BlockPosition,
  BlockSize,
  Section,
} from "@/shared/types";

// ============================================
// Section State Updaters
// ============================================

/**
 * Helper to generate temporary ID
 */
const generateTempId = (): string => {
  return `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const createSectionState = (
  state: EditorState,
  section?: Section
): EditorState => {
  const newSection = section || {
    id: generateTempId(),
    name: `Section ${state.sections.size + 1}`,
    order:
      state.sections.size > 0
        ? Math.max(...Array.from(state.sections.values()).map((s) => s.order)) +
          1
        : 0,
    blocks: [],
    metadata: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };

  const newSections = new Map(state.sections);
  newSections.set(newSection.id, newSection);

  return {
    ...state,
    sections: newSections,
    selection: {
      ...state.selection,
      activeSectionId: newSection.id,
    },
  };
};

export const deleteSectionState = (
  state: EditorState,
  sectionId: string
): EditorState => {
  const newSections = new Map(state.sections);
  newSections.delete(sectionId);

  // activeSectionId가 삭제된 섹션이면 첫 번째 섹션으로 변경
  const newActiveSectionId =
    state.selection.activeSectionId === sectionId
      ? Array.from(newSections.keys())[0] || null
      : state.selection.activeSectionId;

  return {
    ...state,
    sections: newSections,
    selection: {
      ...state.selection,
      activeSectionId: newActiveSectionId,
      // 삭제된 섹션에 속한 블록 선택 해제
      selectedBlockIds: new Set(),
      lastSelectedId: null,
    },
  };
};

export const reorderSectionState = (
  state: EditorState,
  sectionId: string,
  newOrder: number
): EditorState => {
  const section = state.sections.get(sectionId);
  if (!section) return state;

  const newSections = new Map(state.sections);
  newSections.set(sectionId, { ...section, order: newOrder });

  return {
    ...state,
    sections: newSections,
  };
};

export const updateSectionState = (
  state: EditorState,
  sectionId: string,
  updates: { name?: string }
): EditorState => {
  const section = state.sections.get(sectionId);
  if (!section) return state;

  const now = new Date().toISOString();
  const newSections = new Map(state.sections);
  newSections.set(sectionId, {
    ...section,
    ...updates,
    metadata: {
      createdAt: section.metadata?.createdAt || now,
      updatedAt: now,
    },
  });

  return {
    ...state,
    sections: newSections,
  };
};

export const selectSectionState = (
  state: EditorState,
  sectionId: string
): EditorState => {
  return {
    ...state,
    selection: {
      ...state.selection,
      activeSectionId: sectionId,
    },
  };
};

// ============================================
// Block State Updaters
// ============================================

export const selectBlockState = (
  state: EditorState,
  blockId: string,
  multiSelect: boolean
): EditorState => {
  const selectedBlockIds = multiSelect
    ? new Set(state.selection.selectedBlockIds).add(blockId)
    : new Set([blockId]);

  return {
    ...state,
    selection: {
      ...state.selection,
      selectedBlockIds,
      lastSelectedId: blockId,
    },
  };
};

export const deselectBlockState = (
  state: EditorState,
  blockId?: string
): EditorState => {
  if (!blockId) {
    return {
      ...state,
      selection: {
        ...state.selection,
        selectedBlockIds: new Set(),
        lastSelectedId: null,
      },
    };
  }

  const selectedBlockIds = new Set(state.selection.selectedBlockIds);
  selectedBlockIds.delete(blockId);

  return {
    ...state,
    selection: {
      ...state.selection,
      selectedBlockIds,
      lastSelectedId:
        state.selection.lastSelectedId === blockId
          ? null
          : state.selection.lastSelectedId,
    },
  };
};

export const moveBlockState = (
  state: EditorState,
  blockId: string,
  position: BlockPosition
): EditorState => {
  // 블록이 속한 섹션 찾기
  let targetSectionId: string | null = null;
  for (const [sectionId, section] of state.sections) {
    if (section.blocks.some((b) => b.id === blockId)) {
      targetSectionId = sectionId;
      break;
    }
  }

  if (!targetSectionId) return state;

  const section = state.sections.get(targetSectionId);
  if (!section) return state;

  const updatedBlocks = section.blocks.map((block) =>
    block.id === blockId ? { ...block, position } : block
  );

  const newSections = new Map(state.sections);
  newSections.set(targetSectionId, { ...section, blocks: updatedBlocks });

  return {
    ...state,
    sections: newSections,
  };
};

export const resizeBlockState = (
  state: EditorState,
  blockId: string,
  size: BlockSize
): EditorState => {
  // 블록이 속한 섹션 찾기
  let targetSectionId: string | null = null;
  for (const [sectionId, section] of state.sections) {
    if (section.blocks.some((b) => b.id === blockId)) {
      targetSectionId = sectionId;
      break;
    }
  }

  if (!targetSectionId) return state;

  const section = state.sections.get(targetSectionId);
  if (!section) return state;

  const updatedBlocks = section.blocks.map((block) =>
    block.id === blockId ? { ...block, size } : block
  );

  const newSections = new Map(state.sections);
  newSections.set(targetSectionId, { ...section, blocks: updatedBlocks });

  return {
    ...state,
    sections: newSections,
  };
};

export const createBlockState = (
  state: EditorState,
  sectionId: string,
  block: BuilderBlock
): EditorState => {
  const section = state.sections.get(sectionId);
  if (!section) return state;

  const updatedBlocks = [...section.blocks, block];

  const newSections = new Map(state.sections);
  newSections.set(sectionId, { ...section, blocks: updatedBlocks });

  return {
    ...state,
    sections: newSections,
  };
};

export const deleteBlockState = (
  state: EditorState,
  sectionId: string,
  blockId: string
): EditorState => {
  const section = state.sections.get(sectionId);
  if (!section) return state;

  const updatedBlocks = section.blocks.filter((block) => block.id !== blockId);

  const selectedBlockIds = new Set(state.selection.selectedBlockIds);
  selectedBlockIds.delete(blockId);

  const newSections = new Map(state.sections);
  newSections.set(sectionId, { ...section, blocks: updatedBlocks });

  return {
    ...state,
    sections: newSections,
    selection: {
      ...state.selection,
      selectedBlockIds,
      lastSelectedId:
        state.selection.lastSelectedId === blockId
          ? null
          : state.selection.lastSelectedId,
    },
  };
};

export const updateBlockState = (
  state: EditorState,
  sectionId: string,
  blockId: string,
  updates: Omit<Partial<BuilderBlock>, "id" | "position" | "size">
): EditorState => {
  const section = state.sections.get(sectionId);
  if (!section) return state;

  const updatedBlocks = section.blocks.map((block) =>
    block.id === blockId ? { ...block, ...updates } : block
  );

  const newSections = new Map(state.sections);
  newSections.set(sectionId, { ...section, blocks: updatedBlocks });

  return {
    ...state,
    sections: newSections,
  };
};

export const setDraggingState = (
  state: EditorState,
  isDragging: boolean
): EditorState => {
  return {
    ...state,
    ui: {
      ...state.ui,
      isDragging,
    },
  };
};

export const setResizingState = (
  state: EditorState,
  isResizing: boolean
): EditorState => {
  return {
    ...state,
    ui: {
      ...state.ui,
      isResizing,
    },
  };
};
