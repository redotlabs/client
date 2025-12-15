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
 * Frame 내부에서 삽입 위치 계산
 * Frame의 children 사이에서 마우스 위치를 기준으로 삽입 인덱스를 계산
 */
const calculateFrameInsertIndex = (
  event: DragEvent,
  frameId: string,
  context: HandlerContext
): number => {
  const sectionElement = (event.currentTarget as HTMLElement).closest(
    '[data-section-id]'
  ) as HTMLElement;
  if (!sectionElement) return 0;

  const sectionId = sectionElement.dataset.sectionId;
  if (!sectionId) return 0;

  const section = context.state.content?.sections.find((s) => s.id === sectionId);
  if (!section) return 0;

  const frameBlock = section.blocks.find((b) => b.id === frameId);
  if (!frameBlock || frameBlock.component !== 'frame') return 0;

  const children = Array.isArray(frameBlock.children) ? frameBlock.children : [];
  if (children.length === 0) return 0;

  // Frame 엘리먼트 찾기
  const frameElement = sectionElement.querySelector(
    `[data-block-id="${frameId}"]`
  );
  if (!frameElement) return children.length;

  // Frame의 direction 가져오기
  const frameProps = frameBlock.props as any;
  const direction = frameProps?.layout?.direction || 'vertical';

  const mouseX = event.clientX;
  const mouseY = event.clientY;

  // 각 child의 위치를 확인하여 삽입 위치 계산
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    // Frame 내부에서 child 찾기
    const childElement = frameElement.querySelector(
      `[data-block-id="${child.id}"]`
    );

    if (!childElement) continue;

    const rect = childElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // direction에 따라 삽입 위치 판단
    if (direction === 'horizontal' || direction === 'wrap') {
      // 가로 방향: 마우스가 child 중심보다 왼쪽에 있으면 그 앞에 삽입
      if (mouseX < centerX) return i;
    } else {
      // 세로 방향: 마우스가 child 중심보다 위쪽에 있으면 그 앞에 삽입
      if (mouseY < centerY) return i;
    }
  }

  // 모든 child보다 뒤에 있으면 마지막에 삽입
  return children.length;
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

    // Frame 위에 있는지 감지하고 하이라이트 표시
    const frameId = detectFrameUnderMouse(event, context);

    // 모든 Frame에서 drop-target 제거
    const sectionElement = (event.currentTarget as HTMLElement).closest(
      '[data-section-id]'
    ) as HTMLElement;
    if (sectionElement) {
      const allFrames = sectionElement.querySelectorAll('[data-block-type="frame"]');
      allFrames.forEach((frame) => {
        frame.removeAttribute('data-drop-target');
      });

      // 현재 Frame에만 drop-target 추가 + 삽입 위치 계산
      if (frameId) {
        const frameElement = sectionElement.querySelector(
          `[data-block-id="${frameId}"]`
        );
        if (frameElement) {
          frameElement.setAttribute('data-drop-target', 'true');

          // 삽입 위치 계산 및 저장
          const insertIndex = calculateFrameInsertIndex(event, frameId, context);
          frameElement.setAttribute('data-insert-index', insertIndex.toString());
        }
      }
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
      // 삽입 위치 계산
      const insertIndex = calculateFrameInsertIndex(event, frameId, context);

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

      // 계산된 위치에 블록 추가
      context.dispatch(addChildToFrame(sectionId, frameId, childBlock, insertIndex));
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

    // 모든 Frame에서 drop-target 제거
    if (sectionElement) {
      const allFrames = sectionElement.querySelectorAll('[data-block-type="frame"]');
      allFrames.forEach((frame) => {
        frame.removeAttribute('data-drop-target');
      });
    }

    delete window.__draggedTemplate;

    context.dispatch(setBlockDragging(false));
  },

  onDragLeave: (event: DragEvent, context: HandlerContext) => {
    if (event.currentTarget === event.target) {
      // 모든 Frame에서 drop-target 제거
      const sectionElement = event.currentTarget as HTMLElement;
      const allFrames = sectionElement.querySelectorAll('[data-block-type="frame"]');
      allFrames.forEach((frame) => {
        frame.removeAttribute('data-drop-target');
      });

      context.dispatch(setBlockDragging(false));
    }
  },
});
