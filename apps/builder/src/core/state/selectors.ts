import type { EditorState, StateSelector } from "./types";
import type { BuilderBlock, Section } from "@/shared/types";

/**
 * Section Selectors
 */
export const getSection: (
  sectionId: string
) => StateSelector<Section | undefined> = (sectionId) => (state) =>
  state.sections.get(sectionId);

export const getAllSections: StateSelector<Section[]> = (state) =>
  Array.from(state.sections.values());

export const getSectionCount: StateSelector<number> = (state) =>
  state.sections.size;

/**
 * Block Selectors
 */
export const getBlock: (
  blockId: string
) => StateSelector<BuilderBlock | undefined> = (blockId) => (state) => {
  for (const section of state.sections.values()) {
    const block = section.blocks.find((b) => b.id === blockId);
    if (block) return block;
  }
  return undefined;
};

export const getAllBlocks: StateSelector<BuilderBlock[]> = (state) =>
  Array.from(state.sections.values()).flatMap((section) => section.blocks);

export const getBlockCount: StateSelector<number> = (state) =>
  Array.from(state.sections.values()).reduce(
    (count, section) => count + section.blocks.length,
    0
  );

export const getBlocksInSection: (
  sectionId: string
) => StateSelector<BuilderBlock[]> = (sectionId) => (state) => {
  const section = state.sections.get(sectionId);
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

export const getActiveSectionId: StateSelector<string | null> = (state) =>
  state.selection.activeSectionId;

/**
 * Grid Selectors
 */
export const getGridConfig: StateSelector<EditorState["gridConfig"]> = (
  state
) => state.gridConfig;
