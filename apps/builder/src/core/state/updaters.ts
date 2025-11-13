import type { EditorState } from "./types";
import type {
  BuilderBlock,
  BlockPosition,
  BlockSize,
  Section,
} from "@/shared/types";
import { getSectionRows } from "@/shared/utils/sectionHeight";
import { DEFAULT_SECTION_ROWS } from "@/shared/constants/editorData";

// ============================================
// Section State Updaters
// ============================================

/**
 * Helper to generate temporary ID
 */
const generateTempId = (): string => {
  return `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Helper to update a section's blocks in the sections array
 */
const updateSectionBlocks = (
  sections: Section[],
  sectionId: string,
  updateFn: (blocks: BuilderBlock[]) => BuilderBlock[]
): Section[] => {
  return sections.map((section) =>
    section.id === sectionId
      ? { ...section, blocks: updateFn(section.blocks) }
      : section
  );
};

export const createSectionState = (
  state: EditorState,
  section?: Section
): EditorState => {
  const newSection = section || {
    id: generateTempId(),
    name: `Section ${state.sections.length + 1}`,
    rows: DEFAULT_SECTION_ROWS,
    blocks: [],
    metadata: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };

  return {
    ...state,
    sections: [...state.sections, newSection],
    selection: {
      ...state.selection,
      selectedSectionId: newSection.id,
    },
  };
};

export const insertSectionState = (
  state: EditorState,
  targetIndex: number,
  section?: Section
): EditorState => {
  const newSection = section || {
    id: generateTempId(),
    name: `Section ${state.sections.length + 1}`,
    rows: DEFAULT_SECTION_ROWS,
    blocks: [],
    metadata: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };

  const newSections = [
    ...state.sections.slice(0, targetIndex),
    newSection,
    ...state.sections.slice(targetIndex),
  ];

  return {
    ...state,
    sections: newSections,
    selection: {
      ...state.selection,
      selectedSectionId: newSection.id,
    },
  };
};

export const deleteSectionState = (
  state: EditorState,
  sectionId: string
): EditorState => {
  // 배열에서 제거
  const newSections = state.sections.filter((s) => s.id !== sectionId);

  const newSelectedSectionId =
    state.selection.selectedSectionId === sectionId
      ? null
      : state.selection.selectedSectionId;

  return {
    ...state,
    sections: newSections,
    selection: {
      ...state.selection,
      selectedSectionId: newSelectedSectionId,
      // 삭제된 섹션에 속한 블록 선택 해제
      selectedBlockIds: new Set(),
      lastSelectedId: null,
    },
  };
};

export const reorderSectionState = (
  state: EditorState,
  fromIndex: number,
  toIndex: number
): EditorState => {
  // 인덱스 유효성 검사
  if (
    fromIndex < 0 ||
    fromIndex >= state.sections.length ||
    toIndex < 0 ||
    toIndex >= state.sections.length
  ) {
    return state;
  }

  // 배열 복사 후 요소 swap
  const newSections = [...state.sections];
  [newSections[fromIndex], newSections[toIndex]] = [
    newSections[toIndex],
    newSections[fromIndex],
  ];

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
  const now = new Date().toISOString();

  const newSections = state.sections.map((section) =>
    section.id === sectionId
      ? {
          ...section,
          ...updates,
          metadata: {
            createdAt: section.metadata?.createdAt || now,
            updatedAt: now,
          },
        }
      : section
  );

  return {
    ...state,
    sections: newSections,
  };
};

export const resizeSectionState = (
  state: EditorState,
  sectionId: string,
  rows: number
): EditorState => {
  const newSections = state.sections.map((section) =>
    section.id === sectionId ? { ...section, rows } : section
  );

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
      selectionType: "section",
      selectedSectionId: sectionId,
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
      selectionType: "block",
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
    // blockId가 없으면 모든 선택 해제 (블록 + 섹션)
    return {
      ...state,
      selection: {
        ...state.selection,
        selectionType: null,
        selectedBlockIds: new Set(),
        lastSelectedId: null,
        selectedSectionId: null,
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
  const targetSection = state.sections.find((section) =>
    section.blocks.some((b) => b.id === blockId)
  );

  if (!targetSection) return state;

  const block = targetSection.blocks.find((b) => b.id === blockId);
  if (!block) return state;

  const sectionRows = getSectionRows(targetSection);

  const maxY = sectionRows - block.size.height;
  const clampedPosition = {
    ...position,
    y: Math.max(0, Math.min(position.y, maxY)),
  };

  return {
    ...state,
    sections: updateSectionBlocks(state.sections, targetSection.id, (blocks) =>
      blocks.map((b) =>
        b.id === blockId ? { ...b, position: clampedPosition } : b
      )
    ),
  };
};

export const resizeBlockState = (
  state: EditorState,
  blockId: string,
  size: BlockSize
): EditorState => {
  const targetSection = state.sections.find((section) =>
    section.blocks.some((b) => b.id === blockId)
  );

  if (!targetSection) return state;

  const block = targetSection.blocks.find((b) => b.id === blockId);
  if (!block) return state;

  const sectionRows = getSectionRows(targetSection);

  const maxHeight = sectionRows - block.position.y;
  const clampedSize = {
    ...size,
    height: Math.max(1, Math.min(size.height, maxHeight)),
  };

  return {
    ...state,
    sections: updateSectionBlocks(state.sections, targetSection.id, (blocks) =>
      blocks.map((b) => (b.id === blockId ? { ...b, size: clampedSize } : b))
    ),
  };
};

export const createBlockState = (
  state: EditorState,
  sectionId: string,
  block: BuilderBlock
): EditorState => {
  return {
    ...state,
    sections: updateSectionBlocks(state.sections, sectionId, (blocks) => [
      ...blocks,
      block,
    ]),
  };
};

export const deleteBlockState = (
  state: EditorState,
  sectionId: string,
  blockId: string
): EditorState => {
  const selectedBlockIds = new Set(state.selection.selectedBlockIds);
  selectedBlockIds.delete(blockId);

  return {
    ...state,
    sections: updateSectionBlocks(state.sections, sectionId, (blocks) =>
      blocks.filter((block) => block.id !== blockId)
    ),
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
  return {
    ...state,
    sections: updateSectionBlocks(state.sections, sectionId, (blocks) =>
      blocks.map((block) =>
        block.id === blockId ? { ...block, ...updates } : block
      )
    ),
  };
};

export const setBlockDraggingState = (
  state: EditorState,
  isBlockDragging: boolean
): EditorState => {
  return {
    ...state,
    ui: {
      ...state.ui,
      isBlockDragging,
    },
  };
};

export const setBlockResizingState = (
  state: EditorState,
  isBlockResizing: boolean
): EditorState => {
  return {
    ...state,
    ui: {
      ...state.ui,
      isBlockResizing,
    },
  };
};

export const setSectionResizingState = (
  state: EditorState,
  isSectionResizing: boolean
): EditorState => {
  return {
    ...state,
    ui: {
      ...state.ui,
      isSectionResizing,
    },
  };
};
