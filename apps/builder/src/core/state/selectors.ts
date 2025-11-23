import type { EditorState, StateSelector } from "./types";
import type { BuilderBlock, Section, Page, SiteMetadata } from "@/shared/types";

/**
 * Site Selectors
 */
export const getSiteMetadata: StateSelector<SiteMetadata> = (state) =>
  state.site.metadata;

/**
 * Page Selectors
 */
export const getCurrentPage: StateSelector<Page | undefined> = (state) =>
  state.site.pages.find((p) => p.id === state.currentPageId);

export const getCurrentPageId: StateSelector<string> = (state) =>
  state.currentPageId;

export const getAllPages: StateSelector<Page[]> = (state) => state.site.pages;

/**
 * Section Selectors
 * 현재 페이지의 sections를 반환
 */
const getCurrentSections: StateSelector<Section[]> = (state) => {
  const currentPage = getCurrentPage(state);
  return currentPage?.sections || [];
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
  for (const section of sections) {
    const block = section.blocks.find((b) => b.id === blockId);
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
  return getBlock(firstId)(state);
};

export const getSelectionType: StateSelector<
  "section" | "block" | null
> = (state) => state.selection.selectionType;

/**
 * 블록이 속한 섹션 찾기
 */
export const getParentSection: (
  blockId: string
) => StateSelector<Section | undefined> = (blockId) => (state) => {
  const sections = getCurrentSections(state);
  return sections.find((section) =>
    section.blocks.some((b) => b.id === blockId)
  );
};

/**
 * Grid Selectors
 */
export const getGridConfig: StateSelector<EditorState["gridConfig"]> = (
  state
) => state.gridConfig;
