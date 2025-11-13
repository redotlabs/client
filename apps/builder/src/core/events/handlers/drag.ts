import type { DragEventHandler, HandlerContext } from "./types";
import {
  moveBlock,
  setBlockDragging,
  startDragInteraction,
  updateDragInteraction,
  endDragInteraction,
} from "../../actions";
import { COLUMN_WIDTH } from "@/shared/constants/editorData";

interface DragState {
  blockId: string;
  startX: number;
  startY: number;
  startPosition: { x: number; y: number; zIndex: number };
  currentPosition: { x: number; y: number };
  hasStartedDragging: boolean;
}

/**
 * Drag Handler (Preview Mode)
 * 블록 드래그를 미리보기 방식으로 처리하는 핸들러
 *
 * Flow:
 * 1. onDragStart: Interaction State 초기화 + UI 플래그 설정
 * 2. onDragMove: Interaction State만 업데이트 (실제 데이터 변경 없음)
 * 3. onDragEnd: 최종 위치를 실제 데이터에 반영 + Interaction 종료
 */
export const createDragHandler = (): DragEventHandler => {
  let dragState: DragState | null = null;
  let currentContext: HandlerContext | null = null;

  const handleMouseMove = (event: MouseEvent) => {
    if (!dragState || !currentContext) return;
    handler.onDragMove(event, currentContext);
  };

  const handleMouseUp = (event: MouseEvent) => {
    if (!currentContext) return;
    handler.onDragEnd(event, currentContext);
  };

  const handler: DragEventHandler = {
    name: "drag",

    onDragStart: (
      event: MouseEvent,
      context: HandlerContext,
      blockId: string
    ) => {
      let block = null;
      for (const section of context.state.sections) {
        block = section.blocks.find((b) => b.id === blockId);
        if (block) break;
      }

      if (!block) return;

      dragState = {
        blockId,
        startX: event.clientX,
        startY: event.clientY,
        startPosition: { ...block.position },
        currentPosition: { x: block.position.x, y: block.position.y },
        hasStartedDragging: false,
      };
      currentContext = context;

      // Interaction State 초기화
      context.dispatch(
        startDragInteraction({
          blockId,
          startPosition: block.position,
          currentPosition: block.position,
          previewPosition: block.position,
          startMousePosition: { x: event.clientX, y: event.clientY },
        })
      );

      // UI 플래그 설정
      context.dispatch(setBlockDragging(true));

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },

    onDragMove: (event: MouseEvent, context: HandlerContext) => {
      if (!dragState) return;

      const { startX, startY, startPosition, currentPosition } = dragState;
      const { dispatch, state } = context;
      const { gridConfig } = state;

      const cellWidth = COLUMN_WIDTH;
      const cellHeight = gridConfig.rowHeight;

      const deltaX = event.clientX - startX;
      const deltaY = event.clientY - startY;

      const deltaColumns = Math.round(deltaX / cellWidth);
      const deltaRows = Math.round(deltaY / cellHeight);

      const newX = Math.max(0, startPosition.x + deltaColumns);
      const newY = Math.max(0, startPosition.y + deltaRows);

      // 위치가 변경된 경우에만 Interaction State 업데이트
      if (newX !== currentPosition.x || newY !== currentPosition.y) {
        dragState.currentPosition = { x: newX, y: newY };

        // 실제 데이터 변경 대신 Interaction State만 업데이트
        dispatch(
          updateDragInteraction({
            currentPosition: {
              x: newX,
              y: newY,
              zIndex: startPosition.zIndex,
            },
            previewPosition: {
              x: newX,
              y: newY,
              zIndex: startPosition.zIndex,
            },
          })
        );
      }
    },

    onDragEnd: () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);

      if (currentContext && dragState) {
        const { blockId, currentPosition, startPosition } = dragState;

        // 최종 위치를 실제 데이터에 반영 (여기서만 데이터 변경!)
        currentContext.dispatch(
          moveBlock(blockId, {
            x: currentPosition.x,
            y: currentPosition.y,
            zIndex: startPosition.zIndex,
          })
        );

        // Interaction 종료
        currentContext.dispatch(endDragInteraction());

        // UI 플래그 해제
        currentContext.dispatch(setBlockDragging(false));
      }

      dragState = null;
      currentContext = null;
    },
  };

  return handler;
};
