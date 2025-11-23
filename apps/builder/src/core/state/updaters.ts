import type {
  EditorState,
  DragInteractionState,
  ResizeInteractionState,
} from "./types";
import type {
  BuilderBlock,
  BlockPosition,
  BlockSize,
  Section,
  Page,
} from "@/shared/types";
import { getSectionRows } from "@/shared/utils/sectionHeight";
import { DEFAULT_SECTION_ROWS } from "@/shared/constants/editorData";
import { createEmptyPage } from "@/shared/types/site";

// ============================================
// Site State Updaters
// ============================================

export const updateSiteState = (
  state: EditorState,
  updates: {
    name?: string;
    description?: string;
    favicon?: string;
  }
): EditorState => {
  return {
    ...state,
    site: {
      ...state.site,
      metadata: {
        ...state.site.metadata,
        ...(updates.name !== undefined && { name: updates.name }),
        ...(updates.description !== undefined && { description: updates.description }),
        ...(updates.favicon !== undefined && { favicon: updates.favicon }),
        updatedAt: new Date().toISOString(),
      },
    },
  };
};

// ============================================
// Page State Updaters
// ============================================

export const createPageState = (
  state: EditorState,
  page?: Page
): EditorState => {
  const newPage =
    page ||
    createEmptyPage(`Page ${state.site.pages.length + 1}`, `/page-${state.site.pages.length + 1}`);

  return {
    ...state,
    site: {
      ...state.site,
      pages: [...state.site.pages, newPage],
      metadata: {
        ...state.site.metadata,
        updatedAt: new Date().toISOString(),
      },
    },
    currentPageId: newPage.id,
  };
};

export const selectPageState = (
  state: EditorState,
  pageId: string
): EditorState => {
  const pageExists = state.site.pages.some((p) => p.id === pageId);
  if (!pageExists) return state;

  return {
    ...state,
    currentPageId: pageId,
    // 페이지 전환 시 선택 초기화
    selection: {
      ...state.selection,
      selectionType: null,
      selectedBlockIds: new Set(),
      lastSelectedId: null,
      selectedSectionId: null,
    },
  };
};

export const deletePageState = (
  state: EditorState,
  pageId: string
): EditorState => {
  // 최소 1개 페이지는 유지
  if (state.site.pages.length <= 1) return state;

  const updatedPages = state.site.pages.filter((p) => p.id !== pageId);

  // 삭제하는 페이지가 현재 페이지면 첫 번째 페이지로 이동
  const newCurrentPageId =
    state.currentPageId === pageId
      ? updatedPages[0].id
      : state.currentPageId;

  return {
    ...state,
    site: {
      ...state.site,
      pages: updatedPages,
      metadata: {
        ...state.site.metadata,
        updatedAt: new Date().toISOString(),
      },
    },
    currentPageId: newCurrentPageId,
    selection: {
      ...state.selection,
      selectionType: null,
      selectedBlockIds: new Set(),
      lastSelectedId: null,
      selectedSectionId: null,
    },
  };
};

export const updatePageState = (
  state: EditorState,
  pageId: string,
  updates: { name?: string; path?: string }
): EditorState => {
  const now = new Date().toISOString();

  return {
    ...state,
    site: {
      ...state.site,
      pages: state.site.pages.map((page) =>
        page.id === pageId
          ? {
              ...page,
              ...updates,
              metadata: {
                title: page.metadata?.title,
                description: page.metadata?.description,
                createdAt: page.metadata?.createdAt || now,
                updatedAt: now,
              },
            }
          : page
      ),
      metadata: {
        ...state.site.metadata,
        updatedAt: now,
      },
    },
  };
};

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
 * Helper to get current page from state
 */
const getCurrentPage = (state: EditorState): Page | undefined => {
  return state.site.pages.find((p) => p.id === state.currentPageId);
};

/**
 * Helper to update current page's sections
 */
