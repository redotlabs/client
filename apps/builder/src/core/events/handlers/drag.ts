import type { DragEventHandler, HandlerContext } from "./types";
import {
  moveBlock,
  setBlockDragging,
  startDragInteraction,
  updateDragInteraction,
  endDragInteraction,
} from "@/core/actions";
import { COLUMN_WIDTH } from "@/shared/constants/editorData";
import { toast } from "@redotlabs/ui";

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
 * 1. onDragStart: 이벤트 리스너 등록 (내부 dragState만 초기화)
 * 2. onDragMove (첫 움직임): Interaction State 초기화 + UI 플래그 설정
 * 3. onDragMove (이후): Interaction State만 업데이트 (실제 데이터 변경 없음)
 * 4. onDragEnd: 드래그가 발생했으면 최종 위치를 데이터에 반영 + Interaction 종료
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

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },

    onDragMove: (event: MouseEvent, context: HandlerContext) => {
      if (!dragState) return;

      const { blockId, startX, startY, startPosition, currentPosition } =
        dragState;
      const { dispatch, state } = context;
      const { gridConfig } = state;

      if (!dragState.hasStartedDragging) {
        dragState.hasStartedDragging = true;

        dispatch(
          startDragInteraction({
            blockId,
            startPosition: startPosition,
            currentPosition: startPosition,
            previewPosition: startPosition,
            startMousePosition: { x: startX, y: startY },
          })
        );

        dispatch(setBlockDragging(true));
      }

      const cellWidth = COLUMN_WIDTH;
      const cellHeight = gridConfig.rowHeight;

      const deltaX = event.clientX - startX;
      const deltaY = event.clientY - startY;

      const deltaColumns = Math.round(deltaX / cellWidth);
      const deltaRows = Math.round(deltaY / cellHeight);

      const newX = startPosition.x + deltaColumns;
      const newY = startPosition.y + deltaRows;

      if (newX !== currentPosition.x || newY !== currentPosition.y) {
        dragState.currentPosition = { x: newX, y: newY };

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
        if (dragState.hasStartedDragging) {
          const { blockId, currentPosition, startPosition } = dragState;

          const action = moveBlock(blockId, {
            x: currentPosition.x,
            y: currentPosition.y,
            zIndex: startPosition.zIndex,
          });

          const validationResult = currentContext.dispatch(action);

          if (!validationResult.valid) {
            const errorMessage =
              validationResult.violations[0]?.message ||
              "블록을 이동할 수 없습니다";
            toast.error(errorMessage);
          }

          currentContext.dispatch(endDragInteraction());
          currentContext.dispatch(setBlockDragging(false));
        }
      }

      dragState = null;
      currentContext = null;
    },
  };

  return handler;
};
