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

    // 폼 요소(input, textarea, select 등)에서 발생한 이벤트는 무시
    const target = event.target as HTMLElement;
    if (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.tagName === 'SELECT' ||
      target.isContentEditable
    ) {
      return;
    }

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

        const sections = state.content.sections || [];

        selectedIds.forEach((blockId) => {
          for (const section of sections) {
            if (section.blocks.some((b) => b.id === blockId)) {
              dispatch(deleteBlock(section.id, blockId));
              break;
            }
          }
        });
        break;
      }

      default:
        break;
    }
  },
};
