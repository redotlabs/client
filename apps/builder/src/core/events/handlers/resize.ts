import type {
  ResizeEventHandler,
  HandlerContext,
  ResizeDirection,
} from "./types";
import {
  resizeBlock,
  moveBlock,
  setBlockResizing,
  startResizeInteraction,
  updateResizeInteraction,
  endResizeInteraction,
} from "@/core/actions";
import { COLUMN_WIDTH } from "@/shared/constants/editorData";

/**
 * Resize State
 * 리사이징 중 상태를 관리 (Handler 내부용)
 */
interface ResizeState {
  blockId: string;
  direction: ResizeDirection;
  startX: number;
  startY: number;
  startSize: { width: number; height: number };
  startPosition: { x: number; y: number; zIndex: number };
  currentSize: { width: number; height: number };
  currentPosition: { x: number; y: number };
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
 * Resize Handler (Preview Mode)
 * 블록 리사이징을 미리보기 방식으로 처리하는 핸들러
 *
 * Flow:
 * 1. onResizeStart: Interaction State 초기화 + UI 플래그 설정
 * 2. onResizeMove: Interaction State만 업데이트 (실제 데이터 변경 없음)
 * 3. onResizeEnd: 최종 크기/위치를 실제 데이터에 반영 + Interaction 종료
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

    const { state, dispatch } = context;

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
      currentSize: { ...block.size },
      currentPosition: { x: block.position.x, y: block.position.y },
      hasStartedResizing: false,
    };

    // Interaction State 초기화
    dispatch(
      startResizeInteraction({
        blockId,
        direction,
        startPosition: block.position,
        startSize: block.size,
        currentSize: block.size,
        previewSize: block.size,
        startMousePosition: { x: event.clientX, y: event.clientY },
      })
    );

    // UI 플래그 설정
    dispatch(setBlockResizing(true));

    currentContext = context;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  },

  onResizeMove: (event: MouseEvent, context: HandlerContext) => {
    if (!resizeState) return;

    const { dispatch, state } = context;
    const { gridConfig } = state;

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

    // 크기나 위치가 변경된 경우에만 Interaction State 업데이트
    if (
      newWidth !== resizeState.currentSize.width ||
      newHeight !== resizeState.currentSize.height ||
      newX !== resizeState.currentPosition.x ||
      newY !== resizeState.currentPosition.y
    ) {
      resizeState.currentSize = { width: newWidth, height: newHeight };
      resizeState.currentPosition = { x: newX, y: newY };

      // 실제 데이터 변경 대신 Interaction State만 업데이트
      dispatch(
        updateResizeInteraction({
          currentSize: { width: newWidth, height: newHeight },
          previewSize: { width: newWidth, height: newHeight },
          startPosition: {
            x: newX,
            y: newY,
            zIndex: startPosition.zIndex,
          },
        })
      );
    }
  },

  onResizeEnd: () => {
    if (!resizeState || !currentContext) return;

    const { blockId, currentSize, currentPosition, startPosition } =
      resizeState;

    // 최종 크기를 실제 데이터에 반영 (여기서만 데이터 변경!)
    currentContext.dispatch(
      resizeBlock(blockId, {
        width: currentSize.width,
        height: currentSize.height,
      })
    );

    // 위치가 변경된 경우 (n, w, nw, sw 방향 리사이즈)
    if (
      currentPosition.x !== startPosition.x ||
      currentPosition.y !== startPosition.y
    ) {
      currentContext.dispatch(
        moveBlock(blockId, {
          x: currentPosition.x,
          y: currentPosition.y,
          zIndex: startPosition.zIndex,
        })
      );
    }

    // Interaction 종료
    currentContext.dispatch(endResizeInteraction());

    // UI 플래그 해제
    currentContext.dispatch(setBlockResizing(false));

    resizeState = null;
  },
};
