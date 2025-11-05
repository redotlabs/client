import type {
  ResizeEventHandler,
  HandlerContext,
  ResizeDirection,
} from "./types";
import { resizeBlock, moveBlock, setResizing } from "@/core/actions";

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
    const block = state.blocks.get(blockId);

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
      dispatch(setResizing(true));
    }

    const deltaX = event.clientX - resizeState.startX;
    const deltaY = event.clientY - resizeState.startY;

    const cellWidth =
      gridConfig.columns > 0 ? window.innerWidth / gridConfig.columns : 100;
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
      currentContext.dispatch(setResizing(false));
    }

    resizeState = null;
  },
};
