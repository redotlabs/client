import type { DropEventHandler, HandlerContext } from './types';
import { createBlock, setBlockDragging, addChildToFrame } from '@/core/actions';
import type { BlockTemplate } from '@/core/blocks';
import type { BuilderBlock } from '@repo/builder/renderer';

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
 * Frame 블록 위에 드롭되었는지 감지
 * Frame 블록의 DOM 요소를 찾아서 마우스 좌표가 그 안에 있는지 확인
 */
const detectFrameUnderMouse = (
  event: DragEvent,
  context: HandlerContext
): string | null => {
  const sectionElement = (event.currentTarget as HTMLElement).closest(
    '[data-section-id]'
  ) as HTMLElement;
  if (!sectionElement) return null;

  const sectionId = sectionElement.dataset.sectionId;
  if (!sectionId) return null;

  // 현재 섹션의 모든 블록 중 Frame 타입만 필터링
  const section = context.state.content?.sections.find((s) => s.id === sectionId);
  if (!section) return null;

  const frameBlocks = section.blocks.filter((b) => b.component === 'frame');

  // 마우스 위치에 있는 Frame 찾기
  for (const frameBlock of frameBlocks) {
    const frameElement = sectionElement.querySelector(
      `[data-block-id="${frameBlock.id}"]`
    );
    if (!frameElement) continue;

    const rect = frameElement.getBoundingClientRect();
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // 마우스가 Frame 영역 안에 있는지 확인
    if (
      mouseX >= rect.left &&
      mouseX <= rect.right &&
      mouseY >= rect.top &&
      mouseY <= rect.bottom
    ) {
      return frameBlock.id;
    }
  }

  return null;
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
  name: 'drop',

  onDragOver: (event: DragEvent, context: HandlerContext) => {
    event.preventDefault();
    event.dataTransfer!.dropEffect = 'copy';

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

    const sectionElement = target.closest('[data-section-id]') as HTMLElement;
    const sectionId =
      sectionElement?.dataset.sectionId ||
      context.state.selection.selectedSectionId;

    if (!sectionId) {
      console.warn('No section found for drop');
      context.dispatch(setBlockDragging(false));
      return;
    }

    // Frame 위에 드롭되었는지 확인
    const frameId = detectFrameUnderMouse(event, context);

    if (frameId) {
      // Frame 위에 드롭됨 -> Frame의 자식으로 추가
      // Frame children은 position, size 없이 생성
      const childBlock: BuilderBlock = {
        id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        component: template.type,
        props: template.defaultProps.props,
        // position, size 없음 - Frame 내부는 순서만 존재
        position: { x: 0, y: 0, zIndex: 0 }, // 임시로 0으로 설정 (나중에 제거 예정)
        size: { width: 0, height: 0 }, // 임시로 0으로 설정 (나중에 제거 예정)
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      };

      context.dispatch(addChildToFrame(sectionId, frameId, childBlock));
    } else {
      // Grid에 드롭됨 -> 기존 방식대로 블록 생성
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
    }

    delete window.__draggedTemplate;

    context.dispatch(setBlockDragging(false));
  },

  onDragLeave: (event: DragEvent, context: HandlerContext) => {
    if (event.currentTarget === event.target) {
      context.dispatch(setBlockDragging(false));
    }
  },
});
