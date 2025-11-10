import type {
  ResizeEventHandler,
  HandlerContext,
  ResizeDirection,
} from "./types";
import { resizeBlock, moveBlock, setBlockResizing } from "@/core/actions";
import { COLUMN_WIDTH } from "@/shared/constants/editorData";

/**
 * Resize State
 * 리사이징 중 상태를 관리
 */
interface ResizeState {
  blockId: string;
  direction: ResizeDirection;
  startX: number;
  startY: number;
  startSize: { width: number; height: number };
  startPosition: { x: number; y: number; zIndex: number };
  hasStartedResizing: boolean;
}

let resizeState: ResizeState | null = null;
let currentContext: HandlerContext | null = null;

const handleMouseMove = (event: MouseEvent) => {
  if (!currentContext) return;
  resizeHandler.onResizeMove?.(event, currentContext);
};

const handleMouseUp = (event: MouseEvent) => {
  if (!currentContext) return;
  resizeHandler.onResizeEnd?.(event, currentContext);
  cleanup();
};

const cleanup = () => {
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
  currentContext = null;
};

/**
 * Resize Handler
 * 블록 리사이징을 처리하는 핸들러
 */
export const resizeHandler: ResizeEventHandler = {
  name: "resize",

  onResizeStart: (
    event: MouseEvent,
    context: HandlerContext,
    blockId: string,
    direction: ResizeDirection
  ) => {
    event.stopPropagation();
    event.preventDefault();

    const { state } = context;

    let block = null;
    for (const section of state.sections) {
      block = section.blocks.find((b) => b.id === blockId);
      if (block) break;
    }

    if (!block) return;

    resizeState = {
      blockId,
      direction,
      startX: event.clientX,
      startY: event.clientY,
      startSize: { ...block.size },
      startPosition: { ...block.position },
      hasStartedResizing: false,
    };

    currentContext = context;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  },

  onResizeMove: (event: MouseEvent, context: HandlerContext) => {
    if (!resizeState) return;

    const { dispatch, state } = context;
    const { gridConfig } = state;

    if (!resizeState.hasStartedResizing) {
      resizeState.hasStartedResizing = true;
      dispatch(setBlockResizing(true));
    }

    const deltaX = event.clientX - resizeState.startX;
    const deltaY = event.clientY - resizeState.startY;

    const cellWidth = COLUMN_WIDTH;
    const cellHeight = gridConfig.rowHeight;

    const deltaColumns = Math.round(deltaX / cellWidth);
    const deltaRows = Math.round(deltaY / cellHeight);

    const { direction, startSize, startPosition } = resizeState;

    let newWidth = startSize.width;
    let newHeight = startSize.height;
    let newX = startPosition.x;
    let newY = startPosition.y;

    if (direction.includes("e")) {
      newWidth = Math.max(1, startSize.width + deltaColumns);
    }
    if (direction.includes("w")) {
      newWidth = Math.max(1, startSize.width - deltaColumns);
      const widthChange = newWidth - startSize.width;
      newX = startPosition.x - widthChange;
    }
    if (direction.includes("s")) {
      newHeight = Math.max(1, startSize.height + deltaRows);
    }
    if (direction.includes("n")) {
      newHeight = Math.max(1, startSize.height - deltaRows);
      const heightChange = newHeight - startSize.height;
      newY = startPosition.y - heightChange;
    }

    if (newX < 0) {
      const adjustedWidth = newWidth + newX;
      newX = 0;
      newWidth = Math.max(1, adjustedWidth);
    }

    if (newY < 0) {
      const adjustedHeight = newHeight + newY;
      newY = 0;
      newHeight = Math.max(1, adjustedHeight);
    }

    if (gridConfig.columns > 0) {
      const maxWidth = Math.max(1, gridConfig.columns - newX);
      newWidth = Math.min(newWidth, maxWidth);
    }

    dispatch(
      resizeBlock(resizeState.blockId, {
        width: newWidth,
        height: newHeight,
      })
    );

    if (newX !== startPosition.x || newY !== startPosition.y) {
      dispatch(
        moveBlock(resizeState.blockId, {
          x: newX,
          y: newY,
          zIndex: startPosition.zIndex,
        })
      );
    }
  },

  onResizeEnd: () => {
    if (!resizeState) return;

    if (currentContext) {
      currentContext.dispatch(setBlockResizing(false));
    }

    resizeState = null;
  },
};
