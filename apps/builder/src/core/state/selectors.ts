import type { EditorState, StateSelector } from "./types";
import type { BuilderBlock, Section } from "@/shared/types";

/**
 * Section Selectors
 */
export const getSection: (
  sectionId: string
) => StateSelector<Section | undefined> = (sectionId) => (state) =>
  state.sections.find((s) => s.id === sectionId);

export const getAllSections: StateSelector<Section[]> = (state) =>
  state.sections;

export const getSectionCount: StateSelector<number> = (state) =>
  state.sections.length;

/**
 * Block Selectors
 */
export const getBlock: (
  blockId: string
) => StateSelector<BuilderBlock | undefined> = (blockId) => (state) => {
  for (const section of state.sections) {
    const block = section.blocks.find((b) => b.id === blockId);
    if (block) return block;
  }
  return undefined;
};

export const getAllBlocks: StateSelector<BuilderBlock[]> = (state) =>
  state.sections.flatMap((section) => section.blocks);

export const getBlockCount: StateSelector<number> = (state) =>
  state.sections.reduce(
    (count, section) => count + section.blocks.length,
    0
  );

export const getBlocksInSection: (
  sectionId: string
) => StateSelector<BuilderBlock[]> = (sectionId) => (state) => {
  const section = state.sections.find((s) => s.id === sectionId);
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
  return state.sections.find((s) => s.id === state.selection.selectedSectionId);
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
  return state.sections.find((section) =>
    section.blocks.some((b) => b.id === blockId)
  );
};

/**
 * Grid Selectors
 */
export const getGridConfig: StateSelector<EditorState["gridConfig"]> = (
  state
) => state.gridConfig;
