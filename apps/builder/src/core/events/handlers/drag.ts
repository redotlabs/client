import type { DragEventHandler, HandlerContext } from "./types";
import { moveBlock } from "../../actions";

const GRID_CELL_WIDTH = 40;
const GRID_CELL_HEIGHT = 24;

interface DragState {
  blockId: string;
  startX: number;
  startY: number;
  startPosition: { x: number; y: number; zIndex: number };
  currentPosition: { x: number; y: number };
}

let dragState: DragState | null = null;
let currentContext: HandlerContext | null = null;

const handleMouseMove = (event: MouseEvent) => {
  if (!dragState || !currentContext) return;
  dragHandler.onDragMove?.(event, currentContext);
};

const handleMouseUp = (event: MouseEvent) => {
  if (!currentContext) return;
  dragHandler.onDragEnd?.(event, currentContext);
};

export const startDrag = (
  event: MouseEvent,
  context: HandlerContext,
  blockId: string
) => {
  dragHandler.onDragStart?.(event, context, blockId);
};

/**
 * Drag Handler
 * 블록 드래그를 처리하는 핸들러
 */
export const dragHandler: DragEventHandler = {
  name: "drag",

  onDragStart: (
    event: MouseEvent,
    context: HandlerContext,
    blockId: string
  ) => {
    const block = context.state.blocks.get(blockId);
    if (!block) return;

    dragState = {
      blockId,
      startX: event.clientX,
      startY: event.clientY,
      startPosition: { ...block.position },
      currentPosition: { x: block.position.x, y: block.position.y },
    };
    currentContext = context;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  },

  onDragMove: (event: MouseEvent, context: HandlerContext) => {
    if (!dragState) return;

    const { blockId, startX, startY, startPosition, currentPosition } =
      dragState;
    const { dispatch } = context;

    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;

    const deltaColumns = Math.round(deltaX / GRID_CELL_WIDTH);
    const deltaRows = Math.round(deltaY / GRID_CELL_HEIGHT);

    const newX = Math.max(0, startPosition.x + deltaColumns);
    const newY = Math.max(0, startPosition.y + deltaRows);

    if (newX !== currentPosition.x || newY !== currentPosition.y) {
      dragState.currentPosition = { x: newX, y: newY };
      dispatch(
        moveBlock(blockId, {
          x: newX,
          y: newY,
          zIndex: startPosition.zIndex,
        })
      );
    }
  },

  onDragEnd: () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);

    dragState = null;
    currentContext = null;
  },
};
