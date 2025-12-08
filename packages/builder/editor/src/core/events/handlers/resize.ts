import type {
  ResizeEventHandler,
  HandlerContext,
  ResizeDirection,
} from './types';
import {
  resizeBlock,
  moveBlock,
  setBlockResizing,
  startResizeInteraction,
  updateResizeInteraction,
  endResizeInteraction,
} from '@/core/actions';
import { COLUMN_WIDTH } from '@/shared/constants/editorData';
import { toast } from '@redotlabs/ui';

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
  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseup', handleMouseUp);
  currentContext = null;
};

/**
 * Resize Handler (Preview Mode)
 * 블록 리사이징을 미리보기 방식으로 처리하는 핸들러
 *
 * Flow:
 * 1. onResizeStart: 이벤트 리스너 등록 (내부 resizeState만 초기화)
 * 2. onResizeMove (첫 움직임): Interaction State 초기화 + UI 플래그 설정
 * 3. onResizeMove (이후): Interaction State만 업데이트 (실제 데이터 변경 없음)
 * 4. onResizeEnd: 리사이즈가 발생했으면 최종 크기/위치를 데이터에 반영 + Interaction 종료
 */
export const resizeHandler: ResizeEventHandler = {
  name: 'resize',

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
    for (const section of state.page.content.sections) {
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

    currentContext = context;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  },

  onResizeMove: (event: MouseEvent, context: HandlerContext) => {
    if (!resizeState) return;

    const { dispatch, state } = context;
    const { gridConfig } = state;

    if (!resizeState.hasStartedResizing) {
      resizeState.hasStartedResizing = true;

      dispatch(
        startResizeInteraction({
          blockId: resizeState.blockId,
          direction: resizeState.direction,
          startPosition: resizeState.startPosition,
          startSize: resizeState.startSize,
          currentSize: resizeState.currentSize,
          previewSize: resizeState.currentSize,
          startMousePosition: {
            x: resizeState.startX,
            y: resizeState.startY,
          },
        })
      );

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

    if (direction.includes('e')) {
      newWidth = Math.max(1, startSize.width + deltaColumns);
    }
    if (direction.includes('w')) {
      newWidth = Math.max(1, startSize.width - deltaColumns);
      const widthChange = newWidth - startSize.width;
      newX = startPosition.x - widthChange;
    }
    if (direction.includes('s')) {
      newHeight = Math.max(1, startSize.height + deltaRows);
    }
    if (direction.includes('n')) {
      newHeight = Math.max(1, startSize.height - deltaRows);
      const heightChange = newHeight - startSize.height;
      newY = startPosition.y - heightChange;
    }

    if (
      newWidth !== resizeState.currentSize.width ||
      newHeight !== resizeState.currentSize.height ||
      newX !== resizeState.currentPosition.x ||
      newY !== resizeState.currentPosition.y
    ) {
      resizeState.currentSize = { width: newWidth, height: newHeight };
      resizeState.currentPosition = { x: newX, y: newY };

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

    if (resizeState.hasStartedResizing) {
      const { blockId, currentSize, currentPosition, startPosition } =
        resizeState;

      const resizeAction = resizeBlock(blockId, {
        width: currentSize.width,
        height: currentSize.height,
      });

      const validationResult = currentContext.dispatch(resizeAction);

      if (validationResult.valid) {
        if (
          currentPosition.x !== startPosition.x ||
          currentPosition.y !== startPosition.y
        ) {
          const moveAction = moveBlock(blockId, {
            x: currentPosition.x,
            y: currentPosition.y,
            zIndex: startPosition.zIndex,
          });

          const moveValidationResult = currentContext.dispatch(moveAction);

          if (!moveValidationResult.valid) {
            const errorMessage =
              moveValidationResult.violations[0]?.message ||
              '블록을 이동할 수 없습니다';
            toast.error(errorMessage);
          }
        }
      } else {
        const errorMessage =
          validationResult.violations[0]?.message ||
          '블록을 리사이즈할 수 없습니다';
        toast.error(errorMessage);
      }

      currentContext.dispatch(endResizeInteraction());
      currentContext.dispatch(setBlockResizing(false));
    }

    resizeState = null;
  },
};
