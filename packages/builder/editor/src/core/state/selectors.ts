import type { EditorState, StateSelector } from './types';
import type {
  BuilderBlock,
  Section,
  PageContent,
} from '@repo/builder/renderer';

/**
 * Site Selectors
 */
// export const getSiteMetadata: StateSelector<SiteMetadata> = (state) =>
//   state.page.metadata;

/**
 * Content Selectors
 */
export const getCurrentContent: StateSelector<PageContent | undefined> = (
  state
) => state.content;

// export const getCurrentPageId: StateSelector<string> = (state) =>
//   state.currentPageId;

// export const getAllPages: StateSelector<Page[]> = (state) => state.site.pages;

/**
 * Section Selectors
 * 현재 페이지의 sections를 반환
 */
const getCurrentSections: StateSelector<Section[]> = (state) => {
  const currentContent = getCurrentContent(state);
  return currentContent?.sections || [];
};

/**
 * Section Selectors
 */
export const getSection: (
  sectionId: string
) => StateSelector<Section | undefined> = (sectionId) => (state) => {
  const sections = getCurrentSections(state);
  return sections.find((s) => s.id === sectionId);
};

export const getAllSections: StateSelector<Section[]> = (state) =>
  getCurrentSections(state);

export const getSectionCount: StateSelector<number> = (state) =>
  getCurrentSections(state).length;

/**
 * Block Selectors
 */
export const getBlock: (
  blockId: string
) => StateSelector<BuilderBlock | undefined> = (blockId) => (state) => {
  const sections = getCurrentSections(state);

  const findBlockRecursive = (
    blocks: BuilderBlock[]
  ): BuilderBlock | undefined => {
    for (const block of blocks) {
      if (block.id === blockId) return block;

      if (block.component === 'frame' && Array.isArray(block.children)) {
        const childBlock = findBlockRecursive(block.children as BuilderBlock[]);
        if (childBlock) return childBlock;
      }
    }
    return undefined;
  };

  for (const section of sections) {
    const block = findBlockRecursive(section.blocks);
    if (block) return block;
  }
  return undefined;
};

export const getAllBlocks: StateSelector<BuilderBlock[]> = (state) => {
  const sections = getCurrentSections(state);
  return sections.flatMap((section) => section.blocks);
};

export const getBlockCount: StateSelector<number> = (state) => {
  const sections = getCurrentSections(state);
  return sections.reduce((count, section) => count + section.blocks.length, 0);
};

export const getBlocksInSection: (
  sectionId: string
) => StateSelector<BuilderBlock[]> = (sectionId) => (state) => {
  const sections = getCurrentSections(state);
  const section = sections.find((s) => s.id === sectionId);
  return section?.blocks || [];
};

/**
 * Selection Selectors
 */
export const getSelectedBlockIds: StateSelector<string[]> = (state) =>
  Array.from(state.selection.selectedBlockIds);

export const getSelectedBlocks: StateSelector<BuilderBlock[]> = (state) => {
  const selectedIds = state.selection.selectedBlockIds;
  const allBlocks = getAllBlocks(state);
  return allBlocks.filter((block) => selectedIds.has(block.id));
};

export const isBlockSelected: (blockId: string) => StateSelector<boolean> =
  (blockId) => (state) =>
    state.selection.selectedBlockIds.has(blockId);

export const getSelectionCount: StateSelector<number> = (state) =>
  state.selection.selectedBlockIds.size;

export const getSelectedSectionId: StateSelector<string | null> = (state) =>
  state.selection.selectedSectionId;

export const getSelectedSection: StateSelector<Section | undefined> = (
  state
) => {
  if (!state.selection.selectedSectionId) return undefined;
  const sections = getCurrentSections(state);
  return sections.find((s) => s.id === state.selection.selectedSectionId);
};

export const getFirstSelectedBlock: StateSelector<BuilderBlock | undefined> = (
  state
) => {
  const selectedIds = state.selection.selectedBlockIds;
  if (selectedIds.size === 0) return undefined;

  const firstId = Array.from(selectedIds)[0];
  if (!firstId) return undefined;
  return getBlock(firstId)(state);
};

export const getSelectionType: StateSelector<'section' | 'block' | null> = (
  state
) => state.selection.selectionType;

/**
 * 블록이 속한 섹션 찾기
 * Frame children의 경우 Frame이 속한 섹션을 반환
 */
export const getParentSection: (
  blockId: string
) => StateSelector<Section | undefined> = (blockId) => (state) => {
  const sections = getCurrentSections(state);

  // Helper function to check if block exists in blocks array (including Frame children)
  const hasBlockRecursive = (blocks: BuilderBlock[]): boolean => {
    for (const block of blocks) {
      if (block.id === blockId) return true;

      // Frame 블록의 children도 검색
      if (block.component === 'frame' && Array.isArray(block.children)) {
        if (hasBlockRecursive(block.children as BuilderBlock[])) return true;
      }
    }
    return false;
  };

  return sections.find((section) => hasBlockRecursive(section.blocks));
};

/**
 * Grid Selectors
 */
export const getGridConfig: StateSelector<EditorState['gridConfig']> = (
  state
) => state.gridConfig;
