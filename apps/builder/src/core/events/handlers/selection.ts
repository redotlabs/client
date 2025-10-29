import { getBlockIdFromEvent } from './utils';
import type { SelectionEventHandler, HandlerContext } from './types';
import { selectBlock, deselectBlock } from '@/core/actions';

/**
 * Selection Handler
 * 블록 선택을 처리하는 핸들러
 */
export const selectionHandler: SelectionEventHandler = {
  name: 'selection',

  handle: (event: MouseEvent, context: HandlerContext) => {
    const { dispatch } = context;

    const clickedBlockId = getBlockIdFromEvent(event);

    if (!clickedBlockId) {
      dispatch(deselectBlock());
      return;
    }

    const multiSelect = event.shiftKey || event.metaKey || event.ctrlKey;

    dispatch(selectBlock(clickedBlockId, multiSelect));
  },
};
