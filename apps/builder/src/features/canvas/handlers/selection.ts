import type { SelectionEventHandler, HandlerContext } from './types';
import { selectBlock, deselectBlock } from '@/core/actions';
import { getBlockIdFromEvent } from './utils';

/**
 * Selection Handler
 * 블록 선택을 처리하는 핸들러
 */
export const selectionHandler: SelectionEventHandler = {
  name: 'selection',
  enabled: true,

  handle: (event: MouseEvent, context: HandlerContext) => {
    const { dispatch } = context;

    // 클릭된 블록 식별
    const clickedBlockId = getBlockIdFromEvent(event);

    if (!clickedBlockId) {
      // 빈 공간 클릭: 선택 해제
      dispatch(deselectBlock());
      return;
    }

    // Shift/Cmd/Ctrl 키로 다중 선택
    const multiSelect = event.shiftKey || event.metaKey || event.ctrlKey;

    dispatch(selectBlock(clickedBlockId, multiSelect));
  },
};
