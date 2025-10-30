import type { KeyboardEventHandler, HandlerContext } from './types';
import { deselectBlock, deleteBlock } from '@/core/actions';
import { getSelectedBlockIds } from '@/core/state';

/**
 * Keyboard Handler
 * 키보드 입력을 처리하는 핸들러
 */
export const keyboardHandler: KeyboardEventHandler = {
  name: 'keyboard',

  handle: (event: KeyboardEvent, context: HandlerContext) => {
    const { state, dispatch } = context;

    switch (event.key) {
      case 'Escape': {
        event.preventDefault();
        dispatch(deselectBlock());
        break;
      }

      case 'Delete':
      case 'Backspace': {
        event.preventDefault();
        const selectedIds = getSelectedBlockIds(state);
        selectedIds.forEach((id) => {
          dispatch(deleteBlock(id));
        });
        break;
      }

      default:
        break;
    }
  },
};
