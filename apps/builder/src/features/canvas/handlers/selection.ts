import type { SelectionEventHandler, HandlerContext } from './types';
import { selectBlock, deselectBlock } from '@/core/actions';

/**
 * Selection Handler
 * 블록 선택을 처리하는 핸들러
 */
export const selectionHandler: SelectionEventHandler = {
  name: 'selection',
  enabled: true,

  handle: (event: MouseEvent, context: HandlerContext) => {
    const { dispatch } = context;

    // TODO: 클릭된 블록 식별
    const clickedBlockId = getBlockIdFromEvent(event);

    if (!clickedBlockId) {
      // 빈 공간 클릭: 선택 해제
      dispatch(deselectBlock());
      return;
    }

    // Shift 키로 다중 선택
    const multiSelect = event.shiftKey || event.metaKey || event.ctrlKey;

    dispatch(selectBlock(clickedBlockId, multiSelect));
  },
};

/**
 * 이벤트에서 블록 ID 추출
 * TODO: 실제 구현 필요
 */
function getBlockIdFromEvent(event: MouseEvent): string | null {
  const target = event.target as HTMLElement;

  // data-block-id 속성 찾기
  const blockElement = target.closest('[data-block-id]');
  if (blockElement) {
    return blockElement.getAttribute('data-block-id');
  }

  return null;
}
