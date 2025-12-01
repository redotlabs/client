import type { DropEventHandler, HandlerContext } from "./types";
import { createBlock, setBlockDragging } from "@/core/actions";
import type { BlockTemplate } from "@/core/blocks";

const COLUMN_WIDTH = 40;

const convertToGridCoordinates = (
  event: DragEvent,
  containerElement: HTMLElement,
  rowHeight: number
): { x: number; y: number } => {
  const rect = containerElement.getBoundingClientRect();

  const mouseX = event.clientX - rect.left + containerElement.scrollLeft;
  const mouseY = event.clientY - rect.top + containerElement.scrollTop;

  const gridX = Math.floor(mouseX / COLUMN_WIDTH);
  const gridY = Math.floor(mouseY / rowHeight);

  return { x: gridX, y: gridY };
};

/**
 * Drop Handler
 *
 * Flow:
 * 1. BlockLibrary에서 드래그 시작 → window.__draggedTemplate에 저장
 * 2. Canvas에서 dragover → 드롭 가능하도록 preventDefault + isDragging 상태 업데이트
 * 3. Canvas에서 drop → 그리드 좌표 계산 후 createBlock 액션 dispatch
 */
export const createDropHandler = (): DropEventHandler => ({
  name: "drop",

  onDragOver: (event: DragEvent, context: HandlerContext) => {
    event.preventDefault();
    event.dataTransfer!.dropEffect = "copy";

    if (!context.state.ui.isBlockDragging) {
      context.dispatch(setBlockDragging(true));
    }
  },

  onDrop: (event: DragEvent, context: HandlerContext) => {
    event.preventDefault();

    const template = window.__draggedTemplate as BlockTemplate | undefined;
    if (!template) {
      context.dispatch(setBlockDragging(false));
      return;
    }

    const target = event.currentTarget as HTMLElement;
    if (!target) {
      context.dispatch(setBlockDragging(false));
      return;
    }

    const sectionElement = target.closest("[data-section-id]") as HTMLElement;
    const sectionId =
      sectionElement?.dataset.sectionId ||
      context.state.selection.selectedSectionId;

    if (!sectionId) {
      console.warn("No section found for drop");
      context.dispatch(setBlockDragging(false));
      return;
    }

    const gridPosition = convertToGridCoordinates(
      event,
      target,
      context.state.gridConfig.rowHeight
    );

    const blockPosition = {
      x: gridPosition.x,
      y: gridPosition.y,
      zIndex: 1,
    };

    const blockSize = template.defaultProps.size;
    const newBlock = template.createBlock(blockPosition, blockSize);

    context.dispatch(createBlock(sectionId, newBlock));

    delete window.__draggedTemplate;

    context.dispatch(setBlockDragging(false));
  },

  onDragLeave: (event: DragEvent, context: HandlerContext) => {
    if (event.currentTarget === event.target) {
      context.dispatch(setBlockDragging(false));
    }
  },
});