const updateCurrentPageSections = (
  state: EditorState,
  updateFn: (sections: Section[]) => Section[]
): EditorState => {
  return {
    ...state,
    site: {
      ...state.site,
      pages: state.site.pages.map((page) =>
        page.id === state.currentPageId
          ? { ...page, sections: updateFn(page.sections) }
          : page
      ),
    },
  };
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
  const currentPage = getCurrentPage(state);
  const currentSections = currentPage?.sections || [];

  const newSection = section || {
    id: generateTempId(),
    name: `Section ${currentSections.length + 1}`,
    rows: DEFAULT_SECTION_ROWS,
    blocks: [],
    metadata: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };

  const updated = updateCurrentPageSections(state, (sections) => [
    ...sections,
    newSection,
  ]);

  return {
    ...updated,
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
  const currentPage = getCurrentPage(state);
  const currentSections = currentPage?.sections || [];

  const newSection = section || {
    id: generateTempId(),
    name: `Section ${currentSections.length + 1}`,
    rows: DEFAULT_SECTION_ROWS,
    blocks: [],
    metadata: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };

  const updated = updateCurrentPageSections(state, (sections) => [
    ...sections.slice(0, targetIndex),
    newSection,
    ...sections.slice(targetIndex),
  ]);

  return {
    ...updated,
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
  const updated = updateCurrentPageSections(state, (sections) =>
    sections.filter((s) => s.id !== sectionId)
  );

  const newSelectedSectionId =
    state.selection.selectedSectionId === sectionId
      ? null
      : state.selection.selectedSectionId;

  return {
    ...updated,
    selection: {
      ...state.selection,
      selectedSectionId: newSelectedSectionId,
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
  const currentPage = getCurrentPage(state);
  const currentSections = currentPage?.sections || [];

  if (
    fromIndex < 0 ||
    fromIndex >= currentSections.length ||
    toIndex < 0 ||
    toIndex >= currentSections.length
  ) {
    return state;
  }

  return updateCurrentPageSections(state, (sections) => {
    const newSections = [...sections];
    [newSections[fromIndex], newSections[toIndex]] = [
      newSections[toIndex],
      newSections[fromIndex],
    ];
    return newSections;
  });
};

export const updateSectionState = (
  state: EditorState,
  sectionId: string,
  updates: { name?: string }
): EditorState => {
  const now = new Date().toISOString();

  return updateCurrentPageSections(state, (sections) =>
    sections.map((section) =>
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
    )
  );
};

export const resizeSectionState = (
  state: EditorState,
  sectionId: string,
  rows: number
): EditorState => {
  return updateCurrentPageSections(state, (sections) =>
    sections.map((section) =>
      section.id === sectionId ? { ...section, rows } : section
    )
  );
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
  const currentPage = getCurrentPage(state);
  const currentSections = currentPage?.sections || [];

  const targetSection = currentSections.find((section) =>
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

  return updateCurrentPageSections(state, (sections) =>
    updateSectionBlocks(sections, targetSection.id, (blocks) =>
      blocks.map((b) =>
        b.id === blockId ? { ...b, position: clampedPosition } : b
      )
    )
  );
};

export const resizeBlockState = (
  state: EditorState,
  blockId: string,
  size: BlockSize
): EditorState => {
  const currentPage = getCurrentPage(state);
  const currentSections = currentPage?.sections || [];

  const targetSection = currentSections.find((section) =>
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

  return updateCurrentPageSections(state, (sections) =>
    updateSectionBlocks(sections, targetSection.id, (blocks) =>
      blocks.map((b) => (b.id === blockId ? { ...b, size: clampedSize } : b))
    )
  );
};

export const createBlockState = (
  state: EditorState,
  sectionId: string,
  block: BuilderBlock
): EditorState => {
  return updateCurrentPageSections(state, (sections) =>
    updateSectionBlocks(sections, sectionId, (blocks) => [...blocks, block])
  );
};

export const deleteBlockState = (
  state: EditorState,
  sectionId: string,
  blockId: string
): EditorState => {
  const selectedBlockIds = new Set(state.selection.selectedBlockIds);
  selectedBlockIds.delete(blockId);

  const updated = updateCurrentPageSections(state, (sections) =>
    updateSectionBlocks(sections, sectionId, (blocks) =>
      blocks.filter((block) => block.id !== blockId)
    )
  );

  return {
    ...updated,
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
  return updateCurrentPageSections(state, (sections) =>
    updateSectionBlocks(sections, sectionId, (blocks) =>
      blocks.map((block) =>
        block.id === blockId ? { ...block, ...updates } : block
      )
    )
  );
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

// ============================================
// Interaction State Updaters (Preview)
// ============================================

export const startDragInteractionState = (
  state: EditorState,
  dragState: DragInteractionState
): EditorState => {
  return {
    ...state,
    interaction: {
      type: "drag",
      drag: dragState,
      resize: null,
    },
  };
};

export const updateDragInteractionState = (
  state: EditorState,
  dragState: Partial<DragInteractionState>
): EditorState => {
  if (!state.interaction.drag) return state;

  return {
    ...state,
    interaction: {
      ...state.interaction,
      drag: {
        ...state.interaction.drag,
        ...dragState,
      },
    },
  };
};

export const endDragInteractionState = (state: EditorState): EditorState => {
  return {
    ...state,
    interaction: {
      type: null,
      drag: null,
      resize: null,
    },
  };
};

export const startResizeInteractionState = (
  state: EditorState,
  resizeState: ResizeInteractionState
): EditorState => {
  return {
    ...state,
    interaction: {
      type: "resize",
      drag: null,
      resize: resizeState,
    },
  };
};

export const updateResizeInteractionState = (
  state: EditorState,
  resizeState: Partial<ResizeInteractionState>
): EditorState => {
  if (!state.interaction.resize) return state;

  return {
    ...state,
    interaction: {
      ...state.interaction,
      resize: {
        ...state.interaction.resize,
        ...resizeState,
      },
    },
  };
};

export const endResizeInteractionState = (state: EditorState): EditorState => {
  return {
    ...state,
    interaction: {
      type: null,
      drag: null,
      resize: null,
    },
  };
};

export const clearInteractionState = (state: EditorState): EditorState => {
  return {
    ...state,
    interaction: {
      type: null,
      drag: null,
      resize: null,
    },
  };
};
