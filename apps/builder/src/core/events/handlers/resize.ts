import type { ResizeEventHandler, HandlerContext, ResizeDirection } from './types';
import { resizeBlock, moveBlock } from '@/core/actions';

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
}

let resizeState: ResizeState | null = null;
let currentContext: HandlerContext | null = null;

// Global event handlers
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
 * Resize Handler
 * 블록 리사이징을 처리하는 핸들러
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
    const block = state.blocks.get(blockId);

    if (!block) return;

    resizeState = {
      blockId,
      direction,
      startX: event.clientX,
      startY: event.clientY,
      startSize: { ...block.size },
      startPosition: { ...block.position },
    };

    // Global event listeners 등록
    currentContext = context;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    console.log('Resize start', resizeState);
  },

  onResizeMove: (event: MouseEvent, context: HandlerContext) => {
    if (!resizeState) return;

    const { dispatch, state } = context;
    const { gridConfig } = state;

    const deltaX = event.clientX - resizeState.startX;
    const deltaY = event.clientY - resizeState.startY;

    // Grid 단위로 변환 (픽셀 → 그리드 셀 수)
    const cellWidth = gridConfig.columns > 0 ? window.innerWidth / gridConfig.columns : 100;
    const cellHeight = gridConfig.rowHeight;

    const deltaColumns = Math.round(deltaX / cellWidth);
    const deltaRows = Math.round(deltaY / cellHeight);

    const { direction, startSize, startPosition } = resizeState;

    let newWidth = startSize.width;
    let newHeight = startSize.height;
    let newX = startPosition.x;
    let newY = startPosition.y;

    // 방향에 따른 크기 조정
    if (direction.includes('e')) {
      // 오른쪽: 크기만 증가
      newWidth = Math.max(1, startSize.width + deltaColumns);
    }
    if (direction.includes('w')) {
      // 왼쪽: 위치 이동 + 크기 증가
      // 왼쪽으로 드래그하면 deltaColumns < 0
      // newWidth = startSize.width - deltaColumns (deltaColumns이 음수이므로 크기 증가)
      newWidth = Math.max(1, startSize.width - deltaColumns);
      const widthChange = newWidth - startSize.width;
      newX = startPosition.x - widthChange;
    }
    if (direction.includes('s')) {
      // 아래: 크기만 증가
      newHeight = Math.max(1, startSize.height + deltaRows);
    }
    if (direction.includes('n')) {
      // 위: 위치 이동 + 크기 증가
      // 위로 드래그하면 deltaRows < 0
      // newHeight = startSize.height - deltaRows (deltaRows가 음수이므로 크기 증가)
      newHeight = Math.max(1, startSize.height - deltaRows);
      const heightChange = newHeight - startSize.height;
      newY = startPosition.y - heightChange;
    }

    // 크기 변경
    dispatch(
      resizeBlock(resizeState.blockId, {
        width: newWidth,
        height: newHeight,
      })
    );

    // 위치 변경 (n, w 방향일 때 필요)
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

  onResizeEnd: (event: MouseEvent, context: HandlerContext) => {
    if (!resizeState) return;

    console.log('Resize end', resizeState);
    resizeState = null;
  },
};

/**
 * 리사이징 시작 헬퍼 함수
 */
export function startResize(
  event: MouseEvent,
  context: HandlerContext,
  blockId: string,
  direction: ResizeDirection
) {
  resizeHandler.onResizeStart?.(event, context, blockId, direction);
}
